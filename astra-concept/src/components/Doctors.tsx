import { useI18n } from '../i18n'
import { doctors } from '../data/doctors'
import { Reveal, SectionHead, useUi } from './ui'

function Todo({ children }: { children: string }) {
  return <span className="inline-block rounded-md border border-dashed border-[#9a8f7b] px-2.5 py-1 text-[0.85rem] italic text-muted">{children}</span>
}

export function Doctors() {
  const { t, pick, lang } = useI18n()
  const { goBooking } = useUi()
  const f = t.doctors.fields

  return (
    <section id="doctors" aria-labelledby="doctors-title" className="border-y border-line bg-sand/60 py-20 sm:py-28">
      <div className="wrap">
        <Reveal>
          <SectionHead id="doctors-title" eyebrow={t.doctors.eyebrow} title={t.doctors.title} lead={t.doctors.lead} />
        </Reveal>

        {doctors.length > 0 ? (
          <ul className="mt-12 space-y-14">
            {doctors.map((d) => (
              <li key={d.id} className="grid gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-14">
                <div className="aspect-[4/5] rounded-t-[999px] bg-gradient-to-b from-[#14566a] to-navy-deep" role="img" aria-label={d.name} />
                <div>
                  <h3 className="text-4xl">{d.name}</h3>
                  <p className="mt-2 text-lg font-semibold text-teal">{pick(d.specialty)}</p>
                  <dl className="mt-6 divide-y divide-line border-y border-line">
                    {d.experience && <Row k={t.doctors.experienceLabel} v={pick(d.experience)} />}
                    {d.education && <Row k={f.education} v={pick(d.education)} />}
                    {d.languages && <Row k={f.languages} v={d.languages.join(' · ')} />}
                  </dl>
                  <button type="button" className="btn btn-primary mt-8" onClick={() => goBooking()}>{t.doctors.bookWith}</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-12">
            <article className="grid gap-8 rounded-[2rem] border border-line bg-paper p-5 sm:p-8 md:grid-cols-[minmax(0,300px)_1fr] md:gap-14 md:p-10" lang={lang} aria-label={t.doctors.placeholderBadge}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[210px] md:max-w-[300px] overflow-hidden rounded-t-[999px] bg-gradient-to-b from-[#14566a] via-navy to-navy-deep">
                <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <circle cx="50" cy="52" r="15" fill="none" stroke="#faf7f1" strokeOpacity="0.55" strokeWidth="1" />
                  <path d="M20 125c2-24 14-38 30-38s28 14 30 38" fill="none" stroke="#faf7f1" strokeOpacity="0.55" strokeWidth="1" />
                </svg>
                <p className="absolute inset-x-0 bottom-5 text-center text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ivory/80">{t.doctors.portrait}</p>
              </div>
              <div>
                <p className="inline-flex rounded-full bg-clay/10 px-3 py-1 text-xs font-bold text-clay">{t.doctors.placeholderBadge}</p>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {([['name', f.name], ['specialty', f.specialty], ['experience', f.experience], ['education', f.education], ['languages', f.languages]] as const).map(([key, label]) => (
                    <div key={key} className="grid gap-1.5 py-4 lg:grid-cols-[11rem_1fr] lg:gap-6">
                      <dt className="text-sm font-bold text-navy">{label}</dt>
                      <dd><Todo>{t.doctors.todo}</Todo></dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-muted">{t.doctors.layoutNote}</p>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1.5 py-4 lg:grid-cols-[11rem_1fr] lg:gap-6">
      <dt className="text-sm font-bold text-navy">{k}</dt>
      <dd>{v}</dd>
    </div>
  )
}
