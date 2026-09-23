import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const destination = new URL('/shop', request.nextUrl.origin);

  const source = request.nextUrl.searchParams.get('source');
  const campaign = request.nextUrl.searchParams.get('campaign');

  if (source) destination.searchParams.set('source', source);
  if (campaign) destination.searchParams.set('campaign', campaign);

  destination.hash = 'kollective';

  const response = NextResponse.redirect(destination, 307);
  response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  return response;
}
