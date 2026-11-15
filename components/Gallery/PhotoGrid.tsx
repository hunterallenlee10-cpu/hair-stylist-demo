"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { WavyFrame, shapeFor, type Shape } from "@/components/WavyFrame";
import { galleryFilters, type GalleryEntry, type GalleryFilter } from "@/lib/gallery";
import { photos } from "@/lib/photos";

const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

/**
 * A set of her photos in sequin mirror frames. Every photo is a button that
 * opens the shared lightbox, where "Plan this look" leads to booking.
 *
 * layout "masonry": each photo at its own proportions, in columns (the gallery).
 * layout "grid": equal frames of `shape`, laid out by `className`.
 * layout "row": a swipeable row on phones, a grid from `sm` up.
 */
export function PhotoGrid({
  entries,
  layout = "grid",
  shape = "portrait",
  filters = false,
  initialFilter = "All",
  captions = false,
  sizes,
  className = "",
  itemClassName = "",
  band = "card",
  positions = {},
  eager = 0,
}: {
  entries: GalleryEntry[];
  layout?: "masonry" | "grid" | "row";
  shape?: Shape;
  filters?: boolean;
  initialFilter?: GalleryFilter;
  captions?: boolean;
  sizes: string;
  className?: string;
  itemClassName?: string;
  band?: "card" | "sm" | "md";
  positions?: Partial<Record<string, string>>;
  /** Photos in the first screen load eagerly with high priority (masonry: the top of each phone column). */
  eager?: number;
}) {
  const [filter, setFilter] = useState<GalleryFilter>(initialFilter);
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const items = filters ? entries.filter((e) => filter === "All" || e.categories.includes(filter)) : entries;
  // Photos in the first screen load eagerly. CSS columns fill top to bottom, so in the
  // two-column phone masonry the top photos are item 0 and the first item of column two.
  const above = new Set<number>(
    eager > 0 ? (layout === "masonry" ? [0, Math.ceil(items.length / 2)] : Array.from({ length: eager }, (_, k) => k)) : [],
  );

  const list =
    layout === "masonry"
      ? "masonry columns-2 lg:columns-3 xl:columns-4"
      : layout === "row"
        ? // contain: paint keeps the swipeable row from widening a phone's layout viewport
          // (the scalloped clip-path on each card otherwise leaks into its width).
          "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [contain:paint] [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:[contain:none] [&::-webkit-scrollbar]:hidden"
        : "grid";

  return (
    <>
      {filters && (
        <div role="group" aria-label="Filter the work" className="-mx-1 mb-8 flex flex-wrap gap-2 lg:mb-10">
          {galleryFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-[44px] rounded-full border px-5 font-semibold transition-colors ${
                filter === f ? "border-accent bg-accent text-on-accent" : "border-line text-ink hover:border-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <ul className={`${list} ${className}`} aria-live={filters ? "polite" : undefined}>
        {items.map((e, i) => {
          const p = photos[e.photo];
          const own = layout === "masonry";
          return (
            <li key={e.photo} className={`${layout === "row" ? "w-[62%] shrink-0 snap-start sm:w-auto" : ""} ${itemClassName}`}>
              <figure>
                <button
                  type="button"
                  className="group block w-full rounded-[18px] text-left"
                  onClick={(ev) => {
                    trigger.current = ev.currentTarget;
                    setOpen(i);
                  }}
                  aria-haspopup="dialog"
                >
                  <span className="sr-only">Open larger: </span>
                  <WavyFrame
                    shape={own ? shapeFor(p.width, p.height) : shape}
                    band={band}
                    style={own ? { aspectRatio: `${p.width} / ${p.height}` } : undefined}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes={sizes}
                      loading={above.has(i) ? "eager" : "lazy"}
                      fetchPriority={above.has(i) ? "high" : undefined}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                      style={{ objectPosition: positions[e.photo] ?? "50% 40%" }}
                    />
                  </WavyFrame>
                </button>
                {captions && (
                  <figcaption className="mt-3 px-1 text-[0.9375rem] leading-snug text-muted">
                    <span className="mr-1.5 font-semibold text-ink">{e.categories[0]}.</span>
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          );
        })}
      </ul>

      {open !== null && (
        <Lightbox
          entries={items}
          index={open}
          onIndex={setOpen}
          onClose={() => {
            setOpen(null);
            requestAnimationFrame(() => trigger.current?.focus());
          }}
        />
      )}
    </>
  );
}
