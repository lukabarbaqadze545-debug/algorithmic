import { PageContainer } from '../components/PageContainer'
import { SectionHeading } from '../components/SectionHeading'
import { BrandMark } from '../components/BrandMark'
import { EditorialDivider } from '../components/EditorialDivider'
import { PrimaryButton } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { author } from '../data/site'
import { useSeo } from '../lib/seo'

function Row({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-5 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
      <div className="flex items-baseline gap-5 lg:col-span-4">
        <span className="numeral text-2xl">{n}</span>
        <h2 className="text-xl text-ivory lg:text-2xl">{title}</h2>
      </div>
      <div className="prose-ka space-y-4 lg:col-span-8">{children}</div>
    </Reveal>
  )
}

export default function About() {
  useSeo('ჩვენს შესახებ', 'Algorithmic-ის მისია: პროგრამირებისა და კომპიუტერული მეცნიერების ხარისხიანი სასწავლო მასალები ქართულ ენაზე.')
  const hasAuthor = Boolean(author.name || author.bio.length)
  return (
    <PageContainer className="pb-24 pt-32 lg:pb-32 lg:pt-44">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading as="h1" eyebrow="ჩვენს შესახებ" title="სწავლის ახალი შესაძლებლობები ქართულად." />
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory/85">
            Algorithmic იქმნება იმ იდეით, რომ პროგრამირების ხარისხიანი სასწავლო მასალები ქართულ ენაზეც უნდა იყოს
            ხელმისაწვდომი.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[17rem] sm:max-w-xs lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <BrandMark variant="full" priority />
        </div>
      </div>

      <div className="mt-20 lg:mt-28">
        <Row n="01" title="მისია">
          <p>
            ჩვენი მიზანია, პროგრამირებისა და კომპიუტერული მეცნიერების სწავლა ქართულენოვანი მკითხველისთვის უფრო გასაგები
            და თანმიმდევრული გავხადოთ.
          </p>
          <p>
            სახელმძღვანელოებში თეორიული საკითხები კოდის მაგალითებსა და სავარჯიშოებს უკავშირდება, მასალა კი მარტივი
            თემებიდან უფრო რთული საკითხებისკენ ეტაპობრივად ვითარდება.
          </p>
        </Row>
        <Row n="02" title="პროექტის სტატუსი">
          <p>
            Algorithmic ახალი პროექტია და ამჟამად საწყის ეტაპზეა. პირველი გამოცემები ჯერ მომზადების პროცესშია, ამიტომ
            საიტზე მხოლოდ დადასტურებულ ინფორმაციას ვაქვეყნებთ.
          </p>
        </Row>
        <Row n="03" title="ავტორის შესახებ">
          {hasAuthor ? (
            <>
              {author.name && <p className="text-lg text-ivory">{author.name}</p>}
              {author.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          ) : (
            <p>ავტორის შესახებ ინფორმაცია ჯერ არ არის გამოქვეყნებული და მოგვიანებით დაემატება.</p>
          )}
        </Row>
        <div className="border-t border-line" />
      </div>

      <div className="mt-20 text-center">
        <EditorialDivider />
        <div className="mt-10">
          <PrimaryButton to="/books">წიგნების ნახვა</PrimaryButton>
        </div>
      </div>
    </PageContainer>
  )
}
