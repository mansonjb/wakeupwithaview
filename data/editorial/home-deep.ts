import type { Locale } from '@/lib/i18n'
import type { globalStats } from '@/lib/stats'
import type { QA } from './types'

// Home page depth: data strip, "proximity is not a view", listing vocabulary decoded, the 6-step
// method and FAQ. Numbers come from globalStats(); nothing here is typed by hand.
type G = ReturnType<typeof globalStats>
export type Term = { term: string; means: string; level: 'strong' | 'medium' | 'weak' | 'none' }
export type HomeDeep = {
  stats: { n: string; label: string }[]
  statsNote: string
  proxTitle: string
  proxBig: string
  proxText: string
  termsTitle: string
  termsLede: string
  levels: Record<Term['level'], string>
  terms: Term[]
  stepsTitle: string
  steps: { t: string; d: string }[]
  featuredTitle: string
  featuredLede: string
  faqTitle: string
  faq: QA[]
}

const en = (g: G, date: string): HomeDeep => ({
  stats: [
    { n: String(g.scanned), label: 'Paris hotel listings read, room by room' },
    { n: String(g.withView), label: 'hotels where the hotel itself states a landmark view' },
    { n: String(g.roomLevel), label: 'name the view in a room category you can book' },
    ...(g.premiumMedian != null ? [{ n: `+${g.premiumMedian}%`, label: `median extra for the view room, same hotel, same night (${g.premiumN} rooms)` }] : []),
  ],
  statsNote: `Data collected on ${date}. Every figure on this site is recalculated when the data is refreshed.`,
  proxTitle: 'Close is not the same as with a view',
  proxBig: `${g.proximity.pct}%`,
  proxText: `Of the ${g.proximity.near} cases where a hotel stands less than 1 km from a landmark we cover, only ${g.proximity.seen} state a view of it. ${g.eiffelProximity ? `Around the Eiffel Tower, ${g.eiffelProximity.seen} of the ${g.eiffelProximity.near} hotels within 1 km do.` : ''} This is why we never infer a view from a distance, and why a map of “hotels near” is not a list of hotels with a view.`,
  termsTitle: 'What hotel listings really mean',
  termsLede: 'The words in a room name decide what you are paying for. Here is how we read them.',
  levels: { strong: 'Strong', medium: 'Medium', weak: 'Weak', none: 'Not a view' },
  terms: [
    { term: '“Deluxe Room with Eiffel Tower View”', means: 'The view is named in the room category. It is part of the product you book.', level: 'strong' },
    { term: '“High floor” in the room name', means: 'Usually needed for close views: low floors near a landmark often see the base, not the top.', level: 'strong' },
    { term: '“Partial view” / “view of X or Y”', means: 'You will see part of it, or one of two landmarks. Real, but set your expectations.', level: 'medium' },
    { term: '“Some rooms offer views of…”', means: 'A true statement from the hotel, not tied to your room. Book the best category and ask in writing.', level: 'medium' },
    { term: '“Rooftop / terrace with views”', means: 'The view is from a shared space. Your room may face a courtyard.', level: 'medium' },
    { term: '“City view” / “Landmark view”', means: 'A view over streets or roofs. Which landmark, if any, is not said.', level: 'weak' },
    { term: '“Steps from” / “near” / “minutes from”', means: 'Location only. It says nothing about what you see from the window.', level: 'none' },
  ],
  stepsTitle: 'How to actually get a room with a view',
  steps: [
    { t: 'Decide: close up or skyline', d: 'Close views fill the window but need height. Distant views, from a hill or across the river, show the whole landmark and often cost less.' },
    { t: 'Book the category that names it', d: 'If the landmark is in the room name, the view is what you pay for. A hotel-wide promise is not.' },
    { t: 'Read the exact wording', d: '“Partial”, “or”, “some rooms” and “city view” all lower what you can expect. We show the original wording under every hotel.' },
    { t: 'Ask for a high floor, in writing', d: 'Hotels rarely guarantee a room number, but they note preferences. A written request after booking is the one that gets read.' },
    { t: 'Don’t trust the photo alone', d: 'A listing photo of the landmark can be taken from the roof or the best suite. It illustrates, it does not prove.' },
    { t: 'Pick the season for night views', d: 'In Paris the Eiffel Tower sparkles after dusk, so winter evenings give you more of it than June nights.' },
  ],
  featuredTitle: 'Views named in the room itself',
  featuredLede: 'Hotels where the landmark appears in a room category, the strongest evidence we list.',
  faqTitle: 'Questions about rooms with a view',
  faq: [
    { q: 'What does “room with a view” mean on a hotel booking?', a: 'It depends on the wording. A room category that names the landmark is a commitment from the hotel. “City view” or “some rooms offer views” are much looser. We show the exact wording for every hotel.' },
    { q: 'Can a hotel guarantee a room with a view?', a: 'Only through the room category. If you book a category with the view in its name, the view is part of what you pay for. Hotels rarely guarantee a specific room number, but they note written preferences such as a high floor.' },
    { q: 'Is a room with a view worth the extra cost?', a: g.premiumMedian != null ? `On our data, the cheapest room with the view cost a median ${g.premiumMedian}% more than the same hotel’s cheapest room on the same night, across ${g.premiumN} rooms we could price. Whether that is worth it depends on how much time you plan to spend in the room.` : 'Compare the view category with the standard room for your dates.' },
    { q: 'Does a hotel close to a landmark have a view of it?', a: `Usually not. Of the ${g.proximity.near} cases where a hotel is within 1 km of a landmark we cover, only ${g.proximity.seen} (${g.proximity.pct}%) state a view of it.` },
    { q: 'Where does your information come from?', a: 'From the public booking listings of each hotel: room names and the hotel’s own description, stored with the date they were collected.' },
    { q: 'Which cities are next?', a: 'Paris is live. London, Rome and New York are next, and each city goes live only once its views are checked.' },
  ],
})

