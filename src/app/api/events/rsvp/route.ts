import { NextResponse } from 'next/server';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';

function text(value: unknown, limit: number) {
  return String(value ?? '').trim().slice(0, limit);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.website) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const name = text(body.name, 120);
  const email = text(body.email, 254).toLowerCase();
  const eventId = text(body.event_id, 50);
  const eventTitle = text(body.event_title, 180);
  const partySize = Number(body.party_size);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+[.][^\s@]+$/.test(email) || !eventId || !eventTitle) {
    return NextResponse.json({ error: 'Name, email, and event are required.' }, { status: 400 });
  }
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
    return NextResponse.json({ error: 'Party size must be between 1 and 20.' }, { status: 400 });
  }

  const response = await fetch(`${KOLLECTIVE_SUPABASE_URL}/rest/v1/dorsey_event_rsvps`, {
    method: 'POST',
    headers: {
      apikey: KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      event_id: eventId,
      event_title: eventTitle,
      name,
      email,
      phone: text(body.phone, 40) || null,
      party_size: partySize,
      special_requests: text(body.special_requests, 1000) || null,
      booking_type: body.booking_type === 'table_service' ? 'table_service' : 'rsvp',
    }),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ error: 'Your request could not be saved.' }, { status: 503 });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}
