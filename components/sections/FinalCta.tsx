import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref } from "@/lib/business";
import { photos, type PhotoKey } from "@/lib/photos";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

const steps = ["Text CONSULTATION", "Free consult", "Color day"];

/**
 * Closing call to action. The right half holds a real photo in her sequin
 * mirror (max 440px wide, never stretched), varied per page. On the home page
 * it also carries the three-step summary of how booking works.
 */
export function FinalCta({ steps: showSteps = false, photo = "fire" }: { steps?: boolean; photo?: PhotoKey }) {
  const p = photos[photo];
  return (
    <section aria-labelledby="cta-title" className="py-[72px] lg:py-[112px]">
      <div className={container}>
        <div className="grid items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-12 sm:px-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:px-16 lg:py-16">
          <div>
            <h2 id="cta-title" className="display max-w-[36rem] text-h2 font-[800] text-ink">
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
                <span>
                  Text CONSULTATION to <span className="whitespace-nowrap">{business.phoneDisplay}</span>
                </span>
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

          <figure className="mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]">
            <div className="-rotate-2">
              <WavyFrame shape="portrait">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1024px) 440px, 360px"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </WavyFrame>
            </div>
            <figcaption className="mt-4 text-center text-[0.9375rem] text-muted">{p.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
