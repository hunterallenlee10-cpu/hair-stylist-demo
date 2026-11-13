import Image from "next/image";
import { Sparkles } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { btnDark, btnGhost, container } from "@/lib/ui";

export function HolidayBand() {
  const p = photos.gems;
  return (
    <section aria-labelledby="holiday-title">
      {/* The one lemon section on the site. DRAFT: confirm holiday message and dates */}
      <div className="bg-lemon text-bg">
        <div className={`${container} grid items-center gap-10 py-[72px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20 lg:py-[112px]`}>
          <div>
            <p className="eyebrow">Holiday hair</p>
            <h2 id="holiday-title" className="display mt-4 text-[2.5rem] font-[800] leading-[0.98] sm:text-[3.5rem] lg:text-[4.25rem]">
              This is your sign to text me for your <span className="italic">holiday hair.</span>
            </h2>
            <p className="mt-5 text-xl font-medium">Color, sparkle, or both.</p>
            <PlanButton preset={{ looks: ["Sparkly things"] }} className={`${btnDark} mt-8 w-full sm:w-auto`}>
              <Sparkles className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              Plan my holiday hair
            </PlanButton>
          </div>
          <figure className="mx-auto w-full max-w-[300px] sm:max-w-[400px]">
            <WavyFrame shape="portrait" className="rotate-[-2deg]">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 640px) 400px, 300px"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </WavyFrame>
            <figcaption className="mt-4 text-center font-medium">Sparkly things: hair gems on emerald green</figcaption>
          </figure>
        </div>
      </div>

      {/* Vivid model call. DRAFT: confirm the call is open */}
      <div className="border-b border-line bg-surface">
        <div className={`${container} grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:py-14`}>
          <div>
            <h3 className="display text-[1.875rem] font-[800] leading-tight text-ink sm:text-[2.25rem]">
              Calling all rainbow enthusiasts.
            </h3>
            <p className="mt-2 text-muted">Mickayla takes vivid models. You will need:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {business.modelRequirements.map((r) => (
                <li key={r} className="rounded-full border border-line bg-bg px-4 py-2 text-[0.9375rem] text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <PlanButton preset={{ model: true }} className={`${btnGhost} w-full sm:w-auto`}>
            Ask about modeling
          </PlanButton>
        </div>
      </div>
    </section>
  );
}
