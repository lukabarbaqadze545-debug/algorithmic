import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

/** Quiet section reveal: a short fade and 14px rise, once. Disabled for reduced-motion users. */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
