import { PageContainer } from '../components/PageContainer'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import { EditorialDivider } from '../components/EditorialDivider'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('გვერდი ვერ მოიძებნა', 'მოთხოვნილი გვერდი ვერ მოიძებნა. დაბრუნდი მთავარ გვერდზე ან გაეცანი Algorithmic-ის წიგნებს.')
  return (
    <PageContainer className="flex min-h-svh flex-col items-center justify-center pb-20 pt-32 text-center">
      <p className="numeral text-7xl leading-none sm:text-8xl">404</p>
      <EditorialDivider className="my-9" />
      <h1 className="text-[clamp(1.75rem,3.6vw,2.75rem)] text-ivory">გვერდი ვერ მოიძებნა</h1>
      <p className="prose-ka mt-5">მისამართი შესაძლოა შეცვლილია ან არასწორად არის აკრეფილი.</p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <PrimaryButton to="/">მთავარ გვერდზე დაბრუნება</PrimaryButton>
        <SecondaryButton to="/books" arrow={false}>წიგნების ნახვა</SecondaryButton>
      </div>
    </PageContainer>
  )
}
