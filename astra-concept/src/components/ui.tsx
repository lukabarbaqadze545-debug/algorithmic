import { createContext, useContext, useEffect, useRef, type ElementType, type ReactNode } from 'react'
import type { ServiceId } from '../data/services'

/** Cross-section actions provided by App. */
export interface UiActions {
  openChat: (question?: string) => void
  goBooking: (serviceId?: ServiceId | 'general-consult') => void
  openNotes: () => void
}
export const UiContext = createContext<UiActions | null>(null)
export function useUi(): UiActions {
  const v = useContext(UiContext)
  if (!v) throw new Error('useUi outside provider')
  return v
}

/** Fade-and-rise on first scroll into view. Falls back to visible when IntersectionObserver is missing. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, lead, id, dark = false, className = '' }: { eyebrow: string; title: string; lead?: string; id: string; dark?: boolean; className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={`mt-4 text-[clamp(2rem,5.2vw,3.25rem)] ${dark ? '!text-ivory' : ''}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-[1.0625rem] leading-relaxed ${dark ? 'text-ivory/80' : 'text-muted'}`}>{lead}</p>}
    </div>
  )
}

/** Scrolls to a section. Sections below the hero mount lazily, so wait for them if they are not there yet. */
export function scrollToId(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const go = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
  const el = document.getElementById(id)
  if (el) return go(el)
  window.dispatchEvent(new Event('astra:mount-below'))
  let tries = 0
  const poll = () => {
    const found = document.getElementById(id)
    if (found) return go(found)
    if (++tries < 90) requestAnimationFrame(poll)
  }
  requestAnimationFrame(poll)
}
