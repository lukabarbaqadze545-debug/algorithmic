import type { L10n } from '../i18n/types'

/**
 * Facts supplied by the sales brief for the Astra Dental Clinic caries-treatment page.
 * They could NOT be re-verified against astradentalclinic.com (blocked in the build
 * environment), so every item is listed under "to confirm with the clinic" in CHANGES.md.
 */
export const clinic = {
  name: 'Astra Dental Clinic',
  phone: { display: '+995 591 01 13 70', tel: '+995591011370' },
  whatsappUrl: 'https://wa.me/995591011370',
  address: {
    en: '30A Didgori Street, Tbilisi, Georgia',
    ka: 'დიდგორის ქუჩა 30A, თბილისი, საქართველო',
    ru: 'ул. Дидгори, 30A, Тбилиси, Грузия',
  } satisfies L10n,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=30A+Didgori+Street+Tbilisi',
  officialSite: 'https://astradentalclinic.com/en/',
  officialServices: 'https://astradentalclinic.com/en/services/',
  officialCaries: 'https://astradentalclinic.com/en/caries-treatment/',
  hours: {
    timeZone: 'Asia/Tbilisi',
    openDays: [1, 2, 3, 4, 5], // Monday..Friday
    open: 9,
    close: 20,
  },
  /** "From" prices published for caries / endodontic care, in USD. */
  prices: [
    { id: 'filling', usd: 75 },
    { id: 'endo1', usd: 185 },
    { id: 'endo34', usd: 298 },
  ] as const,
} as const

export type PriceId = (typeof clinic.prices)[number]['id']
