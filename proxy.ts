import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Every locale is prefixed. The bare root goes to English (x-default); a path without a locale
// prefix is assumed to be English and redirected once, permanently.
const LOCALES = ['en', 'es', 'de']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '/' : pathname}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Skip Next internals and any path with a file extension (sitemaps, robots.txt, icons, images)
  matcher: ['/((?!_next|.*\\..*).*)'],
}
