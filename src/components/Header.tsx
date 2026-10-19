import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { PageContainer } from './PageContainer'
import { PrimaryButton } from './Button'
import { nav } from '../data/site'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 8)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu is desktop-inline from `lg`; close the overlay if the viewport grows past it.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Scroll lock, Escape to close, focus trap while the overlay is open.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab' || !headerRef.current) return
      const items = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
      toggle?.focus({ preventScroll: true })
    }
  }, [open])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[0.95rem] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 motion-reduce:after:transition-none ${
      isActive ? 'text-ivory after:scale-x-100' : 'text-ivory/75 after:scale-x-0 hover:text-ivory hover:after:scale-x-100'
    }`

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Background layer is separate: backdrop-filter on <header> itself would become the containing block of the fixed mobile panel. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-[background-color,border-color] duration-500 ${
          scrolled || open ? 'border-line bg-ink/85 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      />
      <PageContainer className="relative flex h-[4.5rem] items-center justify-between lg:h-20">
        <Link to="/" onClick={close} aria-label="ALGORITHMIC — მთავარი გვერდი" className="rounded-[2px]">
          <BrandMark variant="wordmark" size={38} />
        </Link>

        <nav aria-label="მთავარი ნავიგაცია" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkCls}>
              {item.label}
            </NavLink>
          ))}
          <PrimaryButton to="/books" size="sm" arrow={false}>
            წიგნების ნახვა
          </PrimaryButton>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-12 items-center justify-center rounded-[2px] text-ivory lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>
      </PageContainer>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="მენიუ"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-ink lg:hidden"
        >
          <PageContainer className="flex min-h-full flex-col pb-10 pt-6">
            <nav aria-label="მობილური ნავიგაცია" className="flex flex-col">
              {nav.map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={close}
                  className={({ isActive }) =>
                    `flex items-baseline gap-5 border-b border-line-soft py-5 font-display text-2xl transition-colors ${
                      isActive ? 'text-gold' : 'text-ivory hover:text-gold'
                    }`
                  }
                >
                  <span className="numeral w-7 text-base">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-10" onClick={close}>
              <PrimaryButton to="/books" className="w-full">
                წიგნების ნახვა
              </PrimaryButton>
            </div>
            <p className="brand-caps mt-auto pt-12 text-center text-xs text-gold/80">Algorithmic</p>
          </PageContainer>
        </div>
      )}
    </header>
  )
}
