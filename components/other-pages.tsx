import Link from 'next/link'
import { type Locale, fmtDistance, fmtDate, fmtNum, fmtScore } from '@/lib/i18n'
import { ui } from '@/lib/ui'
import { editorial } from '@/data/editorial'
import { POIS, CITY, COUNTRY, viewHotels, bestView, shownViews, hotelViewPois, poi, nearHotels, DATA_DATE, type Hotel } from '@/lib/data'
import { href, route, type Route } from '@/lib/routes'
import { hotelLink } from '@/lib/site'
import { abs } from '@/lib/seo'
import { LANDMARK_PHOTO, CITY_PHOTO, HOME_PHOTO, SOON } from '@/lib/photos'
import { Breadcrumbs, JsonLd, type Crumb } from '@/components/chrome'
import { Cards, Guide, Faq, faqLd, Chips, H2, Wrap } from '@/components/blocks'
import { Stars, eur } from '@/components/hotel-card'
import MapView from '@/components/map-view'

const bare = (s: string) => s.replace(/^(the|el|la|die|der|das|los|les) /i, '')
const photoFor = (id: string) => LANDMARK_PHOTO[id] ?? viewHotels(id)[0]?.image ?? CITY_PHOTO
const crumbLd = (items: Crumb[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
})

function LandmarkTile({ l, id, big = false }: { l: Locale; id: string; big?: boolean }) {
  const t = ui(l)
  const p = poi(id)
  const n = viewHotels(id).length
  const r = route(`view:${id}`)!
  return (
    <Link href={r.paths[l]} className="group block rounded-[20px] bg-paper p-2 transition-shadow hover:shadow-[0_12px_30px_rgba(20,30,60,.12)]">
      <div className={`relative overflow-hidden rounded-[14px] bg-[#DDE3EE] ${big ? 'h-[260px]' : 'h-[200px]'}`}>
        <img src={photoFor(id)} alt={bare(p.name[l])} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="px-2 pb-2 pt-3">
        <div className="text-[17px] font-bold">{bare(p.name[l]).replace(/^./, (c) => c.toUpperCase())}</div>
        <div className="mt-1 text-[13px] font-semibold text-sky">{t.hotelsWithView(n)}</div>
      </div>
    </Link>
  )
}

