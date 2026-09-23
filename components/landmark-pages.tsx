import Link from 'next/link'
import { type Locale, fmtDistance, fmtDate } from '@/lib/i18n'
import { ui } from '@/lib/ui'
import { editorial } from '@/data/editorial'
import { viewHotels, nearHotels, nearbyPois, poi, CITY, shownViews, type Poi } from '@/lib/data'
import { viewStats, nearStats } from '@/lib/stats'
import { href, route, HOTEL_PAGES, type Route } from '@/lib/routes'
import { areaLink } from '@/lib/site'
import { abs } from '@/lib/seo'
import { HotelCard, eur } from '@/components/hotel-card'
import MapView, { type MapPin } from '@/components/map-view'
import { Breadcrumbs, JsonLd, type Crumb } from '@/components/chrome'
import { Cards, Guide, Faq, faqLd, Chips, H2, Wrap, Stat } from '@/components/blocks'

export const fmt = (l: Locale) => ({ d: (m: number) => fmtDistance(m, l), eur: (n: number) => eur(n, l), date: (s: string) => fmtDate(s, l), n: (n: number) => String(n) })

function crumbs(l: Locale, p: Poi, extra?: Crumb): Crumb[] {
  const t = ui(l)
  return [
    { name: t.home, href: href('home', l) },
    { name: CITY.name[l], href: href('city', l) },
    { name: p.name[l].replace(/^(the|el|la|die|der|das|los) /i, ''), href: href(`view:${p.id}`, l) },
    ...(extra ? [extra] : []),
  ]
}

const breadcrumbLd = (items: Crumb[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
})

function Toggle({ l, p, active }: { l: Locale; p: Poi; active: 'view' | 'near' }) {
  const t = ui(l)
  const cls = (on: boolean) => `rounded-full px-4.5 py-2.5 text-sm font-bold ${on ? 'bg-sky text-white' : 'text-ink hover:bg-canvas'}`
  const near = route(`near:${p.id}`)
  return (
    <div className="inline-flex rounded-full border border-rule bg-paper p-1">
      <Link href={href(`view:${p.id}`, l)} className={cls(active === 'view')} aria-current={active === 'view' ? 'page' : undefined}>{t.withView}</Link>
      {near && <Link href={near.paths[l]} className={cls(active === 'near')} aria-current={active === 'near' ? 'page' : undefined}>{t.nearby}</Link>}
    </div>
  )
}

function NoIndexNote({ r, l }: { r: Route; l: Locale }) {
  if (r.index) return null
  return <div className="mt-4 rounded-2xl border border-dashed border-sun/40 bg-paper px-4 py-3 text-sm font-semibold text-sun-dark">{ui(l).noindexNote}</div>
}

function NearbyLinks({ l, p }: { l: Locale; p: Poi }) {
  const t = ui(l)
  const items = nearbyPois(p, 6).map(({ poi: x, d }) => {
    const r = route(`view:${x.id}`) ?? route(`near:${x.id}`)
    return r ? { label: `${x.name[l].replace(/^(the|el|la|die|der|das|los) /i, '')} · ${fmtDistance(d, l)}`, href: r.paths[l] } : null
  }).filter(Boolean) as { label: string; href: string }[]
  if (!items.length) return null
  return (
    <Wrap className="pb-4 pt-10">
      <h2 className="mb-3.5 text-xl font-extrabold">{t.nearbyLandmarks}</h2>
      <Chips items={items} />
    </Wrap>
  )
}

