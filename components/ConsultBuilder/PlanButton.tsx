"use client";

import type { ReactNode } from "react";
import { btnPrimary } from "@/lib/ui";
import { useConsult, type ConsultPreset } from "./ConsultContext";

/** Anything that opens the Consult Builder is a <button>, never a link. */
export function PlanButton({
  children = "Plan My Dream Hair",
  preset,
  className = btnPrimary,
  ...rest
}: {
  children?: ReactNode;
  preset?: ConsultPreset;
  className?: string;
  "aria-label"?: string;
}) {
  const { openBuilder } = useConsult();
  return (
    <button type="button" className={className} onClick={() => openBuilder(preset)} aria-haspopup="dialog" {...rest}>
      {children}
    </button>
  );
}
