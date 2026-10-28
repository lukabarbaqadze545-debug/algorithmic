import { LANGS, LANG_LABEL, useI18n } from '../i18n'

export function LangSwitch({ dark = false, large = false }: { dark?: boolean; large?: boolean }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div role="group" aria-label={t.nav.language} className={`inline-flex rounded-full p-0.5 ${dark ? 'bg-white/10' : 'bg-sand'}`}>
      {LANGS.map((l) => {
        const active = l === lang
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            title={LANG_LABEL[l].native}
            onClick={() => setLang(l)}
            className={`grid place-items-center rounded-full text-[0.8rem] font-bold transition-colors ${large ? 'h-12 min-w-[4.5rem] px-4' : 'h-10 min-w-10 px-2.5'} ${
              active ? (dark ? 'bg-ivory text-navy' : 'bg-navy text-white') : dark ? 'text-ivory/85 hover:text-white' : 'text-muted hover:text-navy'
            }`}
          >
            {LANG_LABEL[l].short}
            <span className="sr-only"> {LANG_LABEL[l].native}</span>
          </button>
        )
      })}
    </div>
  )
}
