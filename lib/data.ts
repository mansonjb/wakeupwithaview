import paris from '@/data/normalized/paris.json'
import type { L } from '@/lib/i18n'

export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW'
export type ViewContext = 'ROOM' | 'BALCONY' | 'TERRACE' | 'ROOFTOP' | 'RESTAURANT' | 'BAR' | 'POOL' | 'COMMON_AREA' | 'UNKNOWN'
export type Tri = true | null // UNKNOWN is null, never false (brief §13)

export type ViewRel = {
  poi: string
  level: 'room' | 'hotel'
  room?: string
  confidence: Confidence
  context: ViewContext
  partial?: boolean
  alternative?: boolean
  highFloor?: boolean
  some?: boolean
  roomHasBalcony?: boolean
  roomHasTerrace?: boolean
  source: 'room_name' | 'hotel_description'
  sourceText: string
}

export type Hotel = {
  id: string
  slug: string
  name: string
  provider: string
  sourceUrl: string
  address: string | null
  lat: number
  lng: number
  type: string
  stars: number | null
  rating: number | null
  reviews: number
  description: string
  image: string | null
  images: string[]
  amenities: Record<string, Tri>
  views: ViewRel[]
  distances: Record<string, number>
  offer: { from: number; currency: string; checkIn: string; checkOut: string; adults: number; retrievedAt: string } | null
  viewOffers: Record<string, number>
  lastScrapedAt: string
}

export type PoiType = 'monument' | 'museum' | 'river' | 'skyline' | 'district' | 'square' | 'church'

export type Poi = {
  id: string
  type: PoiType
  lat: number
  lng: number
  /** has a VIEW page (a view is a claim we can source) */
  view: boolean
  /** has a NEAR page */
  near: boolean
  name: L
  slug: L
  wikidata?: string
  /** landmarks close by, for internal links (computed below, sorted by distance) */
  arrondissement?: string
}

