# Award-winning and top-end hair salon / colorist / stylist websites: structural teardown

Method note (applies to every section): all live sites below were downloaded on 2026-11-14 as static HTML (curl, desktop Chrome user agent) and parsed with a script (BeautifulSoup) for nav links, heading order, `<section>` tags, link targets, booking-provider strings and visible word counts. Consequences the report writer should keep in mind:

- "Words (main)" = visible text in `<body>` with `<nav>`, `<header>`, `<footer>`, scripts and styles removed. It is static-HTML text only: JS-injected content is missed, and hidden off-canvas menus or responsive duplicates that sit outside `<nav>`/`<header>` are counted. Where I know this distorts a figure I say so.
- "Section tags" = literal count of `<section>` elements. "Content blocks" = my own count of distinct blocks in reading order (labelled as my count; treat as approximate).
- Visual behaviour (sticky headers, animations, how a hero looks) was NOT observed, because nothing was rendered in a browser. Anything about stickiness is labelled inferred.
- Award facts come from the award/gallery pages themselves, fetched the same day.

## 1. Which hair salon / colorist / stylist websites have won or been shortlisted for design awards or featured in curated design galleries in roughly 2022 to 2026?

### Takeaway
Recognition for hair salon sites in 2022 to 2026 is almost entirely Awwwards Honorable Mentions and Nominees plus smaller galleries (CSS Nectar, One Page Love); I found no hair salon that took an Awwwards Site of the Day in that window, and no salon entries at all on CSS Design Awards, FWA, Webby, Siteinspire, Godly, Land-book or Httpster through search. The strongest recognised set is Gielly Green (HM Jan 2026), ALICE Hair & Art (HM Feb 2025), Atelier Brzozowski (HM Sep 2024), Una (HM Mar 2024) and Il Colorista (HM Sep 2022).

### Cited Findings

Design-award or curated-gallery recognition, 2022 to 2026 (all live and torn down in section 2):

| # | Site | Live URL | Recognition | Builder / stack (per award page or site HTML) |
|---|---|---|---|---|
| 1 | Gielly Green (London, 2 salons + haircare line) | https://giellygreen.co.uk/ | Awwwards Honorable Mention, 28 Jan 2026, by Lovelace Studio | Shopify, Nuxt.js, Prismic |
| 2 | ALICE Hair & Art (Stockholm concept studio) | https://www.alicehairart.se/ | Awwwards Honorable Mention, 11 Feb 2025, by reyman | Framer; tagged "Single page", "Gallery" |
| 3 | Atelier Brzozowski (Gdańsk / Gdynia salons) | https://atelierbrzozowski.com/ | Awwwards Honorable Mention, 12 Sep 2024, by hiday studio | WordPress (generator meta) |
| 4 | Una (Auckland hair studio) | https://www.una-akl.com/ | Awwwards Honorable Mention, 14 Mar 2024, by Made-studio | Shopify; tagged "Horizontal Layout" |
| 5 | Il Colorista Salon (colour atelier, Isola della Scala, Italy) | https://ilcolorista.salon/ | Awwwards Honorable Mention, 29 Sep 2022, by studio zerotredici | GSAP, Webpack, Highway.js; tagged WebGL |
| 6 | Serenity Hair Salon Blaxland (Blue Mountains, Australia) | https://serenityhairblaxland.com.au/ | Awwwards Nominee, 1 Sep 2025, by hatchlingweb | WordPress + Elementor Pro |
| 7 | Hair Me Up (Kraków, 2 salons + academy + shop) | https://hairmeup.pl/ | Awwwards Nominee, 16 Apr 2024, by DotLineCode | WordPress + WooCommerce |
| 8 | Effectownia Hair Design (Warsaw) | https://effectownia.pl/ | CSS Nectar Site of the Day, 12 May 2025, by NETNAJEM | WordPress + Divi |

