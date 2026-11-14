# Disco Lemonade Studio: concept site

Front-end concept site for Disco Lemonade Studio, Mickayla Ramsey's one-chair vivid hair color
studio in Leonardtown, MD. Built by Lee Enterprises Unlimited as a spec demo.

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion (The Melt and the Flavor Dial
only), lucide-react. No backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
```

## Launch switch

| Variable | Values | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` or `live` | `demo` |
| `NEXT_PUBLIC_SITE_URL` | base URL, no trailing slash | the Vercel production domain on Vercel, else `http://localhost:3000` |

Demo mode serves `noindex, nofollow`, an empty sitemap and the concept footer line. Live mode
serves `index, follow`, lists the sitemap in `robots.txt` and hides the concept line. Both are
build-time variables: redeploy after changing them. See `SEO-LAUNCH.md`.

## Pages

The home page is a short hub (six blocks, about 230 words). Detail lives one tap away:

| Route | What it holds |
|---|---|
| `/` | Hero with The Melt, the Flavor Dial, three pieces of work, the holiday strip, the studio quote, closing call to action |
| `/work` | Full gallery with filters and lightbox |
| `/services` | Services grid (stable ids such as `/services#vivid-color`), pricing note, color lines |
| `/new-here` | How a first visit works, FAQ, vivid care rules, model call |
| `/studio` | The studio, the address, sample reviews |
| `/contact` | Text, call and Instagram, the planner inline, map |

Why it is split this way: `reports/Top hair stylist website design.md`.

## Where things live

- `lib/business.ts`: every business fact (name, address, phone, links, services, care rules).
- `lib/flavors.ts`: the five Flavor Dial stops. `lib/gallery.ts`: gallery order and filters.
- `lib/faq.ts`: FAQ copy, shared with the FAQPage JSON-LD so they always match.
- `lib/schema.ts`: structured data. `lib/site.ts`: the launch switch and the page list for the sitemap. `lib/meta.ts`: per-page metadata.
- `components/sections/`: one file per page section. `components/ConsultBuilder/`: the planner.
- `components/FlavorDial/`: the dial. `components/WavyFrame.tsx`: the wavy mirror frame.

## Images

Real photos only, from Mickayla's Instagram, in `public/images/raw/`. `npm run images` converts
them to `.webp` (photo 08 is cropped to remove a wall sign) and writes the static hero sizes.
`node scripts/brand-assets.mts` and `node scripts/og-image.mts` rebuild the favicon, touch icon,
lemon mark, dial thumb, logo and Open Graph image.

## Deploy to Vercel

Import the repository as its own project. Framework preset: Next.js. Leave
`NEXT_PUBLIC_SITE_MODE` unset (demo) until launch day.
