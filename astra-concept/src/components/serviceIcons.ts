import { Activity, Baby, Crown, Gem, ScanSearch, Scissors, Smile, Sparkles, Stethoscope, type LucideIcon } from 'lucide-react'
import type { ServiceId } from '../data/services'

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  general: Stethoscope,
  implants: Gem,
  orthodontics: Smile,
  pediatric: Baby,
  surgery: Scissors,
  whitening: Sparkles,
  prosthetics: Crown,
  diagnostics: ScanSearch,
  periodontology: Activity,
}
