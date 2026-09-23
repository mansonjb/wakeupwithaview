import { ACTIVE } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'
import { DATA_DATE } from '@/lib/data'

export const dynamic = 'force-static'

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ACTIVE.map((l) => `  <sitemap><loc>${SITE_URL}/sitemap/${l}.xml</loc><lastmod>${DATA_DATE}</lastmod></sitemap>`).join('\n')}
</sitemapindex>`
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
