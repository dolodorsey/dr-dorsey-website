import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';

export const dynamic = 'force-dynamic';

const DIRECT_DESTINATIONS: Record<string, string> = {
  'rose-on-piedmont': '/app/forms/rsvp?venue=Rose%20on%20Piedmont',
  'grown-ish': '/app/forms/rsvp?event=GROWN-ISH&venue=Rose%20on%20Piedmont',
  'taste-of-art': 'https://thatasteofart.com',
  'freedom-fest': 'https://freedom-fest-store.vercel.app',
  'the-fraternity': '/app/forms/inquiry?company=The%20Fraternity',
  'the-gentlemans-club': '/app/forms/inquiry?company=The%20Gentlemans%20Club',
  'the-tribe-memphis': '/app/forms/inquiry?company=The%20Tribe',
  'trailblazers': 'https://trailblazers.vercel.app',
  'little-farmers-of-the-future': '/app/forms/inquiry?company=Little%20Farmers%20of%20the%20Future',
  'members-elite': '/app/forms/inquiry?company=Members%20Elite',
  'brand-studio': 'https://brand-studio-website.vercel.app',
  'the-brand-studio': 'https://brand-studio-website.vercel.app',
  'the-casper-group': 'https://caspergroupworldwide.com',
  'the-umbrella-group': 'https://umbrellagroupworldwide.com',
};

function detectPlatform(userAgent: string): 'ios' | 'android' | 'web' {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'web';
}

function safeDestination(slug: string, destination: string | null | undefined) {
  if (DIRECT_DESTINATIONS[slug]) return new URL(DIRECT_DESTINATIONS[slug], 'https://thekollectivehospitality.com').toString();
  if (!destination) return `https://thekollectivehospitality.com/app/forms/inquiry?company=${encodeURIComponent(slug)}`;
  if (/111atl\.com/i.test(destination)) return `https://thekollectivehospitality.com/app/forms/inquiry?company=${encodeURIComponent(slug)}`;
  return destination;
}

export async function GET(request: NextRequest, context: { params: { slug: string } }) {
  const slug = context.params.slug;
  const sessionId = request.cookies.get('kollective_session')?.value || crypto.randomUUID();
  const supabase = createClient(KOLLECTIVE_SUPABASE_URL, KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data, error } = await supabase.rpc('kollective_resolve_destination', {
    p_entity_slug: slug,
    p_platform: detectPlatform(request.headers.get('user-agent') || ''),
    p_action_key: request.nextUrl.searchParams.get('action') || 'primary',
    p_session_id: sessionId,
    p_source_screen: request.nextUrl.searchParams.get('source') || 'website',
    p_source_campaign: request.nextUrl.searchParams.get('campaign'),
    p_city: request.nextUrl.searchParams.get('city'),
    p_metadata: { referrer: request.headers.get('referer'), user_agent: request.headers.get('user-agent') },
  });

  const result = Array.isArray(data) ? data[0] : data;
  if (error) console.error('kollective_destination_resolution_failed', { slug, error });
  const response = NextResponse.redirect(safeDestination(slug, result?.resolved_url), 307);
  response.cookies.set('kollective_session', sessionId, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 365, path: '/' });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
