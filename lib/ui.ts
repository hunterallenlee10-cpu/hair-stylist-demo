// Shared class strings. Buttons are 52px tall (44px minimum tap target).
const base =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-bold transition-[transform,background-color,color,border-color] duration-200 active:scale-[0.97] select-none";

export const btnPrimary = `${base} bg-accent text-on-accent hover:bg-[#ff5c9f]`;
export const btnGhost = `${base} border border-line text-ink hover:border-accent hover:text-accent`;
export const btnDark = `${base} bg-bg text-ink hover:bg-[#2a2024]`;
export const textLink =
  "inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent";

export const sectionPad = "py-[72px] lg:py-[120px]";
export const container = "mx-auto w-full max-w-[1360px] px-5 sm:px-8";
