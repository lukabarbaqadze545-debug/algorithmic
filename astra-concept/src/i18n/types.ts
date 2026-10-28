export type Lang = 'ka' | 'en' | 'ru'
export const LANGS: readonly Lang[] = ['ka', 'en', 'ru'] as const
export type L10n = Record<Lang, string>
export type L10nList = Record<Lang, string[]>

export const LANG_LABEL: Record<Lang, { short: string; native: string; locale: string }> = {
  ka: { short: 'KA', native: 'ქართული', locale: 'ka-GE' },
  en: { short: 'EN', native: 'English', locale: 'en-GB' },
  ru: { short: 'RU', native: 'Русский', locale: 'ru-RU' },
}
