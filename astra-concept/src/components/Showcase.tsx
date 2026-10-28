import { Bot, MessageSquareText, ShieldCheck, Sparkles } from 'lucide-react'
import { clinic } from '../data/clinic'
import { priceLabels } from '../data/services'
import { useI18n } from '../i18n'
import { Reveal, SectionHead, useUi } from './ui'

const pointIcons = [MessageSquareText, Sparkles, ShieldCheck]

export function Showcase() {
  const { t, lang } = useI18n()
  const { openChat } = useUi()
  return (
    <section id="concierge" aria-labelledby="concierge-title" className="on-dark relative overflow-hidden bg-navy py-20 text-ivory sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgb(14 96 100 / 0.4), rgb(14 96 100 / 0))' }} aria-hidden="true" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHead dark id="concierge-title" eyebrow={t.showcase.eyebrow} title={t.showcase.title} lead={t.showcase.lead} />
          </Reveal>
          <ul className="mt-10 space-y-6">
            {t.showcase.points.map((p, i) => {
              const Icon = pointIcons[i]
              return (
                <li key={p.title}>
                  <Reveal delay={i * 80} className="flex gap-4">
                    <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-mint/40 text-mint">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-[1.02rem] font-bold !text-ivory">{p.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-ivory/75">{p.text}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.14em] text-mint">{t.showcase.try}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {t.showcase.prompts.map((p) => (
              <button key={p} type="button" onClick={() => openChat(p)} className="min-h-11 rounded-full border border-ivory/35 px-4 py-2 text-left text-[0.9rem] font-semibold text-ivory transition-colors hover:border-mint hover:bg-white/5">
                {p}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => openChat()} className="btn btn-light mt-8 w-full sm:w-auto">
            <Bot size={19} aria-hidden="true" />
            {t.showcase.open}
          </button>
        </div>

        <Reveal delay={120}>
          <div className="mx-auto w-full max-w-[400px]">
            <div className="rounded-[2rem] border border-white/15 bg-navy-deep p-3 shadow-lift">
              <div className="rounded-[1.5rem] bg-ivory p-4 text-ink" aria-hidden="true">
                <div className="flex items-center gap-3 border-b border-line pb-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-teal text-white"><Bot size={18} /></span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-navy">{t.concierge.title}</p>
                    <p className="text-xs text-muted">{t.concierge.badge}</p>
                  </div>
                </div>
                <div className="space-y-3 py-4 text-[0.88rem]">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-navy px-3.5 py-2 text-white">{t.showcase.prompts[0]}</p>
                  <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-3">
                    <p>{t.concierge.pricesIntro}</p>
                    <div className="mt-2 divide-y divide-line rounded-xl bg-sand">
                      {clinic.prices.map((p) => (
                        <div key={p.id} className="flex items-baseline justify-between gap-3 px-3 py-2">
                          <span className="text-[0.8rem] leading-snug">{priceLabels[p.id][lang]}</span>
                          <b className="shrink-0 font-display text-lg text-navy">{t.services.priceFrom(p.usd)}</b>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted">{t.services.detail.priceNote}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-ivory/70">{t.showcase.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
