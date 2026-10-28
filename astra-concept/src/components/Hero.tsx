import { ArrowDown, CalendarCheck } from 'lucide-react'
import { useI18n } from '../i18n'
import { HeroArt } from './HeroArt'
import { scrollToId, useUi } from './ui'

export function Hero() {
  const { t } = useI18n()
  const { goBooking } = useUi()
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full" style={{ background: 'radial-gradient(closest-side, rgb(226 239 236 / 0.85), rgb(226 239 236 / 0))' }} aria-hidden="true" />
      <div className="wrap relative grid items-center gap-10 pb-16 pt-9 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-24 lg:pt-14">
        <div>
          <p className="eyebrow rise">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="rise mt-5 text-[clamp(2.45rem,8.2vw,5.1rem)]" style={{ animationDelay: '0.08s' }}>
            {t.hero.title}
          </h1>
          <p className="rise mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '0.18s' }}>
            {t.hero.lead}
          </p>
          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.28s' }}>
            <button type="button" onClick={() => goBooking()} className="btn btn-primary sm:min-w-[15rem]">
              <CalendarCheck size={19} aria-hidden="true" />
              {t.cta.book}
            </button>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToId('services') }} className="btn btn-ghost">
              {t.cta.explore}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="rise mt-5 max-w-md text-sm text-muted" style={{ animationDelay: '0.36s' }}>
            {t.hero.note}
          </p>
        </div>
        <div className="rise" style={{ animationDelay: '0.2s' }}>
          <HeroArt />
        </div>
      </div>
    </section>
  )
}
