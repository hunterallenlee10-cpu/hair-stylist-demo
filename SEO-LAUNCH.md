# SEO launch checklist: Disco Lemonade Studio

The preview runs in **demo mode**: `noindex, nofollow` in the page meta, an
`X-Robots-Tag: noindex, nofollow` header on every response (pages, images, files), no
`sitemap.xml` (404), no `llms.txt` (404), AI crawlers blocked by name in `robots.txt`, and the
footer line "Concept preview by Lee Enterprises Unlimited." Flip it to live only when Mickayla has
approved the site, confirmed every DRAFT item below, and the domain is ready.

**One honest line for the owner:** the site is technically complete (Lighthouse SEO 100 on every
page type in live mode). From here, ranking depends mostly on her Google Business Profile, real
Google reviews, and links from other sites, not on the website.

## 1. Clear every DRAFT and placeholder first

The live build refuses to finish while any remain: `npm run build` in live mode runs
`scripts/launch-guard.mts`, which fails on any `data-draft` marker, placeholder review card or
`TODO: swap` in the prerendered pages, and `npm run check` (live) catches the same on `/work`.
Search the code for `DRAFT` and `data-placeholder`. As of 15 Nov 2026:

- [ ] **Instagram count.** "500+ looks" (510 posts on 15 Nov 2026). Confirm it is fine to show.
- [ ] **Loyalty line.** "Some clients have been in her chair for six years and more" (from her
      captions: a six-year client, and one of almost ten years).
- [ ] **Opening.** "Open since spring 2026" (her post of 2 March 2026). Confirm the month.
- [ ] **Session lengths.** "Big transformations in her chair have run 6 to 9 hours, and the biggest
      took two days", plus the three examples on the vivid page (9 hours, about 7 hours, 2 days and
      13 hours).
- [ ] **Hours.** Shown as "By appointment". Add `openingHoursSpecification` to `lib/schema.ts` once confirmed.
- [ ] **Color lines.** Danger Jones, Pravana, Joico Color Intensity, Moroccanoil, K18.
- [ ] **Holiday message and dates** (the lemon band on the home page).
- [ ] **Model call.** Is it still open, and are the four requirements right?
- [ ] **Service answers marked "confirm with Mickayla":** lightening for vivids; lived-in grow-out
      and going darker for fall; lifting dark hair to blonde; fixing box dye; more than one visit
      for corrections.
- [ ] **Portrait.** A real photo of Mickayla for `/studio` (a labelled placeholder holds the spot).
- [ ] **Google reviews.** Three empty "Your Google reviews go here" cards on `/studio`. Replace with
      real reviews once they exist, or remove the row. Never add star ratings, review counts or
      review schema until real reviews are shown.
- [ ] **Prices.** Only if she wants them published: fill `pricing[...].fromPrice` in
      `lib/business.ts` (null keeps them hidden).
- [ ] **Did she paint the mural herself?** `/studio` says "A swirl she painted." Confirm.

## 2. Launch day

1. In Vercel, Project Settings, Environment Variables (Production):
   - `NEXT_PUBLIC_SITE_MODE` = `live`
   - `NEXT_PUBLIC_SITE_URL` = `https://<the real domain>` (no trailing slash)
2. Redeploy. Both are build-time variables, so a redeploy is required. If the build fails, the
   launch guard is listing what is still unconfirmed: clear it, do not bypass it.
3. Confirm on the live domain:
   - `curl -sI https://<domain>/` shows **no** `X-Robots-Tag` header. Same for an image, e.g.
     `curl -sI https://<domain>/images/09-studio-swirl-mural-sequin-lemon.webp`.
   - View source on any page: `<meta name="robots" content="index, follow">`, and the canonical
     points at the real domain.
   - `/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml` and no longer blocks AI crawlers.
   - `/sitemap.xml` lists all **10** routes: `/`, `/work`, `/services`,
     `/services/vivid-hair-color`, `/services/lived-in-color-balayage`,
     `/services/blonding-and-silver`, `/services/color-correction`, `/new-here`, `/studio`,
     `/contact`.
   - `/llms.txt` is served.
   - The footer no longer shows "Concept preview by Lee Enterprises Unlimited."
   - `CHECK_URL=https://<domain> npm run check` passes in live mode.
   - Paste the home URL and `/studio` into a link preview (iMessage, Slack) and check both OG images.
4. **Bot protection.** If Vercel Firewall, Attack Challenge Mode or any bot protection is on, confirm
   it does not challenge Googlebot, Bingbot or Applebot (fetch a page with Search Console's URL
   Inspection, Live Test).
5. **Retire the preview address.** Redirect `disco-lemonade-studio.vercel.app` to the real domain (in
   Vercel, Domains), so there is only one indexable copy of the site.
6. Update `lastModified` in `lib/site.ts` (`pages`) whenever a page changes.

## 3. Google and the directories

1. **Create her Google Business Profile.** There is none for the studio today.
   - Name: Disco Lemonade Studio. Category: **Hair salon** (add Hair coloring if offered as a
     secondary category). Website: the home page.
   - Address: 26011 Point Lookout Rd #3, Leonardtown, MD 20650. Phone: (240) 561-8519.
   - Service area: Leonardtown, St. Mary's County, Southern Maryland. Add her own photos (the same
     real work), the Instagram link, and the gift card link.
   - **Report the stray listing.** A Google search shows an unrelated "Disco Lemonade" filed as a
     bar at another address. Use "Suggest an edit" on that listing (or the profile's support form)
     so the two are not merged or confused.
2. **List her elsewhere with identical name, address and phone (NAP):** Apple Business Connect
   (Apple Maps), Bing Places for Business (can import from Google), and Yelp. Copy the NAP exactly as
   above, character for character.
3. **Search Console:** verify the domain, submit `https://<domain>/sitemap.xml`, then use URL
   Inspection to **request indexing** for the home page and the four service pages. Do the same in
   **Bing Webmaster Tools** (it can import from Search Console).
4. Put the new website link in her Instagram bio next to the gift card link.
5. Ask happy clients for Google reviews (the honest way: a link, no incentives). When real reviews
   exist, replace the three placeholder cards on `/studio`.

## 4. After launch

- Re-run Lighthouse on the live URL (phone and desktop) and the Rich Results Test on `/` and one
  service page.
- Never add star ratings, review counts, prices, awards or certifications to the page or the schema
  unless they are real, confirmed and shown on the page.
