import type { Editorial, Fmt, PageCopy, Section, QA, Card, NearStats } from './types'
import type { ViewStats } from '@/lib/stats'

// English. Facts about landmarks are sourced in data/SOURCES.md. Hotel numbers come from ViewStats.
// No em dashes, no invented facts, no superlatives we cannot back.

const premium = (s: ViewStats, f: Fmt) =>
  s.premiumMedian != null && s.premiumN >= 3
    ? `Across the ${s.premiumN} hotels where we could price both on the same night (${f.date(s.priceDate!)}), the cheapest room with the view cost a median ${s.premiumMedian}% more than the hotel’s cheapest room.`
    : ''

/** Advice that holds for every landmark, tuned by the real numbers. */
const bookingSection = (lm: string, s: ViewStats, f: Fmt): Section => ({
  h: 'Book the room, not just the hotel',
  p: [
    `A hotel “with a view” rarely means every room has it. Of the ${s.count} hotels on this page, ${s.roomNamed} name the ${lm} view in a specific room category. That category is what you need to book: if the view is in the room’s name on the booking page, it is part of what you pay for.`,
    `The others mention the view in their own description, usually with “some rooms”. That is a real statement from the hotel, but it does not tell you which room you will get. Book the best category you can, then ask the hotel in writing before you arrive.`,
    premium(s, f),
  ].filter(Boolean),
})

const faqCommon = (lm: string): QA[] => [
  { q: `How do you know a hotel has a ${lm} view?`, a: 'We read the room names and the hotel’s own description on its booking listing. A view is shown only when one of them mentions it. Being close is never enough: a hotel 300 metres away can face a courtyard, and one 4 kilometres away can see the whole city.' },
  { q: 'What does “not stated” mean next to balcony or terrace?', a: 'It means the listing does not say. It does not mean the hotel has none. We never turn missing information into a “no”.' },
  { q: 'Are the prices on this page live?', a: 'No. They were collected ahead for one night with two adults and are shown with that date. Use “Check availability” for live rates on your own dates.' },
]

type LM = {
  name: string
  the: string
  cards: (s: ViewStats, f: Fmt) => Card[]
  sections: (s: ViewStats, f: Fmt) => Section[]
  faq: (s: ViewStats, f: Fmt) => QA[]
  meta: (s: ViewStats) => string
  near?: { lede: (s: NearStats, f: Fmt) => string; sections: (s: NearStats, f: Fmt) => Section[]; faq: QA[] }
}

