import { ImageOff, MessageSquareQuote } from 'lucide-react'
import { useI18n } from '../i18n'
import { Reveal, SectionHead } from './ui'

export function Reviews() {
  const { t } = useI18n()
  const items = [
    { icon: MessageSquareQuote, title: t.reviews.reviews, text: t.reviews.reviewsText },
    { icon: ImageOff, title: t.reviews.photos, text: t.reviews.photosText },
  ]
  return (
    <section aria-labelledby="reviews-title" className="border-t border-line bg-sand/60 py-20 sm:py-24">
      <div className="wrap">
        <Reveal>
          <SectionHead id="reviews-title" eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-3xl border-2 border-dashed border-[#a89d88] bg-ivory/60 p-6 sm:p-8">
              <Icon size={30} strokeWidth={1.4} className="mt-1 shrink-0 text-clay" aria-hidden="true" />
              <div>
                <p className="mb-2 inline-flex rounded-full bg-clay/10 px-3 py-0.5 text-xs font-bold text-clay">{t.reviews.badge}</p>
                <h3 className="font-sans text-lg font-bold leading-snug !text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
