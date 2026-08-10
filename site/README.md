# Canadian Rental Relocation — v1 (Homepage + Design System)

Next.js 14 (App Router) + TypeScript + Tailwind + next-intl (EN/FR).

## Run it

```
npm install
npm run dev
```

Then open `http://localhost:3000` — it redirects to `/en` (French at `/fr`).

## What's built so far

- Homepage: hero with the search widget, cities section (Ottawa/Gatineau), featured apartments, how it works, trust section, WhatsApp banner, resources preview, final CTA
- City hub pages: `/ottawa`, `/gatineau`
- Apartment listings with filters: `/ottawa/apartments`, `/gatineau/apartments`, `/apartments` (global) — filter by price min/max, bedrooms, furnished, parking, pets, all synced to the URL
- Unit detail pages: `/apartments/[unit-slug]` — gallery, full specs, "I'm Interested in This Unit" CTA that opens the lead form with the unit pre-attached
- Lead form (`/find-my-apartment`, plus the same form in a modal from any unit page) — full field set from the brief, honeypot spam protection, inline "Thank you" confirmation
- `/api/leads` — validates with zod, persists the lead, then dispatches to your CRM webhook (Make.com → Airtable). A lead is never lost even if the webhook call fails.
- UTM/referrer attribution — captured on first page load, carried through to whichever page the visitor eventually submits the form on
- Header/Footer with EN/FR language switcher and mobile menu
- Floating WhatsApp button (site-wide) + contextual WhatsApp banners on city and unit pages
- Design system: Tailwind theme (colors, type, spacing, radius), fonts loaded via `next/font/google`
- Type definitions, inventory data layer (Airtable-ready, seed-data fallback), and CRM/analytics/UTM library stubs matching the agreed architecture

## What's placeholder, not real

- **Apartment listings** (`data/seed/units.ts`) — 3 sample records, clearly flagged `isPlaceholder: true`, with blank prices/dates/images. Replace with real inventory before launch.
- **Logo** — your real CasaUnit logo is wired in (`public/logo-white.png`, `public/logo-icon-white.png`, `public/logo-full-white.png`), recolored to solid white with a transparent background. The header shows the icon on a small dark badge (since the header itself is light) and the footer — now dark-themed — shows the full white lockup directly. If you'd rather not have the header badge, send a dark/color version of the logo and I'll swap it in instead.
- **Hero image, city photos, article thumbnails** — gradient placeholders standing in for real photography.
- **Fonts** — using Plus Jakarta Sans (headings) + Inter (body), both free Google Fonts, as a starting point consistent with the design direction agreed. Happy to switch if you have brand fonts.

## Not built yet (next sections)

Building pages (`/buildings/[slug]`), the `/resources` article hub and article pages, `/how-it-works`, `/moving-to-canada`, `/about`, `/contact`, and the legal pages (privacy/terms/cookies).

## Config

Copy `.env.example` to `.env.local` and fill in:
- `CRM_WEBHOOK_URL` — your Make.com scenario URL, so submitted leads actually reach Airtable
- `AIRTABLE_BASE_ID` / `AIRTABLE_API_KEY` — optional; once set, apartment listings pull live from your Airtable base instead of the placeholder seed data. Leave blank and the site keeps working off sample data.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — your WhatsApp Business number, digits only
- Analytics IDs, when ready

## How admin inventory management will work

Once `AIRTABLE_BASE_ID`/`AIRTABLE_API_KEY` are set, adding/removing/editing an apartment is just editing a row in Airtable (status field controls visibility — only `available` and `coming_soon` ever show publicly). No code changes, no redeploy — the site refreshes from Airtable automatically (checks at most once a minute).
