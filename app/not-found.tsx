import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LemonMark } from "@/components/LemonMark";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Disco Lemonade Studio" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="py-[96px] lg:py-[160px]">
        <div className={`${container} max-w-[720px] text-center`}>
          <LemonMark className="mx-auto h-20 w-20" />
          <p className="eyebrow mt-8 text-muted">Error 404</p>
          <h1 className="display mt-3 text-[2.75rem] font-[800] leading-[1] text-ink sm:text-[4rem]">
            This page went <span className="italic text-accent">vanilla.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[30rem] text-lg text-muted">
            Nothing lives here. The good stuff is back on the home page.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className={btnGhost}>
              Back to the home page
            </Link>
            <PlanButton className={btnPrimary} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
