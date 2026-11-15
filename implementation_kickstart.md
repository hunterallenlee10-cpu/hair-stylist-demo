# Implementation kickstart: Disco Lemonade Studio v2 ("Swirl Room")

Brief: `BUILD-SPEC.md`. v1 plan: `docs/implementation_kickstart-v1.md`. Branch: `v2-upgrade`.
Re-read the matching part of the spec at the start of each phase. After each phase: screenshot
1440 and 375, fix the three weakest things, run `npm run check`, commit.

## Phases

- [ ] **Phase 1.** Version check (Next 16.4.6, React 19.3.1, Tailwind 4.3.5 already current;
  framer-motion 14 to `motion`). Tokens in `@theme`, type scale, palette board, sequin mirror
  frame, drawn swirl, sentence-case labels. Home hero "The Swirl Room", phone first. Review 1.
- [ ] **Phase 2.** Photos 09 to 18 into the pipeline (crops: 12 signs, 14 face, 11 and 17 signs,
  16 bystander). `lib/gallery.ts` to 18 entries. `/work` filters and lightbox with permalinks.
  Flavor Dial "More like this". Home "After beats before" led by 15.
- [ ] **Phase 3.** `lib/services.ts`, service template, four service pages, hub update, nav
  services menu, breadcrumbs.
- [ ] **Phase 4.** `/studio` with 09 and honest proof, `/new-here` with 16, `/contact` map card,
  holiday band swirl edge and gift card link, varied final CTA photos, 404 with the swirl.
- [ ] **Phase 5.** Builder honest last step and desktop fallback, sticky bar focus fix, keyboard
  and 200% zoom pass.
- [ ] **Phase 6.** Demo safety and SEO: headers, robots, sitemap and `llms.txt` gating, titles,
  descriptions, JSON-LD, OG images, `SEO-LAUNCH.md`. Lighthouse live then demo, phone and desktop.
- [ ] **Phase 7.** Review 2 (juror plus fact audit), one round of fixes, final checklist,
  `npm run check`, merge and push.

## Tokens (Tailwind `@theme`)

| Token | Hex | OKLCH |
|---|---|---|
| `--color-bg` | #120E10 | oklch(17.0% 0.008 346.3) |
| `--color-surface` | #1E1719 | oklch(21.4% 0.012 359.1) |
| `--color-surface-2` | #2A2023 | oklch(25.6% 0.016 358.4) |
| `--color-border` | #33272B | oklch(28.8% 0.019 356.4) |
| `--color-text` | #FBF6EE | oklch(97.5% 0.012 79.8) |
| `--color-muted` | #B9ABA9 | oklch(75.2% 0.016 27.3) |
| `--color-primary` | #FF3D8B | oklch(67.3% 0.233 1.9) |
| `--color-primary-hover` | #FF66A6 | oklch(72.0% 0.195 357.1) |
| `--color-lemon` | #F2D13C | oklch(86.4% 0.161 96.0) |
| `--color-swirl-pink` | #E82553 | oklch(60.4% 0.224 15.5) |
| `--color-swirl-yellow` | #E3DB16 | oklch(87.0% 0.183 106.9) |
| `--color-swirl-green` | #3E9B3A | oklch(61.2% 0.161 142.7) |
| `--color-swirl-orange` | #F75513 | oklch(66.3% 0.209 38.3) |
| `--color-success` | #5BD08F | oklch(77.3% 0.142 156.4) |
| `--color-error` | #FF7A7A | oklch(73.5% 0.163 21.9) |

Type steps (`text-label` ... `text-display`): label, body, lead, h3, h2, h1, display, each a
`clamp()` from section 3 of the spec. Body line height 1.55, display 0.98.

v1 class names (`ink`, `line`, `accent`, `on-accent`) stay as aliases of the role tokens.

## Final checklist

- [ ] Every item in "What is wrong with v1" is fixed.
- [ ] At 375 by 812 the first screen shows colour from her work, the whole headline and the primary button.
- [ ] The swirl appears in exactly three places, turns slowly in the hero only, and stops under reduced motion.
- [ ] No sample or invented review text exists anywhere. Placeholders are empty and labelled.
- [ ] All 18 photos are used per the photo map, none wider than native, 08 and 12 cropped as noted, and no client faces.
- [ ] The four service pages exist, each with three unique things, linked from the hub, nav and each other.
- [ ] Every "Plan My Dream Hair" opens the builder with the right pre-selects. The last step texts her with CONSULTATION first, and desktop gets copy and Instagram DM.
- [ ] Max 2 fonts, the palette as tokens, no tracked all-caps labels, motion in two places.
- [ ] Every nav link resolves, no page is thin or built on guesses, keyboard-only and 200% zoom passes done.
- [ ] Demo mode: noindex meta, X-Robots-Tag on the home page and on an image, no sitemap, no llms.txt, AI crawlers disallowed, footer line present. Live mode: SEO 100.
- [ ] Zero em dashes, zero stock or AI images, zero invented facts.
