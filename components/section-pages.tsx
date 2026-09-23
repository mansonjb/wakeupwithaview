import Link from 'next/link'
import { type Locale, fmtDate } from '@/lib/i18n'
import { ui } from '@/lib/ui'
import { CITY, COUNTRY, DATA_DATE } from '@/lib/data'
import { href, route, type Route } from '@/lib/routes'
import { CATEGORIES, categoryHotels, mainPoi, BUDGET_MAX, type Category } from '@/lib/categories'
import { categoryCopy } from '@/data/editorial/categories'
import { GUIDES, type Guide } from '@/data/guides'
import { homeDeep } from '@/data/editorial/home-deep'
import { globalStats } from '@/lib/stats'
import { abs } from '@/lib/seo'
import { SECTION_UI } from '@/lib/sections'
import { HotelCard, eur } from '@/components/hotel-card'
import MapView, { type MapPin } from '@/components/map-view'
import CarWidget from '@/components/car-widget'
import { Breadcrumbs, JsonLd, type Crumb } from '@/components/chrome'
import { Guide as GuideBlocks, Faq, faqLd, H2, Wrap, Chips } from '@/components/blocks'

const crumbLd = (items: Crumb[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
})

export { SECTION_UI }

const readMinutes = (g: Guide, l: Locale) => {
  const c = g.copy[l]
  const words = [c.lede, ...c.intro.flatMap((s) => s.p), c.template.body, ...c.outro.flatMap((s) => s.p), ...c.faq.map((q) => q.a)].join(' ').split(/\s+/).length
  return Math.max(3, Math.round(words / 200) + 2)
}

export function CategoryPage({ l, r, cat }: { l: Locale; r: Route; cat: Category }) {
  const t = ui(l)
  const su = SECTION_UI[l]
  const hs = categoryHotels(cat.id)
  const date = fmtDate(hs.find((h) => h.offer)?.offer?.checkIn ?? DATA_DATE, l)
  const ctx = { n: hs.length, city: CITY.name[l], max: eur(BUDGET_MAX, l), date }
  const copy = categoryCopy(l, cat.id)
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: COUNTRY.name[l], href: href('country', l) }, { name: CITY.name[l], href: href('city', l) }, { name: cat.short[l], href: r.paths[l] }]
  const pins: MapPin[] = hs.map((h, i) => ({ n: i + 1, lat: h.lat, lng: h.lng, name: h.name, view: true }))
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ItemList', name: cat.name[l], numberOfItems: hs.length, itemListElement: hs.map((h, i) => { const hp = route(`hotel:${h.id}`); return { '@type': 'ListItem', position: i + 1, name: h.name, ...(hp ? { url: abs(hp.paths[l]) } : {}) } }) }} />
      {copy.faq(ctx).length > 0 && <JsonLd data={faqLd(copy.faq(ctx))} />}
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="balance mb-1.5 mt-2.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[52px]">{cat.name[l]} {l === 'de' ? 'in' : l === 'es' ? 'en' : 'in'} {CITY.name[l]}</h1>
        <p className="max-w-[760px] text-base text-muted">{copy.lede(ctx)}</p>
        <p className="mt-2 max-w-[760px] text-xs text-faint"><span className="font-bold">{su.rule}:</span> {copy.rule(ctx)}</p>
        {!r.index && <div className="mt-4 rounded-2xl border border-dashed border-sun/40 bg-paper px-4 py-3 text-sm font-semibold text-sun-dark">{t.noindexNote}</div>}
      </Wrap>
      <Wrap className="grid items-start gap-5 py-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3.5">
          {hs.map((h, i) => <HotelCard key={h.id} h={h} l={l} poiId={mainPoi(h)} mode="view" pos={i + 1} />)}
        </div>
        <div className="lg:sticky lg:top-20">
          <MapView center={{ lat: CITY.lat, lng: CITY.lng }} label={CITY.name[l]} pins={pins} legend={{ view: t.mapLegendView, near: t.mapLegendNear }} />
        </div>
      </Wrap>
      <Wrap className="pt-8"><GuideBlocks sections={copy.sections(ctx)} /></Wrap>
      {copy.faq(ctx).length > 0 && <Wrap className="pt-10"><H2 className="mb-4">{t.goodToKnow}</H2><Faq items={copy.faq(ctx)} /></Wrap>}
      <Wrap className="pb-20 pt-10">
        <h2 className="mb-3.5 text-xl font-extrabold">{su.otherCats}</h2>
        <Chips items={CATEGORIES.filter((x) => x.id !== cat.id).map((x) => ({ label: `${x.icon} ${x.short[l]} · ${categoryHotels(x.id).length}`, href: href(`cat:${x.id}`, l) }))} />
      </Wrap>
    </main>
  )
}

