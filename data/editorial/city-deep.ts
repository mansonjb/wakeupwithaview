import type { Locale } from '@/lib/i18n'
import type { QA } from '@/data/editorial/types'

// Destination page depth for Paris. RULES: one idea lives in one section only (no repetition),
// and every fact is either computed from our data or listed with its source in data/SOURCES.md.
export type AreaDef = { id: string; lat: number; lng: number; poi: string }
export const AREAS: AreaDef[] = [
  { id: 'champ-de-mars', lat: 48.8545, lng: 2.2985, poi: 'eiffel-tower' },
  { id: 'passy', lat: 48.8595, lng: 2.2855, poi: 'eiffel-tower' },
  { id: 'montmartre', lat: 48.8855, lng: 2.3405, poi: 'sacre-coeur' },
  { id: 'latin-quarter', lat: 48.8505, lng: 2.3465, poi: 'notre-dame' },
  { id: 'etoile', lat: 48.8735, lng: 2.2935, poi: 'arc-de-triomphe' },
  { id: 'saint-germain', lat: 48.8545, lng: 2.3345, poi: 'seine' },
]

export type FaqData = {
  cheapest: { name: string; stars: number | null; price: string } | null
  budgetN: number; budgetMax: string
  premium: number | null; premiumN: number
  proxPct: number; proxNear: number; proxSeen: number
  checkIn: string
  highN: number; totalN: number
}
export type Num = { km: string; min: number }

export type CityDeep = {
  lede: string
  stats: { checked: string; withView: string; roomLevel: string; median: string }
  mapTitle: string
  bestTitle: string
  bestLede: string
  picksTitle: string
  picksLede: string
  historyTitle: string
  history: { h: string; p: string }[]
  areasTitle: string
  areasLede: string
  areaLine: (n: number, median: string | null) => string
  areas: Record<string, { name: string; d: string }>
  viewpointsTitle: string
  viewpointsLede: string
  viewpoints: { name: string; tag: string; d: string }[]
  transportTitle: string
  transportLede: string
  transport: (n: Num) => { icon: string; h: string; p: string }[]
  carCta: string
  lightTitle: string
  light: { h: string; p: string }[]
  faq: (d: FaqData) => QA[]
  soonTitle: string
}

