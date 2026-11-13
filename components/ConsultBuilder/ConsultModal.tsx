"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { LemonMark } from "@/components/LemonMark";
import { ConsultForm } from "./ConsultForm";
import type { ConsultPreset } from "./ConsultContext";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex]:not([tabindex="-1"])';

/** The Consult Builder modal: Esc closes, focus is trapped, body scroll is locked. */
export default function ConsultModal({ preset, onClose }: { preset: ConsultPreset; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevPad = html.style.paddingRight;
    const sb = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (sb > 0) html.style.paddingRight = `${sb}px`;

    const panel = ref.current;
    const firstInput = panel?.querySelector<HTMLElement>("form input, form button[type=submit]");
    (firstInput ?? panel)?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null || el.tagName === "INPUT");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPad;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-[#0b0809]/80 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-surface outline-none animate-[sheetIn_260ms_ease-out] sm:max-h-[min(92dvh,860px)] sm:max-w-[680px] sm:rounded-[20px] sm:border sm:border-line max-sm:h-[100dvh]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-3 sm:px-8">
          <span className="flex items-center gap-2 font-semibold text-ink">
            <LemonMark className="h-6 w-6" />
            Plan My Dream Hair
          </span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid h-12 w-12 place-items-center rounded-full text-ink hover:text-accent"
            aria-label="Close the planner"
          >
            <X className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <div data-scroll className="overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:px-8">
          <ConsultForm preset={preset} titleId={titleId} />
        </div>
      </div>
    </div>
  );
}
