import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { PhotoGrid } from "@/components/Gallery/PhotoGrid";
import { Draft } from "@/components/Draft";
import { business } from "@/lib/business";
import { gallery, type GalleryFilter } from "@/lib/gallery";
import { container, textLink } from "@/lib/ui";

/** The full gallery: all 18 photos, filterable, each one opening the lightbox. */
export function Work({ initialFilter = "All" }: { initialFilter?: GalleryFilter }) {
  return (
    <section aria-label="Gallery" className="pb-6 lg:pb-10">
      <div className={container}>
        <PhotoGrid
          entries={gallery}
          layout="masonry"
          filters
          captions
          initialFilter={initialFilter}
          eager={2}
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 420px, 50vw"
        />
        <p className="mx-auto mt-10 max-w-[40rem] text-center text-lead text-muted">
          Every photo here is her own work, from her own chair.{" "}
          <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${textLink} text-body`}>
            <InstagramIcon className="h-[18px] w-[18px] text-accent" />
            <Draft note="live Instagram count">500 more on Instagram {business.instagramHandle}</Draft>
          </a>
        </p>
      </div>
    </section>
  );
}
