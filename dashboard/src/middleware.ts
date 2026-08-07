import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const COOKIE_NAME = 'rpf_dashboard_access';

const PUBLIC_PATHS = ['/access'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (cookie?.value) {
      try {
        const res = await fetch(`${API_BASE_URL}/dashboard/verify`, {
          headers: { Cookie: `${COOKIE_NAME}=${cookie.value}` },
          cache: 'no-store',
        });
        if (res.ok) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch {
        // verification failed — stay on access page
      }
    }
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) {
    return NextResponse.redirect(new URL('/access', request.url));
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE_URL}/dashboard/verify`, {
      headers: { Cookie: `${COOKIE_NAME}=${cookie.value}` },
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const response = NextResponse.redirect(new URL('/access', request.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  } catch {
    return NextResponse.redirect(new URL('/access', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
