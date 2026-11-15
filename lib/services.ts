// The four service pages. One template (app/services/[slug]/page.tsx) reads
// this file. Facts come from lib/business.ts and her own posts; anything not
// yet confirmed carries `draft` (rendered inside <Draft>, so the live-mode
// guard catches it).
import { business } from "./business";
import type { PhotoKey } from "./photos";

export type Faq = { q: string; a: string; draft?: string };
export type Expect = { title: string; body: string; draft?: string };

export type ServicePage = {
  slug: string;
  /** v1 hub id this page grew out of (kept on the hub tile). */
  hubId: string;
  /** Short name for nav, breadcrumbs and cross-links. */
  name: string;
  /** h1 label: the service and "Leonardtown, MD". */
  label: string;
  headline: string;
  title: string;
  description: string;
  heroPhoto: PhotoKey;
  heroPosition?: string;
  whatItIs: string;
  gallery: PhotoKey[];
  /** /work?filter= slug for "see more like this". */
  workFilter: string;
  workFilterLabel: string;
  /** Consult Builder pre-selects. */
  looks: string[];
  hairNow?: string;
  planLabel: string;
  expect: Expect[];
  faqs: Faq[];
  ctaPhoto: PhotoKey;
  /** Closing headline for this page. */
  ctaTitle: { lead: string; accent: string };
  /** schema.org Service */
  serviceType: string;
};

const consultExpect: Expect = {
  title: "A free consultation first.",
  body: `Text CONSULTATION to ${business.phoneDisplay}, or use the planner. Bring your hair history and your inspiration.`,
};
const oneChair: Expect = {
  title: "One client at a time.",
  body: "A private, one-chair studio in Leonardtown. It is just you, her color brushes and the lemons.",
};
const pricing: Expect = {
  title: "Pricing at the consult.",
  body: "Pricing depends on your hair and the look, and is quoted at your free consultation.",
};

