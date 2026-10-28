import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import { clinic } from '../data/clinic'
import { useI18n } from '../i18n'
import { useUi } from './ui'

/** Sticky thumb-zone actions, phones only. */
export function MobileBar() {
  const { t } = useI18n()
  const { goBooking } = useUi()
  const item = 'flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[0.72rem] font-bold leading-none'
  return (
    <nav aria-label={t.mobile.label} className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory pb-[env(safe-area-inset-bottom)] md:hidden" style={{ boxShadow: '0 -8px 24px -12px rgb(11 42 58 / 0.25)' }}>
      <div className="flex gap-2 px-3 pt-2 pb-2">
        <a href={`tel:${clinic.phone.tel}`} className={`${item} text-navy active:bg-sand`}>
          <Phone size={20} aria-hidden="true" />
          {t.mobile.call}
        </a>
        <a href={clinic.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-navy active:bg-sand`}>
          <MessageCircle size={20} aria-hidden="true" />
          {t.mobile.whatsapp}
        </a>
        <button type="button" onClick={() => goBooking()} className={`${item} flex-[1.4] bg-teal text-white active:bg-teal-deep`}>
          <CalendarCheck size={20} aria-hidden="true" />
          {t.mobile.book}
        </button>
      </div>
    </nav>
  )
}
