import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import type { Prefill } from './components/Booking'
import { ConciergeFab } from './components/ConciergeFab'
import type { ChatQuestion, NavTarget } from './components/Concierge'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MobileBar } from './components/MobileBar'
import { TrustStrip } from './components/TrustStrip'
import { scrollToId, UiContext, type UiActions } from './components/ui'
import { useI18n } from './i18n'
import type { ServiceId } from './data/services'

const Sections = lazy(() => import('./components/BelowFold').then((m) => ({ default: m.Sections })))
const Footer = lazy(() => import('./components/BelowFold').then((m) => ({ default: m.Footer })))
const ConciergePanel = lazy(() => import('./components/Concierge'))
const Notes = lazy(() => import('./components/Notes').then((m) => ({ default: m.Notes })))

export default function App() {
  const { t, lang } = useI18n()
  const [chatOpen, setChatOpen] = useState(false)
  const [question, setQuestion] = useState<ChatQuestion | null>(null)
  const [notesOpen, setNotesOpen] = useState(false)
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  // Sections under the hero load as a separate chunk once the first screen has settled,
  // or immediately on the first scroll / tap / key press / anchor navigation.
  const [below, setBelow] = useState(() => window.location.hash.length > 1)

  useEffect(() => {
    if (below) return
    const show = () => setBelow(true)
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll', 'hashchange', 'astra:mount-below']
    events.forEach((e) => window.addEventListener(e, show, { once: true, passive: true }))
    const timer = window.setTimeout(show, 2500)
    return () => {
      events.forEach((e) => window.removeEventListener(e, show))
      window.clearTimeout(timer)
    }
  }, [below])

  const closeChat = useCallback(() => setChatOpen(false), [])
  const closeNotes = useCallback(() => setNotesOpen(false), [])

  const goBooking = useCallback((serviceId?: ServiceId | 'general-consult') => {
    setChatOpen(false)
    setBelow(true)
    if (serviceId) setPrefill({ serviceId, nonce: Date.now() })
    requestAnimationFrame(() => scrollToId('booking'))
  }, [])

  const actions = useMemo<UiActions>(
    () => ({
      openChat: (text) => {
        if (text) setQuestion({ text, nonce: Date.now() })
        setChatOpen(true)
      },
      goBooking,
      openNotes: () => setNotesOpen(true),
    }),
    [goBooking],
  )

  const onNavigate = useCallback(
    (target: NavTarget, serviceId?: ServiceId) => {
      if (target === 'booking') return goBooking(serviceId)
      setChatOpen(false)
      requestAnimationFrame(() => scrollToId(target))
    },
    [goBooking],
  )

  return (
    <UiContext.Provider value={actions}>
      <a href="#main" className="sr-only z-[100] rounded-md bg-navy px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Suspense fallback={<div aria-hidden="true" style={{ minHeight: '100svh' }} />}>
          {below ? <Sections prefill={prefill} /> : <div aria-hidden="true" style={{ minHeight: '100svh' }} />}
        </Suspense>
      </main>
      <Suspense fallback={null}>{below && <Footer />}</Suspense>
      <MobileBar />
      {!chatOpen && <ConciergeFab onOpen={() => setChatOpen(true)} />}
      <Suspense fallback={null}>
        {chatOpen && <ConciergePanel key={lang} onClose={closeChat} question={question} onNavigate={onNavigate} />}
        {notesOpen && <Notes open onClose={closeNotes} />}
      </Suspense>
    </UiContext.Provider>
  )
}
