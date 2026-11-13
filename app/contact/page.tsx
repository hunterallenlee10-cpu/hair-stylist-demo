import type { Metadata } from "next";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { ScrollUi } from "@/components/ScrollUi";
import { ConsultForm } from "@/components/ConsultBuilder/ConsultForm";
import { JsonLd } from "@/components/JsonLd";
import { addressLine1, addressLine2, business, directionsUrl, mapEmbedUrl, smsHref, telHref } from "@/lib/business";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, ogImage } from "@/lib/site";
import { container, textLink } from "@/lib/ui";

const title = "Contact Disco Lemonade Studio | Vivid Hair in Leonardtown, MD";
const description =
  "Text CONSULTATION to (240) 561-8519 to plan vivid or natural hair color with Mickayla at Disco Lemonade Studio, 26011 Point Lookout Rd #3, Leonardtown, MD.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Disco Lemonade Studio",
    title,
    description,
    url: absoluteUrl("/contact"),
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
};

const tiles = [
  {
    href: smsHref(),
    icon: MessageCircle,
    label: "Text",
    title: `Text CONSULTATION to ${business.phoneDisplay}`,
    body: "The fastest way in. This is how every new client starts.",
  },
  {
    href: telHref,
    icon: Phone,
    label: "Call",
    title: `Call ${business.phoneDisplay}`,
    body: "If she is mid-color, leave a message and she will call back.",
  },
  {
    href: business.instagramUrl,
    icon: Instagram,
    label: "Instagram",
    title: `Message ${business.instagramHandle} on Instagram`,
    body: "Years of her work, and a DM inbox.",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema()} />
      <Nav />
      <main id="main">
        <section aria-labelledby="contact-title" className="pb-12 pt-10 lg:pb-16 lg:pt-20">
          <div className={container}>
            <h1 id="contact-title">
              <span className="eyebrow block text-muted">
                Contact {business.name}, vivid hair color in Leonardtown, MD
              </span>
              <span className="display mt-4 block text-[2.25rem] font-[800] leading-[0.96] text-ink xs:text-[2.75rem] sm:text-[4.5rem] lg:text-[5.5rem]">
                Text the word <span className="italic text-accent">CONSULTATION.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-[36rem] text-lg text-muted">
              Send it to{" "}
              <a href={smsHref()} className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
                {business.phoneDisplay}
              </a>
              , or plan it right here. Every new look starts with a free consultation.
            </p>

            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {tiles.map((t) => (
                <li key={t.label}>
                  <a
                    href={t.href}
                    {...(t.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 transition-colors hover:border-accent"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-bg text-accent">
                      <t.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="display mt-6 text-[1.5rem] font-[800] leading-tight text-ink group-hover:text-accent">
                      {t.title}
                    </span>
                    <span className="mt-2 text-muted">{t.body}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="planner-title" className="border-y border-line bg-[#160F12] py-[72px] lg:py-[112px]">
          <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
            <div>
              <p className="eyebrow text-muted">The planner</p>
              <h2 id="planner-title" className="display mt-3 text-[2.5rem] font-[800] leading-[0.98] text-ink sm:text-[3.25rem]">
                Plan My Dream Hair.
              </h2>
              <p className="mt-5 text-lg text-muted">
                Five quick steps. At the end you get a ready-to-send text that starts with CONSULTATION, so Mickayla knows
                exactly what you are after.
              </p>
            </div>
            <div className="rounded-[20px] border border-line bg-surface p-5 sm:p-8">
              <ConsultForm headingLevel="h3" />
            </div>
          </div>
        </section>

        <section aria-labelledby="visit-title" className="py-[72px] lg:py-[112px]">
          <div className={`${container} grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10`}>
            <div className="rounded-[20px] border border-line bg-surface p-7 sm:p-8">
              <h2 id="visit-title" className="display text-[2rem] font-[800] leading-tight text-ink">
                Visit the studio
              </h2>
              <address className="mt-5 not-italic text-lg leading-relaxed text-ink">
                {business.name}
                <br />
                {addressLine1}
                <br />
                {addressLine2}
              </address>
              <dl className="mt-6 grid gap-3">
                <div>
                  <dt className="eyebrow text-muted">Hours</dt>
                  {/* DRAFT: confirm working days and hours */}
                  <dd className="mt-1 text-ink">{business.hours}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">Phone</dt>
                  <dd className="mt-1">
                    <a href={telHref} className="text-ink hover:text-accent">
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">Serving</dt>
                  <dd className="mt-1 text-ink">Leonardtown, St. Mary&apos;s County and Southern Maryland</dd>
                </div>
              </dl>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-6`}>
                <MapPin className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                Get directions
              </a>
            </div>
            <div className="min-h-[320px] overflow-hidden rounded-[20px] border border-line bg-surface [clip-path:inset(0_round_20px)]">
              <iframe
                title={`Map showing ${business.name} at ${addressLine1}, ${addressLine2}`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-full min-h-[320px] w-full grayscale-[0.6] invert-[0.9] hue-rotate-180"
              />
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <ScrollUi />
    </>
  );
}