export const cityDeep: Record<Locale, CityDeep> = {
  en: {
    lede: 'Two rooms in the same Paris hotel can look at the Eiffel Tower or at a courtyard wall. This page ranks hotels by what the hotel itself says you can see, room by room, and tells you where in the city to look.',
    stats: { checked: 'hotels checked', withView: 'with a stated view', roomLevel: 'view named in a room category', median: 'median view room, per night' },
    mapTitle: 'Map of hotels in Paris',
    bestTitle: 'The best hotels with a view in Paris',
    bestLede: 'Ranked by the strength of the evidence first (a room category that names the view), then by guest rating. Each hotel is shown for the landmark it sees best.',
    picksTitle: 'Our picks by type of stay',
    picksLede: 'One hotel per need, each one different, taken from the same checked list.',
    historyTitle: 'Paris: why the views work',
    history: [
      { h: 'A skyline capped in 1859', p: 'A decree of 1859 limited Paris buildings to 17.55 metres, or 20 metres on streets wider than 20 metres. The Haussmann blocks built under that rule give the city its even roofline, and anything taller stands out above it.' },
      { h: 'Monuments built to be seen', p: 'The Eiffel Tower was finished on 31 March 1889 for that year’s World’s Fair and reaches 330 metres with its antenna. On the Right Bank, Montmartre rises to about 130 metres, the highest natural point in the city, and the Sacré-Cœur on its summit (completed 1914) adds its domes on top.' },
      { h: 'The river as an open corridor', p: 'The banks of the Seine between the Pont de Sully and the Pont d’Iéna are a UNESCO World Heritage Site since 1991. Nothing is built on the water, so rooms facing the quays look across open space rather than into the street.' },
      { h: 'Notre-Dame, back on the skyline', p: 'Damaged by fire on 15 April 2019, the cathedral reopened in December 2024 and its towers reopened to visitors in September 2025.' },
    ],
    areasTitle: 'Where to stay in Paris for a view',
    areasLede: 'Each hotel with a stated view is counted once, in the nearest of these six areas (within 1.5 km). The price is the cheapest dated room that names the view in that area.',
    areaLine: (n, m) => `${n === 1 ? '1 hotel' : `${n} hotels`} with a view${m ? ` · from ${m}` : ''}`,
    areas: {
      'champ-de-mars': { name: 'Champ de Mars, 7th', d: 'The avenues around the Eiffel Tower and the park at its foot. The tower is close enough to fill the window from the upper floors.' },
      passy: { name: 'Passy and Trocadéro, 16th', d: 'The Chaillot hill across the river from the tower, the angle seen on most postcards. Mostly residential streets.' },
      montmartre: { name: 'Montmartre, 18th', d: 'The hill around the Sacré-Cœur. From here the view runs south over the whole city.' },
      'latin-quarter': { name: 'Latin Quarter and the islands, 5th and 4th', d: 'The Left Bank opposite Notre-Dame and the Île de la Cité, with the Seine in between.' },
      etoile: { name: 'Étoile, 8th and 17th', d: 'The twelve avenues that meet at the Arc de Triomphe. Their width leaves the upper floors with open views.' },
      'saint-germain': { name: 'Saint-Germain, 6th', d: 'Between the Luxembourg and the Seine, facing the Louvre across the Pont des Arts.' },
    },
    viewpointsTitle: 'Where to see Paris from above',
    viewpointsLede: 'For the hours outside your room. Free unless a ticket is mentioned.',
    viewpoints: [
      { name: 'Galeries Lafayette terrace', tag: 'Free', d: '8th floor of the Boulevard Haussmann store, a 360° view over the rooftops and the Opéra.' },
      { name: 'Printemps Haussmann terrace', tag: 'Free', d: 'The 9th floor of the neighbouring store, with the Opéra Garnier, the Sacré-Cœur and the Eiffel Tower in view.' },
      { name: 'Institut du monde arabe', tag: 'Free', d: 'The roof terrace by the Seine looks straight at Notre-Dame. Open Tuesday to Sunday.' },
      { name: 'Parc de Belleville', tag: 'Free', d: 'The highest park in Paris (108 m), with the Eiffel Tower at the end of the view to the west.' },
      { name: 'Buttes-Chaumont, Temple de la Sibylle', tag: 'Free', d: 'A folly on a 30-metre rock in the park, facing Montmartre and the Sacré-Cœur.' },
      { name: 'Sacré-Cœur dome', tag: 'Ticket', d: 'About 300 steps above the highest point in the city, a 360° view.' },
      { name: 'Arc de Triomphe roof', tag: 'Ticket', d: '284 steps to a terrace in the middle of the twelve avenues, facing the Champs-Élysées and La Défense.' },
      { name: 'Notre-Dame towers', tag: 'Ticket', d: '422 steps to the gallery of chimeras, reopened in September 2025. Booking online.' },
      { name: 'Metro line 6, Passy to Bir-Hakeim', tag: 'Metro ticket', d: 'The line runs on a viaduct and crosses the Seine on the Pont de Bir-Hakeim, facing the Eiffel Tower.' },
      { name: 'Tour Montparnasse', tag: 'Closed', d: 'The 56th-floor observatory closed on 31 March 2026 for works announced to last until at least 2030.' },
    ],
    transportTitle: 'Getting to and around Paris',
    transportLede: 'Airport fares below are the official 2026 taxi flat rates, the same in both directions, day and night.',
    transport: ({ km, min }) => [
      { icon: '✈', h: 'Charles de Gaulle (CDG)', p: 'RER B to Gare du Nord in about 35 minutes, continuing to Châtelet and the Latin Quarter. Taxi: €56 to the Right Bank, €65 to the Left Bank.' },
      { icon: '✈', h: 'Orly (ORY)', p: 'Metro line 14 has run from the airport since 24 June 2024, reaching Châtelet in about 25 minutes. Taxi: €36 to the Left Bank, €45 to the Right Bank.' },
      { icon: '✈', h: 'Beauvais (BVA)', p: 'Used by low-cost airlines. The airport shuttle runs to Porte Maillot in about 1 hour 15 minutes, longer in traffic.' },
      { icon: '🚆', h: 'Mainline stations', p: 'Gare du Nord for London, Brussels and Amsterdam; Gare de l’Est for eastern France and Germany; Gare de Lyon for the south-east, Switzerland and Italy; Montparnasse for Brittany and the south-west.' },
      { icon: '🚇', h: 'Metro and RER', p: '16 metro lines and 321 stations, plus five RER lines (A to E) that cross the city and reach the airports.' },
      { icon: '🚶', h: 'On foot', p: `The Eiffel Tower and Notre-Dame are ${km} apart in a straight line, roughly ${min} minutes’ walk by our estimate. Most of the areas above are next to each other.` },
      { icon: '🚗', h: 'Driving', p: 'Paris is a low-emission zone: cars with a Crit’Air 3, 4 or 5 sticker are banned on weekdays from 8 am to 8 pm. A car is worth it for trips out of the city, picked up on the way out.' },
    ],
    carCta: 'Rent a car for day trips',
    lightTitle: 'Light and timing',
    light: [
      { h: 'The Eiffel Tower at night', p: 'The tower sparkles for five minutes at the start of every hour after dusk. The lighting goes off at 11.45 pm, when the tower closes.' },
      { h: 'Short and long days', p: 'The sun sets around 4.55 pm in December and around 9.58 pm near 21 June. In winter a view room gives several sparkles in an evening; in late June dusk comes so late that the first one is not before 11 pm.' },
    ],
    faq: (d) => [
      ...(d.cheapest ? [{ q: 'Do I need a luxury hotel for a view in Paris?', a: `No. ${d.budgetN} hotels on this site have a room that names the view for ${d.budgetMax} or less. The cheapest we found was ${d.cheapest.price} at ${d.cheapest.name}${d.cheapest.stars ? ` (${d.cheapest.stars} stars)` : ''}.` }] : []),
      ...(d.premium != null ? [{ q: 'How much more does the view room cost?', a: `Across ${d.premiumN} hotels where we priced both, the room that names the view cost a median ${d.premium}% more than the hotel’s cheapest room on the same night.` }] : []),
      { q: 'Does staying next to a landmark mean I will see it?', a: `Rarely. Of the ${d.proxNear} hotel-landmark pairs within 1 km in our data, ${d.proxSeen} state a view of that landmark (${d.proxPct}%).` },
      { q: 'Which dates are the prices for?', a: `All prices are for ${d.checkIn}, two adults, collected ahead of time. They move daily, so check availability for your own dates.` },
    ],
    soonTitle: 'More destinations coming soon',
  },
  es: {
    lede: 'Dos habitaciones del mismo hotel de París pueden dar a la Torre Eiffel o a la pared de un patio. Esta página ordena los hoteles según lo que el propio hotel dice que se ve, habitación por habitación, y te indica en qué zona buscar.',
    stats: { checked: 'hoteles revisados', withView: 'con vistas declaradas', roomLevel: 'vistas en el nombre de la habitación', median: 'mediana habitación con vistas, por noche' },
    mapTitle: 'Mapa de hoteles en París',
    bestTitle: 'Los mejores hoteles con vistas de París',
    bestLede: 'Ordenados primero por la solidez de la prueba (una categoría de habitación que nombra las vistas) y después por la nota de los clientes. Cada hotel aparece con el monumento que mejor ve.',
    picksTitle: 'Nuestra selección según tu viaje',
    picksLede: 'Un hotel distinto para cada necesidad, sacado de la misma lista revisada.',
    historyTitle: 'París: por qué funcionan las vistas',
    history: [
      { h: 'Un horizonte limitado en 1859', p: 'Un decreto de 1859 limitó la altura de los edificios de París a 17,55 metros, o 20 metros en calles de más de 20 metros de ancho. Los bloques haussmannianos construidos con esa norma dan a la ciudad su línea de tejados uniforme, y todo lo que es más alto sobresale.' },
      { h: 'Monumentos hechos para verse', p: 'La Torre Eiffel se terminó el 31 de marzo de 1889 para la Exposición Universal de ese año y alcanza 330 metros con su antena. En la orilla derecha, Montmartre sube a unos 130 metros, el punto natural más alto de la ciudad, y el Sacré-Cœur de la cima (terminado en 1914) añade sus cúpulas.' },
      { h: 'El río, un corredor abierto', p: 'Las orillas del Sena entre el puente de Sully y el puente de Jena son Patrimonio Mundial de la UNESCO desde 1991. Sobre el agua no se construye, así que las habitaciones que dan a los muelles miran a un espacio abierto y no a la calle.' },
      { h: 'Notre-Dame, de vuelta en el horizonte', p: 'Dañada por el incendio del 15 de abril de 2019, la catedral reabrió en diciembre de 2024 y sus torres volvieron a abrirse a las visitas en septiembre de 2025.' },
    ],
    areasTitle: 'Dónde alojarse en París para tener vistas',
    areasLede: 'Cada hotel con vistas declaradas se cuenta una sola vez, en la más cercana de estas seis zonas (a menos de 1,5 km). El precio es el de la habitación fechada más barata de la zona que nombra las vistas.',
    areaLine: (n, m) => `${n === 1 ? '1 hotel' : `${n} hoteles`} con vistas${m ? ` · desde ${m}` : ''}`,
    areas: {
      'champ-de-mars': { name: 'Campo de Marte, distrito 7', d: 'Las avenidas alrededor de la Torre Eiffel y el parque a sus pies. Desde las plantas altas la torre llena la ventana.' },
      passy: { name: 'Passy y Trocadéro, distrito 16', d: 'La colina de Chaillot, frente a la torre al otro lado del río: el ángulo de casi todas las postales. Calles sobre todo residenciales.' },
      montmartre: { name: 'Montmartre, distrito 18', d: 'La colina del Sacré-Cœur. Desde aquí la vista se abre hacia el sur sobre toda la ciudad.' },
      'latin-quarter': { name: 'Barrio Latino y las islas, distritos 5 y 4', d: 'La orilla izquierda frente a Notre-Dame y la Île de la Cité, con el Sena en medio.' },
      etoile: { name: 'Étoile, distritos 8 y 17', d: 'Las doce avenidas que se unen en el Arco de Triunfo. Su anchura deja vistas abiertas desde las plantas altas.' },
      'saint-germain': { name: 'Saint-Germain, distrito 6', d: 'Entre el Luxemburgo y el Sena, frente al Louvre al otro lado del Pont des Arts.' },
    },
    viewpointsTitle: 'Dónde ver París desde arriba',
    viewpointsLede: 'Para las horas fuera de la habitación. Gratis salvo que se indique entrada.',
    viewpoints: [
      { name: 'Terraza de Galeries Lafayette', tag: 'Gratis', d: 'Planta 8 de los almacenes del bulevar Haussmann, vista de 360° sobre los tejados y la Ópera.' },
      { name: 'Terraza de Printemps Haussmann', tag: 'Gratis', d: 'La planta 9 de los almacenes vecinos, con la Ópera Garnier, el Sacré-Cœur y la Torre Eiffel a la vista.' },
      { name: 'Instituto del Mundo Árabe', tag: 'Gratis', d: 'La azotea junto al Sena mira de frente a Notre-Dame. Abierta de martes a domingo.' },
      { name: 'Parque de Belleville', tag: 'Gratis', d: 'El parque más alto de París (108 m), con la Torre Eiffel al fondo de la vista hacia el oeste.' },
      { name: 'Buttes-Chaumont, Templo de la Sibila', tag: 'Gratis', d: 'Un templete sobre una roca de 30 metros en el parque, frente a Montmartre y el Sacré-Cœur.' },
      { name: 'Cúpula del Sacré-Cœur', tag: 'Entrada', d: 'Unos 300 escalones sobre el punto más alto de la ciudad, vista de 360°.' },
      { name: 'Azotea del Arco de Triunfo', tag: 'Entrada', d: '284 escalones hasta una terraza en medio de las doce avenidas, frente a los Campos Elíseos y La Défense.' },
      { name: 'Torres de Notre-Dame', tag: 'Entrada', d: '422 escalones hasta la galería de las quimeras, reabierta en septiembre de 2025. Reserva en línea.' },
      { name: 'Línea 6 del metro, de Passy a Bir-Hakeim', tag: 'Billete de metro', d: 'La línea va en viaducto y cruza el Sena por el puente de Bir-Hakeim, frente a la Torre Eiffel.' },
      { name: 'Torre Montparnasse', tag: 'Cerrada', d: 'El mirador de la planta 56 cerró el 31 de marzo de 2026 por obras anunciadas hasta al menos 2030.' },
    ],
    transportTitle: 'Cómo llegar y moverse por París',
    transportLede: 'Las tarifas de aeropuerto son los precios fijos oficiales de taxi de 2026, iguales en ambos sentidos, de día y de noche.',
    transport: ({ km, min }) => [
      { icon: '✈', h: 'Charles de Gaulle (CDG)', p: 'RER B hasta Gare du Nord en unos 35 minutos, y sigue hacia Châtelet y el Barrio Latino. Taxi: 56 € a la orilla derecha, 65 € a la izquierda.' },
      { icon: '✈', h: 'Orly (ORY)', p: 'La línea 14 del metro llega al aeropuerto desde el 24 de junio de 2024 y alcanza Châtelet en unos 25 minutos. Taxi: 36 € a la orilla izquierda, 45 € a la derecha.' },
      { icon: '✈', h: 'Beauvais (BVA)', p: 'Lo usan las aerolíneas de bajo coste. El autobús lanzadera llega a Porte Maillot en 1 hora y 15 minutos aproximadamente, más con tráfico.' },
      { icon: '🚆', h: 'Estaciones de tren', p: 'Gare du Nord para Londres, Bruselas y Ámsterdam; Gare de l’Est para el este de Francia y Alemania; Gare de Lyon para el sureste, Suiza e Italia; Montparnasse para Bretaña y el suroeste.' },
      { icon: '🚇', h: 'Metro y RER', p: '16 líneas de metro y 321 estaciones, más cinco líneas de RER (A a E) que cruzan la ciudad y llegan a los aeropuertos.' },
      { icon: '🚶', h: 'A pie', p: `La Torre Eiffel y Notre-Dame están a ${km} en línea recta, unos ${min} minutos andando según nuestra estimación. La mayoría de las zonas de arriba son vecinas.` },
      { icon: '🚗', h: 'En coche', p: 'París es zona de bajas emisiones: los coches con distintivo Crit’Air 3, 4 o 5 no pueden circular los días laborables de 8:00 a 20:00. El coche compensa para salir de la ciudad, recogiéndolo al marcharse.' },
    ],
    carCta: 'Alquilar un coche para excursiones',
    lightTitle: 'Luz y horarios',
    light: [
      { h: 'La Torre Eiffel de noche', p: 'La torre centellea cinco minutos al comienzo de cada hora después del anochecer. La iluminación se apaga a las 23:45, cuando cierra la torre.' },
      { h: 'Días cortos y largos', p: 'El sol se pone hacia las 16:55 en diciembre y hacia las 21:58 cerca del 21 de junio. En invierno una habitación con vistas permite ver varios centelleos por la tarde; a finales de junio anochece tan tarde que el primero no llega antes de las 23:00.' },
    ],
    faq: (d) => [
      ...(d.cheapest ? [{ q: '¿Hace falta un hotel de lujo para tener vistas en París?', a: `No. ${d.budgetN} hoteles de esta web tienen una habitación que nombra las vistas por ${d.budgetMax} o menos. La más barata que encontramos costaba ${d.cheapest.price} en ${d.cheapest.name}${d.cheapest.stars ? ` (${d.cheapest.stars} estrellas)` : ''}.` }] : []),
      ...(d.premium != null ? [{ q: '¿Cuánto más cuesta la habitación con vistas?', a: `En ${d.premiumN} hoteles donde tenemos ambos precios, la habitación que nombra las vistas costaba una mediana de un ${d.premium} % más que la más barata del hotel esa misma noche.` }] : []),
      { q: '¿Alojarse al lado de un monumento significa verlo?', a: `Pocas veces. De los ${d.proxNear} pares hotel-monumento a menos de 1 km en nuestros datos, ${d.proxSeen} declaran vistas a ese monumento (${d.proxPct} %).` },
      { q: '¿Para qué fechas son los precios?', a: `Todos los precios son para el ${d.checkIn}, dos adultos, recogidos con antelación. Cambian a diario, así que consulta la disponibilidad para tus fechas.` },
    ],
    soonTitle: 'Próximos destinos',
  },
  de: {
    lede: 'Zwei Zimmer im selben Pariser Hotel können auf den Eiffelturm oder auf eine Hofwand blicken. Diese Seite ordnet Hotels danach, was das Hotel selbst als Aussicht angibt, Zimmer für Zimmer, und zeigt, in welchen Vierteln du suchen solltest.',
    stats: { checked: 'geprüfte Hotels', withView: 'mit angegebener Aussicht', roomLevel: 'Aussicht im Namen der Zimmerkategorie', median: 'Median Zimmer mit Aussicht, pro Nacht' },
    mapTitle: 'Karte der Hotels in Paris',
    bestTitle: 'Die besten Hotels mit Aussicht in Paris',
    bestLede: 'Zuerst nach der Stärke des Belegs sortiert (eine Zimmerkategorie, die den Blick nennt), dann nach Gästebewertung. Jedes Hotel steht bei dem Wahrzeichen, das es am besten sieht.',
    picksTitle: 'Unsere Tipps je nach Reise',
    picksLede: 'Für jeden Wunsch ein anderes Hotel, aus derselben geprüften Liste.',
    historyTitle: 'Paris: warum die Aussicht funktioniert',
    history: [
      { h: 'Eine Skyline, begrenzt seit 1859', p: 'Ein Dekret von 1859 begrenzte Pariser Gebäude auf 17,55 Meter, in Straßen breiter als 20 Meter auf 20 Meter. Die Haussmann-Blöcke aus dieser Zeit geben der Stadt ihre gleichmäßige Dachlinie, und alles Höhere ragt darüber hinaus.' },
      { h: 'Wahrzeichen, gebaut um gesehen zu werden', p: 'Der Eiffelturm wurde am 31. März 1889 für die Weltausstellung desselben Jahres fertig und ist mit Antenne 330 Meter hoch. Am rechten Ufer steigt Montmartre auf rund 130 Meter, den höchsten natürlichen Punkt der Stadt, und Sacré-Cœur auf dem Gipfel (fertiggestellt 1914) setzt seine Kuppeln obendrauf.' },
      { h: 'Der Fluss als offene Schneise', p: 'Die Seine-Ufer zwischen Pont de Sully und Pont d’Iéna sind seit 1991 UNESCO-Welterbe. Auf dem Wasser wird nicht gebaut, Zimmer zu den Kais blicken also über freie Fläche statt in die Straße.' },
      { h: 'Notre-Dame, zurück in der Skyline', p: 'Nach dem Brand vom 15. April 2019 wurde die Kathedrale im Dezember 2024 wiedereröffnet, die Türme sind seit September 2025 wieder zugänglich.' },
    ],
    areasTitle: 'Wo in Paris übernachten für die Aussicht',
    areasLede: 'Jedes Hotel mit angegebener Aussicht zählt einmal, im nächstgelegenen dieser sechs Viertel (bis 1,5 km). Der Preis ist das günstigste datierte Zimmer im Viertel, das den Blick nennt.',
    areaLine: (n, m) => `${n === 1 ? '1 Hotel' : `${n} Hotels`} mit Aussicht${m ? ` · ab ${m}` : ''}`,
    areas: {
      'champ-de-mars': { name: 'Champ de Mars, 7. Arrondissement', d: 'Die Avenuen rund um den Eiffelturm und den Park zu seinen Füßen. Aus den oberen Etagen füllt der Turm das Fenster.' },
      passy: { name: 'Passy und Trocadéro, 16. Arrondissement', d: 'Der Chaillot-Hügel gegenüber dem Turm auf der anderen Flussseite, der Blickwinkel der meisten Postkarten. Überwiegend Wohnstraßen.' },
      montmartre: { name: 'Montmartre, 18. Arrondissement', d: 'Der Hügel rund um Sacré-Cœur. Von hier reicht der Blick nach Süden über die ganze Stadt.' },
      'latin-quarter': { name: 'Quartier Latin und die Inseln, 5. und 4. Arrondissement', d: 'Das linke Ufer gegenüber Notre-Dame und der Île de la Cité, die Seine dazwischen.' },
      etoile: { name: 'Étoile, 8. und 17. Arrondissement', d: 'Die zwölf Avenuen, die sich am Arc de Triomphe treffen. Ihre Breite lässt den oberen Etagen freien Blick.' },
      'saint-germain': { name: 'Saint-Germain, 6. Arrondissement', d: 'Zwischen Jardin du Luxembourg und Seine, gegenüber dem Louvre auf der anderen Seite des Pont des Arts.' },
    },
    viewpointsTitle: 'Wo man Paris von oben sieht',
    viewpointsLede: 'Für die Stunden außerhalb des Zimmers. Kostenlos, sofern kein Ticket angegeben ist.',
    viewpoints: [
      { name: 'Terrasse der Galeries Lafayette', tag: 'Kostenlos', d: '8. Etage des Kaufhauses am Boulevard Haussmann, 360°-Blick über die Dächer und die Oper.' },
      { name: 'Terrasse von Printemps Haussmann', tag: 'Kostenlos', d: 'Die 9. Etage des Nachbarkaufhauses, mit Opéra Garnier, Sacré-Cœur und Eiffelturm im Blick.' },
      { name: 'Institut du monde arabe', tag: 'Kostenlos', d: 'Die Dachterrasse an der Seine blickt direkt auf Notre-Dame. Dienstag bis Sonntag geöffnet.' },
      { name: 'Parc de Belleville', tag: 'Kostenlos', d: 'Der höchstgelegene Park von Paris (108 m), mit dem Eiffelturm am Ende des Blicks nach Westen.' },
      { name: 'Buttes-Chaumont, Temple de la Sibylle', tag: 'Kostenlos', d: 'Ein Tempelchen auf einem 30 Meter hohen Felsen im Park, mit Blick auf Montmartre und Sacré-Cœur.' },
      { name: 'Kuppel von Sacré-Cœur', tag: 'Ticket', d: 'Rund 300 Stufen über dem höchsten Punkt der Stadt, 360°-Blick.' },
      { name: 'Dach des Arc de Triomphe', tag: 'Ticket', d: '284 Stufen zu einer Terrasse inmitten der zwölf Avenuen, mit Blick auf die Champs-Élysées und La Défense.' },
      { name: 'Türme von Notre-Dame', tag: 'Ticket', d: '422 Stufen zur Galerie der Chimären, seit September 2025 wieder offen. Online buchen.' },
      { name: 'Metrolinie 6, Passy bis Bir-Hakeim', tag: 'Metroticket', d: 'Die Linie fährt auf einem Viadukt und überquert die Seine auf dem Pont de Bir-Hakeim, direkt gegenüber dem Eiffelturm.' },
      { name: 'Tour Montparnasse', tag: 'Geschlossen', d: 'Die Aussichtsplattform im 56. Stock ist seit dem 31. März 2026 wegen Bauarbeiten geschlossen, angekündigt bis mindestens 2030.' },
    ],
    transportTitle: 'Anreise und Unterwegs in Paris',
    transportLede: 'Die Flughafenpreise sind die offiziellen Taxi-Festpreise 2026, in beide Richtungen gleich, Tag und Nacht.',
    transport: ({ km, min }) => [
      { icon: '✈', h: 'Charles de Gaulle (CDG)', p: 'RER B in etwa 35 Minuten zur Gare du Nord, weiter nach Châtelet und ins Quartier Latin. Taxi: 56 € zum rechten Ufer, 65 € zum linken.' },
      { icon: '✈', h: 'Orly (ORY)', p: 'Die Metrolinie 14 fährt seit dem 24. Juni 2024 zum Flughafen und erreicht Châtelet in etwa 25 Minuten. Taxi: 36 € zum linken Ufer, 45 € zum rechten.' },
      { icon: '✈', h: 'Beauvais (BVA)', p: 'Von Billigfliegern genutzt. Der Flughafenshuttle fährt in etwa 1 Stunde 15 Minuten zur Porte Maillot, bei Verkehr länger.' },
      { icon: '🚆', h: 'Fernbahnhöfe', p: 'Gare du Nord für London, Brüssel und Amsterdam; Gare de l’Est für Ostfrankreich und Deutschland; Gare de Lyon für den Südosten, die Schweiz und Italien; Montparnasse für die Bretagne und den Südwesten.' },
      { icon: '🚇', h: 'Metro und RER', p: '16 Metrolinien mit 321 Stationen, dazu fünf RER-Linien (A bis E), die die Stadt durchqueren und die Flughäfen erreichen.' },
      { icon: '🚶', h: 'Zu Fuß', p: `Eiffelturm und Notre-Dame liegen in Luftlinie ${km} auseinander, nach unserer Schätzung etwa ${min} Minuten zu Fuß. Die meisten Viertel oben grenzen aneinander.` },
      { icon: '🚗', h: 'Mit dem Auto', p: 'Paris ist Umweltzone: Autos mit Crit’Air-Plakette 3, 4 oder 5 dürfen werktags von 8 bis 20 Uhr nicht fahren. Ein Mietwagen lohnt sich für Ausflüge, abgeholt bei der Abfahrt.' },
    ],
    carCta: 'Mietwagen für Tagesausflüge',
    lightTitle: 'Licht und Uhrzeiten',
    light: [
      { h: 'Der Eiffelturm bei Nacht', p: 'Der Turm glitzert nach Einbruch der Dunkelheit zu jeder vollen Stunde fünf Minuten lang. Um 23:45 Uhr, wenn er schließt, geht die Beleuchtung aus.' },
      { h: 'Kurze und lange Tage', p: 'Die Sonne geht im Dezember gegen 16:55 Uhr unter, um den 21. Juni gegen 21:58 Uhr. Im Winter sieht man aus einem Zimmer mit Blick mehrere Glitzershows am Abend; Ende Juni wird es so spät dunkel, dass die erste nicht vor 23 Uhr kommt.' },
    ],
    faq: (d) => [
      ...(d.cheapest ? [{ q: 'Braucht man ein Luxushotel für Aussicht in Paris?', a: `Nein. ${d.budgetN} Hotels auf dieser Seite haben ein Zimmer, das den Blick nennt, für ${d.budgetMax} oder weniger. Das günstigste lag bei ${d.cheapest.price} im ${d.cheapest.name}${d.cheapest.stars ? ` (${d.cheapest.stars} Sterne)` : ''}.` }] : []),
      ...(d.premium != null ? [{ q: 'Wie viel teurer ist das Zimmer mit Aussicht?', a: `In ${d.premiumN} Hotels, für die wir beide Preise haben, kostete das Zimmer mit Blick im Median ${d.premium} % mehr als das günstigste Zimmer derselben Nacht.` }] : []),
      { q: 'Sieht man ein Wahrzeichen, wenn man direkt daneben wohnt?', a: `Selten. Von ${d.proxNear} Paaren aus Hotel und Wahrzeichen im Umkreis von 1 km in unseren Daten geben ${d.proxSeen} einen Blick darauf an (${d.proxPct} %).` },
      { q: 'Für welches Datum gelten die Preise?', a: `Alle Preise gelten für den ${d.checkIn}, zwei Erwachsene, vorab erhoben. Sie ändern sich täglich, prüfe die Verfügbarkeit für deine Daten.` },
    ],
    soonTitle: 'Bald weitere Reiseziele',
  },
}
