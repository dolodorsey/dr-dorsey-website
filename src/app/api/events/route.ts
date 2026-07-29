import { NextResponse } from 'next/server';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await fetch(
    `${KOLLECTIVE_SUPABASE_URL}/rest/v1/dorsey_events?is_active=eq.true&order=sort_order.asc`,
    {
      headers: {
        apikey: KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      cache: 'no-store',
    },
  ).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json(
      { events: [], degraded: true },
      { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=600' } },
    );
  }

  const events = await response.json().catch(() => []);
  return NextResponse.json(
    { events: Array.isArray(events) ? events : [] },
    { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=600' } },
  );
}
