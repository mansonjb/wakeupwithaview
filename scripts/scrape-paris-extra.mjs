// Second pass: named view hotels missing from pass 1 + areas not covered (Passy, Saint-Germain, islands, Opéra).
import { runActor } from './apify.mjs'
import { writeFile } from 'node:fs/promises'
const ZONES = {
  'h-plaza-athenee': ['Hotel Plaza Athenee, Paris', 5],
  'h-raphael': ['Hotel Raphael, Paris', 5],
  'h-la-comtesse': ['La Comtesse, Paris', 5],
  'h-le-walt': ['Le Walt, Paris', 5],
  'h-bowmann': ['Hotel Bowmann, Paris', 5],
  'h-citadines-eiffel': ['Citadines Tour Eiffel, Paris', 5],
  passy: ['Passy, Paris', 30],
  'saint-germain': ['Saint-Germain-des-Pres, Paris', 30],
  'ile-saint-louis': ['Ile Saint-Louis, Paris', 30],
  opera: ['Opera Garnier, Paris', 30],
  'pont-neuf': ['Pont Neuf, Paris', 30],
}
const checkIn = '2026-11-12', checkOut = '2026-11-13'
await Promise.all(Object.entries(ZONES).map(async ([k, [search, maxItems]]) => {
  try {
    const r = await runActor('voyager~booking-scraper', { search, maxItems, currency: 'EUR', language: 'en-gb', checkIn, checkOut, rooms: 1, adults: 2, children: 0 })
    await writeFile(`data/raw/paris-${k}-${checkIn}.json`, JSON.stringify({ zone: k, search, scrapedAt: new Date().toISOString(), items: r }, null, 1))
    console.log(k, r.length, r.slice(0, 3).map((h) => h.name).join(' | '))
  } catch (e) { console.error(k, 'FAILED', e.message) }
}))
