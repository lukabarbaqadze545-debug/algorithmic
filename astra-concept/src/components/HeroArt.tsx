import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useI18n } from '../i18n'
import { openStatus } from '../lib/hours'
import { Sparkle } from './Sparkle'
import { useUi } from './ui'

const TOOTH =
  'M20 30C20 12 40 8 50 16C60 8 80 12 80 30C80 48 74 58 72 78C70 100 66 112 60 112C54 112 54 90 50 90C46 90 46 112 40 112C34 112 30 100 28 78C26 58 20 48 20 30Z'

/** Abstract architectural illustration. Real clinic photography replaces this later. */
export function HeroArt() {
  const { t } = useI18n()
  const { openChat } = useUi()
  const [status, setStatus] = useState(() => openStatus(t))
  useEffect(() => setStatus(openStatus(t)), [t])

  return (
    <figure className="relative mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-6 lg:max-w-[400px]">
      <div className="relative aspect-[4/5] w-full">
        <svg viewBox="0 0 480 600" className="absolute inset-0 h-full w-full" role="img" aria-label={t.hero.art}>
          <defs>
            <linearGradient id="archBg" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0" stopColor="#14566a" />
              <stop offset="0.55" stopColor="#0b2a3a" />
              <stop offset="1" stopColor="#071c28" />
            </linearGradient>
            <radialGradient id="glow" cx="0.5" cy="0.36" r="0.55">
              <stop offset="0" stopColor="#7fd1c7" stopOpacity="0.38" />
              <stop offset="1" stopColor="#7fd1c7" stopOpacity="0" />
            </radialGradient>
            <clipPath id="archClip">
              <path d="M30 600V256a210 210 0 0 1 420 0V600Z" />
            </clipPath>
          </defs>
          <path d="M6 600V262a234 234 0 0 1 468 0V600" fill="none" stroke="#0e6064" strokeOpacity="0.45" strokeWidth="1.5" pathLength="1" className="draw" />
          <g clipPath="url(#archClip)">
            <rect width="480" height="600" fill="url(#archBg)" />
            <rect width="480" height="600" fill="url(#glow)" />
            {[176, 132, 88].map((r, i) => (
              <path key={r} d={`M${240 - r} 600V256a${r} ${r} 0 0 1 ${2 * r} 0V600`} fill="none" stroke="#7fd1c7" strokeOpacity={0.2 + i * 0.07} strokeWidth="1.2" pathLength="1" className="draw" style={{ animationDelay: `${0.5 + i * 0.35}s` }} />
            ))}
            <path d="M0 520Q240 456 480 520V600H0Z" fill="#faf7f1" fillOpacity="0.07" />
            <path d="M0 556Q240 500 480 556V600H0Z" fill="#faf7f1" fillOpacity="0.1" />
            <g transform="translate(150 178) scale(1.8)">
              <path d={TOOTH} fill="#faf7f1" fillOpacity="0.07" stroke="#faf7f1" strokeWidth="1.3" strokeLinejoin="round" pathLength="1" className="draw" style={{ animationDelay: '0.9s' }} />
              <path d="M32 26C34 20 40 17 45 19" fill="none" stroke="#7fd1c7" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
            </g>
          </g>
          <g className="breathe" style={{ color: '#7fd1c7' }}>
            <path transform="translate(352 118) scale(1.25)" fill="currentColor" d="M16 2l2.9 10.1L29 15l-10.1 2.9L16 28l-2.9-10.1L3 15l10.1-2.9z" />
          </g>
          <g opacity="0.7" style={{ color: '#faf7f1' }}>
            <path transform="translate(118 150) scale(0.5)" fill="currentColor" d="M16 2l2.9 10.1L29 15l-10.1 2.9L16 28l-2.9-10.1L3 15l10.1-2.9z" />
          </g>
        </svg>

        <div className="rise absolute right-[-4px] top-[10%] flex items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 text-[0.78rem] font-bold text-navy shadow-soft sm:right-[-18px]" style={{ animationDelay: '0.9s' }} role="status">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            {status.open && <span className="absolute inset-0 rounded-full bg-teal" style={{ animation: 'ping 2s ease-out infinite' }} />}
            <span className={`relative h-2.5 w-2.5 rounded-full ${status.open ? 'bg-teal' : 'bg-clay'}`} />
          </span>
          {status.text}
        </div>

        <button type="button" onClick={() => openChat()} className="rise absolute bottom-[7%] left-[-6px] flex text-left w-[78%] max-w-[300px] items-start gap-3 rounded-2xl bg-white p-3.5 shadow-lift transition-transform hover:-translate-y-0.5 sm:left-[-18px]" style={{ animationDelay: '1.1s' }}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal text-white">
            <MessageCircle size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-wider text-teal">
              <Sparkle className="h-3 w-3" />
              {t.concierge.badge}
            </p>
            <p className="mt-0.5 text-[0.86rem] font-semibold leading-snug text-navy">{t.hero.chatTeaser}</p>
          </div>
        </button>
      </div>
      <figcaption className="mt-5 text-center text-xs text-muted lg:text-left">{t.hero.art}</figcaption>
    </figure>
  )
}
