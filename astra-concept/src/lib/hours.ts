import { clinic } from '../data/clinic'
import type { Dict } from '../i18n/en'

const pad = (n: number) => String(n).padStart(2, '0')
const fmt = (h: number) => `${pad(h)}:00`

/** Current weekday (0 = Sunday) and decimal hour in the clinic's time zone. */
function clinicNow(now: Date): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: clinic.hours.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return { day: days.indexOf(get('weekday')), hour: Number(get('hour')) + Number(get('minute')) / 60 }
}

/** Human-readable open/closed line based on the published weekday hours only. */
export function openStatus(t: Dict, now = new Date()): { open: boolean; text: string } {
  const { day, hour } = clinicNow(now)
  const { open, close, openDays } = clinic.hours
  const isOpenDay = (openDays as readonly number[]).includes(day)
  if (isOpenDay && hour >= open && hour < close) return { open: true, text: t.status.open(fmt(close)) }
  if (isOpenDay && hour < open) return { open: false, text: t.status.closedToday(fmt(open)) }
  const tomorrow = (day + 1) % 7
  if ((openDays as readonly number[]).includes(tomorrow)) return { open: false, text: t.status.closedTomorrow(fmt(open)) }
  return { open: false, text: t.status.closedMonday(fmt(open)) }
}
