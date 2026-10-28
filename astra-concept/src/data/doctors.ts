import type { L10n } from '../i18n/types'

export interface Doctor {
  id: string
  name: string
  specialty: L10n
  /** Only fill in what the clinic has confirmed. Optional fields stay hidden when absent. */
  experience?: L10n
  education?: L10n
  languages?: string[]
}

/**
 * Intentionally EMPTY. Doctor names and specialties could not be verified because the
 * official website was unreachable from the build environment. Nothing is invented.
 * Add confirmed entries here and the Doctors section and booking form pick them up.
 */
export const doctors: Doctor[] = []
