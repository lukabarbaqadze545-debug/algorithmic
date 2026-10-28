import { clinic } from '../../data/clinic'
import { priceLabels, services, type Service, type ServiceId } from '../../data/services'
import { dictionaries } from '../../i18n'
import { isValidPhone } from '../validate'
import { detectLang } from './detectLang'
import {
  byeStems, cancelStems, greetingStems, hasAny, intentStems, medicalStems, noStems, normalise, score, thanksStems, urgentStems, yesStems,
} from './intents'
import type { Block, Chip, ChipAction, ConciergeEngine, ConciergeInput, ConciergeReply, FlowState, IntentId } from './types'

const NONE: FlowState = { flow: 'none' }

function findService(norm: string): Service | undefined {
  let best: { s: Service; n: number } | undefined
  for (const s of services) {
    const n = score(norm, s.keywords)
    if (n > 0 && (!best || n > best.n)) best = { s, n }
  }
  return best?.s
}

function topIntent(norm: string): IntentId | undefined {
  let best: { id: IntentId; n: number } | undefined
  for (const id of Object.keys(intentStems) as IntentId[]) {
    const n = score(norm, intentStems[id])
    if (n > 0 && (!best || n > best.n)) best = { id, n }
  }
  return best?.id
}

function bestScore(norm: string): number {
  return Math.max(0, ...(Object.keys(intentStems) as IntentId[]).map((id) => score(norm, intentStems[id])))
}

export const deterministicEngine: ConciergeEngine = {
  async respond(input: ConciergeInput): Promise<ConciergeReply> {
    return reply(input)
  },
}

