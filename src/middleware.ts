import { NextRequest, NextResponse } from 'next/server';

const KOLLECTIVE_HOSTS = new Set([
  'thekollectivehospitality.com',
  'www.thekollectivehospitality.com',
]);

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const pathname = request.nextUrl.pathname;

  // Shared app, auth, API, and destination routes live at the root. Keep them
  // outside the public /kollective rewrite so email confirmations and app
  // sessions always land on their real handlers.
  if (
    KOLLECTIVE_HOSTS.has(hostname) &&
    !pathname.startsWith('/kollective') &&
    !pathname.startsWith('/app') &&
    !pathname.startsWith('/auth/') &&
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
