# Disco Lemonade Studio: v2 upgrade prompt for Claude Code

Paste everything below the line into Claude Code, opened in the existing Disco Lemonade Studio repo (the one deployed at disco-lemonade-studio.vercel.app).

---

You are a senior web designer and front-end engineer. This repo holds a working concept site for **Disco Lemonade Studio**, the one-chair hair color studio of Mickayla Ramsey in Leonardtown, Maryland, who specializes in vivids and rainbows. Lee Enterprises Unlimited built it as a demo the owner asked to see. It is good. Your job is to make it unmistakably great: the site she would show other stylists. Upgrade it in place. Do not start a new project and do not regenerate pages wholesale.

**Finish the whole build in this session.** Ordinary obstacles (a port in use, a missing browser for screenshots, an image that will not convert, a Lighthouse run that fails, a package upgrade that needs a codemod) are yours to diagnose and work through. Do not end by listing what is left or offering to continue. The only planned stop is missing photos, as described in section 0.

## What is wrong with v1 (fix every one of these)

An audit of the live v1 on 15 November 2026 found:

1. **The first phone screen has no hair in it.** At 375px the visitor sees black, a tracked caps label, the headline and two buttons. Her photo starts below the fold. For a color studio the color has to land in the first screen.
2. **The "Disco" and the "Lemonade" are missing.** Her real studio wall is a hot pink, lemon yellow, lime and orange swirl mural with a round pink sequin lemon mirror (new photo `09`). Her bio is built on a mirror ball and a lemon. v1 is black and pink with a wavy frame. It could be any vivid colorist.
3. **Invented reviews.** `/studio` shows three "Sample review" cards with made-up client quotes. An invented testimonial with a label on it is still invented. They go (section 4, Proof).
4. **Placeholders where real material now exists.** `/studio` has two "Photo coming soon" boxes and `/contact` has an empty map box. The mural photo is now available, and the map becomes a click-to-load card.
5. **A thin portfolio.** Eight photos, three on the home page, and "After beats before" with no before anywhere. There are now 18 real photos, one real before and after, and one in-progress shot.
6. **Every service crammed onto one page.** The sites that rank for vivid color give vivid color, balayage and color correction their own pages. v1 has anchors only.
7. **Machine-made tells.** A tracked all-caps eyebrow glued into every h1 ("VIVID HAIR COLOR IN LEONARDTOWN, MD · SOUTHERN MARYLAND Your dream hair."), and the same final call-to-action card with an empty right half on every page.
8. **Demo safety gaps.** No `X-Robots-Tag` header on responses, an empty `sitemap.xml` and a full `llms.txt` served in demo mode, and a robots file that lets AI crawlers in.

Keep what works: the Flavor Dial, The Melt, the wavy frame, the fonts, the CONSULTATION ritual, the care rules, the holiday band, the model call, the voice.

## 0. Get the assets first

All images live in Hunter's Google Drive folder **"Disco Lemonade Studio - Website Demo Assets"**:
https://drive.google.com/drive/folders/1XQwDHY-1VyHwE8ZPDb1b4NiPzVOmp7RB

- `photos/` (folder ID `12o6uviwRFlsnfSv7RZZ_VtIf98r0m070`): the 8 original photos, already in this repo.
- `photos-upgrade (added Nov 15)/` (folder ID `1B6PblwYr2t2V4tTeXryQDQ_HIbhZv-uD`): 10 new real photos, `09` to `18`, all from her own public Instagram posts.
- `reference-brand (look and feel only, not site images)/` (folder ID `13e1nM0u68hbIPmDyxMJOeIhmKA3_s2iA`): one reel cover of the studio. Look and feel only. Never on the site.

Find where v1 keeps its source images (`public/images/`). With a Google Drive connector, download the 10 new files there. Without one, check `public/images/raw/`; if they are not there, stop and ask Hunter to drop the `photos-upgrade (added Nov 15)` folder into it. Look at every new image yourself before designing with it.

Keep source files at full size and let `next/image` serve the right size per screen (section 6). Every photo is shot from behind or is a close up, so no client faces appear. Keep it that way.

### Photo map

The `Use it for` column is the plan. Never show a photo wider than its native width. Small ones go in cards.

