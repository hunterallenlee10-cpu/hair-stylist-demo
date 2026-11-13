import { SectionHeading } from "@/components/SectionHeading";
import { container, sectionPad } from "@/lib/ui";

// SAMPLE CONTENT. Replace every card with real Google reviews before launch.
// No star ratings and no review schema until real reviews are shown here.
const samples = [
  "I came in with old box dye and a screenshot. She talked me through every step, and the pink is exactly what I pictured.",
  "I asked for vanilla and got the best lived-in brunette I have ever had. It grew out beautifully.",
  "The consult was worth it on its own. She asked about everything, then nailed the color.",
];

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className={`${sectionPad} border-t border-line`}>
      <div className={container}>
        <SectionHeading id="reviews-title" kicker="Kind words" title="From the chair." />
        <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {samples.map((t, i) => (
            <li key={i} className="flex flex-col rounded-[20px] border border-dashed border-line bg-surface p-7">
              <p className="eyebrow text-[0.75rem] text-muted">Sample review: replace with real Google reviews</p>
              <blockquote className="display mt-5 text-[1.375rem] font-[600] leading-snug text-ink">&ldquo;{t}&rdquo;</blockquote>
              <p className="mt-auto pt-6 text-muted">Sample client</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
