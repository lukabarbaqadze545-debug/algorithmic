import { Link } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { SectionHeading } from '../components/SectionHeading'
import { BookCover } from '../components/BookCover'
import { AvailabilityLabel } from '../components/AvailabilityLabel'
import { SecondaryButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { books, series, volumeLabel } from '../data/books'
import { useSeo } from '../lib/seo'

export default function Books() {
  useSeo(
    'წიგნები',
    'პითონის სამტომეული — სრული სახელმძღვანელო ქართულად: ნულიდან პროექტებამდე და ოლიმპიადამდე. Algorithmic-ის გამოცემები.',
  )
  return (
    <PageContainer className="pb-24 pt-32 lg:pb-32 lg:pt-44">
      <SectionHeading
        as="h1"
        eyebrow="კატალოგი"
        title="ჩვენი გამოცემები"
        text={`პითონის სამტომეული — ${series.label}: ${series.tagline}. წიგნები ჯერ მომზადების პროცესშია, ამიტომ თითოეული ტომის სტატუსი მის გვერდზე მკაფიოდ არის მითითებული.`}
      />

      <ol className="mt-16 border-t border-line lg:mt-24">
        {books.map((book, i) => (
          <li key={book.id} className="border-b border-line">
            <Reveal delay={i * 0.05}>
              <article className="group grid gap-8 py-10 sm:grid-cols-[12rem_1fr] sm:gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16 lg:py-14">
                <Link
                  to={`/books/${book.slug}`}
                  aria-label={`${book.title} — გარეკანი`}
                  className="mx-auto block w-full max-w-[17rem] self-start transition-transform sm:mx-0 sm:max-w-none duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none"
                >
                  <BookCover book={book} sizes="(min-width: 1024px) 17rem, (min-width: 640px) 12rem, 17rem" />
                </Link>
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="eyebrow">{volumeLabel(book)}</span>
                    <AvailabilityLabel status={book.status} />
                  </div>
                  <h2 className="mt-4 text-xl leading-snug text-ivory sm:text-2xl lg:text-3xl">
                    <Link to={`/books/${book.slug}`} className="transition-colors hover:text-gold">
                      {book.title}
                    </Link>
                  </h2>
                  {book.subtitle && <p className="mt-2 text-ivory/70">{book.subtitle}</p>}
                  {book.summary && <p className="prose-ka mt-4 text-[0.95rem] leading-7">{book.summary}</p>}
                  <div className="mt-6">
                    <SecondaryButton to={`/books/${book.slug}`} size="sm">
                      დეტალურად
                    </SecondaryButton>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </PageContainer>
  )
}
