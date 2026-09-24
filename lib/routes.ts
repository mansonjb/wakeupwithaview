// Route registry: every public URL, per locale, with its page type. The catch-all page resolves a
// path through this table, hreflang is read from it, and the sitemap is built from it.
import { ACTIVE, type Locale, type L } from '@/lib/i18n'
import { CATEGORIES, categoryIndexable, type Category } from '@/lib/categories'
import { GUIDES, type Guide } from '@/data/guides'
import { MONUMENT_GUIDES, type MonumentsGuide } from '@/data/monuments'
import { COUNTRY, CITY, POIS, HOTELS, hotelViewPois, viewIndexable, nearIndexable, type Poi, type Hotel } from '@/lib/data'

const SEG = {
  nearby: { en: 'nearby', es: 'cerca', de: 'in-der-naehe', pt: 'perto', pl: 'w-poblizu', fr: 'a-proximite' } as L,
  hotels: { en: 'hotels', es: 'hoteles', de: 'hotels', pt: 'hoteis', pl: 'hotele', fr: 'hotels' } as L,
  guides: { en: 'guides', es: 'guias', de: 'ratgeber', pt: 'guias', pl: 'poradniki', fr: 'guides' } as L,
  car: { en: 'car-rental', es: 'alquiler-de-coches', de: 'mietwagen', pt: 'aluguer-de-carros', pl: 'wynajem-samochodow', fr: 'location-de-voiture' } as L,
  method: { en: 'how-we-verify-views', es: 'como-verificamos-las-vistas', de: 'wie-wir-aussichten-pruefen', pt: 'como-verificamos-as-vistas', pl: 'jak-weryfikujemy-widoki', fr: 'comment-nous-verifions-les-vues' } as L,
}

export type Page =
  | { type: 'home' }
  | { type: 'country' }
  | { type: 'city' }
  | { type: 'view'; poi: Poi }
  | { type: 'near'; poi: Poi }
  | { type: 'hotel'; hotel: Hotel }
  | { type: 'method' }
  | { type: 'category'; cat: Category }
  | { type: 'guides' }
  | { type: 'guide'; guide: Guide }
  | { type: 'monuments'; guide: MonumentsGuide }
  | { type: 'car' }

export type Route = { key: string; page: Page; paths: Record<Locale, string>; index: boolean }

const p = (l: Locale, ...parts: string[]) => `/${[l, ...parts].join('/')}/`
/** Everything under a city lives under its country: /en/france/paris/eiffel-tower/ */
const c = (l: Locale, ...parts: string[]) => p(l, COUNTRY.slug[l], CITY.slug[l], ...parts)
/** A country page is only indexed once it lists more than one live city (otherwise it duplicates the city page). */
const LIVE_CITIES_IN_COUNTRY = 1
const all = (f: (l: Locale) => string) => Object.fromEntries(ACTIVE.map((l) => [l, f(l)])) as Record<Locale, string>

/** Hotels with a publishable view get their own page. Near-only hotels link straight to the partner. */
export const HOTEL_PAGES = HOTELS.filter((h) => hotelViewPois(h).length)

export const ROUTES: Route[] = [
  { key: 'home', page: { type: 'home' }, paths: all((l) => p(l)), index: true },
  { key: 'country', page: { type: 'country' }, paths: all((l) => p(l, COUNTRY.slug[l])), index: LIVE_CITIES_IN_COUNTRY > 1 },
  { key: 'city', page: { type: 'city' }, paths: all((l) => c(l)), index: true },
  { key: 'method', page: { type: 'method' }, paths: all((l) => p(l, SEG.method[l])), index: true },
  ...POIS.filter((x) => x.view).map((x): Route => ({
    key: `view:${x.id}`, page: { type: 'view', poi: x }, paths: all((l) => c(l, x.slug[l])), index: viewIndexable(x.id),
  })),
  ...POIS.filter((x) => x.near).map((x): Route => ({
    key: `near:${x.id}`, page: { type: 'near', poi: x }, paths: all((l) => c(l, x.slug[l], SEG.nearby[l])), index: nearIndexable(x.id),
  })),
  ...CATEGORIES.map((x): Route => ({
    key: `cat:${x.id}`, page: { type: 'category', cat: x }, paths: all((l) => c(l, x.slug[l])), index: categoryIndexable(x.id),
  })),
  { key: 'guides', page: { type: 'guides' }, paths: all((l) => p(l, SEG.guides[l])), index: true },
  ...GUIDES.map((g): Route => ({ key: `guide:${g.id}`, page: { type: 'guide', guide: g }, paths: all((l) => p(l, SEG.guides[l], g.slug[l])), index: true })),
  ...MONUMENT_GUIDES.map((g): Route => ({ key: `guide:${g.id}`, page: { type: 'monuments', guide: g }, paths: all((l) => p(l, SEG.guides[l], g.slug[l])), index: true })),
  { key: 'car', page: { type: 'car' }, paths: all((l) => c(l, SEG.car[l])), index: true },
  ...HOTEL_PAGES.map((h): Route => ({
    key: `hotel:${h.id}`, page: { type: 'hotel', hotel: h }, paths: all((l) => c(l, SEG.hotels[l], h.slug)), index: true,
  })),
]

const byPath = new Map<string, Route>()
for (const r of ROUTES) for (const l of ACTIVE) byPath.set(r.paths[l], r)
export const resolve = (path: string) => byPath.get(path)
export const route = (key: string) => ROUTES.find((r) => r.key === key)
export const href = (key: string, l: Locale) => route(key)?.paths[l] ?? `/${l}/`
