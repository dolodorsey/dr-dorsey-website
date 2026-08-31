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

const SMS_CONSENT_TEXT = 'I agree to receive recurring informational and marketing text messages from Kollective Hospitality Texas at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out and HELP for help. Consent is not a condition of purchase.';

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
  const source = cleanText(body.source, 80) || 'website';
  const brandKey = source === 'kollective-app' ? 'the_kollective' : 'dr_dorsey';

  if (!ALLOWED_FORMS.has(formType)) {
    return NextResponse.json({ error: 'Unsupported form type.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (fullName.length < 2) {
    return NextResponse.json({ error: 'A valid name is required.' }, { status: 400 });
  }

  const isSmsOptIn = formData.request_type === 'sms_opt_in';
  const phoneDigits = phone?.replace(/\D/g, '') || '';
  if (isSmsOptIn && (source !== 'kollective-app' || formData.sms_consent !== true || phoneDigits.length < 7 || phoneDigits.length > 15)) {
    return NextResponse.json({ error: 'Valid SMS consent and a mobile number are required.' }, { status: 400 });
  }

  const storedFormData = isSmsOptIn
    ? {
        ...formData,
        sms_consent: true,
        sms_consent_text: SMS_CONSENT_TEXT,
        consent_timestamp: new Date().toISOString(),
        consent_capture: 'server_validated',
      }
    : formData;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      form_type: formType,
      email,
      brand_key: brandKey,
      full_name: fullName,
      phone,
      form_data: storedFormData,
      source,
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
