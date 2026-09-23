// Categories are filters over hotels with a shown view, each defined by a rule we can check in the
// data. A category page is indexed only when enough hotels pass the rule (MIN_CATEGORY_HOTELS).
import type { L } from '@/lib/i18n'
import { viewHotels, shownViews, hotelViewPois, POIS, HOTELS, type Hotel } from '@/lib/data'

export const MIN_CATEGORY_HOTELS = 4

/** Cheapest dated price for a room with a view, or the hotel's cheapest room if no view room was priced. */
export const viewPrice = (h: Hotel) => {
  const v = Object.values(h.viewOffers)
  return v.length ? Math.min(...v) : h.offer?.from ?? null
}
export const BUDGET_MAX = 250

export type Category = {
  id: string
  icon: string
  name: L
  short: L
  slug: L
  rule: (h: Hotel) => boolean
}

export const CATEGORIES: Category[] = [
  {
    id: 'luxury', icon: '✦', rule: (h) => (h.stars ?? 0) >= 5,
    name: { en: 'Luxury hotels with a view', es: 'Hoteles de lujo con vistas', de: 'Luxushotels mit Aussicht' },
    short: { en: 'Luxury', es: 'Lujo', de: 'Luxus' },
    slug: { en: 'luxury-hotels-with-a-view', es: 'hoteles-de-lujo-con-vistas', de: 'luxushotels-mit-aussicht' },
  },
  {
    id: 'budget', icon: '€', rule: (h) => (viewPrice(h) ?? Infinity) <= BUDGET_MAX,
    name: { en: 'Affordable hotels with a view', es: 'Hoteles con vistas baratos', de: 'Günstige Hotels mit Aussicht' },
    short: { en: 'Small budget', es: 'Poco presupuesto', de: 'Kleines Budget' },
    slug: { en: 'affordable-hotels-with-a-view', es: 'hoteles-baratos-con-vistas', de: 'guenstige-hotels-mit-aussicht' },
  },
  {
    id: 'family', icon: '☺', rule: (h) => h.amenities.familyRooms === true,
    name: { en: 'Family hotels with a view', es: 'Hoteles con vistas para familias', de: 'Familienhotels mit Aussicht' },
    short: { en: 'With kids', es: 'Con niños', de: 'Mit Kindern' },
    slug: { en: 'family-hotels-with-a-view', es: 'hoteles-con-vistas-para-familias', de: 'familienhotels-mit-aussicht' },
  },
  {
    id: 'balcony', icon: '⌂', rule: (h) => h.views.some((v) => v.confidence !== 'LOW' && (v.roomHasBalcony || v.context === 'BALCONY')),
    name: { en: 'Hotels with a balcony and a view', es: 'Hoteles con balcón y vistas', de: 'Hotels mit Balkon und Aussicht' },
    short: { en: 'Balcony', es: 'Balcón', de: 'Balkon' },
    slug: { en: 'hotels-with-balcony-and-view', es: 'hoteles-con-balcon-y-vistas', de: 'hotels-mit-balkon-und-aussicht' },
  },
  {
    id: 'pets', icon: '🐾', rule: (h) => h.amenities.petFriendly === true,
    name: { en: 'Pet-friendly hotels with a view', es: 'Hoteles con vistas que admiten mascotas', de: 'Hundefreundliche Hotels mit Aussicht' },
    short: { en: 'Pets welcome', es: 'Con mascota', de: 'Mit Hund' },
    slug: { en: 'pet-friendly-hotels-with-a-view', es: 'hoteles-con-vistas-que-admiten-mascotas', de: 'hundefreundliche-hotels-mit-aussicht' },
  },
  {
    id: 'air-conditioning', icon: '❄', rule: (h) => h.amenities.airConditioning === true,
    name: { en: 'Air-conditioned hotels with a view', es: 'Hoteles con vistas y aire acondicionado', de: 'Hotels mit Aussicht und Klimaanlage' },
    short: { en: 'Air conditioning', es: 'Aire acondicionado', de: 'Klimaanlage' },
    slug: { en: 'air-conditioned-hotels-with-a-view', es: 'hoteles-con-vistas-y-aire-acondicionado', de: 'hotels-mit-aussicht-und-klimaanlage' },
  },
  {
    id: 'spa', icon: '◌', rule: (h) => h.amenities.spa === true,
    name: { en: 'Hotels with a spa and a view', es: 'Hoteles con spa y vistas', de: 'Hotels mit Spa und Aussicht' },
    short: { en: 'Spa', es: 'Spa', de: 'Spa' },
    slug: { en: 'hotels-with-spa-and-view', es: 'hoteles-con-spa-y-vistas', de: 'hotels-mit-spa-und-aussicht' },
  },
]
export const category = (id: string) => CATEGORIES.find((c) => c.id === id)!

/** The landmark a hotel is best known for: most room-level evidence first. */
export function mainPoi(h: Hotel) {
  const ids = hotelViewPois(h)
  const score = (id: string) => shownViews(h, id).filter((v) => v.confidence === 'HIGH').length * 10 + shownViews(h, id).length
  return ids.sort((a, b) => score(b) - score(a))[0]
}

/** Hotels in a category: hotels with a shown view that pass the rule, strongest evidence first. */
export function categoryHotels(id: string) {
  const c = category(id)
  const withView = new Set(POIS.filter((p) => p.view).flatMap((p) => viewHotels(p.id).map((h) => h.id)))
  const rank = (h: Hotel) => (h.views.some((v) => v.confidence === 'HIGH') ? 2 : 0) + (h.rating ?? 0) / 10
  return HOTELS.filter((h) => withView.has(h.id) && c.rule(h)).sort((a, b) => rank(b) - rank(a))
}
export const categoryIndexable = (id: string) => categoryHotels(id).length >= MIN_CATEGORY_HOTELS
