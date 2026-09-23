import type { Editorial, Fmt, Section, QA, Card, NearStats } from './types'
import type { ViewStats } from '@/lib/stats'

// Deutsch (Du-Form, wie bei Reiseportalen üblich). Fakten in data/SOURCES.md. Keine Gedankenstriche.

const premium = (s: ViewStats, f: Fmt) =>
  s.premiumMedian != null && s.premiumN >= 3
    ? `Bei den ${s.premiumN} Hotels, deren Preise wir für dieselbe Nacht (${f.date(s.priceDate!)}) vergleichen konnten, kostete das günstigste Zimmer mit Blick im Median ${s.premiumMedian} % mehr als das günstigste Zimmer des Hotels.`
    : ''

const bookingSection = (lm: string, s: ViewStats, f: Fmt): Section => ({
  h: 'Buche das Zimmer, nicht nur das Hotel',
  p: [
    `„Hotel mit Aussicht“ heißt fast nie, dass jedes Zimmer sie hat. Von den ${s.count} Hotels auf dieser Seite nennen ${s.roomNamed} den Blick auf ${lm} in einer bestimmten Zimmerkategorie. Genau diese Kategorie solltest du buchen: Steht der Blick im Zimmernamen, gehört er zu dem, was du bezahlst.`,
    'Die übrigen erwähnen die Aussicht in ihrer eigenen Beschreibung, meist mit „einige Zimmer“. Das ist eine echte Aussage des Hotels, sagt aber nicht, welches Zimmer du bekommst. Buche die beste Kategorie, die du bekommen kannst, und frag vor der Anreise schriftlich beim Hotel nach.',
    premium(s, f),
  ].filter(Boolean),
})

const faqCommon = (lm: string): QA[] => [
  { q: `Woher wisst ihr, dass ein Hotel Blick auf ${lm} hat?`, a: 'Wir lesen die Zimmernamen und die Beschreibung, die das Hotel selbst in seinem Buchungsangebot veröffentlicht. Eine Aussicht zeigen wir nur, wenn eines von beiden sie erwähnt. Nähe allein reicht nie: Ein Hotel 300 Meter entfernt kann auf einen Innenhof blicken, eines in 4 Kilometern Entfernung über die ganze Stadt.' },
  { q: 'Was bedeutet „keine Angabe“ bei Balkon oder Terrasse?', a: 'Das Angebot sagt dazu nichts. Es heißt nicht, dass das Hotel keinen hat. Fehlende Informationen machen wir nie zu einem „Nein“.' },
  { q: 'Sind die Preise auf dieser Seite aktuell?', a: 'Nein. Sie wurden vorab für eine Nacht mit zwei Erwachsenen erhoben und stehen mit diesem Datum da. Über „Verfügbarkeit prüfen“ siehst du die aktuellen Preise für deine Reisedaten.' },
]

type LM = {
  /** name in the dative/accusative-safe form used in "Blick auf …" */
  auf: string
  /** name for "Hotels in der Nähe von/vom …" */
  von: string
  title: string
  cards: (s: ViewStats, f: Fmt) => Card[]
  sections: (s: ViewStats, f: Fmt) => Section[]
  faq: (s: ViewStats, f: Fmt) => QA[]
  meta: (s: ViewStats) => string
  near?: { lede: (s: NearStats, f: Fmt) => string; sections: (s: NearStats, f: Fmt) => Section[]; faq: QA[] }
}

