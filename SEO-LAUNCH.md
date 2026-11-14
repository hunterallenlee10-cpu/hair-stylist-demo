# SEO launch checklist: Disco Lemonade Studio

The deployed demo runs in **demo mode** (`noindex, nofollow`, no sitemap, concept footer line).
Flip it to live only when Mickayla has approved the site and the domain is ready.

## Launch day

1. In Vercel, Project Settings, Environment Variables (Production):
   - `NEXT_PUBLIC_SITE_MODE` = `live`
   - `NEXT_PUBLIC_SITE_URL` = `https://<the real domain>` (no trailing slash)
2. Redeploy. These are build-time variables, so a redeploy is required.
3. Confirm on the live domain:
   - View source on any page: `<meta name="robots" content="index, follow">`.
   - The canonical on each page points at the real domain.
   - `/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml`.
   - `/sitemap.xml` lists all six pages (`/`, `/work`, `/services`, `/new-here`, `/studio`, `/contact`).
   - The footer no longer shows "Concept preview by Lee Enterprises Unlimited."
   - Paste the home URL into a link preview (iMessage, Slack) and check the OG image.
4. Update the `lastModified` date for a page in `lib/site.ts` (`pages`) whenever it changes.
5. Submit the sitemap in **Google Search Console** (verify the domain first) and **Bing Webmaster Tools**.
6. Create or claim the **Google Business Profile** for Disco Lemonade Studio
   (26011 Point Lookout Rd #3, Leonardtown, MD 20650, (240) 561-8519). Note: Google Maps already
   shows a "Disco Lemonade" pin at this address, so check whether a profile exists and claim it rather
   than creating a duplicate. Add the website link, the Instagram link, categories (Hair salon,
   Hair coloring), service area (Leonardtown, St. Mary's County, Southern Maryland) and real photos.
   Name, address and phone must match the site exactly.
7. Put the new website link in her Instagram bio next to the gift card link.
8. Re-run Lighthouse on the live URL (mobile and desktop) and the Rich Results Test on `/`.

## Replace every DRAFT and Sample item first

Search the code for `DRAFT` and `Sample`. As of this build:

- [ ] Working days and hours (shown as "By appointment"). Add `openingHoursSpecification` to `lib/schema.ts` once confirmed.
- [ ] Years of experience ("2016 was her first full year", "about a decade of color").
- [ ] Typical session lengths ("Big transformations in her chair have run 6 to 9 hours").
- [ ] Color lines she uses (Danger Jones, Pravana, Joico Color Intensity, Moroccanoil, K18).
- [ ] Holiday message and dates (the lemon band).
- [ ] Whether the vivid model call is still open.
- [ ] Reply method and timing after the planner ("Mickayla will reply to plan your consultation").
- [ ] Which pricing approach to publish on `/services`, if any (hourly, "starting at", or a first-visit package). Comparable vivid specialists publish one of these.
- [ ] Three sample reviews: replace with real Google reviews. Only then consider review schema.
- [ ] Studio photo and a photo of Mickayla (currently labelled placeholders).
- [ ] A logo file, if she has one (the wordmark is currently set in type).
- [ ] The towns her clients come from (only Leonardtown, St. Mary's County and Southern Maryland are listed).

## Never

- Never ship live mode on a URL that is not the real domain.
- Never add star ratings, review counts, prices or awards to the page or the schema unless they are real and shown.
