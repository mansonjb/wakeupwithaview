import type { L, Locale } from '@/lib/i18n'

// "Most beautiful monuments" guide, one per city. Every fact is sourced in data/SOURCES.md
// (section "Monuments guide"). Hotel lists and counts are computed from our data at build time.
// Prices are left to the official sites on purpose: they change, and we link the source instead.

export type MonumentEntry = {
  poi: string
  /** official website, linked as the source for opening days and tickets */
  official: string
  what: string
  look: string
  tip: string
}

export type MonumentsGuide = {
  id: string
  city: string
  slug: L
  updated: string
  copy: Record<Locale, {
    title: string
    h1: string
    meta: string
    lede: string
    ui: { look: string; tip: string; official: string; viewHotels: string; nearHotels: string; bookNear: string; allView: string; allNear: string; noView: string; toc: string }
    monuments: MonumentEntry[]
  }>
}

const OFF = {
  'eiffel-tower': 'https://www.toureiffel.paris/en',
  'notre-dame': 'https://www.notredamedeparis.fr/en/',
  'sacre-coeur': 'https://www.sacre-coeur-montmartre.com/english/',
  'arc-de-triomphe': 'https://www.paris-arc-de-triomphe.fr/en',
  louvre: 'https://www.louvre.fr/en',
  'musee-d-orsay': 'https://www.musee-orsay.fr/en',
  invalides: 'https://www.musee-armee.fr/en/',
  pantheon: 'https://www.paris-pantheon.fr/en',
  'opera-garnier': 'https://www.operadeparis.fr/en/visits/palais-garnier',
}
const m = (poi: keyof typeof OFF, what: string, look: string, tip: string): MonumentEntry => ({ poi, official: OFF[poi], what, look, tip })

