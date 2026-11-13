import { LemonMark } from "./LemonMark";

/** "Disco Lemonade" in Fraunces italic 800, with STUDIO tracked beside it. */
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <LemonMark className={big ? "h-9 w-9 sm:h-11 sm:w-11" : "h-8 w-8"} />
      <span className="flex items-baseline gap-2">
        <span
          className={`display italic font-[800] leading-none text-ink ${big ? "text-[1.625rem] sm:text-[2rem]" : "text-[1.375rem]"}`}
        >
          Disco Lemonade
        </span>
        <span className={`font-sans font-bold tracking-[0.28em] text-muted ${big ? "text-[0.625rem] sm:text-xs" : "text-[0.625rem]"}`}>
          STUDIO
        </span>
      </span>
    </span>
  );
}