const es = (g: G, date: string): HomeDeep => ({
  stats: [
    { n: String(g.scanned), label: 'fichas de hoteles de París leídas, habitación por habitación' },
    { n: String(g.withView), label: 'hoteles en los que el propio hotel indica vistas a un monumento' },
    { n: String(g.roomLevel), label: 'lo indican en un tipo de habitación que se puede reservar' },
    ...(g.premiumMedian != null ? [{ n: `+${g.premiumMedian} %`, label: `sobreprecio mediano de la habitación con vistas, mismo hotel y misma noche (${g.premiumN} habitaciones)` }] : []),
  ],
  statsNote: `Datos recogidos el ${date}. Todas las cifras de la web se recalculan cuando se actualizan los datos.`,
  proxTitle: 'Estar cerca no es lo mismo que tener vistas',
  proxBig: `${g.proximity.pct} %`,
  proxText: `De los ${g.proximity.near} casos en los que un hotel está a menos de 1 km de uno de nuestros monumentos, solo ${g.proximity.seen} indican vistas a él. ${g.eiffelProximity ? `Alrededor de la Torre Eiffel, lo hacen ${g.eiffelProximity.seen} de los ${g.eiffelProximity.near} hoteles a menos de 1 km.` : ''} Por eso nunca deducimos unas vistas a partir de la distancia, y por eso un mapa de «hoteles cerca» no es una lista de hoteles con vistas.`,
  termsTitle: 'Qué significan de verdad las fichas de hotel',
  termsLede: 'Las palabras del nombre de la habitación deciden lo que pagas. Así las leemos.',
  levels: { strong: 'Sólida', medium: 'Media', weak: 'Débil', none: 'No es una vista' },
  terms: [
    { term: '«Habitación Deluxe con vistas a la Torre Eiffel»', means: 'Las vistas figuran en el tipo de habitación. Forman parte de lo que reservas.', level: 'strong' },
    { term: '«Planta alta» en el nombre', means: 'Suele ser necesaria para las vistas cercanas: desde las plantas bajas junto a un monumento se ve la base, no la punta.', level: 'strong' },
    { term: '«Vista parcial» / «vistas a X o Y»', means: 'Verás una parte, o uno de los dos monumentos. Es real, pero ajusta tus expectativas.', level: 'medium' },
    { term: '«Algunas habitaciones tienen vistas a…»', means: 'Una afirmación real del hotel, pero no ligada a tu habitación. Reserva la mejor categoría y pídelo por escrito.', level: 'medium' },
    { term: '«Azotea / terraza con vistas»', means: 'La vista es desde un espacio común. Tu habitación puede dar a un patio.', level: 'medium' },
    { term: '«Vistas a la ciudad» / «vistas a un monumento»', means: 'Vistas a calles o tejados. No se dice a qué monumento, si lo hay.', level: 'weak' },
    { term: '«A pasos de» / «cerca de» / «a X minutos»', means: 'Solo ubicación. No dice nada de lo que ves por la ventana.', level: 'none' },
  ],
  stepsTitle: 'Cómo conseguir de verdad una habitación con vistas',
  steps: [
    { t: 'Decide: de cerca o panorámica', d: 'Las vistas cercanas llenan la ventana pero exigen altura. Las lejanas, desde una colina o al otro lado del río, muestran el monumento entero y suelen costar menos.' },
    { t: 'Reserva la categoría que las nombra', d: 'Si el monumento está en el nombre de la habitación, las vistas son lo que pagas. Una promesa general del hotel no lo es.' },
    { t: 'Lee la formulación exacta', d: '«Parcial», «o», «algunas habitaciones» y «vistas a la ciudad» rebajan lo que puedes esperar. Mostramos el texto original bajo cada hotel.' },
    { t: 'Pide una planta alta, por escrito', d: 'Los hoteles casi nunca garantizan un número de habitación, pero anotan las preferencias. La petición escrita tras reservar es la que se lee.' },
    { t: 'No te fíes solo de la foto', d: 'Una foto del monumento en la ficha puede estar tomada desde la azotea o desde la mejor suite. Ilustra, no demuestra.' },
    { t: 'Elige la estación para la vista nocturna', d: 'En París la Torre Eiffel centellea al anochecer, así que las tardes de invierno te dan más que las noches de junio.' },
  ],
  featuredTitle: 'Vistas indicadas en la propia habitación',
  featuredLede: 'Hoteles en los que el monumento aparece en un tipo de habitación, la prueba más sólida que mostramos.',
  faqTitle: 'Preguntas sobre habitaciones con vistas',
  faq: [
    { q: '¿Qué significa «habitación con vistas» en una reserva de hotel?', a: 'Depende de cómo esté escrito. Un tipo de habitación que nombra el monumento es un compromiso del hotel. «Vistas a la ciudad» o «algunas habitaciones tienen vistas» son mucho más vagos. Mostramos el texto exacto de cada hotel.' },
    { q: '¿Puede un hotel garantizar una habitación con vistas?', a: 'Solo a través del tipo de habitación. Si reservas una categoría con las vistas en el nombre, las vistas forman parte de lo que pagas. Los hoteles casi nunca garantizan un número de habitación, pero anotan preferencias por escrito como una planta alta.' },
    { q: '¿Merece la pena pagar más por una habitación con vistas?', a: g.premiumMedian != null ? `Según nuestros datos, la habitación con vistas más barata costaba una mediana de un ${g.premiumMedian} % más que la habitación más barata del mismo hotel la misma noche, en ${g.premiumN} habitaciones con precio. Que compense depende del tiempo que vayas a pasar en la habitación.` : 'Compara la categoría con vistas con la habitación estándar para tus fechas.' },
    { q: '¿Un hotel cerca de un monumento tiene vistas a él?', a: `Normalmente no. De los ${g.proximity.near} casos en los que un hotel está a menos de 1 km de uno de nuestros monumentos, solo ${g.proximity.seen} (${g.proximity.pct} %) indican vistas a él.` },
    { q: '¿De dónde sale vuestra información?', a: 'De las fichas públicas de reserva de cada hotel: los nombres de las habitaciones y la descripción del propio hotel, guardados con su fecha de recogida.' },
    { q: '¿Qué ciudades vienen después?', a: 'París ya está disponible. Después llegarán Londres, Roma y Nueva York, y cada ciudad se publica solo cuando sus vistas están verificadas.' },
  ],
})

