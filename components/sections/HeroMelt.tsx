"use client";

import { useCallback, useRef } from "react";
import { preload } from "react-dom";
import { photos } from "@/lib/photos";

const p = photos.melt;
const base = "/images/hero/01-hot-pink-violet-blue-melt-back-BEST";
const srcSet = [480, 720, 960, 1200].map((w) => `${base}-${w}.webp ${w}w`).join(", ");
const sizes = "(min-width: 1024px) 520px, (min-width: 640px) 560px, calc(100vw - 40px)";
const src = `${base}-720.webp`;

/**
 * The Melt. Photo 01 loads in black and white, then after 300ms full colour
 * pours down from the crown to the ends behind a soft wavy edge, over 1.4s,
 * once. Two stacked copies of the same image (one URL, one download); the
 * colour copy is revealed by sliding a wavy SVG mask. The box is reserved by
 * the parent's aspect ratio, so nothing shifts. Reduced motion: colour only.
 * The hero uses static pre-sized files (npm run images) so the LCP image never
 * waits on the on-demand image optimizer.
 */
export function HeroMelt() {
  preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  const layer = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Framer Motion is imported on demand, after the photo has loaded, so it
  // never competes with the hero image. 80% = edge just above the crown
  // (all black and white); 17% = all colour.
  const start = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { animate } = await import("framer-motion/dom");
    const el = layer.current;
    if (!el) return;
    animate(80, 17, {
      delay: 0.3,
      duration: 1.4,
      ease: [0.55, 0.05, 0.35, 1],
      onUpdate: (v) => {
        const pos = `50% ${v}%`;
        el.style.maskPosition = pos;
        el.style.setProperty("-webkit-mask-position", pos);
      },
    });
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt=""
        aria-hidden="true"
        width={p.width}
        height={p.height}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.08)_brightness(0.92)]"
      />
      <div ref={layer} className="melt-color absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={p.alt}
          width={p.width}
          height={p.height}
          fetchPriority="high"
            onLoad={start}
          ref={(el) => {
            if (el?.complete) start();
          }}
          className="h-full w-full object-cover"
        />
      </div>
      <noscript>
        <style>{`.melt-color{-webkit-mask-image:none!important;mask-image:none!important}`}</style>
      </noscript>
    </>
  );
}
