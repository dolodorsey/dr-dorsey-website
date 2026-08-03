import { NextRequest, NextResponse } from "next/server";
import { findNightlifePackage } from "@/lib/nightlife-packages";

export const runtime = "nodejs";

function clean(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return NextResponse.json({ error: "Secure checkout is not configured." }, { status: 503 });

  const body = await request.json().catch(() => null);
  const name = clean(body?.name);
  const email = clean(body?.email);
  const phone = clean(body?.phone);
  const event = clean(body?.event);
  const reference = clean(body?.reference);
  const instagram = clean(body?.instagram);
  const packageId = clean(body?.package);
  const venueKey = packageId.split("-")[0];
  const selected = findNightlifePackage(venueKey, packageId);
  const totalCents = selected ? selected.total * 100 : Math.round(Number(body?.total) * 100);
  if (!name || !email || !phone || !instagram || !event || !Number.isInteger(totalCents) || totalCents < 10000 || totalCents > 1000000) {
    return NextResponse.json({ error: "Enter the confirmed table total and all required contact details." }, { status: 400 });
  }

  const depositCents = selected ? (venueKey === "revel" ? 35000 : Math.round(totalCents * 0.5)) : Math.round(totalCents * 0.25);
  const depositLabel = selected ? (venueKey === "revel" ? "$350" : "50%") : "25%";
  const origin = new URL(request.url).origin;
  const params = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/app/table-deposit?paid=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/app/table-deposit?cancelled=1`,
    customer_email: email,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(depositCents),
    "line_items[0][price_data][product_data][name]": `${depositLabel} table deposit — ${event}`,
    "line_items[0][price_data][product_data][description]": `Confirmed table total: $${(totalCents / 100).toFixed(2)}`,
    "metadata[guest_name]": name,
    "metadata[guest_phone]": phone,
    "metadata[instagram]": instagram,
    "metadata[event_or_venue]": event,
    "metadata[reference]": reference || "none",
    "metadata[table_total_cents]": String(totalCents),
    "metadata[deposit_rule]": depositLabel,
    "metadata[package_id]": packageId || "custom",
  });
  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { authorization: `Bearer ${stripeKey}`, "content-type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const session = await response.json();
  if (!response.ok || !session.url) {
    console.error("Stripe table deposit session failed", session?.error?.type || response.status);
    return NextResponse.json({ error: "Secure checkout could not be started. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ url: session.url });
}
