# Disco Lemonade Studio: concept site

Front-end concept site for Disco Lemonade Studio, Mickayla Ramsey's one-chair vivid hair color
studio in Leonardtown, MD. Built by Lee Enterprises Unlimited as a spec demo.

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, `motion` (lazy, The Melt and the Flavor Dial
only), lucide-react, Simple Icons paths for brand marks. No backend. v2 ("Swirl Room") brief:
`BUILD-SPEC.md`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build (live mode also runs the launch guard)
npm run check      # one h1, links, dashes, images, NAP, mode rules (needs a build)
npm run lint       # ESLint
```

## Launch switch

| Variable | Values | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` or `live` | `demo` |
| `NEXT_PUBLIC_SITE_URL` | base URL, no trailing slash | the Vercel production domain on Vercel, else `http://localhost:3000` |

Demo mode serves `noindex, nofollow` (meta and an `X-Robots-Tag` header on every response), 404s
for `sitemap.xml` and `llms.txt`, blocks AI crawlers in `robots.txt`, and shows the concept footer
line. Live mode serves `index, follow`, a 10-route sitemap, `llms.txt`, and hides the concept line;
its build fails while any DRAFT marker or placeholder card remains. Both are build-time variables:
redeploy after changing them. See `SEO-LAUNCH.md`.

## Pages (10 routes)

| Route | What it holds |
|---|---|
| `/` | The Swirl Room hero with The Melt, the Flavor Dial with More like this, After beats before, holiday band and model call, studio teaser, call to action |
| `/work` | All 18 photos, filters (`?filter=reds` and so on), lightbox with Instagram permalinks |
| `/services` | The hub (v1 ids such as `/services#vivid-color` still land), Sparkly things, Shags and shullets |
| `/services/vivid-hair-color`, `/services/lived-in-color-balayage`, `/services/blonding-and-silver`, `/services/color-correction` | One template driven by `lib/services.ts` |
| `/new-here` | How a first visit works, FAQ, Keep it loud, model call |
| `/studio` | Her mural, the room, visit and map, honest proof |
| `/contact` | Text, call, Instagram, the planner inline, click-to-load map |

## Where things live

- `lib/business.ts`: every business fact (name, address, phone, links, services, care rules).
- `lib/flavors.ts`: the five Flavor Dial stops. `lib/gallery.ts`: the 18 photos (category, flavor, permalink).
- `lib/services.ts`: the four service pages. `lib/swirl.ts`: the drawn swirl and the torn edge.
- `lib/faq.ts`: FAQ copy, shared with the FAQPage JSON-LD so they always match.
- `lib/schema.ts`: structured data. `lib/site.ts`: the launch switch and the page list for the sitemap. `lib/meta.ts`: per-page metadata.
- `components/sections/`: one file per page section. `components/ConsultBuilder/`: the planner.
- `components/FlavorDial/`: the dial. `components/WavyFrame.tsx`: the wavy mirror frame.

## Images

Real photos only, from Mickayla's Instagram, in `public/images/raw/`. `npm run images` converts
them to `.webp` with crops that remove other businesses' signs (08, 11, 12, 17), a client's face in
profile (14) and a bystander (16), and writes `lib/image-dimensions.json`.
`node scripts/brand-assets.mts` and `node scripts/og-image.mts` rebuild the favicon, touch icon,
lemon mark, dial thumb, logo and the two Open Graph images (`og-image.png`, `og-studio.png`).
Fraunces is trimmed to how the site uses it (`app/fonts/README.md`).

## Deploy to Vercel

Import the repository as its own project. Framework preset: Next.js. Leave
`NEXT_PUBLIC_SITE_MODE` unset (demo) until launch day.
