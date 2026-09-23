import type { Metadata } from 'next'
import { ACTIVE, OG_LOCALE, type Locale } from '@/lib/i18n'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import type { Route } from '@/lib/routes'

/** canonical + hreflang (all active locales + x-default) + robots gate, from the route registry. */
export function pageMeta(r: Route, l: Locale, title: string, description: string, image?: string | null): Metadata {
  const languages: Record<string, string> = Object.fromEntries(ACTIVE.map((x) => [x, `${SITE_URL}${r.paths[x]}`]))
  languages['x-default'] = `${SITE_URL}${r.paths.en}`
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${r.paths[l]}`, languages },
    robots: r.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title, description, url: `${SITE_URL}${r.paths[l]}`, siteName: SITE_NAME, locale: OG_LOCALE[l], type: 'website',
      alternateLocale: ACTIVE.filter((x) => x !== l).map((x) => OG_LOCALE[x]),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description },
  }
}

export const abs = (path: string) => `${SITE_URL}${path}`
