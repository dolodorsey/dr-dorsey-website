import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';
import { departmentFor, departmentSlug } from '@/lib/company-departments';
import { isEventEntity, isPublicEvent, isPubliclyHidden, isRetired } from '@/lib/roster';
import { isKollectiveHost, isOffSite, isStaleListing } from '@/lib/kollective-scope';

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
    return NextResponse.json(
      { entities: [], error: 'Registry temporarily unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const kollectiveHost = isKollectiveHost(request.headers.get('host'));
  const entities = (data || []).flatMap((entity) => {
    const legacyDivision = entity.division_name || entity.division_slug || null;

    if (isRetired(entity.name) || isPubliclyHidden(entity.name)) return [];
    if (kollectiveHost && isOffSite(entity.name, entity.slug, entity.category, entity.website_url, entity.division_name, entity.short_description)) return [];
    if (kollectiveHost && isStaleListing(entity.name, entity.slug, entity.category)) return [];
    if (isEventEntity(entity.name, legacyDivision) && !isPublicEvent(entity.name)) return [];

    const department = departmentFor({ name: entity.name, division: legacyDivision });
    return [{
      ...entity,
      division_name: department,
      division_slug: departmentSlug(department),
    }];
  });

  return NextResponse.json(
    { entities, generated_at: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
