// Canonical host is fixed in code: an env var naming *.vercel.app is ignored (it once leaked into
// canonicals and sitemaps on a sister site).
const ENV_URL = process.env.NEXT_PUBLIC_SITE_URL || ''
export const SITE_URL = (ENV_URL && !ENV_URL.includes('vercel.app') ? ENV_URL : 'https://www.wakeupwithaview.com').replace(/\/$/, '')
export const SITE_NAME = 'Wake Up With A View'

/** Stay22 partner id (account level, shared across the network). */
export const STAY22_AID = 'eijeanbaptistemanson'

/**
 * Affiliate layer, kept apart from the hotel model (brief §38): a hotel is ours, Stay22 is just
 * the current provider. Swapping provider means rewriting this file only.
 */
export type TrackCtx = {
  city: string
  landmark?: string
  hotelId?: string
  lang: string
  pageType: 'view' | 'near' | 'hotel' | 'city' | 'home'
  viewContext?: string
  position?: number
}

/** Stay22 reads campaign labels separated by underscores (brief §40: city, landmark, hotel, lang, page, context, position). */
export function campaign(c: TrackCtx) {
  return ['wuwav', c.city, c.landmark, c.lang, c.pageType, c.viewContext, c.position ? `p${String(c.position).padStart(2, '0')}` : '', c.hotelId]
    .filter(Boolean).join('_').replace(/-/g, '').toLowerCase()
}

export function hotelLink(h: { name: string; lat: number; lng: number }, c: TrackCtx) {
  const q = new URLSearchParams({
    aid: STAY22_AID, campaign: campaign(c), hotelname: h.name, address: `${h.name}, Paris, France`,
    lat: String(h.lat), lng: String(h.lng), currency: 'EUR', adults: '2', lang: c.lang,
  })
  return `https://www.stay22.com/allez/roam?${q}`
}

export function areaLink(lat: number, lng: number, c: TrackCtx) {
  const q = new URLSearchParams({ aid: STAY22_AID, campaign: campaign(c), address: 'Paris, France', lat: String(lat), lng: String(lng), currency: 'EUR', adults: '2', lang: c.lang })
  return `https://www.stay22.com/allez/roam?${q}`
}
