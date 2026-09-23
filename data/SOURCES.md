# Sources of landmark facts

Every fact about a landmark quoted in `data/editorial/*.ts` is listed here. Hotel facts (views,
room names, ratings, prices) come from `data/raw/` (Booking.com listings collected via Apify,
`scripts/scrape-paris.mjs`) and are traced per claim through `sourceText` in `data/normalized/paris.json`.

## Eiffel Tower (checked 2026-09-23)
- Sparkles 5 min at the start of every hour after dusk: toureiffel.paris, "What time does the Eiffel Tower light up and sparkle?"
  https://www.toureiffel.paris/en/news/visit/what-time-does-eiffel-tower-light-and-sparkle
- 20,000 sparkling bulbs (inaugurated 31/12/1999), golden lighting 336 projectors (1985):
  https://www.toureiffel.paris/en/the-monument/lights
- Lighting switched off at 11.45 pm when the tower closes, City of Paris energy plan since 23/09/2022:
  https://www.toureiffel.paris/en/theme/illuminations
- Transport: RER C Champ de Mars-Tour Eiffel, M6 Bir-Hakeim, M9 Trocadéro (RATP network map).

## Notre-Dame
- Fire 15/04/2019, reopening December 2024 (7-8/12/2024 ceremonies). Parvis = point zéro des routes de France.

## Arc de Triomphe
- 12 avenues meet at Place Charles-de-Gaulle (Étoile). Flame rekindled daily at 6.30 pm. Roof terrace open to visitors.
  https://www.paris-arc-de-triomphe.fr/
- Charles de Gaulle-Étoile: M1, M2, M6, RER A.

## Seine
- "Paris, Banks of the Seine", UNESCO World Heritage 1991 (Pont de Sully to Pont d'Iéna): https://whc.unesco.org/en/list/600/

## Sunset / darkness (for the sparkle season note)
- Paris: sunset ~16:55 in December, ~21:58 around 21 June (timeanddate.com, Paris).

## To verify before scaling copy
- Haussmann balconies on 2nd and 5th floors (architectural convention, widely documented).
