import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, Info, Phone } from 'lucide-react'
import { clinic } from '../data/clinic'
import { doctors } from '../data/doctors'
import { services } from '../data/services'
import { LANGS, LANG_LABEL, useI18n, type Lang } from '../i18n'
import { formatDay, isSlotTaken, nextWorkingDays, SLOT_HOURS, slotLabel } from '../lib/slots'
import { saveRequest, type DemoRequest } from '../lib/storage'
import { isValidEmail, isValidPhone } from '../lib/validate'
import { Reveal, SectionHead } from './ui'

export interface Prefill { serviceId: string; nonce: number }

interface Form {
  serviceId: string
  doctor: string
  dayIso: string
  hour: number | null
  name: string
  phone: string
  email: string
  contactLang: Lang
  channel: 'phone' | 'whatsapp'
  note: string
  consent: boolean
}
type Errors = Partial<Record<keyof Form, string>>

export function Booking({ prefill }: { prefill: Prefill | null }) {
  const { t, lang, pick } = useI18n()
  const days = useMemo(() => nextWorkingDays(10), [])
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState<DemoRequest | null>(null)
  const [form, setForm] = useState<Form>({
    serviceId: '', doctor: '', dayIso: '', hour: null, name: '', phone: '', email: '', contactLang: lang, channel: 'phone', note: '', consent: false,
  })
  const panelRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLElement | null>(null)
  const setHeading = (el: HTMLElement | null) => { headingRef.current = el }
  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  useEffect(() => {
    if (!prefill) return
    setForm((f) => ({ ...f, serviceId: prefill.serviceId }))
    setStep(0)
    setDone(null)
    setErrors({})
  }, [prefill])

  useEffect(() => { setForm((f) => ({ ...f, contactLang: lang })) }, [lang])

  const serviceName = (id: string) => (id === 'general-consult' ? t.booking.service.general : services.find((s) => s.id === id)?.name[lang] ?? '')
  const selectedDay = days.find((d) => d.iso === form.dayIso)

  const validate = (s: number): Errors => {
    const e: Errors = {}
    const b = t.booking.errors
    if (s === 0 && !form.serviceId) e.serviceId = b.service
    if (s === 1) {
      if (!form.dayIso) e.dayIso = b.date
      else if (form.hour === null) e.hour = b.time
    }
    if (s === 2) {
      if (form.name.trim().length < 2) e.name = b.name
      if (!isValidPhone(form.phone)) e.phone = b.phone
      if (form.email.trim() && !isValidEmail(form.email)) e.email = b.email
      if (!form.consent) e.consent = b.consent
    }
    return e
  }

  const focusFirstError = (e: Errors) => {
    const first = Object.keys(e)[0]
    if (!first) return
    requestAnimationFrame(() => {
      const el = panelRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)
      el?.focus()
    })
  }

  const next = () => {
    const e = validate(step)
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(e)
    setStep((s) => s + 1)
    requestAnimationFrame(() => headingRef.current?.focus())
  }
  const back = () => { setErrors({}); setStep((s) => Math.max(0, s - 1)); requestAnimationFrame(() => headingRef.current?.focus()) }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(2)
    setErrors(e)
    if (Object.keys(e).length) return focusFirstError(e)
    const saved = saveRequest({
      source: 'booking-form',
      uiLang: lang,
      serviceId: form.serviceId,
      doctor: form.doctor || undefined,
      date: form.dayIso,
      time: form.hour !== null ? slotLabel(form.hour) : undefined,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      contactLang: form.contactLang,
      channel: form.channel,
      note: form.note.trim() || undefined,
    })
    setDone(saved)
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  const reset = () => {
    setDone(null); setStep(0); setErrors({})
    setForm((f) => ({ ...f, serviceId: '', doctor: '', dayIso: '', hour: null, note: '', consent: false }))
  }

  const when = selectedDay && form.hour !== null ? `${formatDay(selectedDay, lang, { weekday: 'short', day: 'numeric', month: 'long' })} · ${slotLabel(form.hour)}` : ''
  const err = (k: keyof Form) => errors[k]
  const errId = (k: string) => `err-${k}`

  return (
    <section id="booking" aria-labelledby="booking-title" className="bg-ivory py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-40 lg:self-start">
          <Reveal>
            <SectionHead id="booking-title" eyebrow={t.booking.eyebrow} title={t.booking.title} lead={t.booking.lead} />
          </Reveal>
          <p className="mt-6 flex gap-3 rounded-2xl bg-teal-soft p-4 text-[0.9rem] font-semibold leading-snug text-teal-deep" role="note">
            <Info size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
            {t.booking.demoBanner}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t.booking.afterHours}</p>

          <div className="mt-8 hidden rounded-2xl border border-line bg-paper p-5 lg:block" aria-label={t.booking.summary.title}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">{t.booking.summary.title}</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div><dt className="text-muted">{t.booking.summary.service}</dt><dd className="font-bold text-navy">{form.serviceId ? serviceName(form.serviceId) : t.booking.summary.empty}</dd></div>
              <div><dt className="text-muted">{t.booking.summary.doctor}</dt><dd className="font-bold text-navy">{form.doctor || t.booking.doctor.none}</dd></div>
              <div><dt className="text-muted">{t.booking.summary.when}</dt><dd className="font-bold text-navy">{when || t.booking.summary.empty}</dd></div>
            </dl>
          </div>
        </div>

        <Reveal className="min-w-0">
          <div ref={panelRef} className="rounded-[2rem] border border-line bg-paper p-5 shadow-soft sm:p-9">
            {done ? (
              <div role="status">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-teal text-white"><Check size={28} aria-hidden="true" /></span>
                <h3 ref={setHeading} tabIndex={-1} className="mt-5 text-4xl outline-none">{t.booking.done.title}</h3>
                <p className="mt-3 max-w-lg text-muted">{t.booking.done.body}</p>
                <dl className="mt-6 divide-y divide-line rounded-2xl border border-line text-sm">
                  <div className="flex justify-between gap-4 p-4"><dt className="text-muted">{t.booking.done.ref}</dt><dd className="font-mono font-bold text-navy" translate="no">{done.ref}</dd></div>
                  <div className="flex justify-between gap-4 p-4"><dt className="text-muted">{t.booking.summary.service}</dt><dd className="text-right font-bold text-navy">{serviceName(done.serviceId)}</dd></div>
                  <div className="flex justify-between gap-4 p-4"><dt className="text-muted">{t.booking.summary.when}</dt><dd className="text-right font-bold text-navy">{when}</dd></div>
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button type="button" className="btn btn-primary" onClick={reset}>{t.booking.done.another}</button>
                  <a href={`tel:${clinic.phone.tel}`} className="btn btn-ghost"><Phone size={18} aria-hidden="true" />{t.cta.callClinic}</a>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <ol className="flex items-center gap-2" aria-label={t.booking.stepOf(step + 1, 3)}>
                  {t.booking.steps.map((label, i) => (
                    <li key={label} className="flex min-w-0 flex-1 items-center gap-2" aria-current={i === step ? 'step' : undefined}>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${i < step ? 'bg-teal text-white' : i === step ? 'bg-navy text-white' : 'bg-sand text-muted'}`}>
                        {i < step ? <Check size={16} aria-hidden="true" /> : i + 1}
                      </span>
                      <span className={`hidden truncate text-sm font-bold sm:block ${i === step ? 'text-navy' : 'text-muted'}`}>{label}</span>
                      {i < 2 && <span className="h-px flex-1 bg-line" aria-hidden="true" />}
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-sm font-bold text-navy sm:hidden">{t.booking.stepOf(step + 1, 3)} · {t.booking.steps[step]}</p>

                {step === 0 && (
                  <div className="mt-7">
                    <fieldset>
                      <legend ref={setHeading} tabIndex={-1} className="mb-1 font-display text-3xl text-navy outline-none">{t.booking.service.label}</legend>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[...services.map((s) => ({ id: s.id as string, label: s.name[lang] })), { id: 'general-consult', label: t.booking.service.general }].map((o, i) => (
                          <label key={o.id} className="relative block">
                            <input type="radio" name="service" value={o.id} checked={form.serviceId === o.id} onChange={() => set('serviceId', o.id)} data-field={i === 0 ? 'serviceId' : undefined} className="peer sr-only" aria-describedby={err('serviceId') ? errId('serviceId') : undefined} />
                            <span className="flex min-h-12 items-center gap-2 rounded-full border border-[#b9ae9a] bg-white px-4 py-2 text-[0.92rem] font-semibold text-ink transition-colors hover:border-navy peer-checked:border-teal peer-checked:bg-teal peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal">
                              {form.serviceId === o.id && <Check size={16} strokeWidth={3} aria-hidden="true" />}
                              {o.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {err('serviceId') && <p id={errId('serviceId')} className="field-error" role="alert">{err('serviceId')}</p>}
                    </fieldset>
                    <div className="mt-6">
                      <label htmlFor="doctor" className="field-label">{t.booking.doctor.label} <span className="font-normal text-muted">({t.common.optional})</span></label>
                      <select id="doctor" className="field" value={form.doctor} onChange={(e) => set('doctor', e.target.value)} aria-describedby="doctor-hint">
                        <option value="">{t.booking.doctor.none}</option>
                        {doctors.map((d) => <option key={d.id} value={d.name}>{d.name} · {pick(d.specialty)}</option>)}
                      </select>
                      {doctors.length === 0 && <p id="doctor-hint" className="mt-1.5 text-sm text-muted">{t.booking.doctor.hint}</p>}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-7">
                    <fieldset>
                      <legend ref={setHeading} tabIndex={-1} className="mb-1 font-display text-3xl text-navy outline-none">{t.booking.date.label}</legend>
                      <p className="text-sm text-muted">{t.booking.date.hint}</p>
                      <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                        {days.map((d, i) => (
                          <label key={d.iso} className="relative shrink-0">
                            <input type="radio" name="day" value={d.iso} checked={form.dayIso === d.iso} onChange={() => { set('dayIso', d.iso); set('hour', null) }} data-field={i === 0 ? 'dayIso' : undefined} className="peer sr-only" />
                            <span className="flex h-[4.6rem] w-[4.2rem] flex-col items-center justify-center rounded-2xl border border-[#b9ae9a] bg-white text-navy transition-colors hover:border-navy peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal">
                              <span className="text-[0.7rem] font-bold uppercase tracking-wider opacity-80">{formatDay(d, lang, { weekday: 'short' })}</span>
                              <span className="font-display text-2xl font-semibold leading-none">{formatDay(d, lang, { day: 'numeric' })}</span>
                              <span className="text-[0.7rem] opacity-80">{formatDay(d, lang, { month: 'short' })}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      {err('dayIso') && <p className="field-error" role="alert">{err('dayIso')}</p>}
                    </fieldset>

                    <fieldset className="mt-6" disabled={!form.dayIso}>
                      <legend className="field-label">{t.booking.time.label}</legend>
                      <p className="mb-3 inline-flex rounded-full bg-sand px-3 py-1 text-xs font-bold text-clay">{t.booking.time.simulated}</p>
                      {form.dayIso ? (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {SLOT_HOURS.map((h, i) => {
                            const taken = isSlotTaken(form.dayIso, h)
                            return (
                              <label key={h} className="relative block">
                                <input type="radio" name="time" value={h} disabled={taken} checked={form.hour === h} onChange={() => set('hour', h)} data-field={i === 0 ? 'hour' : undefined} className="peer sr-only" />
                                <span className={`flex min-h-12 items-center justify-center rounded-xl border text-[0.95rem] font-bold transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal ${taken ? 'cursor-not-allowed border-line bg-sand/60 text-[#7a7468] line-through' : 'border-[#b9ae9a] bg-white text-navy hover:border-navy peer-checked:border-teal peer-checked:bg-teal peer-checked:text-white'}`}>
                                  {slotLabel(h)}
                                  {taken && <span className="sr-only"> — {t.booking.time.unavailable}</span>}
                                </span>
                              </label>
                            )
                          })}
                        </div>
                      ) : <p className="text-sm text-muted">{t.booking.errors.date}</p>}
                      {err('hour') && <p className="field-error" role="alert">{err('hour')}</p>}
                    </fieldset>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-7">
                    <h3 ref={setHeading} tabIndex={-1} className="font-display text-3xl outline-none">{t.booking.steps[2]}</h3>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="b-name" className="field-label">{t.booking.details.name} <span aria-hidden="true">*</span></label>
                        <input id="b-name" data-field="name" className="field" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!err('name')} aria-describedby={err('name') ? errId('name') : undefined} required />
                        {err('name') && <p id={errId('name')} className="field-error">{err('name')}</p>}
                      </div>
                      <div>
                        <label htmlFor="b-phone" className="field-label">{t.booking.details.phone} <span aria-hidden="true">*</span></label>
                        <input id="b-phone" data-field="phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!err('phone')} aria-describedby={`b-phone-hint${err('phone') ? ' ' + errId('phone') : ''}`} required />
                        <p id="b-phone-hint" className="mt-1.5 text-sm text-muted">{t.booking.details.phoneHint}</p>
                        {err('phone') && <p id={errId('phone')} className="field-error">{err('phone')}</p>}
                      </div>
                      <div>
                        <label htmlFor="b-email" className="field-label">{t.booking.details.email} <span className="font-normal text-muted">({t.common.optional})</span></label>
                        <input id="b-email" data-field="email" className="field" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!err('email')} aria-describedby={err('email') ? errId('email') : undefined} />
                        {err('email') && <p id={errId('email')} className="field-error">{err('email')}</p>}
                      </div>
                      <div>
                        <label htmlFor="b-lang" className="field-label">{t.booking.details.language}</label>
                        <select id="b-lang" className="field" value={form.contactLang} onChange={(e) => set('contactLang', e.target.value as Lang)}>
                          {LANGS.map((l) => <option key={l} value={l} lang={l}>{LANG_LABEL[l].native}</option>)}
                        </select>
                      </div>
                      <fieldset>
                        <legend className="field-label">{t.booking.details.channel}</legend>
                        <div className="flex gap-2">
                          {(['phone', 'whatsapp'] as const).map((c) => (
                            <label key={c} className="relative flex-1">
                              <input type="radio" name="channel" value={c} checked={form.channel === c} onChange={() => set('channel', c)} className="peer sr-only" />
                              <span className="flex min-h-12 items-center justify-center rounded-xl border border-[#b9ae9a] bg-white px-2 text-center text-[0.88rem] font-bold text-navy peer-checked:border-teal peer-checked:bg-teal-soft peer-checked:text-teal-deep peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal">
                                {c === 'phone' ? t.booking.details.channelPhone : t.booking.details.channelWhatsapp}
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <div className="sm:col-span-2">
                        <label htmlFor="b-note" className="field-label">{t.booking.details.note} <span className="font-normal text-muted">({t.common.optional})</span></label>
                        <textarea id="b-note" className="field min-h-24" rows={3} maxLength={300} value={form.note} onChange={(e) => set('note', e.target.value)} aria-describedby="b-note-hint" />
                        <p id="b-note-hint" className="mt-1.5 text-sm text-muted">{t.booking.details.noteHint}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="flex cursor-pointer items-start gap-3 text-[0.92rem]">
                          <input type="checkbox" data-field="consent" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#0e6064]" aria-invalid={!!err('consent')} aria-describedby={err('consent') ? errId('consent') : undefined} />
                          <span>{t.booking.details.consent}</span>
                        </label>
                        {err('consent') && <p id={errId('consent')} className="field-error">{err('consent')}</p>}
                      </div>
                    </div>
                    {Object.keys(errors).some((k) => errors[k as keyof Form]) && <p className="field-error mt-4" role="alert">{t.booking.errors.fix}</p>}
                  </div>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  {step > 0 ? (
                    <button type="button" onClick={back} className="btn btn-ghost"><ArrowLeft size={18} aria-hidden="true" />{t.booking.nav.back}</button>
                  ) : <span />}
                  {step < 2 ? (
                    <button key="next" type="button" onClick={next} className="btn btn-primary">{t.booking.nav.next}<ArrowRight size={18} aria-hidden="true" /></button>
                  ) : (
                    <button key="submit" type="submit" className="btn btn-primary">{t.booking.nav.submit}</button>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
