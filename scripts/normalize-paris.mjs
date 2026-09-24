// RAW (data/raw/paris-*.json) -> NORMALIZED (data/normalized/paris.json).
// Rules from the brief: never invent a view, UNKNOWN is not FALSE, keep source_text for every claim.
import { readFile, writeFile, readdir } from 'node:fs/promises'

const POIS = [
  // view + near landmarks
  { id: 'eiffel-tower', lat: 48.85837, lng: 2.294481, view: true,
    re: /\b(eiffel(\s+tower)?|tour\s+eiffel)\b/i, not: /\b(avenue|av\.?|rue|quai)\s+(de\s+la\s+)?tour\s+eiffel/i },
  { id: 'sacre-coeur', lat: 48.886705, lng: 2.343104, view: true, re: /sacr[eé]\s*-?\s*c(o|œ)eur/i },
  { id: 'notre-dame', lat: 48.852968, lng: 2.349902, view: true,
    re: /notre[\s-]dame/i, not: /notre[\s-]dame[\s-](des|de)[\s-]/i },
  { id: 'arc-de-triomphe', lat: 48.873792, lng: 2.295028, view: true, re: /arc\s+de\s+triomphe/i },
  { id: 'seine', lat: 48.8566, lng: 2.3426, view: true, river: true, re: /\b(seine|river)\b/i },
  { id: 'paris-rooftops', lat: 48.8566, lng: 2.3522, view: true, skyline: true,
    re: /(roofs|rooftops)\s+of\s+paris|paris('|’)?\s*rooftops|(roofs|rooftops)\s+of\s+the\s+city|views?\s+(over|of|across)\s+(the\s+city\s+of\s+)?paris\b/i },
  // near-only landmarks (distance is computable, a view is not claimed)
  { id: 'louvre', lat: 48.860611, lng: 2.337644 },
  { id: 'musee-d-orsay', lat: 48.859961, lng: 2.326561 },
  { id: 'invalides', lat: 48.856, lng: 2.3125 },
  { id: 'trocadero', lat: 48.8616, lng: 2.2893 },
  { id: 'pantheon', lat: 48.846222, lng: 2.346414 },
  { id: 'opera-garnier', lat: 48.871970, lng: 2.331601 },
  { id: 'montmartre', lat: 48.8867, lng: 2.3431 },
]
const VIEW_WORD = /\b(view|views|vue|overlook(s|ing)?|facing|looking out|panoram(a|ic))\b/i
// Where the view is from. A venue (rooftop bar, restaurant) wins; balcony/terrace only when the
// sentence says the view is from it; otherwise rooms.
const CONTEXTS = [
  ['ROOFTOP', /roof\s?top\s+(terrace|bar|restaurant|pool|garden|lounge)|roof\s+terrace|top[- ]floor\s+(terrace|bar|restaurant)/i],
  ['RESTAURANT', /restaurant|dining room/i],
  ['BAR', /\bbar\b/i],
  ['COMMON_AREA', /fitness|gym\b|hammam|\bspa\b(?! bath)|lobby|lounge|library|breakfast room/i],
  ['BALCONY', /balcon\w*\s+(with|offering|overlooking)/i],
  ['TERRACE', /terraces?\s+(with|offering|overlooking)/i],
  ['ROOM', /\brooms?\b|suites?\b|\bsome have\b|mansard|floor/i],
]
// Proximity and location phrasing is not a view (brief §8): "400 metres from the Arc de Triomphe",
// "located across the Seine". Removed before matching.
const NOT_A_VIEW = [
  /\b\d[\d.,]*\s*(-\s*)?(metres?|meters?|m|km|kilomet(re|er)s?|minutes?|min)\b(\s+walk(ing)?)?(\s+away)?\s+(from|to)\s+(the\s+)?[A-Z][\w’'-]*(\s+[A-Za-z][\w’'-]*){0,3}/g,
  /\b(across|along|on the banks of|by|near|next to|close to|steps from)\s+the\s+(Seine|river)\b/gi,
  /\bwhich is a[\w\s-]*walk away\b/gi,
]
const stripProximity = (s) => NOT_A_VIEW.reduce((t, re) => t.replace(re, ' '), s)
const HOTEL_TYPES = new Set(['hotel', 'aparthotel'])

const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const R = 6371000, rad = (d) => (d * Math.PI) / 180
const hav = (a, b) => {
  const x = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(x)))
}
const sentences = (t) => (t || '').replace(/About this property/gi, '. ').split(/(?<=[.!?])\s*(?=[A-Z“"])/).map((s) => s.trim()).filter(Boolean)
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function mentions(poi, text) {
  if (!poi.re.test(text)) return false
  if (poi.not && poi.not.test(text) && !poi.re.test(text.replace(new RegExp(poi.not.source, 'gi'), ''))) return false
  return true
}

const files = (await readdir('data/raw')).filter((f) => f.startsWith('paris-'))
const byId = new Map()
for (const f of files) {
  const raw = JSON.parse(await readFile(`data/raw/${f}`, 'utf-8'))
  for (const h of raw.items) {
    const key = String(h.hotelId || h.url)
    if (!byId.has(key)) byId.set(key, { h, source: f, scrapedAt: raw.scrapedAt })
  }
}

const hotels = []
for (const { h, source, scrapedAt } of byId.values()) {
  if (!HOTEL_TYPES.has(h.type)) continue
  const lat = Number(h.location?.lat), lng = Number(h.location?.lng)
  if (!lat || !lng) continue
  const nameRe = new RegExp(escape(h.name), 'gi')
  const clean = (t) => (t || '').replace(nameRe, ' ')

  // ROOMS (only the categories we can say something about are kept as rows)
  const roomNames = [...new Set((h.rooms || []).map((r) => r.roomType).filter(Boolean))]
  const roomFac = (h.rooms || []).flatMap((r) => r.facilities || [])
  const hotelFac = (h.facilities || []).flatMap((g) => (g.facilities || []).map((x) => x.name))
  const allText = [h.description, ...roomNames, ...roomFac, ...hotelFac].join(' | ')

  // VIEW relations
  const views = []
  for (const poi of POIS.filter((p) => p.view)) {
    for (const rn of roomNames) {
      const t = clean(rn)
      if (!mentions(poi, t)) continue
      const hasWord = VIEW_WORD.test(t)
      views.push({
        poi: poi.id, level: 'room', room: rn,
        confidence: hasWord ? 'HIGH' : 'LOW',
        context: 'ROOM',
        partial: /partial/i.test(t),
        alternative: /\bor\b/i.test(t) && POIS.filter((p) => p.view && p.id !== poi.id && mentions(p, t)).length > 0,
        highFloor: /high(er)?\s*floor|upper\s*floor/i.test(t),
        roomHasBalcony: /balcon/i.test(t) || undefined,
        roomHasTerrace: /terrace/i.test(t) || undefined,
        source: 'room_name', sourceText: rn,
      })
    }
    for (const full of sentences(clean(h.description))) {
      const s = stripProximity(full)
      if (!mentions(poi, s) || !VIEW_WORD.test(s)) continue
      if (/distance in property description|rated it/i.test(s)) continue
      if (poi.id === 'seine' && !/seine|river/i.test(s)) continue
      const ctx = CONTEXTS.find(([, re]) => re.test(s))?.[0] || 'UNKNOWN'
      views.push({
        // Temporary venues (pop-ups, seasonal bars) are not a lasting attribute of the hotel.
        poi: poi.id, level: 'hotel', confidence: /pop-?up|limited time|seasonal/i.test(s) ? 'LOW' : 'MEDIUM', context: ctx,
        some: /\b(some|certain|selected|most)\b/i.test(s),
        source: 'hotel_description', sourceText: full,
      })
    }
  }

  // AMENITIES: TRUE or UNKNOWN, never FALSE from absence of a mention
  // Temporary venues (pop-ups) are not a lasting amenity either.
  const lasting = allText.split(/(?<=[.!?|])\s*/).filter((x) => !/pop-?up|limited time/i.test(x)).join(' ')
  const tri = (re) => (re.test(lasting) ? true : null)
  const amen = {
    balcony: tri(/balcon/i), terrace: tri(/terrace/i), rooftop: tri(/roof\s?top/i),
    restaurant: tri(/restaurant/i), bar: tri(/\bbar\b/i), spa: tri(/\bspa\b/i),
    pool: tri(/\bpool\b/i), gym: tri(/fitness|gym/i), parking: tri(/parking/i),
    airConditioning: tri(/air conditioning/i), familyRooms: tri(/family room/i),
    petFriendly: tri(/pets allowed/i), accessible: tri(/wheelchair|accessible/i),
  }

  // PRICE: dated snapshot only
  const opts = (h.rooms || []).flatMap((r) => (r.options || []).map((o) => ({ p: o.price, room: r.roomType })))
    .filter((o) => o.p > 0).sort((a, b) => a.p - b.p)
  const offer = opts[0] ? { from: Math.round(opts[0].p), currency: 'EUR', checkIn: h.checkInDate || '2026-11-12',
    checkOut: h.checkOutDate || '2026-11-13', adults: 2, retrievedAt: (h.timeOfScrapeISO || scrapedAt).slice(0, 10) } : null
  const viewOffer = (poi) => {
    const rn = new Set(views.filter((v) => v.poi === poi && v.level === 'room' && v.confidence === 'HIGH').map((v) => v.room))
    const o = opts.find((x) => rn.has(x.room))
    return o ? Math.round(o.p) : null
  }

  const distances = Object.fromEntries(POIS.filter((p) => !p.river && !p.skyline).map((p) => [p.id, hav({ lat, lng }, p)]))

  hotels.push({
    id: `bk-${h.hotelId}`, slug: slug(h.name), name: h.name,
    provider: 'booking', providerId: h.hotelId, sourceUrl: (h.url || '').split('?')[0],
    address: h.address?.full || null, lat, lng,
    type: h.type, stars: h.stars || null,
    rating: h.rating || null, reviews: h.reviews || 0,
    description: h.description || '',
    image: h.image || null, images: (h.images || []).slice(0, 6),
    amenities: amen, views, distances, offer,
    viewOffers: Object.fromEntries(POIS.filter((p) => p.view).map((p) => [p.id, viewOffer(p.id)]).filter(([, v]) => v)),
    rawSource: source, firstScrapedAt: scrapedAt.slice(0, 10), lastScrapedAt: scrapedAt.slice(0, 10),
  })
}

// slug collisions
const seen = new Map()
for (const h of hotels) { const n = seen.get(h.slug) || 0; seen.set(h.slug, n + 1); if (n) h.slug += `-${n + 1}` }

hotels.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
await writeFile('data/normalized/paris.json', JSON.stringify({ city: 'paris', generatedAt: new Date().toISOString(), pois: POIS.map(({ re, not, ...p }) => p), hotels }, null, 1))

const pub = (poi) => hotels.filter((h) => h.views.some((v) => v.poi === poi && v.confidence !== 'LOW'))
console.log('hotels', hotels.length)
for (const p of POIS.filter((p) => p.view)) console.log(p.id.padEnd(16), 'publishable views:', pub(p.id).length, ' LOW only:', hotels.filter((h) => h.views.some((v) => v.poi === p.id) && !pub(p.id).includes(h)).length)
