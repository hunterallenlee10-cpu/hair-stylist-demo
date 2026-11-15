import { MessageCircle } from "lucide-react";
import { business, smsHref } from "@/lib/business";

/**
 * The second way in, beside "Plan My Dream Hair" everywhere: text the word
 * CONSULTATION. One style so it reads the same on every page, light enough
 * not to compete with the primary button, and short enough to sit on at most
 * two lines on a 320px phone (the number never splits).
 */
export function TextConsultation({ className = "" }: { className?: string }) {
  return (
    <a
      href={smsHref()}
      className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-line bg-bg/40 px-4 text-[0.9375rem] font-semibold leading-snug text-ink transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-5 ${className}`}
    >
      <MessageCircle className="h-[18px] w-[18px] shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
      <span className="text-left sm:text-center">
        Text CONSULTATION to <span className="whitespace-nowrap">{business.phoneDisplay}</span>
      </span>
    </a>
  );
}
