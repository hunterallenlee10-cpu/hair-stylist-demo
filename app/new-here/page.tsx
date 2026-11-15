import { TextConsultation } from "@/components/TextConsultation";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { Faq } from "@/components/sections/Faq";
import { KeepItLoud, ModelCall, Steps } from "@/components/sections/HowItWorks";
import { pageMeta } from "@/lib/meta";
import { faqSchema, pageSchema } from "@/lib/schema";
import { btnPrimary } from "@/lib/ui";

export const metadata = pageMeta({
  title: "New Clients: How Booking Works | Disco Lemonade Studio",
  description:
    "New to Disco Lemonade Studio in Leonardtown, MD? Text CONSULTATION to (240) 561-8519. How a first visit works, vivid care rules and answers.",
  path: "/new-here",
});

export default function NewHerePage() {
  return (
    <PageShell schema={pageSchema("New here", "/new-here", [faqSchema()])} ctaPhoto="hiddenRainbow" ctaTitle={{ lead: "One word gets you in:", accent: "CONSULTATION." }}>
      <PageHeader eyebrow="New clients: vivid hair color in Leonardtown, MD" title={
          <>
            New here? <span className="sm:block">Start with a text.</span>
          </>
        }
      >
        <p>Every new look starts with a free consultation. Here is how it goes.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PlanButton className={`${btnPrimary} w-full sm:w-auto`} />
          <TextConsultation />
        </div>
      </PageHeader>
      <Steps />
      <Faq />
      <KeepItLoud />
      <ModelCall />
    </PageShell>
  );
}
