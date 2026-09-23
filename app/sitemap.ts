import type { MetadataRoute } from 'next'
import { ACTIVE } from '@/lib/i18n'
import { ROUTES } from '@/lib/routes'
import { SITE_URL } from '@/lib/site'
import { DATA_DATE } from '@/lib/data'

// One sitemap per language (/sitemap/en.xml ...), listed in /sitemap-index.xml and robots.txt.
// Only indexable routes are listed (the indexing gate lives in lib/routes.ts).
export async function generateSitemaps() {
  return ACTIVE.map((id) => ({ id }))
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const l = (await props.id) as (typeof ACTIVE)[number]
  return ROUTES.filter((r) => r.index).map((r) => ({
    url: `${SITE_URL}${r.paths[l]}`,
    lastModified: DATA_DATE,
    alternates: { languages: { ...Object.fromEntries(ACTIVE.map((x) => [x, `${SITE_URL}${r.paths[x]}`])), 'x-default': `${SITE_URL}${r.paths.en}` } },
  }))
}
