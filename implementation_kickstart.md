# Disco Lemonade Studio: implementation kickstart

Concept site for Disco Lemonade Studio (Mickayla Ramsey, Leonardtown, MD). Front end only.
Built by Lee Enterprises Unlimited as a spec demo. One goal: every action leads to
**Plan My Dream Hair** (the Consult Builder), with texting CONSULTATION to (240) 561-8519 as
the always-visible second path and calling as the third.

## Plan

- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Framer Motion only for
  The Melt (hero) and the Flavor Dial. `lucide-react` for icons (pinned to 0.x so the Instagram
  glyph still exists). `@vercel/analytics`. No backend.
- **Data:** every business fact in `lib/business.ts`, gallery in `lib/gallery.ts`, dial stops in
  `lib/flavors.ts`, photo dimensions generated into `lib/image-dimensions.json`.
- **Images:** the 8 real photos from Drive in `public/images/raw`, converted to `.webp` by
  `npm run images` (sharp). Photo 08 is cropped so the "Oasis" wall sign is out of frame. No
  stock, no AI images. Studio and portrait are labelled placeholders.
- **Structure:** one component per section in `components/sections/`, the builder in
  `components/ConsultBuilder/`, the dial in `components/FlavorDial/`, shared `WavyFrame`,
  `LemonMark`, `Wordmark`. No file over 500 lines.
- **Launch switch:** `NEXT_PUBLIC_SITE_MODE` (`demo` default, or `live`) and
  `NEXT_PUBLIC_SITE_URL`. Demo: `noindex, nofollow`, no sitemap, concept footer line.
  Live: `index, follow`, sitemap, no concept line.

## Design tokens: "Blacklight Lemonade"

| Token | Value | Use |
|---|---|---|
| `--bg` | `#120E10` | Studio black page background |
| `--surface` | `#1E1719` | Mirror-back cards |
| `--line` | `#33272B` | 1px borders, wavy dividers |
| `--accent` | `#FF3D8B` | Sequin pink: primary button, lemon mark, key numbers, active states, dial thumb |
| `--on-accent` | `#120E10` | Text on pink |
| `--text` | `#FBF6EE` | Body text |
| `--muted` | `#B9ABA9` | Secondary text |
| `--lemon` | `#F2D13C` | The holiday band only, plus the tiny lemon mark |

- **Type:** Fraunces (variable, 600 to 900, italics, SOFT and WONK axes up) for display,
  numbers and the wordmark. DM Sans 400/500/700 for body. Both via `next/font`, `display: swap`.
  Body text never below 16px.
- **Material:** the wavy mirror. Every photo sits in a scalloped SVG clip-path frame (about 10
  gentle waves per side). Cards: flat, 1px border, 20px radius. Section dividers: one thin wavy
  line. Shadows no heavier than a soft 24px blur.
- **Spacing:** 8px grid. Sections 112 to 128px desktop, 72px mobile.
- **Motion:** only The Melt and the Flavor Dial. Hover and press states elsewhere. Reduced
  motion respected everywhere.

## Checklist

- [x] Phase 1: scaffold, tokens, fonts, `WavyFrame`, lemon mark, nav, hero with The Melt, footer
- [x] Phase 2: Why Disco Lemonade, the Flavor Dial
- [x] Phase 3: services bento, The Work gallery with filters and lightbox
- [x] Phase 4: The Studio, how it works + Keep it loud, holiday band + model strip, reviews, FAQ, final CTA
- [x] Phase 5: Consult Builder, wiring and pre-selects, prefilled SMS, mobile sticky bar, `/contact`
- [ ] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD, robots, sitemap, `llms.txt`, OG image, favicon, 404, `SEO-LAUNCH.md`
- [ ] Phase 6b: Lighthouse on a production build, mobile and desktop, live and demo modes
- [ ] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [ ] Hero sells the job. The Melt plays once. At 375px the headline and primary button are visible without scrolling.
- [ ] Flavor Dial swaps photo and readout at all 5 stops; mouse, touch and keyboard.
- [ ] Every Plan button opens the builder with the right pre-selects. SMS link prefilled with CONSULTATION. Phone, text, directions, Instagram, gift card links work.
- [ ] Every "Things only this business has" item is on the page.
- [ ] Zero em dashes, zero "--" in copy, zero stock/AI images, zero invented facts, zero profanity.
- [ ] Drafts and samples labelled.
- [ ] 2 fonts, 3 colours plus text, motion in 2 places only.
- [ ] No photo above native size. Photo 08 has the sign cropped out.
- [ ] 375px: no overflow, burger works, sticky bar works.
- [ ] Footer on both pages; concept line in demo only. Demo `noindex, nofollow`; live `index, follow` + sitemap.
- [ ] OG image and favicon are hers.
- [ ] Lighthouse SEO 100 live; others 90+. Demo: only the indexing audit fails.
- [ ] One h1 per page with service and town. Unique titles and descriptions. JSON-LD validates.
