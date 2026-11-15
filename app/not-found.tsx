import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LemonMark } from "@/components/LemonMark";
import { Swirl } from "@/components/Swirl";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Disco Lemonade Studio" },
  robots: { index: false, follow: true },
};

/** 404: the third and last place the swirl appears. Still, not turning. */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="relative overflow-hidden py-[72px] lg:py-[120px]">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]`}>
          <div>
            <p className="flex items-center gap-2 text-label font-medium text-muted">
              <LemonMark className="h-5 w-5" />
              Error 404
            </p>
            <h1 className="display mt-4 text-h1 font-[800] text-ink">
              This page went <span className="italic text-accent">vanilla.</span>
            </h1>
            <p className="mt-5 max-w-[30rem] text-lead text-muted">
              Nothing lives here. The good stuff is one tap away: her work, her services, or a plan for your own dream hair.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PlanButton className={btnPrimary} />
              <Link href="/work" className={btnGhost}>
                See her work
              </Link>
              <Link href="/" className={btnGhost}>
                Back to the home page
              </Link>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto grid aspect-square w-full max-w-[460px] place-items-center">
            <Swirl id="lost" halo className="absolute inset-0 h-full w-full opacity-[0.88]" />
            <LemonMark className="relative h-28 w-28 drop-shadow-[0_12px_24px_rgb(0_0_0/0.6)]" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
