import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const currentFocus = request.nextUrl.searchParams.get('current_focus');
  const division = request.nextUrl.searchParams.get('division');
  const status = request.nextUrl.searchParams.get('status');

  const supabase = createClient(KOLLECTIVE_SUPABASE_URL, KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let query = supabase.from('kollective_public_entity_directory').select('*').order('featured_priority', { ascending: true });
  if (currentFocus === 'true') query = query.eq('current_focus', true);
  if (currentFocus === 'false') query = query.eq('current_focus', false);
  if (division) query = query.eq('division_slug', division);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    console.error('enterprise_registry_query_failed', error);
    return NextResponse.json({ entities: [], error: 'Registry temporarily unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }

  return NextResponse.json({ entities: data || [], generated_at: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}