const LM: Record<string, LM> = {
  'eiffel-tower': {
    auf: 'den Eiffelturm', von: 'Eiffelturm', title: 'Eiffelturmblick',
    meta: (s) => `${s.count} Pariser Hotels, bei denen das Hotel selbst einen Blick auf den Eiffelturm angibt: Zimmerkategorien, Balkone, Entfernung und Bewertungen.`,
    cards: (s, f) => [
      { tag: 'Aus der Nähe', t: 'Direkt am Turm', d: `${s.under1km} der ${s.count} Hotels liegen weniger als 1 km entfernt, im 7., 15. und 16. Arrondissement. Du siehst das Eisengerüst, nicht nur die Silhouette.` },
      { tag: 'Aus der Ferne', t: 'Über den Dächern', d: `${s.over2km} Hotels sehen ihn aus mehr als 2 km, bis zu ${s.farthest ? f.d(s.farthest.d) : ''} von Montmartre aus. Der ganze Turm über Paris, Glitzern inklusive.` },
      { tag: 'Bei Nacht', t: 'Fünf Minuten pro Stunde', d: 'Nach Einbruch der Dunkelheit glitzert der Turm zu Beginn jeder Stunde fünf Minuten lang. Um 23:45 Uhr, zur Schließung, geht das Licht aus.' },
      { tag: 'Balkon', t: `${s.balconyNamed} Hotels nennen ihn`, d: 'Gezählt werden nur Zimmerkategorien, die „Balkon“ und „Eiffelturmblick“ im Namen verbinden.' },
    ],
    sections: (s, f) => [
      {
        h: 'Zwei ganz verschiedene Blicke auf den Eiffelturm',
        p: [
          `Der erste ist der nahe Blick. Aus den Straßen rund um das Marsfeld, Grenelle und den Trocadéro-Hügel füllt der Turm das Fenster. ${s.closest ? `Das nächstgelegene Hotel auf dieser Seite, ${s.closest.hotel.name}, liegt ${f.d(s.closest.d)} Luftlinie entfernt.` : ''} Aus der Nähe ist der Winkel steil: Aus den unteren Etagen sieht man oft eher die Pfeiler und die erste Plattform als die Spitze. Deshalb schreiben mehrere Hotels „obere Etage“ in die Kategorie.`,
          `Der zweite ist der Panoramablick. Von Montmartre, der Étoile oder dem Quartier Latin aus steht der Turm klein und vollständig über einem Meer aus Zinkdächern. Ein ruhigerer Blick und oft eine günstigere Nacht. ${s.farthest ? `${s.farthest.hotel.name} liegt ${f.d(s.farthest.d)} entfernt und nennt den Blick trotzdem in seinen Zimmerkategorien.` : ''}`,
        ],
      },
      bookingSection('den Eiffelturm', s, f),
      {
        h: 'Wann der Blick am schönsten ist',
        p: [
          'Jeden Abend geht bei Einbruch der Dunkelheit die goldene Beleuchtung an, und zu Beginn jeder Stunde funkeln fünf Minuten lang 20.000 Glühbirnen. Um 23:45 Uhr, wenn der Turm schließt, wird die Beleuchtung abgeschaltet. So sieht es der Energiesparplan der Stadt Paris seit September 2022 vor.',
          'Die Jahreszeit entscheidet, wie oft du das Glitzern vom Zimmer aus siehst. Im Dezember wird es vor 18 Uhr dunkel, da passen mehrere Runden vor das Abendessen. Um die Sommersonnenwende wird es erst nach 22 Uhr dunkel, dann erwischst du vielleicht ein oder zwei. Wenn der Nachtblick der Grund für die Reise ist, bekommst du im Herbst und Winter mehr davon.',
          'Das Licht hängt davon ab, von wo du schaust. Montmartre und das rechte Ufer im Nordosten sehen den Turm in der Morgensonne. Vom Trocadéro und aus Passy im Nordwesten fällt das Licht am späten Nachmittag auf die Seite, die du vor dir hast.',
        ],
      },
      {
        h: 'Wo du für den Blick wohnen solltest',
        p: [
          'Trocadéro und Passy (16. Arrondissement): auf der anderen Seite der Seine, genau gegenüber dem Turm. Der Postkartenwinkel, überwiegend gehobene Hotels und nachts ruhige Wohnstraßen.',
          'Marsfeld und Gros-Caillou (7.): direkt neben dem Turm, der Park dazwischen. Wenige Hotels, hohe Nachfrage.',
          'Grenelle und Dupleix (15.): der Turm von Südwesten, modernere Gebäude, besseres Preis-Leistungs-Verhältnis und die Hochbahn der Metrolinie 6 mit eigener Aussicht.',
          'Montmartre (18.): der weite Blick vom Hügel über die ganze Stadt. Hier steht der Blick in den Zimmerkategorien, und die Nacht kostet einen Bruchteil dessen, was man im 7. zahlt.',
        ],
      },
    ],
    faq: (s, f) => [
      { q: 'Welche Pariser Hotels haben den besten Eiffelturmblick?', a: `Das hängt davon ab, was du suchst: nah und spektakulär oder die ganze Silhouette über der Stadt. Von den ${s.count} Hotels auf dieser Seite nennen ${s.roomNamed} den Blick im Namen einer Zimmerkategorie, das ist das verlässlichste Zeichen. Sie stehen auf dieser Seite ganz oben.` },
      { q: 'Lohnt sich der Aufpreis für ein Zimmer mit Eiffelturmblick?', a: premium(s, f) || 'Das hängt vom Hotel ab. Vergleiche für deine Reisedaten die Kategorie mit Blick mit dem Standardzimmer.' },
      { q: 'Kann ich das Glitzern des Eiffelturms vom Zimmer aus sehen?', a: 'Wenn das Zimmer zum Turm zeigt, ja: Er funkelt nach Einbruch der Dunkelheit zu Beginn jeder Stunde fünf Minuten lang, um 23:45 Uhr geht das Licht aus.' },
      ...faqCommon('den Eiffelturm'),
    ],
    near: {
      lede: (s) => `${s.count} bewertete Hotels im Umkreis von 1,5 km um den Eiffelturm, nach Luftlinie sortiert und mit geschätzter Gehzeit.`,
      sections: (s, f) => [
        {
          h: 'Übernachten in der Nähe des Eiffelturms',
          p: [
            `Der Turm steht am Rand des 7. Arrondissements, zwischen Seine und Marsfeld. Die Hotels in Gehweite verteilen sich auf das 7., das 15. im Südwesten und das 16. jenseits des Flusses. ${s.medianPrice ? `Am ${f.date(s.priceDate!)} lag der mittlere Ab-Preis der Hotels auf dieser Liste bei ${f.eur(s.medianPrice)} für zwei Personen.` : ''}`,
            `${s.withView} dieser Hotels geben außerdem einen Blick auf den Turm an. Nah heißt nicht mit Aussicht: Viele Adressen wenige Minuten entfernt blicken auf einen Hof oder das Nachbarhaus.`,
          ],
        },
        { h: 'Unterwegs von hier aus', p: ['Das Viertel wird von der RER C (Champ de Mars-Tour Eiffel), der Metrolinie 6 (Bir-Hakeim) und der Linie 9 (Trocadéro) bedient. Entlang der Seine ist der Spaziergang zum Musée d’Orsay und zum Louvre sehr angenehm.'] },
      ],
      faq: [
        { q: 'Was heißt „in der Nähe“ auf dieser Seite?', a: 'Bis zu 1,5 km Luftlinie. Die Gehzeit ist eine Schätzung: Luftlinie plus 30 % für den Straßenverlauf, bei 80 Metern pro Minute.' },
        { q: 'Haben alle Hotels in der Nähe des Eiffelturms Blick auf ihn?', a: 'Nein. Nähe und Aussicht sind zwei verschiedene Dinge. Mit „Aussicht bestätigt“ markierte Hotels sind die, bei denen das Hotel den Blick selbst erwähnt.' },
      ],
    },
  },

  'notre-dame': {
    auf: 'Notre-Dame', von: 'Notre-Dame', title: 'Blick auf Notre-Dame',
    meta: (s) => `${s.count} Pariser Hotels mit Blick auf Notre-Dame laut Hotel, fast alle an den Quais des linken Ufers gegenüber der Kathedrale.`,
    cards: (s, f) => [
      { tag: 'Wiedereröffnet', t: 'Seit Dezember 2024', d: 'Die Kathedrale ist nach fünf Jahren Restaurierung infolge des Brandes vom April 2019 wieder geöffnet. Der neue Vierungsturm prägt wieder die Silhouette.' },
      { tag: 'Wo', t: 'Die Quais am linken Ufer', d: `Alle Hotels mit Blick liegen weniger als ${s.farthest ? f.d(s.farthest.d) : '1 km'} entfernt, meist im Quartier Latin, jenseits des kleinen Seinearms.` },
      { tag: 'Dazu', t: 'Oft auch die Seine', d: 'Von den Quais aus gehört der Fluss zum selben Blick. Mehrere Hotels nennen beides.' },
    ],
    sections: (s, f) => [
      {
        h: 'Aufwachen gegenüber von Notre-Dame',
        p: [
          'Notre-Dame steht auf der Île de la Cité im 4. Arrondissement. Auf der Insel selbst gibt es kaum Hotels, der Blick kommt also vom linken Ufer: vom Quai Saint-Michel, vom Quai de Montebello und aus den engen Gassen des 5. Arrondissements dahinter.',
          `Die Entfernungen sind kurz. ${s.closest ? `${s.closest.hotel.name} liegt ${f.d(s.closest.d)} Luftlinie von der Kathedrale entfernt.` : ''} Entscheidend ist, auf welche Seite des Baus das Zimmer blickt: Von den Quais aus sieht man die Südfassade und die Gärten am Chor.`,
        ],
      },
      bookingSection('Notre-Dame', s, f),
      {
        h: 'Gut zu wissen vor der Buchung',
        p: [
          'Der Vorplatz der Kathedrale ist der Nullpunkt der französischen Straßen, und in den Straßen ringsum ist bis spät viel los. Zimmer zu den Quais tauschen etwas Verkehrslärm gegen die Aussicht.',
          'Die meisten Hotels in diesem Teil des Quartier Latin sind in alten Häusern untergebracht: kleine Zimmer und Aufzüge, wenige Balkone. Der Luxus ist hier der Blick.',
        ],
      },
    ],
    faq: () => [
      { q: 'Ist Notre-Dame wieder geöffnet?', a: 'Ja. Die Kathedrale ist seit Dezember 2024 wieder geöffnet, nach der Restaurierung infolge des Brandes vom April 2019.' },
      ...faqCommon('Notre-Dame'),
    ],
    near: {
      lede: (s) => `${s.count} bewertete Hotels im Umkreis von 1,5 km um Notre-Dame, nach Entfernung sortiert. Quartier Latin, Marais und Saint-Germain liegen alle in Reichweite.`,
      sections: (s) => [
        {
          h: 'Übernachten in der Nähe von Notre-Dame',
          p: [
            `Notre-Dame ist das zentralste Wahrzeichen von Paris, und das merkt man: ${s.bands[0] + s.bands[1]} Hotels auf dieser Liste liegen weniger als 500 Meter entfernt. Das Quartier Latin (5.) hat das größte Angebot, das Marais (4.) liegt nördlich über die Brücken, Saint-Germain (6.) ein kurzes Stück westlich.`,
            `${s.withView} dieser Hotels geben außerdem einen Blick auf die Kathedrale an.`,
          ],
        },
      ],
      faq: [{ q: 'Welches Viertel ist am besten, um in der Nähe von Notre-Dame zu wohnen?', a: 'Das Quartier Latin für die kürzesten Wege und die meisten Hotels, das Marais für Restaurants und Abende, Saint-Germain für ein ruhigeres, klassisches linkes Ufer.' }],
    },
  },

  'arc-de-triomphe': {
    auf: 'den Triumphbogen', von: 'Triumphbogen', title: 'Blick auf den Triumphbogen',
    meta: () => 'Pariser Hotels mit Blick auf den Triumphbogen laut Hotel, rund um die Place Charles-de-Gaulle: Zimmerkategorien, Balkone und Entfernung.',
    cards: (s) => [
      { tag: 'Zwölf Avenuen', t: 'Blick die Avenue hinunter', d: 'An der Place Charles-de-Gaulle treffen zwölf Avenuen zusammen. Die Hotels mit Blick schauen eine davon entlang, direkt auf den Bogen.' },
      { tag: 'Jeden Abend', t: '18:30 Uhr', d: 'Die Flamme am Grab des Unbekannten Soldaten unter dem Bogen wird jeden Abend um 18:30 Uhr neu entfacht.' },
      { tag: 'Balkon', t: `${s.balconyNamed} nennen ihn`, d: 'Die Haussmann-Bauten an der Étoile haben oft durchgehende Balkone im 2. und 5. Stock.' },
    ],
    sections: (s, f) => [
      {
        h: 'So funktioniert der Blick auf den Triumphbogen',
        p: [
          'Der Bogen steht mitten auf der Place Charles-de-Gaulle, wo zwölf Avenuen wie die Strahlen eines Sterns zusammenlaufen (der Platz hieß lange einfach Étoile). Ein Hotel sieht den Bogen, wenn seine Zimmer auf eine dieser Avenuen hinausgehen: Es zählt mehr die Straße vor dem Fenster als die Entfernung.',
          `${s.closest ? `Das nächstgelegene Hotel auf dieser Seite ist ${s.closest.hotel.name}, ${f.d(s.closest.d)} entfernt.` : ''} Manche Hotels werden konkret und nennen die Avenue, auf die die Zimmer mit Bogenblick hinausgehen.`,
        ],
      },
      bookingSection('den Triumphbogen', s, f),
    ],
    faq: () => [
      { q: 'Kann man auf den Triumphbogen steigen?', a: 'Ja, die Dachterrasse ist für Besucher geöffnet und bietet einen der besten Blicke auf die Champs-Élysées und den Eiffelturm.' },
      ...faqCommon('den Triumphbogen'),
    ],
    near: {
      lede: (s) => `${s.count} bewertete Hotels im Umkreis von 1,5 km um den Triumphbogen, nach Entfernung sortiert.`,
      sections: (s) => [
        {
          h: 'Übernachten in der Nähe des Triumphbogens',
          p: [
            `Am Bogen treffen das 8., 16. und 17. Arrondissement zusammen. ${s.bands[0] + s.bands[1]} Hotels auf dieser Liste liegen innerhalb von 500 Metern, von Palasthotels an der Avenue Kléber bis zu kleinen Häusern in den ruhigeren Straßen des 17.`,
            'Die Station Charles de Gaulle-Étoile verbindet die Metrolinien 1, 2 und 6 mit der RER A, die direkt nach La Défense und zum Disneyland Paris fährt.',
          ],
        },
      ],
      faq: [{ q: 'Ist der Triumphbogen ein guter Ausgangspunkt für Besichtigungen?', a: 'Ja. Die Linie 1 fährt in wenigen Minuten zum Louvre und ins Marais, die Linie 6 zum Eiffelturm, und die RER A durchquert die Stadt.' }],
    },
  },

  seine: {
    auf: 'die Seine', von: 'Seine', title: 'Blick auf die Seine',
    meta: () => 'Pariser Hotels mit Blick auf die Seine laut Hotel, direkt an den Quais: Zimmerkategorien und Bewertungen.',
    cards: () => [
      { tag: 'UNESCO', t: 'Die Ufer der Seine', d: 'Die Pariser Seineufer zwischen dem Pont de Sully und dem Pont d’Iéna sind seit 1991 UNESCO-Welterbe.' },
      { tag: 'Wo', t: 'Am Quai, nicht dahinter', d: 'Flussblick heißt ein Zimmer direkt am Quai. Eine Straße weiter hinten ist der Fluss verschwunden.' },
    ],
    sections: (s, f) => [
      {
        h: 'Ein Zimmer am Fluss',
        p: [
          'Nur wenige Pariser Hotels liegen direkt an den Quais, deshalb ist ein Seineblick seltener, als man denkt. Die, die dort liegen, sehen oft auch ein Wahrzeichen am anderen Ufer: Notre-Dame vom Quartier Latin aus, den Eiffelturm aus dem 16.',
          'Zimmer zum Fluss gehen auf die Uferstraßen mit Verkehr hinaus. Frag nach einer oberen Etage: Der Blick öffnet sich über die Bäume, und der Lärm lässt nach.',
        ],
      },
      bookingSection('die Seine', s, f),
    ],
    faq: () => faqCommon('die Seine'),
  },

  'paris-rooftops': {
    auf: 'die Dächer von Paris', von: 'Dächer von Paris', title: 'Blick über die Dächer von Paris',
    meta: () => 'Pariser Hotels mit Blick über die Zinkdächer der Stadt, aus Zimmern im obersten Stock oder von Dachterrassen, laut Angaben der Hotels.',
    cards: () => [
      { tag: 'Oberster Stock', t: 'Unter der Mansarde', d: 'Im 6. und 7. Stock der Haussmann-Bauten, direkt unter dem Zinkdach, liegen die Zimmer mit Dächerblick.' },
      { tag: 'Dachterrasse', t: 'Oder von oben', d: 'Manche Hotels haben den Blick nur von einer Rooftop-Bar oder einem Restaurant. Die Zimmer teilen ihn nicht unbedingt.' },
    ],
    sections: (s, f) => [
      {
        h: 'Der Blick, aus dem Paris besteht',
        p: [
          'Graue Zinkdächer, Schornsteine, Dachgauben: Die Pariser Dachlandschaft ist seit dem großen Umbau der Stadt im 19. Jahrhundert größtenteils aus denselben Materialien gebaut. Aus einem Zimmer ganz oben blickst du darüber hinweg, und oft ragt ein Wahrzeichen heraus.',
          'Diesen Blick beschreiben Hotels am vagesten („Blick auf Paris“, „über den Dächern“). Wir führen ihn, wenn das Hotel es sagt, und zeigen, ob er aus den Zimmern oder von einer Dachterrasse kommt.',
        ],
      },
      bookingSection('die Dächer von Paris', s, f),
    ],
    faq: () => faqCommon('die Dächer von Paris'),
  },

  'sacre-coeur': {
    auf: 'Sacré-Cœur', von: 'Sacré-Cœur', title: 'Blick auf Sacré-Cœur',
    meta: () => 'Pariser Hotels mit Blick auf Sacré-Cœur laut Hotel, in Montmartre: Zimmerkategorien und Entfernung.',
    cards: () => [{ tag: 'Montmartre', t: 'Oben auf dem Hügel', d: 'Die Basilika krönt den Hügel von Montmartre im 18. Arrondissement, einen der höchsten Punkte von Paris.' }],
    sections: (s, f) => [
      { h: 'Sacré-Cœur vom Zimmer aus', p: ['Die weiße Basilika steht ganz oben auf Montmartre, der Blick kommt also von unten: aus Straßen am Hang, hinauf zur Kuppel. Dieselben Hotels blicken oft auch in die andere Richtung, über die ganze Stadt.'] },
      bookingSection('Sacré-Cœur', s, f),
    ],
    faq: () => faqCommon('Sacré-Cœur'),
    near: {
      lede: (s) => `${s.count} bewertete Hotels im Umkreis von 1,5 km um Sacré-Cœur, nach Entfernung sortiert.`,
      sections: (s) => [
        { h: 'Übernachten in der Nähe von Sacré-Cœur', p: [`Montmartre ist ein Dorf in der Stadt: steile Gassen, Treppen und eine Standseilbahn hinauf zur Basilika. ${s.bands[0] + s.bands[1]} Hotels auf dieser Liste liegen innerhalb von 500 Metern. Denk beim Buchen an den Hügel: „nah“ kann trotzdem einen steilen Aufstieg mit Gepäck bedeuten.`] },
      ],
      faq: [{ q: 'Ist Montmartre ein gutes Viertel zum Übernachten in Paris?', a: 'Für Atmosphäre und Preis ja. Louvre und Eiffelturm sind weiter weg, aber die Linien 2 und 12 bringen dich schnell hin.' }],
    },
  },
}

