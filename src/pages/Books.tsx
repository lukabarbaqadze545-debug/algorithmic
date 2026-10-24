import { Link } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { SectionHeading } from '../components/SectionHeading'
import { BookCover } from '../components/BookCover'
import { AvailabilityLabel } from '../components/AvailabilityLabel'
import { SecondaryButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { otherBooks, pythonBooks, series, volumeLabel, type Book } from '../data/books'
import { useSeo } from '../lib/seo'

function BookList({ items, label }: { items: Book[]; label: string }) {
  return (
    <ol aria-label={label} className="border-t border-line">
      {items.map((book, i) => (
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
                <h3 className="mt-4 text-xl leading-snug text-ivory sm:text-2xl lg:text-3xl">
                  <Link to={`/books/${book.slug}`} className="transition-colors hover:text-gold">
                    {book.title}
                  </Link>
                </h3>
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
  )
}

export default function Books() {
  useSeo(
    'წიგნები',
    'Algorithmic-ის გამოცემები: პითონის სამტომეული, „დაღუპული გმირები“, „მანიპულაციის ფსიქოლოგია“, „მსოფლიოს 50 ყველაზე ცნობილი კონსპირაციული თეორია“ და „ბიზნესი ნულიდან“.',
  )
  return (
    <PageContainer className="pb-24 pt-32 lg:pb-32 lg:pt-44">
      <SectionHeading
        as="h1"
        eyebrow="კატალოგი"
        title="ჩვენი გამოცემები"
        text="წიგნები ჯერ მომზადების პროცესშია, ამიტომ თითოეული წიგნის სტატუსი მის გვერდზე მკაფიოდ არის მითითებული."
      />

      <section aria-labelledby="python-series" className="mt-16 lg:mt-24">
        <h2 id="python-series" className="eyebrow mb-6">
          პითონის სამტომეული
        </h2>
        <p className="prose-ka mb-8 max-w-2xl">
          {series.label}: {series.tagline}.
        </p>
        <BookList items={pythonBooks} label="პითონის სამტომეული" />
      </section>

      <section aria-labelledby="other-editions" className="mt-20 lg:mt-28">
        <h2 id="other-editions" className="eyebrow mb-6">
          სხვა გამოცემები
        </h2>
        <BookList items={otherBooks} label="სხვა გამოცემები" />
      </section>
    </PageContainer>
  )
}
