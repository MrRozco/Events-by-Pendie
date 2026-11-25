# Events by Pendie

Marketing site and lead funnel for a full-service event planner: weddings, corporate events and celebrations.
Ivory, midnight navy and champagne gold; EP monogram; animated, responsive and conversion-focused.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zod.
Fonts: Playfair Display + DM Sans via `next/font`.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see "Event requests by email"
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for production, `npm run typecheck` for TypeScript.

## Structure

```
app/
  layout.tsx              Fonts, header, footer, MotionConfig (reduced-motion aware)
  globals.css             Tokens (@theme) + .btn / .chip / .kicker / .heading-* classes
  page.tsx                Home
  about/page.tsx          About
  events/page.tsx         Portfolio ("Events")
  contact/page.tsx        Request form + FAQ
  contact/actions.ts      Server action: Zod validation, honeypot, rate limit, Resend email
components/
  home/Hero.tsx           Ken Burns + parallax hero with masked headline
  home/QuickStart.tsx     Event type + guest chips → /contact?type=&guests= (pre-fills the form)
  home/HandleTabs.tsx     "What we handle" tabs driving an example client-portal screen
  events/EventShowcase.tsx  Auto-playing showcase, progress thumbnails, stats count-up,
                            run-of-show timeline, budget breakdown, filters, archive grid
  contact/PlanForm.tsx    3-step funnel (type → details → contact) with progress + success screen
  contact/Faq.tsx         Animated accordion
  layout/                 Logo (EP monogram), SiteHeader, SiteFooter
  motion/Reveal.tsx       Reveal, RiseIn, LineReveal, DrawLine, Stagger
  sections/               CtaBand, ClientMarquee
  ui/                     Button / ButtonLink / Kicker, icons + Monogram
lib/
  site.ts                 Business details and nav    ← edit first
  events.ts               Portfolio events (SAMPLE)   ← replace with real events
  request.ts              Form options + shared Zod schema + quick-start mapping
public/images/            Illustrated event scenes (1600×1067 JPG)
```

## Funnel

1. Every page ends in a call to action; the header button is always visible.
2. The home **quick-start bar** passes the visitor's picks to `/contact` as query params, so the form opens with
   the event type and guest count already chosen.
3. Portfolio events deep-link with `/events?event=<id>` (the home "Recent events" cards use this).
4. The form validates per step on the client and again on the server with the same Zod schema.

Track step changes in `PlanForm` (`go()`), quick-start clicks and submissions as GA4/PostHog events to measure
drop-off.

## Before launch

1. **Placeholders.** Search for `[` to find bracketed values: stats, client logos, testimonial, team, pricing FAQ,
   reply time and contact details in `lib/site.ts`.
2. **Sample events.** Everything in `lib/events.ts` (titles, guest counts, vendors, timelines, budget splits) is
   illustrative. Replace with real past events and real photography.
3. **Promises.** Confirm "free consultation", "fully insured" and the response time match how the business works.
4. **Email.** Set `RESEND_API_KEY`, `REQUEST_TO_EMAIL`, `REQUEST_FROM_EMAIL` (domain verified in Resend).
   Without them, requests are logged to the server console only.
5. Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, Open Graph and the sitemap.

## Notes

- Animations respect `prefers-reduced-motion` (slideshow starts paused, count-ups jump to the value).
- Tabs and option groups use proper `tab` / `radio` semantics; the showcase pauses on hover and has a play/pause
  control; the mobile menu closes on Escape.
- Spam: honeypot field plus an in-memory rate limit. On multi-instance hosting use Upstash Redis.
