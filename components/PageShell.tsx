import { ViewTransition, type ReactNode } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { ScrollUi } from "@/components/ScrollUi";
import { JsonLd } from "@/components/JsonLd";
import { LemonMark } from "@/components/LemonMark";
import type { PhotoKey } from "@/lib/photos";
import type { CtaTitle } from "@/components/sections/FinalCta";
import { container } from "@/lib/ui";

/** Shared frame for every page: nav, main, closing call to action, footer, mobile bar. */
export function PageShell({
  children,
  schema,
  cta = true,
  ctaSteps = false,
  ctaPhoto = "silver",
  ctaTitle,
}: {
  children: ReactNode;
  schema?: object;
  cta?: boolean;
  ctaSteps?: boolean;
  /** The photo in the closing call to action. Varied per page so it is never the same band twice. */
  ctaPhoto?: PhotoKey;
  /** The closing headline, varied per page. */
  ctaTitle?: CtaTitle;
}) {
  return (
    <>
      {schema && <JsonLd data={schema} />}
      <Nav />
      {/* Route changes: the page content crossfades and rises a little; the nav holds still. */}
      <ViewTransition enter="page-enter" exit="page-exit" default="none">
        <main id="main">
          {children}
          {cta && <FinalCta steps={ctaSteps} photo={ctaPhoto} title={ctaTitle} />}
        </main>
      </ViewTransition>
      <Footer />
      <ScrollUi />
    </>
  );
}

/**
 * The page's single h1: a small sentence-case label (the service or "hair
 * color" plus "Leonardtown, MD") and the large display line.
 */
export function PageTitle({ eyebrow, title, id }: { eyebrow: ReactNode; title: ReactNode; id?: string }) {
  return (
    <h1 id={id}>
      <span className="flex items-center gap-2 font-sans text-label font-medium text-muted">
        <LemonMark className="h-5 w-5" />
        {eyebrow}
      </span>
      <span className="display mt-4 block max-w-[52rem] text-h1 font-[800] text-ink">{title}</span>
    </h1>
  );
}

/** Sub-page header: the h1 and an optional intro. */
export function PageHeader({ eyebrow, title, children }: { eyebrow: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="pb-10 pt-10 lg:pb-14 lg:pt-16">
      <div className={container}>
        <PageTitle eyebrow={eyebrow} title={title} />
        {children && <div className="mt-5 max-w-[40rem] text-lead text-muted">{children}</div>}
      </div>
    </header>
  );
}
