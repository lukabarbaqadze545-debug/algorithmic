import { useEffect } from 'react'

const BRAND = 'ALGORITHMIC'

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Sets a Georgian document title and meta description for the current route. */
export function useSeo(title: string | null, description: string) {
  useEffect(() => {
    const full = title ? `${title} — ${BRAND}` : `${BRAND} — პროგრამირების სახელმძღვანელოები ქართულად`
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  }, [title, description])
}
