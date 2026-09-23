import type { Locale } from '@/lib/i18n'
import type { Section, QA } from './types'

// Category copy. `n` = hotels in the category, `city` = localized city name, `max` = budget cap in EUR.
// Every rule stated here matches the filter in lib/categories.ts.
type Ctx = { n: number; city: string; max: string; date: string }
type Copy = { lede: (c: Ctx) => string; rule: (c: Ctx) => string; sections: (c: Ctx) => Section[]; faq: (c: Ctx) => QA[] }

const EN: Record<string, Copy> = {
  luxury: {
    lede: (c) => `${c.n} five-star hotels in ${c.city} where the hotel itself states a landmark view.`,
    rule: () => 'Rule: official 5-star rating and a view stated by the hotel.',
    sections: () => [{ h: 'What a palace view really buys you', p: ['At this level the view is often in the name of a suite or a specific room category, sometimes with a terrace. It is also where the gap between the cheapest room and the view room is widest, so compare the two categories before booking.', 'Five-star hotels also tend to keep a view for their restaurant or rooftop bar. If the room category does not name the view, the view may be downstairs rather than in your room.'] }],
    faq: () => [{ q: 'Do all rooms in a luxury hotel with a view have the view?', a: 'No. Even in palaces, the view is usually limited to named categories. Check the room name, which we quote under each hotel.' }],
  },
  budget: {
    lede: (c) => `${c.n} hotels in ${c.city} where a room with the view cost ${c.max} or less for two on ${c.date}.`,
    rule: (c) => `Rule: cheapest room with the view at ${c.max} or less for one night, two adults, on the night we collected prices. When no view room was priced, the hotel’s cheapest room is used.`,
    sections: () => [{ h: 'Where the cheaper views are', p: ['Distance is the trick. Hotels on the Montmartre hill see the Eiffel Tower across the whole city for a fraction of what a room next to the tower costs. The Latin Quarter has small, older hotels facing Notre-Dame and the Seine.', 'Budget view rooms are often small and higher up, sometimes under the roof. That is also why they have the view.'] }],
    faq: (c) => [{ q: 'Is the price shown guaranteed?', a: `No. It is the price we collected for one night on ${c.date}. Prices change daily, so check your own dates.` }],
  },
  family: {
    lede: (c) => `${c.n} hotels in ${c.city} with family rooms listed and a landmark view stated by the hotel.`,
    rule: () => 'Rule: family rooms listed among the hotel’s facilities, and a view stated by the hotel.',
    sections: () => [{ h: 'Families and views', p: ['A family room is not always the room with the view. Hotels list family rooms as a facility, and view rooms as categories: check that the category you book says both, or ask the hotel before paying.', 'Rooms for three or four are rarer in old Paris buildings. Book early if you need one with a view.'] }],
    faq: () => [{ q: 'Does the family room have the view?', a: 'Not necessarily. We list hotels that have both family rooms and a view; whether one room has both depends on the category name.' }],
  },
  balcony: {
    lede: (c) => `${c.n} hotels in ${c.city} where a room category combines a balcony and a landmark view.`,
    rule: () => 'Rule: a room category naming both a balcony and the view, or a hotel description saying the balconies have the view.',
    sections: () => [{ h: 'Balcony and view are two different things', p: ['When a room is called “with balcony and Eiffel Tower view”, you get both, but the listing rarely says the balcony faces the tower. We mark the balcony’s direction as not stated unless the hotel says so.', 'In Haussmann buildings, continuous balconies usually run along the 2nd and 5th floors.'] }],
    faq: () => [{ q: 'Can I see the landmark from the balcony?', a: 'Only when the hotel says the balconies have the view. Otherwise the room has both a balcony and a view, but the balcony may face another way.' }],
  },
  pets: {
    lede: (c) => `${c.n} hotels in ${c.city} that accept pets and state a landmark view.`,
    rule: () => 'Rule: “pets allowed” listed by the hotel, and a view stated by the hotel.',
    sections: () => [{ h: 'Travelling with a dog', p: ['Pet policies change and often come with a fee or a size limit. Confirm with the hotel before booking, especially for larger dogs.'] }],
    faq: () => [{ q: 'Is there an extra charge for pets?', a: 'Often, yes. The listing says pets are allowed, not how much it costs. Ask the hotel.' }],
  },
  'air-conditioning': {
    lede: (c) => `${c.n} hotels in ${c.city} with air conditioning and a landmark view stated by the hotel.`,
    rule: () => 'Rule: air conditioning listed by the hotel, and a view stated by the hotel.',
    sections: () => [{ h: 'Why it matters in summer', p: ['Many Paris hotels occupy old buildings without air conditioning, and top-floor rooms, the ones with the views, get the hottest. In July and August it is worth filtering for it.'] }],
    faq: () => [{ q: 'Is air conditioning in every room?', a: 'The listing says the hotel has it; it does not always say it is in every room. Check the room description.' }],
  },
  spa: {
    lede: (c) => `${c.n} hotels in ${c.city} with a spa and a landmark view stated by the hotel.`,
    rule: () => 'Rule: a spa listed by the hotel, and a view stated by the hotel.',
    sections: () => [{ h: 'Spa and view', p: ['Spas are usually below ground in Paris hotels, so the view and the spa rarely go together in the same space.'] }],
    faq: () => [],
  },
}

