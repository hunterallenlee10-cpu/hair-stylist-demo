import { Droplets, Snowflake, SprayCan, Thermometer } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { business } from "@/lib/business";
import { container, sectionPad } from "@/lib/ui";

const steps = [
  { t: "Text CONSULTATION.", b: `Send the word to ${business.phoneDisplay}, or use the planner here.` },
  {
    t: "Free consult.",
    b: "Share your hair history and your inspiration. Mickayla maps out the plan, the time and the price.",
  },
  { t: "Color day.", b: "Settle in. Leave with the hair you described." },
];

const icons = [Snowflake, Droplets, SprayCan, Thermometer];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className={`${sectionPad} border-t border-line`}>
      <div className={container}>
        <SectionHeading id="how-title" kicker="How it works" title="Three steps to loud." />
        <ol className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.t} className="border-t border-line pt-6">
              <span aria-hidden="true" className="display block text-[4.5rem] font-[800] italic leading-none text-accent">
                {i + 1}
              </span>
              <h3 className="display mt-4 text-[1.75rem] font-[800] leading-tight text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {s.t}
              </h3>
              <p className="mt-3 max-w-[24rem] text-muted">{s.b}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 rounded-[20px] border border-line bg-surface p-6 sm:p-10 lg:mt-28">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="display text-[2.25rem] font-[800] leading-none text-ink sm:text-[2.75rem]">Keep it loud.</h3>
            <p className="text-muted">Her rules for vivids that stay vivid.</p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {business.careRules.map((r, i) => {
              const Icon = icons[i];
              return (
                <li key={r.title} className="rounded-2xl border border-line bg-bg p-5">
                  <Icon className="h-6 w-6 text-ink" strokeWidth={1.75} aria-hidden="true" />
                  <p className="display mt-6 text-[1.375rem] font-[700] leading-tight text-ink">{r.title}</p>
                  {r.body && <p className="mt-1 text-muted">{r.body}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
