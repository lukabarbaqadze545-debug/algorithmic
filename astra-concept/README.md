# Astra Dental Clinic — concept redesign (UNOFFICIAL DEMO)

> **Not the clinic's website. Never publish or deploy this.** It is a sales prototype created to
> show a clinic owner how their digital experience could work. It carries `noindex`, a visible
> "Concept draft by Luka" ribbon, `robots.txt: Disallow: /`, makes no network calls and has no
> analytics. Build it, run it locally, take screenshots or screen-share.

React 19 · TypeScript · Vite · Tailwind CSS v4 · Lucide. Fonts are self-hosted (Cormorant Garamond,
Manrope, Noto Georgian), so nothing is fetched from a CDN. No router, no state library, no UI kit.

## Run

```bash
cd astra-concept
npm install
npm run dev        # http://localhost:5173  (add ?lang=ka | en | ru to open in a language)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Structure

```
src/
  App.tsx                 page shell, cross-section actions (chat, booking prefill, notes)
  components/             Header, Hero, TrustStrip, Services, Showcase, Doctors, Booking,
                          Why, Journey, Reviews, Contact, Footer, MobileBar, Concierge*, Notes…
                          BelowFold.tsx = lazily loaded chunk with everything under the hero
  data/
    clinic.ts             the ONLY place with phone, address, hours, "from" prices
    services.ts           9 service areas, trilingual copy, price rows
    doctors.ts            intentionally empty (see "Doctors" below)
  i18n/                   en.ts is the typed master; ka.ts and ru.ts must match its shape
  lib/
    concierge/            engine interface, deterministic engine, intents, remote stub
    storage.ts            demo requests in localStorage, separate versioned key
    slots.ts hours.ts     simulated availability, open/closed status (Asia/Tbilisi)
.env.example              optional future integration variables (none required)
CHANGES.md                before/after, claims to substantiate, items to confirm
screenshots/              375 / 768 / 1280 px captures
```

## What works (all tested in a real browser, Chromium)

- **Language switcher KA / EN / RU** for the whole interface, including service names and
  descriptions, form labels, validation messages, the concierge, dates (via `Intl`). Persisted in
  `localStorage`; `?lang=` overrides.
- **Service directory**: search (matches in all three languages), category filters, detail drawer
  with "from" price table, direct hand-off to the booking form or the concierge.
- **Booking demo**: service → date & time → details, validation with accessible errors, a
  confirmation with a `DEMO-XXXXX` reference. Availability is **simulated** and labelled.
- **AI Dental Concierge (demo)**: floating button, trilingual, replies in the language the visitor
  types (by script). Flows: services, per-service detail, prices, hours + live open/closed status,
  location/contact, languages, doctors, consultation request (name → phone → service → confirm),
  hand-off to staff. Medical wording (pain, medication, diagnosis, "do I need…", etc.) is never
  answered; the visitor gets phone/WhatsApp/booking options and, for urgent wording, the 112 line.
- **Sticky mobile bar** Call / WhatsApp / Book; the chat button steps aside on phones while the
  hero or the booking form is on screen so it never covers a primary action.
- **Pitch notes** (ribbon link / footer): the improvements list and a **demo inbox** showing the
  requests created in this browser, with a delete button.

## Demo-only features (do not present as real)

| Feature | Reality |
| --- | --- |
| Booking form | Saves to this browser's `localStorage` (`astra-concept-demo:v1:requests`). Sends nothing. |
| Time slots | Deterministic pseudo-availability, labelled "Simulated availability · demo". |
| Concierge | Scripted engine over structured data. No AI model, no API, no network. |
| Demo inbox | Reads the same `localStorage` key. Not a CRM. |
| Open/closed badge | Computed from the published Mon–Fri 09:00–20:00 hours only (no holidays). |
| Doctors section | Layout preview with placeholders; no real doctors are shown. |
| Reviews / before-after | Clearly marked placeholders. Nothing invented. |
| Illustration, map | Abstract SVG art and a stylised map placeholder. Replace with clinic assets. |

## Making the concierge "real" later

`src/lib/concierge/types.ts` defines `ConciergeEngine.respond(input) → reply`. The UI only talks to
that interface. To add a language model, put a small server endpoint (serverless function) in
front of the provider, give it the structured data from `src/data/*` as grounding and the rules
(no diagnosis, no treatment advice, hand off to staff), and return the same reply shape. Set
`VITE_CONCIERGE_MODE=remote` and `VITE_CONCIERGE_ENDPOINT=<your endpoint>`; failures fall back to
the deterministic engine (`src/lib/concierge/remoteEngine.ts`). **Never put an API key in a
`VITE_*` variable**: those are bundled into public JavaScript. Without these variables the build
contains no network path at all.

Other production steps: real booking backend / clinic calendar (replace `saveRequest`), CRM or
email/WhatsApp Business notifications, real privacy policy and consent text, clinic photography,
verified doctor profiles, real Google reviews, analytics only with consent, server-side rate
limiting and spam protection on every public endpoint.

## Quality checks run on this build

- `npm run build` passes (TypeScript strict, no unused code).
- Playwright (Chromium) at 375, 768 and 1280 px in EN / KA / RU: no horizontal overflow, no
  clipped text, no console errors, **no requests to any external host**.
- axe-core (WCAG 2.0/2.1 A + AA + best practices): 0 violations in all three languages, at 375 and
  1280 px, initial page state.
- Lighthouse mobile (production build, local server, simulated throttling): performance 92–100,
  accessibility 100, best practices 100. SEO shows 63 only because the page is intentionally
  `noindex` ("page is blocked from indexing"); everything else in that category passes.
  Georgian is the slowest locale (92–94) because the Georgian font files load late.
