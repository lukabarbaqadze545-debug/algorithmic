import { useI18n } from '../i18n'
import { Reveal, SectionHead } from './ui'

export function Why() {
  const { t } = useI18n()
  return (
    <section id="why" aria-labelledby="why-title" className="on-dark bg-navy-deep py-20 text-ivory sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-40 lg:self-start">
          <SectionHead dark id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />
        </Reveal>
        <div>
          <ol className="divide-y divide-white/15 border-y border-white/15">
            {t.why.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 50} className="grid grid-cols-[3.2rem_1fr] gap-x-4 py-7 sm:grid-cols-[4.5rem_1fr] sm:py-8">
                  <span className="font-display text-[2.4rem] leading-none text-mint sm:text-5xl" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-[1.65rem] !text-ivory sm:text-3xl">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-ivory/80">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl border border-dashed border-ivory/35 p-4 text-sm leading-relaxed text-ivory/80">{t.why.todo}</p>
        </div>
      </div>
    </section>
  )
}
