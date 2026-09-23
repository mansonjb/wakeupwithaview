// Route registry: every public URL, per locale, with its page type. The catch-all page resolves a
// path through this table, hreflang is read from it, and the sitemap is built from it.
import { ACTIVE, type Locale, type L } from '@/lib/i18n'
import { CITY, POIS, HOTELS, hotelViewPois, viewIndexable, nearIndexable, type Poi, type Hotel } from '@/lib/data'

const SEG = {
  nearby: { en: 'nearby', es: 'cerca', de: 'in-der-naehe', pt: 'perto', pl: 'w-poblizu', fr: 'a-proximite' } as L,
  hotels: { en: 'hotels', es: 'hoteles', de: 'hotels', pt: 'hoteis', pl: 'hotele', fr: 'hotels' } as L,
  method: { en: 'how-we-verify-views', es: 'como-verificamos-las-vistas', de: 'wie-wir-aussichten-pruefen', pt: 'como-verificamos-as-vistas', pl: 'jak-weryfikujemy-widoki', fr: 'comment-nous-verifions-les-vues' } as L,
}

export type Page =
  | { type: 'home' }
  | { type: 'city' }
  | { type: 'view'; poi: Poi }
  | { type: 'near'; poi: Poi }
  | { type: 'hotel'; hotel: Hotel }
  | { type: 'method' }

export type Route = { key: string; page: Page; paths: Record<Locale, string>; index: boolean }

const p = (l: Locale, ...parts: string[]) => `/${[l, ...parts].join('/')}/`
const all = (f: (l: Locale) => string) => Object.fromEntries(ACTIVE.map((l) => [l, f(l)])) as Record<Locale, string>

/** Hotels with a publishable view get their own page. Near-only hotels link straight to the partner. */
export const HOTEL_PAGES = HOTELS.filter((h) => hotelViewPois(h).length)

export const ROUTES: Route[] = [
  { key: 'home', page: { type: 'home' }, paths: all((l) => p(l)), index: true },
  { key: 'city', page: { type: 'city' }, paths: all((l) => p(l, CITY.slug[l])), index: true },
  { key: 'method', page: { type: 'method' }, paths: all((l) => p(l, SEG.method[l])), index: true },
  ...POIS.filter((x) => x.view).map((x): Route => ({
    key: `view:${x.id}`, page: { type: 'view', poi: x }, paths: all((l) => p(l, CITY.slug[l], x.slug[l])), index: viewIndexable(x.id),
  })),
  ...POIS.filter((x) => x.near).map((x): Route => ({
    key: `near:${x.id}`, page: { type: 'near', poi: x }, paths: all((l) => p(l, CITY.slug[l], x.slug[l], SEG.nearby[l])), index: nearIndexable(x.id),
  })),
  ...HOTEL_PAGES.map((h): Route => ({
    key: `hotel:${h.id}`, page: { type: 'hotel', hotel: h }, paths: all((l) => p(l, CITY.slug[l], SEG.hotels[l], h.slug)), index: true,
  })),
]

const byPath = new Map<string, Route>()
for (const r of ROUTES) for (const l of ACTIVE) byPath.set(r.paths[l], r)
export const resolve = (path: string) => byPath.get(path)
export const route = (key: string) => ROUTES.find((r) => r.key === key)
export const href = (key: string, l: Locale) => route(key)?.paths[l] ?? `/${l}/`