const ES: Record<string, Copy> = {
  luxury: {
    lede: (c) => `${c.n} hoteles de cinco estrellas en ${c.city} en los que el propio hotel indica vistas a un monumento.`,
    rule: () => 'Criterio: categoría oficial de 5 estrellas y vistas indicadas por el hotel.',
    sections: () => [{ h: 'Lo que realmente compras con unas vistas de palacio', p: ['A este nivel, las vistas suelen figurar en el nombre de una suite o de un tipo de habitación concreto, a veces con terraza. También es donde más difiere el precio de la habitación más barata y el de la habitación con vistas: compara las dos categorías antes de reservar.', 'Los cinco estrellas también suelen reservar las vistas para su restaurante o su bar en la azotea. Si el tipo de habitación no las nombra, puede que las vistas estén abajo y no en tu habitación.'] }],
    faq: () => [{ q: '¿Todas las habitaciones de un hotel de lujo con vistas las tienen?', a: 'No. Incluso en los palacios, las vistas suelen limitarse a categorías concretas. Comprueba el nombre de la habitación, que citamos bajo cada hotel.' }],
  },
  budget: {
    lede: (c) => `${c.n} hoteles en ${c.city} en los que una habitación con vistas costaba ${c.max} o menos para dos personas el ${c.date}.`,
    rule: (c) => `Criterio: habitación con vistas más barata a ${c.max} o menos por una noche y dos adultos, la noche en que consultamos los precios. Si no había precio de habitación con vistas, se usa la habitación más barata del hotel.`,
    sections: () => [{ h: 'Dónde están las vistas más baratas', p: ['El truco es la distancia. Los hoteles de la colina de Montmartre ven la Torre Eiffel al otro lado de toda la ciudad por una fracción de lo que cuesta una habitación junto a la torre. El Barrio Latino tiene hoteles pequeños y antiguos frente a Notre Dame y el Sena.', 'Las habitaciones con vistas económicas suelen ser pequeñas y estar en lo alto, a veces bajo el tejado. Por eso mismo tienen vistas.'] }],
    faq: (c) => [{ q: '¿El precio indicado está garantizado?', a: `No. Es el precio que consultamos para una noche el ${c.date}. Los precios cambian a diario: comprueba tus fechas.` }],
  },
  family: {
    lede: (c) => `${c.n} hoteles en ${c.city} con habitaciones familiares y vistas a un monumento indicadas por el hotel.`,
    rule: () => 'Criterio: habitaciones familiares entre los servicios del hotel y vistas indicadas por el hotel.',
    sections: () => [{ h: 'Familias y vistas', p: ['La habitación familiar no siempre es la habitación con vistas. Los hoteles indican las habitaciones familiares como un servicio y las vistas como un tipo de habitación: comprueba que la categoría que reservas diga las dos cosas o pregunta al hotel antes de pagar.', 'Las habitaciones para tres o cuatro personas escasean en los edificios antiguos de París. Reserva con antelación si necesitas una con vistas.'] }],
    faq: () => [{ q: '¿La habitación familiar tiene vistas?', a: 'No necesariamente. Mostramos hoteles que tienen habitaciones familiares y vistas; que una misma habitación tenga las dos cosas depende del nombre de la categoría.' }],
  },
  balcony: {
    lede: (c) => `${c.n} hoteles en ${c.city} con un tipo de habitación que combina balcón y vistas a un monumento.`,
    rule: () => 'Criterio: un tipo de habitación que nombra balcón y vistas, o una descripción del hotel que dice que los balcones tienen las vistas.',
    sections: () => [{ h: 'Balcón y vistas son dos cosas distintas', p: ['Cuando una habitación se llama «con balcón y vistas a la Torre Eiffel», tienes las dos cosas, pero la ficha rara vez dice que el balcón mire a la torre. Indicamos la orientación del balcón como «sin datos» salvo que el hotel lo diga.', 'En los edificios haussmannianos, los balcones corridos suelen estar en la segunda y la quinta planta.'] }],
    faq: () => [{ q: '¿Se ve el monumento desde el balcón?', a: 'Solo cuando el hotel dice que los balcones tienen las vistas. Si no, la habitación tiene balcón y vistas, pero el balcón puede mirar hacia otro lado.' }],
  },
  pets: {
    lede: (c) => `${c.n} hoteles en ${c.city} que admiten mascotas e indican vistas a un monumento.`,
    rule: () => 'Criterio: «se admiten mascotas» indicado por el hotel y vistas indicadas por el hotel.',
    sections: () => [{ h: 'Viajar con perro', p: ['Las condiciones para mascotas cambian y suelen tener un suplemento o un límite de tamaño. Confírmalo con el hotel antes de reservar, sobre todo con perros grandes.'] }],
    faq: () => [{ q: '¿Hay suplemento por mascota?', a: 'A menudo sí. La ficha dice que se admiten mascotas, no cuánto cuesta. Pregunta al hotel.' }],
  },
  'air-conditioning': {
    lede: (c) => `${c.n} hoteles en ${c.city} con aire acondicionado y vistas a un monumento indicadas por el hotel.`,
    rule: () => 'Criterio: aire acondicionado indicado por el hotel y vistas indicadas por el hotel.',
    sections: () => [{ h: 'Por qué importa en verano', p: ['Muchos hoteles de París ocupan edificios antiguos sin aire acondicionado, y las habitaciones de la última planta, las que tienen vistas, son las que más calor pasan. En julio y agosto merece la pena tenerlo en cuenta.'] }],
    faq: () => [{ q: '¿Hay aire acondicionado en todas las habitaciones?', a: 'La ficha dice que el hotel lo tiene; no siempre dice que esté en todas las habitaciones. Comprueba la descripción de la habitación.' }],
  },
  spa: {
    lede: (c) => `${c.n} hoteles en ${c.city} con spa y vistas a un monumento indicadas por el hotel.`,
    rule: () => 'Criterio: spa indicado por el hotel y vistas indicadas por el hotel.',
    sections: () => [{ h: 'Spa y vistas', p: ['En los hoteles de París los spas suelen estar bajo tierra, así que vistas y spa rara vez coinciden en el mismo espacio.'] }],
    faq: () => [],
  },
}

