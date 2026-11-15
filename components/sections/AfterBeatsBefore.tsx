import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoGrid } from "@/components/Gallery/PhotoGrid";
import { entriesFor } from "@/lib/gallery";
import { btnGhost, container, sectionPad, textLink } from "@/lib/ui";

/**
 * Home: "After beats before", led by her real before and after (photo 15,
 * shown as she made it), with six more looks in a tight grid beside it.
 */
export function AfterBeatsBefore() {
  return (
    <section aria-labelledby="abb-title" className={sectionPad}>
      <div className={container}>
        <SectionHeading id="abb-title" kicker="The work" title="After beats before.">
          Every photo is her own work, painted by hand in Leonardtown.
        </SectionHeading>

        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <figure className="mx-auto w-full max-w-[520px]">
            <PhotoGrid
              entries={entriesFor(["beforeAfter"])}
              shape="portrait"
              band="md"
              sizes="(min-width: 1024px) 520px, 90vw"
              positions={{ beforeAfter: "50% 50%" }}
            />
            <figcaption className="display mt-4 text-h3 font-[600] italic text-ink">
              Her before and after. <span className="text-muted">Same client, one color day.</span>
            </figcaption>
          </figure>

          <div>
            <PhotoGrid
              entries={entriesFor(["fire", "ribbons", "closeup", "shego", "gems", "firstColor"])}
              shape="portrait"
              className="grid-cols-3 gap-3 sm:gap-5"
              sizes="(min-width: 1024px) 220px, 31vw"
              positions={{ gems: "50% 30%", closeup: "50% 30%" }}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <Link href="/work" className={`${btnGhost} w-full sm:w-auto`}>
                See all 18 looks <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <Link href="/services" className={textLink}>
                See what she paints
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
