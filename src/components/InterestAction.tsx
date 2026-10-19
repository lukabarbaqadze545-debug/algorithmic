import { Mail } from 'lucide-react'
import { PrimaryButton } from './Button'
import { contact } from '../data/site'
import { type Book } from '../data/books'

/** Resolves a REAL interest channel from site config; returns null when none is configured. */
export function interestHref(book: Book): string | null {
  if (contact.interestFormUrl) return contact.interestFormUrl
  if (contact.email) {
    const subject = encodeURIComponent(`მაინტერესებს: ${book.title}`)
    return `mailto:${contact.email}?subject=${subject}`
  }
  return null
}

/**
 * "მაინტერესებს ეს წიგნი": works only when a verified channel exists in src/data/site.ts.
 * Otherwise it is an explicitly inactive demo state (no fake submission).
 */
export function InterestAction({ book }: { book: Book }) {
  const href = interestHref(book)
  if (href) return <PrimaryButton href={href}>მაინტერესებს ეს წიგნი</PrimaryButton>
  return (
    <div>
      <PrimaryButton disabled arrow={false}>
        მაინტერესებს ეს წიგნი
      </PrimaryButton>
      <p className="mt-3 flex max-w-md items-start gap-2 text-sm leading-6 text-muted" role="note">
        <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold/80" />
        ინტერესის რეგისტრაცია ჯერ არ არის გააქტიურებული — ეს დემო-ვერსიაა და ღილაკი არაფერს აგზავნის.
      </p>
    </div>
  )
}
