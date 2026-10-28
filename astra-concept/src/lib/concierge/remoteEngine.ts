import { deterministicEngine } from './deterministicEngine'
import type { ConciergeEngine, ConciergeInput, ConciergeReply } from './types'

/**
 * FUTURE INTEGRATION POINT. Not used by the demo.
 *
 * Production design (see README): the browser talks only to YOUR server endpoint, e.g. a
 * serverless function. That function holds the AI provider key, adds the structured clinic
 * data from src/data as grounding, enforces the "no diagnosis / no treatment advice" rules,
 * and returns the same ConciergeReply shape used here. API keys must never be shipped in
 * VITE_* variables because they are bundled into public JavaScript.
 *
 * It is only selected when VITE_CONCIERGE_MODE=remote and VITE_CONCIERGE_ENDPOINT is set.
 * Any failure falls back to the deterministic engine so the visitor is never left without
 * an answer or a staff hand-off.
 */
export function createRemoteEngine(endpoint: string): ConciergeEngine {
  return {
    async respond(input: ConciergeInput): Promise<ConciergeReply> {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input.text, action: input.action, uiLang: input.uiLang, state: input.state }),
        })
        if (!res.ok) throw new Error(`concierge endpoint returned ${res.status}`)
        return (await res.json()) as ConciergeReply
      } catch {
        return deterministicEngine.respond(input)
      }
    },
  }
}
