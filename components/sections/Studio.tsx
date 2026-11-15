import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { Placeholder } from "@/components/Placeholder";
import { PageTitle } from "@/components/PageShell";
import { Draft } from "@/components/Draft";
import { MapCard } from "@/components/MapCard";
import { SectionHeading } from "@/components/SectionHeading";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { addressLine1, addressLine2, business, directionsUrl, smsHref } from "@/lib/business";
import { photos } from "@/lib/photos";
import { btnGhost, btnPrimary, container, sectionPad, textLink } from "@/lib/ui";

/** The studio hero: her mural and sequin lemon (photo 09) in the mirror. */
export function StudioHero() {
  const p = photos.mural;
  return (
    <section aria-labelledby="studio-title" className="pb-14 pt-8 lg:pb-20 lg:pt-14">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16`}>
        <div>
          <PageTitle
            id="studio-title"
            eyebrow="A private hair color studio in Leonardtown, MD"
            title={
              <>
                Black walls. Pink mirror. <span className="italic text-accent">A swirl she painted.</span> Lots of lemons.
              </>
            }
          />
          <p className="mt-6 max-w-[36rem] text-lead text-muted">
            {business.name} is a private, one-chair color studio on Point Lookout Rd in Leonardtown. One client at a time,
            for as long as your color takes.
          </p>
          <p className="mt-4 font-semibold text-ink">
            <Draft note="confirm opening month">{business.openedLine}.</Draft>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <PlanButton className={`${btnPrimary} w-full sm:w-auto`} />
            <a href={smsHref()} className={`${btnGhost} w-full px-5 sm:w-auto`}>
              <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
              <span>
                Text CONSULTATION to <span className="whitespace-nowrap">{business.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[640px]">
          <div className="rotate-2">
            <WavyFrame shape="square">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 600px, (min-width: 640px) 480px, 340px"
                preload
                className="h-full w-full object-cover"
              />
            </WavyFrame>
          </div>
          <figcaption className="mt-4 text-center text-[0.9375rem] text-muted">{p.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** The room, her words, the address and the map. */
export function Studio() {
  return (
    <section aria-labelledby="room-title" className={`${sectionPad} border-t border-line`}>
      <div className={`${container} grid items-start gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20`}>
        <figure className="mx-auto w-full max-w-[380px]">
          <WavyFrame shape="portrait" band="md">
            <Placeholder label="Photo: Mickayla, from Disco Lemonade Studio" />
          </WavyFrame>
        </figure>
        <div>
          <SectionHeading id="room-title" kicker="The room" title="Where you sit for six hours." />
          <figure className="mt-8">
            <blockquote>
              <p className="display text-h2 font-[600] italic text-ink">&ldquo;{business.studioQuote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-4 font-semibold text-muted">{business.owner}, owner</figcaption>
          </figure>
          <p className="mt-8 max-w-[36rem] text-lead text-muted">
            Black walls, a hot pink wavy sequin mirror, sequin lemons, and the swirl mural. One chair, so it is just you,
            her color brushes and the lemons.
          </p>
        </div>
      </div>

      <div id="visit" className={`${container} mt-16 grid gap-6 lg:mt-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10`}>
        <div className="rounded-[20px] border border-line bg-surface p-7 sm:p-8">
          <h2 className="display text-h3 font-[800] text-ink">Visit</h2>
          <address className="mt-4 not-italic text-lead leading-relaxed text-ink">
            {business.name}
            <br />
            {addressLine1}
            <br />
            {addressLine2}
          </address>
          {/* DRAFT: confirm working days and hours */}
          <p className="mt-2 text-muted">
            <Draft note="confirm working days and hours">{business.hours}</Draft>
          </p>
          <p className="mt-1 text-muted">Serving Leonardtown, St. Mary&apos;s County and Southern Maryland.</p>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={`${textLink} mt-4`}>
            <MapPin className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
            Get directions
          </a>
        </div>
        <MapCard />
      </div>
    </section>
  );
}

/**
 * Proof, honestly. Real proof only (her verified Instagram, the count, her
 * long-time clients) and three empty, labelled cards waiting for real Google
 * reviews. No names, no stars, no quotes. The live build fails while any
 * `data-placeholder` card remains.
 */
export function Proof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className={`${sectionPad} border-t border-line`}>
      <div className={container}>
        <SectionHeading id="proof-title" kicker="Proof" title="From the chair." />
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          <li className="rounded-[20px] border border-line bg-surface p-7">
            <InstagramIcon className="h-7 w-7 text-accent" />
            <p className="display mt-5 text-h3 font-[800] text-ink">Verified on Instagram</p>
            <p className="mt-2 text-muted">
              {business.instagramNameLine}.{" "}
              <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                {business.instagramHandle}
              </a>
            </p>
          </li>
          <li className="rounded-[20px] border border-line bg-surface p-7">
            <p className="display text-h2 font-[800] italic text-accent">
              <Draft note="live Instagram count">{business.looksCount}</Draft>
            </p>
            <p className="display mt-3 text-h3 font-[800] text-ink">Looks on Instagram</p>
            <p className="mt-2 text-muted">Every one her own work, posted from her own chair.</p>
          </li>
          <li className="rounded-[20px] border border-line bg-surface p-7">
            <p className="display text-h2 font-[800] italic text-accent">
              <Draft note="confirm loyalty line">6 years+</Draft>
            </p>
            <p className="display mt-3 text-h3 font-[800] text-ink">In her chair</p>
            <p className="mt-2 text-muted">
              <Draft note="confirm loyalty line">{business.loyaltyLine}.</Draft>
            </p>
          </li>
        </ul>
        <ul className="mt-4 grid gap-4 lg:grid-cols-3" aria-label="Spaces for Google reviews">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              data-placeholder="review"
              className="grid min-h-[160px] place-items-center rounded-[20px] border border-dashed border-line p-7 text-center text-muted"
            >
              Your Google reviews go here
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
