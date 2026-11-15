import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Label } from "@/components/Label";
import { WavyFrame } from "@/components/WavyFrame";
import { addressLine1, business, directionsUrl } from "@/lib/business";
import { photos } from "@/lib/photos";
import { container, sectionPad, textLink } from "@/lib/ui";

/** Home: the studio teaser. Her real mural and sequin lemon (photo 09), her line, the address. */
export function StudioQuote() {
  const p = photos.mural;
  return (
    <section aria-labelledby="studio-quote-title" className={sectionPad}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20`}>
        <figure className="mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]">
          <div className="-rotate-2">
            <WavyFrame shape="square">
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 520px, 420px" loading="lazy" className="h-full w-full object-cover" />
            </WavyFrame>
          </div>
        </figure>
        <div>
          <Label>The studio</Label>
          <h2 id="studio-quote-title" className="sr-only">
            The studio
          </h2>
          <figure className="mt-5">
            <blockquote>
              <p className="display text-h2 font-[600] italic text-ink">&ldquo;{business.studioQuote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-5 font-semibold text-muted">{business.owner}, owner</figcaption>
          </figure>
          <p className="mt-8 max-w-[36rem] text-lead text-muted">
            A private, one-chair color studio at {addressLine1}, Leonardtown. One client at a time.
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
      </div>
    </section>
  );
}