export function ViewPage({ l, r, p }: { l: Locale; r: Route; p: Poi }) {
  const t = ui(l)
  const s = viewStats(p.id)
  const c = editorial(l).view(p.id, s, fmt(l))
  const hs = viewHotels(p.id)
  const near = route(`near:${p.id}`)
  const cr = crumbs(l, p)
  const pins: MapPin[] = hs.map((h, i) => ({ n: i + 1, lat: h.lat, lng: h.lng, name: h.name, view: true }))
  const hasPoint = p.type !== 'river' && p.type !== 'skyline'

  return (
    <main>
      <JsonLd data={breadcrumbLd(cr)} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'ItemList', name: c.h1, numberOfItems: hs.length,
        itemListElement: hs.map((h, i) => {
          const hp = route(`hotel:${h.id}`)
          return { '@type': 'ListItem', position: i + 1, name: h.name, ...(hp ? { url: abs(hp.paths[l]) } : {}) }
        }),
      }} />
      {c.faq.length > 0 && <JsonLd data={faqLd(c.faq)} />}

      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="balance mb-1.5 mt-2.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[52px]">{c.h1}</h1>
        <p className="max-w-[760px] text-base text-muted [text-wrap:pretty]">{c.lede}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Toggle l={l} p={p} active="view" />
        </div>
        <NoIndexNote r={r} l={l} />
      </Wrap>

      <Wrap className="grid items-start gap-5 py-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3.5">
          {hs.map((h, i) => <HotelCard key={h.id} h={h} l={l} poiId={p.id} mode="view" pos={i + 1} />)}
          {near && (
            <div className="rounded-2xl bg-sky-soft p-4.5 text-sm font-semibold">
              {t.crossToNear} <Link href={near.paths[l]} className="text-sky">{t.crossToNearCta(p.name[l])} →</Link>
            </div>
          )}
        </div>
        <div className="lg:sticky lg:top-20">
          <MapView center={{ lat: p.lat, lng: p.lng }} label={p.name[l]} pins={hasPoint ? pins : pins} legend={{ view: t.mapLegendView, near: t.mapLegendNear }} />
        </div>
      </Wrap>

      <Wrap className="pt-8">
        <H2 className="mb-5">{t.inNumbers}</H2>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          <Stat n={String(s.count)} label={t.hotelsWithView(s.count)} />
          <Stat n={`${s.roomNamed}/${s.count}`} label={l === 'de' ? 'nennen den Blick in einer Zimmerkategorie' : l === 'es' ? 'lo indican en un tipo de habitación' : 'name it in a room category'} />
          {s.premiumMedian != null && s.premiumN >= 3 && <Stat n={`+${s.premiumMedian} %`} label={l === 'de' ? `Median-Aufpreis für das Zimmer mit Blick (${s.premiumN} Hotels)` : l === 'es' ? `sobreprecio mediano de la habitación con vistas (${s.premiumN} hoteles)` : `median premium for the view room (${s.premiumN} hotels)`} />}
          {s.cheapestView && <Stat n={eur(s.cheapestView.price, l)} label={`${l === 'de' ? 'günstigstes Zimmer mit Blick' : l === 'es' ? 'habitación con vistas más barata' : 'cheapest view room'}: ${s.cheapestView.hotel.name}, ${fmtDate(s.priceDate!, l)}`} />}
        </div>
      </Wrap>

      <Wrap className="pt-12"><Cards cards={c.cards} /></Wrap>
      <Wrap className="pt-10"><Guide sections={c.sections} /></Wrap>
      <Wrap className="pt-12">
        <H2 className="mb-4">{t.goodToKnow}</H2>
        <Faq items={c.faq} />
      </Wrap>
      <NearbyLinks l={l} p={p} />
      <Wrap className="pb-20 pt-6">
        <a href={areaLink(p.lat, p.lng, { city: 'paris', landmark: p.id, lang: l, pageType: 'view' })} target="_blank" rel="sponsored nofollow noopener" className="inline-block rounded-full border border-rule bg-paper px-5 py-3 text-sm font-bold text-sky hover:border-sky">
          {t.bookCta} →
        </a>
      </Wrap>
    </main>
  )
}

export function NearPage({ l, r, p }: { l: Locale; r: Route; p: Poi }) {
  const t = ui(l)
  const s = nearStats(p.id)
  const c = editorial(l).near(p.id, s, fmt(l))
  const hs = nearHotels(p.id)
  const cr = crumbs(l, p, { name: t.nearby, href: r.paths[l] })
  const pins: MapPin[] = hs.map((h, i) => ({ n: i + 1, lat: h.lat, lng: h.lng, name: h.name, view: shownViews(h, p.id).length > 0 }))
  const bands = ['< 250 m', '250–500 m', '500 m–1 km', '1–1.5 km']

  return (
    <main>
      <JsonLd data={breadcrumbLd(cr)} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'ItemList', name: c.h1, numberOfItems: hs.length,
        itemListElement: hs.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: h.name })),
      }} />
      {c.faq.length > 0 && <JsonLd data={faqLd(c.faq)} />}

      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="balance mb-1.5 mt-2.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[52px]">{c.h1}</h1>
        <p className="max-w-[760px] text-base text-muted">{c.lede} {t.sortedByDistance}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Toggle l={l} p={p} active="near" />
          {s.bands.map((n, i) => n > 0 && (
            <span key={bands[i]} className="rounded-full border border-rule bg-paper px-3.5 py-2.5 text-[13px] font-semibold">{bands[i]} · {n}</span>
          ))}
        </div>
        <NoIndexNote r={r} l={l} />
      </Wrap>

      <Wrap className="grid items-start gap-5 py-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3.5">
          {hs.map((h, i) => <HotelCard key={h.id} h={h} l={l} poiId={p.id} mode="near" pos={i + 1} />)}
          <div className="rounded-2xl bg-sky-soft p-4.5 text-sm font-semibold">
            {t.crossToView} <Link href={href(`view:${p.id}`, l)} className="text-sky">{t.crossToViewCta(p.name[l])} →</Link>
          </div>
        </div>
        <div className="lg:sticky lg:top-20">
          <MapView center={{ lat: p.lat, lng: p.lng }} label={p.name[l]} pins={pins} legend={{ view: t.mapLegendView, near: t.mapLegendNear }} />
        </div>
      </Wrap>

      <Wrap className="pt-10"><Guide sections={c.sections} /></Wrap>
      <Wrap className="pt-12">
        <H2 className="mb-4">{t.goodToKnow}</H2>
        <Faq items={c.faq} />
      </Wrap>
      <NearbyLinks l={l} p={p} />
      <div className="pb-16" />
    </main>
  )
}

export { HOTEL_PAGES, poi }
