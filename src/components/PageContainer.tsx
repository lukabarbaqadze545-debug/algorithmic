import type { ElementType, ReactNode } from 'react'

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
}

/** Standard desktop container (≈1280px) with responsive gutters. */
export function PageContainer({ children, as: Tag = 'div', className = '' }: Props) {
  return <Tag className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</Tag>
}
