"use client";

import Image from "next/image";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import { photos } from "@/lib/photos";

const p = photos.melt;
const sizes = "(min-width: 1024px) 520px, (min-width: 640px) 560px, 100vw";

/**
 * The Melt. Photo 01 loads in black and white, then after 300ms full colour
 * pours down from the crown to the ends behind a soft wavy edge, over 1.4s,
 * once. Two stacked copies of the same image (one URL, one download); the
 * colour copy is revealed by sliding a wavy SVG mask. The box is reserved by
 * the parent's aspect ratio, so nothing shifts. Reduced motion: colour only.
 */
export function HeroMelt() {
  const reduce = useReducedMotion();
  // 0.8 = edge sits just above the crown (all black and white); 0.17 = all colour.
  const y = useMotionValue(80);
  const maskPosition = useMotionTemplate`50% ${y}%`;
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current || reduce) return;
    started.current = true;
    animate(y, 17, { delay: 0.3, duration: 1.4, ease: [0.55, 0.05, 0.35, 1] });
  }, [reduce, y]);

  return (
    <>
      <Image
        src={p.src}
        alt=""
        aria-hidden="true"
        width={p.width}
        height={p.height}
        sizes={sizes}
        preload
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.08)_brightness(0.92)]"
      />
      <motion.div
        className="melt-color absolute inset-0"
        style={reduce ? undefined : { WebkitMaskPosition: maskPosition, maskPosition }}
      >
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
        />
      </motion.div>
      <noscript>
        <style>{`.melt-color{-webkit-mask-image:none!important;mask-image:none!important}`}</style>
      </noscript>
    </>
  );
}
