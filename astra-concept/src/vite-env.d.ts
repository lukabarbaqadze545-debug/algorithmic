/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONCIERGE_MODE?: 'deterministic' | 'remote'
  readonly VITE_CONCIERGE_ENDPOINT?: string
  readonly VITE_BOOKING_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
