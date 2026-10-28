import { Sparkle } from './Sparkle'

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" translate="no">
      <Sparkle className={`h-7 w-7 shrink-0 ${dark ? 'text-mint' : 'text-teal'}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.65rem] font-semibold tracking-tight ${dark ? 'text-ivory' : 'text-navy'}`}>Astra</span>
        <span className={`mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] ${dark ? 'text-ivory/75' : 'text-muted'}`}>Dental Clinic</span>
      </span>
    </span>
  )
}
