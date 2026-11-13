import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref } from "@/lib/business";
import { photos } from "@/lib/photos";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

/** Photo 06 as a contained, darkened panel. Never stretched: capped at 640px wide. */
export function FinalCta() {
  const p = photos.silver;
  return (
    <section aria-labelledby="cta-title" className="py-[72px] lg:py-[112px]">
      <div className={container}>
        <div className="relative isolate overflow-hidden rounded-[20px] border border-line bg-surface">
          <div className="absolute inset-y-0 right-0 -z-10 w-full max-w-[640px]">
            <Image
              src={p.src}
              alt=""
              width={p.width}
              height={p.height}
              sizes="640px"
              loading="lazy"
              className="h-full w-full object-cover opacity-70"
              style={{ objectPosition: "50% 35%" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, #1E1719 0%, rgba(30,23,25,0.75) 35%, rgba(18,14,16,0.35) 100%)" }}
            />
          </div>
          <div className="px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <h2 id="cta-title" className="display max-w-[40rem] text-[2.75rem] font-[800] leading-[0.98] text-ink sm:text-[4rem] lg:text-[4.75rem]">
              Ready when you are, <span className="italic text-accent">rainbow enthusiast.</span>
            </h2>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlanButton className={`${btnPrimary} w-full sm:w-auto`} />
              <a href={smsHref()} className={`${btnGhost} w-full bg-bg/60 px-5 sm:w-auto`}>
                <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                Text CONSULTATION to {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
