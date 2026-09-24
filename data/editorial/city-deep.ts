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
  transportTitle: string
  transportLede: string
  transport: { icon: string; h: string; p: string }[]
  carCta: string
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
    transportTitle: 'Getting to and around Paris',
    transportLede: 'Two big airports, six mainline stations and one of the densest metro networks in the world. Most visitors never need a car in the city.',
    transport: [
      { icon: '✈', h: 'Charles de Gaulle (CDG)', p: 'The main international airport, north of the city. The RER B train runs to Gare du Nord, Châtelet and the Latin Quarter in about 35 to 45 minutes. Taxis charge a fixed fare to the Right Bank and a slightly higher one to the Left Bank.' },
      { icon: '✈', h: 'Orly (ORY)', p: 'South of the city, mostly European and domestic flights. Metro line 14 now runs from the terminals straight to the centre, the simplest option. Fixed taxi fares apply here too.' },
      { icon: '✈', h: 'Beauvais (BVA)', p: 'Used by low-cost airlines, about 85 km north. A shuttle bus runs to Porte Maillot in western Paris; allow well over an hour.' },
      { icon: '🚆', h: 'Arriving by train', p: 'Gare du Nord for London, Brussels and Amsterdam; Gare de l’Est for eastern France and Germany; Gare de Lyon for the south, the Alps, Switzerland and Italy; Montparnasse for Brittany and the south-west.' },
      { icon: '🚇', h: 'Metro and RER', p: '16 metro lines and 5 RER lines cover every neighbourhood on this page. Stations are close together in the centre, so the next one is rarely more than a few minutes on foot.' },
      { icon: '🚶', h: 'On foot and by bike', p: 'The centre is compact: the Eiffel Tower to Notre-Dame is about an hour’s walk along the Seine. Vélib’ shared bikes and a large network of cycle lanes make short hops easy.' },
      { icon: '🚕', h: 'Taxis and ride-hailing', p: 'Official taxis can be hailed or taken at ranks; ride-hailing apps work too. Useful late at night with luggage, slower than the metro at rush hour.' },
      { icon: '🚗', h: 'Driving', p: 'Not worth it inside Paris: traffic, low-emission rules and expensive parking. A car makes sense for day trips (Versailles, Giverny, Champagne, the Loire), picked up on the way out.' },
    ],
    carCta: 'Rent a car for day trips',
    practicalTitle: 'Practical Paris',
    practical: [
      { h: 'When the views are best', p: ['Clear winter days after rain give the sharpest views across the city. In June the sun sets after 9.30 pm, so an evening view from the room lasts long. After dark, the Eiffel Tower sparkles for five minutes every hour on the hour.'] },
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
    transportTitle: 'Cómo llegar y moverse por París',
    transportLede: 'Dos grandes aeropuertos, seis estaciones de tren y una de las redes de metro más densas del mundo. La mayoría de los viajeros no necesitan coche en la ciudad.',
    transport: [
      { icon: '✈', h: 'Charles de Gaulle (CDG)', p: 'El principal aeropuerto internacional, al norte. El tren RER B llega a Gare du Nord, Châtelet y el Barrio Latino en unos 35 a 45 minutos. Los taxis tienen tarifa fija a la orilla derecha y otra algo más alta a la izquierda.' },
      { icon: '✈', h: 'Orly (ORY)', p: 'Al sur de la ciudad, sobre todo vuelos europeos y nacionales. La línea 14 del metro va ahora desde las terminales directamente al centro, la opción más sencilla. También aquí hay tarifas fijas de taxi.' },
      { icon: '✈', h: 'Beauvais (BVA)', p: 'Lo usan las aerolíneas de bajo coste, a unos 85 km al norte. Un autobús lanzadera llega a Porte Maillot, al oeste de París; calcula bastante más de una hora.' },
      { icon: '🚆', h: 'Llegar en tren', p: 'Gare du Nord para Londres, Bruselas y Ámsterdam; Gare de l’Est para el este de Francia y Alemania; Gare de Lyon para el sur, los Alpes, Suiza e Italia; Montparnasse para Bretaña y el suroeste.' },
      { icon: '🚇', h: 'Metro y RER', p: '16 líneas de metro y 5 de RER cubren todos los barrios de esta página. En el centro las estaciones están muy juntas: la siguiente rara vez queda a más de unos minutos a pie.' },
      { icon: '🚶', h: 'A pie y en bici', p: 'El centro es compacto: de la Torre Eiffel a Notre-Dame hay alrededor de una hora andando junto al Sena. Las bicis compartidas Vélib’ y los carriles bici facilitan los trayectos cortos.' },
      { icon: '🚕', h: 'Taxis y VTC', p: 'Los taxis oficiales se paran en la calle o en paradas; las aplicaciones de VTC también funcionan. Útiles de noche con equipaje, más lentos que el metro en hora punta.' },
      { icon: '🚗', h: 'Conducir', p: 'No compensa dentro de París: tráfico, zona de bajas emisiones y aparcamiento caro. El coche tiene sentido para excursiones (Versalles, Giverny, Champaña, el Loira), recogiéndolo al salir.' },
    ],
    carCta: 'Alquilar un coche para excursiones',
    practicalTitle: 'París práctico',
    practical: [
      { h: 'Cuándo se ve mejor', p: ['Los días despejados de invierno después de la lluvia dan las vistas más nítidas. En junio el sol se pone después de las 21:30, así que la vista desde la habitación dura mucho. De noche, la Torre Eiffel centellea cinco minutos al comienzo de cada hora.'] },
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
    transportTitle: 'Anreise und Unterwegs in Paris',
    transportLede: 'Zwei große Flughäfen, sechs Fernbahnhöfe und eines der dichtesten Metronetze der Welt. In der Stadt braucht fast niemand ein Auto.',
    transport: [
      { icon: '✈', h: 'Charles de Gaulle (CDG)', p: 'Der wichtigste internationale Flughafen, nördlich der Stadt. Der RER B fährt in etwa 35 bis 45 Minuten zur Gare du Nord, nach Châtelet und ins Quartier Latin. Taxis haben einen Festpreis zum rechten Ufer und einen etwas höheren zum linken.' },
      { icon: '✈', h: 'Orly (ORY)', p: 'Südlich der Stadt, vor allem Europa- und Inlandsflüge. Die Metrolinie 14 fährt jetzt von den Terminals direkt ins Zentrum, die einfachste Lösung. Auch hier gelten Taxi-Festpreise.' },
      { icon: '✈', h: 'Beauvais (BVA)', p: 'Von Billigfliegern genutzt, rund 85 km nördlich. Ein Shuttlebus fährt zur Porte Maillot im Westen von Paris; deutlich mehr als eine Stunde einplanen.' },
      { icon: '🚆', h: 'Anreise mit dem Zug', p: 'Gare du Nord für London, Brüssel und Amsterdam; Gare de l’Est für Ostfrankreich und Deutschland; Gare de Lyon für den Süden, die Alpen, die Schweiz und Italien; Montparnasse für die Bretagne und den Südwesten.' },
      { icon: '🚇', h: 'Metro und RER', p: '16 Metro- und 5 RER-Linien erreichen alle Viertel auf dieser Seite. Im Zentrum liegen die Stationen dicht beieinander, die nächste ist selten mehr als ein paar Minuten zu Fuß entfernt.' },
      { icon: '🚶', h: 'Zu Fuß und mit dem Rad', p: 'Das Zentrum ist kompakt: Vom Eiffelturm nach Notre-Dame läuft man an der Seine entlang etwa eine Stunde. Leihräder von Vélib’ und viele Radwege machen kurze Strecken einfach.' },
      { icon: '🚕', h: 'Taxi und Fahrdienste', p: 'Offizielle Taxis hält man an oder nimmt sie am Stand; Fahrdienst-Apps funktionieren ebenfalls. Praktisch spät abends mit Gepäck, zur Stoßzeit langsamer als die Metro.' },
      { icon: '🚗', h: 'Mit dem Auto', p: 'In Paris selbst lohnt es sich nicht: Verkehr, Umweltzone und teures Parken. Für Tagesausflüge (Versailles, Giverny, Champagne, Loire) ist ein Mietwagen sinnvoll, abgeholt bei der Abfahrt.' },
    ],
    carCta: 'Mietwagen für Tagesausflüge',
    practicalTitle: 'Paris praktisch',
    practical: [
      { h: 'Wann die Aussicht am besten ist', p: ['Klare Wintertage nach Regen bringen die schärfste Fernsicht. Im Juni geht die Sonne nach 21:30 Uhr unter, der Abendblick aus dem Zimmer hält also lange. Nach Einbruch der Dunkelheit glitzert der Eiffelturm zu jeder vollen Stunde fünf Minuten lang.'] },
    ],
    moreFaq: [
      { q: 'Sind Hotels mit Eiffelturmblick teurer?', a: 'Meist ja, aber nicht immer viel. Wir zeigen den datierten Preis der günstigsten Kategorie mit Blick neben dem günstigsten Zimmer des Hotels, damit du den Unterschied selbst siehst.' },
      { q: 'Sieht man den Eiffelturm von Montmartre aus?', a: 'Ja, vom Hügel blickt man über die Stadt, und der Turm steht am Horizont. Einige Hotels in Montmartre nennen ihn in ihren Zimmerkategorien.' },
      { q: 'Welches Viertel ist für den ersten Paris-Besuch mit Aussicht am besten?', a: 'Das 7. oder 16. für den Eiffelturm aus der Nähe, das Quartier Latin für Notre-Dame und die Seine. Montmartre, wenn du den weiten Blick und niedrigere Preise willst.' },
    ],
    soonTitle: 'Bald weitere Reiseziele',
  },
}
