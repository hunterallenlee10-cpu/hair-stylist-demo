import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { ArrowRight, Scissors, Sparkles, WandSparkles } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { Draft } from "@/components/Draft";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, services, type ServiceId } from "@/lib/business";
import { photos, type PhotoKey } from "@/lib/photos";
import { serviceByHubId, servicePages } from "@/lib/services";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

const svc = (id: ServiceId) => services.find((s) => s.id === id)!;
/** Panels and peekaboos live on the vivid page. */
const pageFor = (id: ServiceId) => serviceByHubId(id === "panels-and-peekaboos" ? "vivid-color" : id);

function Photo({ k, sizes, position = "50% 50%", first = false }: { k: PhotoKey; sizes: string; position?: string; first?: boolean }) {
  const p = photos[k];
  return (
    <Image
      src={p.src}
      alt={p.alt}
      width={p.width}
      height={p.height}
      sizes={sizes}
      {...(first ? { preload: true, fetchPriority: "high" as const } : { loading: "lazy" as const })}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
      style={{ objectPosition: position }}
    />
  );
}

/**
 * A bento tile. The title links to the service's own page (stretched over the
 * whole tile); the small round button opens the planner with it pre-selected.
 * The id is v1's, so old /services#... links still land here.
 */
function Tile({ id, className = "", media, icon, big = false }: { id: ServiceId; className?: string; media?: ReactNode; icon?: ReactNode; big?: boolean }) {
  const s = svc(id);
  const page = pageFor(id);
  const href = page ? `/services/${page.slug}` : id === "hair-gems" ? "#sparkly-things" : "#shags-and-shullets";
  return (
    <article
      id={s.id}
      className={`group relative flex scroll-mt-[calc(var(--nav-h)+24px)] flex-col gap-5 rounded-[20px] border border-line bg-surface p-5 transition-colors hover:border-[#4a3a3f] sm:p-6 ${className}`}
    >
      {media}
      {icon && (
        <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-bg text-ink transition-colors group-hover:text-accent">
          {icon}
        </span>
      )}
      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <h2 className={`display font-[800] text-ink ${big ? "text-h2" : "text-h3"}`}>
            <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px] hover:text-accent">
              {s.name}
            </Link>
          </h2>
          <p className={`mt-2 text-muted ${big ? "max-w-[26rem] text-lead" : ""}`}>{s.blurb}</p>
          <p aria-hidden="true" className="mt-3 inline-flex items-center gap-1.5 text-label font-semibold text-ink">
            {id === "panels-and-peekaboos" ? "On the vivid page" : page ? "See the page" : "More below"}
            <ArrowRight className="h-4 w-4 text-accent" strokeWidth={2.25} />
          </p>
        </div>
        <PlanButton
          preset={{ looks: [s.builder] }}
          className="relative z-10 inline-flex min-h-[48px] shrink-0 items-center rounded-full border border-line bg-bg px-4 text-label font-semibold text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
          aria-label={`Plan ${s.name.toLowerCase()}`}
        >
          Plan it
        </PlanButton>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <>
      <section aria-label="Color services" className="pb-6 lg:pb-10">
        <div className={container}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Tile
              id="vivid-color"
              big
              className="sm:col-span-2 lg:row-span-2"
              media={
                <ViewTransition name="service-photo-vivid-hair-color" share="morph" default="none">
                  <WavyFrame clipClass="wave-landscape" band="md" className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-[320px] lg:flex-1">
                    <Photo first k="melt" sizes="(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw" position="50% 30%" />
                  </WavyFrame>
                </ViewTransition>
              }
            />
            <Tile
              id="panels-and-peekaboos"
              className="lg:row-span-2"
              media={
                <WavyFrame clipClass="wave-portrait" band="plain" className="aspect-[1357/1721] w-full lg:aspect-auto lg:min-h-[320px] lg:flex-1">
                  <Photo k="fire" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" />
                </WavyFrame>
              }
            />
            <Tile
              id="lived-in-color"
              media={
                <WavyFrame shape="wide" band="plain" className="w-full">
                  <Photo k="softBrunette" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" position="50% 50%" />
                </WavyFrame>
              }
            />
            <Tile id="color-corrections" icon={<WandSparkles className="h-6 w-6" strokeWidth={1.75} />} />
            <Tile
              id="blonding-and-silver"
              className="sm:col-span-2"
              media={
                <div className="grid grid-cols-2 gap-4">
                  <ViewTransition name="service-photo-blonding-and-silver" share="morph" default="none">
                    <WavyFrame shape="square" band="plain" className="w-full">
                      <Photo k="silver" sizes="(min-width: 1024px) 300px, 45vw" position="50% 45%" />
                    </WavyFrame>
                  </ViewTransition>
                  <WavyFrame shape="square" band="plain" className="w-full">
                    <Photo k="barbie" sizes="(min-width: 1024px) 300px, 45vw" position="50% 55%" />
                  </WavyFrame>
                </div>
              }
            />
            <Tile
              id="hair-gems"
              media={
                <WavyFrame shape="landscape" band="plain" className="w-full">
                  <Photo k="gems" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" position="50% 25%" />
                </WavyFrame>
              }
            />
            <Tile id="cuts" icon={<Scissors className="h-6 w-6" strokeWidth={1.75} />} />
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 lg:flex-row lg:items-baseline lg:justify-between">
            <p className="text-muted">{business.pricingLine}</p>
            <p className="text-muted">
              <span className="text-ink">Color lines you will see in her formulas:</span>{" "}
              <Draft note="confirm brand list">{business.colorLines.join(", ")}.</Draft>
            </p>
          </div>
        </div>
      </section>

      <SparklyAndCuts />

      <section aria-labelledby="pages-title" className="pt-[72px] lg:pt-[96px]">
        <div className={container}>
          <h2 id="pages-title" className="display text-h3 font-[800] text-ink">
            Each color service has its own page
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {servicePages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="group flex min-h-[64px] items-center justify-between gap-3 rounded-[16px] border border-line bg-surface px-5 py-4 font-semibold text-ink transition-colors hover:border-accent"
                >
                  {p.name}
                  <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** Sparkly things and Shags and shullets, in full. Not enough real material yet for pages of their own. */
function SparklyAndCuts() {
  return (
    <section aria-label="Sparkly things and cuts" className="mt-12 border-y border-line bg-[#160F12] py-[72px] lg:py-[104px]">
      <div className={`${container} grid gap-14 lg:grid-cols-2 lg:gap-20`}>
        <div id="sparkly-things" className="scroll-mt-[calc(var(--nav-h)+24px)]">
          <h2 className="display text-h2 font-[800] text-ink">Sparkly things.</h2>
          <p className="mt-5 max-w-[34rem] text-lead text-muted">
            Hair gems for holidays, parties and no reason at all. Stick-on gems, stars and flowers, on their own or on top of
            fresh color, like the emerald green above.
          </p>
          <PlanButton preset={{ looks: ["Sparkly things"] }} className={`${btnPrimary} mt-8`}>
            <Sparkles className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            Plan some sparkle
          </PlanButton>
        </div>
        <div id="shags-and-shullets" className="scroll-mt-[calc(var(--nav-h)+24px)]">
          <h2 className="display text-h2 font-[800] text-ink">Shags and shullets.</h2>
          <p className="mt-5 max-w-[34rem] text-lead text-muted">
            Shaggy, lived-in cuts made for color. Ask about one when you plan your color.
          </p>
          <p aria-hidden="true" className="display mt-5 text-h3 font-[700] italic text-muted">
            shag + mullet <span className="text-accent">= shullet</span>
          </p>
          <PlanButton preset={{ looks: ["Cut"] }} className={`${btnGhost} mt-8`}>
            <Scissors className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            Plan a cut
          </PlanButton>
        </div>
      </div>
    </section>
  );
}
