@AGENTS.md

# Disco Lemonade Studio (concept site, v2)

Concept site for Mickayla Ramsey's one-chair hair color studio in Leonardtown, MD, built by
Lee Enterprises Unlimited. The full brief is `BUILD-SPEC.md`. **Re-read the matching part of
`BUILD-SPEC.md` at the start of each phase.** Progress lives in `implementation_kickstart.md`.

## Stack

Next.js 16 (App Router, server components by default), React 19, TypeScript, Tailwind CSS 4
(tokens in the `@theme` block of `app/globals.css`), `motion` (imported lazily from
`motion/react`, only for The Melt and the Flavor Dial), `lucide-react` for interface icons,
Simple Icons paths inline for brand marks. No backend.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build        # production build (+ launch guard in live mode)
npm start            # serve the production build
npm run check        # site checks against a production build (see scripts/check.mts)
npm run lint         # ESLint (next lint no longer exists)
npm run typecheck    # tsc --noEmit
npm run images       # raw photos -> optimised .webp + lib/image-dimensions.json
```

## Where things live

- `lib/business.ts`: every business fact. `lib/gallery.ts`: the 18 photos (category, caption,
  permalink, flavor). `lib/photos.ts`: alt text and dimensions. `lib/flavors.ts`: dial stops.
  `lib/services.ts`: the four service pages. `lib/site.ts`: the launch switch.
- `components/`: shared pieces. `components/sections/`: one file per page section.

## Rules that never bend

1. **Real photos only.** Every image is Mickayla's own work from `public/images/raw/`. Never
   generate, fetch or use stock or AI images. No client faces.
2. **Invent nothing.** Facts come from `lib/business.ts` and section 1 of `BUILD-SPEC.md`.
   No prices, ratings, review counts, awards, certifications, hours or invented reviews.
   Every assumption carries `// DRAFT` in code and renders inside `<Draft>` (a `data-draft`
   attribute) so the live-mode guard can find it.
3. **One goal.** Every path leads to "Plan My Dream Hair" (the Consult Builder, which ends in a
   text that starts with CONSULTATION). Texting sits beside it, calling is third.
4. **No em dashes or double hyphens** anywhere in copy.
5. **Demo mode by default.** `NEXT_PUBLIC_SITE_MODE` is `demo` unless set to `live`. Demo mode is
   noindex everywhere (meta and `X-Robots-Tag`), has no sitemap or `llms.txt`, and blocks AI crawlers.
6. No file over 500 lines.
