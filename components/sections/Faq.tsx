import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Draft } from "@/components/Draft";
import { faqs } from "@/lib/faq";
import { container, sectionPad } from "@/lib/ui";

export type FaqItem = { q: string; a: string; draft?: string; link?: { text: string; href: string } };

function Answer({ a, link }: FaqItem) {
  if (!link) return <>{a}</>;
  const [before, after] = a.split(link.text);
  return (
    <>
      {before}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
      >
        {link.text}
      </a>
      {after}
    </>
  );
}

/** Native <details> accordion: works without JavaScript and keeps every answer in the HTML. */
export function FaqList({ items, level = 3 }: { items: FaqItem[]; level?: 3 | 4 }) {
  const H = `h${level}` as "h3" | "h4";
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <H className="display text-h3 font-[700] text-ink">{f.q}</H>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-[transform,background-color,color] duration-200 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-on-accent"
            >
              <Plus className="h-5 w-5" strokeWidth={2} />
            </span>
          </summary>
          <p className="max-w-[40rem] pb-6 pr-12 text-lead text-muted">
            {f.draft ? (
              <Draft note={f.draft}>
                <Answer {...f} />
              </Draft>
            ) : (
              <Answer {...f} />
            )}
          </p>
        </details>
      ))}
    </div>
  );
}

/** The New here FAQ. */
export function Faq({ title = "Good questions.", intro }: { title?: string; intro?: ReactNode }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`${sectionPad} border-t border-line`}>
      <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <SectionHeading id="faq-title" kicker="Questions" title={title} className="lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start">
          {intro ?? "Anything else, text it. She would rather you ask."}
        </SectionHeading>
        <FaqList items={faqs} />
      </div>
    </section>
  );
}
