import { useEffect, useState } from 'react'
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n'
import { openStatus } from '../lib/hours'
import { Reveal, SectionHead, useUi } from './ui'

export function Contact() {
  const { t, lang } = useI18n()
  const { goBooking } = useUi()
  const [status, setStatus] = useState(() => openStatus(t))
  useEffect(() => setStatus(openStatus(t)), [t])

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ivory py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHead id="contact-title" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
          </Reveal>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="flex items-center gap-2 text-sm font-bold text-muted"><Phone size={16} aria-hidden="true" />{t.contact.phone}</dt>
              <dd><a href={`tel:${clinic.phone.tel}`} className="font-display text-3xl font-semibold text-navy hover:text-teal" translate="no">{clinic.phone.display}</a></dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="flex items-center gap-2 text-sm font-bold text-muted"><MapPin size={16} aria-hidden="true" />{t.contact.address}</dt>
              <dd className="text-lg font-semibold text-navy">{clinic.address[lang]}</dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="flex items-center gap-2 text-sm font-bold text-muted"><Clock size={16} aria-hidden="true" />{t.contact.hours}</dt>
              <dd>
                <p className="text-lg font-semibold text-navy">{t.contact.hoursValue}</p>
                <p className="mt-1 text-sm text-muted">{t.contact.weekend}</p>
                <p className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${status.open ? 'bg-teal-soft text-teal-deep' : 'bg-clay/10 text-clay'}`} role="status">
                  <span className={`h-2 w-2 rounded-full ${status.open ? 'bg-teal' : 'bg-clay'}`} aria-hidden="true" />
                  {status.text}
                </p>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`tel:${clinic.phone.tel}`} className="btn btn-primary"><Phone size={18} aria-hidden="true" />{t.cta.callClinic}</a>
            <a href={clinic.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><MessageCircle size={18} aria-hidden="true" />{t.cta.whatsapp}</a>
            <button type="button" onClick={() => goBooking()} className="btn btn-ghost">{t.cta.book}</button>
          </div>
          <a href={clinic.officialSite} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-teal underline-offset-4 hover:underline">
            {t.cta.officialSite}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <Reveal delay={100}>
          <figure className="overflow-hidden rounded-[2rem] border border-line bg-paper">
            <div className="relative aspect-[4/3] bg-teal-soft">
              <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" role="img" aria-label={t.contact.mapLabel}>
                <rect width="400" height="300" fill="#e2efec" />
                <g fill="none" stroke="#fff" strokeLinecap="round">
                  <path d="M-10 220C80 200 140 140 230 150S360 90 420 60" strokeWidth="14" />
                  <path d="M60 -10C80 70 120 130 110 310" strokeWidth="9" />
                  <path d="M250 -10C240 80 270 180 330 310" strokeWidth="9" />
                  <path d="M-10 90C100 100 200 60 420 190" strokeWidth="6" />
                </g>
                <g fill="#cfe3df"><rect x="130" y="170" width="70" height="40" rx="6" /><rect x="285" y="30" width="60" height="50" rx="6" /><rect x="10" y="20" width="40" height="55" rx="6" /></g>
                <g transform="translate(205 120)">
                  <circle r="30" fill="#0e6064" fillOpacity=".16" />
                  <path d="M0 22C-14 6-16-4-16-10a16 16 0 0 1 32 0c0 6-2 16-16 32z" fill="#0e6064" />
                  <circle cy="-10" r="6" fill="#fff" />
                </g>
              </svg>
            </div>
            <figcaption className="flex items-center justify-between gap-4 p-4 text-sm">
              <span className="text-muted">{t.contact.mapNote}</span>
              <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-1 font-bold text-teal hover:underline">{t.cta.directions}<ArrowUpRight size={16} aria-hidden="true" /></a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
