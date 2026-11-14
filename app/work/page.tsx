import { PageHeader, PageShell } from "@/components/PageShell";
import { Work } from "@/components/sections/Work";
import { pageMeta } from "@/lib/meta";
import { pageSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Vivid Hair Gallery, Leonardtown MD | Disco Lemonade Studio",
  description:
    "See vivid, rainbow, blonde and lived-in hair color by Mickayla Ramsey at Disco Lemonade Studio in Leonardtown, MD. Every photo is her own work.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <PageShell schema={pageSchema("The work", "/work")}>
      <PageHeader eyebrow="Vivid hair color by Mickayla Ramsey in Leonardtown, MD" title="After beats before.">
        Every photo here is her own work, straight from her chair.
      </PageHeader>
      <Work />
    </PageShell>
  );
}
