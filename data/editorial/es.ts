import type { Editorial, Fmt, Section, QA, Card, NearStats } from './types'
import type { ViewStats } from '@/lib/stats'

// Español (neutro, válido para España y Latinoamérica). Hechos en data/SOURCES.md. Sin rayas.

/** "a" + article, with the mandatory contraction: a + el = al. */
const aDe = (name: string) => (name.startsWith('el ') ? `al ${name.slice(3)}` : `a ${name}`)

const premium = (s: ViewStats, f: Fmt) =>
  s.premiumMedian != null && s.premiumN >= 3
    ? `En los ${s.premiumN} hoteles en los que pudimos comparar precios para la misma noche (${f.date(s.priceDate!)}), la habitación con vistas más barata costaba una mediana de un ${s.premiumMedian} % más que la habitación más barata del hotel.`
    : ''

const bookingSection = (lm: string, s: ViewStats, f: Fmt): Section => ({
  h: 'Reserva la habitación, no solo el hotel',
  p: [
    `Que un hotel tenga vistas casi nunca significa que las tengan todas sus habitaciones. De los ${s.count} hoteles de esta página, ${s.roomNamed} indican las vistas ${aDe(lm)} en un tipo de habitación concreto. Esa es la categoría que hay que reservar: si las vistas figuran en el nombre de la habitación, forman parte de lo que pagas.`,
    'Los demás mencionan las vistas en su propia descripción, normalmente con un «algunas habitaciones». Es una afirmación real del hotel, pero no te dice qué habitación te van a dar. Reserva la mejor categoría posible y pídelo por escrito al hotel antes de llegar.',
    premium(s, f),
  ].filter(Boolean),
})

const faqCommon = (lm: string): QA[] => [
  { q: `¿Cómo sabéis que un hotel tiene vistas ${aDe(lm)}?`, a: 'Leemos los nombres de las habitaciones y la descripción que el propio hotel publica en su ficha de reserva. Solo mostramos unas vistas cuando uno de los dos las menciona. Estar cerca nunca basta: un hotel a 300 metros puede dar a un patio interior y otro a 4 kilómetros puede ver toda la ciudad.' },
  { q: '¿Qué significa «sin datos» junto a balcón o terraza?', a: 'Que la ficha no dice nada al respecto. No significa que el hotel no lo tenga. Nunca convertimos la falta de información en un «no».' },
  { q: '¿Los precios de esta página están actualizados?', a: 'No. Se consultaron con antelación para una noche y dos adultos, y se muestran con esa fecha. Pulsa «Ver disponibilidad» para ver las tarifas reales de tus fechas.' },
]

type LM = {
  name: string
  a: string
  cards: (s: ViewStats, f: Fmt) => Card[]
  sections: (s: ViewStats, f: Fmt) => Section[]
  faq: (s: ViewStats, f: Fmt) => QA[]
  meta: (s: ViewStats) => string
  near?: { lede: (s: NearStats, f: Fmt) => string; sections: (s: NearStats, f: Fmt) => Section[]; faq: QA[] }
}