/** Genitive forms people actually search ("Hotels in der Nähe des Eiffelturms"). */
const NEAR_GEN: Record<string, string> = {
  'eiffel-tower': 'des Eiffelturms', 'arc-de-triomphe': 'des Triumphbogens', 'notre-dame': 'von Notre-Dame', 'sacre-coeur': 'von Sacré-Cœur',
}

export const de: Editorial = {
  home: () => ({
    title: 'Wake Up With A View: Hotels mit Aussichten, für die sich das Aufwachen lohnt',
    h1: 'Nicht nur in der Nähe wohnen. Mit Blick darauf aufwachen.',
    meta: 'Hotels, in denen du das Wahrzeichen vom Zimmer aus siehst: Eiffelturm, Notre-Dame, die Seine. Jede Aussicht mit dem Angebot des Hotels selbst abgeglichen.',
    lede: 'Wir ordnen Hotels danach, was man von ihnen aus sieht und von wo. Eine Aussicht zeigen wir nur, wenn das Hotel sie selbst nennt.',
    cards: [
      { tag: 'Zimmerblick', t: 'Vom Bett aus', d: 'Die Aussicht steht in der Zimmerkategorie. Vorhang auf, und sie ist da.' },
      { tag: 'Balkon', t: 'Kaffee draußen', d: 'Zimmerkategorien mit Balkon und Aussicht im Namen. Wir sagen dir, wenn nicht angegeben ist, wohin der Balkon zeigt.' },
      { tag: 'Dachterrasse', t: 'Von ganz oben', d: 'Das Hotel hat die Aussicht von einer Rooftop-Bar oder Terrasse. Dein Zimmer vielleicht nicht.' },
      { tag: 'In der Nähe', t: 'Zu Fuß hin', d: 'Ohne Aussicht. Hotels nach Entfernung zum Wahrzeichen sortiert.' },
    ],
    sections: [
      { h: 'Zuerst die Aussicht', p: ['Jedes Hotel steht hier für das, was man von ihm aus sieht: das Wahrzeichen und woher der Blick kommt.'] },
      { h: 'Zuerst die Daten', p: ['Entfernung, Bewertung, Balkon und Terrasse auf einen Blick, mit dem Datum unserer Prüfung.'] },
      { h: 'Nie eine Aussicht unterstellen', p: ['Nähe beweist nichts. Eine Aussicht erscheint hier nur, wenn ein Zimmername oder die Hotelbeschreibung sie erwähnt.'] },
    ],
    faq: [],
  }),

  city: (c) => ({
    title: 'Hotels mit Aussicht in Paris: Eiffelturm, Notre-Dame, Seine',
    h1: 'Mit Aussicht aufwachen in Paris',
    meta: `Pariser Hotels mit Blick auf den Eiffelturm (${c['eiffel-tower']}), Notre-Dame (${c['notre-dame']}) und die Seine, laut Hotels. Zimmerkategorien, Balkone, Entfernung und Bewertungen.`,
    lede: 'Paris ist eine niedrige, gleichmäßige Stadt: Die meisten Häuser enden nach sechs oder sieben Stockwerken, ein paar Meter mehr Höhe ändern also alles. Deshalb kann dasselbe Hotel ein Zimmer mit dem Eiffelturm im Fenster haben und ein anderes mit Blick auf den Hof.',
    cards: [
      { tag: 'Faustregel', t: 'Höhe schlägt Nähe', d: 'Ein oberster Stock zwei Kilometer entfernt sieht oft mehr als der erste Stock direkt nebenan.' },
      { tag: 'Rechtes Ufer, linkes Ufer', t: 'Achte auf den Fluss', d: 'Die Seine öffnet die weitesten Blicke: Der Trocadéro schaut auf den Eiffelturm, das Quartier Latin auf Notre-Dame.' },
      { tag: 'Montmartre', t: 'Der weite Blick', d: 'Vom Hügel aus liegt die ganze Stadt vor dir, Eiffelturm inklusive.' },
    ],
    sections: [
      {
        h: 'Woher die Pariser Aussichten kommen',
        p: [
          'Drei Dinge entscheiden, ob ein Pariser Hotelzimmer Aussicht hat: die Höhe, die Straße vor dem Fenster und das, was dazwischen steht. Die Haussmann-Bauordnung, die die Stadt geprägt hat, begrenzte die Gebäudehöhe, die Dachlinie ist also flach, und die Wahrzeichen ragen heraus.',
          'Der Fluss ist die andere große Öffnung. Entlang der Quais verstellt nichts den Blick über das Wasser: Deshalb schaut das linke Ufer auf Notre-Dame und das 16. auf den Eiffelturm.',
        ],
      },
      {
        h: 'Wie diese Liste entstanden ist',
        p: ['Wir haben die Buchungsangebote der Hotels rund um die wichtigsten Wahrzeichen gesammelt und jeden Zimmernamen und jede Beschreibung gelesen. Nennt eine Zimmerkategorie den Blick, ist das eine Quelle auf Zimmerebene. Beschreibt das Hotel ihn allgemein, ist es eine Quelle auf Hotelebene. Alles Vagere bleibt in unseren Notizen und nicht auf der Seite.'],
      },
    ],
    faq: [
      { q: 'In welchem Teil von Paris gibt es die meisten Hotels mit Aussicht?', a: 'Rund um den Eiffelturm: im 7., 15. und 16. Arrondissement, dazu Montmartre für den weiten Blick über die Stadt.' },
      { q: 'Braucht man ein Luxushotel für eine Aussicht in Paris?', a: 'Nein. Einige Aussichten auf dieser Seite stehen in den Zimmerkategorien von 2- und 3-Sterne-Hotels, vor allem in Montmartre.' },
    ],
  }),

  method: () => ({
    title: 'So prüfen wir Hotelaussichten',
    h1: 'So prüfen wir Aussichten',
    meta: 'Unsere Methode: Eine Aussicht wird nur genannt, wenn ein Zimmername oder die Beschreibung des Hotels sie erwähnt. Vertrauensstufen, Herkunft des Blicks und warum Nähe kein Beweis ist.',
    lede: 'Die meisten Listen mit „Hotels mit Aussicht“ raten. Wir nicht. So kommt eine Aussicht auf diese Seite, und das hält sie fern.',
    cards: [
      { tag: 'Zimmerebene', t: 'Im Zimmernamen', d: '„Deluxe King Room with Eiffel Tower View“. Der Blick gehört zu dem, was du buchst. Wird gezeigt.' },
      { tag: 'Hotelebene', t: 'Vom Hotel beschrieben', d: '„Einige Zimmer bieten Blick auf den Eiffelturm.“ Stimmt, ist aber an kein Zimmer gebunden. Wird gezeigt und so gekennzeichnet.' },
      { tag: 'Zu wenig', t: 'Bleibt draußen', d: 'Ein Wahrzeichen im Zimmernamen ohne das Wort Blick, eine befristete Dachbar, eine Straße, die nach einem Monument heißt.' },
    ],
    sections: [
      { h: 'Woher die Daten kommen', p: ['Wir sammeln die öffentlichen Buchungsangebote der Hotels rund um jedes Wahrzeichen: Name, Adresse, Koordinaten, Bewertung, Anzahl der Bewertungen, Zimmerkategorien und die Beschreibung des Hotels. Der Originaltext wird mit dem Erhebungsdatum gespeichert, so lässt sich jede Aussage auf dieser Seite bis zu ihrem Wortlaut zurückverfolgen.'] },
      {
        h: 'Was als Aussicht zählt',
        p: [
          'Eine Zimmerkategorie, die das Wahrzeichen zusammen mit einem Blick-Wort nennt (view, Blick, overlooking, facing), ist eine Quelle auf Zimmerebene, unsere stärkste Stufe.',
          'Ein Satz in der Hotelbeschreibung, der einen Blick auf das Wahrzeichen angibt, ist eine Quelle auf Hotelebene. Wir halten auch fest, woher der Blick kommt: Zimmer, Balkon, Terrasse, Dachterrasse, Restaurant oder Bar.',
          'Alles andere bleibt in unseren Daten, wird aber nie zur Aussage: ein Wahrzeichen im Zimmernamen ohne Blick-Wort, eine Pop-up-Dachbar auf Zeit und Straßennamen wie die Avenue de la Tour Eiffel.',
        ],
      },
      {
        h: 'Was wir nie tun',
        p: [
          'Wir leiten nie eine Aussicht aus der Entfernung ab. Ein Hotel 300 Meter vom Eiffelturm kann auf einen Hof blicken.',
          'Wir leiten nie eine Aussicht aus einem Foto ab. Fotos illustrieren, sie beweisen nichts.',
          'Wir machen fehlende Informationen nie zu einem „Nein“. Erwähnt ein Angebot keinen Balkon, schreiben wir „keine Angabe“, nicht „kein Balkon“.',
          'Wir stellen einen Preis nie als dauerhaft dar. Preise stehen mit der Nacht da, für die sie erhoben wurden.',
        ],
      },
      { h: 'Entfernungen', p: ['Entfernungen werden als Luftlinie von den Koordinaten des Hotels zum Wahrzeichen gemessen. Gehzeiten sind Schätzungen (Luftlinie plus 30 %, bei 80 Metern pro Minute) und als solche gekennzeichnet.'] },
    ],
    faq: [],
  }),

  view: (id, s, f) => {
    const x = LM[id]
    return {
      title: `Hotels mit ${x.title} in Paris (${s.count} geprüft)`,
      h1: `Hotels mit ${x.title}`,
      meta: x.meta(s),
      lede: `${s.count} Hotels, bei denen das Hotel selbst einen Blick auf ${x.auf} angibt, und woher er kommt. ${s.roomNamed} davon nennen ihn in einer Zimmerkategorie.`,
      cards: x.cards(s, f),
      sections: x.sections(s, f),
      faq: x.faq(s, f),
    }
  },

  near: (id, s, f) => {
    const x = LM[id]
    const g = NEAR_GEN[id] ?? `von ${x.von}`
    return {
      title: `Hotels in der Nähe ${g} in Paris, nach Entfernung`,
      h1: `Hotels in der Nähe ${g}`,
      meta: `${s.count} bewertete Hotels im Umkreis von 1,5 km, nach Entfernung sortiert, mit Gehzeit, Bewertungen und Angabe, welche auch Aussicht haben.`,
      lede: x.near!.lede(s, f),
      cards: [],
      sections: x.near!.sections(s, f),
      faq: x.near!.faq,
    }
  },

  hotel: (name, ids) => ({
    title: ids.length ? `${name}: Blick auf ${ids.map((id) => LM[id].auf).join(', ')}` : name,
    meta: `${name}, Paris: woher der Blick auf ${ids.map((id) => LM[id].auf).join(' und ')} kommt, Zimmerkategorien, Balkon und Terrasse, Entfernungen zu den Wahrzeichen und Bewertung.`,
  }),
}