const de = (g: G, date: string): HomeDeep => ({
  stats: [
    { n: String(g.scanned), label: 'Pariser Hotelangebote gelesen, Zimmer für Zimmer' },
    { n: String(g.withView), label: 'Hotels, die selbst einen Blick auf ein Wahrzeichen angeben' },
    { n: String(g.roomLevel), label: 'nennen ihn in einer buchbaren Zimmerkategorie' },
    ...(g.premiumMedian != null ? [{ n: `+${g.premiumMedian} %`, label: `Median-Aufpreis für das Zimmer mit Blick, gleiches Hotel, gleiche Nacht (${g.premiumN} Zimmer)` }] : []),
  ],
  statsNote: `Daten erhoben am ${date}. Alle Zahlen auf dieser Seite werden bei jeder Aktualisierung neu berechnet.`,
  proxTitle: 'Nah dran heißt nicht mit Aussicht',
  proxBig: `${g.proximity.pct} %`,
  proxText: `In ${g.proximity.near} Fällen liegt ein Hotel weniger als 1 km von einem unserer Wahrzeichen entfernt, doch nur ${g.proximity.seen} davon geben einen Blick darauf an. ${g.eiffelProximity ? `Rund um den Eiffelturm tun das ${g.eiffelProximity.seen} der ${g.eiffelProximity.near} Hotels im Umkreis von 1 km.` : ''} Deshalb leiten wir nie eine Aussicht aus der Entfernung ab, und deshalb ist eine Karte mit „Hotels in der Nähe“ keine Liste von Hotels mit Aussicht.`,
  termsTitle: 'Was Hotelangebote wirklich bedeuten',
  termsLede: 'Die Wörter im Zimmernamen entscheiden, wofür du bezahlst. So lesen wir sie.',
  levels: { strong: 'Stark', medium: 'Mittel', weak: 'Schwach', none: 'Keine Aussicht' },
  terms: [
    { term: '„Deluxe-Zimmer mit Eiffelturmblick“', means: 'Der Blick steht in der Zimmerkategorie. Er gehört zu dem, was du buchst.', level: 'strong' },
    { term: '„Obere Etage“ im Zimmernamen', means: 'Für nahe Blicke meist nötig: Aus unteren Etagen nahe einem Wahrzeichen sieht man den Sockel, nicht die Spitze.', level: 'strong' },
    { term: '„Teilblick“ / „Blick auf X oder Y“', means: 'Du siehst einen Teil oder eines von zwei Wahrzeichen. Echt, aber pass deine Erwartungen an.', level: 'medium' },
    { term: '„Einige Zimmer bieten Blick auf…“', means: 'Eine echte Aussage des Hotels, aber nicht an dein Zimmer gebunden. Buche die beste Kategorie und frag schriftlich nach.', level: 'medium' },
    { term: '„Dachterrasse / Terrasse mit Aussicht“', means: 'Der Blick kommt aus einem Gemeinschaftsbereich. Dein Zimmer kann zum Hof zeigen.', level: 'medium' },
    { term: '„Stadtblick“ / „Blick auf Sehenswürdigkeit“', means: 'Blick über Straßen oder Dächer. Welches Wahrzeichen, falls überhaupt, wird nicht gesagt.', level: 'weak' },
    { term: '„Wenige Schritte“ / „nahe“ / „X Minuten entfernt“', means: 'Nur die Lage. Über den Blick aus dem Fenster sagt das nichts.', level: 'none' },
  ],
  stepsTitle: 'So bekommst du wirklich ein Zimmer mit Aussicht',
  steps: [
    { t: 'Entscheide: nah oder Panorama', d: 'Nahe Blicke füllen das Fenster, brauchen aber Höhe. Ferne Blicke, von einem Hügel oder über den Fluss, zeigen das ganze Wahrzeichen und kosten oft weniger.' },
    { t: 'Buche die Kategorie, die ihn nennt', d: 'Steht das Wahrzeichen im Zimmernamen, bezahlst du für den Blick. Ein allgemeines Versprechen des Hotels ist das nicht.' },
    { t: 'Lies den genauen Wortlaut', d: '„Teilblick“, „oder“, „einige Zimmer“ und „Stadtblick“ senken, was du erwarten kannst. Wir zeigen den Originalwortlaut unter jedem Hotel.' },
    { t: 'Bitte schriftlich um eine obere Etage', d: 'Hotels garantieren selten eine Zimmernummer, notieren aber Wünsche. Eine schriftliche Bitte nach der Buchung ist die, die gelesen wird.' },
    { t: 'Trau nicht nur dem Foto', d: 'Ein Foto des Wahrzeichens im Angebot kann vom Dach oder aus der besten Suite stammen. Es illustriert, es beweist nichts.' },
    { t: 'Wähle die Jahreszeit für den Nachtblick', d: 'In Paris glitzert der Eiffelturm nach Einbruch der Dunkelheit, Winterabende bieten also mehr davon als Juninächte.' },
  ],
  featuredTitle: 'Aussicht im Zimmernamen selbst',
  featuredLede: 'Hotels, bei denen das Wahrzeichen in einer Zimmerkategorie steht, der stärkste Beleg, den wir führen.',
  faqTitle: 'Fragen zu Zimmern mit Aussicht',
  faq: [
    { q: 'Was bedeutet „Zimmer mit Aussicht“ bei einer Hotelbuchung?', a: 'Das hängt vom Wortlaut ab. Eine Zimmerkategorie, die das Wahrzeichen nennt, ist eine Zusage des Hotels. „Stadtblick“ oder „einige Zimmer bieten Aussicht“ sind viel vager. Wir zeigen für jedes Hotel den genauen Wortlaut.' },
    { q: 'Kann ein Hotel ein Zimmer mit Aussicht garantieren?', a: 'Nur über die Zimmerkategorie. Buchst du eine Kategorie mit dem Blick im Namen, gehört er zu dem, was du bezahlst. Hotels garantieren selten eine bestimmte Zimmernummer, notieren aber schriftliche Wünsche wie eine obere Etage.' },
    { q: 'Lohnt sich der Aufpreis für ein Zimmer mit Aussicht?', a: g.premiumMedian != null ? `In unseren Daten kostete das günstigste Zimmer mit Blick im Median ${g.premiumMedian} % mehr als das günstigste Zimmer desselben Hotels in derselben Nacht, bei ${g.premiumN} Zimmern mit Preis. Ob sich das lohnt, hängt davon ab, wie viel Zeit du im Zimmer verbringst.` : 'Vergleiche für deine Reisedaten die Kategorie mit Blick mit dem Standardzimmer.' },
    { q: 'Hat ein Hotel nahe einem Wahrzeichen Blick darauf?', a: `Meistens nicht. In ${g.proximity.near} Fällen liegt ein Hotel weniger als 1 km von einem unserer Wahrzeichen entfernt, nur ${g.proximity.seen} davon (${g.proximity.pct} %) geben einen Blick darauf an.` },
    { q: 'Woher stammen eure Informationen?', a: 'Aus den öffentlichen Buchungsangeboten der Hotels: Zimmernamen und die Beschreibung des Hotels selbst, gespeichert mit dem Erhebungsdatum.' },
    { q: 'Welche Städte kommen als Nächstes?', a: 'Paris ist online. Als Nächstes folgen London, Rom und New York, jede Stadt erst, wenn ihre Aussichten geprüft sind.' },
  ],
})

export const homeDeep = (l: Locale, g: G, date: string) => ({ en, es, de })[l](g, date)
