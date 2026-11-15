import Image from "next/image";
import { TextConsultation } from "@/components/TextConsultation";
import Link from "next/link";
import { WavyFrame } from "@/components/WavyFrame";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { photos, type PhotoKey } from "@/lib/photos";
import { btnPrimary, container } from "@/lib/ui";

const steps = ["Text CONSULTATION", "Free consult", "Color day"];

/**
 * Closing call to action. The right half holds a real photo in her sequin
 * mirror (max 440px wide, never stretched), varied per page. On the home page
 * it also carries the three-step summary of how booking works.
 */
export type CtaTitle = { lead: string; accent: string };
const defaultTitle: CtaTitle = { lead: "Ready when you are,", accent: "rainbow enthusiast." };

export function FinalCta({
  steps: showSteps = false,
  photo = "fire",
  title = defaultTitle,
}: {
  steps?: boolean;
  photo?: PhotoKey;
  /** Varied per page, so the closing band never reads the same twice. */
  title?: CtaTitle;
}) {
  const p = photos[photo];
  return (
    <section aria-labelledby="cta-title" className="py-[72px] lg:py-[112px]">
      <div className={container}>
        <div className="reveal grid items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-surface px-5 py-12 sm:px-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:px-16 lg:py-16">
          <div>
            <h2 id="cta-title" className="display max-w-[36rem] text-h2 font-[800] text-ink">
              {title.lead} <span className="italic text-accent text-[min(1em,10vw)]">{title.accent}</span>
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
              <TextConsultation />
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
