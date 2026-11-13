"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type ConsultPreset = {
  /** Step 1 options to pre-select, by label. */
  looks?: string[];
  /** Tick "I would like to be a vivid model" on step 4. */
  model?: boolean;
};

type Ctx = {
  openBuilder: (preset?: ConsultPreset) => void;
};

const ConsultCtx = createContext<Ctx | null>(null);

const ConsultModal = dynamic(() => import("./ConsultModal"), { ssr: false });

export function ConsultProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<ConsultPreset>({});
  const [session, setSession] = useState(0);
  const returnFocus = useRef<HTMLElement | null>(null);

  const openBuilder = useCallback((p: ConsultPreset = {}) => {
    returnFocus.current = (document.activeElement as HTMLElement) ?? null;
    setPreset(p);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => returnFocus.current?.focus?.());
  }, []);

  const value = useMemo(() => ({ openBuilder }), [openBuilder]);

  return (
    <ConsultCtx.Provider value={value}>
      {children}
      {open && <ConsultModal key={session} preset={preset} onClose={close} />}
    </ConsultCtx.Provider>
  );
}

export function useConsult() {
  const ctx = useContext(ConsultCtx);
  if (!ctx) throw new Error("useConsult must be used inside <ConsultProvider>");
  return ctx;
}
