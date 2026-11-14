import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/sections/Hero";
import { FindYourFlavor } from "@/components/sections/FindYourFlavor";
import { WorkTeaser } from "@/components/sections/WorkTeaser";
import { HolidayStrip } from "@/components/sections/HolidayStrip";
import { StudioQuote } from "@/components/sections/StudioQuote";
import { homeSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

// The home page is a short hub: six blocks, one job each. Services, the full
// gallery, the studio, and everything a new client asks live on their own pages.
export default function Home() {
  return (
    <PageShell schema={homeSchema()} ctaSteps>
      <Hero />
      <FindYourFlavor />
      <WorkTeaser />
      <HolidayStrip />
      <StudioQuote />
    </PageShell>
  );
}
