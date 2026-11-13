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
    areaServed: [
      { "@type": "City", name: "Leonardtown, MD" },
      { "@type": "AdministrativeArea", name: "St. Mary's County, MD" },
      { "@type": "Place", name: "Southern Maryland" },
    ],
    sameAs: [business.instagramUrl],
    founder: { "@type": "Person", name: business.owner, jobTitle: business.ownerTitle },
    knowsAbout: ["Vivid hair color", "Rainbow hair", "Color melts", "Balayage", "Blonding", "Color correction"],
  };
}

export function serviceSchemas() {
  return services.map((s) => ({
    "@type": "Service",
    "@id": absoluteUrl(`/#${s.id}`),
    name: s.name,
    serviceType: s.schemaDescription,
    description: s.blurb,
    url: absoluteUrl(`/#${s.id}`),
    provider: { "@id": salonId() },
    areaServed: { "@type": "City", name: "Leonardtown, MD" },
  }));
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
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
    "@graph": [salonSchema(), websiteSchema(), ...serviceSchemas(), faqSchema()],
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      salonSchema(),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Contact", item: absoluteUrl("/contact") },
        ],
      },
    ],
  };
}