export function GuidesIndex({ l }: { l: Locale }) {
  const t = ui(l)
  const su = SECTION_UI[l]
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: su.guides, href: href('guides', l) }]
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="mb-3 mt-2.5 text-[34px] font-extrabold tracking-[-0.04em] sm:text-[52px]">{su.guides}</h1>
        <p className="max-w-[700px] text-[17px] text-muted">{su.guidesLede}</p>
      </Wrap>
      <Wrap className="pb-20 pt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {GUIDES.map((g) => <GuideTeaser key={g.id} g={g} l={l} />)}
        </div>
      </Wrap>
    </main>
  )
}

export function GuideTeaser({ g, l }: { g: Guide; l: Locale }) {
  const su = SECTION_UI[l]
  const c = g.copy[l]
  return (
    <Link href={href(`guide:${g.id}`, l)} className="group flex flex-col gap-3 rounded-[20px] bg-paper p-7 hover:shadow-[0_12px_30px_rgba(20,30,60,.12)]">
      <div className="text-xs font-extrabold uppercase tracking-[.08em] text-sun">{su.guides} · {readMinutes(g, l)} {su.min}</div>
      <div className="balance text-[22px] font-extrabold leading-tight tracking-[-0.02em] group-hover:text-sky">{c.title}</div>
      <p className="text-[15px] leading-[1.55] text-muted">{c.lede}</p>
      <div className="mt-auto text-sm font-bold text-sky">{su.read} →</div>
    </Link>
  )
}

