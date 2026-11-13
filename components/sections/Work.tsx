"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { gallery, galleryFilters, type GalleryFilter } from "@/lib/gallery";
import { photos } from "@/lib/photos";
import { business } from "@/lib/business";
import { container, sectionPad, textLink } from "@/lib/ui";

export function Work() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = gallery.filter((g) => filter === "All" || g.category === filter);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className={`${sectionPad} border-y border-line bg-[#160F12]`}>
      <div className={container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[44rem]">
            <p className="eyebrow text-muted">The work</p>
            <h2 id="work-title" className="display mt-3 text-[2.5rem] font-[800] leading-[0.98] text-ink sm:text-[3.25rem] lg:text-[4rem]">
              After beats before.
            </h2>
            <p className="mt-5 text-lg text-muted">
              Every photo here is her own work, straight from her chair.{" "}
              <span className="display italic text-ink">after &gt;&gt;&gt;&gt;&gt; before.</span>
            </p>
          </div>
          <div role="group" aria-label="Filter the work" className="-mx-1 flex flex-wrap gap-2">
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
        </div>

        <ul className="masonry mt-12 columns-2 lg:mt-16 lg:columns-3 xl:columns-4" aria-live="polite">
          {items.map((g) => {
            const p = photos[g.photo];
            const idx = items.indexOf(g);
            return (
              <li key={g.photo}>
                <figure>
                  <button
                    type="button"
                    className="group block w-full text-left"
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget;
                      setOpenIdx(idx);
                    }}
                    aria-label={`Open larger: ${p.caption}`}
                    aria-haspopup="dialog"
                  >
                    <div
                      className="wave-portrait relative overflow-hidden bg-surface"
                      style={{ aspectRatio: `${p.width} / ${p.height}` }}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        sizes="(min-width: 1280px) 320px, (min-width: 1024px) 420px, 50vw"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-3 px-1 text-[0.9375rem] leading-snug text-muted">
                    <span className="mr-2 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-ink">{g.category}</span>
                    {p.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center">
          <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
            <Instagram className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
            See 500 more on Instagram {business.instagramHandle}
          </a>
        </p>
      </div>

      {openIdx !== null && (
        <Lightbox
          items={items.map((g) => photos[g.photo])}
          index={openIdx}
          onIndex={setOpenIdx}
          onClose={() => {
            setOpenIdx(null);
            requestAnimationFrame(() => triggerRef.current?.focus());
          }}
        />
      )}
    </section>
  );
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: (typeof photos)[keyof typeof photos][];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const n = items.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);
  const p = items[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = Array.from(ref.current.querySelectorAll<HTMLElement>("button"));
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const navBtn =
    "grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}: ${p.caption}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#0b0809]/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-muted">
          {index + 1} / {n}
        </p>
        <button type="button" data-autofocus onClick={onClose} className={navBtn} aria-label="Close photo">
          <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-6 sm:gap-6 sm:px-6" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" onClick={() => go(-1)} className={`${navBtn} hidden sm:grid`} aria-label="Previous photo">
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
        <figure className="flex max-h-full min-h-0 flex-col items-center">
          <div
            className="wave-portrait relative min-h-0 overflow-hidden bg-surface"
            style={{
              aspectRatio: `${p.width} / ${p.height}`,
              height: `min(calc(100dvh - 190px), ${Math.round((640 * p.height) / p.width)}px, calc((100vw - 24px) * ${p.height / p.width}))`,
            }}
          >
            <Image
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(min-width: 640px) 640px, 100vw"
              loading="eager"
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
          </div>
          <figcaption className="mt-4 max-w-[36rem] text-center text-ink">{p.caption}</figcaption>
        </figure>
        <button type="button" onClick={() => go(1)} className={`${navBtn} hidden sm:grid`} aria-label="Next photo">
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <div className="flex justify-center gap-4 pb-6 sm:hidden">
        <button type="button" onClick={() => go(-1)} className={navBtn} aria-label="Previous photo">
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} className={navBtn} aria-label="Next photo">
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
