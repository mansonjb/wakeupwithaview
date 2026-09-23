// Every locale is prefixed (/en/, /es/, /de/...). ACTIVE locales are built and indexed,
// PLANNED ones exist in the model (slugs, copy slots) and go live by moving them to ACTIVE.
export const ACTIVE = ['en', 'es', 'de'] as const
export const PLANNED = ['pt', 'pl', 'fr'] as const
export type Locale = (typeof ACTIVE)[number]
export type AnyLocale = Locale | (typeof PLANNED)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const hasLocale = (v: string): v is Locale => (ACTIVE as readonly string[]).includes(v)

/** Localized string. Every active locale is required, planned ones are optional. */
export type L = Record<Locale, string> & Partial<Record<(typeof PLANNED)[number], string>>

export const HTML_LANG: Record<Locale, string> = { en: 'en', es: 'es', de: 'de' }
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_ES', de: 'de_DE' }
export const LOCALE_NAME: Record<Locale, string> = { en: 'English', es: 'Español', de: 'Deutsch' }
/** Number and date formatting locale per site language. */
export const INTL: Record<Locale, string> = { en: 'en-GB', es: 'es-ES', de: 'de-DE' }

export function fmtDistance(m: number, l: Locale) {
  const n = new Intl.NumberFormat(INTL[l], { maximumFractionDigits: 1 })
  return m >= 1000 ? `${n.format(m / 1000)} km` : `${Math.round(m / 10) * 10} m`
}
/** Walking time estimate: straight line x 1.3 detour factor at 80 m per minute. Always labelled as an estimate. */
export const walkMinutes = (m: number) => Math.max(1, Math.round((m * 1.3) / 80))
export const fmtDate = (iso: string, l: Locale) =>
  new Intl.DateTimeFormat(INTL[l], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
export const fmtNum = (n: number, l: Locale) => new Intl.NumberFormat(INTL[l]).format(n)
export const fmtScore = (n: number, l: Locale) =>
  new Intl.NumberFormat(INTL[l], { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)
