import Link from 'next/link'
import { ACTIVE, LOCALE_NAME, PLANNED, type Locale } from '@/lib/i18n'
import { href, type Route } from '@/lib/routes'
import { ui } from '@/lib/ui'
import { SITE_NAME } from '@/lib/site'
import { COUNTRY, CITY, POIS, viewHotels } from '@/lib/data'

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-sky">
        <span className="h-3.5 w-3.5 rounded-full bg-dot" style={{ boxShadow: '0 5px 0 -2px #fff' }} />
      </span>
      <span className="text-[17px] font-extrabold tracking-[-0.02em]">{SITE_NAME}</span>
    </span>
  )
}

const LIVE_VIEWS = POIS.filter((p) => p.view && viewHotels(p.id).length)
const cap = (x: string) => x.replace(/^(the|el|la|die|der|das|los|les) /i, '').replace(/^./, (c) => c.toUpperCase())

export function Header({ l, route }: { l: Locale; route: Route }) {
  const t = ui(l)
  const tab = (key: string) => `rounded-full px-3.5 py-2 text-sm font-semibold ${route.key === key ? 'bg-sky-soft' : 'hover:bg-canvas'}`
  return (
    <header className="sticky top-0 z-[1000] border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={href('home', l)} aria-label={SITE_NAME}><Logo /></Link>
        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Main">
          <details className="group relative">
            <summary className={`${tab('')} cursor-pointer list-none`}>{t.nav.destinations} <span className="text-faint group-open:rotate-180 inline-block transition-transform">▾</span></summary>
            <div className="fixed inset-x-3 top-[118px] max-h-[75vh] overflow-auto rounded-3xl border border-rule bg-paper p-5 shadow-[0_20px_50px_rgba(20,30,60,.15)] sm:absolute sm:inset-x-auto sm:left-0 sm:top-auto sm:mt-2 sm:w-[560px]">
              <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                <div>
                  <Link href={href('country', l)} className="text-xs font-extrabold uppercase tracking-[.08em] text-sun hover:underline">{COUNTRY.name[l]}</Link>
                  <Link href={href('city', l)} className="mt-2 flex items-center justify-between rounded-2xl bg-sky-soft px-4 py-3 text-lg font-extrabold text-sky">{CITY.name[l]} <span className="text-sm font-semibold">→</span></Link>
                  <ul className="mt-2 grid grid-cols-2 gap-1">
                    {LIVE_VIEWS.map((p) => (
                      <li key={p.id}>
                        <Link href={href(`view:${p.id}`, l)} className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-canvas">
                          {cap(p.name[l])} <span className="text-xs font-medium text-faint">{viewHotels(p.id).length}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-rule pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <div className="text-xs font-extrabold uppercase tracking-[.08em] text-faint">{t.nav.soonTitle}</div>
                  <ul className="mt-2 space-y-2.5">
                    {t.soonPlaces.map((x) => (
                      <li key={x.city} className="text-sm"><div className="font-bold text-muted">{x.city}</div><div className="text-xs text-faint">{x.country}</div></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
          <Link className={`${tab('country')} hidden md:inline-block`} href={href('country', l)}>{COUNTRY.name[l]}</Link>
          <Link className={tab('city')} href={href('city', l)}>{CITY.name[l]}</Link>
          <Link className={`${tab('method')} hidden lg:inline-block`} href={href('method', l)}>{t.nav.method}</Link>
          <details className="relative ml-1">
            <summary className="cursor-pointer list-none rounded-full border border-rule px-3 py-2 text-[13px] font-semibold text-muted" aria-label={t.langLabel}>
              {l.toUpperCase()} ▾
            </summary>
            <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-rule bg-paper p-1.5 shadow-lg">
              {ACTIVE.map((x) => (
                <Link key={x} href={route.paths[x]} hrefLang={x} className={`block rounded-xl px-3 py-2 text-sm font-semibold ${x === l ? 'bg-sky-soft text-sky' : 'hover:bg-canvas'}`}>
                  {LOCALE_NAME[x]}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  )
}

export function Footer({ l }: { l: Locale }) {
  const t = ui(l)
  return (
    <footer className="mt-auto bg-ink px-4 py-10 text-[13px] text-[#A7ADB8] sm:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-[1fr_2fr_1fr]">
        <div>
          <div className="font-bold text-white">{SITE_NAME}</div>
          <div className="mt-1">{t.footerIndependent}</div>
        </div>
        <p className="leading-relaxed">
          {t.footerNote} <Link className="text-white underline underline-offset-2" href={href('method', l)}>{t.methodLink}</Link>
        </p>
        <div className="md:text-right">
          {[...ACTIVE, ...PLANNED].map((x) => x.toUpperCase()).join(' · ')}
        </div>
      </div>
    </footer>
  )
}

export type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
      {items.map((c, i) => (
        <span key={c.href}>
          {i > 0 && <span className="mx-1.5 text-faint">/</span>}
          {i < items.length - 1 ? <Link href={c.href} className="text-sky hover:text-sun">{c.name}</Link> : <span aria-current="page">{c.name}</span>}
        </span>
      ))}
    </nav>
  )
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
