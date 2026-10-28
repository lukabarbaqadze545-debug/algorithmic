import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { services } from '../data/services'
import { useI18n } from '../i18n'
import { clearRequests, loadRequests, type DemoRequest } from '../lib/storage'
import { Sheet } from './Sheet'

export function Notes({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useI18n()
  const [tab, setTab] = useState<'improve' | 'inbox'>('improve')
  const [items, setItems] = useState<DemoRequest[]>([])

  useEffect(() => {
    const sync = () => setItems(loadRequests())
    sync()
    window.addEventListener('astra-demo-requests', sync)
    return () => window.removeEventListener('astra-demo-requests', sync)
  }, [open])

  const svc = (id: string) => services.find((s) => s.id === id)?.name[lang] ?? t.booking.service.general
  const tabCls = (on: boolean) => `min-h-11 flex-1 rounded-full px-4 text-sm font-bold ${on ? 'bg-navy text-white' : 'text-navy hover:bg-sand'}`

  return (
    <Sheet open={open} onClose={onClose} title={t.notes.title} titleId="notes-title">
      <div role="tablist" aria-label={t.notes.title} className="flex gap-1 rounded-full bg-sand/70 p-1">
        <button role="tab" id="tab-improve" aria-selected={tab === 'improve'} aria-controls="panel-improve" type="button" className={tabCls(tab === 'improve')} onClick={() => setTab('improve')}>{t.notes.tabImprove}</button>
        <button role="tab" id="tab-inbox" aria-selected={tab === 'inbox'} aria-controls="panel-inbox" type="button" className={tabCls(tab === 'inbox')} onClick={() => setTab('inbox')}>
          {t.notes.tabInbox}{items.length ? ` (${items.length})` : ''}
        </button>
      </div>

      {tab === 'improve' ? (
        <div role="tabpanel" id="panel-improve" aria-labelledby="tab-improve" className="mt-6">
          <p className="text-muted">{t.notes.improveLead}</p>
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {t.notes.improve.map((it, i) => (
              <li key={it.title} className="flex gap-4 py-4">
                <span className="font-display text-2xl leading-none text-teal" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div><p className="font-bold text-navy">{it.title}</p><p className="mt-0.5 text-sm text-muted">{it.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div role="tabpanel" id="panel-inbox" aria-labelledby="tab-inbox" className="mt-6">
          <p className="text-muted">{t.notes.inboxLead}</p>
          {items.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-dashed border-[#a89d88] p-5 text-center text-sm text-muted">{t.notes.inboxEmpty}</p>
          ) : (
            <>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-navy">{t.notes.count(items.length)}</p>
                <button type="button" onClick={clearRequests} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#b9ae9a] px-4 text-sm font-bold text-[#a3261f] hover:bg-white">
                  <Trash2 size={16} aria-hidden="true" />{t.notes.clear}
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {items.map((r) => (
                  <li key={r.id} className="rounded-2xl border border-line bg-paper p-4 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <b className="font-mono text-navy" translate="no">{r.ref}</b>
                      <span className="rounded-full bg-teal-soft px-2.5 py-0.5 text-xs font-bold text-teal-deep">{t.notes.via[r.source]}</span>
                    </div>
                    <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1.5">
                      <dt className="text-muted">{t.notes.fields.service}</dt><dd className="font-semibold">{svc(r.serviceId)}</dd>
                      <dt className="text-muted">{t.notes.fields.when}</dt><dd className="font-semibold">{r.date ? `${r.date} ${r.time ?? ''}` : t.notes.noTime}</dd>
                      <dt className="text-muted">{t.notes.fields.contact}</dt><dd className="font-semibold" translate="no">{r.name} · {r.phone}</dd>
                      <dt className="text-muted">{t.notes.fields.created}</dt><dd>{new Date(r.createdAt).toLocaleString()}</dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </Sheet>
  )
}
