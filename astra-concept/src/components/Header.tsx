import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n'
import { Brand } from './Brand'
import { LangSwitch } from './LangSwitch'
import { scrollToId, useUi } from './ui'

const links = [
  ['services', 'services'],
  ['concierge', 'concierge'],
  ['doctors', 'doctors'],
  ['why', 'why'],
  ['contact', 'contact'],
] as const

export function Header() {
  const { t } = useI18n()
  const { openNotes, goBooking } = useUi()
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menu])

  const go = (id: string) => {
    setMenu(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <div className="sticky top-0 z-50">
      <aside aria-label={t.ribbon.text} className="bg-navy-deep text-ivory">
        <div className="wrap flex h-[30px] items-center justify-between gap-3 text-[0.72rem] leading-none sm:text-xs">
          <p className="truncate" translate="no">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-mint align-middle" aria-hidden="true" />
            {t.ribbon.text}
          </p>
          <button type="button" onClick={openNotes} className="hidden shrink-0 font-semibold text-mint underline-offset-4 hover:underline sm:block">
            {t.ribbon.notes}
          </button>
        </div>
      </aside>
      <header className="border-b border-line/80 bg-ivory">
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToId('top') }} className="rounded-md">
            <Brand />
          </a>

          <nav aria-label={t.nav.primary} className="hidden items-center gap-7 lg:flex">
            {links.map(([id, key]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id) }} className="text-[0.92rem] font-semibold text-ink/85 underline-offset-8 hover:text-teal hover:underline">
                {t.nav[key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch />
            <a href={`tel:${clinic.phone.tel}`} className="btn btn-ghost btn-sm hidden xl:inline-flex">
              <Phone size={16} aria-hidden="true" />
              {clinic.phone.display}
            </a>
            <button type="button" onClick={() => goBooking()} className="btn btn-primary btn-sm hidden md:inline-flex">
              {t.cta.book}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-sand lg:hidden"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div id="mobile-menu" className="pop fixed inset-x-0 bottom-0 top-[94px] z-40 overflow-y-auto bg-navy text-ivory on-dark lg:hidden">
          <nav aria-label={t.nav.primary} className="wrap flex min-h-full flex-col pb-10 pt-4">
            <ul>
              {[...links, ['booking', 'booking'] as const].map(([id, key]) => (
                <li key={id} className="border-b border-white/10">
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id) }} className="flex min-h-[60px] items-center font-display text-[1.9rem] text-ivory">
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <button type="button" className="btn btn-light w-full" onClick={() => { setMenu(false); goBooking() }}>
                {t.cta.book}
              </button>
              <a href={`tel:${clinic.phone.tel}`} className="btn btn-outline-light w-full">
                <Phone size={18} aria-hidden="true" />
                {clinic.phone.display}
              </a>
            </div>
            <div className="mt-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ivory/70">{t.nav.language}</p>
              <LangSwitch dark large />
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
