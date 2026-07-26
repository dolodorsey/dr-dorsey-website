import { NextRequest, NextResponse } from "next/server";
import { serverSupaInsert, serverSupaSelect, serverSupaUpdate } from "@/lib/server-supabase";
import { getStripe } from "@/lib/learning-revenue";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !secret) return NextResponse.json({ ok: false, error: "stripe_webhook_not_configured" }, { status: 503 });
  let event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature") || "", secret);
  } catch (error) {
    return NextResponse.json({ ok: false, error: `invalid_signature:${error instanceof Error ? error.message : "unknown"}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const purchases = await serverSupaSelect("tlu_purchases", `select=*&stripe_session_id=eq.${encodeURIComponent(session.id)}&limit=1`);
      const purchase = purchases?.[0];
      if (purchase) {
        const now = new Date().toISOString();
        await serverSupaUpdate("tlu_purchases", `id=eq.${purchase.id}`, {
          status: "paid", checkout_status: "complete", stripe_payment_intent_id: session.payment_intent || null,
          amount_cents: Number(session.amount_total || purchase.amount_cents || 0), paid_at: now, updated_at: now,
        });
        if (purchase.course_id && purchase.buyer_email) {
          await serverSupaInsert("khg_learning_access_grants", { purchase_id: purchase.id, course_id: purchase.course_id, buyer_email: purchase.buyer_email, status: "unclaimed" }).catch(() => null);
        }
        if (purchase.consultation_application_id) {
          await serverSupaUpdate("tlu_consultation_applications", `id=eq.${purchase.consultation_application_id}`, {
            payment_status: "paid", paid_at: now, status: "ready_to_schedule", next_action: "Schedule paid engagement", next_action_at: now, updated_at: now,
          });
        }
        await serverSupaInsert("khg_learning_funnel_events", {
          event_type: "checkout_completed", offer_type: purchase.offer_type, course_id: purchase.course_id,
          consultation_offer_id: purchase.consultation_offer_id, consultation_application_id: purchase.consultation_application_id,
          purchase_id: purchase.id, buyer_email: purchase.buyer_email, amount_cents: Number(session.amount_total || purchase.amount_cents || 0),
          source: purchase.source || "doctordorsey.com", idempotency_key: `checkout_completed:${session.id}`,
          metadata: { stripe_event_id: event.id, domain: "doctordorsey.com" },
        }).catch(() => null);
      }
    }
    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const purchases = await serverSupaSelect("tlu_purchases", `select=*&stripe_session_id=eq.${encodeURIComponent(session.id)}&limit=1`);
      const purchase = purchases?.[0];
      if (purchase) {
        await serverSupaUpdate("tlu_purchases", `id=eq.${purchase.id}`, { status: "expired", checkout_status: "expired", updated_at: new Date().toISOString() });
        await serverSupaInsert("khg_learning_funnel_events", {
          event_type: "checkout_expired", offer_type: purchase.offer_type, course_id: purchase.course_id,
          consultation_offer_id: purchase.consultation_offer_id, consultation_application_id: purchase.consultation_application_id,
          purchase_id: purchase.id, buyer_email: purchase.buyer_email, amount_cents: purchase.amount_cents,
          source: purchase.source || "doctordorsey.com", idempotency_key: `checkout_expired:${session.id}`,
          metadata: { stripe_event_id: event.id, domain: "doctordorsey.com" },
        }).catch(() => null);
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "webhook_failed" }, { status: 500 });
  }
}
