import { clinic } from '../data/clinic'
import { services } from '../data/services'
import { useI18n } from '../i18n'
import { Brand } from './Brand'
import { LangSwitch } from './LangSwitch'
import { scrollToId, useUi } from './ui'

export function Footer() {
  const { t, lang } = useI18n()
  const { openNotes } = useUi()
  const nav = [['services', t.nav.services], ['concierge', t.nav.concierge], ['doctors', t.nav.doctors], ['booking', t.nav.booking], ['why', t.nav.why], ['journey', t.nav.journey], ['contact', t.nav.contact]] as const
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToId(id) }
  return (
    <footer className="on-dark bg-navy-deep pb-[calc(2.5rem+var(--bar-h)+env(safe-area-inset-bottom))] pt-16 text-ivory/80 md:pb-10">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Brand dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">{clinic.address[lang]}</p>
            <a href={`tel:${clinic.phone.tel}`} className="mt-2 inline-block text-lg font-bold text-ivory hover:text-mint" translate="no">{clinic.phone.display}</a>
            <div className="mt-6"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-ivory/70">{t.footer.language}</p><LangSwitch dark /></div>
          </div>
          <nav aria-label={t.footer.navigate}>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] !text-mint">{t.footer.navigate}</h2>
            <ul className="mt-4 space-y-1">
              {nav.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} onClick={go(id)} className="inline-flex min-h-10 items-center text-[0.95rem] hover:text-white">{label}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.footer.services}>
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] !text-mint">{t.footer.services}</h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.id}><a href="#services" onClick={go('services')} className="inline-flex min-h-10 items-center text-[0.95rem] hover:text-white">{s.name[lang]}</a></li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 lg:col-span-1">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] !text-mint">{t.footer.privacyTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed">{t.footer.privacy}</p>
            <button type="button" onClick={openNotes} className="mt-4 min-h-11 text-left text-sm font-bold text-mint underline underline-offset-4">{t.footer.notes}</button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-5">
          <p className="text-sm font-bold text-ivory">{t.footer.disclaimerTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{t.footer.disclaimer}</p>
        </div>
        <p className="mt-6 text-xs text-ivory/65">© {new Date().getFullYear()} · {t.footer.rights}</p>
      </div>
    </footer>
  )
}
