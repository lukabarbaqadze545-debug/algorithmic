# CHANGES — Astra Dental Clinic concept redesign

**Status of the source check.** The build environment could not reach `astradentalclinic.com`
(the network policy returned 403 and the host did not resolve), so **no page of the official site
was read**. Everything factual below comes from the sales brief. Where the brief said "if the
source differs, the source wins", that comparison has **not** been done. See "To confirm with the
clinic".

## 1. Problems on the current page vs this concept

The problems are as listed in the brief; they were not re-verified against the live page.

| Reported problem | In this concept |
| --- | --- |
| English page with Russian button labels ("Позвонить", "Заказать звонок", "Оставить заявку") and "Whatsap" typo | Every label exists in KA / EN / RU through one dictionary (`src/i18n`); TypeScript refuses a build if a key is missing in any language. "WhatsApp" is spelled correctly. |
| Awkward H1 ("5 Reasons to Choose caries treatment from us") | One H1: "Considered dental care in Tbilisi" (KA/RU equivalents). One H1 per page, headings in order. |
| Duplicated paragraphs in tooth preparation / restoration sections | Each service has one short description and one list; nothing is repeated. |
| Leftover UI text ("HideRead more") | No "read more" toggles. Details open in a dialog with a normal Close button. |
| Keyword-stuffed image captions in the symptoms section | No symptom captions. Images are abstract illustrations with plain alt text and one honest caption. |
| No real online booking (only callback / consultation forms), no live chat | Booking request flow (service, date, time, contact) and a scripted concierge chat. Both are **demo-only** and clearly labelled. |
| Working hours Mon–Fri only: night and weekend inquiries wait | Hours are unchanged (Mon–Fri 09:00–20:00). The concept lets visitors send a request or ask the concierge at any time; it states that the team answers in opening hours. |
| No review text and no before/after photos | Two clearly marked placeholders: "Clinic to provide real Google reviews / before-after photos". |
| Prices not easy to scan | "From" prices in a table with "Final plan after examination." |

## 2. Claims the clinic must substantiate before use

The brief flagged these as unsupported claims on the current page. **They are not used anywhere in
this concept** (not in the UI, the concierge answers or the metadata), and must stay out until the
clinic can prove them:

- "painless" (any pain-free wording)
- "doctors with a worldwide reputation"
- "20–30% cheaper than competitors"

Statements this concept *does* make that the clinic should still approve:

- "A broad range of services" (derived from the nine service areas in the brief).
- "Open until 20:00 / appointments after work" (derived from the published hours).
- "The website and the concierge work in Georgian, English and Russian": this is about the
  interface only, **not** about which languages the staff speak. The concierge says so.
- "The team replies during opening hours" and "requests wait for the next working day": this is a
  concept of how the clinic could operate, not a current service level.
- The generic service descriptions and "commonly includes" lists (see below).

## 3. To confirm with the clinic

1. **All brief facts, against the live page** (source wins): phone **+995 591 01 13 70**; address
   **30A Didgori Street, Tbilisi** (brief also wrote "#30A Didgori str."); hours **Mon–Fri
   09:00–20:00**; caries filling **from $75**; single-canal endodontic treatment with crown
   restoration **from $185**; 3–4 canal endodontic treatment **from $298**.
2. **Doctor names, specialties and experience.** None were supplied, none are shown. If the source
   has wording such as "13 years old" for experience, keep the number and write "13 years of
   experience".
3. **WhatsApp**: the concept links `wa.me/995591011370`, assuming the WhatsApp number is the same
   as the phone. Confirm it.
4. **The nine service areas** (general dentistry, implants, orthodontics, pediatric dentistry, oral
   surgery, whitening, prosthetics, diagnostics, periodontology) come from the brief and must match
   what the clinic actually offers.
5. **All service descriptions and "commonly includes" bullets** are neutral, generic copy written
   for this concept. They make no outcome claims but must be replaced or approved.
6. **Georgian and Russian copy** was written for natural reading but should be proof-read by a
   native speaker and by clinic staff (dental terminology).
7. **The 112 emergency line** in the concierge's hand-off for urgent wording.
8. Whether weekends / holidays have any hours (the open/closed badge uses weekday hours only).
9. Real privacy policy and consent wording for any live form.
10. Whether other "from" prices may be published (only the three above are used).

## 4. Placeholders to replace

| Where | Placeholder | Replace with |
| --- | --- | --- |
| Ribbon (`ribbon.text` in `src/i18n/*.ts`) | "Concept draft by Luka" | Your full name if wanted |
| Hero | Abstract SVG arch + tooth | Clinic photography |
| Doctors | Profile layout with "Clinic to provide" | Real doctors in `src/data/doctors.ts` |
| Booking | Doctor list is empty; simulated slots | Verified doctors; real calendar |
| Reviews and results | Dashed placeholders | Real Google reviews, consented before/after photos |
| Why Astra | "Clinic to add verified facts…" note | Years of operation, equipment, certificates, awards (only if proven) |
| Contact | Stylised map | Embedded map with the clinic's approval |
| Footer | Demo privacy text | The clinic's privacy policy |
| Service pages | Generic descriptions | Clinic-approved descriptions, more prices |

## 5. Other notes

- The first brief asked for a static `index.html + styles.css + script.js` page; the later brief
  asked for React + TypeScript + Vite + Tailwind with more sections. This folder follows the later
  brief and keeps the first brief's hard rules (noindex, ribbon, no network, no invented content).
- The concept lives in its own folder with its own `package.json` so it cannot affect the existing
  project in this repository. The only existing file touched is the root `eslint.config.js`, where
  `astra-concept` was added to `ignores` so the root `npm run lint` does not lint this prototype.
