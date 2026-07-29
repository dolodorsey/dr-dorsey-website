import { NextRequest, NextResponse } from 'next/server';

const KOLLECTIVE_HOSTS = new Set([
  'thekollectivehospitality.com',
  'www.thekollectivehospitality.com',
]);

export function proxy(request: NextRequest) {
  const hostname = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const pathname = request.nextUrl.pathname;

  if (
    KOLLECTIVE_HOSTS.has(hostname) &&
    !pathname.startsWith('/kollective') &&
    !pathname.startsWith('/api/')
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