/** Paris landmarks. Slugs are localized per language (brief §30). */
export const POIS: Poi[] = [
  { id: 'eiffel-tower', type: 'monument', lat: 48.85837, lng: 2.294481, view: true, near: true, wikidata: 'Q243', arrondissement: '7',
    name: { en: 'Eiffel Tower', es: 'Torre Eiffel', de: 'Eiffelturm', pt: 'Torre Eiffel', pl: 'Wieża Eiffla', fr: 'Tour Eiffel' },
    slug: { en: 'eiffel-tower', es: 'torre-eiffel', de: 'eiffelturm', pt: 'torre-eiffel', pl: 'wieza-eiffla', fr: 'tour-eiffel' } },
  { id: 'notre-dame', type: 'church', lat: 48.852968, lng: 2.349902, view: true, near: true, wikidata: 'Q2981', arrondissement: '4',
    name: { en: 'Notre-Dame', es: 'Notre Dame', de: 'Notre-Dame', pt: 'Notre-Dame', pl: 'Notre-Dame', fr: 'Notre-Dame' },
    slug: { en: 'notre-dame', es: 'notre-dame', de: 'notre-dame', pt: 'notre-dame', pl: 'notre-dame', fr: 'notre-dame' } },
  { id: 'arc-de-triomphe', type: 'monument', lat: 48.873792, lng: 2.295028, view: true, near: true, wikidata: 'Q64436', arrondissement: '8',
    name: { en: 'Arc de Triomphe', es: 'Arco del Triunfo', de: 'Triumphbogen', pt: 'Arco do Triunfo', pl: 'Łuk Triumfalny', fr: 'Arc de Triomphe' },
    slug: { en: 'arc-de-triomphe', es: 'arco-del-triunfo', de: 'triumphbogen', pt: 'arco-do-triunfo', pl: 'luk-triumfalny', fr: 'arc-de-triomphe' } },
  { id: 'seine', type: 'river', lat: 48.8566, lng: 2.3426, view: true, near: false, wikidata: 'Q1471',
    name: { en: 'the Seine', es: 'el Sena', de: 'die Seine', pt: 'o Sena', pl: 'Sekwana', fr: 'la Seine' },
    slug: { en: 'seine', es: 'sena', de: 'seine', pt: 'sena', pl: 'sekwana', fr: 'seine' } },
  { id: 'paris-rooftops', type: 'skyline', lat: 48.8566, lng: 2.3522, view: true, near: false,
    name: { en: 'the Paris rooftops', es: 'los tejados de París', de: 'die Dächer von Paris', pt: 'os telhados de Paris', pl: 'dachy Paryża', fr: 'les toits de Paris' },
    slug: { en: 'paris-rooftops', es: 'tejados-de-paris', de: 'daecher-von-paris', pt: 'telhados-de-paris', pl: 'dachy-paryza', fr: 'toits-de-paris' } },
  { id: 'sacre-coeur', type: 'church', lat: 48.886705, lng: 2.343104, view: true, near: true, wikidata: 'Q188856', arrondissement: '18',
    name: { en: 'Sacré-Cœur', es: 'Sacré-Cœur', de: 'Sacré-Cœur', pt: 'Sacré-Cœur', pl: 'Sacré-Cœur', fr: 'Sacré-Cœur' },
    slug: { en: 'sacre-coeur', es: 'sacre-coeur', de: 'sacre-coeur', pt: 'sacre-coeur', pl: 'sacre-coeur', fr: 'sacre-coeur' } },
  { id: 'louvre', type: 'museum', lat: 48.860611, lng: 2.337644, view: false, near: false, wikidata: 'Q19675',
    name: { en: 'the Louvre', es: 'el Louvre', de: 'der Louvre', pt: 'o Louvre', pl: 'Luwr', fr: 'le Louvre' },
    slug: { en: 'louvre', es: 'louvre', de: 'louvre', pt: 'louvre', pl: 'luwr', fr: 'louvre' } },
  { id: 'musee-d-orsay', type: 'museum', lat: 48.859961, lng: 2.326561, view: false, near: false,
    name: { en: 'Musée d’Orsay', es: 'Museo de Orsay', de: 'Musée d’Orsay', pt: 'Museu d’Orsay', pl: 'Musée d’Orsay', fr: 'Musée d’Orsay' },
    slug: { en: 'musee-d-orsay', es: 'museo-de-orsay', de: 'musee-d-orsay', pt: 'museu-d-orsay', pl: 'musee-d-orsay', fr: 'musee-d-orsay' } },
  { id: 'invalides', type: 'monument', lat: 48.856, lng: 2.3125, view: false, near: false,
    name: { en: 'Les Invalides', es: 'Los Inválidos', de: 'Invalidendom', pt: 'Os Inválidos', pl: 'Pałac Inwalidów', fr: 'Les Invalides' },
    slug: { en: 'invalides', es: 'invalidos', de: 'invalidendom', pt: 'invalidos', pl: 'inwalidzi', fr: 'invalides' } },
  { id: 'trocadero', type: 'square', lat: 48.8616, lng: 2.2893, view: false, near: false,
    name: { en: 'Trocadéro', es: 'Trocadéro', de: 'Trocadéro', pt: 'Trocadéro', pl: 'Trocadéro', fr: 'Trocadéro' },
    slug: { en: 'trocadero', es: 'trocadero', de: 'trocadero', pt: 'trocadero', pl: 'trocadero', fr: 'trocadero' } },
  { id: 'pantheon', type: 'monument', lat: 48.846222, lng: 2.346414, view: false, near: false,
    name: { en: 'the Panthéon', es: 'el Panteón', de: 'das Panthéon', pt: 'o Panteão', pl: 'Panteon', fr: 'le Panthéon' },
    slug: { en: 'pantheon', es: 'panteon', de: 'pantheon', pt: 'panteao', pl: 'panteon', fr: 'pantheon' } },
  { id: 'opera-garnier', type: 'monument', lat: 48.87197, lng: 2.331601, view: false, near: false,
    name: { en: 'Opéra Garnier', es: 'Ópera Garnier', de: 'Opéra Garnier', pt: 'Ópera Garnier', pl: 'Opera Garnier', fr: 'Opéra Garnier' },
    slug: { en: 'opera-garnier', es: 'opera-garnier', de: 'opera-garnier', pt: 'opera-garnier', pl: 'opera-garnier', fr: 'opera-garnier' } },
  { id: 'montmartre', type: 'district', lat: 48.8867, lng: 2.3431, view: false, near: false,
    name: { en: 'Montmartre', es: 'Montmartre', de: 'Montmartre', pt: 'Montmartre', pl: 'Montmartre', fr: 'Montmartre' },
    slug: { en: 'montmartre', es: 'montmartre', de: 'montmartre', pt: 'montmartre', pl: 'montmartre', fr: 'montmartre' } },
]
export const poi = (id: string) => POIS.find((p) => p.id === id)!

