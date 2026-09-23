import type { ViewStats } from '@/lib/stats'
import type { nearStats } from '@/lib/stats'

export type Card = { tag: string; t: string; d: string }
export type Section = { h: string; p: string[] }
export type QA = { q: string; a: string }

export type PageCopy = {
  title: string
  h1: string
  meta: string
  lede: string
  cards: Card[]
  sections: Section[]
  faq: QA[]
}

/** Helpers each locale receives so numbers are formatted once, the same way everywhere. */
export type Fmt = {
  d: (m: number) => string
  eur: (n: number) => string
  date: (iso: string) => string
  n: (n: number) => string
}

export type NearStats = ReturnType<typeof nearStats>

export type Editorial = {
  home: () => PageCopy
  city: (counts: Record<string, number>) => PageCopy
  method: () => PageCopy
  view: (poiId: string, s: ViewStats, f: Fmt) => PageCopy
  near: (poiId: string, s: NearStats, f: Fmt) => PageCopy
  /** ids of the landmarks the hotel has a shown view of; each locale picks its own grammatical form */
  hotel: (name: string, poiIds: string[], f: Fmt) => { title: string; meta: string }
}
