import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dzlmtvodpyhetvektfuo.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ekvoOK6QQ05dUZuWgzQfUw_2RgbWPFR';

const ALLOWED_FORMS = new Set([
  'vendor','artist_painter','artist_music','influencer','sponsor','consultation',
  'onboarding','what_you_do','rsvp','ticket','intern','volunteer','hiring_inquiry',
  'inquiry','group_pricing','table_reservation','nda','book_club','bulk_orders',
  'speaking','media',
  'member_offers','ambassador_application',
]);

function cleanText(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const formType = cleanText(body.form_type, 80);
  const fullName = cleanText(body.full_name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const phone = cleanText(body.phone, 40) || null;
  const formData = body.form_data && typeof body.form_data === 'object' ? body.form_data : {};

  if (!ALLOWED_FORMS.has(formType)) {
    return NextResponse.json({ error: 'Unsupported form type.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (fullName.length < 2) {
    return NextResponse.json({ error: 'A valid name is required.' }, { status: 400 });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      form_type: formType,
      email,
      brand_key: 'dr_dorsey',
      full_name: fullName,
      phone,
      form_data: formData,
      source: 'doctordorsey.com',
      user_agent: cleanText(request.headers.get('user-agent'), 500) || null,
      referer: cleanText(request.headers.get('referer'), 500) || null,
      workflow_status: 'pending',
      submitted_at: new Date().toISOString(),
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    console.error('Dr. Dorsey form insert failed', response.status, payload);
    return NextResponse.json({ error: 'Your submission could not be saved.' }, { status: 502 });
  }

  return NextResponse.json({ success: true, id: payload?.[0]?.id ?? null }, { status: 201 });
}