export const PARIS_MONUMENTS: MonumentsGuide = {
  id: 'paris-monuments',
  city: 'paris',
  updated: '2026-09-24',
  slug: { en: 'most-beautiful-monuments-in-paris', es: 'monumentos-mas-bonitos-de-paris', de: 'schoenste-sehenswuerdigkeiten-paris' },
  copy: {
    en: {
      title: 'The 9 most beautiful monuments in Paris, and where to sleep near each one',
      h1: 'The most beautiful monuments in Paris, and where to sleep near them',
      meta: 'Eiffel Tower, Notre-Dame, Sacré-Cœur, the Louvre and 5 more: what each one is, the best spot to look at it, and the hotels with a view of it or a short walk away.',
      lede: 'Nine monuments, each with the spot where it looks best and the hotels we found with a view of it or within a kilometre. Hotel counts and prices come from listings we checked ourselves.',
      ui: { look: 'Best spot to see it', tip: 'Good to know', official: 'Official site', viewHotels: 'Hotels with a view of it', nearHotels: 'Hotels a short walk away', bookNear: 'See all rooms near', allView: 'All hotels with a view of', allNear: 'All hotels near', noView: 'We have not found a room with a confirmed view of it yet, so these are the closest rated hotels.', toc: 'The monuments' },
      monuments: [
        m('eiffel-tower', 'Built by Gustave Eiffel’s company for the 1889 World’s Fair and finished on 31 March 1889, it was the tallest structure in the world until 1930. It stands 330 m high today.', 'The Trocadéro esplanade, across the Seine, frames the whole tower above the river. The Champ-de-Mars lawns give the view from below.', 'Every evening after dark the tower sparkles for five minutes at the start of each hour.'),
        m('notre-dame', 'Construction began in 1163. The cathedral burned on 15 April 2019 and reopened on 7 December 2024 after five years of restoration.', 'The Square Jean-XXIII and the Pont de l’Archevêché, behind the apse, show the flying buttresses and the rebuilt spire.', 'Entry to the cathedral is free. The towers are a separate paid visit.'),
        m('sacre-coeur', 'The basilica sits at the top of the Butte Montmartre. It was built from 1875 to 1914 and consecrated in 1919.', 'From the foot of the Square Louise-Michel, the white domes rise above the gardens and the staircases.', 'The basilica is free. Climbing the dome costs a ticket and adds about 300 steps.'),
        m('arc-de-triomphe', 'Napoleon ordered it in 1806 after the battle of Austerlitz; it was inaugurated in 1836. The Tomb of the Unknown Soldier lies beneath it.', 'Look up the Champs-Élysées from the Place de la Concorde: the arch closes the avenue, about 2 km away.', 'The flame over the Tomb of the Unknown Soldier is rekindled every evening at 6.30 pm.'),
        m('louvre', 'A royal palace turned museum in 1793, it is the most visited museum in the world. The glass pyramid by I. M. Pei opened in 1989.', 'The Cour Napoléon at night, when the pyramid is lit from inside.', 'The museum is closed on Tuesdays. Book a timed ticket on the official site.'),
        m('musee-d-orsay', 'Built as a railway station for the 1900 World’s Fair, it opened as a museum in 1986 and holds the largest collection of Impressionist paintings.', 'From inside: the giant clock window on the top floor looks across the Seine towards Montmartre.', 'The museum is closed on Mondays.'),
        m('invalides', 'Louis XIV founded it in 1670 as a home for wounded soldiers. Napoleon’s tomb lies under the golden dome.', 'The Pont Alexandre-III lines up the esplanade and the gilded dome in one frame.', 'The dome and Napoleon’s tomb are part of the Army Museum visit.'),
        m('pantheon', 'Designed by Soufflot and completed in 1790, it is the resting place of figures such as Voltaire, Victor Hugo and Marie Curie. Foucault showed the Earth’s rotation there with his pendulum in 1851.', 'Walk up the Rue Soufflot from the Luxembourg Gardens: the dome fills the end of the street.', 'In season, a visit to the colonnade gives a view over the Latin Quarter.'),
        m('opera-garnier', 'Charles Garnier’s opera house was inaugurated in 1875. The ceiling of the auditorium was painted by Marc Chagall in 1964.', 'The Place de l’Opéra, at the top of the Avenue de l’Opéra, shows the whole gilded façade.', 'The building can be visited during the day outside performances.'),
      ],
    },
    es: {
      title: 'Los 9 monumentos más bonitos de París y dónde dormir cerca de cada uno',
      h1: 'Los monumentos más bonitos de París y dónde dormir cerca',
      meta: 'Torre Eiffel, Notre Dame, Sacré-Cœur, el Louvre y 5 más: qué es cada uno, el mejor sitio para verlo y los hoteles con vistas a él o a pocos pasos.',
      lede: 'Nueve monumentos, cada uno con el lugar desde el que mejor se ve y los hoteles que hemos encontrado con vistas a él o a menos de un kilómetro. Los recuentos y precios salen de fichas que hemos revisado nosotros.',
      ui: { look: 'Dónde verlo mejor', tip: 'Conviene saber', official: 'Web oficial', viewHotels: 'Hoteles con vistas', nearHotels: 'Hoteles a pocos pasos', bookNear: 'Ver todas las habitaciones cerca de', allView: 'Todos los hoteles con vistas a', allNear: 'Todos los hoteles cerca de', noView: 'Todavía no hemos encontrado una habitación con vistas confirmadas, así que estos son los hoteles valorados más cercanos.', toc: 'Los monumentos' },
      monuments: [
        m('eiffel-tower', 'La construyó la empresa de Gustave Eiffel para la Exposición Universal de 1889 y se terminó el 31 de marzo de 1889. Fue la estructura más alta del mundo hasta 1930 y hoy mide 330 m.', 'La explanada del Trocadéro, al otro lado del Sena, enmarca la torre entera sobre el río. El Campo de Marte ofrece la vista desde abajo.', 'Cada noche, cuando oscurece, la torre centellea cinco minutos al comienzo de cada hora.'),
        m('notre-dame', 'Su construcción empezó en 1163. La catedral ardió el 15 de abril de 2019 y reabrió el 7 de diciembre de 2024 tras cinco años de restauración.', 'El Square Jean-XXIII y el Pont de l’Archevêché, detrás del ábside, muestran los arbotantes y la aguja reconstruida.', 'La entrada a la catedral es gratuita. Las torres son una visita aparte, de pago.'),
        m('sacre-coeur', 'La basílica corona la colina de Montmartre. Se construyó entre 1875 y 1914 y se consagró en 1919.', 'Desde el pie del Square Louise-Michel, las cúpulas blancas se alzan sobre los jardines y las escalinatas.', 'La basílica es gratuita. Subir a la cúpula requiere entrada y unos 300 escalones.'),
        m('arc-de-triomphe', 'Napoleón lo encargó en 1806 tras la batalla de Austerlitz y se inauguró en 1836. Bajo él está la Tumba del Soldado Desconocido.', 'Mira hacia los Campos Elíseos desde la Plaza de la Concordia: el arco cierra la avenida, a unos 2 km.', 'La llama de la Tumba del Soldado Desconocido se reaviva cada tarde a las 18.30.'),
        m('louvre', 'Palacio real convertido en museo en 1793, es el museo más visitado del mundo. La pirámide de cristal de I. M. Pei se inauguró en 1989.', 'La Cour Napoléon de noche, cuando la pirámide se ilumina por dentro.', 'El museo cierra los martes. Reserva una entrada con hora en la web oficial.'),
        m('musee-d-orsay', 'Construido como estación de tren para la Exposición Universal de 1900, abrió como museo en 1986 y reúne la mayor colección de pintura impresionista.', 'Desde dentro: el gran reloj de la última planta mira al Sena y a Montmartre.', 'El museo cierra los lunes.'),
        m('invalides', 'Luis XIV lo fundó en 1670 para acoger a soldados heridos. La tumba de Napoleón está bajo la cúpula dorada.', 'El puente Alejandro III alinea la explanada y la cúpula dorada en un solo encuadre.', 'La cúpula y la tumba de Napoleón forman parte de la visita al Museo del Ejército.'),
        m('pantheon', 'Diseñado por Soufflot y terminado en 1790, acoge a figuras como Voltaire, Victor Hugo y Marie Curie. Foucault demostró allí la rotación de la Tierra con su péndulo en 1851.', 'Sube la Rue Soufflot desde el Jardín de Luxemburgo: la cúpula llena el final de la calle.', 'En temporada, la visita a la columnata ofrece vistas sobre el Barrio Latino.'),
        m('opera-garnier', 'La ópera de Charles Garnier se inauguró en 1875. El techo de la sala lo pintó Marc Chagall en 1964.', 'La Place de l’Opéra, al final de la Avenue de l’Opéra, muestra toda la fachada dorada.', 'El edificio se puede visitar de día fuera de las funciones.'),
      ],
    },
    de: {
      title: 'Die 9 schönsten Sehenswürdigkeiten in Paris und wo man nahe jeder übernachtet',
      h1: 'Die schönsten Sehenswürdigkeiten in Paris und Hotels in ihrer Nähe',
      meta: 'Eiffelturm, Notre-Dame, Sacré-Cœur, Louvre und 5 weitere: was sie sind, wo man sie am besten sieht und welche Hotels Blick darauf haben oder nur ein paar Schritte entfernt liegen.',
      lede: 'Neun Sehenswürdigkeiten, jeweils mit dem Ort, von dem sie am schönsten wirken, und den Hotels, die wir mit Blick darauf oder in weniger als einem Kilometer gefunden haben. Anzahl und Preise stammen aus Angeboten, die wir selbst geprüft haben.',
      ui: { look: 'Wo man sie am besten sieht', tip: 'Gut zu wissen', official: 'Offizielle Website', viewHotels: 'Hotels mit Blick darauf', nearHotels: 'Hotels in Gehweite', bookNear: 'Alle Zimmer in der Nähe von', allView: 'Alle Hotels mit Blick auf', allNear: 'Alle Hotels nahe', noView: 'Wir haben noch kein Zimmer mit bestätigtem Blick darauf gefunden, deshalb hier die nächstgelegenen bewerteten Hotels.', toc: 'Die Sehenswürdigkeiten' },
      monuments: [
        m('eiffel-tower', 'Die Firma von Gustave Eiffel baute ihn für die Weltausstellung 1889, fertig war er am 31. März 1889. Bis 1930 war er das höchste Bauwerk der Welt, heute misst er 330 m.', 'Die Esplanade des Trocadéro auf der anderen Seine-Seite rahmt den ganzen Turm über dem Fluss. Das Marsfeld zeigt ihn von unten.', 'Jeden Abend nach Einbruch der Dunkelheit funkelt der Turm zu jeder vollen Stunde fünf Minuten lang.'),
        m('notre-dame', 'Der Bau begann 1163. Die Kathedrale brannte am 15. April 2019 und öffnete nach fünf Jahren Restaurierung am 7. Dezember 2024 wieder.', 'Der Square Jean-XXIII und der Pont de l’Archevêché hinter dem Chor zeigen die Strebebögen und den neu errichteten Spitzturm.', 'Der Eintritt in die Kathedrale ist frei. Die Türme sind ein eigener, kostenpflichtiger Besuch.'),
        m('sacre-coeur', 'Die Basilika krönt den Hügel von Montmartre. Sie wurde von 1875 bis 1914 gebaut und 1919 geweiht.', 'Vom Fuß des Square Louise-Michel aus erheben sich die weißen Kuppeln über Gärten und Treppen.', 'Die Basilika ist kostenlos. Der Aufstieg auf die Kuppel kostet Eintritt und rund 300 Stufen.'),
        m('arc-de-triomphe', 'Napoleon gab ihn 1806 nach der Schlacht bei Austerlitz in Auftrag, eingeweiht wurde er 1836. Unter ihm liegt das Grab des Unbekannten Soldaten.', 'Blick die Champs-Élysées hinauf von der Place de la Concorde: Der Bogen schließt die Avenue in etwa 2 km Entfernung ab.', 'Die Flamme am Grab des Unbekannten Soldaten wird jeden Abend um 18.30 Uhr neu entzündet.'),
        m('louvre', 'Der Königspalast wurde 1793 zum Museum und ist heute das meistbesuchte Museum der Welt. Die Glaspyramide von I. M. Pei wurde 1989 eröffnet.', 'Die Cour Napoléon bei Nacht, wenn die Pyramide von innen leuchtet.', 'Dienstags ist das Museum geschlossen. Buche ein Zeitfenster-Ticket auf der offiziellen Website.'),
        m('musee-d-orsay', 'Als Bahnhof für die Weltausstellung 1900 gebaut, wurde es 1986 Museum und zeigt die größte Sammlung impressionistischer Malerei.', 'Von innen: Das riesige Uhrenfenster im obersten Stock blickt über die Seine nach Montmartre.', 'Montags ist das Museum geschlossen.'),
        m('invalides', 'Ludwig XIV. gründete es 1670 als Heim für verwundete Soldaten. Napoleons Grab liegt unter der goldenen Kuppel.', 'Der Pont Alexandre-III bringt Esplanade und vergoldete Kuppel in ein Bild.', 'Kuppel und Napoleons Grab gehören zum Besuch des Armeemuseums.'),
        m('pantheon', 'Von Soufflot entworfen und 1790 fertiggestellt, ruhen hier unter anderem Voltaire, Victor Hugo und Marie Curie. Foucault bewies hier 1851 mit seinem Pendel die Erdrotation.', 'Geh vom Jardin du Luxembourg die Rue Soufflot hinauf: Die Kuppel füllt das Ende der Straße.', 'In der Saison bietet die Kolonnade einen Blick über das Quartier Latin.'),
        m('opera-garnier', 'Charles Garniers Opernhaus wurde 1875 eingeweiht. Die Decke des Saals malte Marc Chagall 1964.', 'Die Place de l’Opéra am Ende der Avenue de l’Opéra zeigt die ganze vergoldete Fassade.', 'Das Gebäude kann tagsüber außerhalb der Vorstellungen besichtigt werden.'),
      ],
    },
  } as MonumentsGuide['copy'],
}

export const MONUMENT_GUIDES: MonumentsGuide[] = [PARIS_MONUMENTS]
