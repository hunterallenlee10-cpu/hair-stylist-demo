import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { PageShell, PageTitle } from "@/components/PageShell";
import { WavyFrame } from "@/components/WavyFrame";
import { Draft } from "@/components/Draft";
import { SectionHeading } from "@/components/SectionHeading";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { PhotoGrid } from "@/components/Gallery/PhotoGrid";
import { FaqList } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { FirstColorQuote, ServiceExtras } from "@/components/service/ServiceExtras";
import { business, smsHref } from "@/lib/business";
import { entriesFor } from "@/lib/gallery";
import { pageMeta } from "@/lib/meta";
import { photos } from "@/lib/photos";
import { pageSchema, servicePageSchema } from "@/lib/schema";
import { serviceBySlug, servicePages } from "@/lib/services";
import { btnGhost, btnPrimary, container, sectionPad, textLink } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  const p = photos[s.heroPhoto];
  return pageMeta({
    title: s.title,
    description: s.description,
    path: `/services/${s.slug}`,
    image: { url: p.src, width: p.width, height: p.height, alt: p.alt },
  });
}

/** One template for the four service pages, driven by lib/services.ts. */
export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const hero = photos[s.heroPhoto];
  const others = servicePages.filter((o) => o.slug !== s.slug);
  const preset = { looks: s.looks, hairNow: s.hairNow };
  const price = business.pricing[s.slug as keyof typeof business.pricing]?.fromPrice;

  return (
    <PageShell
      ctaPhoto={s.ctaPhoto}
      schema={pageSchema(
        s.name,
        path,
        [servicePageSchema({ slug: s.slug, name: s.name, serviceType: s.serviceType, description: s.description, heroSrc: hero.src })],
        [{ name: "Services", path: "/services" }],
      )}
    >
      {/* Hero: the page's own photo in the mirror. */}
      <section aria-labelledby="service-title" className="pb-14 pt-4 lg:pb-20 lg:pt-8">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16`}>
          <div>
            <Breadcrumbs trail={[{ name: "Services", path: "/services" }, { name: s.name, path }]} />
            <div className="mt-4">
              <PageTitle id="service-title" eyebrow={s.label} title={s.headline} />
            </div>
            <h2 className="sr-only">What it is</h2>
            <p className="mt-6 max-w-[38rem] text-lead text-muted">{s.whatItIs}</p>
            {s.slug === "lived-in-color-balayage" && <FirstColorQuote />}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlanButton preset={preset} className={`${btnPrimary} w-full sm:w-auto`}>
                {s.planLabel} <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              </PlanButton>
              <a href={smsHref()} className={`${btnGhost} w-full px-5 sm:w-auto`}>
                <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                <span>
                  Text CONSULTATION to <span className="whitespace-nowrap">{business.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px]">
            <div className="rotate-2">
              <WavyFrame shape="portrait">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  width={hero.width}
                  height={hero.height}
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 320px"
                  preload
                  className="h-full w-full object-cover"
                  style={{ objectPosition: s.heroPosition ?? "50% 50%" }}
                />
              </WavyFrame>
            </div>
            <figcaption className="mt-4 text-center text-[0.9375rem] text-muted">{hero.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* Her work for this service. */}
      {s.gallery.length > 1 && (
        <section aria-labelledby="row-title" className={`${sectionPad} border-t border-line`}>
          <div className={container}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading id="row-title" kicker="The work" title="Painted by hand in Leonardtown." />
              <Link href={`/work?filter=${s.workFilter}`} className={`${textLink} shrink-0`}>
                {s.workFilterLabel} <ArrowUpRight className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
            <PhotoGrid
              entries={entriesFor(s.gallery)}
              layout="row"
              className={`mt-10 sm:gap-6 ${s.gallery.length > 3 ? "sm:grid-cols-3 lg:grid-cols-5" : "sm:max-w-[820px] sm:grid-cols-2"}`}
              sizes={s.gallery.length > 3 ? "(min-width: 1024px) 250px, (min-width: 640px) 30vw, 62vw" : "(min-width: 640px) 400px, 62vw"}
            />
          </div>
        </section>
      )}

      <ServiceExtras slug={s.slug} />

      {/* What to expect: real facts only. */}
      <section aria-labelledby="expect-title" className={`${sectionPad} border-t border-line`}>
        <div className={container}>
          <SectionHeading id="expect-title" kicker="What to expect" title="Before your first brushstroke." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.expect.map((e) => (
              <li key={e.title} className="rounded-[20px] border border-line bg-surface p-6">
                <h3 className="display text-h3 font-[800] text-ink">{e.title}</h3>
                <p className="mt-2 text-muted">{e.draft ? <Draft note={e.draft}>{e.body}</Draft> : e.body}</p>
              </li>
            ))}
          </ul>
          {/* Pricing slot: shown only when lib/business.ts holds a confirmed price. */}
          {price != null && (
            <p className="mt-6 text-lead text-ink">
              From ${price}. {business.pricingLine}
            </p>
          )}
          {s.slug === "color-correction" && (
            <div className="mt-8">
              <PlanButton preset={preset} className={btnPrimary}>
                Start with box dye at home <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              </PlanButton>
            </div>
          )}
        </div>
      </section>

      {/* Questions unique to this page. */}
      <section aria-labelledby="faq-title" className={`${sectionPad} border-t border-line`}>
        <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <SectionHeading id="faq-title" kicker="Questions" title={`About ${s.name.toLowerCase()}.`}>
            Anything else, text it. She would rather you ask.
          </SectionHeading>
          <FaqList items={s.faqs} />
        </div>
      </section>

      {/* The other three pages, and the hub. */}
      <nav aria-labelledby="more-title" className="border-t border-line pt-[72px] lg:pt-[96px]">
        <div className={container}>
          <h2 id="more-title" className="display text-h3 font-[800] text-ink">
            More of what she paints
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] border border-line bg-surface px-5 py-4 font-semibold text-ink transition-colors hover:border-accent"
                >
                  {o.name}
                  <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="group flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] border border-line px-5 py-4 font-semibold text-ink transition-colors hover:border-accent"
              >
                Every service, cuts and sparkly things too
                <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </PageShell>
  );
}
