// Every business fact used on the site lives here. Source of truth: Mickayla's
// Instagram profile and posts (@the__chaospixie). No Google Business Profile
// was found. Edit here, not in the components.

export const business = {
  name: "Disco Lemonade Studio",
  shortName: "Disco Lemonade",
  owner: "Mickayla Ramsey",
  ownerTitle: "Hairstylist",
  instagramNameLine: "Mickayla Ramsey | Southern Maryland Hairstylist",
  tagline: "Specializing in vivids and rainbows",

  phoneDisplay: "(240) 561-8519",
  phoneE164: "+12405618519",
  // Her bio, word for word.
  bookingInstruction: "New here? Text CONSULTATION to (240)-561-8519",

  address: {
    street: "26011 Point Lookout Rd #3",
    city: "Leonardtown",
    region: "MD",
    regionName: "Maryland",
    postalCode: "20650",
    country: "US",
    county: "St. Mary's County",
    area: "Southern Maryland",
  },
  // Coordinates for 26011 Point Lookout Rd, Leonardtown, MD 20650.
  // Source: OpenStreetMap Nominatim house point (way 1313047365), looked up
  // 2026-11-13. The US Census Bureau geocoder (Public_AR_Current) places the
  // same address at 38.30386, -76.65572, about 150 m away on the road line.
  geo: { latitude: 38.3046426, longitude: -76.6570381 },

  // DRAFT: confirm working days and hours
  hours: "By appointment",

  instagramUrl: "https://www.instagram.com/the__chaospixie/",
  instagramHandle: "@the__chaospixie",
  giftCardUrl: "https://squareup.com/gift/C8NTNQN8RN9TG/order",

  // DRAFT: confirm years. 2016 was her "first full year of doing hair".
  firstFullYear: 2016,
  experienceLine: "about a decade of color",

  // DRAFT: confirm brand list. Brands she tags in her own formulas. Not a
  // certification, educator or ambassador claim.
  colorLines: ["Danger Jones", "Pravana", "Joico Color Intensity", "Moroccanoil", "K18"],

  // DRAFT: confirm typical session lengths
  sessionLine: "Big transformations in her chair have run 6 to 9 hours.",

  studioQuote: "It's just me, my color brushes, and my lemons against the world.",

  // Her vivid care rules, paraphrased closely from her own post.
  careRules: [
    { title: "Cold water.", body: "The colder the better." },
    { title: "Wash less.", body: "Make friends with dry shampoo." },
    { title: "Heat protectant.", body: "Every single time." },
    { title: "Turn the hot tools down.", body: "" },
  ],

  // DRAFT: confirm the model call is still open
  modelRequirements: [
    "Virgin or pre-lightened hair",
    "Full creative control for her",
    "Happy to sit a while",
    "Comfortable on camera",
  ],
} as const;

const a = business.address;
export const fullAddress = `${a.street}, ${a.city}, ${a.regionName} ${a.postalCode}`;
export const addressLine1 = a.street;
export const addressLine2 = `${a.city}, ${a.regionName} ${a.postalCode}`;

export const telHref = `tel:${business.phoneE164}`;
export function smsHref(body = "CONSULTATION") {
  // "?&body=" works on both iOS and Android.
  return `sms:${business.phoneE164}?&body=${encodeURIComponent(body)}`;
}
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${business.name}, ${fullAddress}`,
)}&z=15&output=embed`;

export const services = [
  {
    id: "vivid-color",
    name: "Vivids and rainbows",
    blurb: "Melts, full rainbows and one-of-a-kind color.",
    schemaDescription: "Vivid and rainbow hair color, color melts and color blocking.",
    builder: "Full rainbow",
  },
  {
    id: "panels-and-peekaboos",
    name: "Panels and peekaboos",
    blurb: "Bold color placed where you want it seen, or hidden.",
    schemaDescription: "High-contrast color panels and peekaboo color.",
    builder: "Panels",
  },
  {
    id: "blonding-and-silver",
    name: "Blonding and silver",
    blurb: "Bright blondes, icy silver, soft roots.",
    schemaDescription: "Bright blonding, Barbie blondes and silver.",
    builder: "Blonding or silver",
  },
  {
    id: "lived-in-color",
    name: "Lived-in color",
    blurb: "Dimension and balayage that grows out gracefully.",
    schemaDescription: "Lived-in dimensional color and balayage, plus reds and coppers.",
    builder: "Vanilla",
  },
  {
    id: "color-corrections",
    name: "Corrections and big changes",
    blurb: "Box dye, old color, a whole new direction. Start with a consult.",
    schemaDescription: "Color corrections and big transformations.",
    builder: "Correction or big change",
  },
  {
    id: "cuts",
    name: "Shags and shullets",
    blurb: "Shaggy, lived-in cuts made for color.",
    schemaDescription: "Shag and shullet (shag plus mullet) haircuts.",
    builder: "Cut",
  },
  {
    id: "hair-gems",
    name: "Sparkly things",
    blurb: "Hair gems for holidays, parties and no reason at all.",
    schemaDescription: "Hair gems and sparkle.",
    builder: "Sparkly things",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
