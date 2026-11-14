import { PageHeader, PageShell } from "@/components/PageShell";
import { Studio } from "@/components/sections/Studio";
import { Reviews } from "@/components/sections/Reviews";
import { pageMeta } from "@/lib/meta";
import { pageSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "The Studio in Leonardtown, MD | Disco Lemonade Studio",
  description:
    "Disco Lemonade Studio is a private, one-chair hair color studio at 26011 Point Lookout Rd #3, Leonardtown, MD. One client at a time, by appointment.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <PageShell schema={pageSchema("The studio", "/studio")}>
      <PageHeader
        eyebrow="A private vivid hair color studio in Leonardtown, MD"
        title="Black walls. Pink mirror. Lots of lemons."
      />
      <Studio />
      <Reviews />
    </PageShell>
  );
}
