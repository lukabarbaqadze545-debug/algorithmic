import { clinic } from '../data/clinic'
import type { Lang } from '../i18n/types'
import { LANG_LABEL } from '../i18n/types'

export interface BookableDay {
  iso: string
  /** Noon UTC on that calendar day, safe to format with timeZone "UTC". */
  date: Date
}

/** Next `count` working days (Mon–Fri) after today, calendar-based in the clinic's time zone. */
export function nextWorkingDays(count = 10, now = new Date()): BookableDay[] {
  const todayIso = new Intl.DateTimeFormat('en-CA', { timeZone: clinic.hours.timeZone }).format(now)
  const [y, m, d] = todayIso.split('-').map(Number)
  const cursor = new Date(Date.UTC(y, m - 1, d, 12))
  const out: BookableDay[] = []
  while (out.length < count) {
    cursor.setUTCDate(cursor.getUTCDate() + 1)
    const dow = cursor.getUTCDay()
    if ((clinic.hours.openDays as readonly number[]).includes(dow)) {
      out.push({ iso: cursor.toISOString().slice(0, 10), date: new Date(cursor) })
    }
  }
  return out
}

export const SLOT_HOURS = Array.from(
  { length: clinic.hours.close - clinic.hours.open },
  (_, i) => clinic.hours.open + i,
)

export const slotLabel = (h: number) => `${String(h).padStart(2, '0')}:00`

/** Deterministic pseudo-availability. This is a SIMULATION used only for the demo. */
export function isSlotTaken(iso: string, hour: number): boolean {
  let h = 2166136261
  for (const c of `${iso}|${hour}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return (h >>> 0) % 5 === 0
}

export function formatDay(day: BookableDay, lang: Lang, opts: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(LANG_LABEL[lang].locale, { timeZone: 'UTC', ...opts }).format(day.date)
}
