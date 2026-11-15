import { TextConsultation } from "@/components/TextConsultation";
import { WavyFrame } from "@/components/WavyFrame";
import { LemonMark } from "@/components/LemonMark";
import { Swirl } from "@/components/Swirl";
import { SwirlTurn } from "@/components/SwirlTurn";
import { Draft } from "@/components/Draft";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business } from "@/lib/business";
import { btnPrimary, container } from "@/lib/ui";
import { HeroMelt } from "./HeroMelt";

/**
 * "The Swirl Room". Her swirl mural turns slowly behind her pink sequin
 * mirror, and The Melt plays once on photo 01 inside it.
 * Phone: the mirror comes first (about 300px, cropped to the crown and
 * mid-lengths), then the headline and the primary button, all in the first
 * screen. Desktop: type left, mirror right, the swirl cropped by the edge.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        className={`${container} relative grid grid-cols-1 items-center gap-x-10 pb-14 pt-3 sm:pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-20 lg:pt-8 xl:gap-x-16`}
      >
        {/* The mirror and the wall behind it. First on phones. */}
        <div className="relative mx-auto w-[min(76vw,296px,36svh)] sm:w-[340px] lg:col-start-2 lg:row-start-1 lg:w-full lg:max-w-[480px] lg:justify-self-center">
          <SwirlTurn
            boxClassName="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[134%] -translate-x-1/2 -translate-y-1/2 lg:w-[150%] lg:translate-x-[-44%]"
            buttonClassName="absolute -bottom-12 right-[-6vw] sm:-right-16 lg:-bottom-16 lg:right-0"
          >
            <Swirl id="hero" halo className="h-full w-full opacity-[0.88]" />
          </SwirlTurn>
          <div className="relative rotate-[2deg] drop-shadow-[0_24px_40px_rgb(0_0_0/0.55)]">
            <WavyFrame clipClass="wave-square lg:wave-portrait" className="aspect-square lg:aspect-[1357/1721]">
              <HeroMelt position="50% 22%" />
            </WavyFrame>
          </div>
        </div>

        <div className="relative mt-[52px] flex flex-col lg:col-start-1 lg:row-start-1 lg:mt-0">
          <h1 id="hero-title">
            <span className="flex items-center gap-2 font-sans text-label font-medium text-muted">
              <LemonMark className="h-5 w-5" />
              Hair color studio in Leonardtown, MD
            </span>
            <span className="display mt-3 block text-display font-[800] text-ink lg:mt-5">
              Your dream hair. <span className="block italic font-[700] text-accent">Vanilla or otherwise.</span>
            </span>
          </h1>

          <p className="order-3 mt-6 max-w-[34rem] text-lead text-muted lg:order-none lg:mt-6">
            {business.owner} paints vivids, rainbows and everything in between, by hand, in a private one-chair studio in
            Leonardtown. Every new look starts with a free consultation.
          </p>

          <div className="order-2 mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:order-none lg:mt-8">
            <PlanButton className={`${btnPrimary} min-h-[56px] w-full text-[1.0625rem] sm:w-auto`} />
            <TextConsultation />
          </div>

          <ul className="order-4 mt-5 flex flex-col gap-x-6 text-[0.9375rem] text-ink/85 sm:flex-row sm:flex-wrap lg:order-none lg:mt-6">
            <li>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink underline decoration-accent/60 decoration-2 underline-offset-4 hover:text-accent"
              >
                <InstagramIcon className="h-[18px] w-[18px] text-accent" />
                <Draft note="live Instagram count">Verified on Instagram, {business.looksCount} looks</Draft>
                <span className="sr-only">(opens Instagram)</span>
              </a>
            </li>
            <li className="flex min-h-[44px] items-center">
              <Draft note="confirm loyalty line">{business.loyaltyLine}.</Draft>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
