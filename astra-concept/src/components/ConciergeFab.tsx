import { useEffect, useState } from 'react'
import { Bot } from 'lucide-react'
import { useI18n } from '../i18n'

/**
 * Floating entry point. On phones it steps aside while the hero CTAs or the booking form are on
 * screen, so it never covers a primary action; both have their own route to the concierge.
 */
export function ConciergeFab({ onOpen }: { onOpen: () => void }) {
  const { t } = useI18n()
  const [covering, setCovering] = useState<Record<string, boolean>>({})
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const bump = () => setTick((n) => n + 1)
    window.addEventListener('astra:below-mounted', bump)
    return () => window.removeEventListener('astra:below-mounted', bump)
  }, [])

  useEffect(() => {
    const phone = window.matchMedia('(max-width: 767px)')
    if (!('IntersectionObserver' in window)) return
    const ids = ['top', 'booking']
    const io = new IntersectionObserver((entries) => {
      setCovering((prev) => {
        const next = { ...prev }
        for (const e of entries) next[e.target.id] = e.isIntersecting
        return next
      })
    }, { threshold: [0, 0.25] })
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    els.forEach((el) => io.observe(el))
    const onChange = () => setCovering((p) => ({ ...p }))
    phone.addEventListener('change', onChange)
    return () => { io.disconnect(); phone.removeEventListener('change', onChange) }
  }, [tick])

  const hide = window.matchMedia('(max-width: 767px)').matches && (covering.top || covering.booking)

  return (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={hide ? -1 : 0}
      aria-hidden={hide || undefined}
      className={`fixed right-4 z-40 flex h-14 w-14 items-center justify-center gap-2.5 rounded-full bg-navy text-[0.92rem] font-bold text-white shadow-lift transition-[transform,opacity] duration-300 hover:-translate-y-0.5 hover:bg-navy-deep sm:w-auto sm:justify-start sm:pl-4 sm:pr-5 bottom-[calc(var(--bar-h)+env(safe-area-inset-bottom)+14px)] md:bottom-6 md:right-6 ${hide ? 'pointer-events-none translate-y-3 opacity-0' : ''}`}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-teal">
        <span className="absolute inset-0 rounded-full bg-teal" style={{ animation: 'ping 2.6s ease-out infinite' }} aria-hidden="true" />
        <Bot size={18} className="relative" aria-hidden="true" />
      </span>
      <span className="sr-only sm:not-sr-only">{t.concierge.fab}</span>
      <span className="absolute -right-1 -top-1 rounded-full bg-mint px-1.5 py-px text-[0.6rem] font-extrabold uppercase tracking-wider text-navy-deep sm:static sm:px-2 sm:py-0.5 sm:text-[0.65rem]">{t.concierge.badge}</span>
    </button>
  )
}
