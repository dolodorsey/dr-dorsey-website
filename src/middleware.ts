import { NextRequest, NextResponse } from 'next/server';

const KOLLECTIVE_HOSTS = new Set([
  'thekollectivehospitality.com',
  'www.thekollectivehospitality.com',
]);

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const pathname = request.nextUrl.pathname;

  // `/go/*` is the shared destination resolver for the enterprise registry.
  // It only exists at the root, so it must not be rewritten under /kollective —
  // otherwise every registry-driven company card on the Kollective host 404s.
  if (
    KOLLECTIVE_HOSTS.has(hostname) &&
    !pathname.startsWith('/kollective') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/go/')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/kollective' : `/kollective${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
