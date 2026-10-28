import { createRemoteEngine } from './remoteEngine'
import { deterministicEngine } from './deterministicEngine'
import type { ConciergeEngine } from './types'

export type * from './types'

/** The demo always resolves to the deterministic engine unless a remote endpoint is configured. */
export function createConciergeEngine(): ConciergeEngine {
  const mode = import.meta.env.VITE_CONCIERGE_MODE
  const endpoint = import.meta.env.VITE_CONCIERGE_ENDPOINT
  if (mode === 'remote' && endpoint) return createRemoteEngine(endpoint)
  return deterministicEngine
}
