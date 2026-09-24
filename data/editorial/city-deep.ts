import type { Locale } from '@/lib/i18n'
import type { Section, QA } from '@/data/editorial/types'

// Extra depth for the city page (HotelsWithPets-style destination page). Numbers are injected.
export type Area = { id: string; lat: number; lng: number; poi: string; name: string; d: string }
export type CityDeep = {
  stats: { checked: string; withView: string; roomLevel: string; median: string }
  mapTitle: string
  bestTitle: string
  bestLede: string
  picksTitle: string
  picksLede: string
  areasTitle: string
  areasLede: string
  areaCount: (n: number) => string
  areas: Area[]
  practicalTitle: string
  practical: Section[]
  moreFaq: QA[]
  soonTitle: string
}

const A = (id: string, lat: number, lng: number, poi: string) => ({ id, lat, lng, poi })
const AREAS = [
  A('champ-de-mars', 48.8545, 2.2985, 'eiffel-tower'),
  A('passy', 48.8595, 2.2855, 'eiffel-tower'),
  A('montmartre', 48.8855, 2.3405, 'sacre-coeur'),
  A('latin-quarter', 48.8505, 2.3465, 'notre-dame'),
  A('etoile', 48.8735, 2.2935, 'arc-de-triomphe'),
  A('saint-germain', 48.8545, 2.3345, 'seine'),
]
const withText = (t: [string, string][]) => AREAS.map((a, i) => ({ ...a, name: t[i][0], d: t[i][1] }))

