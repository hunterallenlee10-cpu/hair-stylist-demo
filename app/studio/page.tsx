import { PageShell } from "@/components/PageShell";
import { Proof, Studio, StudioHero } from "@/components/sections/Studio";
import { pageMeta } from "@/lib/meta";
import { pageSchema } from "@/lib/schema";
import { photos } from "@/lib/photos";

export const metadata = pageMeta({
  title: "The Studio in Leonardtown, MD | Disco Lemonade Studio",
  description:
    "Disco Lemonade Studio is a private, one-chair hair color studio at 26011 Point Lookout Rd #3, Leonardtown, MD. One client at a time, by appointment.",
  path: "/studio",
  image: { url: "/og-studio.png", width: 1200, height: 630, alt: photos.mural.alt },
});

export default function StudioPage() {
  return (
    <PageShell schema={pageSchema("The studio", "/studio")} ctaPhoto="softBrunette">
      <StudioHero />
      <Studio />
      <Proof />
    </PageShell>
  );
}
