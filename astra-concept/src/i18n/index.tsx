import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { en, type Dict } from './en'
import { ka } from './ka'
import { ru } from './ru'
import { LANGS, LANG_LABEL, type L10n, type L10nList, type Lang } from './types'

export { LANGS, LANG_LABEL }
export type { Lang, L10n, L10nList, Dict }

export const dictionaries: Record<Lang, Dict> = { en, ka, ru }

const STORAGE_KEY = 'astra-concept-demo:v1:lang'

function isLang(v: unknown): v is Lang {
  return v === 'ka' || v === 'en' || v === 'ru'
}

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (isLang(q)) return q
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    /* storage unavailable: fall through to the default */
  }
  return 'en'
}

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
  pick: (v: L10n) => string
  pickList: (v: L10nList) => string[]
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t, pick: (v) => v[lang], pickList: (v) => v[lang] }),
    [lang, setLang, t],
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
