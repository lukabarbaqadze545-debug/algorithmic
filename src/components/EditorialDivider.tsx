interface Props {
  align?: 'center' | 'start'
  className?: string
}

/** Hairline – diamond – hairline, echoing the rule beneath the wordmark in the logo. */
export function EditorialDivider({ align = 'center', className = '' }: Props) {
  const rule = 'h-px w-16 bg-gold/60 sm:w-24'
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`}
    >
      <span className={rule} />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className={rule} />
    </div>
  )
}