const LM: Record<string, LM> = {
  'eiffel-tower': {
    name: 'la Torre Eiffel', a: 'la Torre Eiffel',
    meta: (s) => `${s.count} hoteles de París en los que el propio hotel indica vistas a la Torre Eiffel: tipos de habitación, balcones, distancia y valoraciones.`,
    cards: (s, f) => [
      { tag: 'De cerca', t: 'A los pies de la torre', d: `${s.under1km} de los ${s.count} hoteles están a menos de 1 km, en los distritos 7, 15 y 16. Se ve el entramado de hierro, no solo la silueta.` },
      { tag: 'De lejos', t: 'Sobre los tejados', d: `${s.over2km} hoteles la ven a más de 2 km, hasta ${s.farthest ? f.d(s.farthest.d) : ''} desde Montmartre. La torre entera sobre París, destellos incluidos.` },
      { tag: 'De noche', t: 'Cinco minutos cada hora', d: 'Al anochecer, la torre centellea durante cinco minutos al comienzo de cada hora. Las luces se apagan a las 23:45, al cierre.' },
      { tag: 'Balcón', t: `${s.balconyNamed} hoteles lo indican`, d: 'Solo contamos los tipos de habitación que combinan «balcón» y «vistas a la Torre Eiffel» en su nombre.' },
    ],
    sections: (s, f) => [
      {
        h: 'Dos vistas muy distintas de la Torre Eiffel',
        p: [
          `La primera es la vista cercana. Desde las calles del Campo de Marte, de Grenelle y de la colina del Trocadéro, la torre llena la ventana. ${s.closest ? `El hotel más cercano de esta página, ${s.closest.hotel.name}, está a ${f.d(s.closest.d)} en línea recta.` : ''} De cerca el ángulo es muy vertical: desde las plantas bajas se suelen ver las patas y el primer piso más que la punta, y por eso varios hoteles especifican «planta alta» en la categoría.`,
          `La segunda es la vista panorámica. Desde Montmartre, la Étoile o el Barrio Latino, la torre aparece pequeña y completa sobre un mar de tejados de zinc. Es una vista más tranquila y a menudo una noche más barata. ${s.farthest ? `${s.farthest.hotel.name} está a ${f.d(s.farthest.d)} y aun así indica las vistas en sus tipos de habitación.` : ''}`,
        ],
      },
      bookingSection('la Torre Eiffel', s, f),
      {
        h: 'Cuándo se disfruta más la vista',
        p: [
          'Cada tarde, la iluminación dorada se enciende al caer el sol y las 20.000 bombillas centelleantes se activan durante cinco minutos al comienzo de cada hora. Las luces se apagan a las 23:45, cuando cierra la torre, dentro del plan de ahorro energético del Ayuntamiento de París en vigor desde septiembre de 2022.',
          'La estación del año cambia cuántos destellos verás desde la habitación. En diciembre anochece antes de las seis de la tarde, así que caben varios antes de cenar. En torno al solsticio de junio no oscurece hasta pasadas las diez y quizá solo veas uno o dos. Si la vista nocturna es el motivo del viaje, el otoño y el invierno te dan más.',
          'La luz depende de desde dónde mires. Montmartre y la orilla derecha, al noreste, ven la torre con el sol de la mañana. Desde el Trocadéro y Passy, al noroeste, la luz del final de la tarde es la que ilumina la cara que tienes enfrente.',
        ],
      },
      {
        h: 'Dónde alojarse para tener la vista',
        p: [
          'Trocadéro y Passy (distrito 16): al otro lado del Sena, justo enfrente de la torre. El ángulo de postal, con hoteles sobre todo de gama alta y calles residenciales tranquilas por la noche.',
          'Campo de Marte y Gros-Caillou (distrito 7): pegados a la torre, con el parque en medio. Pocos hoteles y mucha demanda.',
          'Grenelle y Dupleix (distrito 15): la torre vista desde el suroeste, edificios más modernos, mejor relación calidad-precio y la línea 6 del metro, elevada y con sus propias vistas.',
          'Montmartre (distrito 18): la vista lejana desde la colina, sobre toda la ciudad. Aquí las vistas figuran en los tipos de habitación y la noche cuesta mucho menos que en el distrito 7.',
        ],
      },
    ],
    faq: (s, f) => [
      { q: '¿Qué hoteles de París tienen las mejores vistas a la Torre Eiffel?', a: `Depende de lo que busques: una vista cercana e impactante o la silueta completa sobre la ciudad. De los ${s.count} hoteles de esta página, ${s.roomNamed} incluyen las vistas en el nombre de un tipo de habitación, que es la señal más fiable. Aparecen primero en esta página.` },
      { q: '¿Merece la pena pagar más por una habitación con vistas a la Torre Eiffel?', a: premium(s, f) || 'Depende del hotel. Compara la categoría con vistas con la habitación estándar para tus fechas.' },
      { q: '¿Se ve el centelleo de la Torre Eiffel desde la habitación?', a: 'Si la habitación da a la torre, sí: centellea cinco minutos al comienzo de cada hora desde el anochecer y las luces se apagan a las 23:45.' },
      ...faqCommon('la Torre Eiffel'),
    ],
    near: {
      lede: (s) => `${s.count} hoteles con valoración a menos de 1,5 km de la Torre Eiffel, ordenados por distancia en línea recta y con el tiempo a pie estimado.`,
      sections: (s, f) => [
        {
          h: 'Alojarse cerca de la Torre Eiffel',
          p: [
            `La torre está en el borde del distrito 7, entre el Sena y el Campo de Marte. Los hoteles a los que se llega andando se reparten entre el 7, el 15 al suroeste y el 16 al otro lado del río. ${s.medianPrice ? `El ${f.date(s.priceDate!)}, el precio «desde» mediano de los hoteles de esta lista era de ${f.eur(s.medianPrice)} para dos personas.` : ''}`,
            `${s.withView} de estos hoteles también indican vistas a la torre. Estar cerca no significa tener vistas: muchas direcciones a pocos minutos dan a un patio o al edificio de enfrente.`,
          ],
        },
        { h: 'Cómo moverse desde aquí', p: ['La zona tiene el RER C (Champ de Mars-Tour Eiffel), la línea 6 del metro (Bir-Hakeim) y la línea 9 (Trocadéro). El paseo junto al río hace muy agradable ir a pie hasta el Museo de Orsay y el Louvre.'] },
      ],
      faq: [
        { q: '¿Qué significa «cerca» en esta página?', a: 'Hasta 1,5 km en línea recta. El tiempo a pie es una estimación: la línea recta más un 30 % por el trazado de las calles, a 80 metros por minuto.' },
        { q: '¿Todos los hoteles cerca de la Torre Eiffel tienen vistas a ella?', a: 'No. Proximidad y vistas son cosas distintas. Los hoteles marcados con «Vistas confirmadas» son aquellos en los que el propio hotel menciona las vistas.' },
      ],
    },
  },

  'notre-dame': {
    name: 'Notre Dame', a: 'Notre Dame',
    meta: (s) => `${s.count} hoteles de París con vistas a Notre Dame indicadas por el propio hotel, casi todos en los muelles de la orilla izquierda, frente a la catedral.`,
    cards: (s, f) => [
      { tag: 'Reabierta', t: 'Desde diciembre de 2024', d: 'La catedral reabrió tras cinco años de restauración después del incendio de abril de 2019. La nueva aguja vuelve a dibujar el horizonte.' },
      { tag: 'Dónde', t: 'Los muelles de la orilla izquierda', d: `Todos los hoteles con vistas están a menos de ${s.farthest ? f.d(s.farthest.d) : '1 km'}, sobre todo en el Barrio Latino, al otro lado del brazo pequeño del Sena.` },
      { tag: 'Además', t: 'A menudo, también el Sena', d: 'Desde los muelles, el río forma parte de la misma vista. Varios hoteles indican las dos.' },
    ],
    sections: (s, f) => [
      {
        h: 'Despertarse frente a Notre Dame',
        p: [
          'Notre Dame se alza en la Île de la Cité, en el distrito 4. En la isla casi no hay hoteles, así que la vista llega desde la orilla izquierda: el Quai Saint-Michel, el Quai de Montebello y las callejuelas del distrito 5 que hay detrás.',
          `Las distancias son cortas. ${s.closest ? `${s.closest.hotel.name} está a ${f.d(s.closest.d)} de la catedral en línea recta.` : ''} Lo importante es hacia qué lado del edificio mira la habitación: desde los muelles se ven la fachada sur y los jardines del ábside.`,
        ],
      },
      bookingSection('Notre Dame', s, f),
      {
        h: 'Antes de reservar',
        p: [
          'La explanada de la catedral es el kilómetro cero de las carreteras francesas y las calles de alrededor tienen mucho movimiento hasta tarde. Las habitaciones que dan a los muelles cambian algo de ruido por la vista.',
          'La mayoría de los hoteles de esta parte del Barrio Latino ocupan edificios antiguos: habitaciones y ascensores pequeños, pocos balcones. Aquí el lujo es la vista.',
        ],
      },
    ],
    faq: () => [
      { q: '¿Notre Dame vuelve a estar abierta?', a: 'Sí. La catedral reabrió en diciembre de 2024 tras la restauración posterior al incendio de abril de 2019.' },
      ...faqCommon('Notre Dame'),
    ],
    near: {
      lede: (s) => `${s.count} hoteles con valoración a menos de 1,5 km de Notre Dame, ordenados por distancia. El Barrio Latino, el Marais y Saint-Germain quedan a mano.`,
      sections: (s) => [
        {
          h: 'Alojarse cerca de Notre Dame',
          p: [
            `Notre Dame es el monumento más céntrico de París, y se nota: ${s.bands[0] + s.bands[1]} hoteles de esta lista están a menos de 500 metros. El Barrio Latino (distrito 5) es la opción con más oferta, el Marais (distrito 4) queda al norte cruzando los puentes y Saint-Germain (distrito 6) a un corto paseo al oeste.`,
            `${s.withView} de estos hoteles indican también vistas a la catedral.`,
          ],
        },
      ],
      faq: [{ q: '¿Cuál es la mejor zona para alojarse cerca de Notre Dame?', a: 'El Barrio Latino para ir andando en pocos minutos y tener más hoteles, el Marais para restaurantes y noches animadas, Saint-Germain para una orilla izquierda más tranquila y clásica.' }],
    },
  },

  'arc-de-triomphe': {
    name: 'el Arco del Triunfo', a: 'el Arco del Triunfo',
    meta: () => 'Hoteles de París con vistas al Arco del Triunfo indicadas por el propio hotel, en torno a la plaza Charles-de-Gaulle: tipos de habitación, balcones y distancia.',
    cards: (s) => [
      { tag: 'Doce avenidas', t: 'Mirar por una avenida', d: 'Doce avenidas convergen en la plaza Charles-de-Gaulle. Los hoteles con vistas miran por una de ellas, directamente al arco.' },
      { tag: 'Cada tarde', t: 'A las 18:30', d: 'La llama de la Tumba del Soldado Desconocido, bajo el arco, se reaviva cada tarde a las 18:30.' },
      { tag: 'Balcón', t: `${s.balconyNamed} lo indican`, d: 'Los edificios haussmannianos de la Étoile suelen tener balcones corridos en la segunda y la quinta planta.' },
    ],
    sections: (s, f) => [
      {
        h: 'Cómo funciona la vista al Arco del Triunfo',
        p: [
          'El arco está en el centro de la plaza Charles-de-Gaulle, donde doce avenidas se juntan como las puntas de una estrella (durante mucho tiempo la plaza se llamó la Étoile). Un hotel ve el arco cuando sus habitaciones dan a una de esas avenidas: cuenta más la calle a la que mira la habitación que la distancia.',
          `${s.closest ? `El hotel más cercano de esta página es ${s.closest.hotel.name}, a ${f.d(s.closest.d)}.` : ''} Algunos hoteles lo precisan y nombran la avenida a la que dan las habitaciones con vistas al arco.`,
        ],
      },
      bookingSection('el Arco del Triunfo', s, f),
    ],
    faq: () => [
      { q: '¿Se puede subir al Arco del Triunfo?', a: 'Sí, la terraza superior está abierta al público y ofrece una de las mejores vistas de los Campos Elíseos y de la Torre Eiffel.' },
      ...faqCommon('el Arco del Triunfo'),
    ],
    near: {
      lede: (s) => `${s.count} hoteles con valoración a menos de 1,5 km del Arco del Triunfo, ordenados por distancia.`,
      sections: (s) => [
        {
          h: 'Alojarse cerca del Arco del Triunfo',
          p: [
            `El arco es el punto donde se unen los distritos 8, 16 y 17. ${s.bands[0] + s.bands[1]} hoteles de esta lista están a menos de 500 metros, desde palacios en la avenida Kléber hasta hoteles pequeños en las calles más tranquilas del 17.`,
            'La estación Charles de Gaulle-Étoile conecta las líneas 1, 2 y 6 del metro con el RER A, que va directo a La Défense y a Disneyland París.',
          ],
        },
      ],
      faq: [{ q: '¿Es el Arco del Triunfo una buena base para visitar París?', a: 'Sí. La línea 1 lleva al Louvre y al Marais en pocos minutos, la 6 a la Torre Eiffel y el RER A cruza la ciudad.' }],
    },
  },

  seine: {
    name: 'el Sena', a: 'el Sena',
    meta: () => 'Hoteles de París con vistas al Sena indicadas por el propio hotel, en los muelles frente al río: tipos de habitación y valoraciones.',
    cards: () => [
      { tag: 'UNESCO', t: 'Las orillas del Sena', d: 'Las orillas del Sena en París, entre el puente de Sully y el puente de Iéna, son Patrimonio Mundial de la UNESCO desde 1991.' },
      { tag: 'Dónde', t: 'En el muelle, no detrás', d: 'Una vista al río exige una habitación en el propio muelle. Una calle más atrás y el río desaparece.' },
    ],
    sections: (s, f) => [
      {
        h: 'Una habitación sobre el río',
        p: [
          'Pocos hoteles de París están directamente en los muelles, por eso una vista al Sena es más rara de lo que parece. Los que lo están suelen ver además un monumento al otro lado del agua: Notre Dame desde el Barrio Latino, la Torre Eiffel desde el distrito 16.',
          'Las habitaciones sobre el río dan a las vías de los muelles, con tráfico. Pide una planta alta: la vista se abre por encima de los árboles y el ruido baja.',
        ],
      },
      bookingSection('el Sena', s, f),
    ],
    faq: () => faqCommon('el Sena'),
  },

  'paris-rooftops': {
    name: 'los tejados de París', a: 'los tejados de París',
    meta: () => 'Hoteles de París con vistas a los tejados de zinc de la ciudad, desde habitaciones en la última planta o desde azoteas, según indican los propios hoteles.',
    cards: () => [
      { tag: 'Última planta', t: 'Bajo la mansarda', d: 'La sexta y la séptima planta de los edificios haussmannianos, bajo el tejado de zinc, son las que tienen vistas a los tejados.' },
      { tag: 'Azotea', t: 'O desde la terraza', d: 'Algunos hoteles reservan la vista a un bar o restaurante en la azotea. Las habitaciones no siempre la comparten.' },
    ],
    sections: (s, f) => [
      {
        h: 'La vista de la que está hecha París',
        p: [
          'Tejados grises de zinc, chimeneas, buhardillas: el horizonte de París se construyó en gran parte con los mismos materiales desde la gran reforma de la ciudad en el siglo XIX. Desde una habitación en la última planta lo ves de punta a punta, y a menudo un monumento sobresale por encima.',
          'Es la vista que los hoteles describen de forma más vaga («vistas a París», «sobre los tejados»). La incluimos cuando el hotel lo dice e indicamos si viene de las habitaciones o de una azotea.',
        ],
      },
      bookingSection('los tejados de París', s, f),
    ],
    faq: () => faqCommon('los tejados de París'),
  },

  'sacre-coeur': {
    name: 'el Sacré-Cœur', a: 'el Sacré-Cœur',
    meta: () => 'Hoteles de París con vistas al Sacré-Cœur indicadas por el propio hotel, en Montmartre: tipos de habitación y distancia.',
    cards: () => [{ tag: 'Montmartre', t: 'En lo alto de la colina', d: 'La basílica corona la colina de Montmartre, en el distrito 18, uno de los puntos más altos de París.' }],
    sections: (s, f) => [
      { h: 'Ver el Sacré-Cœur desde la habitación', p: ['La basílica blanca está en lo alto de Montmartre, así que la vista llega desde abajo: calles en la ladera que miran hacia la cúpula. Los mismos hoteles suelen mirar también hacia el otro lado, sobre toda la ciudad.'] },
      bookingSection('el Sacré-Cœur', s, f),
    ],
    faq: () => faqCommon('el Sacré-Cœur'),
    near: {
      lede: (s) => `${s.count} hoteles con valoración a menos de 1,5 km del Sacré-Cœur, ordenados por distancia.`,
      sections: (s) => [
        { h: 'Alojarse cerca del Sacré-Cœur', p: [`Montmartre es un pueblo dentro de la ciudad: calles empinadas, escaleras y un funicular hasta la basílica. ${s.bands[0] + s.bands[1]} hoteles de esta lista están a menos de 500 metros. Ten en cuenta la cuesta al reservar: «cerca» puede significar una buena subida con la maleta.`] },
      ],
      faq: [{ q: '¿Es Montmartre un buen barrio para alojarse en París?', a: 'Por ambiente y precio, sí. Queda más lejos del Louvre y de la Torre Eiffel, pero las líneas 2 y 12 lo conectan rápido.' }],
    },
  },
}

