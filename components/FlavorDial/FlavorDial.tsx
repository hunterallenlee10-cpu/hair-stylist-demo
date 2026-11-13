"use client";

import Image from "next/image";
import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { WavyFrame } from "@/components/WavyFrame";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { flavors } from "@/lib/flavors";
import { photos } from "@/lib/photos";
import { business } from "@/lib/business";
import { btnPrimary } from "@/lib/ui";

const LAST = flavors.length; // 5

/**
 * The Flavor Dial. A native <input type="range"> (real slider semantics,
 * arrow keys, Home and End for free) styled as five mirror tiles with a lemon
 * thumb. Moving it crossfades the photo (250ms) and swaps the readout.
 * On first view it sweeps once from 1 to 5, then never moves by itself again.
 */
export function FlavorDial() {
  const reduce = useReducedMotion();
  const [stop, setStop] = useState<number>(LAST); // server and no-JS: Full rainbow
  const rootRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const swept = useRef(false);
  const sweep = useRef<ReturnType<typeof animate> | null>(null);
  const readoutId = useId();

  // Arm the sweep: start at 1 while the section is still off screen.
  useEffect(() => {
    if (reduce || swept.current) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) setStop(1);
    else swept.current = true; // already on screen (deep link or reload): stay put

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || swept.current) return;
        swept.current = true;
        io.disconnect();
        sweep.current = animate(1, LAST, {
          duration: 2,
          delay: 0.25,
          ease: [0.45, 0, 0.25, 1],
          onUpdate: (v) => {
            if (!touched.current) setStop(Math.round(v));
          },
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      sweep.current?.stop();
    };
  }, [reduce]);

  const choose = (n: number) => {
    touched.current = true;
    sweep.current?.stop();
    setStop(Math.min(LAST, Math.max(1, n)));
  };

  // Tap or drag anywhere on the track (touch included) picks the nearest stop.
  const dragging = useRef(false);
  const fromPointer = (e: React.PointerEvent<HTMLInputElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - r.left - 28) / Math.max(1, r.width - 56);
    choose(Math.round(Math.min(1, Math.max(0, ratio)) * (LAST - 1)) + 1);
  };

  const f = flavors[stop - 1];
  const pct = ((stop - 1) / (LAST - 1)) * 100;

  return (
    <div ref={rootRef} className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      {/* Photo: stacked, crossfaded. Lazy images still load as the section nears the viewport. */}
      <figure className="mx-auto w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]">
        <WavyFrame shape="portrait" className="shadow-soft">
          {flavors.map((fl, i) => {
            const p = photos[fl.photo];
            const active = i === stop - 1;
            return (
              <Image
                key={fl.name}
                src={p.src}
                alt={active ? p.alt : ""}
                aria-hidden={active ? undefined : true}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 320px"
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[250ms] ease-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </WavyFrame>
        <figcaption className="mt-4 min-h-[28px] text-center text-muted lg:text-left lg:pl-4">
          {"note" in f ? f.note : photos[f.photo].caption}
        </figcaption>
      </figure>

      <div>
        <div id={readoutId} aria-live="off">
          <p className="eyebrow text-muted">
            Stop <span className="text-accent">{stop}</span> of {LAST}
          </p>
          <p className="display mt-3 text-[2.75rem] font-[800] italic leading-none text-ink sm:text-[3.5rem]">{f.name}</p>
          <p className="mt-4 min-h-[5.25rem] max-w-[34rem] text-lg leading-relaxed text-muted sm:min-h-[3.5rem]">
            {f.readout}
          </p>
        </div>

        {/* The dial */}
        <div className="relative mt-8 select-none">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-14">
            <div className="absolute inset-x-[28px] top-1/2 h-[2px] -translate-y-1/2 bg-line" />
            <div
              className="absolute left-[28px] top-1/2 h-[2px] -translate-y-1/2 bg-accent transition-[width] duration-200"
              style={{ width: `calc((100% - 56px) * ${pct / 100})` }}
            />
            {flavors.map((fl, i) => {
              const on = i < stop;
              return (
                <span
                  key={fl.name}
                  className={`absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-[7px] border transition-colors duration-200 ${
                    on ? "border-accent bg-[#3A1424]" : "border-line bg-surface"
                  }`}
                  style={{ left: `calc(28px + (100% - 56px) * ${i / (LAST - 1)})` }}
                >
                  <span className="grid h-full w-full grid-cols-2 gap-[2px] p-[4px]">
                    {[0, 1, 2, 3].map((k) => (
                      <span
                        key={k}
                        className={`rounded-[2px] ${on ? "bg-accent" : "bg-line"}`}
                        style={{ opacity: on ? [1, 0.7, 0.8, 0.55][k] : 1 }}
                      />
                    ))}
                  </span>
                </span>
              );
            })}
          </div>
          <label htmlFor="flavor-dial" className="sr-only">
            How loud are we going? Choose a flavor from Vanilla to Full rainbow.
          </label>
          <input
            id="flavor-dial"
            type="range"
            min={1}
            max={LAST}
            step={1}
            value={stop}
            aria-valuetext={f.name}
            aria-describedby={readoutId}
            onChange={(e) => choose(Number(e.target.value))}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture?.(e.pointerId);
              fromPointer(e);
            }}
            onPointerMove={(e) => dragging.current && fromPointer(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            className="flavor-range relative z-10 block"
          />
          <div aria-hidden="true" className="relative mt-1 h-12">
            {flavors.map((fl, i) => (
              <button
                key={fl.name}
                type="button"
                tabIndex={-1}
                onClick={() => choose(i + 1)}
                className={`absolute top-0 flex min-h-[44px] w-[4.5rem] -translate-x-1/2 items-start justify-center text-center text-sm font-semibold leading-tight transition-colors sm:w-24 sm:text-[0.9375rem] ${
                  i === stop - 1 ? "text-ink" : "text-muted hover:text-ink"
                } ${i === 0 ? "!translate-x-0 justify-start !text-left" : ""} ${
                  i === LAST - 1 ? "!-translate-x-full justify-end !text-right" : ""
                }`}
                style={{ left: i === 0 ? 0 : i === LAST - 1 ? "100%" : `calc(28px + (100% - 56px) * ${i / (LAST - 1)})` }}
              >
                {fl.name}
              </button>
            ))}
          </div>
        </div>

        {/* DRAFT: confirm typical session lengths */}
        <p className="mt-8 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted">
          {business.sessionLine} Your consultation gives you the real number.
        </p>

        <PlanButton preset={{ looks: [f.builder] }} className={`${btnPrimary} mt-8 w-full sm:w-auto`}>
          Plan this look <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
        </PlanButton>
      </div>
    </div>
  );
}
