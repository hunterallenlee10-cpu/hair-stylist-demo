import { MessageCircle } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { LemonMark } from "@/components/LemonMark";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref } from "@/lib/business";
import { btnGhost, btnPrimary, container } from "@/lib/ui";
import { HeroMelt } from "./HeroMelt";

const facts = ["Vivids and rainbows specialist", "Free consultation", "Private one-on-one studio"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* One soft pink bloom behind the photo, nothing else glows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[8%] hidden h-[640px] w-[640px] rounded-full opacity-[0.16] blur-[90px] lg:block"
        style={{ background: "radial-gradient(circle, #FF3D8B 0%, transparent 65%)" }}
      />
      <div
        className={`${container} relative grid grid-cols-1 gap-x-16 pb-16 pt-5 sm:pt-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:grid-rows-[auto_1fr] lg:pb-28 lg:pt-14`}
      >
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1 id="hero-title">
            <span className="eyebrow block max-w-[22rem] text-muted sm:max-w-none">
              Vivid hair color in Leonardtown, MD <span aria-hidden="true" className="hidden px-1 text-accent sm:inline">·</span>{" "}
              <span className="block sm:inline">Southern Maryland</span>
            </span>
            <span className="display mt-4 block text-[2.875rem] font-[800] leading-[0.94] text-ink xs:text-[3.25rem] sm:text-[4.5rem] lg:mt-6 lg:text-[4.25rem] xl:text-[5.125rem]">
              Your dream hair.{" "}
              <span className="block italic font-[700] text-accent">Vanilla or otherwise.</span>
            </span>
          </h1>

          <p className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted sm:mt-6 sm:text-lg">
            <span className="sm:hidden">
              Mickayla Ramsey paints vivids, rainbows and everything in between.
            </span>
            <span className="hidden sm:inline">
              Mickayla Ramsey paints vivids, rainbows and everything in between at {business.name} in Leonardtown.
              Every new look starts with a free consultation.
            </span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <PlanButton className={`${btnPrimary} w-full sm:w-auto`} />
            <a href={smsHref()} className={`${btnGhost} w-full px-5 sm:w-auto`}>
              <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
              <span className="text-left sm:text-center">
                Text <span className="tracking-wide">CONSULTATION</span> to <br className="xs:hidden" />
                {business.phoneDisplay}
              </span>
            </a>
          </div>
        </div>

        {/* Photo: type first on mobile, then the photo, starting inside the first screen. */}
        <div className="relative mt-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
          <figure className="relative mx-auto w-full max-w-[560px] px-3 sm:px-0 lg:max-w-[520px]">
            <div className="relative rotate-[2deg]">
              <div aria-hidden="true" className="wave-portrait absolute -inset-[10px] bg-line" />
              <WavyFrame shape="portrait" className="shadow-soft">
                <HeroMelt />
              </WavyFrame>
            </div>
            <figcaption className="relative mt-6 flex justify-center lg:justify-start lg:pl-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">
                <LemonMark className="h-5 w-5" />
                Painted at {business.name}
              </span>
            </figcaption>
          </figure>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3 lg:col-start-1 lg:row-start-2 lg:mt-12 lg:self-start lg:gap-4">
          {facts.map((f) => (
            <li
              key={f}
              className="flex min-h-[56px] items-center gap-3 border-t border-line pt-3 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-ink"
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
