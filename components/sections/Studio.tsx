import Link from "next/link";
import { MapPin } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { Placeholder } from "@/components/Placeholder";
import { addressLine1, addressLine2, business, directionsUrl } from "@/lib/business";
import { container, textLink } from "@/lib/ui";

export function Studio() {
  return (
    <section aria-label="About the studio" className="pb-[72px] lg:pb-[112px]">
      <div className={`${container} grid items-start gap-14 lg:grid-cols-2 lg:gap-20`}>
        <div className="relative mx-auto w-full max-w-[560px] pb-16 sm:pb-20">
          <WavyFrame shape="portrait" className="w-[86%]">
            <Placeholder label="Photo: the studio, from Disco Lemonade Studio" />
          </WavyFrame>
          <div className="absolute bottom-0 right-0 w-[46%]">
            <div aria-hidden="true" className="wave-square absolute -inset-[8px] bg-bg" />
            <WavyFrame shape="square" className="shadow-soft">
              <Placeholder compact label="Photo: Mickayla, from Disco Lemonade Studio" />
            </WavyFrame>
          </div>
        </div>

        <div>
          <figure>
            <blockquote>
              <p className="display text-[2.25rem] font-[600] italic leading-[1.08] text-ink sm:text-[3rem]">
                &ldquo;{business.studioQuote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-5 font-semibold text-muted">{business.owner}, owner</figcaption>
          </figure>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted">
            {business.name} is a private, one-chair color studio in Leonardtown. Black walls, a hot pink mirror and a lot
            of lemons. One client at a time.
          </p>

          <div className="mt-8 grid gap-6 rounded-[20px] border border-line bg-surface p-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <address className="not-italic leading-relaxed text-ink">
                {addressLine1}
                <br />
                {addressLine2}
              </address>
              {/* DRAFT: confirm working days and hours */}
              <p className="mt-1 text-muted">{business.hours}</p>
            </div>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
              <MapPin className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
              Get directions
            </a>
          </div>
          <p className="mt-5 text-muted">
            Serving Leonardtown, St. Mary&apos;s County and Southern Maryland.{" "}
            <Link
              href="/contact#visit"
              className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
            >
              See the map and contact details
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
