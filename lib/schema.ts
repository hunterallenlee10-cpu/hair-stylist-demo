// Structured data. Only true things: no ratings, reviews, prices, hours,
// founding dates or awards until the owner confirms them.
import { business, services } from "./business";
import { faqs } from "./faq";
import { absoluteUrl } from "./site";

const salonId = () => absoluteUrl("/#salon");

export function salonSchema() {
  const a = business.address;
  return {
    "@type": "HairSalon",
    "@id": salonId(),
    name: business.name,
    alternateName: business.shortName,
    description:
      "Private one-chair hair color studio in Leonardtown, Maryland, specializing in vivid and rainbow hair color, with lived-in color, blonding and cuts. Every new client starts with a free consultation.",
    url: absoluteUrl("/"),
    telephone: business.phoneE164,
    logo: absoluteUrl("/logo.png"),
    image: [absoluteUrl("/og-image.png"), absoluteUrl("/images/01-hot-pink-violet-blue-melt-back-BEST.webp")],
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    // Source: OpenStreetMap Nominatim, see lib/business.ts
    geo: { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${business.geo.latitude},${business.geo.longitude}`,
    areaServed,
    sameAs: [business.instagramUrl],
    founder: { "@type": "Person", name: business.owner, jobTitle: business.ownerTitle },
    knowsAbout: ["Vivid hair color", "Rainbow hair", "Color melts", "Balayage", "Blonding", "Color correction"],
  };
}

/** Hub: every service as an OfferCatalog on the salon, pointing at its own page where one exists. */
export function serviceCatalogSchema(pageFor: (hubId: string) => string | undefined) {
  return {
    "@type": "OfferCatalog",
    "@id": absoluteUrl("/services#catalog"),
    name: "Hair color services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        serviceType: s.schemaDescription,
        description: s.blurb,
        url: absoluteUrl(pageFor(s.id) ?? `/services#${s.id}`),
        provider: { "@id": salonId() },
        areaServed,
      },
    })),
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl("/new-here#faq"),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: business.name,
    publisher: { "@id": salonId() },
    inLanguage: "en-US",
  };
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [salonSchema(), websiteSchema()],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Sub-page graph: the salon, a breadcrumb, and anything page-specific (services, FAQ). */
export function pageSchema(name: string, path: string, extra: object[] = [], parents: Crumb[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [salonSchema(), breadcrumbSchema([...parents, { name, path }]), ...extra],
  };
}

const areaServed = [
  { "@type": "City", name: "Leonardtown, MD" },
  { "@type": "AdministrativeArea", name: "St. Mary's County, MD" },
  { "@type": "Place", name: "Southern Maryland" },
];

/** One service page's Service node. No price, no rating. */
export function servicePageSchema(s: { slug: string; name: string; serviceType: string; description: string; heroSrc: string }) {
  const url = absoluteUrl(`/services/${s.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url,
    image: absoluteUrl(s.heroSrc),
    provider: { "@id": salonId() },
    areaServed,
  };
}
