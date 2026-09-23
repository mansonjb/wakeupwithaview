// Phase 1 POC: raw Booking.com data for Paris view landmarks via Apify (voyager~booking-scraper).
// Output: data/raw/paris-<zone>-<date>.json (RAW layer, never edited by hand).
import { runActor } from './apify.mjs'
import { writeFile } from 'node:fs/promises'
const ZONES = {
  'eiffel-tower': 'Eiffel Tower, Paris',
  trocadero: 'Trocadero, Paris',
  'champ-de-mars': 'Champ de Mars, Paris',
  montmartre: 'Montmartre, Paris',
  'sacre-coeur': 'Sacre Coeur, Paris',
  'notre-dame': 'Notre Dame, Paris',
  'latin-quarter': 'Latin Quarter, Paris',
  'arc-de-triomphe': 'Arc de Triomphe, Paris',
}
const checkIn = '2026-11-12', checkOut = '2026-11-13'
await Promise.all(Object.entries(ZONES).map(async ([k, search]) => {
  try {
    const r = await runActor('voyager~booking-scraper', { search, maxItems: 50, currency: 'EUR', language: 'en-gb', checkIn, checkOut, rooms: 1, adults: 2, children: 0 })
    await writeFile(`data/raw/paris-${k}-${checkIn}.json`, JSON.stringify({ zone: k, search, scrapedAt: new Date().toISOString(), items: r }, null, 1))
    console.log(k, r.length)
  } catch (e) { console.error(k, 'FAILED', e.message) }
}))
