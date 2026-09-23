import type { L, Locale } from '@/lib/i18n'
import type { Section, QA } from '@/data/editorial/types'

// Guides section. Each guide is written per language; data-driven parts (vocabulary table, steps,
// proximity stat) are shared with the home page through data/editorial/home-deep.ts.
export type GuideCopy = {
  title: string
  h1: string
  meta: string
  lede: string
  intro: Section[]
  template: { h: string; note: string; body: string }
  outro: Section[]
  faq: QA[]
}

export type Guide = {
  id: string
  slug: L
  updated: string
  /** reading time in minutes, computed from the English text at build time */
  copy: Record<Locale, GuideCopy>
}

const roomWithAView: Guide = {
  id: 'book-a-room-with-a-view',
  updated: '2026-09-23',
  slug: { en: 'how-to-book-a-hotel-room-with-a-view', es: 'como-reservar-una-habitacion-con-vistas', de: 'zimmer-mit-aussicht-buchen' },
  copy: {
    en: {
      title: 'How to book a hotel room with a view (and actually get it)',
      h1: 'How to book a hotel room with a view, and actually get it',
      meta: 'Room categories, listing wording, high floors, the message to send the hotel: a practical method to get the view you pay for, based on real hotel listings.',
      lede: 'Most disappointing “view” stays come from the same mistake: booking the hotel instead of the room. Here is the method we use to read every listing on this site.',
      intro: [
        { h: 'The view is sold by room category', p: ['Hotels sell rooms in categories. When a category is called “Deluxe King Room with Eiffel Tower View”, the view is part of the product. When the view is only mentioned in the hotel description, it is a promise about the building, not about your room.', 'That is the single most useful thing to check before paying, and the reason we separate room-level and hotel-level sources everywhere on this site.'] },
        { h: 'Close is not the same as with a view', p: ['Being next to a landmark is the most common trap. The streets closest to a monument are often too low or too narrow to see it, while a hotel on a hill two or three kilometres away can see all of it. We measured this on Paris listings; the figure is below.'] },
      ],
      template: {
        h: 'The message to send the hotel',
        note: 'Send it by email or through the booking platform’s messaging, after booking. Keep your booking reference in the subject line.',
        body: 'Hello,\n\nI have booked a [room category] from [date] to [date], reference [number].\nWe are coming for the view of [landmark]. Could you please note a preference for a high floor with that view, if one is available on our dates?\n\nI understand room numbers cannot be guaranteed. Thank you for letting me know if that category does not have the view.\n\nBest regards,\n[Name]',
      },
      outro: [
        { h: 'When to book', p: ['View categories are a small share of a hotel’s rooms and they go first. Book them earlier than you would book a standard room, and check the cancellation terms: many flexible rates let you rebook if a better view category opens.'] },
        { h: 'At check-in', p: ['Ask at the desk, politely, whether a room with the view is free on a higher floor. It costs nothing and hotels often have a better room unassigned on the day.'] },
      ],
      faq: [
        { q: 'Can a hotel guarantee me a view?', a: 'Only through the room category. Hotels rarely guarantee a room number, but a category with the view in its name is part of what you pay for.' },
        { q: 'Is it worth booking direct with the hotel?', a: 'It can help for requests, because the hotel sees your preferences directly. Compare the price and cancellation terms first; the category name is what matters most.' },
        { q: 'What if I don’t get the view I booked?', a: 'If the category you booked names the view, ask the front desk to move you. Keep the booking confirmation that shows the category name.' },
      ],
    },
    es: {
      title: 'Cómo reservar una habitación de hotel con vistas (y conseguirla de verdad)',
      h1: 'Cómo reservar una habitación con vistas y conseguirla de verdad',
      meta: 'Tipos de habitación, lo que dicen las fichas, plantas altas, el mensaje para el hotel: un método práctico para tener las vistas que pagas, basado en fichas reales.',
      lede: 'La mayoría de las estancias «con vistas» decepcionantes vienen del mismo error: reservar el hotel en lugar de la habitación. Este es el método con el que leemos cada ficha de esta web.',
      intro: [
        { h: 'Las vistas se venden por tipo de habitación', p: ['Los hoteles venden sus habitaciones por categorías. Cuando una categoría se llama «Habitación Deluxe King con vistas a la Torre Eiffel», las vistas forman parte del producto. Cuando solo aparecen en la descripción del hotel, son una promesa sobre el edificio, no sobre tu habitación.', 'Es lo más útil que puedes comprobar antes de pagar, y el motivo por el que en toda esta web separamos las fuentes a nivel de habitación y a nivel de hotel.'] },
        { h: 'Estar cerca no es tener vistas', p: ['Estar al lado de un monumento es la trampa más habitual. Las calles más próximas suelen ser demasiado bajas o estrechas para verlo, mientras que un hotel en una colina a dos o tres kilómetros puede verlo entero. Lo hemos medido en fichas de París; la cifra está más abajo.'] },
      ],
      template: {
        h: 'El mensaje que conviene enviar al hotel',
        note: 'Envíalo por correo o por la mensajería de la plataforma de reserva, después de reservar. Pon la referencia de la reserva en el asunto.',
        body: 'Hola:\n\nHe reservado una [categoría de habitación] del [fecha] al [fecha], referencia [número].\nVenimos por las vistas a [monumento]. ¿Podrían anotar, si es posible, una preferencia por una planta alta con esas vistas en nuestras fechas?\n\nEntiendo que no pueden garantizar un número de habitación. Les agradecería que me avisaran si esa categoría no tiene las vistas.\n\nUn saludo,\n[Nombre]',
      },
      outro: [
        { h: 'Cuándo reservar', p: ['Las categorías con vistas son una pequeña parte de las habitaciones de un hotel y se agotan antes. Resérvalas con más antelación que una habitación estándar y revisa las condiciones de cancelación: muchas tarifas flexibles permiten cambiar si se libera una categoría mejor.'] },
        { h: 'Al llegar', p: ['Pregunta en recepción, con amabilidad, si hay libre una habitación con vistas en una planta más alta. No cuesta nada y los hoteles suelen tener alguna mejor sin asignar ese día.'] },
      ],
      faq: [
        { q: '¿Puede un hotel garantizarme unas vistas?', a: 'Solo a través del tipo de habitación. Los hoteles casi nunca garantizan un número de habitación, pero una categoría con las vistas en el nombre forma parte de lo que pagas.' },
        { q: '¿Merece la pena reservar directamente con el hotel?', a: 'Puede ayudar con las peticiones, porque el hotel ve tus preferencias directamente. Compara antes el precio y la cancelación; lo que más importa es el nombre de la categoría.' },
        { q: '¿Y si no me dan las vistas que reservé?', a: 'Si la categoría reservada nombra las vistas, pide en recepción que te cambien. Guarda la confirmación de reserva con el nombre de la categoría.' },
      ],
    },
    de: {
      title: 'Hotelzimmer mit Aussicht buchen (und es wirklich bekommen)',
      h1: 'So buchst du ein Hotelzimmer mit Aussicht und bekommst es auch',
      meta: 'Zimmerkategorien, Wortlaut der Angebote, obere Etagen, die Nachricht ans Hotel: eine praktische Methode, um die bezahlte Aussicht auch zu bekommen, auf Basis echter Hotelangebote.',
      lede: 'Die meisten enttäuschenden „Aussichts“-Aufenthalte haben denselben Grund: Man bucht das Hotel statt das Zimmer. So lesen wir jedes Angebot auf dieser Seite.',
      intro: [
        { h: 'Aussicht wird pro Zimmerkategorie verkauft', p: ['Hotels verkaufen Zimmer in Kategorien. Heißt eine Kategorie „Deluxe King Room with Eiffel Tower View“, gehört der Blick zum Produkt. Wird er nur in der Hotelbeschreibung erwähnt, ist das ein Versprechen über das Gebäude, nicht über dein Zimmer.', 'Das ist das Nützlichste, was du vor dem Bezahlen prüfen kannst, und der Grund, warum wir auf dieser Seite überall Quellen auf Zimmer- und auf Hotelebene trennen.'] },
        { h: 'Nah dran heißt nicht mit Aussicht', p: ['Direkt neben einem Wahrzeichen zu wohnen ist die häufigste Falle. Die nächstgelegenen Straßen sind oft zu niedrig oder zu eng, um es zu sehen, während ein Hotel auf einem Hügel zwei oder drei Kilometer entfernt alles sieht. Wir haben das an Pariser Angeboten gemessen, die Zahl steht weiter unten.'] },
      ],
      template: {
        h: 'Die Nachricht ans Hotel',
        note: 'Schick sie nach der Buchung per E-Mail oder über das Nachrichtensystem der Buchungsplattform. Die Buchungsnummer gehört in den Betreff.',
        body: 'Guten Tag,\n\nich habe ein [Zimmerkategorie] vom [Datum] bis [Datum] gebucht, Buchungsnummer [Nummer].\nWir kommen wegen des Blicks auf [Wahrzeichen]. Könnten Sie bitte, wenn möglich, den Wunsch nach einer oberen Etage mit diesem Blick für unsere Daten vermerken?\n\nMir ist bewusst, dass Zimmernummern nicht garantiert werden können. Falls diese Kategorie den Blick nicht hat, wäre ich für einen kurzen Hinweis dankbar.\n\nMit freundlichen Grüßen\n[Name]',
      },
      outro: [
        { h: 'Wann buchen', p: ['Kategorien mit Aussicht machen nur einen kleinen Teil der Zimmer aus und sind zuerst weg. Buche sie früher als ein Standardzimmer und prüfe die Stornobedingungen: Mit vielen flexiblen Tarifen kannst du umbuchen, wenn eine bessere Kategorie frei wird.'] },
        { h: 'Beim Check-in', p: ['Frag an der Rezeption freundlich, ob ein Zimmer mit Blick in einer höheren Etage frei ist. Das kostet nichts, und Hotels haben am Anreisetag oft ein besseres Zimmer noch nicht vergeben.'] },
      ],
      faq: [
        { q: 'Kann ein Hotel mir eine Aussicht garantieren?', a: 'Nur über die Zimmerkategorie. Hotels garantieren selten eine Zimmernummer, aber eine Kategorie mit dem Blick im Namen gehört zu dem, was du bezahlst.' },
        { q: 'Lohnt es sich, direkt beim Hotel zu buchen?', a: 'Für Wünsche kann es helfen, weil das Hotel sie direkt sieht. Vergleiche vorher Preis und Stornobedingungen; entscheidend ist der Name der Kategorie.' },
        { q: 'Was, wenn ich die gebuchte Aussicht nicht bekomme?', a: 'Nennt die gebuchte Kategorie den Blick, bitte an der Rezeption um ein anderes Zimmer. Heb die Buchungsbestätigung mit dem Kategorienamen auf.' },
      ],
    },
  },
}

export const GUIDES: Guide[] = [roomWithAView]
export const guide = (id: string) => GUIDES.find((g) => g.id === id)!
