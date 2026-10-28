import { Clock, Languages, MapPin, Phone } from 'lucide-react'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n'

export function TrustStrip() {
  const { t } = useI18n()
  const items = [
    { icon: Clock, label: t.trust.hoursLabel, value: t.trust.hours },
    { icon: MapPin, label: t.trust.placeLabel, value: t.trust.place },
    { icon: Languages, label: t.trust.langLabel, value: t.trust.langs },
    { icon: Phone, label: t.trust.phoneLabel, value: clinic.phone.display, href: `tel:${clinic.phone.tel}` },
  ]
  return (
    <section aria-label={t.trust.label} className="relative z-10 border-y border-line bg-paper">
      <ul className="wrap grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label, value, href }, i) => (
          <li key={label} className={`flex items-start gap-3 py-4 pr-3 lg:py-6 ${i % 2 === 1 ? 'pl-4 border-l border-line' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''} ${i === 1 ? 'lg:pl-6' : ''} ${i === 3 ? 'lg:pl-6' : ''}`}>
            <span className="mt-0.5 hidden h-9 w-9 shrink-0 sm:grid place-items-center rounded-full bg-teal-soft text-teal">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">{label}</p>
              {href ? (
                <a href={href} className="mt-0.5 block whitespace-nowrap text-[0.92rem] font-bold leading-snug text-navy hover:text-teal" translate="no">{value}</a>
              ) : (
                <p className="mt-0.5 text-[0.92rem] font-bold leading-snug text-navy">{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
