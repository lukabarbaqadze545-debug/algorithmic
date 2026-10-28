import type { Lang } from '../../i18n/types'

/** Pick the reply language from the script the visitor typed in; otherwise keep the UI language. */
export function detectLang(text: string, fallback: Lang): Lang {
  const ka = (text.match(/[Ⴀ-ჿ]/g) ?? []).length
  const ru = (text.match(/[Ѐ-ӿ]/g) ?? []).length
  const la = (text.match(/[A-Za-z]/g) ?? []).length
  if (ka > 0 && ka >= ru && ka * 2 >= la) return 'ka'
  if (ru > 0 && ru >= ka && ru * 2 >= la) return 'ru'
  if (la >= 3 && ka === 0 && ru === 0) {
    // Latin script: treat as English unless the UI is Georgian and the text looks like Latin Georgian.
    return /\b(fasi|fasebi|rodis|sad|gamarjoba|ra girs|minda)\b/i.test(text) ? 'ka' : 'en'
  }
  return fallback
}
