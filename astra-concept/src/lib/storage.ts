import type { Lang } from '../i18n/types'

/**
 * Demo-only persistence. Requests live in this browser's localStorage under a key that is
 * clearly separate from anything clinic-related. Nothing is ever sent over the network.
 */
const KEY = 'astra-concept-demo:v1:requests'

export interface DemoRequest {
  id: string
  ref: string
  createdAt: string
  source: 'booking-form' | 'concierge'
  uiLang: Lang
  serviceId: string
  doctor?: string
  date?: string
  time?: string
  name: string
  phone: string
  email?: string
  contactLang?: Lang
  channel?: 'phone' | 'whatsapp'
  note?: string
}

export function loadRequests(): DemoRequest[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as DemoRequest[]) : []
  } catch {
    return []
  }
}

export function makeRef(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let s = ''
  const bytes = crypto.getRandomValues(new Uint8Array(5))
  for (const b of bytes) s += alphabet[b % alphabet.length]
  return `DEMO-${s}`
}

export function saveRequest(req: Omit<DemoRequest, 'id' | 'ref' | 'createdAt'>): DemoRequest {
  const full: DemoRequest = {
    ...req,
    id: crypto.randomUUID(),
    ref: makeRef(),
    createdAt: new Date().toISOString(),
  }
  try {
    window.localStorage.setItem(KEY, JSON.stringify([full, ...loadRequests()].slice(0, 50)))
    window.dispatchEvent(new Event('astra-demo-requests'))
  } catch {
    /* storage may be unavailable (private mode); the confirmation still shows */
  }
  return full
}

export function clearRequests(): void {
  try {
    window.localStorage.removeItem(KEY)
    window.dispatchEvent(new Event('astra-demo-requests'))
  } catch {
    /* ignore */
  }
}
