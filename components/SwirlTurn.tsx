"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Turns the hero swirl once every 90 seconds (CSS transform only) and pauses
 * it with animation-play-state while the hero is off screen. The small button
 * lets anyone stop it (WCAG 2.2.2). Under reduced motion the CSS keeps it
 * still and the button is hidden.
 */
export function SwirlTurn({
  children,
  boxClassName = "",
  buttonClassName = "",
}: {
  children: ReactNode;
  boxClassName?: string;
  buttonClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden="true" className={boxClassName}>
        <div ref={ref} data-paused={!visible || stopped} className="swirl-turn h-full w-full">
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setStopped((s) => !s)}
        aria-pressed={stopped}
        className={`z-10 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-bg/85 px-4 text-label font-medium text-muted backdrop-blur-sm transition-colors hover:border-primary hover:text-text motion-reduce:hidden ${buttonClassName}`}
      >
        {stopped ? <Play className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />}
        {stopped ? "Play swirl" : "Pause swirl"}
      </button>
    </>
  );
}
