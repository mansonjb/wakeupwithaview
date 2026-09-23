// Numbers the editorial quotes. Computed from the normalized data at build time, never typed by hand.
import { viewHotels, nearHotels, shownViews, type Hotel } from '@/lib/data'

const median = (xs: number[]) => {
  if (!xs.length) return null
  const s = [...xs].sort((a, b) => a - b), m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

export type ViewStats = {
  count: number
  roomNamed: number
  balconyNamed: number
  highFloorNamed: number
  partialOnly: number
  closest?: { hotel: Hotel; d: number }
  farthest?: { hotel: Hotel; d: number }
  premiumMedian: number | null
  premiumN: number
  cheapestView?: { hotel: Hotel; price: number }
  priceDate: string | null
  under1km: number
  over2km: number
}

export function viewStats(poiId: string): ViewStats {
  const hs = viewHotels(poiId)
  const roomLevel = (h: Hotel) => shownViews(h, poiId).filter((v) => v.confidence === 'HIGH')
  const withD = hs.filter((h) => h.distances[poiId] != null).map((h) => ({ hotel: h, d: h.distances[poiId] })).sort((a, b) => a.d - b.d)
  const premiums = hs.filter((h) => h.viewOffers[poiId] && h.offer?.from).map((h) => ((h.viewOffers[poiId] - h.offer!.from) / h.offer!.from) * 100)
  const cheap = hs.filter((h) => h.viewOffers[poiId]).map((h) => ({ hotel: h, price: h.viewOffers[poiId] })).sort((a, b) => a.price - b.price)[0]
  return {
    count: hs.length,
    roomNamed: hs.filter((h) => roomLevel(h).length).length,
    balconyNamed: hs.filter((h) => roomLevel(h).some((v) => v.roomHasBalcony)).length,
    highFloorNamed: hs.filter((h) => roomLevel(h).some((v) => v.highFloor)).length,
    partialOnly: hs.filter((h) => shownViews(h, poiId).every((v) => v.partial || v.alternative)).length,
    closest: withD[0],
    farthest: withD.at(-1),
    premiumMedian: premiums.length ? Math.round(median(premiums)!) : null,
    premiumN: premiums.length,
    cheapestView: cheap,
    priceDate: hs.find((h) => h.offer)?.offer?.checkIn ?? null,
    under1km: withD.filter((x) => x.d < 1000).length,
    over2km: withD.filter((x) => x.d >= 2000).length,
  }
}

export function nearStats(poiId: string) {
  const hs = nearHotels(poiId)
  const band = (a: number, b: number) => hs.filter((h) => h.distances[poiId] >= a && h.distances[poiId] < b).length
  const withView = hs.filter((h) => shownViews(h, poiId).length).length
  const rated = hs.filter((h) => h.rating)
  return {
    count: hs.length,
    bands: [band(0, 250), band(250, 500), band(500, 1000), band(1000, 1500)],
    withView,
    medianRating: median(rated.map((h) => h.rating!)),
    medianPrice: median(hs.filter((h) => h.offer).map((h) => h.offer!.from)),
    priceDate: hs.find((h) => h.offer)?.offer?.checkIn ?? null,
  }
}
