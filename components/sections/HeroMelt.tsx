"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { photos } from "@/lib/photos";

const p = photos.melt;
const sizes = "(min-width: 1024px) 480px, (min-width: 640px) 340px, 300px";

/**
 * The Melt. Photo 01 loads in black and white, then after 300ms full colour
 * pours down from the crown to the ends behind a soft wavy edge, over 1.4s,
 * once. Two stacked copies of the same image (same URLs, one download); the
 * colour copy is revealed by sliding a wavy SVG mask. The box is reserved by
 * the parent's aspect ratio, so nothing shifts. Reduced motion: colour only.
 * The colour copy is the LCP image and is preloaded with `preload`.
 */
export function HeroMelt({ position = "50% 50%" }: { position?: string }) {
  const layer = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // motion is imported on demand, after the photo has loaded, so it never
  // competes with the hero image. 80% = edge above the crown; 17% = all colour.
  const start = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { animate } = await import("motion/react");
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
      <Image
        src={p.src}
        alt=""
        aria-hidden="true"
        width={p.width}
        height={p.height}
        sizes={sizes}
        loading="eager"
        className="melt-grey absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.08)_brightness(0.92)]"
        style={{ objectPosition: position }}
      />
      <div ref={layer} className="melt-color absolute inset-0">
        <Image
          src={p.src}
          alt={p.alt}
          width={p.width}
          height={p.height}
          sizes={sizes}
          preload
          fetchPriority="high"
          onLoad={start}
          ref={(el) => {
            if (el?.complete) start();
          }}
          className="h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <noscript>
        <style>{`.melt-color{-webkit-mask-image:none!important;mask-image:none!important}`}</style>
      </noscript>
    </>
  );
}