- Gielly Green: Honorable Mention dated Jan 28, 2026, creator Lovelace Studio, described as "A serene digital experience for Gielly Green, merging modern luxury with sensory minimalism"; technologies Shopify, Nuxt.js, Prismic — [Awwwards](https://www.awwwards.com/sites/gielly-green)
- ALICE Hair & Art: Honorable Mention dated Feb 11, 2025, creator reyman, made in Framer, tags include Minimal, Scrolling, Single page, Gallery — [Awwwards](https://www.awwwards.com/sites/alice-hair-art)
- Atelier Brzozowski: Honorable Mention dated Sep 12, 2024, creator hiday studio; brief was "to design a business card website for hair salons under the Atelier Brzozowski brand"; listed key elements are an about-salons-and-teams section, main dropdown navigation, a reservation/contact dropdown menu and a pricing page — [Awwwards](https://www.awwwards.com/sites/atelier-brzozowski)
- Una: Honorable Mention dated March 14, 2024, creator Made-studio, tags Fashion, Horizontal Layout, Shopify — [Awwwards](https://www.awwwards.com/sites/una-1)
- Il Colorista Salon: Honorable Mention dated Sep 29, 2022, creator studio zerotredici, tags Animation, Scrolling, Transitions, WebGL; tech GSAP, Webpack, Highway.js, Figma — [Awwwards](https://www.awwwards.com/sites/il-colorista-salon)
- Serenity Hair Salon Blaxland: listed as Nominee dated Sep 1, 2025, creator hatchlingweb; description stresses a muted palette drawn from the salon's hand-painted mural, easy booking and service info, service breakdowns, embedded Google map and local SEO; built with WordPress and Elementor Pro — [Awwwards](https://www.awwwards.com/sites/serenity-hair-salon-blaxland). A search-engine summary of the same page called it an "honorable mention"; the page itself says Nominee and the Awwwards "hair" listing shows no award badge for it, so treat it as Nominee only — [Awwwards hair search](https://www.awwwards.com/inspiration_search/hair/)
- Hair Me Up: Nominee dated Apr 16, 2024, creator DotLineCode, tags include E-Commerce, Clean, Minimal, Gallery, WooCommerce — [Awwwards](https://www.awwwards.com/sites/hair-me-up)
- Effectownia: CSS Nectar Site of the Day 12 May 2025, designer NETNAJEM, Poland; described as bold type, high-contrast imagery, full-screen hero, subtle animation/parallax, embedded booking, mobile-first — [CSS Nectar](https://cssnectar.com/css-gallery-inspiration/effectownia-fryzjer/)

"Widely cited as best-in-class" (listicle recognition, not juried awards), also torn down in section 2:

- Salon SCK (New York, https://www.salonsck.com/) is entry #1 and Spoke & Weal (10 US salons, https://spokeandweal.com/) is entry #24 in Colorlib's hair salon website roundup (page dated 15 Oct 2026). Colorlib describes SCK as "minimalist, high-end imagery, easy online booking, polished service menu" and Spoke & Weal as "minimalist black type on white, asymmetric layout, city location pages, bold service menu" — [Colorlib](https://colorlib.com/wp/hair-salon-websites-design/)
- Colorlib labels Salon SCK as a Squarespace site, but the live home page declares `generator: Gatsby 3.15.0` in its HTML, so the listicle's platform attribution is wrong or outdated — [Colorlib](https://colorlib.com/wp/hair-salon-websites-design/); contradicted by [salonsck.com](https://www.salonsck.com/)

Older or out-of-scope award entries found (not torn down; listed so the writer knows the full field):

- Awwwards Site of the Day winners in the hair category are all old: The Lounge, Helsinki salon (SOTD 23 Sep 2011); Sam McKnight, session stylist (SOTD 3 Mar 2012); Bundy Bundy, Vienna (SOTD 3 May 2016, score 7.94/10, by WILD, now only on the agency's archive subdomain bundy.madebywild.com). The only 2022+ SOTD in the "hair" results is CUEWIGS (1 Feb 2024), a custom wig product brand, not a salon — [Awwwards hair search](https://www.awwwards.com/inspiration_search/hair/), [Bundy Bundy on Awwwards](https://awwwards.com/sites/bundy-bundy)
- Other hair-related Awwwards Honorable Mentions on the first results page: Rendezvous Barbers (31 Jul 2024, barbers), Marco Ambrosi Salon (2 Jun 2021), Yukie Nail And Hearts Hair NY (27 Nov 2018), MABE Hair (20 Aug 2015), Westend Hair Salon (30 Dec 2011) — [Awwwards hair search](https://www.awwwards.com/inspiration_search/hair/)
- CSS Nectar also featured Luis Neto Hair Design (30 Aug 2020) and NOVA Capillaire (25 Dec 2024, hair restoration rather than a salon) — [CSS Nectar](https://cssnectar.com/css-gallery-inspiration/effectownia-fryzjer/) (dates from search results for cssnectar.com)
- One Page Love has small "hairdresser" (9 sites) and "hair stylist" (4 sites) tags; the only recent, relevant independent-stylist entry is Anett Weber (film/TV hair and make-up designer, https://anettweber.com/), featured 26 Jul 2024, praised as "straight to the point" with each service opening into an overlay; sections listed are just header navigation and a contact form; typeface Open Sans. Foundry Salon (hair/make-up collective one-pager) dates from 2016 — [One Page Love: Anett Weber](https://onepagelove.com/anett-weber), [One Page Love hair-stylist tag](https://onepagelove.com/tag/hair-stylist)

Benchmarks with no design-award recognition found (celebrity colorist / top-end salon sites included for structural comparison only): Jenna Perry Hair (https://www.jennaperryhair.com/), Suite Caroline (https://www.suitecaroline.com/), Larry King (https://larrykinghair.com/). These are labelled "benchmark" throughout.

### Inferences
- Hair salons rarely win top-tier web awards. The realistic "award level" for this category is an Awwwards Honorable Mention, and the HM winners are mostly small studio-built sites (Framer, Shopify, custom GSAP) rather than large agency productions.
- Three of the eight recognised sites are Polish (Atelier Brzozowski, Hair Me Up, Effectownia), which reflects active Polish agencies submitting salon work, not necessarily a regional design trend.
- Listicle recognition (Colorlib etc.) is much looser than juried recognition: Colorlib mis-states SCK's platform and mixes salons with product brands (Bellami, Drybar, Madison Reed), so listicles should be treated as "commonly cited", not as a quality signal.

### Gaps
- Only page 1 of 5 of the Awwwards "hair" search was read; later pages could hold more 2022 to 2026 salon entries.
- No hair salon entries were found on cssdesignawards.com, thefwa.com, Webby, siteinspire.com, godly.website, land-book.com or httpster.net. This is "not found via web search restricted to those domains", not proof that none exist; those galleries have poor search-engine exposure and I did not browse their internal category pages.
- Webflow's "Web design for hair salons: 10 examples" article could not be loaded (fetch error "Header overflow"), so its ten examples are not in these notes. Squarespace and Webflow showcase pages were not checked.
- anettweber.com returned HTTP 403 to the scripted fetch, so that site is described only from One Page Love's entry.

## 2. For each: what is the site architecture (single page vs multi page), the exact top navigation labels, and the ordered list of home page sections?

### Takeaway
Ten of the thirteen sites are small multi-page sites (roughly 4 to 15 real pages) with a short home page that acts as a hub; only ALICE Hair & Art is a true one-pager, and Atelier Brzozowski's home is a single-paragraph "business card". Navigation is typically 5 to 8 labels, and five of the thirteen hide the whole menu behind a "Menu" control so the header shows only a logo and a booking button.

### Cited Findings

#### 2.1 Una, Auckland (Awwwards HM 2024)
- Architecture: multi-page Shopify site; 8 internal pages linked from home (Home, About Us, Our Team, Services, Media, Appointments, Lookbook, Contact) plus Terms and Privacy — [una-akl.com](https://www.una-akl.com/)
- Header shows only two items: "Menu" and "Book an appointment". The overlay menu labels are: Home, About, Our Team, Services, Media and Awards, Appointments, Lookbook, Contact. The same overlay also carries salon hours, Instagram, email, phone, address, "View parking" and a newsletter signup — [una-akl.com](https://www.una-akl.com/)
- Home page order (my count: 6 content blocks; 7 `<section>` tags; 40 images, 1 video): (1) hero statement "There is no one quite like you. You are one. You are Una."; (2) studio philosophy plus founder bio (Kelly Manu, press names) with "More about us" link; (3) "Our services" intro and a list of 12 service category names with "View all"; (4) four image link tiles: Lookbook, Appointments, Our Team, Sustainability; (5) "Media & Awards" intro with "View all"; (6) sign-off marquee "Ka kite āno e hoa" and contact strip (Instagram, email, phone, address) — [una-akl.com](https://www.una-akl.com/)
- Home copy: 444 words (main), of which roughly 70 are the hidden overlay menu, hours and contact details; only two headings on the page ("Our services", "Media & Awards") — [una-akl.com](https://www.una-akl.com/)
- Booking: external link to Timely (bookings.gettimely.com); "Book an appointment" appears twice in the HTML (header and overlay), plus two text links to the internal Appointments page — [una-akl.com](https://www.una-akl.com/)
- Services page: 12 accordion categories, 2,232 words; the page says services are "priced based on the length and thickness of your hair, and the amount of time it will take" and recommends a complimentary consultation; the page text contains only one dollar figure — [Una services](https://www.una-akl.com/pages/services)
- Portfolio: a separate "Lookbook" page with 133 images and a "Filter by service" control (All, Highlights & Multi Technique, Corrective/Creative Colour, Lived In Colour, Balayage & Foilyage, Creative Colour, Tint Colour, Cut & Style, On Scalp Lightening); each image links to "view service" — [Una lookbook](https://www.una-akl.com/pages/lookbook)
- Policies: a separate "Appointments" page (821 words) covering Cancellation, Late Policy, Salon Etiquette and Parking, with a "Book an appointment" button — [Una appointments](https://www.una-akl.com/pages/appointments)

#### 2.2 Gielly Green, London (Awwwards HM Jan 2026)
- Architecture: multi-page hybrid of salon site and haircare shop (Shopify + Nuxt + Prismic); 31 internal paths linked from the home page, including two salon pages, /artists, /find-your-artist, /our-ethos, /faq/salon, /faq/haircare, /careers, /loyalty-program and nine product URLs — [giellygreen.co.uk](https://giellygreen.co.uk/)
- Header shows: Menu, "Book now", Sign in, Cart. The menu's inner labels are rendered by JavaScript and were not captured — [giellygreen.co.uk](https://giellygreen.co.uk/)
- Home page order (my count: about 13 blocks; 14 `<section>` tags; 50 images, no headings in static HTML): (1) hero "This is The One." with a 50-word brand paragraph; (2) seasonal promo (Christmas voucher, "Enjoy now"); (3) two salon tiles, "Marylebone, George Street" and "Four Seasons Hotel London at Tower Bridge", each "Discover"; (4) "The One System" shop tile; (5) "Curated for you" product carousel (8 products, each "Shop now"); (6) MMStudio residency tile; (7) The One Head Spa tile; (8) quiz tile "Find your match"; (9) loyalty programme tile; (10) "Our ethos"; (11) "Our artists"; (12) testimonial carousel (at least 7 quotes mixing product and salon reviews); (13) footer with link columns and a per-salon "Book an appointment" — [giellygreen.co.uk](https://giellygreen.co.uk/)
- Home copy: 482 words (main), of which most is product names and testimonials — [giellygreen.co.uk](https://giellygreen.co.uk/)
- Booking: header "Book now" opens an external booking portal at s-iq.co/BookingPortal with a salon picker; the footer has one "Book an appointment" link per salon that goes to that salon's page — [giellygreen.co.uk](https://giellygreen.co.uk/)
- Services and pricing: on each salon page; the Marylebone page (447 words) has a "Your Visit" section and a "Haircut & Finish" price block with pound figures (for example £98, £90, £56, £200) — [Gielly Green Marylebone](https://giellygreen.co.uk/salons/george-street-marylebone)
- FAQ: a dedicated salon FAQ page (545 words) with filter tabs General, Services, Stylists & Team, Products, Pricing & Payments, Accessibility & Extras — [Gielly Green salon FAQ](https://giellygreen.co.uk/faq/salon)

#### 2.3 ALICE Hair & Art, Stockholm (Awwwards HM Feb 2025)
- Architecture: effectively a single page plus one sub-page (/art for exhibitions); the sitemap lists 3 URLs. No `<nav>`, `<header>` or `<footer>` elements; a floating control offers "book", the three stylist names, Instagram, "menu" and "Info" — [alicehairart.se](https://www.alicehairart.se/)
- Home page order (my count: 6 blocks; 7 `<section>` tags): (1) hero statement "The seamless blend of hairdressing & art at Concept Studio in Stockholm"; (2) "Creative, Authentic & Soulful" paragraph (about 40 words); (3) team intro "A handpicked team of independent, skilled stylists" with links "see our stylists" and "book our stylists"; (4) three stylist cards (Sara Alice, Victoria, Lottis), each with Instagram handle, a 25 to 30 word bio and a "Book ↗" link; (5) "current exhibition" teaser with "see all" to /art; (6) contact form plus email and address (Regeringsgatan 87) and site credit — [alicehairart.se](https://www.alicehairart.se/)
- Home copy: 481 words in the raw HTML, but every text block is repeated two or three times for different breakpoints (Framer), so the unique copy is well under half of that (inferred: roughly 170 to 220 words). 136 `<img>` and 26 `<video>` elements, also inflated by breakpoint duplication — [alicehairart.se](https://www.alicehairart.se/)
- Booking: no site-wide booking engine. Each independent stylist's "Book" goes to her own external profile: Timma for Sara Alice, Bokadirekt for Victoria and for Lottis — [alicehairart.se](https://www.alicehairart.se/)
- Services and pricing: none found anywhere in the site's static HTML; no service list or prices on the home page or /art — [alicehairart.se](https://www.alicehairart.se/)
- The /art page (337 words) lists previous exhibitions and artists — [ALICE art page](https://www.alicehairart.se/art)

#### 2.4 Il Colorista Salon, Italy (Awwwards HM Sep 2022)
- Architecture: multi-page custom build with page transitions; nav labels: home, servizi, metodo viso sartoriale (with sub-link "vai al form"), news, contatti. 17 internal paths linked from home, 9 of them news articles — [ilcolorista.salon](https://ilcolorista.salon/)
- Home page order (my count: 6 blocks; 1 `<section>` tag; 20 images): (1) H1 "Atelier a Isola della Scala" with a 30-word first-person statement ending "Ogni donna ha il suo colore"; (2) "da qui nasce metodo viso sartoriale" with links "cos'è" and "vai al form"; (3) scrolling services ticker "Consulenza, colore, balayage, tonalizzazione e ricostruzione"; (4) "il nostro staff" with two people (Michele, Lilia) and role titles; (5) news carousel of 9 posts, each "Leggi"; (6) magazine PDF download, newsletter prompt and footer contacts — [ilcolorista.salon](https://ilcolorista.salon/)
- Home copy: 135 words (main) — [ilcolorista.salon](https://ilcolorista.salon/)
- Booking: no "book" call to action anywhere on the home page. Contact routes are a WhatsApp link, phone, email, and a consultation form on the "metodo viso sartoriale" page — [ilcolorista.salon](https://ilcolorista.salon/)
- Services and pricing: separate "servizi" page titled "Menu primavera - estate 2026" (230 words) listing named colour packages with all-in prices, for example "Biondo Berlino ... Euro 169", "Biondo Londra ... Euro 159" — [Il Colorista servizi](https://ilcolorista.salon/servizi)

#### 2.5 Atelier Brzozowski, Gdańsk / Gdynia (Awwwards HM Sep 2024)
- Architecture: 4-page WordPress "business card" site (home, O marce, Salony, Cennik). Nav labels: O marce (About the brand), Salony (Salons), Styliści (Stylists, dropdown Gdynia / Gdańsk), Cennik (Price list), Kontakt (dropdown Gdynia / Gdańsk), "Nasze produkty / Sklep" (external shop), Facebook, Instagram — [atelierbrzozowski.com](https://atelierbrzozowski.com/)
- Home page: a single brand paragraph of 51 words and 5 images; no headings and no `<section>` tags in the static HTML — [atelierbrzozowski.com](https://atelierbrzozowski.com/)
- Booking: a reservation dropdown inside the navigation with "Zarezerwuj online" (Book online) linking to a separate Booksy profile for each salon, plus each salon's phone number — [atelierbrzozowski.com](https://atelierbrzozowski.com/)
- Awwwards lists the site's key elements as the about-salons-and-teams section, main dropdown navigation, reservation/contact dropdown and pricing page — [Awwwards](https://www.awwwards.com/sites/atelier-brzozowski)

#### 2.6 Serenity Hair Salon Blaxland, Australia (Awwwards Nominee Sep 2025)
- Architecture: 7-page WordPress/Elementor site (page sitemap lists 7 URLs). Nav labels: Home, About (dropdown: About Us, Our Team), Our Services, Our Products, Gallery, Contact Us — [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)
- Home page order (my count: 9 blocks; 10 images): (1) hero "Hey & welcome! Step inside a space of warmth & tranquility" with a location sentence and "Book An Appointment"; (2) three link tiles: "View Our Team", "View Our Services", "See Our Gallery"; (3) "Voted Best Hair Salon in the Lower Blue Mountains" with an about paragraph; (4) four service blurbs: Colouring, Cutting, Styling, Treatments; (5) "Looking for a fresh new look or colour?" with "Book A Stylist"; (6) hair-extensions block with "Book In Now"; (7) testimonial carousel (4 or more long reviews); (8) "Follow Us On Instagram" feed; (9) footer with "Book Online", "Our Services" and phone — [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)
- Home copy: 744 words (main), a large share of it testimonials — [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)
- Booking: external Client Diary booking pages (book.clientdiary.com and booking.clientdiary.com); five booking links on the home page under four different labels ("Book An Appointment", "Book A Stylist", "Book In Now", "Book Online" twice) — [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)
- Services and pricing: separate "Our Services" page (703 words) with a "Price Guide" split by stylist level (Emerging Stylist, Senior Stylist, Director) and flat prices, for example "Ladies Haircut - $44", "Balayage Package - $195" — [Serenity services](https://serenityhairblaxland.com.au/our-services/)
- Portfolio: separate "Gallery" page that also repeats testimonials and the Instagram feed; only 4 images are present in static HTML — [Serenity gallery](https://serenityhairblaxland.com.au/gallery/)

#### 2.7 Hair Me Up, Kraków (Awwwards Nominee Apr 2024)
- Architecture: multi-page WordPress/WooCommerce site combining salon, academy and shop (page sitemap lists 15 URLs). Nav labels: Poznaj nas (About us), Cennik (Price list), Blog, Akademia (Academy), Sklep (Shop), Skontaktuj się (Contact), plus a separate "Umów wizytę" (Book a visit) button — [hairmeup.pl](https://hairmeup.pl/)
- Home page order (my count: 10 blocks; 8 `<section>` tags; 21 images): (1) hero "Witamy w Hair Me Up" with "Rozpocznij przygodę"; (2) about blurb with "Poznaj nasz zespół" (Meet our team); (3) "Najpopularniejsze usługi" numbered 01 to 04 (cut, styling, colour, care) with "Zobacz cennik" (See price list); (4) shop banner (official Olaplex ambassador) with "Przejdź do sklepu"; (5) promoted product with price; (6) Academy intro; (7) list of 9 courses; (8) blog teaser; (9) brand logos; (10) two per-location booking buttons ("Umów wizytę na Grodzkiej", "Umów wizytę na Basztowej") and newsletter — [hairmeup.pl](https://hairmeup.pl/)
- Home copy: 321 words (main) — [hairmeup.pl](https://hairmeup.pl/)
- Booking: header "Umów wizytę" links to Booksy; the two location buttons at the bottom link to saloner.pl profiles — [hairmeup.pl](https://hairmeup.pl/)
- Services and pricing: separate "Cennik" page (1,308 words, about 200 price figures) with four price tiers per service by stylist level (junior stylist / stylist / senior stylist / educator), for example women's cut "160 zł / 200 zł / 250 zł / 280 zł"; salon rules sit on a separate "Regulamin salonu" page — [Hair Me Up cennik](https://hairmeup.pl/cennik/)

#### 2.8 Effectownia Hair Design, Warsaw (CSS Nectar SOTD May 2025)
- Architecture: long home page plus about 14 sub-pages (page sitemap lists 14 URLs), including one page per stylist and one landing page per service category. Nav labels: Usługi (Services, anchor on home), Zespół (Team, anchor), Realizacje (Work, separate page), Cennik (Price list, anchor), Kontakt (separate page), "Umów wizytę" (Book) — [effectownia.pl](https://effectownia.pl/)
- Home page order (my count: 10 blocks; 9 `<section>` tags; 19 images): (1) H1 hero "Effectownia — salon fryzjerski na Mokotowie" with two buttons, "Umów wizytę" and "Poznaj zespół"; (2) "Dobra fryzura zaczyna się od zrozumienia" positioning paragraph; (3) six numbered service cards, each with a link to its own page; (4) "Poznaj nasz zespół": nine stylist cards, each with a specialty line, short bio, profile link and three recent dated five-star reviews credited "Źródło: Booksy"; (5) latest Instagram posts; (6) quality statement; (7) location block "Twój salon przy Narbutta 83/U7"; (8) prompt for existing clients to leave feedback; (9) "Przed pierwszą wizytą" (Before your first visit); (10) "Wybierz swoją wizytę" (Choose your visit) pricing/booking block — [effectownia.pl](https://effectownia.pl/)
- Home copy: 1,493 words (main), the longest of the recognised set — [effectownia.pl](https://effectownia.pl/)
- Booking: every booking link goes to the salon's Booksy page; "Umów wizytę" appears 4 times (header, hero, lower page, footer), plus "Sprawdź usługi w Booksy", "Rezerwacje w Booksy" and 18 review-source links to the same Booksy page — [effectownia.pl](https://effectownia.pl/)
- Portfolio: separate "Realizacje" page with two filters (by stylist, by service: cut, colour, styling, care); items are Instagram posts, and the page states videos play only on click — [Effectownia realizacje](https://effectownia.pl/realizacje/)
- Caution: the gallery feature dates from May 2025 and the live copy includes reviews dated October 2026, so the page observed may differ from the version CSS Nectar featured — [CSS Nectar](https://cssnectar.com/css-gallery-inspiration/effectownia-fryzjer/)

#### 2.9 Spoke & Weal, 10 US salons (cited by Colorlib)
- Architecture: multi-page custom site; sitemap lists 24 URLs. The header contains only the logo and one button, "Schedule Now / Book"; all other navigation lives in the footer: Services, Portfolio, About, Founders, Press, Education, Careers, FAQ, All Locations, Privacy, Accessibility — [spokeandweal.com](https://spokeandweal.com/)
- Home page order (my count: 9 blocks; 10 `<section>` tags; 15 images, 2 videos): (1) hero H1 "A full service hair salon." with five service tags, buttons "Schedule Online" and "See the Menu", Instagram link and a scrolling list of the ten locations; (2) mission statement with three stats (10 salons, 9 cities, K18 repair in every service); (3) "Ten Commitments" numbered values list; (4) founder block (Christine Thompson) with "Meet Our Founders"; (5) "What we do best." five services each showing a price range (for example Haircut $81 to $321, Custom Color $161 to $642, Extensions "By Consultation") and a "Book" link; (6) "In the press." one feature; (7) Instagram block "Your feed could use better hair."; (8) "Book your chair." closing block with "Schedule Online", "All 10 Locations", flagship address and hours; (9) footer — [spokeandweal.com](https://spokeandweal.com/)
- Home copy: 698 words (main) — [spokeandweal.com](https://spokeandweal.com/)
- Booking: all booking links are the in-page anchor #book-now, which opens an on-site booking overlay (the HTML references Boulevard); "Schedule Online" appears 3 times and the header "Book" once, and each of the five service rows is itself a booking link — [spokeandweal.com](https://spokeandweal.com/)
- Services page (332 words): five numbered categories, each with a description, tier names (Designer, Master, Director, Community Cut), price ranges and its own "Book" button — [Spoke & Weal services](https://spokeandweal.com/services)
- Portfolio page (110 words, 16 images): "Lookbook — The work, up close", images captioned by category and city (Editorial, Texture, Color, Cut), followed by an Instagram prompt and a schedule block that states the card-on-file and 24-hour cancellation rules — [Spoke & Weal portfolio](https://spokeandweal.com/portfolio)
- FAQ page (667 words): cancellation policy, why prices differ between team members, "community pricing" — [Spoke & Weal FAQ](https://spokeandweal.com/faq)

#### 2.10 Salon SCK, New York (cited by Colorlib)
- Architecture: multi-page Gatsby site with deep sub-pages: 7 individual service pages and 10 individual stylist pages are linked from home (27 internal paths in total). Nav labels: Home, Services, About (dropdown: About Us, Bridal, Policy, Blog), Team (dropdown: Meet Our Team, Careers), Contact, Shop (dropdown: Gift Card, Buy Now), "Book Now" — [salonsck.com](https://www.salonsck.com/)
- Home page order (my count: 8 blocks; 7 `<section>` tags; 28 images): (1) hero H1 "Salon SCK — Luxury Hair Salon located on Fifth Avenue" with "Book Now"; (2) "Our Services": seven categories (Cut & Styling, Color, Conditioning Hair Treatments, Makeup, Bridal, Perms & Relaxer, Nails), each with a paragraph of about 50 words, then "Discover More"; (3) "About Us — Crafted Beauty, Centered Around You" with "Learn More"; (4) "Notes from Our Clients" long reviews with star ratings; (5) "Our Team — Personalized Hair, Elevated Experience"; (6) "Our Location — The Art of New York Beauty"; (7) "Brands We Carry"; (8) footer — [salonsck.com](https://www.salonsck.com/)
- Home copy: 1,496 words (main), keyword-rich paragraphs — [salonsck.com](https://www.salonsck.com/)
- Booking: "Book Now" appears 9 times in the HTML, linking to an external Meevo online-booking portal; gift cards also go to Meevo — [salonsck.com](https://www.salonsck.com/)
- Services and pricing: separate services page (1,983 words, 64 images) with dollar prices (for example $67.00, $150.00, $165.00, $200.00), plus one page per service category — [Salon SCK services](https://www.salonsck.com/services/)

#### 2.11 Jenna Perry Hair, New York (benchmark, no award found)
- Architecture: 9-page Wix site. Nav labels: HOME, MENU, ABOUT, POLICIES, JENNA'S, BOOK. Other pages linked: Team, Locations, Press — [jennaperryhair.com](https://www.jennaperryhair.com/)
- Home page order (4 `<section>` tags, 10 images): (1) full-bleed image with "BOOK NOW"; (2) "MEET THE TEAM" row of five named stylists with "VIEW ALL". That is the whole page: 23 words of body copy — [jennaperryhair.com](https://www.jennaperryhair.com/)
- Booking: "BOOK" in the nav and "BOOK NOW" on the page both point to the anchor #book-now, an on-site booking overlay (the HTML references Boulevard) — [jennaperryhair.com](https://www.jennaperryhair.com/)
- Services and pricing: "MENU" page (453 words) with two groups, Hair Color and Cuts / Styling; each service has a one or two sentence description and a price range (for example Gloss $150 to $250, Single Process $175 to $325) and a "BOOK NOW" button at the top — [Jenna Perry menu](https://www.jennaperryhair.com/menu)
- Policies: dedicated page (1,155 words) with sections Cancellations, Service Guarantee, Refunds/Returns/Payment, Keratin Treatments & Extensions — [Jenna Perry policies](https://www.jennaperryhair.com/policies)

#### 2.12 Suite Caroline, New York (benchmark, no award found)
- Architecture: Shopify site, about 8 content pages plus a small product collection. Nav labels: Book Service, Menu, Team, Press, About, FAQ, Sustainability, Account (plus Cart) — [suitecaroline.com](https://www.suitecaroline.com/)
- Home page order (my count: 4 blocks; 8 `<section>` tags; 18 images): (1) hero "Beauty Made With Intention" with "Book Your Look"; (2) "Featured collection" of three products; (3) five captioned portfolio slides naming celebrity colour work (for example "Platinum For Sabrina", "Michelle Williams Pink"); (4) footer with menu, social, contact and newsletter. 143 words (main) — [suitecaroline.com](https://www.suitecaroline.com/)
- Booking: "Book Service" appears 3 times, pointing to the anchor #book-now (on-site overlay; the HTML references Boulevard) — [suitecaroline.com](https://www.suitecaroline.com/)
- Services and pricing: "Menu" page headed "Services & Pricing — Prices vary by stylist", grouped into Hair Color, Cutting & Styling Services, Wig Atelier, Treatments and Add-on services as collapsible groups — [Suite Caroline menu](https://suitecaroline.com/pages/menu)
- The FAQ page holds the cancellation policy (24 hours' notice or a 50% fee; 50% deposit for 3+ hour transformation services) — [Suite Caroline FAQ](https://suitecaroline.com/pages/faq)

#### 2.13 Larry King, London (benchmark, no award found)
- Architecture: large Shopify site that is half salon, half product shop. Top-level nav: Salons (sub-items: Book an Appointment, Buy a Salon Voucher, four locations, Meet the Team, Colour Services, Styling Services, Treatments & Add Ons) and Shop (product categories by type and by hair concern) — [larrykinghair.com](https://larrykinghair.com/)
- Home page order (my count: 9 blocks; 33 images, 1 video): (1) split hero with two equal choices, "Book an appointment" (Salon) and "Shop the range" (Shop); (2) salons paragraph with "Book an appointment" and four location links; (3) press quote ("The Best London Hair Salons", Harper's Bazaar); (4) "Meet Larry"; (5) three longer press quotes; (6) Instagram; (7) newsletter with 10% offer; (8) new product; (9) blog teasers. 564 words (main) — [larrykinghair.com](https://larrykinghair.com/)
- Booking: "Book an appointment" appears about 7 times and resolves to the #onlinebookings anchor on the Salons page, where the visitor picks a location — [Larry King salons](https://larrykinghair.com/pages/salons)
- Services and pricing: separate pages per service family; the Colour Services page (1,511 words) describes each technique in prose with a handful of "from" prices in pounds — [Larry King colour services](https://larrykinghair.com/pages/colour-and-styling)

### Inferences
- The recognised small-studio sites (Una, ALICE, Il Colorista, Atelier Brzozowski) and the celebrity-colorist benchmarks (Jenna Perry, Suite Caroline) share one architecture: a very short image-led home page, with a services/"menu" page, a team page and a policies or appointments page behind it.
- Sites built or rewritten for local search (Effectownia, Salon SCK, Serenity) have the opposite shape: long home pages, many keyword landing pages, per-stylist and per-service URLs.
- "Menu" is used in two senses and both are common: as the label for the hidden navigation (Una, Gielly Green, ALICE) and as the label for the price list (Jenna Perry, Suite Caroline, Spoke & Weal's "See the Menu").

### Gaps
- Page counts are counts of internal URLs linked from the home page or listed in the sitemap, not full crawls; real totals may be slightly higher.
- Gielly Green's menu labels and any JS-rendered sections were not captured. Salon SCK's and Il Colorista's sitemaps returned no URLs.
- Home-page section order is read from static HTML source order; for animated or horizontally scrolling sites (Una is tagged "Horizontal Layout", Il Colorista "WebGL") the visual sequence could differ.

## 3. How many distinct sections does a typical award-level salon home page have, and how many words of copy?

### Takeaway
A typical recognised salon home page has about 6 to 10 content blocks and roughly 300 to 750 words of static text, with a median near 480 words across the ten recognised sites; the most design-led ones go far lower (Atelier Brzozowski 51 words, Il Colorista 135) and the SEO-led ones far higher (Effectownia 1,493, Salon SCK 1,496).

### Cited Findings

| Site | Recognition | Content blocks (my count) | `<section>` tags | Words (main) | Images / videos in HTML |
|---|---|---|---|---|---|
| Atelier Brzozowski | Awwwards HM 2024 | 1 | 0 | 51 | 5 / 0 |
| Il Colorista | Awwwards HM 2022 | 6 | 1 | 135 | 20 / 0 |
| Hair Me Up | Awwwards Nominee 2024 | 10 | 8 | 321 | 21 / 0 |
| Una | Awwwards HM 2024 | 6 | 7 | 444 (about 370 excluding overlay menu) | 40 / 1 |
| ALICE Hair & Art | Awwwards HM 2025 | 6 | 7 | 481 raw (duplicated; unique text far lower) | 136 / 26 (duplicated) |
| Gielly Green | Awwwards HM 2026 | 13 | 14 | 482 | 50 / 0 |
| Spoke & Weal | Colorlib list | 9 | 10 | 698 | 15 / 2 |
| Serenity Hair | Awwwards Nominee 2025 | 9 | 0 | 744 | 10 / 0 |
| Effectownia | CSS Nectar SOTD 2025 | 10 | 9 | 1,493 | 19 / 0 |
| Salon SCK | Colorlib list | 8 | 7 | 1,496 | 28 / 0 |
| Jenna Perry (benchmark) | none found | 2 | 4 | 23 | 10 / 0 |
| Suite Caroline (benchmark) | none found | 4 | 8 | 143 | 18 / 0 |
| Larry King (benchmark) | none found | 9 | 0 | 564 | 33 / 1 |

Sources for the table rows, in order: [atelierbrzozowski.com](https://atelierbrzozowski.com/), [ilcolorista.salon](https://ilcolorista.salon/), [hairmeup.pl](https://hairmeup.pl/), [una-akl.com](https://www.una-akl.com/), [alicehairart.se](https://www.alicehairart.se/), [giellygreen.co.uk](https://giellygreen.co.uk/), [spokeandweal.com](https://spokeandweal.com/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [effectownia.pl](https://effectownia.pl/), [salonsck.com](https://www.salonsck.com/), [jennaperryhair.com](https://www.jennaperryhair.com/), [suitecaroline.com](https://www.suitecaroline.com/), [larrykinghair.com](https://larrykinghair.com/)

- Ordered word counts for the ten recognised sites are 51, 135, 321, 444, 481, 482, 698, 744, 1,493, 1,496, giving a median of about 482 (my calculation from the table above).
- The five Awwwards Honorable Mention sites average about 319 words on the home page and none exceeds 482; the two sites above 1,400 words are the CSS Nectar and listicle picks, not Awwwards winners (my calculation from the table above).
- Heading use is sparse on the design-led sites: Una's home has two headings, Gielly Green and ALICE have none in static HTML, Jenna Perry has one ("Meet the team") — [una-akl.com](https://www.una-akl.com/), [giellygreen.co.uk](https://giellygreen.co.uk/), [alicehairart.se](https://www.alicehairart.se/), [jennaperryhair.com](https://www.jennaperryhair.com/)
- Where the copy goes on the short pages: one positioning statement of 10 to 50 words, a founder/about paragraph, service category names without descriptions (Una lists 12 names, Il Colorista runs one ticker line), and labels on link tiles — [una-akl.com](https://www.una-akl.com/), [ilcolorista.salon](https://ilcolorista.salon/)
- Where the copy goes on the long pages: per-service paragraphs of about 50 words each (Salon SCK, seven of them), per-stylist bios with embedded reviews (Effectownia, nine stylists with three reviews each) and long testimonials (Serenity) — [salonsck.com](https://www.salonsck.com/), [effectownia.pl](https://effectownia.pl/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)

### Inferences
- Stripping testimonials, hidden menus and breakpoint duplicates, the "authored" home-page copy on the Awwwards HM sites is roughly 50 to 300 words. A sensible working target for an award-style stylist home page is 150 to 300 words across 6 to 8 blocks.
- Word count tracks intent, not quality tier: the juried-award sites are short and image-led, the commercially tuned sites are long. A single-stylist site does not need the long form unless local SEO is the main goal.

### Gaps
- Counts are from static HTML. ALICE's true unique word count and image count were not measured exactly, and Gielly Green's JS-rendered content may add text.
- No pixel heights or scroll lengths were measured, so "how long the page is" is expressed only in blocks and words.

## 4. What do they leave OFF the home page and push to sub-pages (services, pricing, FAQ, policies, team, reviews, aftercare)?

### Takeaway
Prices, full service descriptions, policies and FAQs are kept off the home page on almost every site: 12 of 13 show no service prices on the home page (Spoke & Weal is the exception, showing price ranges; Hair Me Up and Gielly Green show only product or voucher prices), and cancellation rules always live on a dedicated Appointments, Policies or FAQ page. The full portfolio is also usually a separate Lookbook/Gallery page, with the home page carrying only a teaser.

### Cited Findings
- Pricing lives on a dedicated page on every site that publishes prices: "Our Services / Price Guide" (Serenity), "Cennik" (Hair Me Up, Atelier Brzozowski), "servizi" seasonal menu (Il Colorista), "Menu" (Jenna Perry, Suite Caroline), "Services" (Spoke & Weal, Salon SCK), per-salon pages (Gielly Green), per-service-family pages (Larry King) — [Serenity services](https://serenityhairblaxland.com.au/our-services/), [Hair Me Up cennik](https://hairmeup.pl/cennik/), [Il Colorista servizi](https://ilcolorista.salon/servizi), [Jenna Perry menu](https://www.jennaperryhair.com/menu), [Suite Caroline menu](https://suitecaroline.com/pages/menu), [Spoke & Weal services](https://spokeandweal.com/services), [Salon SCK services](https://www.salonsck.com/services/), [Gielly Green Marylebone](https://giellygreen.co.uk/salons/george-street-marylebone), [Larry King colour services](https://larrykinghair.com/pages/colour-and-styling)
- Three pricing formats recur on those pages: (a) tiers by stylist seniority, with one price per level (Serenity's Emerging / Senior / Director; Hair Me Up's four levels); (b) price ranges with a note that price varies by stylist (Jenna Perry's "$150 - $250"; Spoke & Weal's "$81 – $321"; Suite Caroline's "Prices vary by stylist"); (c) fixed all-inclusive packages with evocative names (Il Colorista's "Biondo Berlino ... Euro 169") — [Serenity services](https://serenityhairblaxland.com.au/our-services/), [Hair Me Up cennik](https://hairmeup.pl/cennik/), [Jenna Perry menu](https://www.jennaperryhair.com/menu), [Spoke & Weal services](https://spokeandweal.com/services), [Suite Caroline menu](https://suitecaroline.com/pages/menu), [Il Colorista servizi](https://ilcolorista.salon/servizi)
- Two recognised sites avoid publishing a conventional price list: Una explains that pricing depends on hair length, thickness and time and steers to a complimentary consultation (one dollar figure on a 2,232-word services page), and ALICE Hair & Art has no services or prices on the site at all, leaving them to each stylist's external booking profile — [Una services](https://www.una-akl.com/pages/services), [alicehairart.se](https://www.alicehairart.se/)
- The only home page that shows prices is Spoke & Weal, which lists five services with price ranges and a per-row booking link — [spokeandweal.com](https://spokeandweal.com/)
- Policies (cancellation, lateness, deposits) are always off the home page: Una's "Appointments" page (Cancellation, Late Policy, Salon Etiquette, Parking), Jenna Perry's "Policies" page (1,155 words), Suite Caroline's "FAQ" page, Spoke & Weal's "FAQ", Salon SCK's "Policy" page under About, Hair Me Up's "Regulamin salonu" in the footer — [Una appointments](https://www.una-akl.com/pages/appointments), [Jenna Perry policies](https://www.jennaperryhair.com/policies), [Suite Caroline FAQ](https://suitecaroline.com/pages/faq), [Spoke & Weal FAQ](https://spokeandweal.com/faq), [salonsck.com](https://www.salonsck.com/), [hairmeup.pl](https://hairmeup.pl/)
- FAQ exists as its own page on 4 of 13 sites (Gielly Green, Spoke & Weal, Suite Caroline, and Larry King at /pages/faq, linked from its home page but not opened) and appears on no home page; Effectownia instead has a short "Przed pierwszą wizytą" (Before your first visit) block near the bottom of the home page — [Gielly Green salon FAQ](https://giellygreen.co.uk/faq/salon), [Spoke & Weal FAQ](https://spokeandweal.com/faq), [Suite Caroline FAQ](https://suitecaroline.com/pages/faq), [effectownia.pl](https://effectownia.pl/)
- Team: the home page shows at most a teaser. Jenna Perry shows five names with "View all"; Il Colorista shows two people; Una and Serenity show only a link tile to a team page; Gielly Green links to "Our artists". The exceptions are ALICE (three full stylist cards, because the team is the booking route) and Effectownia (nine full stylist cards) — [jennaperryhair.com](https://www.jennaperryhair.com/), [ilcolorista.salon](https://ilcolorista.salon/), [una-akl.com](https://www.una-akl.com/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [alicehairart.se](https://www.alicehairart.se/), [effectownia.pl](https://effectownia.pl/)
- Portfolio: a separate page on Una (Lookbook, 133 images, filter by service), Effectownia (Realizacje, filter by stylist and by service, Instagram-sourced), Spoke & Weal (Portfolio/Lookbook, 16 captioned images) and Serenity (Gallery). On the home page the portfolio is reduced to a link tile (Una, Serenity), an Instagram block (Spoke & Weal, Effectownia, Serenity, Larry King) or a handful of captioned hero slides (Suite Caroline's five celebrity looks) — [Una lookbook](https://www.una-akl.com/pages/lookbook), [Effectownia realizacje](https://effectownia.pl/realizacje/), [Spoke & Weal portfolio](https://spokeandweal.com/portfolio), [Serenity gallery](https://serenityhairblaxland.com.au/gallery/), [suitecaroline.com](https://www.suitecaroline.com/)
- Reviews are absent from the home pages of Una, ALICE, Il Colorista, Atelier Brzozowski, Jenna Perry, Suite Caroline and Spoke & Weal; these use press and awards instead (Una's "Media & Awards", Spoke & Weal's "In the press", Suite Caroline's Press page, Larry King's press quotes). Client testimonials appear on the home pages of Gielly Green, Serenity, Salon SCK and Effectownia — [una-akl.com](https://www.una-akl.com/), [spokeandweal.com](https://spokeandweal.com/), [suitecaroline.com](https://www.suitecaroline.com/), [larrykinghair.com](https://larrykinghair.com/), [giellygreen.co.uk](https://giellygreen.co.uk/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [salonsck.com](https://www.salonsck.com/), [effectownia.pl](https://effectownia.pl/)
- Long-form content (blog, news, education, careers, sustainability, press archive) is always a sub-page linked from the menu or footer: Il Colorista's news, Hair Me Up's blog and academy, Spoke & Weal's Education/Careers/Press, Suite Caroline's Sustainability, Larry King's blog — [ilcolorista.salon](https://ilcolorista.salon/), [hairmeup.pl](https://hairmeup.pl/), [spokeandweal.com](https://spokeandweal.com/), [suitecaroline.com](https://www.suitecaroline.com/), [larrykinghair.com](https://larrykinghair.com/)

### Inferences
- The higher the positioning, the less the home page explains. Top-end sites assume the visitor already knows the name (from Instagram or press) and treat the home page as a mood piece plus a booking door; detail is one click away for those who want it.
- Press and awards substitute for client reviews at the top end; client reviews are a mid-market and local-SEO device.
- A "Menu" page with service name, one-sentence description and a price range, plus a separate "Policies"/"Appointments" page, is the standard two-page back end behind a minimal home page.

### Gaps
- No site in the sample has a dedicated aftercare page that I could find from home-page links; aftercare content, if present, is inside blog posts or FAQ answers. I did not open every sub-page to confirm.
- Suite Caroline's prices sit inside collapsed elements and were not captured as text, so I cannot confirm their format beyond the "Prices vary by stylist" line.
- Sub-pages for Atelier Brzozowski (Cennik, Salony) and the team pages of most sites were not fetched.

## 5. How is the primary call to action handled (single repeated CTA, sticky button, booking widget, external booking link)?

### Takeaway
The dominant pattern is one booking action placed in the header and repeated a few times with the same label, handing off to a third-party booking system; none of the 13 sites runs its own booking form. The top-end US sites open the booking system as an on-page overlay (anchor "#book-now"), while the award-recognised European and Australasian sites link out to an external booking page, in several cases one link per location or per stylist.

### Cited Findings

| Site | Primary CTA label(s) | Times in home HTML | Placement | Booking mechanism |
|---|---|---|---|---|
| Una | "Book an appointment" | 2 | header + overlay menu | external link to Timely |
| Gielly Green | "Book now"; "Book an appointment" | 1 + 2 | header; footer per salon | external SalonIQ portal (s-iq.co) with salon picker |
| ALICE Hair & Art | "Book ↗"; floating "book" | 1 per stylist card + floating menu | stylist cards; floating control | external profile per stylist (Timma, Bokadirekt) |
| Il Colorista | none ("vai al form") | 0 | n/a | WhatsApp, phone, consultation form on a sub-page |
| Atelier Brzozowski | "Zarezerwuj online" | 2 (one per salon) | dropdown inside nav | external Booksy profile per salon + phone |
| Serenity | "Book An Appointment", "Book A Stylist", "Book In Now", "Book Online" | 5 | hero, two mid-page blocks, footer | external Client Diary |
| Hair Me Up | "Umów wizytę" (+ two per-location variants) | 3 | header; bottom of page per location | external Booksy / saloner.pl |
| Effectownia | "Umów wizytę" | 4 (+ 3 other Booksy links, + 18 review-source links) | header nav, hero, lower page, footer | external Booksy |
| Spoke & Weal | "Schedule Online"; header "Book" | 3 + 1 (+ 10 service-row links) | header, hero, closing block; each service row | on-page overlay via #book-now (Boulevard) |
| Salon SCK | "Book Now" | 9 | header/menu variants, hero, sections, footer | external Meevo portal |
| Jenna Perry (benchmark) | "BOOK" / "BOOK NOW" | 2 | nav item; hero | on-page overlay via #book-now (Boulevard) |
| Suite Caroline (benchmark) | "Book Service" / "Book Your Look" | 3 + 1 | first nav item; hero | on-page overlay via #book-now (Boulevard) |
| Larry King (benchmark) | "Book an appointment" | about 7 | nav, split hero, salons block | anchor to location picker on Salons page |

Sources for the table rows, in order: [una-akl.com](https://www.una-akl.com/), [giellygreen.co.uk](https://giellygreen.co.uk/), [alicehairart.se](https://www.alicehairart.se/), [ilcolorista.salon](https://ilcolorista.salon/), [atelierbrzozowski.com](https://atelierbrzozowski.com/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [hairmeup.pl](https://hairmeup.pl/), [effectownia.pl](https://effectownia.pl/), [spokeandweal.com](https://spokeandweal.com/), [salonsck.com](https://www.salonsck.com/), [jennaperryhair.com](https://www.jennaperryhair.com/), [suitecaroline.com](https://www.suitecaroline.com/), [larrykinghair.com](https://larrykinghair.com/)

- Counts include duplicates for mobile and desktop markup, so on-screen repetition is usually lower than the HTML count (for example Salon SCK's nine "Book Now" instances include three copies of its menu) — [salonsck.com](https://www.salonsck.com/)
- A booking control sits in the header or top navigation on 11 of 13 sites; the exceptions are ALICE (floating control, no header element) and Il Colorista (no booking CTA) — [alicehairart.se](https://www.alicehairart.se/), [ilcolorista.salon](https://ilcolorista.salon/)
- Four sites reduce the visible header to logo plus booking button and hide or relocate everything else: Una ("Menu" + "Book an appointment"), Gielly Green ("Menu" + "Book now" + account/cart), Spoke & Weal (logo + "Book" only; navigation in the footer), ALICE (floating "book" + "menu") — [una-akl.com](https://www.una-akl.com/), [giellygreen.co.uk](https://giellygreen.co.uk/), [spokeandweal.com](https://spokeandweal.com/), [alicehairart.se](https://www.alicehairart.se/)
- Suite Caroline makes "Book Service" the first item in its navigation, ahead of Menu, Team, Press, About, FAQ — [suitecaroline.com](https://www.suitecaroline.com/)
- Secondary CTAs are few and consistent: a link to the price list ("See the Menu", "Zobacz cennik", "View all" services), a team link ("Poznaj zespół", "Meet the team") and, on hybrid sites, "Shop now". Effectownia and Spoke & Weal both pair exactly two hero buttons: book + one secondary (team or menu) — [effectownia.pl](https://effectownia.pl/), [spokeandweal.com](https://spokeandweal.com/), [hairmeup.pl](https://hairmeup.pl/)
- Booking systems seen: Timely, SalonIQ, Timma, Bokadirekt, Booksy (three Polish sites), Client Diary, Boulevard (three US sites), Meevo, Phorest for vouchers (Larry King) — per the individual site sources above, for example [una-akl.com](https://www.una-akl.com/), [atelierbrzozowski.com](https://atelierbrzozowski.com/), [larrykinghair.com](https://larrykinghair.com/)
- Spoke & Weal states its booking terms next to the CTA: "A credit card holds the appointment; you're not charged until your visit is complete" on the home page, and the 24-hour cancellation rule beside the schedule button on the portfolio page — [spokeandweal.com](https://spokeandweal.com/), [Spoke & Weal portfolio](https://spokeandweal.com/portfolio)
- Serenity is the only site using four different labels for the same booking action on one page — [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)

### Inferences
- Whether the header booking button is sticky was not observed directly. On the sites where the header holds only a logo and a booking button (Una, Gielly Green, Spoke & Weal) a fixed header is very likely (inferred from structure and from the low on-page CTA counts, which only work if the header stays reachable).
- Best-in-class practice is one label, used everywhere. The Awwwards HM sites use the booking CTA only 1 to 3 times on the home page; high repetition counts (4 to 9) belong to the SEO-led and mid-market sites.
- For an independent stylist, ALICE's per-stylist "Book ↗" link straight to an external booking profile and the US "#book-now" overlay are the two cleanest models; both avoid building any booking UI.
- Il Colorista shows that a consultation-first colour business can drop "book now" entirely and route to a form or WhatsApp, but it is the only site in the sample doing so.

### Gaps
- Sticky/fixed behaviour, button styling and mobile bottom-bar CTAs could not be verified without rendering the pages.
- The "#book-now" overlays (Boulevard) were not opened, so the number of steps in those flows is unknown. Larry King's exact booking provider behind "#onlinebookings" was not confirmed (the HTML references both Phorest and Fresha).

## 6. What patterns recur across the best ones, and which sites are outliers?

### Takeaway
The recurring formula is: a hub-style home page of about 6 to 10 blocks and a few hundred words, a header reduced to "Menu" plus one booking button, prices and policies on their own pages, a filterable lookbook as a separate page, and booking handed to a third-party system. The outliers are informative in both directions: Jenna Perry (23 words) and Atelier Brzozowski (51 words) at the minimal extreme, Effectownia and Salon SCK (about 1,500 words) at the SEO-heavy extreme, and Il Colorista with no booking CTA at all.

### Cited Findings

Recurring patterns (count of sites out of 13, with examples):

- Home page as a hub of teasers that each link to a sub-page (services, team, lookbook, about, press): Una's four link tiles, Serenity's three link tiles, Gielly Green's tile grid, Hair Me Up's section-per-business-line — [una-akl.com](https://www.una-akl.com/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [giellygreen.co.uk](https://giellygreen.co.uk/), [hairmeup.pl](https://hairmeup.pl/)
- A common opening sequence: (1) full-screen image or video with a one-line positioning statement and the booking button; (2) a short philosophy or founder paragraph; (3) services as category names; then team, proof (press or reviews), Instagram or lookbook teaser, and a closing contact/booking strip. Una, Serenity, Effectownia, Spoke & Weal and Salon SCK all follow this order with minor swaps — [una-akl.com](https://www.una-akl.com/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [effectownia.pl](https://effectownia.pl/), [spokeandweal.com](https://spokeandweal.com/), [salonsck.com](https://www.salonsck.com/)
- Positioning statements are short and identity-led rather than service-led: "There is no one quite like you. You are one. You are Una."; "The seamless blend of hairdressing & art"; "Ogni donna ha il suo colore" (Every woman has her colour); "Beauty Made With Intention"; "This is The One." — [una-akl.com](https://www.una-akl.com/), [alicehairart.se](https://www.alicehairart.se/), [ilcolorista.salon](https://ilcolorista.salon/), [suitecaroline.com](https://www.suitecaroline.com/), [giellygreen.co.uk](https://giellygreen.co.uk/)
- Services appear on the home page as 4 to 12 category names, numbered on three sites (Hair Me Up 01 to 04, Effectownia 01 to 06, Spoke & Weal 01 to 05), with detail and prices deferred — [hairmeup.pl](https://hairmeup.pl/), [effectownia.pl](https://effectownia.pl/), [spokeandweal.com](https://spokeandweal.com/)
- Navigation of 5 to 8 labels. Approximate tally of page types reachable from nav or footer across the 13 sites (my count; Gielly Green's hidden menu not captured): Services or Menu/Price list (11 confirmed; ALICE has none), Team/Stylists/Artists (about 10), About/Ethos (about 10), Contact (9), Lookbook/Gallery/Portfolio (4: Una, Serenity, Effectownia, Spoke & Weal), Press/Media (4: Una, Spoke & Weal, Suite Caroline, Jenna Perry), FAQ (4: Gielly Green, Spoke & Weal, Suite Caroline, Larry King), Policies/Appointments (4: Una, Jenna Perry, Salon SCK, Hair Me Up) — tallied from the nav and footer lists in section 2, for example [una-akl.com](https://www.una-akl.com/), [jennaperryhair.com](https://www.jennaperryhair.com/), [suitecaroline.com](https://www.suitecaroline.com/), [spokeandweal.com](https://spokeandweal.com/)
- Third-party booking on all 13; no site built its own booking form — see the table in section 5, for example [una-akl.com](https://www.una-akl.com/), [effectownia.pl](https://effectownia.pl/)
- Portfolio organised by service and/or stylist rather than as an undifferentiated grid: Una (filter by service, each image links to its service), Effectownia (filter by stylist and by service), Spoke & Weal (captions by category and city) — [Una lookbook](https://www.una-akl.com/pages/lookbook), [Effectownia realizacje](https://effectownia.pl/realizacje/), [Spoke & Weal portfolio](https://spokeandweal.com/portfolio)
- Instagram used as the living portfolio: an Instagram block or feed on the home pages of Serenity, Effectownia, Spoke & Weal and Larry King; Instagram handles on every stylist card at ALICE — [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/), [effectownia.pl](https://effectownia.pl/), [spokeandweal.com](https://spokeandweal.com/), [larrykinghair.com](https://larrykinghair.com/), [alicehairart.se](https://www.alicehairart.se/)
- Hours, address and contact live in the footer or the menu overlay, not in a home-page section (Una puts hours, address, parking and newsletter inside the menu overlay; Spoke & Weal puts flagship address and hours in the closing booking block) — [una-akl.com](https://www.una-akl.com/), [spokeandweal.com](https://spokeandweal.com/)
- Newsletter signup is present on at least 5 sites (Una, Il Colorista, Hair Me Up, Larry King, Suite Caroline), always in the footer or menu overlay, never as a main home-page section — [una-akl.com](https://www.una-akl.com/), [ilcolorista.salon](https://ilcolorista.salon/), [hairmeup.pl](https://hairmeup.pl/), [larrykinghair.com](https://larrykinghair.com/), [suitecaroline.com](https://www.suitecaroline.com/)
- Platforms are ordinary: Shopify (Una, Gielly Green with a headless front end, Suite Caroline, Larry King), WordPress (Atelier Brzozowski, Serenity with Elementor, Hair Me Up, Effectownia with Divi), Framer (ALICE), Wix (Jenna Perry), Gatsby (Salon SCK), custom (Il Colorista, Spoke & Weal) — generator tags and markup of each site, for example [alicehairart.se](https://www.alicehairart.se/), [jennaperryhair.com](https://www.jennaperryhair.com/), [serenityhairblaxland.com.au](https://serenityhairblaxland.com.au/)

Outliers:

- Jenna Perry Hair: the most minimal home page in the sample, 23 words, two blocks (image with "Book now", then five team names). Everything else is behind six nav labels — [jennaperryhair.com](https://www.jennaperryhair.com/)
- Atelier Brzozowski: award-recognised "business card" home page with a single 51-word paragraph; booking and contact are dropdowns inside the navigation rather than page sections — [atelierbrzozowski.com](https://atelierbrzozowski.com/), [Awwwards](https://www.awwwards.com/sites/atelier-brzozowski)
- ALICE Hair & Art: the only true one-pager, the only site with no services or prices anywhere, and the only one where booking is per independent stylist on different platforms; it also gives equal weight to a non-hair theme (art exhibitions) — [alicehairart.se](https://www.alicehairart.se/)
- Il Colorista: no booking CTA; sells a named consultation method ("metodo viso sartoriale") and seasonal named colour packages, and publishes a downloadable magazine PDF — [ilcolorista.salon](https://ilcolorista.salon/), [Il Colorista servizi](https://ilcolorista.salon/servizi)
- Effectownia: by far the densest home page (about 1,500 words), the only one embedding dated third-party reviews under each stylist, with per-stylist and per-service landing pages; closer to a local-SEO landing page than a mood piece — [effectownia.pl](https://effectownia.pl/)
- Salon SCK: similarly long (about 1,500 words) with seven 50-word service paragraphs and nine "Book Now" instances — [salonsck.com](https://www.salonsck.com/)
- Spoke & Weal: the only home page showing prices, the only one with no top navigation beyond a booking button, and the only one printing booking terms beside the CTA — [spokeandweal.com](https://spokeandweal.com/)
- Gielly Green, Larry King and Hair Me Up are hybrids where the home page splits attention between salon booking and product retail (Larry King's hero is a literal two-way split between "Book an appointment" and "Shop the range"; Hair Me Up adds an academy as a third line) — [giellygreen.co.uk](https://giellygreen.co.uk/), [larrykinghair.com](https://larrykinghair.com/), [hairmeup.pl](https://hairmeup.pl/)
- Sally Hershberger's site (https://www.sallyhershberger.com/) was fetched as a possible celebrity benchmark and rejected: the home page has 77 words, still exposes Squarespace placeholder contact-form text, carries a 2023 copyright line, has no booking CTA and uses a navigation dominated by 16 individual press-clipping pages. It is an example of a famous name with a neglected site, not a model — [sallyhershberger.com](https://www.sallyhershberger.com/)

### Inferences
- For a single independent stylist or colorist, the closest models are Jenna Perry (home = image + book + team), ALICE (one page: statement, stylist card(s) with direct booking links, contact) and Una (hub page with link tiles and a separate lookbook filtered by service). All three keep the home page under about 400 words.
- Two legitimate strategies exist and the sample splits cleanly between them: "brand-led minimal" (wins juried design recognition; relies on existing reputation, Instagram and press) and "search-led comprehensive" (wins listicle mentions and local search; long copy, many landing pages, embedded reviews). Mixing them, as Serenity does with inconsistent CTA labels and long testimonials on a short site, produces the weakest result in the recognised set (it is the lowest-tier Awwwards entry here, a Nominee).
- A reasonable "award-level" specification derived from the sample: 5 to 7 nav labels (Services/Menu, Team or About, Lookbook, Appointments/Policies, Contact) with a separate booking button; 6 to 8 home blocks; 150 to 400 words; services as names only; one booking label used 2 to 3 times; lookbook, price menu and policies as separate pages; third-party booking.
- Named offers appear to be a differentiator at the top end (Il Colorista's city-named blondes and "metodo viso sartoriale", Gielly Green's "The One", Spoke & Weal's "Community Cut" tier), turning a price list into branded products.

### Gaps
- The sample is 13 sites and skews to multi-chair salons; only ALICE (independent stylists sharing a studio) and Anett Weber (not loadable) approximate a solo-practitioner site. I did not find a juried-award-winning website for a single independent hair colorist from 2022 to 2026.
- No conversion or performance data exists for any of these sites, so "best" here means design recognition and citation, not proven booking performance.
- Visual design details (typography, colour, motion, image treatment) were out of reach of this method and are not covered beyond what award pages state.
- Nine Zero One (ninezeroone.com) failed to load (connection error) and Hershesons and Josh Wood Colour were downloaded but not torn down because both home pages are product-retail led.
