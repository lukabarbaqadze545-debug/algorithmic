import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { useI18n } from '../i18n'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Accessible modal: bottom sheet on phones, right-hand drawer on larger screens. */
export function Sheet({ open, onClose, title, titleId, children }: { open: boolean; onClose: () => void; title: string; titleId: string; children: ReactNode }) {
  const { t } = useI18n()
  const panel = useRef<HTMLDivElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    returnTo.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeRef.current()
      } else if (e.key === 'Tab' && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      returnTo.current?.focus?.()
    }
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70]" role="presentation">
      <div className="absolute inset-0 bg-navy-deep/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="pop absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-lift outline-none sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(540px,100%)] sm:rounded-none sm:rounded-l-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-8">
          <p id={titleId} className="text-sm font-bold text-navy">
            {title}
          </p>
          <button type="button" onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-sand" aria-label={t.common.close}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:px-8">{children}</div>
      </div>
    </div>
  )
}