export const servicePages: ServicePage[] = [
  {
    slug: "vivid-hair-color",
    hubId: "vivid-color",
    name: "Vivid hair color",
    label: "Vivid hair color in Leonardtown, MD",
    headline: "Rainbows, melts and panels. Her specialty.",
    title: "Vivid Hair Color in Leonardtown, MD | Disco Lemonade Studio",
    description:
      "Rainbows, melts, panels and reds by Mickayla Ramsey at Disco Lemonade Studio in Leonardtown, MD. See her real work and plan a free vivid consultation.",
    heroPhoto: "melt",
    whatItIs:
      "Vivids are what she is known for: full rainbows, color melts, high-contrast panels, peekaboos and reds. Every one is painted by hand, in sections, and planned with you at a free consultation before a single brush comes out.",
    gallery: ["fire", "shego", "colorBlock", "hiddenRainbow", "closeup"],
    workFilter: "vivids",
    workFilterLabel: "See every vivid in the gallery",
    looks: ["Full rainbow"],
    planLabel: "Plan my vivid",
    expect: [
      consultExpect,
      { title: "Plan for a long day.", body: business.sessionLine, draft: "confirm typical session lengths" },
      oneChair,
      pricing,
    ],
    faqs: [
      {
        q: "How long does a vivid take?",
        a: "It depends on the look and where your hair starts. Big transformations in her chair have run 6 to 9 hours, and the biggest took two days. You will get a real estimate at your consult.",
        draft: "confirm typical session lengths",
      },
      {
        q: "Does my hair need to be lightened first?",
        a: "Most vivids show their true color on a lightened base. Whether yours needs it, and how much, is decided at the free consultation.",
        draft: "confirm with Mickayla",
      },
      {
        q: "How do I keep my vivid bright?",
        a: "Her four rules: cold water, the colder the better. Wash less and make friends with dry shampoo. Heat protectant every single time. Turn the hot tools down.",
      },
      {
        q: "Can I be a vivid model?",
        a: "She takes vivid models. You will need virgin or pre-lightened hair, to give her full creative control, to be happy to sit a while, and to be comfortable on camera.",
        draft: "confirm the model call is still open",
      },
    ],
    ctaPhoto: "closeup",
    ctaTitle: { lead: "Ready to go", accent: "loud?" },
    serviceType: "Vivid hair color",
  },
  {
    slug: "lived-in-color-balayage",
    hubId: "lived-in-color",
    name: "Balayage and lived-in color",
    label: "Balayage and lived-in color in Leonardtown, MD",
    headline: "Vanilla, done obsessively.",
    title: "Balayage and Lived-in Color, Leonardtown MD | Disco Lemonade",
    description:
      "Brunette dimension, caramel balayage and soft grow-out from a vivid specialist who loves vanilla hair too. Free consultation in Leonardtown, MD.",
    heroPhoto: "firstColor",
    heroPosition: "50% 30%",
    whatItIs:
      "Lived-in color is dimension that looks like you on a very good day: rich brunette, caramel, honey and balayage that grows out softly. She calls it vanilla hair, and it is the other half of her answer: vanilla or otherwise.",
    gallery: ["vanilla", "softBrunette"],
    workFilter: "lived-in",
    workFilterLabel: "See every lived-in look in the gallery",
    looks: ["Vanilla"],
    planLabel: "Plan my lived-in color",
    expect: [
      consultExpect,
      { title: "Made to grow out.", body: "Dimension and balayage placed to grow out gracefully, so the in-between looks intentional." },
      oneChair,
      pricing,
    ],
    faqs: [
      {
        q: "How does lived-in color grow out?",
        a: "Softly, by design. The dimension is placed so the grow-out reads as part of the look, not as a line. Ask her how long yours can go between visits at the consult.",
        draft: "confirm with Mickayla",
      },
      {
        q: "Can I go darker for fall?",
        a: "Yes, bring it to your consult. Rich chocolate brunette with soft caramel, like the first ever color on this page, is very much on the menu.",
        draft: "confirm with Mickayla",
      },
      {
        q: "Is a first ever color okay?",
        a: "Yes. Her post of 14 November 2026 is a client's first ever color, and she wrote that being trusted with it will forever feel so special to her.",
      },
    ],
    ctaPhoto: "firstColor",
    ctaTitle: { lead: "Vanilla, whenever", accent: "you are." },
    serviceType: "Balayage and lived-in hair color",
  },
  {
    slug: "blonding-and-silver",
    hubId: "blonding-and-silver",
    name: "Blonding and silver",
    label: "Blonding and silver hair in Leonardtown, MD",
    headline: "Barbie blonde to icy silver.",
    title: "Blonding and Silver Hair in Leonardtown, MD | Disco Lemonade",
    description:
      "Bright Barbie blondes, icy silver and soft roots by Mickayla Ramsey at Disco Lemonade Studio, Leonardtown, MD. Plan it at a free consultation.",
    heroPhoto: "silver",
    heroPosition: "50% 45%",
    whatItIs:
      "Bright blondes, Barbie blondes, icy silver and soft roots, and blonde with a secret pop of pink. Blonding is planned around where your hair starts today, so it begins with a free consultation.",
    gallery: ["barbie", "dipped"],
    workFilter: "blondes-and-silver",
    workFilterLabel: "See every blonde and silver in the gallery",
    looks: ["Blonding or silver"],
    planLabel: "Plan my blonde",
    expect: [
      consultExpect,
      { title: "Your hair history matters.", body: "What is on your hair now decides the plan. Be honest at the consult: it changes the plan, not the welcome." },
      oneChair,
      pricing,
    ],
    faqs: [
      {
        q: "Can you lift dark hair to blonde?",
        a: "Often, and sometimes over more than one visit. Where your hair starts decides it, so bring your color history to the consult.",
        draft: "confirm with Mickayla",
      },
      {
        q: "How long does blonding take?",
        a: "It depends on your hair and the look. Timing is quoted at your free consultation, along with the price.",
      },
      {
        q: "Do you do silver?",
        a: "Yes. Silver gray and icy silver are on the menu. The close up at the top of this page is her work.",
      },
    ],
    ctaPhoto: "barbie",
    ctaTitle: { lead: "Bright and sunny", accent: "starts with a text." },
    serviceType: "Hair blonding and silver hair color",
  },
  {
    slug: "color-correction",
    hubId: "color-corrections",
    name: "Color correction",
    label: "Color correction in Leonardtown, MD",
    headline: "Box dye, old color, a whole new direction.",
    title: "Color Correction in Leonardtown, MD | Disco Lemonade Studio",
    description:
      "Box dye, old color or a whole new direction. Start with a free consultation at Disco Lemonade Studio, 26011 Point Lookout Rd #3, Leonardtown, MD.",
    heroPhoto: "beforeAfter",
    whatItIs:
      "Box dye at home, color you have grown tired of, or a whole new direction. A correction starts with an honest look at your hair's history and a plan you agree on together, at a free consultation.",
    gallery: [],
    workFilter: "reds",
    workFilterLabel: "See her reds and the before and after in the gallery",
    looks: ["Correction or big change"],
    hairNow: "Box dye at home",
    planLabel: "Plan my correction",
    expect: [
      consultExpect,
      { title: "No judgement.", body: "Box dye counts as history, not a confession. Tell her everything: it changes the plan, not the welcome." },
      oneChair,
      pricing,
    ],
    faqs: [
      { q: "Can you fix box dye?", a: "Often, and the consult decides how.", draft: "confirm with Mickayla" },
      { q: "Will it take more than one visit?", a: "Sometimes. She will tell you at the consult.", draft: "confirm with Mickayla" },
      {
        q: "What should I bring to the consult?",
        a: "Your honest color history, box dye included, and photos of the hair you want.",
      },
    ],
    ctaPhoto: "fire",
    ctaTitle: { lead: "Box dye? Old color?", accent: "Start with a text." },
    serviceType: "Hair color correction",
  },
];

export const serviceBySlug = (slug: string) => servicePages.find((s) => s.slug === slug);
export const serviceByHubId = (id: string) => servicePages.find((s) => s.hubId === id);
