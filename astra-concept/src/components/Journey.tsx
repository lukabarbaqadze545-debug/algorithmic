import { useI18n } from '../i18n'
import { Reveal, SectionHead } from './ui'

export function Journey() {
  const { t } = useI18n()
  return (
    <section id="journey" aria-labelledby="journey-title" className="bg-ivory py-20 sm:py-28">
      <div className="wrap">
        <Reveal>
          <SectionHead id="journey-title" eyebrow={t.journey.eyebrow} title={t.journey.title} />
        </Reveal>
        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          <span className="absolute left-[1.55rem] top-4 hidden h-px w-[calc(100%-3rem)] bg-line lg:block" aria-hidden="true" />
          <span className="absolute bottom-4 left-[1.55rem] top-4 w-px bg-line lg:hidden" aria-hidden="true" />
          {t.journey.steps.map((s, i) => (
            <li key={s.title} className="relative pl-[4.5rem] lg:pl-0 lg:pt-[4.5rem]">
              <Reveal delay={i * 90}>
                <span className="absolute left-0 top-0 grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-teal bg-ivory font-display text-2xl font-semibold text-teal">{i + 1}</span>
                <h3 className="font-display text-[1.7rem]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-sm text-muted">{t.journey.note}</p>
      </div>
    </section>
  )
}
