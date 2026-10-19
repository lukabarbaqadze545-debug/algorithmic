import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { PageContainer } from '../components/PageContainer'
import { SectionHeading } from '../components/SectionHeading'
import { contact, hasContact } from '../data/site'
import { useSeo } from '../lib/seo'

const itemCls =
  'group flex items-center justify-between gap-4 border-b border-line py-6 text-lg text-ivory transition-colors hover:text-gold'

export default function Contact() {
  useSeo('კონტაქტი', 'დაგვიკავშირდი Algorithmic-ს — საკონტაქტო ინფორმაცია.')
  return (
    <PageContainer className="pb-24 pt-32 lg:pb-32 lg:pt-44">
      <div className="grid gap-14 lg:grid-cols-12">
        <SectionHeading
          as="h1"
          className="lg:col-span-5"
          eyebrow="კონტაქტი"
          title="დაგვიკავშირდი"
          text="ქვემოთ მითითებულია მხოლოდ დადასტურებული საკონტაქტო არხები."
        />
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
          {hasContact() ? (
            <ul className="border-t border-line">
              {contact.email && (
                <li>
                  <a className={itemCls} href={`mailto:${contact.email}`}>
                    <span className="flex items-center gap-4"><Mail aria-hidden="true" className="size-5 text-gold" />{contact.email}</span>
                    <ArrowUpRight aria-hidden="true" className="size-5 text-muted transition-colors group-hover:text-gold" />
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a className={itemCls} href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                    <span className="flex items-center gap-4"><Phone aria-hidden="true" className="size-5 text-gold" />{contact.phone}</span>
                    <ArrowUpRight aria-hidden="true" className="size-5 text-muted transition-colors group-hover:text-gold" />
                  </a>
                </li>
              )}
              {contact.social.map((s) => (
                <li key={s.url}>
                  <a className={itemCls} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <ArrowUpRight aria-hidden="true" className="size-5 text-muted transition-colors group-hover:text-gold" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-line p-7 sm:p-9" role="note">
              <h2 className="text-xl text-ivory">საკონტაქტო ინფორმაცია მალე გამოქვეყნდება</h2>
              <p className="prose-ka mt-3">
                ამ ეტაპზე დადასტურებული საკონტაქტო არხი საიტზე ჯერ არ არის მითითებული. შეტყობინების გაგზავნა და ინტერესის
                რეგისტრაცია ჯერ არ არის გააქტიურებული, ამიტომ საიტზე არც ფორმა გვაქვს.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
