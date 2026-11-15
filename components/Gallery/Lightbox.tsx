"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WavyFrame, shapeFor } from "@/components/WavyFrame";
import { useConsult } from "@/components/ConsultBuilder/ConsultContext";
import type { GalleryEntry } from "@/lib/gallery";
import { photos } from "@/lib/photos";
import { btnPrimary } from "@/lib/ui";

const FOCUSABLE = "a[href],button:not([disabled])";

/**
 * The shared lightbox (the gallery, the Flavor Dial thumbnails, the home grid,
 * the service rows). Arrow keys, Esc, swipe. Each photo leads to booking:
 * "Plan this look" closes the lightbox and opens the planner with the
 * matching look pre-selected. Loaded on first open only.
 */
export default function Lightbox({
  entries,
  index,
  onIndex,
  onClose,
}: {
  entries: GalleryEntry[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const { openBuilder } = useConsult();
  const n = entries.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);
  const entry = entries[index];
  const p = photos[entry.photo];

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && n > 1) go(1);
      else if (e.key === "ArrowLeft" && n > 1) go(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
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
  }, [go, n, onClose]);

  const plan = () => {
    onClose();
    // Let focus return to the photo first, so the planner returns it there too.
    requestAnimationFrame(() => requestAnimationFrame(() => openBuilder({ looks: [entry.flavor] })));
  };

  const navBtn =
    "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent";
  // Never wider than the photo's own width, and never taller than the screen allows.
  const maxW = Math.min(560, p.width);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}: ${p.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#0b0809]/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null || n < 2) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-muted" aria-hidden="true">
          {index + 1} / {n}
        </p>
        <button type="button" data-autofocus onClick={onClose} className={navBtn} aria-label="Close photo">
          <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 sm:gap-6 sm:px-6"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {n > 1 && (
          <button type="button" onClick={() => go(-1)} className={`${navBtn} hidden sm:grid`} aria-label="Previous photo">
            <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        )}
        <figure className="flex max-h-full min-h-0 flex-col items-center">
          <div
            style={{
              width: `min(${maxW}px, calc(100vw - 32px), calc((100dvh - 260px) * ${p.width / p.height}))`,
            }}
          >
            <WavyFrame shape={shapeFor(p.width, p.height)} band="md" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
              <Image
                key={p.src}
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes={`(min-width: 640px) ${maxW}px, 100vw`}
                loading="eager"
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </WavyFrame>
          </div>
          <figcaption className="mt-4 max-w-[36rem] px-2 text-center text-ink">{p.caption}</figcaption>
        </figure>
        {n > 1 && (
          <button type="button" onClick={() => go(1)} className={`${navBtn} hidden sm:grid`} aria-label="Next photo">
            <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 px-4 pb-[max(20px,env(safe-area-inset-bottom))] pt-4 sm:flex-row sm:justify-center sm:gap-6">
        <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
          {n > 1 && (
            <button type="button" onClick={() => go(-1)} className={`${navBtn} sm:hidden`} aria-label="Previous photo">
              <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          )}
          <button type="button" onClick={plan} aria-haspopup="dialog" className={`${btnPrimary} flex-1 sm:flex-none`}>
            Plan this look <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
          </button>
          {n > 1 && (
            <button type="button" onClick={() => go(1)} className={`${navBtn} sm:hidden`} aria-label="Next photo">
              <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
        {entry.permalink && (
          <a
            href={entry.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            <InstagramIcon className="h-[18px] w-[18px] text-accent" />
            See this post on Instagram
          </a>
        )}
      </div>
    </div>
  );
}
