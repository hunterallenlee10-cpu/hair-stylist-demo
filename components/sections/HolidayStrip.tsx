import { Sparkles } from "lucide-react";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { btnDark, container } from "@/lib/ui";

/** The one lemon moment on the site, kept to a single line and a button. */
export function HolidayStrip() {
  return (
    // DRAFT: confirm holiday booking message and dates
    <section aria-labelledby="holiday-title" className="bg-lemon text-bg">
      <div className={`${container} flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-14`}>
        <div>
          <h2 id="holiday-title" className="display text-[1.875rem] font-[800] leading-[1.05] sm:text-[2.5rem]">
            This is your sign to text me for your <span className="italic">holiday hair.</span>
          </h2>
          <p className="mt-2 text-lg font-medium">Color, sparkle, or both.</p>
        </div>
        <PlanButton preset={{ looks: ["Sparkly things"] }} className={`${btnDark} w-full shrink-0 sm:w-auto`}>
          <Sparkles className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          Plan my holiday hair
        </PlanButton>
      </div>
    </section>
  );
}
