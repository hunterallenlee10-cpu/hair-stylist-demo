import { business, smsHref, telHref } from "@/lib/business";

/** On every planner step: the other ways in. Text first, call second. */
export function RatherTalk() {
  const link = "inline-flex min-h-[44px] items-center font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent";
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-3 text-[0.9375rem] text-muted">
      Rather talk?
      <a href={smsHref()} className={link}>
        Text
      </a>
      or
      <a href={telHref} className={link}>
        call {business.phoneDisplay}
      </a>
    </p>
  );
}
