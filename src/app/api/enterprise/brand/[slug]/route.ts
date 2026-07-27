import { NextRequest, NextResponse } from 'next/server';
import {
  KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  KOLLECTIVE_SUPABASE_URL,
} from '@/lib/kollective-public';

const headers = {
  apikey: KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${KOLLECTIVE_SUPABASE_PUBLISHABLE_KEY}`,
};

function publicResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const cleanSlug = decodeURIComponent(slug || '').trim().toLowerCase();
  if (!cleanSlug) return publicResponse({ error: 'Brand slug is required.' }, 400);

  try {
    const entityUrl = new URL(`${KOLLECTIVE_SUPABASE_URL}/rest/v1/kollective_public_brand_hub`);
    entityUrl.searchParams.set('slug', `eq.${cleanSlug}`);
    entityUrl.searchParams.set('select', '*');
    entityUrl.searchParams.set('limit', '1');

    const entityResponse = await fetch(entityUrl, { headers, cache: 'no-store' });
    if (!entityResponse.ok) {
      const detail = await entityResponse.text();
      throw new Error(`Brand hub query failed: ${entityResponse.status} ${detail}`);
    }

    const entities = (await entityResponse.json()) as Array<Record<string, unknown>>;
    const brand = entities[0];
    if (!brand) return publicResponse({ error: 'Brand not found.' }, 404);

    const destinationUrl = new URL(`${KOLLECTIVE_SUPABASE_URL}/rest/v1/kollective_public_destinations`);
    destinationUrl.searchParams.set('entity_id', `eq.${String(brand.id)}`);
    destinationUrl.searchParams.set('is_active', 'eq.true');
    destinationUrl.searchParams.set('select', 'action_key,action_label,destination_type,internal_path,web_url,ios_store_url,android_store_url,deep_link_scheme,universal_link,fallback_url,is_primary,sort_order');
    destinationUrl.searchParams.set('order', 'sort_order.asc');

    const destinationResponse = await fetch(destinationUrl, { headers, cache: 'no-store' });
    if (!destinationResponse.ok) {
      const detail = await destinationResponse.text();
      throw new Error(`Destination query failed: ${destinationResponse.status} ${detail}`);
    }

    const destinations = await destinationResponse.json();
    return publicResponse({ brand: { ...brand, destinations }, source: 'kollective_public_brand_hub' });
  } catch (error) {
    console.error('Public brand hub API error', error);
    return publicResponse({ error: 'Brand information is temporarily unavailable.' }, 500);
  }
}
