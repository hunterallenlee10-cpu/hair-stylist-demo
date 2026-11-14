import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref } from "@/lib/business";
import { photos } from "@/lib/photos";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

const steps = ["Text CONSULTATION", "Free consult", "Color day"];

/**
 * Closing call to action. Photo 06 as a contained, darkened panel, never
 * stretched (capped at 640px wide). On the home page it also carries the
 * three-step summary of how booking works.
 */
export function FinalCta({ steps: showSteps = false }: { steps?: boolean }) {
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
            <h2 id="cta-title" className="display max-w-[40rem] text-[2.5rem] font-[800] leading-[0.98] text-ink sm:text-[3.75rem] lg:text-[4.25rem]">
              Ready when you are, <span className="italic text-accent">rainbow enthusiast.</span>
            </h2>

            {showSteps && (
              <ol className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 font-semibold text-ink">
                    <span aria-hidden="true" className="display text-[1.75rem] font-[800] italic leading-none text-accent">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlanButton className={`${btnPrimary} w-full sm:w-auto`} />
              <a href={smsHref()} className={`${btnGhost} w-full bg-bg/60 px-5 sm:w-auto`}>
                <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
                Text CONSULTATION to {business.phoneDisplay}
              </a>
            </div>

            {showSteps && (
              <p className="mt-6 text-muted">
                New here?{" "}
                <Link
                  href="/new-here"
                  className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  See how a first visit works
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