| File | Size | What it shows | Use it for |
|---|---|---|---|
| `01-hot-pink-violet-blue-melt-back-BEST` | 1357x1721 | Back of head. Hot pink crown melting into violet and electric blue waves | Hero (inside the mirror, The Melt plays on it). Flavor Dial stop 5. OG image. Vivid page |
| `02-shego-neon-lime-panels-on-dark-brown` | 1299x1734 | Back of head. Chunky neon lime panels through dark brown waves. She calls it SHEGO | Flavor Dial stop 3. Vivid page. Gallery |
| `03-emerald-green-with-hair-gems` | 1357x1648 | Emerald green waves covered in stick-on gems, stars and flowers, her hand holding it | Holiday band. Hub tile "Sparkly things". Gallery |
| `04-magenta-black-blonde-color-block` | 1357x1721 | Blonde and magenta top layer lifted to show a black underlayer | Flavor Dial stop 4. Vivid page. Gallery |
| `05-dimensional-blonde-with-pink-dipped-ends` | 1357x1721 | Bright dimensional blonde, soft root, ends dipped in magenta and pink | Flavor Dial stop 2. Blonding page. Gallery |
| `06-silver-gray-waves-closeup` | 1357x1721 | Tight close up of silver gray waves, her pink nail holding a section | Blonding page hero. Gallery |
| `07-vanilla-brunette-caramel-balayage` | 1299x1734 | Brunette with caramel and honey balayage waves. Her "vanilla hair" post | Flavor Dial stop 1. Lived-in page. Gallery |
| `08-long-bright-barbie-blonde-waves` | 1357x1521 | Very long bright blonde waves on a red tee, her tattooed arm lifting it. Keep the "Oasis" wall sign cropped out | Blonding page. Gallery |
| `09-studio-swirl-mural-sequin-lemon` | 1041x1041 | Her studio wall: pink, yellow, lime and orange swirl mural with a round pink sequin lemon mirror. No people | `/studio` hero image (max 640 CSS px wide). Swirl colour source. Home studio teaser. OG image for `/studio` |
| `10-fire-panels-red-orange-on-black` | 1440x1920 | Back of head. Black hair with red, orange and yellow fire panels at the part | Vivid page. Final call-to-action panel. Gallery (Vivids) |
| `11-red-ribbons-through-dark-curls` | 1080x1350 | Back of head. Long dark curls with bright red ribbons all through | Vivid page, reds row. Gallery (Reds) |
| `12-nine-hour-magenta-melt-straight` | 720x956 | Very long straight magenta melting to deep berry, her hand holding it. Crop out the other business signs at both edges | Vivid page "nine hours" note, card size only (max 360 CSS px). Gallery (Reds) |
| `13-magenta-violet-closeup-pink-claw` | 1425x1900 | Tight close up: magenta melting into violet and blue, her pink and lilac nail | Home "Painted by hand" strip. Vivid page. Gallery |
| `14-first-color-rich-brunette-waves` | 3072x4096 | Long rich chocolate brunette with soft caramel dimension. A client's first ever color (her post, 14 Nov 2026) | Lived-in page hero. Gallery (Lived-in) |
| `15-before-after-red-inset` | 1440x1800 | Her own before and after graphic: dull dark "before" inset over the glossy red "after" | Color correction page. Home "After beats before" lead image. Gallery (Reds). Show it as she made it, never cut it into a fake slider |
| `16-in-progress-pink-painting` | 1440x1920 | From behind: hot pink color painted in sections over a cape | New-here page step 3. Gallery filter "In the chair" |
| `17-hidden-rainbow-under-brown-veil` | 1440x1641 | Rich brown bob lifted to show a hidden magenta, violet and orange underlayer | Flavor Dial stop 2 "More like this". Vivid page. Gallery |
| `18-soft-brunette-balayage-back` | 1440x1920 | Soft brunette balayage waves from behind | Lived-in page. Gallery (Lived-in) |

Lightbox permalinks ("See this post on Instagram"), each `https://www.instagram.com/p/<code>/`: `09` DVZYwOcDyHv, `10` DUytvusj5bm, `11` DY7jwQln6Af, `12` DYz9zXNiZn2, `13` DaqbWxiJOsN, `14` Dfugik6llk6, `15` DOZJbinD9LV, `16` DT6h5e4DHLc, `17` DPj9Z8xj63x, `18` DUVtu5rjm8D.

**Never generate, fetch or use stock or AI images.** Mickayla has posted, in her own words, that she makes this with her hands and wants no part of AI. A single generated image on her site would end the deal. Her portrait still has no usable photo: keep one labelled placeholder ("Photo: Mickayla, from Disco Lemonade Studio") in the design system.

## 1. Business facts (use only these, invent nothing)

Everything in v1's `lib/business.ts` stays true. Re-read it, then add or correct:

