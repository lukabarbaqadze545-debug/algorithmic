import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { volumeLabel, type Book } from '../data/books'
import { BookCover } from './BookCover'
import { AvailabilityLabel } from './AvailabilityLabel'

export function BookCard({ book, className = '' }: { book: Book; className?: string }) {
  return (
    <article className={`group ${className}`}>
      <Link to={`/books/${book.slug}`} className="block rounded-[3px]" aria-label={`${book.title} — დეტალურად`}>
        <div className="mx-auto max-w-[320px] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none md:max-w-none">
          <BookCover book={book} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 30vw, 80vw" />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="eyebrow">{volumeLabel(book)}</span>
          <AvailabilityLabel status={book.status} />
        </div>
        <h3 className="mt-4 text-xl leading-snug text-ivory">{book.title}</h3>
        {book.subtitle && <p className="mt-2 text-[0.95rem] leading-7 text-muted">{book.subtitle}</p>}
        <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
          დეტალურად
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
      </Link>
    </article>
  )
}
