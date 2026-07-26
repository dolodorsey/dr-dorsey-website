import { NextRequest, NextResponse } from "next/server";
import { serverSupaInsert, serverSupaSelect } from "@/lib/server-supabase";
import { calculateQualification, cleanEmail, cleanPhone, cleanText } from "@/lib/learning-revenue";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (cleanText(body.company_fax, 100)) return NextResponse.json({ ok: true });
    const offerId = cleanText(body.offer_id, 80);
    const email = cleanEmail(body.contact_email);
    const name = cleanText(body.contact_name, 160);
    if (!offerId || !email || !name) return NextResponse.json({ ok: false, error: "name_email_offer_required" }, { status: 400 });
    const offers = await serverSupaSelect("tlu_consultation_offers", `select=*&id=eq.${encodeURIComponent(offerId)}&published=eq.true&limit=1`);
    const offer = offers?.[0];
    if (!offer) return NextResponse.json({ ok: false, error: "offer_not_available" }, { status: 404 });

    const fields = {
      primary_goal: cleanText(body.primary_goal, 1500),
      current_challenge: cleanText(body.current_challenge, 2000),
      desired_outcome: cleanText(body.desired_outcome, 2000),
      budget_range: cleanText(body.budget_range, 100),
      timeline: cleanText(body.timeline, 100),
      website_url: cleanText(body.website_url, 500),
      company_name: cleanText(body.company_name, 200),
    };
    const qualificationScore = calculateQualification(fields);
    const qualified = qualificationScore >= Number(offer.minimum_qualification_score || 0);
    const row = await serverSupaInsert("tlu_consultation_applications", {
      offer_id: offer.id,
      brand_key: offer.brand_key || "dr_dorsey",
      contact_name: name,
      contact_email: email,
      contact_phone: cleanPhone(body.contact_phone) || null,
      ...fields,
      answers: fields,
      source: cleanText(body.source, 100) || "doctordorsey.com",
      qualification_score: qualificationScore,
      amount_cents: Number(offer.price_cents || 0),
      status: qualified ? "qualified" : "submitted",
      next_action: qualified ? "Review and send checkout invitation" : "Review application fit",
      next_action_at: new Date(Date.now() + 86400000).toISOString(),
      assigned_to: offer.owner_label || "Dr. Dorsey",
    });
    const application = Array.isArray(row) ? row[0] : row;
    await serverSupaInsert("khg_learning_funnel_events", {
      event_type: "application_submitted",
      offer_type: offer.offer_kind === "course_level" ? "course_level" : "consultation",
      consultation_offer_id: offer.id,
      consultation_application_id: application?.id || null,
      buyer_email: email,
      amount_cents: Number(offer.price_cents || 0),
      source: cleanText(body.source, 100) || "doctordorsey.com",
      metadata: { qualification_score: qualificationScore, offer_kind: offer.offer_kind, domain: "doctordorsey.com" },
    });
    return NextResponse.json({ ok: true, application_id: application?.id, status: application?.status, qualification_score: qualificationScore }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "application_failed" }, { status: 500 });
  }
}
