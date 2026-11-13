import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WavyFrame } from "@/components/WavyFrame";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business } from "@/lib/business";
import { photos } from "@/lib/photos";
import { container, sectionPad } from "@/lib/ui";

const card = "relative flex flex-col rounded-[20px] border border-line bg-surface p-7 sm:p-8";
const cardBtn =
  "mt-auto inline-flex min-h-[48px] items-center gap-2 self-start rounded-full border border-line px-5 font-bold text-ink transition-colors hover:border-accent hover:text-accent active:scale-[0.97]";
const cardTitle = "display text-[2rem] font-[800] leading-[1.02] text-ink sm:text-[2.25rem]";

export function WhyDisco() {
  const v = photos.vanilla;
  return (
    <section id="vivids" aria-labelledby="why-title" className={sectionPad}>
      <div className={container}>
        <SectionHeading id="why-title" kicker="Why Disco Lemonade" title="Bring me all the high contrast looks.">
          {business.tagline}, in a region of everyday salons. And yes, she does vanilla too.
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:items-start">
          <article className={`${card} lg:min-h-[440px]`}>
            <figure>
              <blockquote className="display text-[2.25rem] font-[700] italic leading-[1.05] text-ink sm:text-[2.5rem]">
                vivids &gt;&gt;&gt;&gt;&gt;
                <br />
                no vivids
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted">Mickayla, on Instagram</figcaption>
            </figure>
            <h3 className={`${cardTitle} mt-8`}>Vivids are the specialty.</h3>
            <p className="mb-8 mt-4 text-muted">
              Rainbows, melts, panels and color blocks are what Mickayla does most. Not a side menu.
            </p>
            <PlanButton preset={{ looks: ["Full rainbow"] }} className={cardBtn}>
              Plan a vivid <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            </PlanButton>
          </article>

          <article className={`${card} lg:mt-14`}>
            <div className="flex items-start gap-5">
              <WavyFrame shape="portrait" className="w-[112px] shrink-0 sm:w-[132px]">
                <Image
                  src={v.src}
                  alt={v.alt}
                  width={v.width}
                  height={v.height}
                  sizes="132px"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </WavyFrame>
              <blockquote className="display pt-1 text-[1.25rem] italic leading-snug text-ink">
                &ldquo;Do you do vanilla hair? Or just vivids?&rdquo;
              </blockquote>
            </div>
            <h3 className={`${cardTitle} mt-8`}>Vanilla, too.</h3>
            <p className="mb-8 mt-4 text-muted">
              Both. Lived-in brunettes, bright blondes, silver and copper get the same obsession.
            </p>
            <PlanButton preset={{ looks: ["Vanilla"] }} className={cardBtn}>
              Plan a natural look <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            </PlanButton>
          </article>

          <article className={`${card} lg:mt-28`}>
            <div aria-hidden="true" className="rounded-2xl border border-line bg-bg p-4">
              <p className="flex items-center gap-2 text-sm text-muted">
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                To {business.phoneDisplay}
              </p>
              <p className="ml-auto mt-3 w-fit rounded-2xl rounded-br-md bg-ink px-4 py-2 font-bold tracking-wide text-bg">
                CONSULTATION
              </p>
            </div>
            <h3 className={`${cardTitle} mt-8`}>It starts with a text.</h3>
            <p className="mb-8 mt-4 text-muted">
              New here? Text the word CONSULTATION. The consult is free, and it is where the real plan, timing and
              price come from.
            </p>
            <PlanButton className={cardBtn}>
              Start my consultation <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            </PlanButton>
          </article>
        </div>
      </div>
    </section>
  );
}
