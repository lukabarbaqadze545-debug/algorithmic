import type { ReactNode } from 'react'

interface Props {
  title: ReactNode
  eyebrow?: string
  text?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ title, eyebrow, text, as: Tag = 'h2', className = '' }: Props) {
  const size = Tag === 'h1' ? 'text-[clamp(2.25rem,4.6vw,3.75rem)]' : 'text-[clamp(1.875rem,3.4vw,2.75rem)]'
  return (
    <div className={className}>
      {eyebrow && (
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
          {eyebrow}
        </p>
      )}
      <Tag className={`${size} text-ivory`}>{title}</Tag>
      {text && <p className="prose-ka mt-5 text-lg">{text}</p>}
    </div>
  )
}
