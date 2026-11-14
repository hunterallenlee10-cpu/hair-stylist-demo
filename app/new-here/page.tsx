import { MessageCircle } from "lucide-react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { Faq } from "@/components/sections/Faq";
import { KeepItLoud, ModelCall, Steps } from "@/components/sections/HowItWorks";
import { business, smsHref } from "@/lib/business";
import { pageMeta } from "@/lib/meta";
import { faqSchema, pageSchema } from "@/lib/schema";
import { btnGhost, btnPrimary } from "@/lib/ui";

export const metadata = pageMeta({
  title: "New Clients: How Booking Works | Disco Lemonade Studio",
  description:
    "New to Disco Lemonade Studio in Leonardtown, MD? Text CONSULTATION to (240) 561-8519. How a first visit works, vivid care rules and answers.",
  path: "/new-here",
});

export default function NewHerePage() {
  return (
    <PageShell schema={pageSchema("New here", "/new-here", [faqSchema()])}>
      <PageHeader eyebrow="New clients: vivid hair color in Leonardtown, MD" title={
          <>
            New here? <span className="sm:block">Start with a text.</span>
          </>
        }
      >
        <p>Every new look starts with a free consultation. Here is how it goes.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PlanButton className={`${btnPrimary} w-full sm:w-auto`} />
          <a href={smsHref()} className={`${btnGhost} w-full px-5 text-ink sm:w-auto`}>
            <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
            Text CONSULTATION to {business.phoneDisplay}
          </a>
        </div>
      </PageHeader>
      <Steps />
      <Faq />
      <KeepItLoud />
      <ModelCall />
    </PageShell>
  );
}