export function HomePage({ l }: { l: Locale }) {
  const t = ui(l)
  const c = editorial(l).home()
  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Wake Up With A View', url: abs(href('home', l)), inLanguage: l }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Organization', name: 'Wake Up With A View', url: abs('/') }} />
      <section className="bg-sky px-4 pb-[150px] pt-[72px] text-white sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-3.5 text-sm font-semibold opacity-85">{t.tagline}</div>
          <h1 className="balance max-w-[900px] text-[clamp(40px,7vw,84px)] font-extrabold leading-none tracking-[-0.04em]">
            {t.heroA} <span className="text-peach">{t.heroB}</span>
          </h1>
        </div>
      </section>
      <div className="mx-auto -mt-[100px] max-w-[1200px] px-4 sm:px-6">
        <div className="rounded-3xl bg-paper p-5 shadow-[0_20px_50px_rgba(20,30,60,.12)] sm:p-7">
          <div className="mb-4 text-[22px] font-bold">{t.searchQ} <span className="italic text-sun">{t.searchQem}</span></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-[2] rounded-[14px] bg-canvas px-4.5 py-4 font-medium text-muted">◎ {t.searchPlaceholder}</div>
            <Link href={href('view:eiffel-tower', l)} className="rounded-full bg-sun px-8 py-4 text-center font-bold text-white hover:bg-sun-dark">{t.findView}</Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {POIS.filter((p) => p.view && viewHotels(p.id).length).map((p) => (
              <Link key={p.id} href={href(`view:${p.id}`, l)} className="rounded-full border border-rule px-3.5 py-1.5 text-[13px] font-semibold text-sky hover:border-sky">{bare(p.name[l]).replace(/^./, (x) => x.toUpperCase())}</Link>
            ))}
            {SOON.map((s) => <span key={s.landmark} className="rounded-full border border-rule px-3.5 py-1.5 text-[13px] font-semibold text-faint">{s.landmark} · {t.soon}</span>)}
          </div>
        </div>
      </div>

      <Wrap className="pb-6 pt-16">
        <div className="mb-5 flex items-end justify-between gap-3">
          <H2>{t.wakeUpTo}</H2>
          <div className="text-sm text-muted">{t.moreSoon}</div>
        </div>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <Link href={href('city', l)} className="block rounded-[20px] bg-paper p-2">
            <div className="relative h-[260px] overflow-hidden rounded-[14px] bg-[#DDE3EE]">
              <img src={HOME_PHOTO} alt={CITY.name[l]} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-ok px-2.5 py-1 text-xs font-bold text-white">{t.live}</span>
            </div>
            <div className="px-2.5 pb-2.5 pt-3.5"><div className="text-lg font-bold">{bare(poi('eiffel-tower').name[l])}</div><div className="text-sm text-muted">{CITY.name[l]}</div></div>
          </Link>
          {SOON.map((s) => (
            <div key={s.landmark} className="rounded-[20px] bg-paper p-2 opacity-90">
              <div className="relative h-[260px] overflow-hidden rounded-[14px] bg-[#DDE3EE]">
                <img src={s.photo} alt={s.landmark} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[35%]" />
                <span className="absolute left-3 top-3 rounded-full bg-faint px-2.5 py-1 text-xs font-bold text-white">{t.soon}</span>
              </div>
              <div className="px-2.5 pb-2.5 pt-3.5"><div className="text-lg font-bold">{s.landmark}</div><div className="text-sm text-muted">{s.city}</div></div>
            </div>
          ))}
        </div>
      </Wrap>

      <Wrap className="pt-10"><Cards cards={c.cards} /></Wrap>
      <Wrap className="pb-20 pt-12">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {c.sections.map((s, i) => (
            <div key={s.h} className="rounded-[20px] bg-paper p-7">
              <div className="text-[13px] font-bold text-sky">0{i + 1}</div>
              <div className="mb-2 mt-2.5 text-xl font-extrabold tracking-[-0.02em]">{s.h}</div>
              <p className="text-[15px] leading-[1.55] text-muted">{s.p[0]}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">{c.lede} <Link href={href('method', l)} className="font-semibold text-sky">{t.methodLink} →</Link></p>
      </Wrap>
    </main>
  )
}

export function CityPage({ l }: { l: Locale }) {
  const t = ui(l)
  const counts = Object.fromEntries(POIS.filter((p) => p.view).map((p) => [p.id, viewHotels(p.id).length]))
  const c = editorial(l).city(counts)
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: COUNTRY.name[l], href: href('country', l) }, { name: CITY.name[l], href: href('city', l) }]
  const views = POIS.filter((p) => p.view && viewHotels(p.id).length).sort((a, b) => viewHotels(b.id).length - viewHotels(a.id).length)
  const featured = views.map((p) => viewHotels(p.id).find((h) => bestView(h, p.id)?.confidence === 'HIGH') ?? viewHotels(p.id)[0]).map((h, i) => ({ h, p: views[i] }))
    .filter((x, i, a) => x.h && a.findIndex((y) => y.h.id === x.h.id) === i).slice(0, 6)
  const nearPois = POIS.filter((p) => p.near)

  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      {c.faq.length > 0 && <JsonLd data={faqLd(c.faq)} />}
      <Wrap className="pt-6">
        <div className="relative flex h-[380px] items-end overflow-hidden rounded-[28px] bg-[#334] p-6 text-white sm:h-[440px] sm:p-9">
          <img src={CITY_PHOTO} alt={CITY.name[l]} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,14,30,.75)] via-[rgba(10,14,30,.15)] to-transparent" />
          <div className="relative">
            <div className="text-sm font-semibold opacity-85"><Link href={href('home', l)}>{t.home}</Link> / <Link href={href('country', l)}>{COUNTRY.name[l]}</Link> / {CITY.name[l]}</div>
            <h1 className="mt-2 text-[clamp(38px,6vw,72px)] font-extrabold leading-none tracking-[-0.04em]">
              {c.h1.replace(/ (in|en) (Paris|París)$/, '')}<br /><span className="text-peach">{l === 'de' ? 'in Paris' : l === 'es' ? 'en París' : 'in Paris'}</span>
            </h1>
          </div>
        </div>
        <p className="mt-6 max-w-[820px] text-[17px] leading-[1.65] text-muted">{c.lede}</p>
      </Wrap>

      <Wrap className="pt-10">
        <H2 className="mb-5">{t.whatToWakeUp}</H2>
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {views.map((p) => <LandmarkTile key={p.id} l={l} id={p.id} />)}
        </div>
      </Wrap>

      <Wrap className="pt-12">
        <div className="mb-5 flex items-end justify-between gap-3">
          <H2>{t.cityHotelsWithView}</H2>
          <Link href={href('view:eiffel-tower', l)} className="text-sm font-semibold text-sun">{t.seeAll}</Link>
        </div>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))]">
          {featured.map(({ h, p }) => {
            const v = bestView(h, p.id)!
            const hp = route(`hotel:${h.id}`)
            return (
              <Link key={h.id} href={hp ? hp.paths[l] : href(`view:${p.id}`, l)} className="block rounded-[20px] bg-paper p-2">
                <div className="relative h-[180px] overflow-hidden rounded-[14px] bg-[#DDE3EE]">
                  {h.image && <img src={h.image} alt={h.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-ok px-2.5 py-1 text-xs font-bold text-white">{bare(p.name[l]).replace(/^./, (x) => x.toUpperCase())}</span>
                </div>
                <div className="px-2 pb-2 pt-3">
                  <div className="flex justify-between gap-2"><div className="font-bold">{h.name}</div>{h.rating && <div className="text-sm font-bold"><span className="text-star">★</span> {fmtScore(h.rating, l)}</div>}</div>
                  <div className="mt-1 text-[13px] text-muted">{v.source === 'room_name' ? t.ctx.ROOM_NAMED : t.ctx[v.context]}{h.distances[p.id] != null ? ` · ${fmtDistance(h.distances[p.id], l)}` : ''}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </Wrap>

      <Wrap className="pt-12"><Cards cards={c.cards} /></Wrap>
      <Wrap className="pt-10"><Guide sections={c.sections} /></Wrap>
      <Wrap className="pt-12">
        <h2 className="mb-4 text-[22px] font-extrabold">{t.stayNear}</h2>
        <Chips items={nearPois.map((p) => ({ label: `${t.hotelsNear(bare(p.name[l]))} · ${nearHotels(p.id).length}`, href: route(`near:${p.id}`)!.paths[l] }))} />
      </Wrap>
      <Wrap className="pb-20 pt-12">
        <H2 className="mb-4">{t.goodToKnow}</H2>
        <Faq items={c.faq} />
      </Wrap>
    </main>
  )
}

export function MethodPage({ l }: { l: Locale }) {
  const t = ui(l)
  const c = editorial(l).method()
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: c.h1, href: href('method', l) }]
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="balance mb-3 mt-2.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[52px]">{c.h1}</h1>
        <p className="max-w-[760px] text-[17px] leading-[1.6] text-muted">{c.lede}</p>
      </Wrap>
      <Wrap className="pt-8"><Cards cards={c.cards} /></Wrap>
      <Wrap className="pt-8"><Guide sections={c.sections} /></Wrap>
      <Wrap className="pb-20 pt-6"><p className="text-sm text-muted">{t.lastChecked(fmtDate(DATA_DATE, l))}</p></Wrap>
    </main>
  )
}

export function HotelPage({ l, h }: { l: Locale; h: Hotel }) {
  const t = ui(l)
  const vp = hotelViewPois(h)
  const main = vp[0]
  const cr: Crumb[] = [
    { name: t.home, href: href('home', l) }, { name: COUNTRY.name[l], href: href('country', l) }, { name: CITY.name[l], href: href('city', l) },
    { name: bare(poi(main).name[l]), href: href(`view:${main}`, l) }, { name: h.name, href: route(`hotel:${h.id}`)!.paths[l] },
  ]
  const nearby = Object.entries(h.distances).sort((a, b) => a[1] - b[1]).slice(0, 7)
  const am = Object.entries(h.amenities).filter(([, v]) => v)
  const AM: Record<string, Record<Locale, string>> = {
    balcony: { en: 'Balcony', es: 'Balcón', de: 'Balkon' }, terrace: { en: 'Terrace', es: 'Terraza', de: 'Terrasse' }, rooftop: { en: 'Rooftop', es: 'Azotea', de: 'Dachterrasse' },
    restaurant: { en: 'Restaurant', es: 'Restaurante', de: 'Restaurant' }, bar: { en: 'Bar', es: 'Bar', de: 'Bar' }, spa: { en: 'Spa', es: 'Spa', de: 'Spa' },
    pool: { en: 'Pool', es: 'Piscina', de: 'Pool' }, gym: { en: 'Fitness', es: 'Gimnasio', de: 'Fitness' }, parking: { en: 'Parking', es: 'Aparcamiento', de: 'Parkplatz' },
    airConditioning: { en: 'Air conditioning', es: 'Aire acondicionado', de: 'Klimaanlage' }, familyRooms: { en: 'Family rooms', es: 'Habitaciones familiares', de: 'Familienzimmer' },
    petFriendly: { en: 'Pets allowed', es: 'Admite mascotas', de: 'Haustiere erlaubt' }, accessible: { en: 'Accessible', es: 'Accesible', de: 'Barrierefrei' },
  }
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Hotel', name: h.name, url: abs(route(`hotel:${h.id}`)!.paths[l]),
        ...(h.image ? { image: h.image } : {}), ...(h.address ? { address: h.address } : {}),
        geo: { '@type': 'GeoCoordinates', latitude: h.lat, longitude: h.lng },
        ...(h.stars ? { starRating: { '@type': 'Rating', ratingValue: h.stars } } : {}),
        amenityFeature: am.map(([k]) => ({ '@type': 'LocationFeatureSpecification', name: AM[k]?.en ?? k, value: true })),
      }} />
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <div className="mt-3 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-2 gap-2">
            {h.images.slice(0, 3).map((src, i) => (
              <img key={src} src={src} alt={`${h.name} ${i + 1}`} className={`w-full rounded-[18px] object-cover ${i === 0 ? 'col-span-2 h-[300px]' : 'h-[150px]'}`} loading={i ? 'lazy' : 'eager'} />
            ))}
            <p className="col-span-2 text-xs text-faint">{t.photoNote}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-[20px] bg-paper p-6">
            <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.03em]">{h.name}</h1>
            <div className="flex items-center gap-3"><Stars n={h.stars} />{h.rating && <span className="rounded-lg bg-sky px-2 py-1 text-sm font-extrabold text-white">{fmtScore(h.rating, l)}</span>}<span className="text-sm text-muted">{t.reviews(fmtNum(h.reviews, l))}</span></div>
            {h.address && <div className="text-sm text-muted"><span className="font-semibold text-ink">{t.address}:</span> {h.address}</div>}
            {h.offer && <div className="text-sm text-muted">{t.priceNote(eur(h.offer.from, l), fmtDate(h.offer.checkIn, l))}</div>}
            <a href={hotelLink(h, { city: 'paris', landmark: main, hotelId: h.id, lang: l, pageType: 'hotel' })} target="_blank" rel="sponsored nofollow noopener" className="mt-auto rounded-full bg-sun px-5 py-3.5 text-center font-bold text-white hover:bg-sun-dark">{t.seeRooms}</a>
          </div>
        </div>
      </Wrap>

      <Wrap className="pt-10">
        <H2 className="mb-4">{t.views}</H2>
        <div className="grid gap-4 md:grid-cols-2">
          {vp.map((id) => {
            const vs = shownViews(h, id)
            const best = bestView(h, id)!
            return (
              <div key={id} className="rounded-[20px] bg-paper p-6">
                <Link href={href(`view:${id}`, l)} className="text-lg font-extrabold text-ok hover:underline">{bare(poi(id).name[l]).replace(/^./, (x) => x.toUpperCase())}</Link>
                <div className="mt-1 text-sm font-semibold">{best.source === 'room_name' ? t.ctx.ROOM_NAMED : t.ctx[best.context]} · <span className="text-muted">{t.conf[best.confidence]}</span></div>
                <ul className="mt-3 space-y-1.5 border-l-2 border-sky-soft pl-3 text-[13px] text-muted">
                  {vs.map((v) => <li key={v.sourceText} className="font-mono">“{v.sourceText}”</li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </Wrap>

      <Wrap className="grid gap-5 pt-10 lg:grid-cols-2">
        <div className="rounded-[20px] bg-paper p-6">
          <h2 className="mb-3 text-xl font-extrabold">{t.whatsNearby}</h2>
          <ul className="divide-y divide-rule">
            {nearby.map(([id, d]) => {
              const r = route(`view:${id}`) ?? route(`near:${id}`)
              const name = bare(poi(id).name[l]).replace(/^./, (x) => x.toUpperCase())
              return <li key={id} className="flex justify-between py-2.5 text-[15px]">{r ? <Link href={r.paths[l]} className="font-semibold hover:text-sky">{name}</Link> : <span className="font-semibold">{name}</span>}<span className="text-muted">{fmtDistance(d, l)}</span></li>
            })}
          </ul>
          <h2 className="mb-3 mt-7 text-xl font-extrabold">{t.amenities}</h2>
          <div className="flex flex-wrap gap-1.5">{am.map(([k]) => <span key={k} className="rounded-full bg-ok-soft px-3 py-1 text-xs font-semibold text-ok">{AM[k]?.[l] ?? k} ✓</span>)}</div>
          <p className="mt-3 text-xs text-faint">{t.lastChecked(fmtDate(h.lastScrapedAt, l))}</p>
        </div>
        <MapView center={{ lat: poi(main).lat, lng: poi(main).lng }} label={poi(main).name[l]} pins={[{ n: 1, lat: h.lat, lng: h.lng, name: h.name, view: true }]} legend={{ view: t.mapLegendView, near: t.mapLegendNear }} />
      </Wrap>
      <div className="pb-20" />
    </main>
  )
}

export function CountryPage({ l }: { l: Locale }) {
  const t = ui(l)
  const cr: Crumb[] = [{ name: t.home, href: href('home', l) }, { name: COUNTRY.name[l], href: href('country', l) }]
  const views = POIS.filter((p) => p.view && viewHotels(p.id).length)
  const total = new Set(views.flatMap((p) => viewHotels(p.id).map((h) => h.id))).size
  return (
    <main>
      <JsonLd data={crumbLd(cr)} />
      <Wrap className="pt-8">
        <Breadcrumbs items={cr} />
        <h1 className="balance mb-3 mt-2.5 text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[52px]">{t.countryH1(COUNTRY.name[l])}</h1>
        <p className="max-w-[760px] text-[17px] leading-[1.6] text-muted">{t.countryLede(COUNTRY.name[l])}</p>
      </Wrap>
      <Wrap className="pt-10">
        <H2 className="mb-5">{t.citiesIn(COUNTRY.name[l])}</H2>
        <Link href={href('city', l)} className="grid overflow-hidden rounded-[20px] bg-paper p-2 sm:grid-cols-[1.2fr_1fr]">
          <div className="relative h-[240px] overflow-hidden rounded-[14px] bg-[#DDE3EE]">
            <img src={CITY_PHOTO} alt={CITY.name[l]} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-ok px-2.5 py-1 text-xs font-bold text-white">{t.live}</span>
          </div>
          <div className="flex flex-col justify-center gap-2 p-6">
            <div className="text-[28px] font-extrabold tracking-[-0.03em]">{CITY.name[l]}</div>
            <div className="text-sm font-semibold text-sky">{t.hotelsWithView(total)}</div>
            <div className="text-sm text-muted">{views.map((p) => bare(p.name[l]).replace(/^./, (x) => x.toUpperCase())).join(' · ')}</div>
          </div>
        </Link>
      </Wrap>
      <Wrap className="pb-20 pt-12">
        <H2 className="mb-5">{t.landmarksIn}</H2>
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {views.map((p) => <LandmarkTile key={p.id} l={l} id={p.id} />)}
        </div>
      </Wrap>
    </main>
  )
}
