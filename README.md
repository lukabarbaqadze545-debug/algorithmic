# ALGORITHMIC

Georgian-language website for the Algorithmic programming-textbook imprint (pre-launch showcase).
React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Lucide · Motion. Fully static, no backend.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/ (also writes dist/404.html)
npm run preview    # serve the production build
npm run lint
```

## Where to edit content

| What | File |
| --- | --- |
| Books (titles, covers, descriptions, contents, sample PDF, price, status) | `src/data/books.ts` |
| Contact channels, interest form, author bio, footer text, navigation | `src/data/site.ts` |
| Colours / fonts | `src/styles.css` (`@theme`) |

Optional fields (price, sample PDF, full table of contents, objectives) are hidden from visitors until they are filled in. Nothing is invented.

- **Covers:** the three real covers are in `public/images/books/` (`<name>-800.webp`, `<name>-1400.webp`), resize-only exports of the original artwork kept untouched in `brand-source/covers/`. For a new cover add the same two sizes and use `coverOf(...)` in `books.ts`. The frame follows the image's own aspect ratio.
- **Sample PDF:** drop it in `public/samples/` and set `samplePdf`.
- **Price:** set `price: { amount, currency: '₾' }`; it is shown only when present.
- **"მაინტერესებს ეს წიგნი":** becomes active as soon as `contact.interestFormUrl` or `contact.email` is set in `site.ts`; until then it is an explicitly inactive demo state.

## Brand assets

`public/brand/*.svg` are copied unmodified from the supplied logo kit (dark variants). Master PNG: `brand-source/`.
`public/og.png` is the unmodified logo composited on `#08090C` for social previews.

## Deploy

`dist/` is a static SPA. Rewrite rules are included for Netlify/Cloudflare Pages (`public/_redirects`) and Vercel (`vercel.json`);
for GitHub Pages the build creates `dist/404.html`. Before launch set absolute `og:image` / canonical URLs once the domain is known.