export const cityDeep: Record<Locale, CityDeep> = {
  en: {
    stats: { checked: 'hotels checked', withView: 'with a stated view', roomLevel: 'view named in a room category', median: 'median view room, per night' },
    mapTitle: 'Map of hotels in Paris',
    bestTitle: 'The best hotels with a view in Paris',
    bestLede: 'Ranked by the strength of the evidence first (a room category that names the view), then by guest rating. Each hotel is shown for the landmark it sees best.',
    picksTitle: 'Our picks by type of stay',
    picksLede: 'One hotel per need, taken from the same checked list.',
    areasTitle: 'Where to stay in Paris for a view',
    areasLede: 'Each neighbourhood sees something different. The count is the number of hotels on this site with a stated view, within about a kilometre.',
    areaCount: (n) => (n === 1 ? '1 hotel with a view' : `${n} hotels with a view`),
    areas: withText([
      ['Champ de Mars, 7th', 'The streets around the Eiffel Tower. Upper floors on the avenues facing the park see the tower close up; lower floors often see the building opposite.'],
      ['Passy and Trocadéro, 16th', 'Across the river from the tower, slightly higher ground. The classic postcard angle, and residential streets that are quiet at night.'],
      ['Montmartre, 18th', 'The hill. Hotels here look over the whole city, sometimes with the Eiffel Tower on the horizon, at prices well below the 7th.'],
      ['Latin Quarter and the islands', 'Views of Notre-Dame and the Seine from the Left Bank quays. Central, lively, and walkable to most museums.'],
      ['Étoile, 8th and 17th', 'Around the Arc de Triomphe. Wide avenues mean open views from the upper floors, and a direct metro line to the Louvre.'],
      ['Saint-Germain, 6th', 'Close to the river and the Louvre across the bridge. Fewer landmark views, more rooftops and courtyards.'],
    ]),
    practicalTitle: 'Practical Paris',
    practical: [
      { h: 'When the views are best', p: ['Clear winter days after rain give the sharpest views across the city. In June the sun sets after 9.30 pm, so an evening view from the room lasts long. After dark, the Eiffel Tower sparkles for five minutes every hour on the hour.'] },
      { h: 'Getting in from the airports', p: ['From Charles de Gaulle, the RER B train runs to Gare du Nord, Châtelet and the Latin Quarter. From Orly, metro line 14 now runs straight into the centre. A taxi from either airport has a fixed fare to the Right Bank or the Left Bank.'] },
      { h: 'Getting around', p: ['Paris is compact and very walkable. The metro reaches every neighbourhood on this page; the line 6 section between Passy and Bir-Hakeim runs above ground and crosses the Seine facing the Eiffel Tower.'] },
    ],
    moreFaq: [
      { q: 'Are hotels with an Eiffel Tower view more expensive?', a: 'Usually, but not always by much. We show the dated price of the cheapest room category that names the view, next to the hotel’s cheapest room, so you can see the difference for yourself.' },
      { q: 'Can I see the Eiffel Tower from Montmartre?', a: 'Yes, from the hill you look across the city and the tower stands on the horizon. Some Montmartre hotels name it in their room categories.' },
      { q: 'What is the best area to stay in Paris for first-timers who want a view?', a: 'The 7th or the 16th for the Eiffel Tower up close, the Latin Quarter for Notre-Dame and the Seine. Montmartre if you prefer the wide view and lower prices.' },
    ],
    soonTitle: 'More destinations coming soon',
  },
  es: {
    stats: { checked: 'hoteles revisados', withView: 'con vistas declaradas', roomLevel: 'vistas en el nombre de la habitación', median: 'mediana habitación con vistas, por noche' },
    mapTitle: 'Mapa de hoteles en París',
    bestTitle: 'Los mejores hoteles con vistas de París',
    bestLede: 'Ordenados primero por la solidez de la prueba (una categoría de habitación que nombra las vistas) y después por la nota de los clientes. Cada hotel aparece con el monumento que mejor ve.',
    picksTitle: 'Nuestra selección según tu viaje',
    picksLede: 'Un hotel por necesidad, sacado de la misma lista revisada.',
    areasTitle: 'Dónde alojarse en París para tener vistas',
    areasLede: 'Cada barrio ve algo distinto. La cifra es el número de hoteles de esta web con vistas declaradas en un radio de un kilómetro aproximadamente.',
    areaCount: (n) => (n === 1 ? '1 hotel con vistas' : `${n} hoteles con vistas`),
    areas: withText([
      ['Campo de Marte, distrito 7', 'Las calles alrededor de la Torre Eiffel. Las plantas altas de las avenidas que dan al parque la ven de cerca; las bajas suelen ver el edificio de enfrente.'],
      ['Passy y Trocadéro, distrito 16', 'Al otro lado del río, en un terreno algo más alto. El ángulo de postal clásico y calles residenciales tranquilas por la noche.'],
      ['Montmartre, distrito 18', 'La colina. Los hoteles miran sobre toda la ciudad, a veces con la Torre Eiffel en el horizonte, a precios muy por debajo del distrito 7.'],
      ['Barrio Latino y las islas', 'Vistas a Notre-Dame y al Sena desde los muelles de la orilla izquierda. Céntrico, animado y a pie de casi todos los museos.'],
      ['Étoile, distritos 8 y 17', 'Alrededor del Arco de Triunfo. Las avenidas anchas abren las vistas desde las plantas altas, con metro directo al Louvre.'],
      ['Saint-Germain, distrito 6', 'Cerca del río y del Louvre al otro lado del puente. Menos monumentos a la vista, más tejados y patios.'],
    ]),
    practicalTitle: 'París práctico',
    practical: [
      { h: 'Cuándo se ve mejor', p: ['Los días despejados de invierno después de la lluvia dan las vistas más nítidas. En junio el sol se pone después de las 21:30, así que la vista desde la habitación dura mucho. De noche, la Torre Eiffel centellea cinco minutos al comienzo de cada hora.'] },
      { h: 'Desde los aeropuertos', p: ['Desde Charles de Gaulle, el tren RER B llega a Gare du Nord, Châtelet y el Barrio Latino. Desde Orly, la línea 14 del metro llega directamente al centro. El taxi desde ambos aeropuertos tiene tarifa fija a cada orilla.'] },
      { h: 'Moverse por la ciudad', p: ['París es compacta y se recorre muy bien a pie. El metro llega a todos los barrios de esta página; el tramo de la línea 6 entre Passy y Bir-Hakeim va en superficie y cruza el Sena frente a la Torre Eiffel.'] },
    ],
    moreFaq: [
      { q: '¿Son más caros los hoteles con vistas a la Torre Eiffel?', a: 'Normalmente sí, aunque no siempre mucho. Mostramos el precio fechado de la categoría más barata que nombra las vistas junto a la habitación más barata del hotel, para que veas la diferencia.' },
      { q: '¿Se ve la Torre Eiffel desde Montmartre?', a: 'Sí, desde la colina se mira por encima de la ciudad y la torre aparece en el horizonte. Algunos hoteles de Montmartre la nombran en sus categorías de habitación.' },
      { q: '¿Cuál es la mejor zona de París para una primera visita con vistas?', a: 'Los distritos 7 o 16 para la Torre Eiffel de cerca, el Barrio Latino para Notre-Dame y el Sena. Montmartre si prefieres una vista amplia y precios más bajos.' },
    ],
    soonTitle: 'Próximos destinos',
  },
  de: {
    stats: { checked: 'geprüfte Hotels', withView: 'mit angegebener Aussicht', roomLevel: 'Aussicht im Namen der Zimmerkategorie', median: 'Median Zimmer mit Aussicht, pro Nacht' },
    mapTitle: 'Karte der Hotels in Paris',
    bestTitle: 'Die besten Hotels mit Aussicht in Paris',
    bestLede: 'Zuerst nach der Stärke des Belegs sortiert (eine Zimmerkategorie, die den Blick nennt), dann nach Gästebewertung. Jedes Hotel steht bei dem Wahrzeichen, das es am besten sieht.',
    picksTitle: 'Unsere Tipps je nach Reise',
    picksLede: 'Ein Hotel pro Wunsch, aus derselben geprüften Liste.',
    areasTitle: 'Wo in Paris übernachten für die Aussicht',
    areasLede: 'Jedes Viertel sieht etwas anderes. Die Zahl nennt die Hotels auf dieser Seite mit angegebener Aussicht im Umkreis von etwa einem Kilometer.',
    areaCount: (n) => (n === 1 ? '1 Hotel mit Aussicht' : `${n} Hotels mit Aussicht`),
    areas: withText([
      ['Champ de Mars, 7. Arrondissement', 'Die Straßen rund um den Eiffelturm. Obere Etagen an den Avenuen zum Park sehen den Turm aus nächster Nähe, untere oft nur das Haus gegenüber.'],
      ['Passy und Trocadéro, 16. Arrondissement', 'Auf der anderen Flussseite, etwas höher gelegen. Der klassische Postkartenblick und ruhige Wohnstraßen am Abend.'],
      ['Montmartre, 18. Arrondissement', 'Der Hügel. Die Hotels blicken über die ganze Stadt, manchmal mit dem Eiffelturm am Horizont, zu Preisen deutlich unter dem 7.'],
      ['Quartier Latin und die Inseln', 'Blick auf Notre-Dame und die Seine von den Kais am linken Ufer. Zentral, lebendig und zu Fuß zu den meisten Museen.'],
      ['Étoile, 8. und 17. Arrondissement', 'Rund um den Arc de Triomphe. Breite Avenuen öffnen den Blick aus den oberen Etagen, mit direkter Metro zum Louvre.'],
      ['Saint-Germain, 6. Arrondissement', 'Nah am Fluss, der Louvre gleich über die Brücke. Weniger Wahrzeichen im Blick, dafür Dächer und Innenhöfe.'],
    ]),
    practicalTitle: 'Paris praktisch',
    practical: [
      { h: 'Wann die Aussicht am besten ist', p: ['Klare Wintertage nach Regen bringen die schärfste Fernsicht. Im Juni geht die Sonne nach 21:30 Uhr unter, der Abendblick aus dem Zimmer hält also lange. Nach Einbruch der Dunkelheit glitzert der Eiffelturm zu jeder vollen Stunde fünf Minuten lang.'] },
      { h: 'Vom Flughafen in die Stadt', p: ['Von Charles de Gaulle fährt der RER B zur Gare du Nord, nach Châtelet und ins Quartier Latin. Von Orly fährt die Metrolinie 14 direkt ins Zentrum. Taxis haben von beiden Flughäfen einen Festpreis je Seineufer.'] },
      { h: 'Unterwegs in Paris', p: ['Paris ist kompakt und gut zu Fuß zu erkunden. Die Metro erreicht alle Viertel auf dieser Seite; die Linie 6 fährt zwischen Passy und Bir-Hakeim oberirdisch und überquert die Seine direkt gegenüber dem Eiffelturm.'] },
    ],
    moreFaq: [
      { q: 'Sind Hotels mit Eiffelturmblick teurer?', a: 'Meist ja, aber nicht immer viel. Wir zeigen den datierten Preis der günstigsten Kategorie mit Blick neben dem günstigsten Zimmer des Hotels, damit du den Unterschied selbst siehst.' },
      { q: 'Sieht man den Eiffelturm von Montmartre aus?', a: 'Ja, vom Hügel blickt man über die Stadt, und der Turm steht am Horizont. Einige Hotels in Montmartre nennen ihn in ihren Zimmerkategorien.' },
      { q: 'Welches Viertel ist für den ersten Paris-Besuch mit Aussicht am besten?', a: 'Das 7. oder 16. für den Eiffelturm aus der Nähe, das Quartier Latin für Notre-Dame und die Seine. Montmartre, wenn du den weiten Blick und niedrigere Preise willst.' },
    ],
    soonTitle: 'Bald weitere Reiseziele',
  },
}