const LM: Record<string, LM> = {
  'eiffel-tower': {
    name: 'Eiffel Tower', the: 'the Eiffel Tower',
    meta: (s) => `${s.count} Paris hotels where the Eiffel Tower view is stated by the hotel, with the room categories that have it, balconies, distance and ratings.`,
    cards: (s, f) => [
      { tag: 'Close up', t: 'Under the tower', d: `${s.under1km} of the ${s.count} hotels are less than 1 km away, in the 7th, 15th and 16th arrondissements. You see the ironwork, not just the silhouette.` },
      { tag: 'From afar', t: 'Above the rooftops', d: `${s.over2km} hotels see it from more than 2 km, up to ${s.farthest ? f.d(s.farthest.d) : ''} from Montmartre. The whole tower rises over Paris, sparkles included.` },
      { tag: 'At night', t: 'Five minutes every hour', d: 'After dusk the tower sparkles for five minutes at the start of each hour. The lights go off at 11.45 pm when it closes.' },
      { tag: 'Balcony', t: `${s.balconyNamed} hotels name it`, d: 'Only room categories that combine “balcony” and “Eiffel Tower view” in their name are counted here.' },
    ],
    sections: (s, f) => [
      {
        h: 'Two very different Eiffel Tower views',
        p: [
          `The first is the close view. From the streets around the Champ de Mars, Grenelle and the Trocadéro hill, the tower fills the window. ${s.closest ? `The closest hotel on this page, ${s.closest.hotel.name}, is ${f.d(s.closest.d)} away in a straight line.` : ''} Up close the angle is steep: lower floors often see the legs and the first platform rather than the top, which is why several hotels name “high floor” in the category.`,
          `The second is the skyline view. From Montmartre, the Étoile or the Latin Quarter, the tower is a small, complete shape above a sea of zinc roofs. It is a calmer view and often a cheaper night. ${s.farthest ? `${s.farthest.hotel.name} sits ${f.d(s.farthest.d)} away and still names the view in its room categories.` : ''}`,
        ],
      },
      bookingSection('Eiffel Tower', s, f),
      {
        h: 'When the view is at its best',
        p: [
          'Every evening the golden lighting comes on at dusk, and the 20,000 sparkling bulbs run for five minutes at the start of each hour. The lights are switched off at 11.45 pm, when the tower closes, as part of the City of Paris energy saving plan in place since September 2022.',
          'Season changes how many sparkles you see from your room. In December night falls before 6 pm, so a whole evening of sparkles fits before dinner. Around the June solstice it gets dark after 10 pm and you may only catch one or two. If the night view is the reason for the trip, autumn and winter give you more of it.',
          'Light depends on where you look from. Montmartre and the Right Bank to the north-east see the tower with the morning sun on it. From Trocadéro and Passy, to the north-west, the late afternoon light is the one that falls on the side you face.',
        ],
      },
      {
        h: 'Where to stay for the view',
        p: [
          'Trocadéro and Passy (16th): across the Seine, looking straight at the tower. The classic postcard angle, mostly high-end hotels and residential streets that are quiet at night.',
          'Champ de Mars and Gros-Caillou (7th): right next to the tower, with the park between you and it. Few hotels, high demand.',
          'Grenelle and Dupleix (15th): the tower seen from the south-west, more modern buildings, better value, and the elevated métro line 6 with its own views.',
          'Montmartre (18th): the long view from the hill across the whole city. Views are named in room categories here, and nights cost a fraction of the 7th.',
        ],
      },
    ],
    faq: (s, f) => [
      { q: 'Which Paris hotels have the best Eiffel Tower view?', a: `“Best” depends on what you want: close and dramatic, or a full silhouette over the city. Of the ${s.count} hotels on this page, ${s.roomNamed} put the view in the name of a room category, which is the most reliable sign. They are listed first on this page.` },
      { q: 'Is an Eiffel Tower view room worth the extra cost?', a: premium(s, f) || 'It depends on the hotel. Compare the view category with the standard room for your dates.' },
      { q: 'Can I see the Eiffel Tower sparkle from my room?', a: 'If the room faces the tower, yes: the sparkles run for five minutes at the start of each hour after dusk, and the lights go off at 11.45 pm.' },
      ...faqCommon('Eiffel Tower'),
    ],
    near: {
      lede: (s, f) => `${s.count} rated hotels within 1.5 km of the Eiffel Tower, sorted by straight-line distance, with an estimated walking time.`,
      sections: (s, f) => [
        {
          h: 'Staying near the Eiffel Tower',
          p: [
            `The tower stands at the edge of the 7th arrondissement, between the Seine and the Champ de Mars. Hotels within walking distance are split between the 7th, the 15th to the south-west and the 16th across the river. ${s.medianPrice ? `On ${f.date(s.priceDate!)}, the median “from” price of the hotels on this list was ${f.eur(s.medianPrice)} for two.` : ''}`,
            `${s.withView} of these hotels also have a view of the tower stated by the hotel. Close does not mean with a view: many addresses a few minutes away look onto a courtyard or the next building.`,
          ],
        },
        {
          h: 'Getting around from here',
          p: ['The area is served by RER C (Champ de Mars-Tour Eiffel), métro line 6 (Bir-Hakeim) and line 9 (Trocadéro). The riverside path makes the walk to the Musée d’Orsay and the Louvre a pleasant one.'],
        },
      ],
      faq: [
        { q: 'How far is “near” on this page?', a: 'Up to 1.5 km in a straight line. Walking time is an estimate: straight line plus 30% for streets, at 80 metres per minute.' },
        { q: 'Do hotels near the Eiffel Tower all have a view of it?', a: 'No. Proximity and view are two different things. Hotels marked “View confirmed” are the ones where the hotel itself mentions the view.' },
      ],
    },
  },

  'notre-dame': {
    name: 'Notre-Dame', the: 'Notre-Dame',
    meta: (s) => `${s.count} Paris hotels with a Notre-Dame view stated by the hotel, most on the Left Bank quays facing the cathedral, with room categories, distance and ratings.`,
    cards: (s, f) => [
      { tag: 'Reopened', t: 'Since December 2024', d: 'The cathedral reopened after five years of restoration following the April 2019 fire. The new spire is back on the skyline.' },
      { tag: 'Where', t: 'Left Bank quays', d: `The view hotels are all within ${s.farthest ? f.d(s.farthest.d) : '1 km'}, mostly in the Latin Quarter, across the small arm of the Seine.` },
      { tag: 'Plus', t: 'Often the Seine too', d: 'From the quays, the river is part of the same view. Several hotels name both.' },
    ],
    sections: (s, f) => [
      {
        h: 'Waking up in front of Notre-Dame',
        p: [
          'Notre-Dame stands on the Île de la Cité, in the 4th arrondissement. Hotels are almost absent from the island itself, so the view comes from the Left Bank: Quai Saint-Michel, Quai de Montebello and the narrow streets of the 5th arrondissement behind them.',
          `The distances are short. ${s.closest ? `${s.closest.hotel.name} is ${f.d(s.closest.d)} from the cathedral in a straight line.` : ''} What matters is which side of the building the room faces: the south facade and the apse gardens are what the quays see.`,
        ],
      },
      bookingSection('Notre-Dame', s, f),
      {
        h: 'Good to know before you book',
        p: [
          'The square in front of the cathedral is point zero of French roads, and the surrounding streets are busy until late. Rooms facing the quays trade the view for some traffic noise.',
          'Most hotels in this part of the Latin Quarter occupy old buildings: small rooms and lifts, few balconies. The view is the luxury here.',
        ],
      },
    ],
    faq: (s, f) => [
      { q: 'Is Notre-Dame open again?', a: 'Yes. The cathedral reopened in December 2024 after the restoration that followed the April 2019 fire.' },
      ...faqCommon('Notre-Dame'),
    ],
    near: {
      lede: (s) => `${s.count} rated hotels within 1.5 km of Notre-Dame, sorted by distance. The Latin Quarter, the Marais and Saint-Germain are all in range.`,
      sections: (s, f) => [
        {
          h: 'Staying near Notre-Dame',
          p: [
            `Notre-Dame is the most central landmark in Paris, and it shows: ${s.bands[0] + s.bands[1]} hotels on this list are less than 500 metres away. The Latin Quarter (5th) is the densest choice, the Marais (4th) is across the bridges to the north, and Saint-Germain (6th) is a short walk west.`,
            `${s.withView} of these hotels also state a view of the cathedral.`,
          ],
        },
      ],
      faq: [{ q: 'Which area is best for staying near Notre-Dame?', a: 'The Latin Quarter for the shortest walk and the most hotels, the Marais for restaurants and evenings out, Saint-Germain for a quieter, more classic Left Bank feel.' }],
    },
  },

  'arc-de-triomphe': {
    name: 'Arc de Triomphe', the: 'the Arc de Triomphe',
    meta: (s) => `Paris hotels with an Arc de Triomphe view stated by the hotel, around Place Charles-de-Gaulle, with room categories, balconies and distance.`,
    cards: (s, f) => [
      { tag: 'Twelve avenues', t: 'Look down an avenue', d: 'Twelve avenues meet at Place Charles-de-Gaulle. The view hotels look up one of them, straight at the arch.' },
      { tag: 'Every evening', t: '6.30 pm', d: 'The flame on the Tomb of the Unknown Soldier under the arch is rekindled every evening at 6.30 pm.' },
      { tag: 'Balcony', t: `${s.balconyNamed} name it`, d: 'Haussmann buildings around the Étoile often have balconies on the 2nd and 5th floors.' },
    ],
    sections: (s, f) => [
      {
        h: 'How the Arc de Triomphe view works',
        p: [
          'The arch sits in the middle of Place Charles-de-Gaulle, where twelve avenues meet like the points of a star (the square was long called the Étoile). A hotel sees the arch when its rooms face down one of those avenues, so the view is about the street a room looks onto more than the distance.',
          `${s.closest ? `The closest hotel on this page is ${s.closest.hotel.name}, ${f.d(s.closest.d)} away.` : ''} Some hotels are explicit about it and name the avenue whose rooms face the arch.`,
        ],
      },
      bookingSection('Arc de Triomphe', s, f),
    ],
    faq: (s, f) => [
      { q: 'Can you go up the Arc de Triomphe?', a: 'Yes, the roof terrace is open to visitors, and it is one of the best views of the Champs-Élysées and the Eiffel Tower.' },
      ...faqCommon('Arc de Triomphe'),
    ],
    near: {
      lede: (s) => `${s.count} rated hotels within 1.5 km of the Arc de Triomphe, sorted by distance.`,
      sections: (s) => [
        {
          h: 'Staying near the Arc de Triomphe',
          p: [
            `The arch is where the 8th, 16th and 17th arrondissements meet. ${s.bands[0] + s.bands[1]} hotels on this list are within 500 metres, from palaces on Avenue Kléber to smaller hotels in the quieter streets of the 17th.`,
            'Charles de Gaulle-Étoile station connects métro lines 1, 2 and 6 with the RER A, which runs straight to La Défense and Disneyland Paris.',
          ],
        },
      ],
      faq: [{ q: 'Is the Arc de Triomphe a good base for sightseeing?', a: 'Yes. Line 1 runs to the Louvre and the Marais in minutes, line 6 to the Eiffel Tower, and the RER A crosses the city.' }],
    },
  },

  seine: {
    name: 'Seine', the: 'the Seine',
    meta: (s) => `Paris hotels with a view of the Seine stated by the hotel, on the quays facing the river, with room categories and ratings.`,
    cards: () => [
      { tag: 'UNESCO', t: 'The banks of the Seine', d: 'The Paris riverbanks between the Pont de Sully and the Pont d’Iéna are a UNESCO World Heritage Site since 1991.' },
      { tag: 'Where', t: 'Quays, not streets', d: 'A river view means a room on the quay itself. One street back and the river disappears.' },
    ],
    sections: (s, f) => [
      {
        h: 'A room on the river',
        p: [
          'Few Paris hotels sit directly on the quays, which is why a Seine view is rarer than people expect. The ones that do often see a monument across the water too: Notre-Dame from the Latin Quarter, the Eiffel Tower from the 16th.',
          'River rooms face traffic on the quay roads. Ask for a higher floor: the view opens up over the trees and the noise drops.',
        ],
      },
      bookingSection('Seine', s, f),
    ],
    faq: (s, f) => faqCommon('Seine'),
  },

  'paris-rooftops': {
    name: 'Paris rooftops', the: 'the Paris rooftops',
    meta: (s) => `Paris hotels with a view over the city’s zinc rooftops, from top-floor rooms and rooftop terraces, as stated by the hotels.`,
    cards: () => [
      { tag: 'Top floor', t: 'Under the mansard', d: 'The sixth and seventh floors of Haussmann buildings, under the zinc roof, are where the rooftop views are.' },
      { tag: 'Rooftop', t: 'Or from the terrace', d: 'Some hotels keep the view for a rooftop bar or restaurant. Rooms may not share it.' },
    ],
    sections: (s, f) => [
      {
        h: 'The view Paris is made of',
        p: [
          'Grey zinc roofs, chimney pots, dormer windows: the Paris skyline is mostly built from the same materials since the 19th century rebuilding of the city. From a top-floor room you look across it, and often catch a monument rising above it.',
          'This view is the one hotels describe most loosely (“views of Paris”, “over the rooftops”). We list it when the hotel says so, and show whether it comes from rooms or from a rooftop venue.',
        ],
      },
      bookingSection('Paris rooftops', s, f),
    ],
    faq: (s, f) => faqCommon('Paris rooftop'),
  },

  'sacre-coeur': {
    name: 'Sacré-Cœur', the: 'Sacré-Cœur',
    meta: (s) => `Paris hotels with a Sacré-Cœur view stated by the hotel, in Montmartre, with room categories and distance.`,
    cards: () => [
      { tag: 'Montmartre', t: 'On top of the hill', d: 'The basilica crowns the Montmartre hill in the 18th arrondissement, one of the highest points in Paris.' },
    ],
    sections: (s, f) => [
      {
        h: 'Seeing Sacré-Cœur from your room',
        p: [
          'The white basilica stands at the top of Montmartre, so the view comes from below: streets on the slopes of the hill, looking up at the dome. The same hotels often look the other way too, across the whole city.',
        ],
      },
      bookingSection('Sacré-Cœur', s, f),
    ],
    faq: (s, f) => faqCommon('Sacré-Cœur'),
    near: {
      lede: (s) => `${s.count} rated hotels within 1.5 km of Sacré-Cœur, sorted by distance.`,
      sections: (s) => [
        {
          h: 'Staying near Sacré-Cœur',
          p: [
            `Montmartre is a village inside the city: steep streets, stairs, and a funicular up to the basilica. ${s.bands[0] + s.bands[1]} hotels on this list are within 500 metres. Remember the hill when you book: “near” can still mean a steep climb with luggage.`,
          ],
        },
      ],
      faq: [{ q: 'Is Montmartre a good place to stay in Paris?', a: 'For atmosphere and value, yes. It is further from the Louvre and the Eiffel Tower, but line 2 and line 12 connect it quickly.' }],
    },
  },
}

