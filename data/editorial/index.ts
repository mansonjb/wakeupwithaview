import type { Locale } from '@/lib/i18n'
import type { Editorial } from './types'
import { en } from './en'
import { es } from './es'
import { de } from './de'

export const EDITORIAL: Record<Locale, Editorial> = { en, es, de }
export const editorial = (l: Locale) => EDITORIAL[l]
export type { PageCopy } from './types'