- **Instagram (proof):** verified account @the__chaospixie, "Mickayla Ramsey | Southern Maryland Hairstylist", 510 posts on 15 Nov 2026. Say "500+ looks on Instagram" with `// DRAFT: live count`.
- **The studio:** her post of 2 March 2026 reads "the sneakiest sneak peek... welcome to Disco Lemonade" over the mural. Say "Open since spring 2026" with `// DRAFT: confirm opening month`. Black walls, a hot pink wavy sequin mirror, sequin lemons, and the swirl mural in photo `09`.
- **Loyalty, from her own captions:** one client "SIX YEARS of this babe trusting me", and one she has colored for almost ten years. Use "Some clients have been in her chair for six years and more" (`// DRAFT: confirm`).
- **Session lengths, from her captions:** a 9 hour Joico Intensity melty vivid transformation (May 2026), almost exactly seven hours including styling and pictures (March 2026), and one project over 2 days and 13 hours. Keep v1's line "Big transformations in her chair have run 6 to 9 hours, and the biggest took two days" (`// DRAFT`).
- **Newest post:** 14 Nov 2026, a client's first ever color: "being trusted not only with a person's hair, but with a first ever color experience, will forever feel so special to me". Usable as a pull quote on the lived-in page.
- **Her care rules, color lines, model call, holiday line, CONSULTATION ritual, address, phone:** unchanged from v1.
- **Phone:** (240) 561-8519, `sms:+12405618519`, `tel:+12405618519`. Email: none published.
- **Gift cards:** `https://squareup.com/gift/C8NTNQN8RN9TG/order` (real, from her bio).
- **Google:** there is no Google Business Profile for the studio. A search shows an unrelated "Disco Lemonade" listing filed as a bar at another address. No Google reviews exist. Leave ratings off the site entirely.
- **Do not claim:** star ratings, review counts, awards, certifications, prices, deposits, hours, how long color lasts, "no filters", extensions, bridal, or any brand beyond v1's list.

## 2. The ONE goal

Unchanged: every path leads to **"Plan My Dream Hair"**, the Consult Builder, which ends with the visitor tapping to text Mickayla the word CONSULTATION plus their answers. "Text CONSULTATION to (240) 561-8519" sits beside it everywhere, calling is third. Gift cards stay a quiet text link (footer, FAQ, and the holiday band). No newsletter, no email capture.

## 3. Design direction: "Swirl Room"

v1 was the black walls and the pink mirror. v2 adds the wall she actually painted. The site is her studio: near-black, the hot pink sequin mirror around her work, and her swirl mural turning slowly behind it. The swirl is the one place all four mural colours appear. Everywhere else the interface stays black, pink and calm, so the hair is still the brightest thing on the page.

**Palette (tokens by role, in `@theme`, OKLCH with hex alongside):**

| Role | Hex | OKLCH | Where |
|---|---|---|---|
| bg | `#120E10` | oklch(17.0% 0.008 346.3) | page (about 60%) |
| surface | `#1E1719` | oklch(21.4% 0.012 359.1) | cards, mirror back (about 30% with bg-2) |
| surface-2 | `#2A2023` | oklch(25.6% 0.016 358.4) | raised panels, builder |
| border | `#33272B` | oklch(28.8% 0.019 356.4) | 1px lines |
| text | `#FBF6EE` | oklch(97.5% 0.012 79.8) | body and headings |
| muted | `#B9ABA9` | oklch(75.2% 0.016 27.3) | secondary text |
| primary | `#FF3D8B` | oklch(67.3% 0.233 1.9) | primary button, active states, the mirror frame (about 10% with lemon) |
| primary-hover | `#FF66A6` | oklch(72.0% 0.195 357.1) | hover and press |
| lemon | `#F2D13C` | oklch(86.4% 0.161 96.0) | the holiday band and the lemon mark only |
| swirl-pink | `#E82553` | oklch(60.4% 0.224 15.5) | swirl stripes only |
| swirl-yellow | `#E3DB16` | oklch(87.0% 0.183 106.9) | swirl stripes only |
| swirl-green | `#3E9B3A` | oklch(61.2% 0.161 142.7) | swirl stripes only |
| swirl-orange | `#F75513` | oklch(66.3% 0.209 38.3) | swirl stripes only |
| success | `#5BD08F` | oklch(77.3% 0.142 156.4) | builder validation |
| error | `#FF7A7A` | oklch(73.5% 0.163 21.9) | builder validation |

The four swirl colours were sampled from photo `09`. They are decorative only and never carry text. Measured contrast: text on bg 17.8:1, text on surface 16.4:1, muted on bg 8.6:1, muted on surface 7.9:1, bg-coloured text on the pink button 5.7:1, pink on bg 5.7:1, bg text on lemon 12.7:1. Keep every pair you use at 4.5:1 or better for body text and 3:1 for large text and controls.

Phase 1 renders a palette board (the swatches, a primary button, a card, a paragraph of body text, the swirl, and photo `01` in the mirror). Screenshot it, look at it, and fix anything muddy or harsh before going on. Check the swirl beside photos `01`, `10` and `14`: if it fights the hair, lower its opacity or saturation, never the photos.

