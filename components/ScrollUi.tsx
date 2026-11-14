"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref } from "@/lib/business";

/**
 * Mobile-only action bar with the two ways in: [Text] [Plan My Hair]. It
 * appears once the hero buttons scroll away. Calling stays one tap away in
 * the menu and the footer. Back to top floats bottom right on desktop after
 * 1.5 screens; the pages are short enough on a phone not to need it.
 */
export function ScrollUi() {
  const [y, setY] = useState(0);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const on = () => {
      setY(window.scrollY);
      setVh(window.innerHeight);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const showBar = y > vh * 0.6;
  const showTop = y > vh * 1.5;
  const item = "flex min-h-[52px] min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 font-bold";

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 transition-transform duration-300 lg:hidden ${
          showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
        aria-hidden={!showBar}
        inert={!showBar}
      >
        <div className="mx-auto flex max-w-[560px] gap-2">
          <a href={smsHref()} className={`${item} flex-1 border border-line text-ink`} aria-label={`Text CONSULTATION to ${business.phoneDisplay}`}>
            <MessageCircle className="h-5 w-5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
            Text
          </a>
          <PlanButton className={`${item} flex-[1.8] bg-accent text-on-accent`}>Plan My Hair</PlanButton>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
        }
        className={`fixed bottom-8 right-8 z-30 hidden h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink shadow-soft transition-[opacity,transform] duration-300 hover:border-accent hover:text-accent lg:grid ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
      </button>
    </>
  );
}