const DE: Record<string, Copy> = {
  luxury: {
    lede: (c) => `${c.n} Fünf-Sterne-Hotels in ${c.city}, bei denen das Hotel selbst einen Blick auf ein Wahrzeichen angibt.`,
    rule: () => 'Regel: offizielle 5-Sterne-Einstufung und eine vom Hotel angegebene Aussicht.',
    sections: () => [{ h: 'Was ein Palastblick wirklich bietet', p: ['Auf diesem Niveau steht die Aussicht oft im Namen einer Suite oder einer bestimmten Zimmerkategorie, manchmal mit Terrasse. Hier ist auch der Abstand zwischen dem günstigsten Zimmer und dem Zimmer mit Blick am größten: Vergleiche beide Kategorien vor der Buchung.', 'Fünf-Sterne-Häuser reservieren den Blick außerdem gern für ihr Restaurant oder ihre Dachbar. Nennt die Zimmerkategorie ihn nicht, ist die Aussicht vielleicht unten und nicht in deinem Zimmer.'] }],
    faq: () => [{ q: 'Haben in einem Luxushotel mit Aussicht alle Zimmer den Blick?', a: 'Nein. Auch in Palasthotels ist der Blick meist auf bestimmte Kategorien beschränkt. Prüfe den Zimmernamen, den wir unter jedem Hotel zitieren.' }],
  },
  budget: {
    lede: (c) => `${c.n} Hotels in ${c.city}, in denen ein Zimmer mit Blick am ${c.date} höchstens ${c.max} für zwei Personen kostete.`,
    rule: (c) => `Regel: günstigstes Zimmer mit Blick zu höchstens ${c.max} für eine Nacht mit zwei Erwachsenen, in der Nacht unserer Preiserhebung. Wurde kein Zimmer mit Blick bepreist, zählt das günstigste Zimmer des Hotels.`,
    sections: () => [{ h: 'Wo die günstigeren Aussichten sind', p: ['Der Trick ist die Entfernung. Hotels auf dem Hügel von Montmartre sehen den Eiffelturm über die ganze Stadt hinweg, für einen Bruchteil dessen, was ein Zimmer direkt am Turm kostet. Im Quartier Latin gibt es kleine, alte Hotels gegenüber von Notre-Dame und der Seine.', 'Günstige Zimmer mit Blick sind oft klein und liegen weit oben, manchmal unter dem Dach. Genau deshalb haben sie die Aussicht.'] }],
    faq: (c) => [{ q: 'Ist der angezeigte Preis garantiert?', a: `Nein. Es ist der Preis, den wir für eine Nacht am ${c.date} erhoben haben. Preise ändern sich täglich, prüfe deine eigenen Daten.` }],
  },
  family: {
    lede: (c) => `${c.n} Hotels in ${c.city} mit Familienzimmern und einer vom Hotel angegebenen Aussicht.`,
    rule: () => 'Regel: Familienzimmer in der Ausstattung des Hotels und eine vom Hotel angegebene Aussicht.',
    sections: () => [{ h: 'Familien und Aussicht', p: ['Das Familienzimmer ist nicht immer das Zimmer mit Blick. Hotels führen Familienzimmer als Ausstattung und Aussichten als Zimmerkategorien: Prüfe, ob die gebuchte Kategorie beides nennt, oder frag vor der Zahlung beim Hotel nach.', 'Zimmer für drei oder vier Personen sind in alten Pariser Häusern selten. Buche früh, wenn du eines mit Aussicht brauchst.'] }],
    faq: () => [{ q: 'Hat das Familienzimmer die Aussicht?', a: 'Nicht unbedingt. Wir führen Hotels mit Familienzimmern und Aussicht; ob ein Zimmer beides hat, hängt vom Kategorienamen ab.' }],
  },
  balcony: {
    lede: (c) => `${c.n} Hotels in ${c.city}, bei denen eine Zimmerkategorie Balkon und Blick auf ein Wahrzeichen verbindet.`,
    rule: () => 'Regel: eine Zimmerkategorie, die Balkon und Aussicht nennt, oder eine Hotelbeschreibung, laut der die Balkone den Blick haben.',
    sections: () => [{ h: 'Balkon und Aussicht sind zwei Dinge', p: ['Heißt ein Zimmer „mit Balkon und Eiffelturmblick“, bekommst du beides, aber das Angebot sagt selten, dass der Balkon zum Turm zeigt. Wir führen die Ausrichtung des Balkons als „keine Angabe“, solange das Hotel es nicht sagt.', 'In Haussmann-Bauten liegen die durchgehenden Balkone meist im 2. und 5. Stock.'] }],
    faq: () => [{ q: 'Sehe ich das Wahrzeichen vom Balkon aus?', a: 'Nur wenn das Hotel sagt, dass die Balkone den Blick haben. Sonst hat das Zimmer Balkon und Aussicht, der Balkon kann aber in eine andere Richtung zeigen.' }],
  },
  pets: {
    lede: (c) => `${c.n} Hotels in ${c.city}, die Haustiere erlauben und eine Aussicht auf ein Wahrzeichen angeben.`,
    rule: () => 'Regel: „Haustiere erlaubt“ vom Hotel angegeben und eine vom Hotel angegebene Aussicht.',
    sections: () => [{ h: 'Unterwegs mit Hund', p: ['Haustierregeln ändern sich und kommen oft mit Aufpreis oder Größenbeschränkung. Kläre das vor der Buchung mit dem Hotel, besonders bei großen Hunden.'] }],
    faq: () => [{ q: 'Kostet der Hund extra?', a: 'Oft ja. Das Angebot sagt, dass Haustiere erlaubt sind, nicht, was es kostet. Frag beim Hotel nach.' }],
  },
  'air-conditioning': {
    lede: (c) => `${c.n} Hotels in ${c.city} mit Klimaanlage und einer vom Hotel angegebenen Aussicht.`,
    rule: () => 'Regel: Klimaanlage vom Hotel angegeben und eine vom Hotel angegebene Aussicht.',
    sections: () => [{ h: 'Warum das im Sommer zählt', p: ['Viele Pariser Hotels liegen in alten Häusern ohne Klimaanlage, und die Zimmer ganz oben, also die mit Aussicht, werden am heißesten. Im Juli und August lohnt es sich, darauf zu achten.'] }],
    faq: () => [{ q: 'Gibt es in jedem Zimmer eine Klimaanlage?', a: 'Das Angebot sagt, dass das Hotel eine hat, nicht immer, dass sie in jedem Zimmer ist. Prüfe die Zimmerbeschreibung.' }],
  },
  spa: {
    lede: (c) => `${c.n} Hotels in ${c.city} mit Spa und einer vom Hotel angegebenen Aussicht.`,
    rule: () => 'Regel: ein Spa vom Hotel angegeben und eine vom Hotel angegebene Aussicht.',
    sections: () => [{ h: 'Spa und Aussicht', p: ['In Pariser Hotels liegen Spas meist im Untergeschoss, Aussicht und Spa fallen also selten im selben Raum zusammen.'] }],
    faq: () => [],
  },
}

export const categoryCopy = (l: Locale, id: string) => ({ en: EN, es: ES, de: DE })[l][id]
