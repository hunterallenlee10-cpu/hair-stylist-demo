import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WavyFrame } from "@/components/WavyFrame";
import { photos, type PhotoKey } from "@/lib/photos";
import { btnGhost, container, sectionPad, textLink } from "@/lib/ui";

// Three pieces the dial above does not show. The full set lives on /work.
const picks: Array<{ photo: PhotoKey; label: string }> = [
  { photo: "gems", label: "Sparkly things" },
  { photo: "silver", label: "Silver" },
  { photo: "barbie", label: "Barbie blonde" },
];

/** Home page teaser: a small, named set of work, then out to the gallery. */
export function WorkTeaser() {
  return (
    <section aria-labelledby="work-teaser-title" className={sectionPad}>
      <div className={container}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="work-teaser-title" kicker="The work" title="After beats before." />
          <div className="hidden shrink-0 sm:block">
            <Link href="/work" className={btnGhost}>
              See all the work <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Phone: one swipeable row, so the block stays about a screen tall. */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:mt-14 lg:gap-10 [&::-webkit-scrollbar]:hidden">
          {picks.map(({ photo, label }, i) => {
            const p = photos[photo];
            return (
              <li key={photo} className={`w-[68%] shrink-0 snap-center sm:w-auto ${i === 1 ? "sm:mt-12" : ""}`}>
                <figure>
                  <Link href="/work" className="group block" aria-label={`${label}: see it in the gallery`}>
                    <WavyFrame shape="portrait">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 30vw, 68vw"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </WavyFrame>
                  </Link>
                  <figcaption className="display mt-4 text-[1.375rem] font-[700] italic text-ink">{label}</figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-2 sm:mt-12 sm:flex-row sm:items-center sm:gap-8">
          <div className="sm:hidden">
            <Link href="/work" className={`${btnGhost} w-full`}>
              See all the work <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
          <Link href="/services" className={textLink}>
            See what she paints
          </Link>
        </div>
      </div>
    </section>
  );
}
