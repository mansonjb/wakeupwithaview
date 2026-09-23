import Link from 'next/link'
import type { Card, Section, QA } from '@/data/editorial/types'

export function H2({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`balance text-[26px] font-extrabold tracking-[-0.03em] sm:text-[30px] ${className}`}>{children}</h2>
}

export function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 ${className}`}>{children}</section>
}

export function Cards({ cards }: { cards: Card[] }) {
  if (!cards.length) return null
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
      {cards.map((k) => (
        <div key={k.t} className="flex flex-col gap-2 rounded-[20px] bg-paper p-6">
          <div className="text-xs font-extrabold uppercase tracking-[.08em] text-sun">{k.tag}</div>
          <div className="text-[19px] font-extrabold tracking-[-0.02em]">{k.t}</div>
          <p className="text-[15px] leading-[1.55] text-muted [text-wrap:pretty]">{k.d}</p>
        </div>
      ))}
    </div>
  )
}

/** Long-form guide: one card per section, readable width, anchored headings. */
export function Guide({ sections }: { sections: Section[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {sections.map((s) => (
        <article key={s.h} className="rounded-[20px] bg-paper p-6 sm:p-8">
          <h3 className="balance mb-3 text-[21px] font-extrabold tracking-[-0.02em]">{s.h}</h3>
          <div className="prose-view">{s.p.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}</div>
        </article>
      ))}
    </div>
  )
}

export function Faq({ items }: { items: QA[] }) {
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((q) => (
        <details key={q.q} className="group rounded-2xl bg-paper px-5 py-4 open:pb-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-extrabold">
            <span>{q.q}</span><span className="text-sky group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="mt-2 text-[15px] leading-[1.6] text-muted [text-wrap:pretty]">{q.a}</p>
        </details>
      ))}
    </div>
  )
}

export const faqLd = (items: QA[]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
})

export function Chips({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((n) => (
        <Link key={n.href} href={n.href} className="rounded-full border border-rule bg-paper px-3.5 py-2 text-sm font-semibold hover:border-sky hover:text-sky">{n.label}</Link>
      ))}
    </div>
  )
}

export function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-[20px] bg-paper p-5">
      <div className="text-[34px] font-extrabold leading-none tracking-[-0.04em] text-sky">{n}</div>
      <div className="mt-2 text-[14px] leading-snug text-muted">{label}</div>
    </div>
  )
}
