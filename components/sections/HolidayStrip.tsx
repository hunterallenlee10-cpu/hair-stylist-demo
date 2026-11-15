import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Swirl } from "@/components/Swirl";
import { WavyFrame } from "@/components/WavyFrame";
import { Draft } from "@/components/Draft";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { tornEdgePath } from "@/lib/swirl";
import { btnDark, container } from "@/lib/ui";

const tearTop = tornEdgePath(7);
const tearBottom = tornEdgePath(23);

/**
 * The one lemon band. Its top edge is a torn strip of her swirl mural (the
 * second of the swirl's three places), then her holiday line, photo 03, and a
 * quiet gift card link.
 */
export function HolidayStrip() {
  const p = photos.gems;
  return (
    <section aria-labelledby="holiday-title" className="relative bg-lemon text-bg">
      {/* The torn swirl edge. Decorative. */}
      <div aria-hidden="true" className="relative h-[64px] overflow-hidden bg-bg sm:h-[76px]">
        <Swirl id="holiday" className="absolute left-1/2 top-0 h-[1800px] w-[1800px] -translate-x-[38%] -translate-y-[58%]" />
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[18px] w-full rotate-180">
          <path d={tearTop} fill="var(--color-bg)" />
        </svg>
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[20px] w-full">
          <path d={tearBottom} fill="var(--color-lemon)" />
        </svg>
      </div>

      <div className={`${container} grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:py-14`}>
        <div>
          <h2 id="holiday-title" className="display max-w-[40rem] text-h2 font-[800]">
            <Draft note="confirm holiday message and dates">
              This is your sign to text me for your <span className="italic">holiday hair.</span>
            </Draft>
          </h2>
          <p className="mt-3 text-lead font-medium">Color, sparkle, or both.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <PlanButton preset={{ looks: ["Sparkly things"] }} className={`${btnDark} w-full shrink-0 sm:w-auto`}>
              <Sparkles className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              Plan my holiday hair
            </PlanButton>
            <p className="font-medium">
              Or give someone a color day:{" "}
              <a
                href={business.giftCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center font-bold underline decoration-2 underline-offset-4 hover:opacity-75"
              >
                gift cards
              </a>
            </p>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[220px] lg:w-[240px] lg:max-w-none">
          <div className="-rotate-3">
            <WavyFrame shape="portrait" band="md">
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="240px" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "50% 30%" }} />
            </WavyFrame>
          </div>
        </figure>
      </div>
    </section>
  );
}
