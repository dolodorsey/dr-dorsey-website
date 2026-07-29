import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY, KOLLECTIVE_SUPABASE_URL } from '@/lib/kollective-public';
import { currentFocusBrands } from '@/lib/enterprise';

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
    const fallback = currentFocusBrands.map((brand, index) => ({
      id: `fallback-${index}`,
      slug: brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: brand.name,
      category: brand.category,
      short_description: brand.category,
      status: 'active',
      status_label: brand.status,
      current_focus: true,
      logo_url: brand.logo || null,
      hero_url: null,
      website_url: brand.href,
      city_scope: [],
      access_level: 'public',
      featured_priority: index,
      division_slug: null,
      division_name: null,
      destinations: [{
        id: `fallback-destination-${index}`,
        action_key: 'primary',
        action_label: brand.actionLabel || 'Explore',
        destination_type: brand.destinationType || 'website',
        internal_path: brand.href.startsWith('/') ? brand.href : null,
        web_url: brand.href.startsWith('http') ? brand.href : null,
        fallback_url: brand.href,
        is_primary: true,
      }],
    }));
    return NextResponse.json(
      { entities: fallback, degraded: true, generated_at: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=600' } },
    );
  }

  const publicEntities = (data || []).filter(
    (entity) => !/\bnation\b|sovereign/i.test(`${entity.name || ''} ${entity.slug || ''} ${entity.category || ''}`),
  );

  return NextResponse.json({ entities: publicEntities, generated_at: new Date().toISOString() }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
}
