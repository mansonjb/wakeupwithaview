import Link from 'next/link'
import { type Locale, fmtDistance, fmtDate, fmtNum, fmtScore, walkMinutes } from '@/lib/i18n'
import { ui } from '@/lib/ui'
import { bestView, shownViews, poi, type Hotel } from '@/lib/data'
import { hotelLink, type TrackCtx } from '@/lib/site'
import { route } from '@/lib/routes'

const eur = (n: number, l: Locale) => new Intl.NumberFormat(l === 'en' ? 'en-IE' : l === 'es' ? 'es-ES' : 'de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export function Stars({ n }: { n: number | null }) {
  if (!n) return null
  return <span className="text-[13px] tracking-[1px] text-star" aria-label={`${n}-star`}>{'★'.repeat(n)}</span>
}

function Tri({ label, v, l }: { label: string; v: true | null | undefined; l: Locale }) {
  const t = ui(l)
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${v ? 'bg-ok-soft text-ok' : 'bg-canvas text-muted'}`}>
      {label} {v ? '✓' : <span className="font-medium text-faint">· {t.unknown}</span>}
    </span>
  )
}

/** One hotel, in VIEW or NEAR mode. The CTA goes to the affiliate layer with full tracking context. */
export function HotelCard({ h, l, poiId, mode, pos, city = 'paris', compact = false }: {
  h: Hotel; l: Locale; poiId: string; mode: 'view' | 'near'; pos: number; city?: string
  /** hide amenity chips that are unknown (they stay UNKNOWN in data, only not displayed) */
  compact?: boolean
}) {
  const t = ui(l)
  const lm = poi(poiId)
  const v = bestView(h, poiId)
  const d = h.distances[poiId]
  const page = route(`hotel:${h.id}`)
  const ctx = v ? (v.source === 'room_name' ? (v.roomHasBalcony ? 'BALCONY_ROOM' : 'ROOM') : v.context) : undefined
  const track: TrackCtx = { city, landmark: poiId, hotelId: h.id, lang: l, pageType: mode, viewContext: ctx, position: pos }
  const roomViews = shownViews(h, poiId).filter((x) => x.source === 'room_name')
  const balcony = roomViews.some((x) => x.roomHasBalcony) ? true : h.amenities.balcony

  const viewLine = v
    ? [
        `${lm.name[l].replace(/^(the|el|la|die|der|das|los|les) /i, (m) => m.charAt(0).toUpperCase() + m.slice(1))}`,
        v.source === 'room_name' ? t.ctx.ROOM_NAMED : t.ctx[v.context] ?? t.ctx.UNKNOWN,
      ].join(' · ')
    : null
  const flags = v ? [v.partial && t.partial, v.alternative && t.alternative, v.highFloor && t.highFloor, v.some && t.some].filter(Boolean) : []

  return (
    <article id={`h-${pos}`} className="grid scroll-mt-24 grid-cols-1 gap-3.5 rounded-[20px] bg-paper p-2 sm:grid-cols-[minmax(150px,210px)_minmax(0,1fr)]">
      <div className="relative min-h-[190px] overflow-hidden rounded-[14px] bg-[#DDE3EE]">
        {h.image && <img src={h.image} alt={h.name} loading={pos <= 2 ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover" />}
        <span className="absolute left-2.5 top-2.5 rounded-full bg-paper px-2.5 py-1 text-xs font-extrabold">#{String(pos).padStart(2, '0')}</span>
        {mode === 'near' && v && <span className="absolute bottom-2.5 left-2.5 rounded-full bg-ok px-2.5 py-1 text-xs font-bold text-white">{t.hasView}</span>}
      </div>

      <div className="flex min-w-0 flex-col gap-2 p-2 sm:pl-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[17px] font-extrabold leading-tight">
              {page ? <Link href={page.paths[l]} className="hover:text-sky">{h.name}</Link> : h.name}
            </h3>
            <Stars n={h.stars} />
          </div>
          {h.rating && (
            <div className="shrink-0 text-right">
              <div className="inline-block rounded-lg bg-sky px-2 py-1 text-sm font-extrabold text-white">{fmtScore(h.rating, l)}</div>
              <div className="mt-0.5 text-[11px] text-muted">{t.reviews(fmtNum(h.reviews, l))}</div>
            </div>
          )}
        </div>

        {mode === 'view' ? (
          <>
            <div className="text-sm font-bold text-ok">{viewLine}</div>
            {flags.length > 0 && <div className="text-xs font-semibold text-sun-dark">{flags.join(' · ')}</div>}
            {d != null && <div className="text-[13px] text-muted">{t.fromLm(fmtDistance(d, l), lm.name[l])} ({t.straight})</div>}
          </>
        ) : (
          <>
            <div className="text-sm font-bold">{fmtDistance(d, l)} <span className="font-medium text-muted">· {t.walkEst(walkMinutes(d))}</span></div>
            <div className={`text-[13px] font-semibold ${v ? 'text-ok' : 'text-faint'}`}>{v ? viewLine : t.viewNotConfirmed}</div>
          </>
        )}

        {v && (
          <details className="group text-[13px]">
            <summary className="cursor-pointer list-none font-semibold text-sky">
              {t.conf[v.confidence]} <span className="text-faint group-open:hidden">▸</span><span className="hidden text-faint group-open:inline">▾</span>
            </summary>
            <ul className="mt-1.5 space-y-1 border-l-2 border-sky-soft pl-3 text-muted">
              {(roomViews.length ? roomViews.slice(0, 4) : [v]).map((x) => (
                <li key={x.sourceText}><span className="font-mono text-[12px]">“{x.sourceText.length > 160 ? x.sourceText.slice(0, 157) + '…' : x.sourceText}”</span></li>
              ))}
            </ul>
          </details>
        )}

        <div className="flex flex-wrap gap-1.5">
          {([[t.balcony, balcony], [t.terrace, h.amenities.terrace], [t.rooftop, h.amenities.rooftop]] as const)
            .filter(([, v]) => !compact || v)
            .map(([label, v]) => <Tri key={label} label={label} v={v} l={l} />)}
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
          <div className="text-[12px] leading-snug text-muted">
            {h.offer ? (
              <>
                <span className="text-[15px] font-extrabold text-ink">
                  {mode === 'view' && h.viewOffers[poiId] ? t.viewPrice(eur(h.viewOffers[poiId], l)) : `${t.from} ${eur(h.offer.from, l)}`}
                </span>
                <br />
                {fmtDate(h.offer.checkIn, l)} · {t.adults} · {t.lastChecked(fmtDate(h.offer.retrievedAt, l))}
              </>
            ) : t.checkPrice}
          </div>
          <a href={hotelLink(h, track)} target="_blank" rel="sponsored nofollow noopener" className="rounded-full bg-sun px-4.5 py-2.5 text-sm font-bold text-white hover:bg-sun-dark">
            {t.checkAvailability}
          </a>
        </div>
      </div>
    </article>
  )
}

export { eur }
