import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Search, X } from 'lucide-react'
import { clinic } from '../data/clinic'
import { groups, priceLabels, services, type GroupId, type Service } from '../data/services'
import { LANGS, useI18n } from '../i18n'
import { serviceIcons } from './serviceIcons'
import { Sheet } from './Sheet'
import { Reveal, SectionHead, useUi } from './ui'

function haystack(s: Service): string {
  return LANGS.flatMap((l) => [s.name[l], s.summary[l], ...s.includes[l]]).join(' ').toLowerCase()
}

export function Services() {
  const { t, lang } = useI18n()
  const { goBooking, openChat } = useUi()
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<GroupId | 'all'>('all')
  const [openId, setOpenId] = useState<Service['id'] | null>(null)

  const index = useMemo(() => new Map(services.map((s) => [s.id, haystack(s)])), [])
  const q = query.trim().toLowerCase()
  const visible = services.filter((s) => (group === 'all' || s.group === group) && (!q || index.get(s.id)!.includes(q)))
  const active = services.find((s) => s.id === openId) ?? null
  const reset = () => { setQuery(''); setGroup('all') }

  return (
    <section id="services" aria-labelledby="services-title" className="bg-ivory py-20 sm:py-28">
      <div className="wrap">
        <Reveal>
          <SectionHead id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <label htmlFor="service-search" className="sr-only">{t.services.searchLabel}</label>
            <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.services.searchPlaceholder}
              className="field !rounded-full !pl-12 !pr-11"
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label={t.common.close} className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-navy">
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>

          <div role="group" aria-label={t.services.filterLabel} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {(['all', ...groups] as const).map((g) => {
              const on = group === g
              return (
                <button
                  key={g}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setGroup(g)}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-[0.88rem] font-bold transition-colors ${on ? 'border-navy bg-navy text-white' : 'border-[#b9ae9a] bg-transparent text-navy hover:border-navy'}`}
                >
                  {g === 'all' ? t.services.all : t.services.groups[g]}
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-5 text-sm text-muted" role="status" aria-live="polite">
          {t.services.count(visible.length, services.length)}
        </p>

        {visible.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-[#b9ae9a] p-8 text-center sm:p-12">
            <p className="font-display text-3xl text-navy">{t.services.empty}</p>
            <p className="mx-auto mt-3 max-w-md text-muted">{t.services.emptyHint}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={reset} className="btn btn-ghost">{t.services.reset}</button>
              <button type="button" onClick={() => openChat()} className="btn btn-primary">{t.cta.askConcierge}</button>
            </div>
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {visible.map((s) => {
              const Icon = serviceIcons[s.id]
              const idx = services.indexOf(s) + 1
              const low = s.prices ? Math.min(...s.prices.map((id) => clinic.prices.find((p) => p.id === id)!.usd)) : null
              return (
                <li key={s.id} className="group relative flex flex-col rounded-3xl border border-line bg-paper transition duration-300 hover:-translate-y-0.5 hover:border-teal hover:shadow-soft sm:p-7 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-soft text-teal sm:h-12 sm:w-12">
                      <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl leading-none text-[#857a66]" aria-hidden="true">{String(idx).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-teal sm:mt-6">{t.services.groups[s.group]}</p>
                  <h3 className="mt-1.5 text-[1.6rem] leading-tight">
                    <button type="button" onClick={() => setOpenId(s.id)} className="text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-offset-2 focus-visible:after:outline-teal">
                      {s.name[lang]}
                    </button>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.95rem] sm:line-clamp-3 leading-relaxed text-muted">{s.summary[lang]}</p>
                  <div className="mt-auto flex min-h-8 items-center justify-between pt-4 sm:pt-6 box-content">
                    {low !== null ? (
                      <span className="rounded-full bg-teal-soft px-3 py-1 text-[0.8rem] font-bold text-teal-deep">{t.services.priceFrom(low)}</span>
                    ) : <span />}
                    <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-navy group-hover:text-teal">
                      {t.services.details}
                      <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <Sheet open={!!active} onClose={() => setOpenId(null)} title={t.services.details} titleId="service-sheet-title">
        {active && (
          <div>
            <p className="eyebrow">{t.services.groups[active.group]}</p>
            <h2 className="mt-3 text-[2.2rem]">{active.name[lang]}</h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{active.summary[lang]}</p>

            <h3 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">{t.services.detail.includes}</h3>
            <ul className="mt-3 space-y-2.5">
              {active.includes[lang].map((item) => (
                <li key={item} className="flex gap-3 text-[0.98rem]">
                  <Check size={18} className="mt-1 shrink-0 text-teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">{t.services.detail.prices}</h3>
            {active.prices ? (
              <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-paper">
                <table className="w-full text-left text-[0.95rem]">
                  <caption className="sr-only">{t.services.detail.prices}</caption>
                  <tbody>
                    {active.prices.map((id) => (
                      <tr key={id} className="border-b border-line last:border-0">
                        <th scope="row" className="p-4 font-semibold text-ink">{priceLabels[id][lang]}</th>
                        <td className="whitespace-nowrap p-4 text-right font-display text-2xl font-semibold text-navy">
                          {t.services.priceFrom(clinic.prices.find((p) => p.id === id)!.usd)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="bg-sand px-4 py-3 text-sm font-semibold text-navy">{t.services.detail.priceNote}</p>
              </div>
            ) : (
              <p className="mt-3 rounded-2xl bg-sand p-4 text-[0.95rem] text-navy">{t.services.detail.noPrice}</p>
            )}

            <p className="mt-6 text-xs italic leading-relaxed text-muted">{t.services.detail.copyNote}</p>

            <div className="mt-8 flex flex-col gap-3">
              <button type="button" className="btn btn-primary" onClick={() => { const id = active.id; setOpenId(null); goBooking(id) }}>
                {t.services.detail.cta}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => { setOpenId(null); openChat(active.name[lang]) }}>
                {t.cta.askConcierge}
              </button>
              <a href={active.id === 'general' ? clinic.officialCaries : clinic.officialServices} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-bold text-teal underline-offset-4 hover:underline">
                {t.services.detail.official}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Sheet>
    </section>
  )
}
