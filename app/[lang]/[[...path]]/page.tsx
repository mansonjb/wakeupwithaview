import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, fmtDistance, fmtDate, type Locale } from '@/lib/i18n'
import { ROUTES, resolve, type Route } from '@/lib/routes'
import { pageMeta } from '@/lib/seo'
import { editorial } from '@/data/editorial'
import { POIS, viewHotels, hotelViewPois, COUNTRY } from '@/lib/data'
import { ui } from '@/lib/ui'
import { viewStats, nearStats } from '@/lib/stats'
import { LANDMARK_PHOTO, CITY_PHOTO } from '@/lib/photos'
import { Header, Footer } from '@/components/chrome'
import { ViewPage, NearPage } from '@/components/landmark-pages'
import { HomePage, CountryPage, CityPage, MethodPage, HotelPage } from '@/components/other-pages'
import { eur } from '@/components/hotel-card'
import { CategoryPage, GuidesIndex, GuidePage, MonumentsGuidePage, CarRentalPage, SECTION_UI, carCopy } from '@/components/section-pages'
import { categoryHotels, BUDGET_MAX } from '@/lib/categories'
import { categoryCopy } from '@/data/editorial/categories'
import { CITY } from '@/lib/data'

export const dynamicParams = false

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const l = params.lang as Locale
  return ROUTES.map((r) => ({ path: r.paths[l].split('/').filter(Boolean).slice(1) }))
}

async function load(props: PageProps<'/[lang]/[[...path]]'>): Promise<{ l: Locale; r: Route }> {
  const { lang, path } = await props.params
  if (!hasLocale(lang)) notFound()
  const url = `/${[lang, ...(path ?? [])].join('/')}/`
  const r = resolve(url)
  if (!r) notFound()
  return { l: lang, r }
}

const f = (l: Locale) => ({ d: (m: number) => fmtDistance(m, l), eur: (n: number) => eur(n, l), date: (s: string) => fmtDate(s, l), n: (n: number) => String(n) })

export async function generateMetadata(props: PageProps<'/[lang]/[[...path]]'>): Promise<Metadata> {
  const { l, r } = await load(props)
  const e = editorial(l)
  const pg = r.page
  switch (pg.type) {
    case 'home': { const c = e.home(); return { ...pageMeta(r, l, c.title, c.meta), title: { absolute: c.title } } }
    case 'country': { const t = ui(l); return pageMeta(r, l, t.countryH1(COUNTRY.name[l]), t.countryLede(COUNTRY.name[l]), CITY_PHOTO) }
    case 'city': { const c = e.city(Object.fromEntries(POIS.filter((p) => p.view).map((p) => [p.id, viewHotels(p.id).length]))); return pageMeta(r, l, c.title, c.meta, CITY_PHOTO) }
    case 'method': { const c = e.method(); return pageMeta(r, l, c.title, c.meta) }
    case 'view': { const c = e.view(pg.poi.id, viewStats(pg.poi.id), f(l)); return pageMeta(r, l, c.title, c.meta, LANDMARK_PHOTO[pg.poi.id] ?? viewHotels(pg.poi.id)[0]?.image) }
    case 'near': { const c = e.near(pg.poi.id, nearStats(pg.poi.id), f(l)); return pageMeta(r, l, c.title, c.meta, LANDMARK_PHOTO[pg.poi.id]) }
    case 'category': {
      const hs = categoryHotels(pg.cat.id)
      const date = fmtDate(hs.find((h) => h.offer)?.offer?.checkIn ?? '2026-11-12', l)
      const title = `${pg.cat.name[l]} ${l === 'es' ? 'en' : 'in'} ${CITY.name[l]} (${hs.length})`
      return pageMeta(r, l, title, categoryCopy(l, pg.cat.id).lede({ n: hs.length, city: CITY.name[l], max: eur(BUDGET_MAX, l), date }))
    }
    case 'guides': return pageMeta(r, l, SECTION_UI[l].guides, SECTION_UI[l].guidesLede)
    case 'monuments': return pageMeta(r, l, pg.guide.copy[l].title, pg.guide.copy[l].meta)
    case 'guide': return pageMeta(r, l, pg.guide.copy[l].title, pg.guide.copy[l].meta)
    case 'car': return pageMeta(r, l, carCopy(l).title, carCopy(l).meta)
    case 'hotel': {
      const c = e.hotel(pg.hotel.name, hotelViewPois(pg.hotel), f(l))
      return pageMeta(r, l, c.title, c.meta, pg.hotel.image)
    }
  }
}

export default async function Page(props: PageProps<'/[lang]/[[...path]]'>) {
  const { l, r } = await load(props)
  const pg = r.page
  return (
    <>
      <Header l={l} route={r} />
      {pg.type === 'home' && <HomePage l={l} />}
      {pg.type === 'country' && <CountryPage l={l} />}
      {pg.type === 'city' && <CityPage l={l} />}
      {pg.type === 'method' && <MethodPage l={l} />}
      {pg.type === 'view' && <ViewPage l={l} r={r} p={pg.poi} />}
      {pg.type === 'near' && <NearPage l={l} r={r} p={pg.poi} />}
      {pg.type === 'hotel' && <HotelPage l={l} h={pg.hotel} />}
      {pg.type === 'category' && <CategoryPage l={l} r={r} cat={pg.cat} />}
      {pg.type === 'guides' && <GuidesIndex l={l} />}
      {pg.type === 'monuments' && <MonumentsGuidePage l={l} r={r} g={pg.guide} />}
      {pg.type === 'guide' && <GuidePage l={l} r={r} g={pg.guide} />}
      {pg.type === 'car' && <CarRentalPage l={l} r={r} />}
      <Footer l={l} />
    </>
  )
}