**Fonts (keep v1's two, push them harder):**

- Display: **Fraunces** (variable, `SOFT` 100 and `WONK` 1 at display sizes, weights 600 to 900, italics). Her own reels use a soft italic serif.
- Body: **DM Sans** (400, 500, 700).

**Type scale (named steps, each a `clamp()` with rem bounds, ceiling no more than 2.5 times the floor):** label `clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem)`, body `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`, lead `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)`, h3 `clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)`, h2 `clamp(2rem, 1.6rem + 2vw, 3.5rem)`, h1 `clamp(2.5rem, 1.9rem + 3vw, 5rem)`, display `clamp(2.75rem, 1.8rem + 4.6vw, 6.5rem)`. Body line height 1.55, display 0.98. Text blocks max about 66 characters. The hero headline uses display and its longest word must fit at 375px.

**Labels:** drop the tracked all-caps eyebrows. Section labels become sentence case in DM Sans 500 at the label step, in muted, preceded by the small lemon mark. Use them on at most four sections per page.

**Signature material:**

- **The sequin mirror.** v1's `WavyFrame` becomes her hot pink wavy mirror: the same scalloped clip path, with a 10 to 14px frame band in primary filled with a fine sequin pattern (an inline SVG of tiny offset circles in two pink tints, under 2KB). No sequin textures anywhere else.
- **The swirl.** An inline SVG spiral of alternating stripes in the four swirl colours, drawn by you, built to read like her mural. It appears in exactly three places: behind the hero mirror, as the edge of the holiday band, and on the 404 page.
- **The mirror-ball lemon** mark stays as the favicon and the label bullet.

**Motion (two signature places, as before):**

1. **Hero: "The Swirl Room".** The swirl sits behind the mirror, partly masked into a circle so it reads as her wall peeking around the mirror, and turns slowly (one turn per 90 seconds, CSS transform only, paused with `animation-play-state` when the hero is off screen). The Melt still plays once on photo `01` inside the mirror. Under `prefers-reduced-motion` the swirl is still and the photo is in full colour. **Fallback:** if the rotating SVG costs more than about 4ms per frame on a mid phone profile or causes layout shift, render the swirl as a static SVG and keep only The Melt.
2. **The Flavor Dial.** Unchanged behaviour, plus the "More like this" row (section 4).

The free polish tier (scroll reveals in plain CSS inside reduced-motion and `@supports` checks, and cross-page view transitions where supported) does not count against the two. The headline and buttons are visible from the first instant: nothing above the fold fades in from invisible. No loading intro, no custom cursor, no smooth-scroll library.

**What the best sites in this niche do (patterns, in our words):**

- The hair is the colour and the interface stays neutral, because a colorful UI competes with the work.
- Each searched-for service has its own page, gallery and consult button. It serves Google and the visitor who wants one thing.
- The portfolio is a core page, large and filterable, and each image leads to booking.
- The newest sites build the hero from real objects of the brand instead of a model shot. Ours is her real mural and mirror.
- One big display face with personality over one plain sans, with colour-blocked bands for rhythm.
- Dated, avoid: tracked caps labels everywhere, centred caps titles over a photo, service sidebars, empty h1s, stacked banners over the first phone screen.
- Where they are all weak and we win: none says in the stylist's words how long a vivid takes or how to keep it, none compares natural against loud on one control, none shows the room you sit in for six hours, none books the way the stylist really works.

**Things only this business has (all required):**

- Her swirl mural (photo `09` and the drawn swirl) and her sequin lemon mirror.
- Her booking ritual in her words: text the word CONSULTATION to (240) 561-8519.
- "Vanilla or otherwise" in the hero and her question "Do you do vanilla hair? Or just vivids?" answered.
- "It's just me, my color brushes, and my lemons against the world."
- Her four Keep it loud care rules, the vivid model call, "sparkly things", "SHEGO" under photo `02`.
- Her real session lengths and the two-day project.
- Her first-ever-color line on the lived-in page.
- "Painted by hand in Leonardtown." Every photo is her own work, linked to her real post.
- Leonardtown, Point Lookout Rd, St. Mary's County and Southern Maryland as real text.

## 4. Page structure

**Site map (compact multi-page, 10 routes):** `/`, `/work`, `/services` (hub), `/services/vivid-hair-color`, `/services/lived-in-color-balayage`, `/services/blonding-and-silver`, `/services/color-correction`, `/new-here`, `/studio`, `/contact`. Cuts ("Shags and shullets") and hair gems ("Sparkly things") stay as sections of the hub because there is not enough real material for their own pages. The hub keeps v1's ids (`#vivid-color`, `#panels-and-peekaboos`, `#blonding-and-silver`, `#lived-in-color`, `#color-corrections`, `#cuts`, `#hair-gems`) on its tiles so old links still land, and each tile links to its page where one exists.

**Nav:** wordmark left. Work, Services (a small menu listing the four service pages and the hub), New here, The studio. Right: "Text (240) 561-8519" and "Plan My Dream Hair". Mobile: burger sheet plus v1's sticky bar (Text, Plan My Hair). The sticky bar must never cover focused elements (`scroll-padding-bottom` equal to its height).

### Home `/`

1. **Hero, "The Swirl Room".** Desktop (1440): split, type left, mirror right. The mirror holds photo `01` at max 600 CSS px wide, tilted 2 degrees, with the swirl circle behind it at about 1.25 times the mirror's width, cropped by the hero's right edge. Phone (375): the mirror comes **first**, about 300px tall, cropped to the crown and mid-lengths of `01` where the colour is, with the swirl behind it, then the headline, then the primary button. On a 375 by 812 screen the nav, a full band of colour, the whole headline and the primary button are all visible without scrolling, with the sticky bar in place.
   - Label: "Hair color studio in Leonardtown, MD".
   - Headline: "Your dream hair." then, italic in primary, "Vanilla or otherwise."
   - The label and headline together are the page's single `<h1>`, label as a small span, headline as the large span, both sentence case.
   - Sub: "Mickayla Ramsey paints vivids, rainbows and everything in between, by hand, in a private one-chair studio in Leonardtown. Every new look starts with a free consultation."
   - Buttons: "Plan My Dream Hair" and the ghost "Text CONSULTATION to (240) 561-8519".
   - Proof line under the buttons (real proof inside the first two phone screens): the Instagram glyph plus "Verified on Instagram, 500+ looks" linking to her profile, then "Some clients have been in her chair six years and more". No stars.
2. **Find Your Flavor** (the show-stopper). v1's Flavor Dial, kept, plus a "More like this" row under the readout: two or three small mirror-framed thumbnails of other real photos for the current stop (Vanilla: `14`, `18`. A pop: `17`, `05`. Panels: `10`, `11`. Color block: `04`, `13`. Full rainbow: `13`, `12`). Tapping a thumbnail opens the shared lightbox. "Plan this look" still pre-selects the stop.
3. **After beats before.** Lead with `15` (her real before and after) large on the left with the caption "Her before and after. Same client, one color day." Right: a tight grid of `10`, `11`, `13`, `02`, `03`, `14` in mirror frames. Button: "See all 18 looks" to `/work`.
4. **Holiday band** (lemon, as v1) with the swirl as its torn top edge and photo `03`. "This is your sign to text me for your holiday hair." Sub: "Color, sparkle, or both." Button "Plan my holiday hair". Under it, a quiet text link: "Or give someone a color day: gift cards". Then v1's model call strip.
5. **The studio teaser.** Photo `09` in the mirror on one side (max 520 CSS px), the pull quote and "A private, one-chair color studio at 26011 Point Lookout Rd #3, Leonardtown. One client at a time." Links: "See the studio" and "Get directions".
6. **Final call to action.** Fix v1's empty right half: photo `10` in a mirror frame (max 440 CSS px) on the right, never stretched. "Ready when you are, rainbow enthusiast." with both buttons. On inner pages, vary the photo (`13`, `14`, `06`) so the band is not identical everywhere.

### `/work`

h1 label "Vivid hair color by Mickayla Ramsey in Leonardtown, MD", headline "After beats before." All 18 photos in a masonry grid of mirror frames. Filters: All, Vivids, Reds, Blondes and silver, Lived-in, In the chair. Lightbox: keyboard arrows, Esc, swipe, the caption from the photo map, "Plan this look" (pre-selects the matching flavor or service), and "See this post on Instagram" where a permalink exists. Line at the bottom: "Every photo here is her own work, from her own chair. 500 more on Instagram @the__chaospixie."

### `/services` (hub)

h1 "Hair color services in Leonardtown, MD" with headline "What she paints." Bento tiles as v1, each tile linking to its page, keeping the ids. Cuts and Sparkly things sections stay here in full. One honest line on pricing (section 4a).

### Service pages (one template, driven by `lib/services.ts`)

Template: breadcrumb (Home, Services, page) with `BreadcrumbList`; hero split with the page's own photo in the mirror; a "What it is" paragraph; a gallery row of that service's photos; a "What to expect" block of real facts; three or four questions and answers unique to the page; the consult button pre-selecting the service; the final call to action. Each page carries at least three things no other page has.

- **`/services/vivid-hair-color`**: h1 label "Vivid hair color in Leonardtown, MD", headline "Rainbows, melts and panels. Her specialty." Photos `01`, `02`, `04`, `10`, `11`, `12`, `13`, `17`. Unique: the real session lengths including the 9 hour melt (beside `12`) and the two-day project; a "Reds" row (`11`, `12`, `15`); the Keep it loud rules in full; her line "after >>>>> before. vivids >>>>> no vivids" rendered as type.
- **`/services/lived-in-color-balayage`**: h1 label "Balayage and lived-in color in Leonardtown, MD", headline "Vanilla, done obsessively." Photos `14`, `07`, `18`. Unique: her question of the week and the answer; the first-ever-color pull quote beside `14`; questions about grow-out and going darker for fall.
- **`/services/blonding-and-silver`**: h1 label "Blonding and silver hair in Leonardtown, MD", headline "Barbie blonde to icy silver." Photos `06`, `08`, `05`. Unique: the Barbie blonde story from her caption (she skipped the toner and kept the raw lift because the client wanted it bright and sunny); questions about lifting from dark and how long blonding takes (answer: quoted at the consult).
- **`/services/color-correction`**: h1 label "Color correction in Leonardtown, MD", headline "Box dye, old color, a whole new direction." Photo `15` plus `16` (in progress). Unique: a three-step "how a correction works" (honest history at the consult, a plan that may take more than one visit, then color day); the builder opening with "Correction or big change" and "Box dye at home" pre-selected; questions: "Can you fix box dye?" (answer: often, and the consult decides how), "Will it take more than one visit?" (sometimes; she will tell you at the consult). Mark the answers `// DRAFT: confirm with Mickayla`.

### `/new-here`, `/studio`, `/contact`

- `/new-here`: as v1, with photo `16` beside step 3 "Color day", captioned "Mid-paint. Pink goes on in sections."
- `/studio`: hero is photo `09` in the mirror (max 640 CSS px) beside "Black walls. Pink mirror. A swirl she painted. Lots of lemons." Then the portrait placeholder, the quote, the address card, "Open since spring 2026" (`// DRAFT`), and the map card (below). **Proof section replaces the sample reviews:** title "From the chair." Show the real proof (verified Instagram, 500+ looks, six-year clients) and three empty labelled placeholder cards: "Your Google reviews go here". No names, no stars, no quotes, no job stories. In live mode the build fails if any placeholder card remains.
- `/contact`: as v1. Replace the empty map box with a click-to-load map card: a static styled card (address, a small drawn pin on the bg, "Show the map" button) that loads the Google Maps embed only when tapped, plus "Get directions".

### 4a. Pricing and trust

Never invent a price. Add a pricing slot to each service page driven by `lib/business.ts` (`fromPrice: null` means hidden) and keep the honest FAQ answer: "Pricing depends on your hair and the look, and is quoted at your free consultation." Proof stays inside the first two phone screens on the home page.

## 5. The Consult Builder (conversion engine)

Keep v1's steps and pre-selects. Audit and fix the end of the flow so it is honest:

- Two or three tap steps for a quick visitor, with "Rather talk? Text or call" on every step, and no step asking for anything already given.
- The last step shows a summary and one button that names the real action: **"Text my request to Mickayla"**, an `sms:+12405618519?&body=` link whose body starts with CONSULTATION and then the answers (as v1). The success message ("Sent? She will reply to plan your consultation.") appears only after that tap.
- Desktop, where `sms:` does nothing: show "Copy my request" (copies the same text, confirms "Copied"), the number written out, and "Or send it as an Instagram DM" linking to her profile.
- Escape closes, focus is trapped, body scroll locks, and focus returns to the button that opened it.

## 6. Tech and file rules

- Print the installed versions of Next.js, React, Tailwind and the motion library first. The current stable target is **Next.js 16, React 19, Tailwind CSS 4**. If the repo is older, read the upgrade notes for those major versions, run the official codemods, and fix the build. Known changes: route `params` and `searchParams` are Promises and must be awaited; `middleware` is now `proxy`; `next lint` is gone, so lint with ESLint directly; Tailwind 4 keeps tokens in a CSS `@theme` block. If the upgrade still fails after real diagnosis, revert to the versions that build, say so in the hand-back, and continue.
- Motion: if v1 uses `framer-motion`, move to `motion` imported from `motion/react`, loaded lazily so only The Melt and the Flavor Dial pay for it.
- Icons: `lucide-react` for interface icons. Instagram and other brand marks are inline SVGs from Simple Icons.
- Images: `next/image` with a `sizes` value on every image, AVIF and WebP enabled in the config, the hero image preloaded with the framework's current setting (not the deprecated `priority`), and width and height on everything.
- Server-rendered by default. Only the Flavor Dial, the gallery filters and lightbox, the builder, the swirl animation toggle and the map card are client components, and the builder and map load when first needed.
- All facts stay in `lib/business.ts`, gallery data in `lib/gallery.ts` (now 18 entries with category, caption, permalink and flavor), dial stops in `lib/flavors.ts`, service pages in `lib/services.ts`. No file over 500 lines.
- Accessibility to WCAG 2.2 AA: the sticky bar never covers focus, the Flavor Dial works with arrow keys and stop buttons as well as drag, the builder never asks for the same thing twice, zoom is never blocked, base text 16px, tap targets 44px (never under 24px), visible focus rings in primary.
- Speed budgets, measured on a production build with the phone profile: largest image within 2.5 seconds, layout shift under 0.1, response to taps within 200 milliseconds.

## 7. SEO: built to score 100 at launch

**The launch switch stays:** `NEXT_PUBLIC_SITE_MODE` (`demo` default, or `live`) and `NEXT_PUBLIC_SITE_URL`.

- **Demo mode adds:** robots meta `noindex, nofollow`; an `X-Robots-Tag: noindex, nofollow` header on every response (pages, images, files), set in the framework's headers config; the footer line "Concept preview by Lee Enterprises Unlimited."; no sitemap (the route returns 404, not an empty file); no `llms.txt` (404); a robots file that still allows search engines (so they can read the noindex) and disallows AI crawlers by name: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent.
- **Live mode:** `index, follow`, no header, a sitemap listing all 10 routes with real dates, the robots file listing the sitemap, `llms.txt` served, no footer line, and a build guard that fails if any `DRAFT` marker, placeholder review card or `// TODO: swap` remains in rendered output.

**Titles and meta descriptions (unique, written out).** Home:

- Title: `Hair Color Studio in Leonardtown, MD | Disco Lemonade Studio`
- Meta description: `Mickayla Ramsey paints vivids, rainbows and lived-in color by hand at Disco Lemonade Studio in Leonardtown, MD. Text CONSULTATION to (240) 561-8519.`
- Vivid. Title `Vivid Hair Color in Leonardtown, MD | Disco Lemonade Studio`. Description: `Rainbows, melts, panels and reds by Mickayla Ramsey at Disco Lemonade Studio in Leonardtown, MD. See her real work and plan a free vivid consultation.`
- Lived-in. Title `Balayage and Lived-in Color, Leonardtown MD | Disco Lemonade`. Description: `Brunette dimension, caramel balayage and soft grow-out from a vivid specialist who loves vanilla hair too. Free consultation in Leonardtown, MD.`
- Blonding. Title `Blonding and Silver Hair in Leonardtown, MD | Disco Lemonade`. Description: `Bright Barbie blondes, icy silver and soft roots by Mickayla Ramsey at Disco Lemonade Studio, Leonardtown, MD. Plan it at a free consultation.`
- Correction. Title `Color Correction in Leonardtown, MD | Disco Lemonade Studio`. Description: `Box dye, old color or a whole new direction. Start with a free consultation at Disco Lemonade Studio, 26011 Point Lookout Rd #3, Leonardtown, MD.`
- `/work`, `/services`, `/new-here`, `/studio`, `/contact`: keep v1's titles and descriptions, and update `/work` to say 18 looks.

**On every page:** exactly one `<h1>`, server-rendered, containing the service (or "hair color") and "Leonardtown, MD"; headings in order; a self-referencing canonical from `NEXT_PUBLIC_SITE_URL`; `<html lang="en">`; alt text from the photo map (decorative images get an empty alt); every link says where it goes (no "learn more"); anything that opens the builder or a modal is a `<button>`; no hreflang. Internal links: each service page links to the other three and to `/work` filtered to it.

**Structured data (JSON-LD, server-rendered, validated):** keep v1's `HairSalon` (with `sameAs` Instagram, `founder`, geo). Add `Service` on each service page with `provider` pointing at the salon's `@id` and `areaServed` Leonardtown, St. Mary's County and Southern Maryland, and `BreadcrumbList` on every inner page. `FAQPage` markup is optional (Google retired FAQ rich results in May 2026); keep the visible FAQs whatever you decide. Never add `aggregateRating` or `review` markup. Validate every block with a schema.org validator if one is reachable, otherwise parse each and check required properties, and say which you did.

**`llms.txt` (live mode only):** Markdown with a `#` title, a one-line summary, and sections with proper Markdown links. It is a small courtesy file, not a ranking tool.

**Lighthouse targets:** SEO 100 in live mode on the home page and one page of each type (a service page, `/work`, `/studio`, `/contact`), Performance, Accessibility and Best Practices 90 or higher. In demo mode expect SEO about 69, with "Page is blocked from indexing" the only failing SEO audit. Print the Lighthouse version used. Agentic Browsing is reported for information only.

**Update `SEO-LAUNCH.md`:** switch to live with the real domain and confirm the header is gone and the sitemap lists 10 routes; create her Google Business Profile (category Hair salon, linking the home page) and report the stray "Disco Lemonade" bar listing; list her on Apple Business, Bing Places and Yelp with identical name, address and phone; submit the sitemap and request indexing; confirm bot protection is not blocking search crawlers; retire the preview address; clear every DRAFT. One honest line for the owner: the site is technically complete, and ranking now depends mostly on her Google profile, reviews and links.

## 8. Copy rules

- No em dashes or double hyphens anywhere.
- Short, plain, playful. Her captions swear, the site does not. No hype words, fake numbers, awards or "#1".
- Every assumption carries `// DRAFT` in code.

## 9. Build order

First actions, in order:

1. Save this whole prompt as `BUILD-SPEC.md` (move v1's spec, if present, to `docs/BUILD-SPEC-v1.md`).
2. Update `CLAUDE.md`: the stack, the commands, the rules that never bend (real photos only, invent nothing, one goal, no em dashes, demo mode by default), and "re-read the matching part of BUILD-SPEC.md at the start of each phase".
3. Create a branch `v2-upgrade` and commit.
4. Write `implementation_kickstart.md` with the phases below as checkboxes, the tokens and the final checklist. Commit.
5. Add `npm run check`: one h1 per page, no broken internal links across all 10 routes, no leftover blanks or "Sample review" text, no em dashes or double hyphens in rendered text, alt and dimensions on every image, every phone number and address on the pages matching `lib/business.ts`, and no DRAFT markers in live mode. Run it at the end of every phase and print the result.

Screenshots: install Playwright's Chromium if missing (`npx playwright install chromium`); if that fails, use any Chromium on the machine and say which. After each phase, screenshot 1440 and 375, look at them, fix the three weakest things, commit.

- [ ] Phase 1: version check and upgrade, tokens in `@theme`, type scale, the palette board, the sequin mirror frame, the drawn swirl, new labels. Home hero "The Swirl Room" on phone first, then desktop. **Review 1:** a fresh subagent that has not seen the build scores the hero screenshots as an award juror (design 40, usability 30, creativity 20, content 10) and names the three weakest things. One round of fixes.
- [ ] Phase 2: new photos into the pipeline, `lib/gallery.ts` to 18 entries, `/work` filters and lightbox with permalinks, the Flavor Dial "More like this" row, home "After beats before" with `15`.
- [ ] Phase 3: `lib/services.ts`, the service page template, the four service pages, the hub update, the nav services menu, breadcrumbs.
- [ ] Phase 4: `/studio` with `09` and the honest proof section, `/new-here` with `16`, `/contact` map card, the holiday band swirl edge and gift card link, varied final call-to-action photos, the 404 page with the swirl.
- [ ] Phase 5: the builder's honest last step and desktop fallback, sticky bar focus fix, keyboard and 200% zoom pass.
- [ ] Phase 6: demo safety and SEO (headers, robots, sitemap and `llms.txt` gating, titles, descriptions, JSON-LD, Open Graph images (`og-image.png` for home, a second one built from `09` for `/studio`), `SEO-LAUNCH.md`). Lighthouse on a production build (`next build` then `next start`), phone and desktop, live mode first with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, then demo mode. Use `npx lighthouse` with `CHROME_PATH` pointed at Playwright's Chromium if needed. Report real numbers. Never estimate a score.
- [ ] Phase 7: **Review 2:** a fresh subagent repeats the juror scoring on screenshots of one page of each type, then runs a fact audit: every number, name, claim and price on the built pages checked against section 1. One round of fixes. Then the final checklist, `npm run check`, merge `v2-upgrade` into the main branch, and push so Vercel redeploys in demo mode.

## 10. Final review checklist

- [ ] Every item in "What is wrong with v1" is fixed.
- [ ] At 375 by 812 the first screen shows colour from her work, the whole headline and the primary button.
- [ ] The swirl appears in exactly three places, turns slowly in the hero only, and stops under reduced motion.
- [ ] No sample or invented review text exists anywhere. Placeholders are empty and labelled.
- [ ] All 18 photos are used per the photo map, none wider than native, `08` and `12` cropped as noted, and no client faces.
- [ ] The four service pages exist, each with three unique things, linked from the hub, nav and each other.
- [ ] Every "Plan My Dream Hair" opens the builder with the right pre-selects. The last step texts her with CONSULTATION first, and desktop gets copy and Instagram DM.
- [ ] Max 2 fonts, the palette as tokens, no tracked all-caps labels, motion in two places.
- [ ] Every nav link resolves, no page is thin or built on guesses, keyboard-only and 200% zoom passes done.
- [ ] Demo mode: noindex meta, `X-Robots-Tag` on the home page and on an image, no sitemap, no `llms.txt`, AI crawlers disallowed, footer line present. Live mode: SEO 100.
- [ ] Zero em dashes, zero stock or AI images, zero invented facts.

## 11. When you finish

Print in the conversation: installed versions; Lighthouse scores (four categories, both modes, phone and desktop) for the home page and one page of each type; demo-mode headers of the home page and one image; the structured data validation result; each page's title, description and h1; the last `npm run check` output; both juror scores before and after fixes; 1440 and 375 screenshots of the hero, a service page, `/work` and the builder's last step; and every DRAFT and placeholder item the owner must confirm or supply.
