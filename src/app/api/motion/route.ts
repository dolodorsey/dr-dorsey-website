import { NextRequest, NextResponse } from 'next/server';
import { isKollectiveHost, isStaleListing } from '@/lib/kollective-scope';
import { motionManifest } from '@/lib/motion';

/**
 * The brand motion library.
 *
 * A stable, cacheable index of every company animation and its poster frame,
 * so the Kollective customer app and the mobile shell can render the same
 * covers as the websites without duplicating assets.
 *
 * GET /api/motion            -> relative paths
 * GET /api/motion?absolute=1 -> absolute URLs against this deployment
 */
export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const absolute = request.nextUrl.searchParams.get('absolute');
  const origin = absolute ? request.nextUrl.origin : '';

  const kollectiveHost = isKollectiveHost(request.headers.get('host'));
  const assets = motionManifest(origin).filter(
    (asset) => !kollectiveHost || !isStaleListing(asset.slug, asset.video, ...asset.matches),
  );

  return NextResponse.json(
    { count: assets.length, assets },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
}
