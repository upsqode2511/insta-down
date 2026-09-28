
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const locales = ['en', 'id', 'de', 'it', 'ja', 'es', 'hi', 'fr', 'tr', 'pt', 'pl', 'ar', 'th', 'hu', 'ms', 'zh', 'ro', 'ru', 'vi'];
export const defaultLocale = 'en';

const validPaths = [
  '/',
  '/instagram-reels-downloader',
  '/instagram-photo-downloader',
  '/instagram-story-downloader',
  '/instagram-profile-downloader',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-of-service'
];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip paths that shouldn't be internationalized
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Check if the path is one of the valid EN routes
    const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

    if (validPaths.includes(normalizedPath)) {
      // Rewrite to /en/... so Next.js matches app/[lang]/...
      return NextResponse.rewrite(new URL(`/en${pathname}`, request.url));
    } else {
      // Invalid route (e.g. /ghdsf), redirect to default X-default page (/)
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If it has a locale, check if the rest of the path is valid
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  const restOfPath = '/' + segments.slice(1).join('/');

  const normalizedRest = restOfPath.endsWith('/') && restOfPath.length > 1 ? restOfPath.slice(0, -1) : restOfPath;

  if (!validPaths.includes(normalizedRest)) {
    // If invalid path under a locale, redirect to the locale root
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
