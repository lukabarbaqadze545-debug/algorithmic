import type { Lang } from '../../i18n/types'
import type { ServiceId } from '../../data/services'
import type { DemoRequest } from '../storage'

export type IntentId =
  | 'services' | 'prices' | 'hours' | 'location' | 'contact'
  | 'booking' | 'staff' | 'doctors' | 'languages'

export type ChipAction =
  | { kind: 'intent'; intent: IntentId }
  | { kind: 'service'; id: ServiceId | 'general-consult' }
  | { kind: 'confirm'; yes: boolean }
  | { kind: 'navigate'; target: 'services' | 'doctors' | 'booking'; serviceId?: ServiceId }

export interface Chip {
  label: string
  action: ChipAction
}

export type Block =
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'prices'; rows: { label: string; price: string }[] }
  | { type: 'contact' }
  | { type: 'status' }
  | { type: 'urgent'; text: string }
  | { type: 'chips'; chips: Chip[] }

/** Conversation state kept by the UI and passed back to the engine on every turn. */
export type FlowState =
  | { flow: 'none' }
  | { flow: 'booking'; step: 'service' }
  | { flow: 'booking'; step: 'name'; serviceId: string }
  | { flow: 'booking'; step: 'phone'; serviceId: string; name: string }
  | { flow: 'booking'; step: 'confirm'; serviceId: string; name: string; phone: string }

export type Effect = { type: 'saveRequest'; request: Omit<DemoRequest, 'id' | 'ref' | 'createdAt'> }

export interface ConciergeInput {
  /** Free text typed by the visitor, or a chip action. */
  text?: string
  action?: ChipAction
  /** Language of the website UI; the reply language may be overridden by the detected script. */
  uiLang: Lang
  state: FlowState
}

export interface ConciergeReply {
  blocks: Block[]
  state: FlowState
  lang: Lang
  effects: Effect[]
  /** Set when the reply needs the saved reference number (filled in by the UI after saving). */
  needsRef?: boolean
}

/**
 * Anything that can answer a visitor. The demo ships a deterministic engine; a future secure
 * AI integration only has to implement this interface (see remoteEngine.ts).
 */
export interface ConciergeEngine {
  respond(input: ConciergeInput): Promise<ConciergeReply>
}
