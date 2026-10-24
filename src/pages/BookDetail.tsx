import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { PageContainer } from '../components/PageContainer'
import { BookCover } from '../components/BookCover'
import { AvailabilityLabel } from '../components/AvailabilityLabel'
import { InterestAction } from '../components/InterestAction'
import { SecondaryButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { findBook, otherBooks, pythonBooks, series, statusLabels, volumeLabel, type Book } from '../data/books'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

/** A content section. Renders nothing when there is no data, so visitors never see empty placeholders. */
function Block({ title, children, show }: { title: string; children: ReactNode; show: boolean }) {
  if (!show) return null
  return (
    <section className="grid gap-5 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-12">
      <h2 className="text-xl text-ivory lg:col-span-4 lg:text-2xl">{title}</h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-4 text-ivory/85">
          <span aria-hidden="true" className="mt-[0.8em] size-1.5 shrink-0 rotate-45 bg-gold" />
          {t}
        </li>
      ))}
    </ul>
  )
}

const has = (a?: unknown[]) => Boolean(a?.length)

function Detail({ book }: { book: Book }) {
  useSeo(book.title, book.summary ?? `${book.title} — ${volumeLabel(book)}, Algorithmic.`)
  // Related books come from the same group (Python series vs. standalone editions).
  const others = (book.volume ? pythonBooks : otherBooks).filter((b) => b.id !== book.id)

  return (
    <PageContainer className="pb-24 pt-28 lg:pb-32 lg:pt-36">
      <nav aria-label="გვერდის მდებარეობა" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li><Link to="/books" className="transition-colors hover:text-gold">წიგნები</Link></li>
          <li aria-hidden="true" className="text-gold/60">/</li>
          <li aria-current="page" className="text-ivory/80">{book.title}</li>
        </ol>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
            <BookCover book={book} priority sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="eyebrow">{volumeLabel(book)}</span>
            <AvailabilityLabel status={book.status} />
          </div>
          <h1 className="mt-6 text-[clamp(2rem,4.2vw,3.25rem)] leading-tight text-ivory">{book.title}</h1>
          {book.subtitle && <p className="mt-4 text-xl leading-snug text-ivory/70">{book.subtitle}</p>}
          {book.summary && <p className="prose-ka mt-6 text-lg">{book.summary}</p>}

          <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 border-y border-line py-7 text-[0.95rem]">
            {book.volume && (
              <>
                <dt className="text-muted">სერია</dt>
                <dd className="text-ivory">{series.title} — {series.tagline}</dd>
              </>
            )}
            <dt className="text-muted">სტატუსი</dt>
            <dd className="text-ivory">{statusLabels[book.status]}</dd>
            {book.price && (
              <>
                <dt className="text-muted">ფასი</dt>
                <dd className="text-ivory">{book.price.amount} {book.price.currency}</dd>
              </>
            )}
            {book.samplePdf && (
              <>
                <dt className="text-muted">ნიმუში (PDF)</dt>
                <dd>
                  <a href={book.samplePdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold underline-offset-4 hover:underline">
                    <FileText aria-hidden="true" className="size-4" />
                    ნიმუშის გახსნა
                  </a>
                </dd>
              </>
            )}
          </dl>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-start">
            <InterestAction book={book} />
            {book.samplePdf && (
              <SecondaryButton href={book.samplePdf} arrow={false}>
                ნიმუშის ნახვა
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 lg:mt-28">
        <Block title="წიგნის შესახებ" show={has(book.description)}>
          <div className="prose-ka space-y-4">{book.description?.map((p) => <p key={p}>{p}</p>)}</div>
        </Block>
        <Block title="ვისთვის არის განკუთვნილი" show={has(book.audience)}>
          <Bullets items={book.audience ?? []} />
        </Block>
        <Block title="ამ ტომში" show={has(book.parts)}>
          <ol>
            {book.parts?.map((part) => (
              <li key={part.numeral} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line-soft py-4 first:pt-0 last:border-b-0 sm:grid-cols-[3.5rem_1fr_auto]">
                <span className="numeral text-xl">{part.numeral}</span>
                <span className="text-ivory">{part.title}</span>
                {part.chapters && <span className="col-start-2 text-sm text-muted sm:col-start-3">{part.chapters}</span>}
              </li>
            ))}
          </ol>
        </Block>
        <Block title="განხილული თემები" show={has(book.topics)}>
          <Bullets items={book.topics ?? []} />
        </Block>
        <Block title="რას ისწავლით" show={has(book.objectives)}>
          <Bullets items={book.objectives ?? []} />
        </Block>
        <Block title="სარჩევი" show={has(book.contents)}>
          <ol className="space-y-6">
            {book.contents?.map((ch, i) => (
              <li key={ch.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                <span className="numeral text-lg">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-ivory">{ch.title}</p>
                  {ch.items && <ul className="mt-2 space-y-1 text-[0.95rem] text-muted">{ch.items.map((it) => <li key={it}>{it}</li>)}</ul>}
                </div>
              </li>
            ))}
          </ol>
        </Block>
        <div className="border-t border-line" />
      </div>

      <Reveal className="mt-16">
        <h2 className="eyebrow mb-6">{book.volume ? 'სხვა ტომები' : 'სხვა გამოცემები'}</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {others.map((b) => (
            <li key={b.id}>
              <Link
                to={`/books/${b.slug}`}
                className="flex h-full items-baseline gap-5 border border-line px-5 py-4 transition-colors hover:border-gold/60 hover:bg-gold/[0.04]"
              >
                {b.volume && <span className="numeral w-9 shrink-0 text-xl">{b.volume}</span>}
                <span>
                  <span className="block text-ivory">{b.title}</span>
                  {b.subtitle && <span className="mt-1 block text-sm text-muted">{b.subtitle}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </PageContainer>
  )
}

export default function BookDetail() {
  const { slug } = useParams()
  const book = findBook(slug)
  // Keyed so the per-book SEO hook and scroll state reset when switching between books.
  return book ? <Detail key={book.id} book={book} /> : <NotFound />
}
