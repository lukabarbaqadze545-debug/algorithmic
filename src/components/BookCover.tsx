import type { Book } from '../data/books'

const DEFAULT_SIZES = '(min-width: 1024px) 28vw, (min-width: 768px) 30vw, 80vw'

/**
 * Cover frame that follows the artwork's own aspect ratio (no crop, no stretch).
 * The cover image is shown exactly as supplied: nothing is drawn over it, and the depth
 * comes only from CSS shadow/ring AROUND the image. A neutral placeholder is used only
 * for a book that has no cover file yet.
 */
export function BookCover({
  book,
  className = '',
  priority = false,
  sizes = DEFAULT_SIZES,
}: {
  book: Book
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const frame =
    'relative block w-full overflow-hidden rounded-[2px] bg-navy shadow-[0_28px_55px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(212,175,80,0.22)]'

  if (book.cover) {
    const { src, srcSet, alt, width, height } = book.cover
    return (
      <div className={`${frame} ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="block size-full"
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={`${book.title} — გარეკანი მზადდება`}
      className={`${frame} [container-type:inline-size] ${className}`}
      style={{ aspectRatio: '2448 / 3435' }}
    >
      <div className="absolute inset-[6%] border border-gold/35" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4%] text-center">
        <span className="numeral leading-none" style={{ fontSize: '16cqw' }}>
          {book.volume}
        </span>
        <span className="text-ivory/70" style={{ fontSize: '5.4cqw' }}>
          გარეკანი მზადდება
        </span>
      </div>
    </div>
  )
}
