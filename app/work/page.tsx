import { PageHeader, PageShell } from "@/components/PageShell";
import { Work } from "@/components/sections/Work";
import { filterFromSlug } from "@/lib/gallery";
import { pageMeta } from "@/lib/meta";
import { pageSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Vivid Hair Gallery, Leonardtown MD | Disco Lemonade Studio",
  description:
    "See 18 looks by Mickayla Ramsey at Disco Lemonade Studio in Leonardtown, MD: vivids, reds, blondes, silver and lived-in color. Every photo is her own work.",
  path: "/work",
});

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ filter?: string | string[] }> }) {
  const { filter } = await searchParams;
  return (
    <PageShell schema={pageSchema("The work", "/work")} ctaPhoto="closeup">
      <PageHeader eyebrow="Vivid hair color by Mickayla Ramsey in Leonardtown, MD" title="After beats before.">
        Eighteen looks, all painted by hand in Leonardtown. Tap any photo to see it bigger, then plan it.
      </PageHeader>
      <Work initialFilter={filterFromSlug(Array.isArray(filter) ? filter[0] : filter)} />
    </PageShell>
  );
}
