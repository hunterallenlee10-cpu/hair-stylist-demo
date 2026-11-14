# Page length, information density and conversion for a small local service (hair color studio) website, mobile first

Research date: 2026-11-14. Context assumed throughout: US one-person hair color studio, small town, new clients admitted by free-text consultation (no open online booking), site viewed mostly on phones.

Source-quality key used in every bullet:
- **[P]** primary research (the source ran the study or survey and describes its method)
- **[E]** expert opinion or expert guideline (no data in the piece itself)
- **[V]** vendor data or vendor marketing (company sells a related product; method often undisclosed)
- **[S]** secondary report of someone else's finding
- **(opened)** I read the page itself. **(snippet)** I only saw it through search-result summaries, so wording and numbers should be re-checked before quoting.

---

## 1. What usability research says about long scrolling pages vs multi-page sites, cognitive load, choice overload, and number of sections / calls to action

### Takeaway
People do scroll, but attention falls off steeply with depth: on desktop about 57% of viewing time is above the fold and 74% within the first two screenfuls (NN/g, 2018), and on mobile the average visitor only gets about 45% of the way down a page (Contentsquare, 2026). The research supports neither "everything on one long page" nor "many tiny pages"; it supports putting the highest-priority content and the main action first, keeping only what most visitors need on the page, and deferring the rest (collapsed or on a second page), with no more than two levels of disclosure. No credible study gives a correct number of sections or calls to action.

