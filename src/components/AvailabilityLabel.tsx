import { statusLabels, type BookStatus } from '../data/books'

export function AvailabilityLabel({ status, className = '' }: { status: BookStatus; className?: string }) {
  const ready = status !== 'in-preparation'
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[0.8125rem] leading-5 text-ivory/90 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${ready ? 'bg-gold' : 'border border-gold/80 bg-transparent'}`}
      />
      {statusLabels[status]}
    </span>
  )
}
