import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';

export const dynamic = 'force-dynamic';

function detectPlatform(userAgent: string): 'ios' | 'android' | 'web' {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'web';
}

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const slug = (await context.params).slug;
  const platform = detectPlatform(request.headers.get('user-agent') || '');
  const sourceScreen = request.nextUrl.searchParams.get('source') || 'website';
  const sourceCampaign = request.nextUrl.searchParams.get('campaign');
  const city = request.nextUrl.searchParams.get('city');
  const actionKey = request.nextUrl.searchParams.get('action') || 'primary';
  const sessionId = request.cookies.get('kollective_session')?.value || crypto.randomUUID();

  const supabase = createClient(KOLLECTIVE_SUPABASE_URL, KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.rpc('kollective_resolve_destination', {
    p_entity_slug: slug,
    p_platform: platform,
    p_action_key: actionKey,
    p_session_id: sessionId,
    p_source_screen: sourceScreen,
    p_source_campaign: sourceCampaign,
    p_city: city,
    p_metadata: {
      referrer: request.headers.get('referer'),
      user_agent: request.headers.get('user-agent'),
    },
  });

  const result = Array.isArray(data) ? data[0] : data;
  const destination = result?.resolved_url || 'https://doctordorsey.com/access';
  if (error) console.error('kollective_destination_resolution_failed', { slug, error });

  const response = NextResponse.redirect(destination, 307);
  response.cookies.set('kollective_session', sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