### Cited Findings
- [P] (opened) NN/g eyetracking, article dated 2018-04-15, 120 participants, 130,000+ fixations, desktop 1920x1080: 57% of viewing time was above the fold (down from 80% in the 2010 study), about 17% in the second screenful, 74% in the first two screenfuls, 81% in the first three; the remaining ~19 to 26% is a long tail. — [NN/g, Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/)
- [P] (opened) Same study: on general sites the top 20% of the page got more than 42% of viewing time and the top 40% more than 65%. Recommendations: reserve the top for the highest-priority user and business goals, keep major CTAs above the fold, use consistent headings and distinct styling so people can find things, avoid "false floors" (use cut-off content to signal more below), and test page length with real users. The study has no mobile data. — [NN/g, Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/)
- [E] (snippet) NN/g on the fold: smaller screens force more scrolling "out of necessity", and people scroll because they expect value below, not because they like scrolling; NN/g advises signposts at the top that show what is coming. — [NN/g, Page Fold Manifesto](https://www.nngroup.com/articles/page-fold-manifesto/)
- [V/P] (opened) Contentsquare 2026 Digital Experience Benchmark (published 2026-03-09; 99 billion sessions, 6,500 sites, 9 industries, mostly large brands): average scroll rate is 45.2% on mobile vs 50.5% on desktop; time per session is 2:20 on mobile vs 4:46 on desktop; mobile is 70% of traffic; overall engagement fell 10% year over year and time on site fell 7%; conversion 2% mobile vs 3.4% desktop. — [Contentsquare, 2026 Digital Experience Benchmark, Engagement](https://contentsquare.com/guides/digital-experience-benchmark/engagement/)
- [V/P] (snippet) Earlier Contentsquare editions show scroll rate drifting down from the mid 50s (2021 to 2022) to about 50% (2023 to 2024). — [Contentsquare Benchmark 2024 explorer](https://csquad.contentsquare.com/benchmark24-explorer)
- [E] (opened) NN/g, 2014-05-18: on small screens "people often stop scrolling before reaching the end of an extremely long page", and when content is loosely related they cannot guess whether what they want is further down, so they quit. Collapsing content into accordions is recommended on mobile because it cuts scrolling and gives an overview of the page. Accordions are NOT recommended when most visitors need most of the content. If a page is extremely long, NN/g suggests splitting it across "several more digestible pages", while warning against "cutting up content into short tiny pages". — [NN/g, Accordions for Complex Website Content](https://www.nngroup.com/articles/accordions-complex-content/)
- [E] (snippet) NN/g video: accordions on mobile "provide an overview of the whole page and mitigate the problem of long mobile pages". NN/g's desktop article adds the cost: accordions raise interaction cost because people must decide which heading to open. — [NN/g, Accordions on Mobile](https://www.nngroup.com/videos/accordions-on-mobile/); [NN/g, Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/)
- [E] (opened) NN/g, 2006-12-03 (old but still the canonical statement): progressive disclosure shows a few core options first and defers rarely used ones. Put everything users frequently need on the initial display; keep the primary list short; make the path to secondary content obvious and accurately labelled. "Designs that go beyond 2 disclosure levels typically have low usability." Staged (step-by-step) disclosure suits steps with little interdependence; too many steps slow people down. — [NN/g, Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [E] (opened) NN/g, 2013-12-22: cognitive load is "the amount of mental resources that is required to operate the system". Reduce extraneous load by (1) avoiding visual clutter such as redundant links, irrelevant images and decorative typography, (2) building on layouts and labels people already know from other sites, (3) offloading reading, remembering and deciding. — [NN/g, Minimize Cognitive Load](https://www.nngroup.com/articles/minimize-cognitive-load/)
- [P] (snippet) Choice overload, peer reviewed: Chernev, Böckenholt and Goodman (2015, Journal of Consumer Psychology 25(2)), meta-analysis of 99 observations, N = 7,202. More options reliably cause overload when the choice set is complex, the decision task is difficult, the person is unsure of their preferences, or they want to minimize effort. Outcomes measured: lower satisfaction, regret, choice deferral, switching. — [Kellogg School summary of Chernev et al. 2015](https://www.kellogg.northwestern.edu/faculty/research/detail/2015/when-product-assortment-leads-to-choice-overload-a-conceptual)
- [P] (snippet) The evidence is mixed: the earlier meta-analysis by Scheibehenne, Greifeneder and Todd (2010) found a mean choice-overload effect of virtually zero with large variance between studies, and those authors disputed the 2015 approach. — [Scheibehenne et al. 2010 record](https://www.econbiz.de/Record/can-there-ever-be-too-many-options-a-meta-analytic-review-of-choice-overload-scheibehenne-benjamin/10008756224)
- [P] (snippet) Mobile reading: NN/g reported a 2011 cloze-test study (50 participants, privacy-policy text) in which comprehension on an iPhone-sized screen was about 48% of desktop comprehension (18.93% vs 39.18%). A 2016 NN/g follow-up is reported to have found that short, simple text is understood as well on mobile as on desktop, while difficult text slows mobile readers. — [NN/g, Mobile Content Is Twice as Difficult (2011)](https://www.nngroup.com/articles/mobile-content-is-twice-as-difficult-2011/)

### Inferences
- A new visitor on a phone is in exactly the conditions Chernev et al. link to overload: unsure what they want (which color service?), facing unfamiliar terms, wanting low effort. That argues for few, plainly named choices on the home page rather than a full menu of everything.
- Combining NN/g's fall-off figures with the Contentsquare mobile scroll rate, anything placed in the bottom half of a long mobile home page should be assumed unseen by roughly half of visitors. Content that a visitor must see to enquire (what she does, where, proof of work, how to start) belongs in the first two or three screens.
- NN/g's accordion rule gives a usable split test: if most visitors need it, show it on the page; if only some need it (full price list, policies, aftercare, FAQ), collapse it or move it to its own page. One collapsed level is fine; nesting is not.
- The mobile-reading evidence favors short, plain copy over long explanatory paragraphs, especially for anything technical about color.

### Gaps
- NN/g's quantitative scroll data is desktop only and dates from 2018; I found no equally rigorous public mobile eyetracking study with percentages.
- Contentsquare's data comes from large enterprise sites, not small local service sites; no scroll-depth benchmark exists for sites of this size.
- I found no controlled study that tests "number of sections" or "number of CTAs" on a home page. The common claim that one CTA beats several is practitioner lore; I could not trace it to a reproducible study.
- I did not open the 2016 NN/g mobile reading follow-up or the Chernev paper itself.

---

## 2. What salon clients say they want from a salon website, and what makes them leave

### Takeaway
The traceable salon surveys agree on a short list: how to reach you and where you are (56%), services with accurate prices (40%), reviews (46%), before and after photos (36%) and, for a minority, online booking (32% overall, higher under 35). Blogs, trend news and online shops barely register (4 to 8%). All of the salon-specific data comes from booking-software vendors and is thin on method; the best independent data (BrightLocal, 2026) shows the website is where people go to verify after reading reviews.

### Cited Findings
- [V/P] (opened) Phorest client survey, article dated 2019-06-12; sample size, country and field dates not stated (Phorest is Irish, so respondents may be largely UK/Ireland). Share of respondents wanting each item on a salon website: contact page with location, contact details and opening hours 56% (top priority); reviews and testimonials 46%; service list and pricing 40%; before and after pictures 36%; online booking 32% (36% of ages 25 to 34, 43% of ages 18 to 24); detailed treatment descriptions (what is involved, duration, products) 29%; deals and promotions 26%; product information 16%; staff bios, pictures, awards 15%; products for sale online 8%; blogs and trend news 4%. — [Phorest, what clients want on a salon website](https://www.phorest.com/?p=60234)
- [V/P] (opened) Same Phorest piece, frustrations: respondents stressed prices that are transparent, accurate and up to date, and some described being caught off guard by a large bill; respondents were confused by unfamiliar treatment names with no description. — [Phorest](https://www.phorest.com/?p=60234)
- [V/P] (opened) Phorest audit of 100 salon websites: only 25% had a location map on the contact page and 62% displayed opening hours prominently. — [Phorest](https://www.phorest.com/?p=60234)
- [S] (opened) SalonCentric's 2019-10-03 write-up of the same Phorest poll lists contact information 56%, services with accurate pricing 40%, online booking 32%, deals 27% (Phorest's own page says 26%), products online 8%, blogs or trend news 4%; no sample size given. It also reports that among salons with online booking, 46% of appointments are made outside business hours. — [SalonCentric Pro Beauty Central](https://www.probeautycentral.saloncentric.com/give-the-people-what-they-want-this-is-what-clients-want-to-see-on-your-website)
- [V/P] (opened) Boulevard, "The Perfect Salon" survey of 800 US beauty service consumers, reported 2022-02-03. Choosing a salon: price point is the top consideration for 40% (price consistency matters; only 3% say deals are crucial), reputation 18%, high-end experience 13%, friendly staff 9%, proximity 6%. Choosing a stylist: availability 33%, friend recommendation 27%, online portfolio 22% (53% of those are women), social following 7%. 83% search for salons through local listings such as Google and Yelp. 42% prefer to self-book online, 26% by phone, 22% in person. 24% say a poor online booking experience is the number one reason they would not return. — [Salon Today on Boulevard survey](https://www.salontoday.com/articles/consumers-seek-value-reputation-and-a-high-end-experience-when-selecting-a-hair-salon)
- [P] (opened) BrightLocal Local Consumer Review Survey 2026 (published 2026-02-11; 1,002 US adults, representative SurveyMonkey panel; BrightLocal sells local SEO tools but publishes its method): 97% read reviews for local businesses; after reading a positive review 54% visit the business website (up from 32% in 2019), 37% read more reviews, 31% visit the location, 24% visit social media, 20% contact the business, 20% make an appointment; 66% do further research before acting. — [BrightLocal LCRS 2026](https://www.brightlocal.com/research/local-consumer-review-survey/)
- [P] (opened) Same survey: 68% will only use a business rated four stars or more, 31% require 4.5 or more; 47% will not use a business with fewer than 20 reviews; 74% look for reviews from the last three months; Google use for reviews fell from 83% to 71% while generative AI tools rose from 6% to 45%. BrightLocal also cites its own finding that only 40% of local businesses have a dedicated website. — [BrightLocal LCRS 2026](https://www.brightlocal.com/research/local-consumer-review-survey/)
- [V] (snippet) Figures such as "72% of salon clients want before and after photos before booking" and "78% check reviews" appear on salon web-design vendor blogs with no cited source; treat as unverified. — [example vendor post](https://strikingweb-design-v2.pages.dev/insights/beauty-salon-website-statistics)

### Inferences
- The must-have content for a salon site is small enough to fit a short home page: who and where, what she does with honest price guidance, proof (photos and reviews), and one clear way to start. Everything else is optional.
- Because this studio does not offer open online booking, the 32 to 42% who expect to self-book will meet a different process. The site needs to say plainly, early, how new clients start (a short written consultation) and what happens next, so the absence of a "Book now" calendar does not read as a broken or missing feature.
- Price transparency ranks higher than photos in the Phorest data and price is the top salon-choice factor in the Boulevard data. For color work with variable pricing, "from" prices or typical ranges plus a short explanation of what changes the price addresses the stated frustration about surprise bills.
- Unfamiliar service names are a documented confusion point. Plain names with a one-line description serve clients better than insider terms.
- BrightLocal's sequence (reviews, then website, then contact) suggests most visitors arrive already half persuaded and are checking for confirmation and a next step, not reading at length.

### Gaps
- No salon survey I found asks directly "what made you leave a salon website". The Boulevard 24% figure is about a poor online booking experience, not page design.
- The Phorest survey is 2019, vendor-run, with no published sample size; no newer salon-specific survey of website content preferences surfaced from Mindbody, Vagaro, Square, Booksy or the Professional Beauty Association in these searches.
- No data specific to color-only specialists or to consultation-first studios.
- No data on how salon clients split between a salon's website, Instagram and Google Business Profile when deciding.

---

## 3. Single-page vs multi-page for local SEO, and what reputable sources recommend for a business with a handful of services

### Takeaway
Reputable SEO sources consistently favor a small multi-page site with one focused page per core service over a single long page, because one URL can only be strongly relevant to a limited set of queries. The strongest evidence is an expert-opinion survey (Whitespark 2026, 47 local SEO practitioners), not measured ranking data, and the same survey says long, padded pages are out: service pages should be concise. Google's own representatives say a one-page site is an acceptable starting point.

### Cited Findings
- [E, surveyed] (opened) Whitespark 2026 Local Search Ranking Factors (published 2025-11-06): 47 experts each scored 187 factors 0 to 5. "Dedicated Page for Each Service" is the number 1 local organic factor (score 210), number 2 for AI search visibility (170), but only number 24 for the local pack / Maps (132). Whitespark notes that no participant has special access to Google's algorithm. — [Whitespark, Local Search Ranking Factors 2026](https://whitespark.ca/local-search-ranking-factors/)
- [E, surveyed] (opened) Same report, top local pack / Maps factors: primary Google Business Profile category (227), proximity of address to the searcher (225), keywords in the GBP business title (223), physical address in the city of search (213), open at time of search (189). Top local organic factors after service pages: city or neighborhood keyword relevance of content (190), quality of inbound links (187), keywords in the GBP landing page title tag (179). — [Whitespark 2026](https://whitespark.ca/local-search-ranking-factors/)
- [E] (opened) Same report, Darren Shaw's commentary: "massive pages of content are no longer the way"; "Volume of Quality Content on Service Pages" fell to number 72 for the local pack and number 17 for local organic; he recommends clear, concise, well-structured content with headings and bullets and no walls of text, noting that Google and AI tools skip filler. — [Whitespark 2026](https://whitespark.ca/local-search-ranking-factors/)
- [E] (snippet) Whitespark's own blog advises a web page for every service and sub-service. — [Whitespark, Website Optimization Basics for Local SEO](https://whitespark.ca/blog/website-optimization-basics-for-local-seo/)
- [E] (opened) Ahrefs, 2023-05-15: single-page sites are usually the weaker SEO choice. Drawbacks: targeting several keywords on one page dilutes relevance; less topical depth; weaker structure; fewer linkable pages. Benefits: concentrated link equity on one URL, naturally mobile friendly, cheap and fast, fine as a launch placeholder or MVP. Recommendation: map each keyword or service to its own focused page; if staying single-page, use a clear heading hierarchy, optimize images and keep it fast. — [Ahrefs, Single-Page Websites and SEO](https://ahrefs.com/blog/single-page-website/)
- [S] (snippet) Google's John Mueller, as reported by Search Engine Journal and Search Engine Roundtable: starting with a one-page site is fine, but plan for it to grow rather than piling everything onto one page; a site does not need to be an "authority" to rank. — [Search Engine Journal](https://www.searchenginejournal.com/google-you-dont-need-to-be-an-authority-to-rank/429921/); [Search Engine Roundtable](https://seroundtable.com/google-not-all-websites-need-to-be-an-authority-32621.html)
- [V] (snippet) Agency and web-studio blogs overwhelmingly recommend 5 to 8 pages for small service businesses and cite build costs; these are self-interested and unverified. — [example agency post](https://www.mapletree.studio/blog/one-page-website-vs-multi-page-local-business)

### Inferences
- For "service + town" queries (for example "balayage [town]" or "color correction [town]"), the expert consensus points to a short home page plus one concise page per core service, each naming the service and the town naturally. With a handful of services that is roughly four to seven pages in total, which also solves the home-page length problem: detail moves off the home page onto the service pages.
- In a small town with few competing colorists, the local pack is driven mostly by Google Business Profile category, proximity and reviews, where service pages rank only 24th. Site architecture is therefore likely to matter less to being found in Maps than the profile and reviews do, and more to organic results and AI answers.
- Whitespark's "concise, not massive" guidance means SEO and usability point the same way here: several short focused pages rather than one long page or several padded ones.

### Gaps
- I found no published controlled test comparing single-page and multi-page sites for local rankings; Whitespark's ranking is aggregated opinion.
- Google Search Central has no document that directly addresses one-page vs multi-page sites; Mueller's comments are informal and I saw them only in secondary reports.
- No evidence specific to very low-competition small-town markets, where a single well-optimized page may be enough to rank.
- I read only the first 100,000 characters of the Whitespark report; its conversion-factor rankings were not captured.

---

## 4. Interactive elements (quizzes, sliders, multi-step forms, configurators): do they help or hurt enquiries, and how long should a multi-step enquiry form be

### Takeaway
Evidence here is the weakest of all seven questions: nearly every number comes from companies that sell quiz or form software, and none concerns small local service sites. The defensible position is that there is no ideal field count, motivation and relevance matter more than length, multi-step layouts tend to help only once a form has about five or more fields, and each step should carry little dependency on the others. I found no independent evidence on before/after sliders or service configurators.

### Cited Findings
- [V/P] (opened) Zuko form analytics (page last updated 2026-09-23; draws on benchmarking "across thousands of forms", exact sample not stated): number of fields "may not impact conversion as much as you might think"; cited outside tests conflict (one found removing fields lowered conversions, another found adding fields raised conversions and lead quality); there is no single ideal number. Motivation dominates: local government forms average 71 inputs yet convert at 85%. Advice: keep only crucial fields, make nice-to-have fields optional with a reason, combine fields (one name field), defer what is not needed yet, justify sensitive fields such as phone number, group related questions into steps and show progress. — [Zuko, How Many Fields Should an Enquiry Form Have](https://www.zuko.io/blog/how-many-form-fields/)
- [V] (snippet) Zuko field-level data: after password, email address and phone number are the fields with the highest abandonment. Zuko 2025 benchmarks as relayed by Crazy Egg: about 45% of people who view a form and 66% of those who start one complete it. — [Zuko, which fields cause the biggest problems](https://www.zuko.io/blog/which-form-fields-cause-the-biggest-ux-problems); [Crazy Egg form statistics roundup](https://www.crazyegg.com/blog/form-statistics/)
- [V] (snippet) Reform (form vendor) reports a table in which 3-field single-step forms slightly beat multi-step (23.1% vs 22.4%) while 7- and 10-field forms favored multi-step by 21% and 35%; underlying data not shown. — [Reform, mobile form design studies](https://www.reform.app/blog/mobile-form-design-insights-studies)
- [V/S] (snippet) Formstack figures quoted second hand: multi-page forms 13.9% vs single-page 4.5% conversion. A Conversion Fanatics A/B test reported similar rates for both. Headline lifts such as "86% better" and 0.96% to 8.1% (Venture Harbour) are single agency case studies. — [Responsify](https://responsify.com/multi-step-form-conversion-rate-optimization); [FormKeep](https://blog.formkeep.com/should-you-use-single-step-or-multi-step-forms/); [Lead Gen Economy](https://www.leadgen-economy.com/blog/multi-step-forms-conversion-optimization/)
- [E] (opened) NN/g: staged disclosure (wizard-style steps) works when steps have little interdependence; interdependent items that need back-and-forth belong on one screen; too many steps create excess navigation that slows users. — [NN/g, Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [V] (snippet) Quiz vendors: Interact reports a 40.1% start-to-lead rate and 65% start-to-finish rate across its customers' quizzes (a rate among people who started, not among all visitors). ConvertFlow's September 2026 benchmark of 1,063 quiz funnels reports quiz landing pages capturing a lead from 11.28% of visitors and embedded quizzes about 25%. — [Interact quiz conversion report](https://tryinteract.com/blog/quiz-conversion-rate-report/); [ConvertFlow quiz benchmark, Sept 2026](https://www.convertflow.com/benchmark-reports/lead-generation-quiz-funnel-benchmark-september-2026)
- [S] (snippet) The most cited non-vendor figure is Demand Metric's survey finding that interactive content converts about twice as well as static content (marketers' self-report, B2B oriented). — [Capterra summary](https://www.capterra.com/resources/how-to-use-quizzes-to-improve-your-online-conversion-rates/)
- [P] (snippet) Peer-reviewed caution: choice overload grows with decision difficulty and preference uncertainty, so interactive choosers that add decisions can raise deferral rather than reduce it. — [Chernev et al. 2015 summary](https://www.kellogg.northwestern.edu/faculty/research/detail/2015/when-product-assortment-leads-to-choice-overload-a-conceptual)

### Inferences
- Quiz conversion figures are measured on marketing funnels built around the quiz, with paid traffic and email capture as the goal. They do not show that adding a quiz to a salon home page increases genuine consultation requests. A quiz on the home page also adds a second competing path next to the enquiry itself.
- For a free-text consultation, the sensible reading of the form evidence is: ask only what the stylist needs to reply (name, one contact method, what the hair is like now, what is wanted, optional photos), keep it to one short screen or two to three light steps, show progress if stepped, and explain why a phone number is asked for or make it optional.
- A multi-step enquiry of more than three or four steps moves into the territory NN/g warns about, and on a phone each added step is another chance to drop out; Zuko's start-to-complete figure (about two thirds) is a reminder that a third of people who begin any form do not finish.
- A single interactive element that directly shows the work (for example one before/after comparison) is lower risk than several, since each one adds weight, interaction cost and visual competition; this is a judgment, not a tested result.

### Gaps
- No independent, controlled evidence on quizzes, before/after sliders or configurators for small local service businesses.
- No study isolates multi-step vs single-step enquiry forms on mobile for service businesses with sample sizes and methods published.
- I found no CXL primary study on field count in these searches; Zuko and Speero refer to one without detail.
- No evidence on photo-upload fields in consultation forms and their effect on completion.

---

## 5. Best practices for a mobile home page above the fold and for sticky mobile action bars

### Takeaway
The first mobile screen should make clear what the business is and offer the main action, because most attention is spent at the top, first impressions form in under a tenth of a second, and mobile visitors scroll less than half the page on average. Sticky bars are supported by expert guidance rather than strong public research: keep them small, opaque, still, and limited to the one or two actions people need at any moment. Precise "sticky bar lifts conversion by X%" claims are vendor numbers I could not verify.

### Cited Findings
- [P] (opened) Keep the highest-priority content and major CTAs above the fold; avoid layouts that look finished at the bottom of the first screen. — [NN/g, Scrolling and Attention (2018)](https://www.nngroup.com/articles/scrolling-and-attention/)
- [V/P] (opened) Mobile visitors scroll 45.2% of a page on average and spend 2:20 per session (2026). — [Contentsquare 2026](https://contentsquare.com/guides/digital-experience-benchmark/engagement/)
- [P] (snippet) Tuch et al. (2012, International Journal of Human-Computer Studies; Google/University of Basel; 119 real website screenshots): visual complexity and prototypicality shape aesthetic judgments within 50 ms, with some effect at 17 ms; sites with low visual complexity and high prototypicality (looking like what people expect for that type of site) were rated most appealing. Older than the 2019 preference but a foundational, peer-reviewed result. — [Google Research blog](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/); [paper record](https://research.google/pubs/pub38315/)
- [P] (snippet) Baymard mobile e-commerce testing (2016, updated 2021): 70% of test subjects scrolled up and down nearly the whole mobile home page to work out what the site offers, and people who see a narrow selection assume the whole offer is narrow; 42% of mobile home pages risked setting the wrong expectation. E-commerce, not services. — [Baymard, mobile homepage usability](https://baymard.com/blog/mobile-homepage-usability); [Baymard, provide full scope](https://baymard.com/blog/mobile-homepage-provide-full-scope)
- [P] (snippet) Google/SOASTA 2017: the probability of bounce rises 32% as mobile load time goes from 1 to 3 seconds. The widely quoted "53% of mobile visits are abandoned if a page takes longer than 3 seconds" is attributed to Google (2016 to 2017). Both are old and predate current networks, but remain the standard citations. — [Think with Google, page load time statistics](https://thinkwithgoogle.com/data/page-load-time-statistics); 53% figure as cited by [Ahrefs](https://ahrefs.com/blog/single-page-website/)
- [E] (opened) NN/g, 2021-04-04, sticky headers (expert guidance, no study cited): keep the bar only as tall as readable text and tappable targets need; use an opaque, contrasting background; do not animate, or use a quick 300 to 400 ms slide-in for a header that reappears on scroll up (common on mobile); touch targets at least 1 cm by 1 cm; text about 16pt; ask whether a persistent bar is needed at all given the space it takes. Content-to-chrome examples on an iPhone 11 Pro: 13:1 judged reasonable, 2:1 judged excessive. — [NN/g, Sticky Headers: 5 Ways to Make Them Better](https://www.nngroup.com/articles/sticky-headers/)
- [E] (snippet) Other practitioner guidance: hide the header on scroll down and show it on scroll up; Adobe suggests no more than about 100px of vertical space for fixed elements on mobile. — [Smashing Magazine, Sticky Menus UX Guidelines (2023)](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/); [Adobe XD, fixed elements](https://xd.adobe.com/ideas/process/ui-design/best-practices-designing-fixed-elements)
- [P, single test] (snippet) NextAfter experiment on a nonprofit email-capture bar on mobile: top sticky bar converted 4.9% vs 2.3% for the bottom bar. One site, different goal. — [NextAfter](https://www.nextafter.com/?p=15480)
- [E] (snippet) Speero (experimentation agency): whether sticky CTAs help "depends"; they help when the main action scrolls out of view and can become intrusive. — [Speero](https://speero.com/post/are-sticky-ctas-really-that-sticky-that-was-the-next-question-tacked-in-our-series-it-depends)
- [V, unverified] (snippet) A Shopify-app vendor page attributes figures such as a 12 to 18% add-to-cart lift and "22% higher usability" for bottom bars to NN/g and Baymard; I could not trace these to any NN/g or Baymard publication. Do not cite. — [vendor page](https://easyappsecom.com/guides/shopify-sticky-cart-conversion-data)
- [V/P] (opened) Unbounce professional-services landing pages: about 81% of visits are mobile, and desktop converts at 11.6% vs 8.3% on mobile. — [Unbounce Conversion Benchmark Report, professional services](https://unbounce.com/conversion-benchmark-report/professional-services-conversion-rate/)

### Inferences
- A workable first mobile screen for this studio: business name and what it is in plain words (hair color specialist, town), one strong image of real work, and one primary action (start a consultation). A visible cue that more follows (cut-off next section) avoids the false-floor problem.
- A slim bottom action bar with one or two actions (for example "Start consultation" and "Text" or "Directions") fits NN/g's guidance and keeps the next step reachable given that half of mobile visitors never reach the bottom. It should not stack with a tall sticky header; together they should leave most of the screen for content.
- Low visual complexity and a conventional layout are an evidence-backed way to make a good first impression; novelty in layout works against the prototypicality finding.
- Image weight matters for the first screen on a phone in a small town with uneven coverage; one optimized hero image is safer than a gallery or video at the top.

### Gaps
- No primary NN/g or Baymard study on sticky bottom CTA bars for lead-generation or service sites surfaced.
- No public mobile eyetracking data with percentages comparable to NN/g's 2018 desktop study.
- The Google speed statistics are from 2016 to 2017; I did not find a newer first-party Google figure in these searches.
- Baymard's home page findings are from e-commerce; transfer to a one-person service site is by analogy.

---

## 6. How many sections, words and images high-converting service home pages tend to have

### Takeaway
There is no trustworthy benchmark for the number of sections or images on a service home page. The only large dataset on copy length is Unbounce's (vendor, paid-traffic landing pages, not home pages), which points to roughly 300 to 750 words written at about a 5th to 7th grade reading level for professional-service pages, with simpler wording mattering more than word count. Use it as a rough ceiling, not a rule.

### Cited Findings
- [V/P] (opened) Unbounce Conversion Benchmark Report, 2024 edition, commercial and professional services: median landing page conversion rate 6.1% (6.6% across all industries). Pages written at a 5th to 7th grade reading level had a median conversion rate of 12.9% vs 6.6% at 8th to 9th grade (a 49% drop). Stated ideal word count 275 to 745 words; practical target about 500 words with no more than 15% "difficult" words (three or more syllables). Sample size for this vertical and collection dates are not stated on the page. — [Unbounce, professional services benchmarks](https://unbounce.com/conversion-benchmark-report/professional-services-conversion-rate/)
- [V/P] (snippet) Unbounce cross-industry (2024 report, described as 41,000+ landing pages and 57 million conversions): difficult words had the strongest negative relationship with conversion (about -24%), ahead of reading time (about -19%) and word count (about -19%); e-commerce guidance is under 300 words. Word count includes headings, button text, testimonials and fine print. — [Unbounce press release, 2024](https://prnewswire.com/news-releases/unbounces-2024-conversion-benchmark-report-proves-that-attention-spans-are-declining-and-so-are-conversion-rates-302239407.html); [Unbounce methodology](https://unbounce.com/conversion-benchmark-report/methodology/)
- [E] (opened) Whitespark 2026: long pages of content are no longer the way for local service pages; volume of content on service pages has dropped in perceived importance. — [Whitespark 2026](https://whitespark.ca/local-search-ranking-factors/)
- [P] (opened) NN/g: 74% of viewing time falls in the first two screenfuls and 81% in the first three (desktop). — [NN/g, Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/)
- [P] (snippet) Lower visual complexity produces better first impressions. — [Tuch et al. 2012 via Google Research](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)

### Inferences
- Unbounce's data is correlational, drawn from its own customers' campaign landing pages, and its "conversion" includes any form fill or click. It does not establish that shortening a home page causes more enquiries. It is still the best available signal, and it agrees with the usability and local SEO evidence: shorter and plainer tends to do better.
- A reasonable working budget for this home page, derived from the above rather than directly measured: about 300 to 500 words in total, written plainly, across roughly five to seven short sections, so that the essentials sit within the first three mobile screens and the whole page is a handful of scrolls. The number of sections is my inference from scroll-depth data, not a benchmarked figure.
- For images, the evidence supports quality and restraint over volume: a few real before/after results on the home page (36% of salon clients want them, per Phorest), with the full gallery one tap away.

### Gaps
- No credible dataset reports the number of sections or number of images on high-converting service home pages. Blog posts that state such numbers (for example "5 to 7 sections" or "8 to 12 images") are opinion; I found none with data and have not cited any.
- Unbounce's professional-services page reports the 275 to 745 word band as where the median "peaks at 6.1%", which equals the overall median for the vertical; the page does not explain this, so the strength of the word-count effect in this vertical is unclear.
- No conversion benchmark exists for small local service home pages receiving organic and Google Business Profile traffic, as opposed to paid landing pages.

---

## 7. Why clients or owners call a site "too much" or overwhelming, and what specific changes fix it

### Takeaway
"Too much" is best explained by documented mechanisms rather than by any survey of owners: high visual complexity registers negatively within 50 ms, extraneous cognitive load comes from clutter and from forcing people to read, remember and decide, uncertain newcomers facing many options defer the decision, and long mobile pages are simply not scrolled. The fixes with the best support are removing content few people want, deferring secondary detail behind one level of disclosure or onto its own page, using plain conventional layouts and labels, and leading with one clear action.

### Cited Findings
- [P] (snippet) High visual complexity and unfamiliar layouts are judged less appealing almost instantly (17 to 50 ms). — [Tuch et al. 2012 via Google Research](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)
- [E] (opened) Extraneous cognitive load comes from redundant links, irrelevant images and decorative typography, unfamiliar layouts and labels, and anything that makes users read, remember or decide unnecessarily; fixes are to cut clutter, follow conventions and offload work with pictures and defaults. — [NN/g, Minimize Cognitive Load](https://www.nngroup.com/articles/minimize-cognitive-load/)
- [E] (opened) Progressive disclosure: show what most people need first, keep the first list short, make the route to more detail obvious, and do not exceed two levels. Showing something on the first screen signals it is important, so showing everything signals nothing. — [NN/g, Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [E] (opened) On phones, extremely long pages of loosely related content cause people to quit before finding what they want; collapse content only some people need, keep visible what most people need, and move very long material to separate pages without fragmenting into tiny ones. — [NN/g, Accordions for Complex Website Content](https://www.nngroup.com/articles/accordions-complex-content/)
- [P] (snippet) More options hurt most when the task is hard, the options are complex, and the person does not know what they want; the measurable results include deferring the choice. — [Chernev et al. 2015 summary](https://www.kellogg.northwestern.edu/faculty/research/detail/2015/when-product-assortment-leads-to-choice-overload-a-conceptual); effect disputed by [Scheibehenne et al. 2010](https://www.econbiz.de/Record/can-there-ever-be-too-many-options-a-meta-analytic-review-of-choice-overload-scheibehenne-benjamin/10008756224)
- [V/P] (opened) Salon clients report confusion at unfamiliar treatment names without descriptions, and rank blogs and trend news (4%), online shops (8%), staff awards and bios (15%) and product information (16%) far below contact details, prices, reviews and photos. — [Phorest](https://www.phorest.com/?p=60234)
- [V/P] (opened) Simpler wording correlates with higher conversion more strongly than length does; 5th to 7th grade reading level converts about twice as well as 8th to 9th grade on professional-service landing pages. — [Unbounce](https://unbounce.com/conversion-benchmark-report/professional-services-conversion-rate/)
- [P] (opened) Mobile sessions are short (2:20) and reach under half the page on average. — [Contentsquare 2026](https://contentsquare.com/guides/digital-experience-benchmark/engagement/)
- [E] (opened) Sticky elements that are tall, translucent or animated take space and attention from content. — [NN/g, Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)

### Inferences
Likely causes of a "too much" reaction on a small studio site, each mapped to a supported fix:
- Too many sections of roughly equal visual weight, so nothing reads as the main point. Fix: one idea per screen, a clear order of importance, and cut sections that the salon surveys show few clients want (blog, shop, long bio, awards).
- Several different interactive widgets and calls to action competing (quiz, slider, calculator, form, chat). Fix: one primary action repeated consistently, at most one interactive showcase, everything else removed or moved.
- Long explanatory copy and insider color terminology. Fix: plain names, one-line descriptions, short sentences, detail on the service page.
- Dense visuals: many fonts, textures, overlapping images, motion. Fix: fewer type styles, more whitespace, static layout, conventional structure, since simple and familiar wins first impressions.
- Full price lists, policies and FAQs displayed in full on the home page. Fix: summary plus a link, or one-level accordions.
- Layered chrome on a phone (sticky header plus sticky bar plus pop-ups). Fix: one slim action bar, no overlays.
- A useful test for every home-page element, derived from NN/g's accordion and disclosure rules: does a first-time visitor need this to decide to enquire? If most do, keep it visible; if some do, defer it one level; if few do, remove it.

### Gaps
- I found no survey or study of small-business owners or salon clients describing sites as "too much" or overwhelming; this section rests on general usability research applied to the case. Owner reactions of this kind are anecdotal.
- "One idea per screen" and "more whitespace" are widely taught design heuristics; I found no controlled public study quantifying their effect on enquiries.
- No evidence separates the owner's reaction (who sees the site repeatedly and knows the content) from a new client's reaction (who sees it once); they may differ, and only testing with a few real prospective clients would settle it, which is also NN/g's own recommendation for page length.
