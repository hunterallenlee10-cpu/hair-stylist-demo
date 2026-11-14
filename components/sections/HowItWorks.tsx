import { Droplets, Snowflake, SprayCan, Thermometer } from "lucide-react";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business } from "@/lib/business";
import { btnGhost, container } from "@/lib/ui";

const steps = [
  { t: "Text CONSULTATION.", b: `Send the word to ${business.phoneDisplay}, or use the planner on this site.` },
  {
    t: "Free consult.",
    b: "Share your hair history and your inspiration. Mickayla maps out the plan, the time and the price.",
  },
  { t: "Color day.", b: "Settle in. Leave with the hair you described." },
];

/** The three steps, directly under the New here page header. */
export function Steps() {
  return (
    <section aria-label="How a first visit works" className="pb-[72px] lg:pb-[112px]">
      <div className={container}>
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t border-line pt-6">
              <span aria-hidden="true" className="display block text-[4.5rem] font-[800] italic leading-none text-accent">
                {i + 1}
              </span>
              <h2 className="display mt-4 text-[1.75rem] font-[800] leading-tight text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {s.t}
              </h2>
              <p className="mt-3 max-w-[24rem] text-muted">{s.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const icons = [Snowflake, Droplets, SprayCan, Thermometer];

/** Her four care rules for vivids. */
export function KeepItLoud() {
  return (
    <section aria-labelledby="care-title" className="border-t border-line py-[72px] lg:py-[112px]">
      <div className={container}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="care-title" className="display text-[2.25rem] font-[800] leading-none text-ink sm:text-[3rem] lg:text-[3.5rem]">
            Keep it loud.
          </h2>
          <p className="text-muted">Her rules for vivids that stay vivid.</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {business.careRules.map((r, i) => {
            const Icon = icons[i];
            return (
              <li key={r.title} className="rounded-[20px] border border-line bg-surface p-6">
                <Icon className="h-6 w-6 text-ink" strokeWidth={1.75} aria-hidden="true" />
                <p className="display mt-6 text-[1.375rem] font-[700] leading-tight text-ink">{r.title}</p>
                {r.body && <p className="mt-1 text-muted">{r.body}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Vivid model call. DRAFT: confirm the call is open */
export function ModelCall() {
  return (
    <section aria-labelledby="model-title" className="border-t border-line bg-surface">
      <div className={`${container} grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:py-14`}>
        <div>
          <h2 id="model-title" className="display text-[1.875rem] font-[800] leading-tight text-ink sm:text-[2.25rem]">
            Calling all rainbow enthusiasts.
          </h2>
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
    </section>
  );
}
