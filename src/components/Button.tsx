import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Props {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  arrow?: boolean
  size?: 'md' | 'sm'
}

const base =
  'group inline-flex items-center justify-center gap-3 rounded-[2px] font-medium leading-snug transition-[background-color,border-color,color,box-shadow] duration-300 select-none'
const sizes = { md: 'min-h-12 px-7 py-3 text-[0.95rem]', sm: 'min-h-10 px-5 py-2 text-sm' }

function Inner({ children, props, className }: { children: ReactNode; props: Props; className: string }) {
  const content = (
    <>
      <span>{children}</span>
      {props.arrow !== false && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        />
      )}
    </>
  )
  if (props.to) return <Link to={props.to} className={className}>{content}</Link>
  if (props.href) {
    const external = /^https?:/.test(props.href)
    return (
      <a href={props.href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={props.onClick} disabled={props.disabled} className={className}>
      {content}
    </button>
  )
}

export function PrimaryButton(props: Props) {
  const cls = `${base} ${sizes[props.size ?? 'md']} bg-gold text-ink hover:bg-[#e3c46f] hover:shadow-[0_0_0_4px_rgba(212,175,80,0.14)] disabled:cursor-not-allowed disabled:bg-transparent disabled:text-muted disabled:ring-1 disabled:ring-line-soft disabled:hover:shadow-none ${props.className ?? ''}`
  return <Inner props={props} className={cls}>{props.children}</Inner>
}

export function SecondaryButton(props: Props) {
  const cls = `${base} ${sizes[props.size ?? 'md']} border border-gold/45 text-ivory hover:border-gold hover:bg-gold/[0.07] ${props.className ?? ''}`
  return <Inner props={props} className={cls}>{props.children}</Inner>
}
