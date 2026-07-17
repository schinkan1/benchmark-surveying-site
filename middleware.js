import { NextResponse } from 'next/server';

// Note: Edge middleware can't use Node's crypto in the same way as our
// authToken.js helper, so here we just check the cookie is present.
// Real verification (signature + expiry) happens again inside each
// protected API route and in app/admin/page.js before rendering anything
// sensitive. This keeps unauthenticated users away from a page shell
// while the actual security check runs server-side with Node APIs.

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isProtectedApi =
    pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login');

  if (isProtectedPage || isProtectedApi) {
    const cookie = request.cookies.get('admin_session');
    if (!cookie) {
      if (isProtectedApi) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
