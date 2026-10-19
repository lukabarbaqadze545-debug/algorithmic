/**
 * Site-wide, editable content.
 * Only put VERIFIED information here. Empty values are intentionally rendered as honest
 * "not yet published" states instead of invented details.
 */

export const site = {
  name: 'ALGORITHMIC',
  tagline: 'საგანმანათლებლო გამოცემები',
  description:
    'პროგრამირებისა და კომპიუტერული მეცნიერების ქართულენოვანი სახელმძღვანელოების დამოუკიდებელი საგანმანათლებლო გამოცემა.',
}

export const nav = [
  { label: 'მთავარი', to: '/' },
  { label: 'წიგნები', to: '/books' },
  { label: 'ჩვენს შესახებ', to: '/about' },
  { label: 'კონტაქტი', to: '/contact' },
] as const

/**
 * Verified contact channels. Fill in ONLY real ones, e.g.
 *   email: 'name@example.com'
 * The contact page, footer and the "მაინტერესებს ეს წიგნი" button switch on automatically.
 * Leave a field empty ('') until it is confirmed.
 */
export const contact = {
  email: '',
  phone: '',
  /** Real external links, e.g. { label: 'Facebook', url: 'https://…' } */
  social: [] as { label: string; url: string }[],
  /** Optional: URL of a real interest-registration form (Google Forms, Tally, …). Takes priority over e-mail. */
  interestFormUrl: '',
}

/** Author section on the About page. Leave empty until supplied by the author. */
export const author = {
  name: '',
  bio: [] as string[],
}

export function hasContact() {
  return Boolean(contact.email || contact.phone || contact.social.length || contact.interestFormUrl)
}
