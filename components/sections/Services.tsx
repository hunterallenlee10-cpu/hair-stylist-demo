import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Scissors, WandSparkles } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, services, type ServiceId } from "@/lib/business";
import { photos, type PhotoKey } from "@/lib/photos";
import { container } from "@/lib/ui";

const svc = (id: ServiceId) => services.find((s) => s.id === id)!;

function Photo({
  k,
  sizes,
  position = "50% 50%",
  first = false,
}: {
  k: PhotoKey;
  sizes: string;
  position?: string;
  /** The first photo on the page is the LCP image: preload it instead of lazy-loading. */
  first?: boolean;
}) {
  const p = photos[k];
  return (
    <Image
      src={p.src}
      alt={p.alt}
      width={p.width}
      height={p.height}
      sizes={sizes}
      {...(first ? { preload: true, fetchPriority: "high" as const } : { loading: "lazy" as const })}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      style={{ objectPosition: position }}
    />
  );
}

/** A bento tile. The whole tile is clickable through one real <button> stretched over it. */
function Tile({
  id,
  className = "",
  media,
  icon,
  big = false,
}: {
  id: ServiceId;
  className?: string;
  media?: ReactNode;
  icon?: ReactNode;
  big?: boolean;
}) {
  const s = svc(id);
  return (
    <article
      id={s.id}
      className={`group relative flex flex-col gap-5 rounded-[20px] border border-line bg-surface p-5 transition-colors hover:border-[#4a3a3f] sm:p-6 ${className}`}
    >
      {media}
      {icon && (
        <span
          aria-hidden="true"
          className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-bg text-ink transition-colors group-hover:text-accent"
        >
          {icon}
        </span>
      )}
      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <h2 className={`display font-[800] leading-[1.02] text-ink ${big ? "text-[2rem] sm:text-[2.75rem]" : "text-[1.625rem]"}`}>
            {s.name}
          </h2>
          <p className={`mt-2 text-muted ${big ? "max-w-[26rem] text-lg" : ""}`}>{s.blurb}</p>
        </div>
        <PlanButton
          preset={{ looks: [s.builder] }}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors after:absolute after:inset-0 after:rounded-[20px] group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
          aria-label={`Plan ${s.name.toLowerCase()}`}
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
        </PlanButton>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section aria-label="Services" className="pb-6 lg:pb-10">
      <div className={container}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]">
          <Tile
            id="vivid-color"
            big
            className="sm:col-span-2 lg:row-span-2"
            media={
              <WavyFrame shape="landscape" className="w-full">
                <Photo first k="melt" sizes="(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw" position="50% 88%" />
              </WavyFrame>
            }
          />
          <Tile
            id="panels-and-peekaboos"
            className="lg:row-span-2"
            media={
              <WavyFrame shape="portrait" className="w-full">
                <Photo k="shego" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" />
              </WavyFrame>
            }
          />
          <Tile
            id="lived-in-color"
            media={
              <WavyFrame shape="wide" className="w-full">
                <Photo k="vanilla" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" position="50% 40%" />
              </WavyFrame>
            }
          />
          <Tile id="color-corrections" icon={<WandSparkles className="h-6 w-6" strokeWidth={1.75} />} />
          <Tile
            id="blonding-and-silver"
            className="sm:col-span-2"
            media={
              <div className="grid grid-cols-2 gap-4">
                <WavyFrame shape="square" className="w-full">
                  <Photo k="silver" sizes="(min-width: 1024px) 300px, 45vw" position="50% 45%" />
                </WavyFrame>
                <WavyFrame shape="square" className="w-full">
                  <Photo k="barbie" sizes="(min-width: 1024px) 300px, 45vw" position="50% 55%" />
                </WavyFrame>
              </div>
            }
          />
          <Tile
            id="hair-gems"
            media={
              <WavyFrame shape="landscape" className="w-full">
                <Photo k="gems" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" position="50% 25%" />
              </WavyFrame>
            }
          />
          <Tile
            id="cuts"
            icon={<Scissors className="h-6 w-6" strokeWidth={1.75} />}
            media={
              <p aria-hidden="true" className="display order-last text-[1.75rem] italic leading-tight text-muted lg:order-none lg:mt-6">
                shag + mullet
                <br />= shullet
              </p>
            }
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 lg:flex-row lg:items-baseline lg:justify-between">
          <p className="text-muted">
            Pricing is quoted at your free consultation, because every head of hair starts somewhere different.
          </p>
          {/* DRAFT: confirm brand list */}
          <p className="text-muted">
            <span className="text-ink">Color lines you will see in her formulas:</span> {business.colorLines.join(", ")}.
          </p>
        </div>
      </div>
    </section>
  );
}