export const es: Editorial = {
  home: () => ({
    title: 'Wake Up With A View: hoteles con vistas por las que merece la pena despertarse',
    h1: 'No te quedes solo cerca. Despierta frente a ella.',
    meta: 'Encuentra hoteles desde los que se ve el monumento desde la habitación: la Torre Eiffel, Notre Dame, el Sena. Cada vista, comprobada en la ficha del propio hotel.',
    lede: 'Clasificamos los hoteles por lo que se ve desde ellos y desde dónde. Solo mostramos una vista cuando el hotel la menciona.',
    cards: [
      { tag: 'Desde la habitación', t: 'Desde la cama', d: 'Las vistas figuran en el tipo de habitación. Abres las cortinas y ahí están.' },
      { tag: 'Balcón', t: 'Un café al aire libre', d: 'Tipos de habitación con balcón y vistas en el nombre. Te avisamos cuando no se indica hacia dónde da el balcón.' },
      { tag: 'Azotea', t: 'Desde la última planta', d: 'El hotel tiene la vista desde un bar o una terraza en la azotea. Puede que tu habitación no la tenga.' },
      { tag: 'Cerca', t: 'Ir andando', d: 'Sin vistas. Hoteles ordenados por distancia al monumento.' },
    ],
    sections: [
      { h: 'Primero, la vista', p: ['Cada hotel aparece por lo que se ve desde él: el monumento y desde dónde se ve.'] },
      { h: 'Primero, los datos', p: ['Distancia, valoración, balcón y terraza de un vistazo, con la fecha en que lo comprobamos.'] },
      { h: 'Nunca damos una vista por supuesta', p: ['Estar cerca no demuestra nada. Una vista solo aparece aquí si la menciona el nombre de una habitación o la descripción del hotel.'] },
    ],
    faq: [],
  }),

  city: (c) => ({
    title: 'Hoteles con vistas en París: Torre Eiffel, Notre Dame, el Sena',
    h1: 'Despierta con vistas en París',
    meta: `Hoteles de París con vistas a la Torre Eiffel (${c['eiffel-tower']}), a Notre Dame (${c['notre-dame']}) y al Sena, según los propios hoteles. Tipos de habitación, balcones, distancia y valoraciones.`,
    lede: 'París es una ciudad baja y uniforme: la mayoría de los edificios no pasan de seis o siete plantas, así que unos metros más de altura lo cambian todo. Por eso un mismo hotel puede tener una habitación con la Torre Eiffel en la ventana y otra que da a un patio.',
    cards: [
      { tag: 'Regla práctica', t: 'La altura manda', d: 'Una última planta a dos kilómetros suele ver más que un primer piso justo al lado.' },
      { tag: 'Orilla derecha, orilla izquierda', t: 'Atención al río', d: 'El Sena abre las vistas más amplias: el Trocadéro mira a la Torre Eiffel, el Barrio Latino a Notre Dame.' },
      { tag: 'Montmartre', t: 'La vista lejana', d: 'Desde la colina, toda la ciudad se extiende a tus pies, Torre Eiffel incluida.' },
    ],
    sections: [
      {
        h: 'De dónde salen las vistas de París',
        p: [
          'Tres cosas deciden si una habitación de hotel en París tiene vistas: la altura, la calle a la que da y lo que hay en medio. Las normas haussmannianas que dieron forma a la ciudad limitaron la altura de los edificios, así que el horizonte es llano y los monumentos sobresalen.',
          'El río es la otra gran apertura. A lo largo de los muelles nada tapa la vista sobre el agua: por eso la orilla izquierda mira a Notre Dame y el distrito 16 a la Torre Eiffel.',
        ],
      },
      {
        h: 'Cómo hemos hecho esta lista',
        p: ['Reunimos las fichas de reserva de los hoteles cercanos a los principales monumentos y leímos cada nombre de habitación y cada descripción. Cuando un tipo de habitación nombra la vista, es una fuente a nivel de habitación. Cuando el hotel la describe en general, es una fuente a nivel de hotel. Lo que es más vago se queda en nuestras notas y fuera de la página.'],
      },
    ],
    faq: [
      { q: '¿En qué zona de París hay más hoteles con vistas?', a: 'Alrededor de la Torre Eiffel: los distritos 7, 15 y 16, además de Montmartre para la vista lejana sobre la ciudad.' },
      { q: '¿Hace falta un hotel de lujo para tener vistas en París?', a: 'No. Algunas de las vistas de esta web figuran en los tipos de habitación de hoteles de 2 y 3 estrellas, sobre todo en Montmartre.' },
    ],
  }),

  method: () => ({
    title: 'Cómo verificamos las vistas de los hoteles',
    h1: 'Cómo verificamos las vistas',
    meta: 'Nuestro método: solo mostramos unas vistas cuando el nombre de la habitación o la descripción del hotel las mencionan. Niveles de confianza, origen de la vista y por qué la cercanía no es una prueba.',
    lede: 'La mayoría de las listas de «hoteles con vistas» adivinan. Nosotros no. Así es exactamente como una vista entra en esta web, y lo que la deja fuera.',
    cards: [
      { tag: 'Nivel habitación', t: 'En el nombre de la habitación', d: '«Habitación Deluxe King con vistas a la Torre Eiffel». La vista forma parte de lo que reservas. Se muestra.' },
      { tag: 'Nivel hotel', t: 'Descrita por el hotel', d: '«Algunas habitaciones tienen vistas a la Torre Eiffel». Es cierto, pero no está ligado a una habitación. Se muestra, indicándolo.' },
      { tag: 'Insuficiente', t: 'Fuera de la página', d: 'Un monumento en el nombre de la habitación sin la palabra vista, una azotea temporal, una calle con nombre de monumento.' },
    ],
    sections: [
      { h: 'De dónde salen los datos', p: ['Reunimos las fichas públicas de reserva de los hoteles en torno a cada monumento: nombre, dirección, coordenadas, valoración, número de opiniones, tipos de habitación y descripción del hotel. Guardamos el texto original con su fecha de recogida, de modo que cualquier afirmación de esta web puede rastrearse hasta sus palabras exactas.'] },
      {
        h: 'Qué cuenta como vista',
        p: [
          'Un tipo de habitación que nombra el monumento junto a una palabra de vista (vistas, con vistas a, frente a) es una fuente a nivel de habitación, nuestro nivel más sólido.',
          'Una frase de la descripción del hotel que afirma una vista al monumento es una fuente a nivel de hotel. También anotamos desde dónde se ve: habitaciones, balcón, terraza, azotea, restaurante o bar.',
          'Todo lo demás se queda en nuestros datos pero nunca se convierte en una afirmación: un monumento en el nombre de una habitación sin palabra de vista, una azotea efímera abierta por tiempo limitado o calles como la avenida de la Tour Eiffel.',
        ],
      },
      {
        h: 'Lo que nunca hacemos',
        p: [
          'Nunca deducimos una vista a partir de la distancia. Un hotel a 300 metros de la Torre Eiffel puede dar a un patio.',
          'Nunca deducimos una vista a partir de una foto. Las fotos ilustran, no demuestran.',
          'Nunca convertimos la falta de información en un «no». Si una ficha no menciona el balcón, escribimos «sin datos», no «sin balcón».',
          'Nunca presentamos un precio como permanente. Los precios se muestran con la noche para la que se consultaron.',
        ],
      },
      { h: 'Distancias', p: ['Las distancias se miden en línea recta desde las coordenadas del hotel hasta el monumento. Los tiempos a pie son estimaciones (línea recta más un 30 %, a 80 metros por minuto) y así se indica.'] },
    ],
    faq: [],
  }),

  view: (id, s, f) => {
    const x = LM[id]
    const a = aDe(x.name)
    return {
      title: `Hoteles con vistas ${a} en París (${s.count} verificados)`,
      h1: `Hoteles con vistas ${a}`,
      meta: x.meta(s),
      lede: `${s.count} hoteles en los que el propio hotel indica vistas ${a}, y desde dónde. ${s.roomNamed} de ellos lo indican en un tipo de habitación.`,
      cards: x.cards(s, f),
      sections: x.sections(s, f),
      faq: x.faq(s, f),
    }
  },

  near: (id, s, f) => {
    const x = LM[id]
    const de = x.a.startsWith('el ') ? `del ${x.a.slice(3)}` : `de ${x.a}`
    return {
      title: `Hoteles cerca ${de} en París, por distancia`,
      h1: `Hoteles cerca ${de}`,
      meta: `${s.count} hoteles con valoración a menos de 1,5 km ${de}, ordenados por distancia, con tiempo a pie, valoraciones y cuáles tienen además vistas.`,
      lede: x.near!.lede(s, f),
      cards: [],
      sections: x.near!.sections(s, f),
      faq: x.near!.faq,
    }
  },

  hotel: (name, ids) => ({
    title: ids.length ? `${name}: vistas ${ids.map((id) => aDe(LM[id].name)).join(', ')}` : name,
    meta: `${name}, París: desde dónde se ve ${ids.map((id) => LM[id].name).join(' y ')}, tipos de habitación, balcón y terraza, distancias a los monumentos y valoración.`,
  }),
}
