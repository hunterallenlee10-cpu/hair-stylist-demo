import { PageHeader, PageShell } from "@/components/PageShell";
import { Services } from "@/components/sections/Services";
import { pageMeta } from "@/lib/meta";
import { pageSchema, serviceCatalogSchema } from "@/lib/schema";
import { serviceByHubId } from "@/lib/services";

export const metadata = pageMeta({
  title: "Hair Color Services in Leonardtown | Disco Lemonade Studio",
  description:
    "Vivids and rainbows, panels, blonding and silver, lived-in color, corrections, shags and hair gems at Disco Lemonade Studio in Leonardtown, MD.",
  path: "/services",
});

export default function ServicesPage() {
  const pageFor = (id: string) => {
    const s = serviceByHubId(id === "panels-and-peekaboos" ? "vivid-color" : id);
    return s ? `/services/${s.slug}` : undefined;
  };
  return (
    <PageShell schema={pageSchema("Services", "/services", [serviceCatalogSchema(pageFor)])} ctaPhoto="hiddenRainbow" ctaTitle={{ lead: "Found your", accent: "flavor?" }}>
      <PageHeader eyebrow="Hair color services in Leonardtown, MD" title="What she paints.">
        Tap a service to see her work and what to expect, or plan it straight away.
      </PageHeader>
      <Services />
    </PageShell>
  );
}
