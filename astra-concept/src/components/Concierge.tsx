import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Check, MapPin, MessageCircle, Phone, Send, X } from 'lucide-react'
import { clinic } from '../data/clinic'
import { dictionaries, LANG_LABEL, useI18n, type Lang } from '../i18n'
import { openStatus } from '../lib/hours'
import { createConciergeEngine, type Block, type Chip, type ChipAction, type FlowState } from '../lib/concierge'
import { saveRequest } from '../lib/storage'
import { Sparkle } from './Sparkle'
import type { ServiceId } from '../data/services'

interface Msg { id: number; role: 'user' | 'bot'; blocks: Block[]; lang: Lang }

export interface ChatQuestion { text: string; nonce: number }
export type NavTarget = 'services' | 'doctors' | 'booking'

export default function ConciergePanel({ onClose, question, onNavigate }: { onClose: () => void; question: ChatQuestion | null; onNavigate: (target: NavTarget, serviceId?: ServiceId) => void }) {
  const { t, lang } = useI18n()
  const c = t.concierge
  const engine = useMemo(() => createConciergeEngine(), [])
  const nextId = useRef(1)
  const flow = useRef<FlowState>({ flow: 'none' })
  const asked = useRef(0)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')

  const mainChips = (): Chip[] => [
    { label: c.chips.services, action: { kind: 'intent', intent: 'services' } },
    { label: c.chips.prices, action: { kind: 'intent', intent: 'prices' } },
    { label: c.chips.hours, action: { kind: 'intent', intent: 'hours' } },
    { label: c.chips.location, action: { kind: 'intent', intent: 'location' } },
    { label: c.chips.booking, action: { kind: 'intent', intent: 'booking' } },
    { label: c.chips.staff, action: { kind: 'intent', intent: 'staff' } },
  ]
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    { id: 0, role: 'bot', lang, blocks: [{ type: 'text', text: c.greeting }, { type: 'chips', chips: mainChips() }] },
  ])

  const send = useCallback(
    async (opts: { text?: string; action?: ChipAction; label?: string }) => {
      const shown = opts.label ?? opts.text
      if (!shown) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setMsgs((m) => [...m, { id: nextId.current++, role: 'user', lang, blocks: [{ type: 'text', text: shown }] }])
      setBusy(true)
      const [reply] = await Promise.all([
        engine.respond({ text: opts.text, action: opts.action, uiLang: lang, state: flow.current }),
        new Promise((r) => setTimeout(r, reduce ? 0 : 650)),
      ])
      flow.current = reply.state
      let ref = ''
      for (const fx of reply.effects) if (fx.type === 'saveRequest') ref = saveRequest(fx.request).ref
      const blocks = reply.blocks.map((b): Block => (b.type === 'text' && ref ? { ...b, text: b.text.replace('{ref}', ref) } : b))
      setMsgs((m) => [...m, { id: nextId.current++, role: 'bot', lang: reply.lang, blocks }])
      setBusy(false)
    },
    [engine, lang],
  )

  // A question handed over from the page ("Try it" chips, service sheet).
  useEffect(() => {
    if (question && question.nonce !== asked.current) {
      asked.current = question.nonce
      void send({ text: question.text })
    }
  }, [question, send])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    endRef.current?.scrollIntoView({ block: 'end', behavior: reduce ? 'auto' : 'smooth' })
  }, [msgs, busy])

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus()
    const small = window.matchMedia('(max-width: 639px)').matches
    const prev = document.body.style.overflow
    if (small) document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const onChip = (chip: Chip) => {
    if (busy) return
    if (chip.action.kind === 'navigate') {
      onNavigate(chip.action.target, chip.action.serviceId)
      return
    }
    void send({ action: chip.action, label: chip.label })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    void send({ text })
  }

  const lastBot = [...msgs].reverse().find((m) => m.role === 'bot')?.id

  return (
    <div
      role="dialog"
      aria-label={c.title}
      className="pop on-dark-none fixed inset-0 z-[60] flex h-dvh flex-col bg-ivory sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100dvh-3rem))] sm:w-[400px] sm:overflow-hidden sm:rounded-3xl sm:border sm:border-line sm:shadow-lift"
    >
      <header className="flex items-center gap-3 bg-navy px-4 py-3 text-white">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal"><Sparkle className="h-5 w-5 text-white" /></span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[0.98rem] font-bold">{c.title}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
            <span className="rounded-full bg-mint px-1.5 py-px text-[0.62rem] font-extrabold uppercase tracking-wider text-navy-deep">{c.badge}</span>
            {LANG_LABEL.ka.short} · {LANG_LABEL.en.short} · {LANG_LABEL.ru.short}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label={c.close} className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10 focus-visible:outline-mint">
          <X size={22} aria-hidden="true" />
        </button>
      </header>
      <p className="border-b border-line bg-teal-soft px-4 py-2 text-xs font-semibold leading-snug text-teal-deep">{c.disclaimer}</p>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" role="log" aria-live="polite" aria-label={c.log}>
        <ul className="space-y-4">
          {msgs.map((m) => (
            <li key={m.id} className={`pop flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[92%] ${m.role === 'user' ? 'rounded-2xl rounded-br-md bg-navy px-4 py-2.5 text-[0.95rem] text-white' : 'space-y-3 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-[0.95rem] leading-relaxed text-ink'}`}>
                <span className="sr-only">{m.role === 'user' ? c.youSaid : c.botSaid}: </span>
                {m.blocks.map((b, i) => <BlockView key={i} block={b} lang={m.lang} showChips={m.id === lastBot && !busy} onChip={onChip} />)}
                {m.role === 'bot' && m.lang !== lang && <p className="text-xs text-muted">{c.replyingIn} {LANG_LABEL[m.lang].native}</p>}
              </div>
            </li>
          ))}
          {busy && (
            <li className="flex" role="status" aria-label={c.typing}>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3.5">
                {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-teal" style={{ animation: 'dot 1.1s infinite', animationDelay: `${i * 0.16}s` }} />)}
              </div>
            </li>
          )}
        </ul>
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t border-line bg-paper p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <label htmlFor="chat-input" className="sr-only">{c.placeholder}</label>
        <input ref={inputRef} id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={c.placeholder} className="field !min-h-12 !rounded-full" autoComplete="off" maxLength={300} />
        <button type="submit" disabled={!input.trim() || busy} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal text-white disabled:opacity-40" aria-label={c.send}>
          <Send size={20} aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

function BlockView({ block, lang, showChips, onChip }: { block: Block; lang: Lang; showChips: boolean; onChip: (c: Chip) => void }) {
  const d = dictionaries[lang]
  switch (block.type) {
    case 'text':
      return <p className="whitespace-pre-line">{block.text}</p>
    case 'list':
      return (
        <ul className="space-y-1.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-teal" aria-hidden="true" />{it}</li>
          ))}
        </ul>
      )
    case 'prices':
      return (
        <div className="divide-y divide-line overflow-hidden rounded-xl bg-sand">
          {block.rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-3 px-3 py-2.5">
              <span className="text-[0.85rem] leading-snug">{r.label}</span>
              <b className="shrink-0 font-display text-xl text-navy">{r.price}</b>
            </div>
          ))}
        </div>
      )
    case 'status': {
      const s = openStatus(d)
      return (
        <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${s.open ? 'bg-teal-soft text-teal-deep' : 'bg-clay/10 text-clay'}`}>
          <span className={`h-2 w-2 rounded-full ${s.open ? 'bg-teal' : 'bg-clay'}`} aria-hidden="true" />
          {s.text}
        </p>
      )
    }
    case 'urgent':
      return <p role="alert" className="rounded-xl border border-[#a3261f]/40 bg-[#fff1ef] p-3 text-[0.9rem] font-semibold text-[#7d1b16]">{block.text}</p>
    case 'contact':
      return (
        <div className="rounded-xl bg-sand p-3">
          <p className="flex items-start gap-2 text-[0.9rem] font-semibold text-navy"><MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />{clinic.address[lang]}</p>
          <p className="mt-1 pl-6 text-[0.9rem] text-muted" translate="no">{clinic.phone.display}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="btn btn-primary btn-sm" href={`tel:${clinic.phone.tel}`}><Phone size={15} aria-hidden="true" />{d.concierge.call}</a>
            <a className="btn btn-ghost btn-sm" href={clinic.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />{d.concierge.whatsapp}</a>
            <a className="btn btn-ghost btn-sm" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={15} aria-hidden="true" />{d.concierge.maps}</a>
          </div>
        </div>
      )
    case 'chips':
      if (!showChips) return null
      return (
        <div className="flex flex-wrap gap-2 pt-1">
          {block.chips.map((chip) => (
            <button key={chip.label} type="button" onClick={() => onChip(chip)} className="min-h-10 rounded-full border border-teal/50 bg-white px-3.5 py-1.5 text-left text-[0.86rem] font-bold text-teal-deep transition-colors hover:bg-teal hover:text-white">
              {chip.label}
            </button>
          ))}
        </div>
      )
  }
}