export function GuidePage({ l, r, g }: { l: Locale; r: Route; g: Guide }) {
  const t = ui(l)
  const su = SECTION_UI[l]
  const c = g.copy[l]
  const d = homeDeep(l, globalStats(), fmtDate(DATA_DATE, l))
  const levelCls: Record<string, string> = { strong: 'bg-ok-soft text-ok', medium: 'bg-sky-soft text-sky', weak: 'bg-[#FFF3E0] text-sun-dark', none: 'bg-canvas text-faint' }
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: su.guides, href: href('guides', l) }, { name: c.h1, href: r.paths[l] }]
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: c.title, description: c.meta, inLanguage: l, dateModified: g.updated, datePublished: g.updated, mainEntityOfPage: abs(r.paths[l]), publisher: { '@type': 'Organization', name: 'Wake Up With A View' } }} />
      <JsonLd data={faqLd(c.faq)} />
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <div className="mt-3 text-xs font-bold uppercase tracking-[.08em] text-sun">{su.updated} {fmtDate(g.updated, l)} · {readMinutes(g, l)} {su.min}</div>
        <h1 className="balance mb-3 mt-2 max-w-[900px] text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[48px]">{c.h1}</h1>
        <p className="max-w-[760px] text-[18px] leading-[1.6] text-muted">{c.lede}</p>
      </Wrap>
      <Wrap className="pt-8"><GuideBlocks sections={c.intro} /></Wrap>
      <Wrap className="pt-8">
        <div className="grid items-center gap-6 rounded-[28px] bg-ink p-7 text-white sm:p-10 lg:grid-cols-[auto_1fr]">
          <div className="text-[clamp(64px,10vw,110px)] font-extrabold leading-none tracking-[-0.05em] text-peach">{d.proxBig}</div>
          <div><h2 className="text-[26px] font-extrabold tracking-[-0.03em]">{d.proxTitle}</h2><p className="mt-3 leading-[1.65] text-[#C9CED8]">{d.proxText}</p></div>
        </div>
      </Wrap>
      <Wrap className="pt-12">
        <H2>{d.termsTitle}</H2>
        <p className="mb-5 mt-2 text-muted">{d.termsLede}</p>
        <div className="overflow-hidden rounded-[20px] bg-paper">
          {d.terms.map((x) => (
            <div key={x.term} className="grid gap-2 border-b border-rule px-5 py-4 last:border-0 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_auto] sm:items-center sm:gap-5">
              <div className="font-mono text-[13px] font-semibold">{x.term}</div>
              <div className="text-[15px] leading-[1.5] text-muted">{x.means}</div>
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${levelCls[x.level]}`}>{d.levels[x.level]}</span>
            </div>
          ))}
        </div>
      </Wrap>
      <Wrap className="pt-12">
        <H2 className="mb-5">{d.stepsTitle}</H2>
        <ol className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {d.steps.map((x, i) => (
            <li key={x.t} className="rounded-[20px] bg-paper p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sun text-sm font-extrabold text-white">{i + 1}</div>
              <div className="mb-1.5 mt-3.5 text-[18px] font-extrabold">{x.t}</div>
              <p className="text-[15px] leading-[1.55] text-muted">{x.d}</p>
            </li>
          ))}
        </ol>
      </Wrap>
      <Wrap className="pt-12">
        <div className="rounded-[20px] border-2 border-dashed border-sky/30 bg-paper p-6 sm:p-8">
          <H2>{c.template.h}</H2>
          <p className="mb-4 mt-2 text-sm text-muted">{c.template.note}</p>
          <pre className="whitespace-pre-wrap rounded-2xl bg-canvas p-5 font-mono text-[13px] leading-[1.7] text-ink">{c.template.body}</pre>
        </div>
      </Wrap>
      <Wrap className="pt-10"><GuideBlocks sections={c.outro} /></Wrap>
      <Wrap className="pb-20 pt-12"><H2 className="mb-4">{t.goodToKnow}</H2><Faq items={c.faq} /></Wrap>
    </main>
  )
}

const CAR = {
  en: {
    title: 'Car rental in Paris: when you need one, and where to pick it up',
    h1: 'Car rental in Paris',
    meta: 'You don’t need a car inside Paris. Rent one for day trips (Versailles, Giverny, Champagne, the Loire) and pick it up on your way out. Compare rental offers.',
    lede: 'Inside Paris, a car is more trouble than help: the métro is faster, parking is scarce and expensive, and the city is a low-emission zone. Where a car makes sense is the day after, when you leave the city.',
    sections: [
      { h: 'When a car is worth it', p: ['For day trips outside the city: Versailles is about 20 km away, Giverny about 75 km, Reims and the Champagne vineyards about 145 km, the Loire castles around Chambord about 180 km. Trains reach several of these, but a car lets you combine stops.', 'For the rest of a trip through France, once you have left Paris.'] },
      { h: 'Where to pick it up', p: ['Pick the car up on the day you leave Paris, not the day you arrive. Airport and outer-station rental offices save you driving through the centre.', 'Paris is a low-emission zone: rental cars carry the Crit’Air sticker it requires, but check it if you drive a car from elsewhere.'] },
    ],
    widget: 'Compare car rental offers',
  },
  es: {
    title: 'Alquiler de coches en París: cuándo lo necesitas y dónde recogerlo',
    h1: 'Alquiler de coches en París',
    meta: 'Dentro de París no necesitas coche. Alquílalo para excursiones (Versalles, Giverny, Champaña, el Loira) y recógelo al salir. Compara ofertas de alquiler.',
    lede: 'Dentro de París, un coche da más problemas que soluciones: el metro es más rápido, aparcar es difícil y caro, y la ciudad es zona de bajas emisiones. El coche tiene sentido al día siguiente, cuando sales de la ciudad.',
    sections: [
      { h: 'Cuándo merece la pena', p: ['Para excursiones fuera de la ciudad: Versalles está a unos 20 km, Giverny a unos 75 km, Reims y los viñedos de Champaña a unos 145 km, los castillos del Loira en torno a Chambord a unos 180 km. El tren llega a varios, pero el coche permite combinar paradas.', 'Para el resto de un viaje por Francia, una vez que has salido de París.'] },
      { h: 'Dónde recogerlo', p: ['Recoge el coche el día que sales de París, no el día que llegas. Las oficinas de los aeropuertos y de las estaciones periféricas te evitan conducir por el centro.', 'París es zona de bajas emisiones: los coches de alquiler llevan la etiqueta Crit’Air obligatoria, pero compruébalo si vienes con un coche de otro lugar.'] },
    ],
    widget: 'Compara ofertas de alquiler de coches',
  },
  de: {
    title: 'Mietwagen in Paris: wann du einen brauchst und wo du ihn abholst',
    h1: 'Mietwagen in Paris',
    meta: 'In Paris selbst brauchst du kein Auto. Miete eins für Ausflüge (Versailles, Giverny, Champagne, Loire) und hol es bei der Abreise ab. Mietwagenangebote vergleichen.',
    lede: 'In Paris macht ein Auto mehr Mühe, als es hilft: Die Metro ist schneller, Parkplätze sind knapp und teuer, und die Stadt ist eine Umweltzone. Sinnvoll wird das Auto am Tag danach, wenn du die Stadt verlässt.',
    sections: [
      { h: 'Wann sich ein Auto lohnt', p: ['Für Tagesausflüge: Versailles liegt etwa 20 km entfernt, Giverny etwa 75 km, Reims und die Weinberge der Champagne etwa 145 km, die Loire-Schlösser rund um Chambord etwa 180 km. Einige erreichst du mit dem Zug, mit dem Auto kannst du aber mehrere Stopps verbinden.', 'Für den Rest einer Frankreichreise, sobald du Paris verlassen hast.'] },
      { h: 'Wo du ihn abholst', p: ['Hol das Auto am Tag deiner Abreise aus Paris ab, nicht am Ankunftstag. Stationen an Flughäfen und am Stadtrand ersparen dir die Fahrt durchs Zentrum.', 'Paris ist eine Umweltzone: Mietwagen haben die vorgeschriebene Crit’Air-Plakette, prüfe sie aber, wenn du mit einem eigenen Auto kommst.'] },
    ],
    widget: 'Mietwagenangebote vergleichen',
  },
}
export const carCopy = (l: Locale) => CAR[l]

export function CarRentalPage({ l, r }: { l: Locale; r: Route }) {
  const t = ui(l)
  const c = CAR[l]
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: COUNTRY.name[l], href: href('country', l) }, { name: CITY.name[l], href: href('city', l) }, { name: SECTION_UI[l].car, href: r.paths[l] }]
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="mb-3 mt-2.5 text-[34px] font-extrabold tracking-[-0.04em] sm:text-[52px]">{c.h1}</h1>
        <p className="max-w-[760px] text-[17px] leading-[1.6] text-muted">{c.lede}</p>
      </Wrap>
      <Wrap className="pt-8">
        <div className="rounded-[20px] bg-paper p-5 sm:p-8">
          <h2 className="mb-4 text-xl font-extrabold">🚗 {c.widget}</h2>
          <CarWidget locale={l} />
        </div>
      </Wrap>
      <Wrap className="pb-20 pt-8"><GuideBlocks sections={c.sections} /></Wrap>
    </main>
  )
}
