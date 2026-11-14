import { PageHeader, PageShell } from "@/components/PageShell";
import { Services } from "@/components/sections/Services";
import { pageMeta } from "@/lib/meta";
import { pageSchema, serviceSchemas } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Hair Color Services in Leonardtown | Disco Lemonade Studio",
  description:
    "Vivids and rainbows, panels, blonding and silver, lived-in color, corrections, shags and hair gems at Disco Lemonade Studio in Leonardtown, MD.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageShell schema={pageSchema("Services", "/services", serviceSchemas())}>
      <PageHeader eyebrow="Vivid hair color services in Leonardtown, MD" title="What she paints.">
        Tap anything that looks like you. It goes straight into your consultation plan.
      </PageHeader>
      <Services />
    </PageShell>
  );
}
