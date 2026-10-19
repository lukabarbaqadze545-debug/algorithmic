/**
 * Brand assets, used exactly as supplied in the logo kit (never recoloured, cropped or redrawn).
 *  - "wordmark": official emblem + typeset ALGORITHMIC (compact, for the navigation)
 *  - "mark":     official emblem only
 *  - "full":     the complete original logo (emblem + lettering + rule)
 */
interface Props {
  variant: 'wordmark' | 'mark' | 'full'
  className?: string
  size?: number
  priority?: boolean
}

export function BrandMark({ variant, className = '', size = 36, priority = false }: Props) {
  if (variant === 'full') {
    return (
      <img
        src="/brand/algorithmic-logo.svg"
        width={868}
        height={760}
        alt="ALGORITHMIC — ოქროსფერი გეომეტრიული ემბლემა შუაში A ასოთი"
        className={`h-auto w-full ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    )
  }
  if (variant === 'mark') {
    return (
      <img
        src="/brand/algorithmic-mark.svg"
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        className={`aspect-square ${className}`}
        decoding="async"
      />
    )
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img src="/brand/algorithmic-mark.svg" width={size} height={size} alt="" aria-hidden="true" className="shrink-0" />
      <span className="brand-caps text-[0.95rem] leading-none text-ivory sm:text-base">Algorithmic</span>
    </span>
  )
}
