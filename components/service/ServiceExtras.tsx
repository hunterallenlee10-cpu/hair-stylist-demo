import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { WavyFrame } from "@/components/WavyFrame";
import { Draft } from "@/components/Draft";
import { PhotoGrid } from "@/components/Gallery/PhotoGrid";
import { KeepItLoud } from "@/components/sections/HowItWorks";
import { business } from "@/lib/business";
import { entriesFor } from "@/lib/gallery";
import { photos } from "@/lib/photos";
import { container, sectionPad } from "@/lib/ui";

// The things only one service page has. Each page carries at least three.

/** Vivid: her real session lengths, beside the nine hour melt (photo 12, card size). */
function SessionLengths() {
  const p = photos.nineHour;
  return (
    <section aria-labelledby="sessions-title" className={`${sectionPad} border-t border-line`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20`}>
        <div>
          <SectionHeading id="sessions-title" title="How long a vivid really takes.">
            In her own captions, not a price list. Settle in: it is a day, sometimes more.
          </SectionHeading>
          <dl className="mt-10 grid gap-4">
            {business.sessions.map((s) => (
              <div key={s.length} className="grid gap-1 rounded-[20px] border border-line bg-surface p-6 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-6">
                <dt className="display text-h3 font-[800] italic text-accent">
                  <Draft note="confirm session lengths">{s.length}</Draft>
                </dt>
                <dd className="text-lead text-muted">{s.what}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="mx-auto w-full max-w-[300px] sm:max-w-[360px]">
          <div className="rotate-2">
            <WavyFrame shape="tall" band="md" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="360px" loading="lazy" className="h-full w-full object-cover" />
            </WavyFrame>
          </div>
          <figcaption className="mt-4 text-center text-muted">{p.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Vivid: the reds row (11, 12, 15). */
function RedsRow() {
  return (
    <section aria-labelledby="reds-title" className={`${sectionPad} border-t border-line`}>
      <div className={container}>
        <SectionHeading id="reds-title" title="Reds.">
          Ribbons, a magenta melt to deep berry, and a dull dark turned glossy red.
        </SectionHeading>
        <PhotoGrid
          entries={entriesFor(["ribbons", "nineHour", "beforeAfter"])}
          layout="row"
          className="mt-10 sm:grid-cols-3 sm:gap-6"
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 30vw, 62vw"
        />
      </div>
    </section>
  );
}

/** Vivid: her line, set as type. */
function AfterBeforeType() {
  const [a, b] = business.afterBeforeLine;
  return (
    <section aria-label="In her words" className="border-t border-line bg-[#160F12] py-[72px] lg:py-[104px]">
      <figure className={`${container} text-center`}>
        <blockquote className="display font-[800] italic leading-[0.95] text-ink">
          <p className="text-h1">{a}</p>
          <p className="mt-2 text-h1 text-accent">{b}</p>
        </blockquote>
        <figcaption className="mt-6 text-muted">{business.owner}, in her own posts</figcaption>
      </figure>
    </section>
  );
}

/** Lived-in: her question of the week, answered. */
function QuestionOfTheWeek() {
  return (
    <section aria-labelledby="qotw-title" className={`${sectionPad} border-t border-line`}>
      <div className={`${container} grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20`}>
        <div>
          <p className="text-label font-medium text-muted">Her question of the week</p>
          <h2 id="qotw-title" className="display mt-3 text-h2 font-[800] italic text-ink">
            &ldquo;{business.vanillaQuestion}&rdquo;
          </h2>
        </div>
        <div className="text-lead text-muted lg:pt-10">
          <p>
            <span className="display text-h3 font-[800] text-accent">Both.</span> Vivids and rainbows are the specialty, and she
            also does blondes, brunettes, silver and copper. The same hands, the same brushes, the same obsession with
            the details.
          </p>
          <p className="mt-4 text-ink">Vanilla or otherwise.</p>
        </div>
      </div>
    </section>
  );
}

/** Lived-in: her first-ever-color line, shown in the hero beside photo 14. */
export function FirstColorQuote() {
  return (
    <figure className="mt-8 border-l-2 border-accent pl-5">
      <blockquote className="display text-h3 font-[600] italic text-ink">&ldquo;{business.firstColorQuote}&rdquo;</blockquote>
      <figcaption className="mt-3 text-label text-muted">
        {business.owner}, on a client&apos;s first ever color (14 Nov 2026)
      </figcaption>
    </figure>
  );
}

/** Blonding: the Barbie blonde story, from her caption (photo 08, in the row above). */
function BarbieStory() {
  return (
    <section aria-labelledby="barbie-title" className="border-t border-line bg-[#160F12] py-[72px] lg:py-[104px]">
      <div className={`${container} grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20`}>
        <h2 id="barbie-title" className="display text-h2 font-[800] text-ink">
          Bright and sunny, <span className="italic text-accent">on purpose.</span>
        </h2>
        <div className="text-lead text-muted">
          <p>
            <Draft note="confirm Barbie blonde story wording">
              That very long Barbie blonde above? She skipped the toner and kept the raw lift, because the client wanted it
              bright and sunny.
            </Draft>
          </p>
          <p className="mt-4 text-ink">Tell her what you picture, and the plan follows the picture.</p>
        </div>
      </div>
    </section>
  );
}

/** Correction: how a correction works, beside photo 16 mid-paint. */
function CorrectionSteps() {
  const p = photos.inProgress;
  const steps = [
    { t: "Honest history.", b: "At the free consult, tell her everything that is on your hair: box dye, old color, all of it." },
    { t: "A plan.", b: "She maps out the route to the hair you want. Some corrections take more than one visit, and she will say so up front." },
    { t: "Color day.", b: "Settle in. The plan goes on by hand, in sections." },
  ];
  return (
    <section aria-labelledby="how-title" className={`${sectionPad} border-t border-line`}>
      <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20`}>
        <div>
          <SectionHeading id="how-title" title="How a correction works." />
          <ol className="mt-10 grid gap-8">
            {steps.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line pt-6">
                <span aria-hidden="true" className="display text-[3rem] font-[800] italic leading-none text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="display text-h3 font-[800] text-ink">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.t}
                  </h3>
                  <p className="mt-2 text-lead text-muted">
                    {i === 1 ? <Draft note="confirm with Mickayla">{s.b}</Draft> : s.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="mx-auto w-full max-w-[300px] sm:max-w-[400px]">
          <div className="rotate-2">
            <WavyFrame shape="portrait" band="md">
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="400px" loading="lazy" className="h-full w-full object-cover" />
            </WavyFrame>
          </div>
          <figcaption className="mt-4 text-center text-muted">{p.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function ServiceExtras({ slug }: { slug: string }) {
  switch (slug) {
    case "vivid-hair-color":
      return (
        <>
          <SessionLengths />
          <RedsRow />
          <AfterBeforeType />
          <KeepItLoud />
        </>
      );
    case "lived-in-color-balayage":
      return <QuestionOfTheWeek />;
    case "blonding-and-silver":
      return <BarbieStory />;
    case "color-correction":
      return <CorrectionSteps />;
    default:
      return null;
  }
}
