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

## Paris city page (checked 2026-09-24)
- 1859 height decree 17.55 m / 20 m on streets >20 m: https://mymodernmet.com/haussmann-paris-architecture/ , https://en.wikipedia.org/wiki/Boulevard_Haussmann
- Eiffel Tower finished 31/03/1889, World's Fair, 330 m with antenna: https://www.toureiffel.paris/en/the-monument/history , https://en.wikipedia.org/wiki/Eiffel_Tower
- Montmartre ~130 m highest natural point: https://en.wikipedia.org/wiki/Geography_of_Paris ; Sacré-Cœur completed 1914, ~300 steps dome: https://en.wikipedia.org/wiki/Sacr%C3%A9-C%C5%93ur,_Paris
- Notre-Dame towers reopened Sept 2025, 422 steps: https://parisjetaime.com/eng/culture/tours-de-notre-dame-de-paris-p3540
- Arc de Triomphe 284 steps: https://www.paris-arc-de-triomphe.fr/
- Galeries Lafayette 8th-floor free terrace: https://haussmann.galerieslafayette.com/en/the-terrace-at-galeries-lafayette/
- Printemps 9th-floor free terrace, IMA free roof terrace (Tue-Sun), Parc de Belleville 108 m: https://www.sortiraparis.com/en/what-to-visit-in-paris/walks/guides/277311-elevated-viewpoints-in-paris-our-best-free-or-nearly-free-spots-for-the-city-s-most-stunning-views
- Buttes-Chaumont Temple de la Sibylle on 30 m rock: https://en.wikipedia.org/wiki/Parc_des_Buttes_Chaumont
- Metro 6 viaduct Passy–Bir-Hakeim over Pont de Bir-Hakeim: https://en.wikipedia.org/wiki/Passy_station
- Tour Montparnasse observatory closed 31/03/2026, works until at least 2030: https://euronews.com/travel/2026/02/23/iconic-paris-observation-deck-set-to-close-for-renovations-next-month
- Taxi flat fares 2026 (CDG 56/65, Orly 45 RD / 36 RG): https://www.service-public.gouv.fr/particuliers/actualites/A15396
- Line 14 to Orly since 24/06/2024, ~25 min to Châtelet: https://www.ratp.fr/en/extension-metro-line-14 , https://en.wikipedia.org/wiki/A%C3%A9roport_d%27Orly_station
- RER B CDG–Gare du Nord ~35 min; Beauvais shuttle to Porte Maillot ~1h15: https://www.aeroportparisbeauvais.com/en/access-parking/paris-airport-shuttle
- 16 metro lines / 321 stations, RER A–E: https://en.wikipedia.org/wiki/List_of_Paris_Metro_stations , https://en.wikipedia.org/wiki/R%C3%A9seau_Express_R%C3%A9gional
- ZFE: Crit'Air 3/4/5 banned weekdays 8am-8pm since 2025: https://www.paris.fr/pages/la-zone-a-faibles-emissions-zfe-pour-lutter-contre-la-pollution-de-l-air-16799
- Mainline stations destinations: https://www.seat61.com/changing-stations-in-paris.htm , https://blog.lodgis.com/en/paris-train-stations-guide/

## Monuments guide, Paris (checked 2026-09-24)
Facts per monument, linked on the page to each official site for tickets and opening days.
- Eiffel Tower (1889, 330 m, tallest until 1930, hourly sparkle): https://www.toureiffel.paris/en
- Notre-Dame (1163, fire 15/04/2019, reopening 07/12/2024, free entry): https://www.notredamedeparis.fr/en/
- Sacré-Cœur (1875-1914, consecrated 1919, dome ticket): https://www.sacre-coeur-montmartre.com/english/
- Arc de Triomphe (1806 order, 1836 inauguration, flame 6.30 pm): https://www.paris-arc-de-triomphe.fr/en
- Louvre (museum 1793, Pei pyramid 1989, closed Tuesdays): https://www.louvre.fr/en
- Musée d'Orsay (1900 station, museum 1986, closed Mondays): https://www.musee-orsay.fr/en
- Invalides (founded 1670, Napoleon's tomb, Army Museum): https://www.musee-armee.fr/en/
- Panthéon (Soufflot, 1790, Foucault pendulum 1851, colonnade): https://www.paris-pantheon.fr/en
- Opéra Garnier (1875, Chagall ceiling 1964, day visits): https://www.operadeparis.fr/en/visits/palais-garnier
Hotel counts and cards: computed from data/normalized/paris.json (view = HIGH/MEDIUM; near = rated, within 1 km).
