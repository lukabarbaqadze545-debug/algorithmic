import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BrandMark } from '../components/BrandMark'
import { PageContainer } from '../components/PageContainer'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { BookCard } from '../components/BookCard'
import { EditorialDivider } from '../components/EditorialDivider'
import { Reveal } from '../components/Reveal'
import { books } from '../data/books'
import { useSeo } from '../lib/seo'

const values = [
  {
    n: '01',
    title: 'ცოდნა ქართულად',
    text: 'პროგრამირების შესწავლა ქართულ ენაზე, გასაგები განმარტებებითა და თანმიმდევრული სტრუქტურით.',
  },
  {
    n: '02',
    title: 'პრაქტიკული მიდგომა',
    text: 'თეორიული საკითხების დაკავშირება კოდის მაგალითებთან და სავარჯიშოებთან.',
  },
  {
    n: '03',
    title: 'საფუძვლებიდან განვითარებამდე',
    text: 'სასწავლო მასალის ეტაპობრივი ორგანიზება, მარტივი თემებიდან უფრო რთული საკითხებისკენ.',
  },
]

/** Faint concentric hairlines — a quiet structural echo of the emblem, kept well behind the logo. */
function Rings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 800"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[165%] max-w-none -translate-x-1/2 -translate-y-1/2 lg:w-[150%]"
      fill="none"
      stroke="#D4AF50"
    >
      {[390, 330, 270].map((r, i) => (
        <circle key={r} cx="400" cy="400" r={r} strokeWidth="1" strokeOpacity={0.07 - i * 0.012} />
      ))}
      <line x1="400" y1="0" x2="400" y2="800" strokeWidth="1" strokeOpacity="0.05" />
      <line x1="0" y1="400" x2="800" y2="400" strokeWidth="1" strokeOpacity="0.05" />
    </svg>
  )
}

export default function Home() {
  useSeo(
    null,
    'Algorithmic — პროგრამირებისა და კომპიუტერული მეცნიერების ქართულენოვანი სახელმძღვანელოები მათთვის, ვისაც სწავლა საფუძვლებიდან სურს.',
  )

  return (
    <>
      {/* 2 — Signature hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-36">
        <PageContainer className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative mx-auto w-full min-w-0 max-w-[17rem] sm:max-w-[22rem] lg:order-2 lg:col-span-5 lg:max-w-none">
            <Rings />
            <BrandMark variant="full" priority />
          </div>

          <div className="min-w-0 lg:order-1 lg:col-span-7 lg:pr-10">
            <p className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span aria-hidden="true" className="hidden h-px w-10 bg-gold/70 sm:block" />
              <span className="flex items-center gap-3 whitespace-nowrap">
                <span className="brand-caps text-xs tracking-[0.22em] text-gold sm:text-[0.8rem] sm:tracking-[0.3em]">Algorithmic</span>
                <span aria-hidden="true" className="text-gold/50">/</span>
              </span>
              <span className="eyebrow text-muted">საგანმანათლებლო გამოცემები</span>
            </p>
            <h1 id="hero-title" className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.15] text-ivory">
              ცოდნა, რომელიც მომავალს ქმნის.
            </h1>
            <p className="prose-ka mt-8 text-[1.0625rem] leading-8 sm:text-lg">
              პროგრამირებისა და კომპიუტერული მეცნიერების ქართულენოვანი სახელმძღვანელოები — მათთვის, ვისაც სწავლა
              საფუძვლებიდან სურს.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton to="/books">გაეცანი წიგნებს</PrimaryButton>
              <SecondaryButton to="/about" arrow={false}>
                ჩვენს შესახებ
              </SecondaryButton>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 3 — The collection */}
      <section aria-labelledby="collection-title" className="border-t border-line py-24 lg:py-32">
        <PageContainer>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div id="collection-title">
              <SectionHeading
                eyebrow="პითონის სამტომეული"
                title="ჩვენი გამოცემები"
                text="გაეცანი Algorithmic-ის პირველ სახელმძღვანელოებს."
              />
            </div>
            <Link to="/books" className="group inline-flex items-center gap-2 text-sm text-gold">
              მთელი კატალოგი
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </Reveal>

          <ul className="mt-16 grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-14">
            {books.map((book, i) => (
              <li key={book.id}>
                <Reveal delay={i * 0.08}>
                  <BookCard book={book} />
                </Reveal>
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      {/* 4 — Editorial philosophy */}
      <section aria-labelledby="why-title" className="border-t border-line py-24 lg:py-32">
        <PageContainer className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div id="why-title" className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="პრინციპები" title="რატომ Algorithmic?" />
            </div>
          </Reveal>
          <ol className="lg:col-span-7 lg:col-start-6">
            {values.map((v, i) => (
              <li key={v.n}>
                <Reveal delay={i * 0.06} className="grid gap-4 border-t border-line py-9 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                  <span className="numeral text-4xl leading-none sm:text-5xl">{v.n}</span>
                  <div>
                    <h3 className="text-xl text-ivory sm:text-2xl">{v.title}</h3>
                    <p className="prose-ka mt-3">{v.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>

      {/* 5 — Brand story */}
      <section aria-labelledby="story-title" className="border-y border-line bg-navy py-24 lg:py-36">
        <PageContainer className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-[16rem] sm:max-w-xs lg:col-span-5 lg:max-w-sm">
            <BrandMark variant="mark" size={400} className="h-auto w-full" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <SectionHeading
              eyebrow="ჩვენი ამბავი"
              title={<span id="story-title">სწავლის ახალი შესაძლებლობები ქართულად.</span>}
            />
            <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/80">
              Algorithmic იქმნება იმ იდეით, რომ პროგრამირების ხარისხიანი სასწავლო მასალები ქართულ ენაზეც უნდა იყოს
              ხელმისაწვდომი.
            </p>
            <div className="mt-9">
              <SecondaryButton to="/about">გაიგე მეტი</SecondaryButton>
            </div>
          </Reveal>
        </PageContainer>
      </section>

      {/* 6 — Explore the books */}
      <section aria-labelledby="explore-title" className="py-28 lg:py-40">
        <PageContainer>
          <Reveal className="mx-auto max-w-3xl text-center">
            <EditorialDivider />
            <h2 id="explore-title" className="mt-10 text-[clamp(1.875rem,3.8vw,3rem)] leading-tight text-ivory">
              აღმოაჩინე შენი შემდეგი ნაბიჯი პროგრამირებაში.
            </h2>
            <div className="mt-10">
              <PrimaryButton to="/books">წიგნების დათვალიერება</PrimaryButton>
            </div>
          </Reveal>
        </PageContainer>
      </section>
    </>
  )
}