export const en: Editorial = {
  home: () => ({
    title: 'Wake Up With A View: hotels with views worth waking up for',
    h1: 'Don’t just stay near it. Wake up to it.',
    meta: 'Find hotels where you can see the landmark from your room: the Eiffel Tower, Notre-Dame, the Seine. Every view checked against the hotel’s own listing.',
    lede: 'We list hotels by what you can see from them, and where the view is from. A view is shown only when the hotel says so.',
    cards: [
      { tag: 'Room view', t: 'From your bed', d: 'The view is named in the room category. Open the curtains and it is there.' },
      { tag: 'Balcony', t: 'Coffee outside', d: 'Room categories with a balcony and the view in their name. We tell you when the balcony’s direction is not stated.' },
      { tag: 'Rooftop', t: 'From the top floor', d: 'The hotel has the view from a rooftop bar or terrace. Your room may not share it.' },
      { tag: 'Nearby', t: 'Walk to it', d: 'No view needed. Hotels sorted by distance to the landmark.' },
    ],
    sections: [
      { h: 'View first', p: ['Every hotel is listed for what you can see from it: the landmark, and where the view comes from.'] },
      { h: 'Data first', p: ['Distance, rating, balcony and terrace at a glance, with the date we checked them.'] },
      { h: 'Never assume the view', p: ['Being close proves nothing. A view appears here only when a room name or the hotel’s description mentions it.'] },
    ],
    faq: [],
  }),

  city: (c) => ({
    title: 'Paris hotels with a view: Eiffel Tower, Notre-Dame, the Seine',
    h1: 'Wake up with a view in Paris',
    meta: `Paris hotels with a view of the Eiffel Tower (${c['eiffel-tower']}), Notre-Dame (${c['notre-dame']}) and the Seine, as stated by the hotels. Room categories, balconies, distance and ratings.`,
    lede: 'Paris is a low, even city: most buildings stop at six or seven floors, so a few extra metres of height change everything. That is why the same hotel can have a room with the Eiffel Tower in the window and another facing a courtyard.',
    cards: [
      { tag: 'Rule of thumb', t: 'Height beats distance', d: 'A top floor two kilometres away often sees more than a first floor next door.' },
      { tag: 'Right Bank, Left Bank', t: 'Mind the river', d: 'The Seine opens the widest views: Trocadéro faces the Eiffel Tower, the Latin Quarter faces Notre-Dame.' },
      { tag: 'Montmartre', t: 'The long view', d: 'From the hill, the whole city spreads out below, Eiffel Tower included.' },
    ],
    sections: [
      {
        h: 'Where Paris views come from',
        p: [
          'Three things decide whether a Paris hotel room has a view: height, the street it faces, and what stands between. The Haussmann rules that shaped the city capped buildings at similar heights, so the skyline is flat and monuments stand out above it.',
          'The river is the other great opening. Along the quays nothing blocks the view across the water, which is why the Left Bank faces Notre-Dame and the 16th faces the Eiffel Tower.',
        ],
      },
      {
        h: 'How we built this list',
        p: [
          'We collected the booking listings of hotels around the main landmarks and read every room name and hotel description. When a room category names the view, it is a room-level source. When the hotel describes it in general terms, it is a hotel-level source. Anything vaguer stays in our notes and off the page.',
        ],
      },
    ],
    faq: [
      { q: 'Which part of Paris has the most hotels with a view?', a: 'Around the Eiffel Tower: the 7th, 15th and 16th arrondissements, plus Montmartre for the long view across the city.' },
      { q: 'Do I need a luxury hotel to get a view in Paris?', a: 'No. Some of the views on this site are named in the room categories of 2 and 3-star hotels, especially in Montmartre.' },
    ],
  }),

  method: () => ({
    title: 'How we verify hotel views',
    h1: 'How we verify views',
    meta: 'Our method: a view is listed only when a room name or the hotel’s own description mentions it. Confidence levels, view context, and why proximity is not proof.',
    lede: 'Most “hotels with a view” lists guess. We don’t. Here is exactly how a view gets onto this site, and what keeps one off it.',
    cards: [
      { tag: 'Room level', t: 'Named in the room', d: '“Deluxe King Room with Eiffel Tower View”. The view is part of the product you book. Shown.' },
      { tag: 'Hotel level', t: 'Described by the hotel', d: '“Some rooms offer views of the Eiffel Tower.” True, but not tied to a room. Shown, labelled as such.' },
      { tag: 'Not enough', t: 'Kept off the page', d: 'A landmark in a room name without the word view, a temporary rooftop, a street named after a monument.' },
    ],
    sections: [
      {
        h: 'Where the data comes from',
        p: [
          'We collect the public booking listings of hotels around each landmark: name, address, coordinates, rating, number of reviews, room categories and the hotel’s description. The original text is stored with the date it was collected, so any claim on this site can be traced back to its wording.',
        ],
      },
      {
        h: 'What counts as a view',
        p: [
          'A room category that names the landmark together with a view word (view, overlooking, facing) is a room-level source, our strongest level.',
          'A sentence in the hotel’s description that states a view of the landmark is a hotel-level source. We also record where the view is from: rooms, balcony, terrace, rooftop, restaurant or bar.',
          'Everything else stays in our data but never becomes a claim: a landmark in a room name without a view word, a pop-up rooftop open for a limited time, and street names such as Avenue de la Tour Eiffel.',
        ],
      },
      {
        h: 'What we never do',
        p: [
          'We never infer a view from distance. A hotel 300 metres from the Eiffel Tower can face a courtyard.',
          'We never infer a view from a photo. Photos illustrate, they don’t prove.',
          'We never turn missing information into a “no”. If a listing does not mention a balcony, we write “not stated”, not “no balcony”.',
          'We never present a price as permanent. Prices are shown with the night they were collected for.',
        ],
      },
      {
        h: 'Distances',
        p: ['Distances are measured in a straight line from the hotel’s coordinates to the landmark. Walking times are estimates (straight line plus 30%, at 80 metres per minute) and are labelled as such.'],
      },
    ],
    faq: [],
  }),

  view: (id, s, f) => {
    const x = LM[id]
    return {
      title: `Hotels with ${x.name} views in Paris (${s.count} checked)`,
      h1: `Hotels with ${x.name} views`,
      meta: x.meta(s),
      lede: `${s.count} hotels where the hotel itself states a view of ${x.the}, and where it is from. ${s.roomNamed} of them name it in a room category.`,
      cards: x.cards(s, f),
      sections: x.sections(s, f),
      faq: x.faq(s, f),
    }
  },

  near: (id, s, f) => {
    const x = LM[id]
    return {
      title: `Hotels near ${x.the.replace(/^the /, 'the ')} in Paris, by distance`,
      h1: `Hotels near ${x.the}`,
      meta: `${s.count} rated hotels within 1.5 km of ${x.the}, sorted by distance, with walking time, ratings and which ones also have the view.`,
      lede: x.near!.lede(s, f),
      cards: [],
      sections: x.near!.sections(s, f),
      faq: x.near!.faq,
    }
  },

  hotel: (name, ids) => ({
    title: ids.length ? `${name}: ${ids.map((id) => LM[id].name).join(', ')} view` : name,
    meta: `${name}, Paris: where the view of ${ids.map((id) => LM[id].the).join(' and ')} comes from, room categories, balcony and terrace, distances to landmarks and rating.`,
  }),
}
