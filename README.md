# Harbor Careers

> Professional placement for everyone. You pay when you land.

Harbor is the broad-market placement arm of [Noetherian Ring Capital](https://noetherianring.com). Where NRC focuses on buyside finance (PE, GE, corp dev), Harbor covers everyone else — tech, healthcare, marketing, operations, legal, education, and more.

The model is aligned: Harbor collects 15% of your first-year comp when you accept an offer. Zero upfront cost.

**Live site:** https://harborcareers.com
**Contact:** hello@harborcareers.com
**Parent entity:** Noetherian Ring Capital LLC

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Inline styles (all `style={}` props, no CSS classes) |
| Routing | React Router v6 |
| Forms | Formspree (no backend needed) |
| Hosting | Vercel |
| Animation | IntersectionObserver via `useFadeIn` hook |

---

## Project Structure

```
harbor-careers/
├── index.html               # HTML entry — SEO meta, OG tags, canonical URL
├── vite.config.ts           # Vite + Tailwind plugin, vendor chunk splitting
├── vercel.json              # SPA rewrites + security headers for Vercel
├── public/
│   ├── favicon.svg          # Anchor mark SVG icon
│   ├── robots.txt           # Crawl rules + sitemap pointer
│   └── sitemap.xml          # 5 URLs for search indexing
└── src/
    ├── main.tsx             # React root mount
    ├── App.tsx              # Router — 5 routes + 404 fallback
    ├── components/
    │   ├── Navbar.tsx       # Fixed top nav — logo, links, CTA button
    │   └── Footer.tsx       # Links, contact info, NRC attribution
    └── pages/
        ├── Home.tsx         # Landing page — hero, stats, process, industries, testimonials
        ├── Services.tsx     # Pricing tiers ($149 / $499 / 15%) + FAQ accordion
        ├── HowItWorks.tsx   # 5-step process + "who it's for" grid
        ├── About.tsx        # Mission, values, NRC connection
        ├── Contact.tsx      # 2-column contact form (Formspree)
        └── NotFound.tsx     # 404 fallback
```

---

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `Home.tsx` | Hero + social proof + CTA |
| `/services` | `Services.tsx` | Pricing tiers and what's included |
| `/how-it-works` | `HowItWorks.tsx` | Full placement process, step by step |
| `/about` | `About.tsx` | Company story, values, NRC connection |
| `/contact` | `Contact.tsx` | Intake form |

---

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npx tsc --noEmit # type-check without building
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `bg` | `#0a1628` | Page background (deep navy) |
| `surface` | `#0f1f38` | Card and section backgrounds |
| `accent` | `#4f8ef7` | CTA buttons, highlights, links |
| Primary text | `#ffffff` | Headings |
| Muted text | `rgba(255,255,255,0.5)` | Body copy |
| Faint text | `rgba(255,255,255,0.28)` | Labels, captions |

**Typography:** Inter (loaded via Google Fonts in `index.html`)
**Border radius:** `6px` buttons, `10–12px` cards
**Scroll animation:** `useFadeIn` hook — `opacity: 0 → 1` + `translateY(24px → 0)` on viewport enter, fires once via IntersectionObserver

---

## Services & Pricing

| Tier | Price | Model |
|---|---|---|
| Resume Review | $149 one-time | Paid upfront, 48hr turnaround |
| Career Sprint | $499 one-time | Paid upfront, includes 2 coaching calls |
| Full Placement | 15% of first-year comp | Paid at offer acceptance — nothing upfront |

---

## Deployment (Vercel)

1. Import this repo into Vercel
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. `vercel.json` handles SPA rewrites and security headers automatically

**Before going live:**
- Replace Formspree endpoint in `src/pages/Contact.tsx` with a real form ID from [formspree.io](https://formspree.io)
- Verify canonical URL in `index.html` matches the live domain

---

## What Needs to Be Built

### P0 — Launch
- [ ] Register Formspree account → replace placeholder endpoint in `Contact.tsx`
- [ ] Point `harborcareers.com` to Vercel deployment
- [ ] Set up `hello@harborcareers.com` (Google Workspace or email forwarder)
- [ ] LinkedIn company page for Harbor

### P1 — Growth
- [ ] Stripe integration for $149 Resume Review and $499 Career Sprint
- [ ] Calendly embed for Career Sprint call booking
- [ ] Blog / SEO content (career advice, industry job market guides)
- [ ] Real testimonials with anonymized case studies

### P2 — Platform
- [ ] Candidate intake portal (replaces simple contact form)
- [ ] Internal recruiter dashboard — pipeline, submissions, placement tracking
- [ ] Outcome tracking (log every placement + 90-day check-in)
- [ ] Referral program for placed candidates

---

## Backend

The Harbor Careers backend API lives in a separate repo: https://github.com/AndreIllini/harbor-careers-backend

Set VITE_API_URL in your .env to point the frontend at it:
```
VITE_API_URL=http://localhost:8000  # local dev
VITE_API_URL=https://your-backend.onrender.com  # production
```

---

## Relationship to Noetherian Ring Capital

Harbor operates under Noetherian Ring Capital LLC. NRC handles buyside finance exclusively (PE, GE, corp dev). Harbor is the same methodology — structured assessment, warm introductions, aligned fee model — extended to every other industry.

Both brands share the same visual language (dark navy, clean type, white-on-dark) but use different marks: NRC uses a ring mark, Harbor uses an anchor mark.

NRC repo: https://github.com/AndreIllini/noetherian-ring-capital

---

*Last updated: March 2026*
