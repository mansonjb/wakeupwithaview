import Link from 'next/link'
import { ACTIVE, LOCALE_NAME, PLANNED, type Locale } from '@/lib/i18n'
import { href, type Route } from '@/lib/routes'
import { ui } from '@/lib/ui'
import { SITE_NAME } from '@/lib/site'

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

export function Header({ l, route }: { l: Locale; route: Route }) {
  const t = ui(l)
  const tab = (key: string) => `rounded-full px-3.5 py-2 text-sm font-semibold ${route.key === key ? 'bg-sky-soft' : 'hover:bg-canvas'}`
  return (
    <header className="sticky top-0 z-[1000] border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href={href('home', l)} aria-label={SITE_NAME}><Logo /></Link>
        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Main">
          <Link className={tab('city')} href={href('city', l)}>{t.nav.city}</Link>
          <Link className={tab('view:eiffel-tower')} href={href('view:eiffel-tower', l)}>{l === 'de' ? 'Eiffelturm' : l === 'es' ? 'Torre Eiffel' : 'Eiffel Tower'}</Link>
          <Link className={`${tab('method')} hidden sm:inline-block`} href={href('method', l)}>{t.nav.method}</Link>
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
