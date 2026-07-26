import { NextRequest, NextResponse } from "next/server";
import { serverSupaInsert, serverSupaSelect, serverSupaUpdate } from "@/lib/server-supabase";
import { checkoutReadiness, cleanEmail, cleanPhone, cleanText, getStripe, resolveAppUrl } from "@/lib/learning-revenue";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const offerType = cleanText(body.offer_type, 30);
    const offerId = cleanText(body.offer_id, 80);
    const email = cleanEmail(body.buyer_email);
    const name = cleanText(body.buyer_name, 160);
    if (!["course", "consultation"].includes(offerType) || !offerId || !email) {
      return NextResponse.json({ ok: false, error: "offer_and_email_required" }, { status: 400 });
    }

    const table = offerType === "course" ? "tlu_courses" : "tlu_consultation_offers";
    const rows = await serverSupaSelect(table, `select=*&id=eq.${encodeURIComponent(offerId)}&published=eq.true&limit=1`);
    const offer = rows?.[0];
    if (!offer) return NextResponse.json({ ok: false, error: "offer_not_available" }, { status: 404 });
    const readiness = checkoutReadiness(offer);
    if (!readiness.ready) return NextResponse.json({ ok: false, error: "checkout_not_ready", blockers: readiness.blockers }, { status: 503 });
    if (offerType === "consultation" && offer.requires_application && !body.application_id) {
      return NextResponse.json({ ok: false, error: "application_required" }, { status: 409 });
    }

    const stripe = getStripe();
    if (!stripe) return NextResponse.json({ ok: false, error: "stripe_not_configured" }, { status: 503 });
    const baseUrl = resolveAppUrl(request);
    const metadata = {
      dd_offer_type: offerType,
      dd_offer_id: offer.id,
      dd_course_id: offerType === "course" ? offer.id : "",
      dd_consultation_offer_id: offerType === "consultation" ? offer.id : "",
      dd_application_id: cleanText(body.application_id, 80),
      dd_source: cleanText(body.source, 100) || "doctordorsey.com",
    };
    const unitAmount = Number(offerType === "consultation" && offer.deposit_cents > 0 ? offer.deposit_cents : offer.price_cents);
    const lineItem = offer.stripe_price_id
      ? { price: offer.stripe_price_id, quantity: 1 }
      : { price_data: { currency: "usd", unit_amount: unitAmount, product_data: { name: offer.title || offer.name, description: cleanText(offer.transformation_promise || offer.subtitle || offer.description, 500) || undefined, metadata } }, quantity: 1 };
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      client_reference_id: metadata.dd_application_id || undefined,
      line_items: [lineItem],
      success_url: `${baseUrl}/learn/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/learn?checkout=cancelled`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata,
      payment_intent_data: { metadata },
    }, { idempotencyKey: `dd-${offerType}-${offer.id}-${email}-${metadata.dd_application_id || "direct"}` });

    const purchaseRows = await serverSupaInsert("tlu_purchases", {
      stripe_session_id: session.id,
      amount_cents: Number(session.amount_total || unitAmount),
      status: "pending",
      checkout_status: "created",
      buyer_email: email,
      buyer_name: name || null,
      buyer_phone: cleanPhone(body.buyer_phone) || null,
      offer_type: offerType,
      course_id: offerType === "course" ? offer.id : null,
      consultation_offer_id: offerType === "consultation" ? offer.id : null,
      consultation_application_id: metadata.dd_application_id || null,
      source: metadata.dd_source,
      metadata: { checkout_url: session.url, domain: "doctordorsey.com" },
    });
    const purchase = Array.isArray(purchaseRows) ? purchaseRows[0] : purchaseRows;
    if (metadata.dd_application_id) {
      await serverSupaUpdate("tlu_consultation_applications", `id=eq.${encodeURIComponent(metadata.dd_application_id)}`, {
        stripe_session_id: session.id,
        payment_status: "checkout_created",
        payment_link: session.url,
        updated_at: new Date().toISOString(),
      });
    }
    await serverSupaInsert("khg_learning_funnel_events", {
      event_type: "checkout_started",
      offer_type: offerType,
      course_id: offerType === "course" ? offer.id : null,
      consultation_offer_id: offerType === "consultation" ? offer.id : null,
      consultation_application_id: metadata.dd_application_id || null,
      purchase_id: purchase?.id || null,
      buyer_email: email,
      amount_cents: Number(session.amount_total || unitAmount),
      source: metadata.dd_source,
      idempotency_key: `checkout_started:${session.id}`,
      metadata: { stripe_session_id: session.id, domain: "doctordorsey.com" },
    });
    return NextResponse.json({ ok: true, checkout_url: session.url });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "checkout_failed" }, { status: 500 });
  }
}
