import Link from 'next/link'
import { ACTIVE, LOCALE_NAME, PLANNED, type Locale } from '@/lib/i18n'
import { href, type Route } from '@/lib/routes'
import { ui } from '@/lib/ui'
import { SITE_NAME } from '@/lib/site'
import { COUNTRY, CITY } from '@/lib/data'
import { CATEGORIES, categoryHotels } from '@/lib/categories'
import { SECTION_UI } from '@/lib/sections'

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

const PANEL = 'fixed inset-x-3 top-[118px] z-[1100] max-h-[75vh] overflow-auto rounded-3xl border border-rule bg-paper p-5 shadow-[0_20px_50px_rgba(20,30,60,.15)] sm:absolute sm:inset-x-auto sm:left-0 sm:top-auto sm:mt-2'

export function Header({ l, route }: { l: Locale; route: Route }) {
  const t = ui(l)
  const su = SECTION_UI[l]
  const tab = (key: string) => `rounded-full px-3.5 py-2 text-sm font-semibold ${route.key === key ? 'bg-sky-soft' : 'hover:bg-canvas'}`
  return (
    <header className="sticky top-0 z-[1000] border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={href('home', l)} aria-label={SITE_NAME}><Logo /></Link>
        <nav className="flex flex-wrap items-center gap-1" aria-label="Main">
          <details className="group relative">
            <summary className={`${tab('')} cursor-pointer list-none`}>{t.nav.destinations} <span className="inline-block text-faint transition-transform group-open:rotate-180">▾</span></summary>
            <div className={`${PANEL} sm:w-[440px]`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Link href={href('country', l)} className="text-xs font-extrabold uppercase tracking-[.08em] text-sun hover:underline">{COUNTRY.name[l]}</Link>
                  <Link href={href('city', l)} className="mt-2 flex items-center justify-between rounded-2xl bg-sky-soft px-4 py-3 text-base font-extrabold text-sky">{CITY.name[l]} <span className="text-sm">→</span></Link>
                </div>
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[.08em] text-faint">{t.nav.soonTitle}</div>
                  <ul className="mt-2 space-y-2">
                    {t.soonPlaces.map((x) => <li key={x.city} className="text-sm"><span className="font-bold text-muted">{x.city}</span> <span className="text-xs text-faint">· {x.country}</span></li>)}
                  </ul>
                </div>
              </div>
            </div>
          </details>
          <details className="group relative">
            <summary className={`${tab('')} cursor-pointer list-none`}>{su.categories} <span className="inline-block text-faint transition-transform group-open:rotate-180">▾</span></summary>
            <div className={`${PANEL} sm:w-[320px]`}>
              <ul className="grid gap-0.5">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link href={href(`cat:${c.id}`, l)} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-canvas">
                      <span><span className="mr-2 inline-block w-4 text-center text-sun">{c.icon}</span>{c.short[l]}</span>
                      <span className="text-xs text-faint">{categoryHotels(c.id).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <Link className={tab('guides')} href={href('guides', l)}>{su.guides}</Link>
          <Link className={`${tab('car')} hidden md:inline-block`} href={href('car', l)}>{su.car}</Link>
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
        <div className="flex flex-col gap-1.5 md:items-end">
          <Link className="hover:text-white" href={href('guides', l)}>{SECTION_UI[l].guides}</Link>
          <Link className="hover:text-white" href={href('car', l)}>{SECTION_UI[l].car}</Link>
          <Link className="hover:text-white" href={href('method', l)}>{t.methodLink}</Link>
          <span className="mt-2">{[...ACTIVE, ...PLANNED].map((x) => x.toUpperCase()).join(' · ')}</span>
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