/** Country level of the hierarchy: country > city > landmark. */
export const COUNTRY = {
  id: 'france', code: 'FR',
  name: { en: 'France', es: 'Francia', de: 'Frankreich', pt: 'França', pl: 'Francja', fr: 'France' } as L,
  slug: { en: 'france', es: 'francia', de: 'frankreich', pt: 'franca', pl: 'francja', fr: 'france' } as L,
}

export const CITY = {
  id: 'paris', lat: 48.8566, lng: 2.3522, country: 'france',
  name: { en: 'Paris', es: 'París', de: 'Paris', pt: 'Paris', pl: 'Paryż', fr: 'Paris' } as L,
  slug: { en: 'paris', es: 'paris', de: 'paris', pt: 'paris', pl: 'paryz', fr: 'paris' } as L,
}

export const HOTELS = paris.hotels as unknown as Hotel[]
export const DATA_DATE = paris.generatedAt.slice(0, 10)
export const hotelBySlug = (s: string) => HOTELS.find((h) => h.slug === s)

/** A view we may state publicly: HIGH (room level) or MEDIUM (hotel level). LOW is kept in data, never shown. */
export const shownViews = (h: Hotel, poiId: string) => h.views.filter((v) => v.poi === poiId && v.confidence !== 'LOW')

/** Best claim first: room-level HIGH beats hotel-level MEDIUM; full view beats partial/alternative. */
export function bestView(h: Hotel, poiId: string): ViewRel | undefined {
  const score = (v: ViewRel) => (v.confidence === 'HIGH' ? 10 : 5) - (v.partial ? 3 : 0) - (v.alternative ? 2 : 0) + (v.highFloor ? 0 : 1)
  return shownViews(h, poiId).sort((a, b) => score(b) - score(a))[0]
}

/** Strength of the evidence, then guest rating weighted by review volume. */
const evidence = (h: Hotel, poiId: string) => {
  const v = bestView(h, poiId)!
  return (v.confidence === 'HIGH' ? 2 : 0) + (v.partial || v.alternative ? -1 : 0)
}
export function viewHotels(poiId: string) {
  return HOTELS.filter((h) => shownViews(h, poiId).length)
    .sort((a, b) => evidence(b, poiId) - evidence(a, poiId) || (b.rating ?? 0) * Math.log10(b.reviews + 10) - (a.rating ?? 0) * Math.log10(a.reviews + 10))
}

/** Hotels within `max` metres, sorted by distance. Hotels with no rating yet are left out of NEAR lists. */
export function nearHotels(poiId: string, max = 1500) {
  return HOTELS.filter((h) => h.distances[poiId] <= max && h.rating).sort((a, b) => a.distances[poiId] - b.distances[poiId])
}

/** Indexing gate (brief §22/§47): demand + enough inventory + own value. Below the bar a page renders but is noindex. */
export const MIN_VIEW_HOTELS = 4
export const MIN_NEAR_HOTELS = 8
export const viewIndexable = (poiId: string) => viewHotels(poiId).length >= MIN_VIEW_HOTELS
export const nearIndexable = (poiId: string) => nearHotels(poiId).length >= MIN_NEAR_HOTELS

/** Straight-line distance between two landmarks, for "nearby landmarks" links (computed, not editorial). */
export function poiDistance(a: Poi, b: Poi) {
  const r = (d: number) => (d * Math.PI) / 180
  const x = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2
  return Math.round(2 * 6371000 * Math.asin(Math.sqrt(x)))
}
export const nearbyPois = (p: Poi, n = 5) =>
  POIS.filter((x) => x.id !== p.id && x.type !== 'river' && x.type !== 'skyline').map((x) => ({ poi: x, d: poiDistance(p, x) })).sort((a, b) => a.d - b.d).slice(0, n)

/** Headline counts for a hotel: which landmarks it can show. */
export const hotelViewPois = (h: Hotel) => [...new Set(h.views.filter((v) => v.confidence !== 'LOW').map((v) => v.poi))]

/** Hotels that get a page: any publishable view, or within 1.5 km of a NEAR landmark with a rating. */
export const PAGE_HOTELS = HOTELS.filter((h) => hotelViewPois(h).length || (h.rating && POIS.some((p) => p.near && h.distances[p.id] <= 1500)))