function reply(input: ConciergeInput): ConciergeReply {
  const text = input.text?.trim() ?? ''
  const lang = text ? detectLang(text, input.uiLang) : input.uiLang
  const t = dictionaries[lang].concierge
  const done = (blocks: Block[], state: FlowState = NONE, effects: ConciergeReply['effects'] = [], needsRef = false): ConciergeReply => ({
    blocks, state, lang, effects, needsRef,
  })

  const mainChips: Chip[] = [
    { label: t.chips.services, action: { kind: 'intent', intent: 'services' } },
    { label: t.chips.prices, action: { kind: 'intent', intent: 'prices' } },
    { label: t.chips.hours, action: { kind: 'intent', intent: 'hours' } },
    { label: t.chips.location, action: { kind: 'intent', intent: 'location' } },
    { label: t.chips.booking, action: { kind: 'intent', intent: 'booking' } },
  ]
  const handoffChips: Chip[] = [
    { label: t.chips.booking, action: { kind: 'intent', intent: 'booking' } },
    { label: t.chips.services, action: { kind: 'intent', intent: 'services' } },
  ]

  const serviceChips = (): Chip[] => [
    ...services.map((s) => ({ label: s.name[lang], action: { kind: 'service', id: s.id } as ChipAction })),
    { label: t.bookGeneral, action: { kind: 'service', id: 'general-consult' } },
  ]

  const priceBlocks = (): Block[] => [
    { type: 'text', text: t.pricesIntro },
    {
      type: 'prices',
      rows: clinic.prices.map((p) => ({ label: priceLabels[p.id][lang], price: dictionaries[lang].services.priceFrom(p.usd) })),
    },
    { type: 'text', text: t.pricesOutro },
    { type: 'chips', chips: handoffChips },
  ]

  const hoursBlocks = (): Block[] => [
    { type: 'text', text: t.hoursText },
    { type: 'status' },
    { type: 'text', text: t.hoursOutro },
    { type: 'chips', chips: [{ label: t.chips.booking, action: { kind: 'intent', intent: 'booking' } }, { label: t.chips.location, action: { kind: 'intent', intent: 'location' } }] },
  ]

  const contactBlocks = (intro: string): Block[] => [{ type: 'text', text: intro }, { type: 'contact' }]

  const serviceBlocks = (s: Service): Block[] => {
    const blocks: Block[] = [
      { type: 'text', text: `${s.name[lang]}. ${s.summary[lang]}` },
      { type: 'text', text: t.serviceIncludes },
      { type: 'list', items: s.includes[lang] },
    ]
    if (s.prices) {
      blocks.push({ type: 'text', text: t.servicePricesIntro })
      blocks.push({
        type: 'prices',
        rows: s.prices.map((id) => {
          const usd = clinic.prices.find((p) => p.id === id)!.usd
          return { label: priceLabels[id][lang], price: dictionaries[lang].services.priceFrom(usd) }
        }),
      })
      blocks.push({ type: 'text', text: dictionaries[lang].services.detail.priceNote })
    } else {
      blocks.push({ type: 'text', text: t.serviceNoPrice })
    }
    blocks.push({
      type: 'chips',
      chips: [
        { label: t.chips.booking, action: { kind: 'service', id: s.id } },
        { label: t.goServices, action: { kind: 'navigate', target: 'services' } },
      ],
    })
    return blocks
  }

  const startBooking = (): ConciergeReply =>
    done([{ type: 'text', text: t.bookStart }, { type: 'chips', chips: [...serviceChips(), { label: t.bookNo, action: { kind: 'confirm', yes: false } }] }], { flow: 'booking', step: 'service' })

  const serviceName = (id: string) =>
    id === 'general-consult' ? t.bookGeneral : (services.find((s) => s.id === id)?.name[lang] ?? id)

  const handoff = (urgent: boolean): ConciergeReply => {
    const blocks: Block[] = [{ type: 'text', text: t.medical }]
    if (urgent) blocks.push({ type: 'urgent', text: t.urgent })
    blocks.push({ type: 'contact' }, { type: 'chips', chips: handoffChips })
    return done(blocks)
  }

  // ---- chip actions -------------------------------------------------------------------
  const act = input.action
  if (act) {
    switch (act.kind) {
      case 'intent':
        return answerIntent(act.intent)
      case 'service': {
        if (input.state.flow === 'booking' && input.state.step === 'service') {
          return done([{ type: 'text', text: t.bookName }, { type: 'chips', chips: [{ label: t.bookNo, action: { kind: 'confirm', yes: false } }] }], { flow: 'booking', step: 'name', serviceId: act.id })
        }
        if (act.id === 'general-consult') return startBooking()
        const s = services.find((x) => x.id === act.id)!
        // Chip on a service answer means "request a visit for this service".
        return done([{ type: 'text', text: t.bookName }, { type: 'chips', chips: [{ label: t.bookNo, action: { kind: 'confirm', yes: false } }] }], { flow: 'booking', step: 'name', serviceId: s.id })
      }
      case 'confirm': {
        const st = input.state
        if (!act.yes) return done([{ type: 'text', text: t.bookCancelled }, { type: 'chips', chips: mainChips }])
        if (st.flow !== 'booking' || st.step !== 'confirm') return done(mainBlock())
        return done(
          [{ type: 'text', text: t.bookDone('{ref}') }, { type: 'chips', chips: mainChips }],
          NONE,
          [{ type: 'saveRequest', request: { source: 'concierge', uiLang: input.uiLang, serviceId: st.serviceId, name: st.name, phone: st.phone, contactLang: lang } }],
          true,
        )
      }
      case 'navigate':
        return done([{ type: 'text', text: t.chips.services }, { type: 'chips', chips: mainChips }])
    }
  }

  // ---- free text ----------------------------------------------------------------------
  const norm = normalise(text)
  let st = input.state
  const cancelChip: Chip = { label: t.bookNo, action: { kind: 'confirm', yes: false } }

  if (hasAny(norm, cancelStems) && st.flow === 'booking') {
    return done([{ type: 'text', text: t.bookCancelled }, { type: 'chips', chips: mainChips }])
  }

  if (st.flow === 'booking') {
    // A visitor who asks a real question mid-flow should get an answer, not be trapped in the form.
    const asksSomethingElse = text.includes('?') || hasAny(norm, medicalStems) || bestScore(norm) >= 6
    if (st.step === 'service') {
      const s = findService(norm)
      if (s) return done([{ type: 'text', text: t.bookName }, { type: 'chips', chips: [cancelChip] }], { flow: 'booking', step: 'name', serviceId: s.id })
      if (!asksSomethingElse) return done([{ type: 'text', text: t.bookStart }, { type: 'chips', chips: [...serviceChips(), cancelChip] }], st)
      st = NONE
    } else if (st.step === 'name') {
      if (asksSomethingElse) st = NONE
      else {
        const name = text.replace(/\s+/g, ' ').slice(0, 60)
        if (name.length < 2) return done([{ type: 'text', text: t.bookName }, { type: 'chips', chips: [cancelChip] }], st)
        return done([{ type: 'text', text: t.bookPhone(name) }, { type: 'chips', chips: [cancelChip] }], { flow: 'booking', step: 'phone', serviceId: st.serviceId, name })
      }
    } else if (st.step === 'phone') {
      if (isValidPhone(text)) {
        const phone = text.trim()
        return done(
          [
            { type: 'text', text: t.bookConfirm(st.name, serviceName(st.serviceId), phone) },
            { type: 'chips', chips: [{ label: t.bookYes, action: { kind: 'confirm', yes: true } }, cancelChip] },
          ],
          { flow: 'booking', step: 'confirm', serviceId: st.serviceId, name: st.name, phone },
        )
      }
      if (!asksSomethingElse) return done([{ type: 'text', text: t.bookPhoneInvalid }, { type: 'chips', chips: [cancelChip] }], st)
      st = NONE
    } else if (st.step === 'confirm') {
      if (hasAny(norm, yesStems)) return reply({ ...input, text: undefined, action: { kind: 'confirm', yes: true } })
      if (hasAny(norm, noStems)) return reply({ ...input, text: undefined, action: { kind: 'confirm', yes: false } })
      if (!asksSomethingElse) {
        return done([{ type: 'chips', chips: [{ label: t.bookYes, action: { kind: 'confirm', yes: true } }, cancelChip] }], st)
      }
      st = NONE
    }
  }

  // Medical wording always wins over every other intent.
  if (hasAny(norm, medicalStems)) return handoff(hasAny(norm, urgentStems))
  if (hasAny(norm, urgentStems) && hasAny(norm, ['emergency', 'urgent', 'срочно', 'экстренн', 'სასწრაფო', 'გადაუდებელ'])) return handoff(true)

  if (hasAny(norm, thanksStems)) return done([{ type: 'text', text: t.thanks }, { type: 'chips', chips: mainChips }])
  if (hasAny(norm, byeStems)) return done([{ type: 'text', text: t.bye }])
  if (hasAny(norm, greetingStems) && norm.trim().split(' ').length <= 4) {
    return done([{ type: 'text', text: t.greeting }, { type: 'chips', chips: mainChips }])
  }

  const intent = topIntent(norm)
  const svc = findService(norm)
  if (intent === 'booking') return startBooking()
  if (svc && intent !== 'prices') return done(serviceBlocks(svc))
  if (intent === 'prices' && svc && !svc.prices) return done(serviceBlocks(svc))
  if (intent) return answerIntent(intent)
  if (svc) return done(serviceBlocks(svc))

  return done([...contactBlocks(t.unknown), { type: 'chips', chips: mainChips }])

  // ---- helpers hoisted below ----------------------------------------------------------
  function mainBlock(): Block[] {
    return [{ type: 'text', text: t.greeting }, { type: 'chips', chips: mainChips }]
  }

  function answerIntent(intent: IntentId): ConciergeReply {
    switch (intent) {
      case 'services':
        return done([
          { type: 'text', text: t.servicesIntro },
          { type: 'list', items: services.map((s) => s.name[lang]) },
          { type: 'text', text: t.servicesOutro },
          { type: 'chips', chips: services.slice(0, 4).map((s) => ({ label: s.name[lang], action: { kind: 'service', id: s.id as ServiceId } as ChipAction })).concat([{ label: t.goServices, action: { kind: 'navigate', target: 'services' } as ChipAction }]) },
        ])
      case 'prices':
        return done(priceBlocks())
      case 'hours':
        return done(hoursBlocks())
      case 'location':
        return done([{ type: 'text', text: t.locationText }, { type: 'contact' }, { type: 'chips', chips: handoffChips }])
      case 'contact':
      case 'staff':
        return done([...contactBlocks(t.contactText), { type: 'chips', chips: handoffChips }])
      case 'booking':
        return startBooking()
      case 'doctors':
        return done([
          { type: 'text', text: t.doctorsText },
          { type: 'chips', chips: [{ label: t.goDoctors, action: { kind: 'navigate', target: 'doctors' } }, { label: t.chips.staff, action: { kind: 'intent', intent: 'staff' } }] },
        ])
      case 'languages':
        return done([{ type: 'text', text: t.languagesText }, { type: 'chips', chips: mainChips }])
    }
  }
}
