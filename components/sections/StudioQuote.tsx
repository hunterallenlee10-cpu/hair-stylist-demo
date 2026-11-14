import Link from "next/link";
import { MapPin } from "lucide-react";
import { addressLine1, business, directionsUrl } from "@/lib/business";
import { container, sectionPad, textLink } from "@/lib/ui";

/** Home page: her own line about the studio, the address, and a way in. Nothing else. */
export function StudioQuote() {
  return (
    <section aria-labelledby="studio-quote-title" className={sectionPad}>
      <div className={`${container} max-w-[60rem]`}>
        <h2 id="studio-quote-title" className="eyebrow text-muted">
          The studio
        </h2>
        <figure className="mt-5">
          <blockquote>
            <p className="display text-[2.125rem] font-[600] italic leading-[1.1] text-ink sm:text-[3.25rem] lg:text-[3.75rem]">
              &ldquo;{business.studioQuote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-5 font-semibold text-muted">{business.owner}, owner</figcaption>
        </figure>
        {/* DRAFT: confirm working days and hours */}
        <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted">
          A private, one-chair color studio at {addressLine1}, Leonardtown. One client at a time, by appointment.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-8">
          <Link href="/studio" className={textLink}>
            See the studio
          </Link>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
            <MapPin className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
