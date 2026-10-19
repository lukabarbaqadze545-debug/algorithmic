import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { PageContainer } from './PageContainer'
import { EditorialDivider } from './EditorialDivider'
import { contact, nav, site } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-ink">
      <PageContainer className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandMark variant="wordmark" size={44} />
            <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-muted">{site.description}</p>
          </div>

          <nav aria-label="ქვედა ნავიგაცია" className="lg:col-span-3 lg:col-start-7">
            <h2 className="eyebrow mb-5 font-sans">ნავიგაცია</h2>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.95rem] text-ivory/80 transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-5 font-sans">კონტაქტი</h2>
            <ul className="space-y-3 text-[0.95rem]">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="text-ivory/80 transition-colors hover:text-gold">
                    {contact.email}
                  </a>
                </li>
              )}
              <li>
                <Link to="/contact" className="text-ivory/80 transition-colors hover:text-gold">
                  საკონტაქტო გვერდი
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <EditorialDivider className="mt-16" />
        <p className="mt-8 text-center text-sm text-muted">
          © {year} <span className="brand-caps text-[0.8rem] tracking-[0.22em] text-ivory/80">Algorithmic</span>. ყველა უფლება დაცულია.
        </p>
      </PageContainer>
    </footer>
  )
}
