import { NextResponse } from 'next/server';
import { brands, layout } from '@/lib/brand-tokens';

/**
 * Brand tokens for every Kollective-enterprise surface.
 *
 * The two websites read these directly. The BOH app and anything else built
 * outside this repo pulls them from here, so all four properties stay in sync
 * without any of them holding a second copy of the palette.
 *
 * Two brands, deliberately distinct — Dr. Dorsey and The Kollective are
 * separate entities. Read `brands.dorsey` or `brands.kollective`; do not
 * average them.
 *
 * GET /api/brand
 */
export const dynamic = 'force-static';
export const revalidate = 3600;

export function GET() {
  return NextResponse.json(
    {
      note: 'Dr. Dorsey and The Kollective are separate brands. Pick one; never blend.',
      layout,
      brands,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
