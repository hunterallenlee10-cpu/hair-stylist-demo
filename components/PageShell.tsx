import type { ReactNode } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { ScrollUi } from "@/components/ScrollUi";
import { JsonLd } from "@/components/JsonLd";
import { container } from "@/lib/ui";

/** Shared frame for every page: nav, main, closing call to action, footer, mobile bar. */
export function PageShell({
  children,
  schema,
  cta = true,
  ctaSteps = false,
}: {
  children: ReactNode;
  schema?: object;
  cta?: boolean;
  ctaSteps?: boolean;
}) {
  return (
    <>
      {schema && <JsonLd data={schema} />}
      <Nav />
      <main id="main">
        {children}
        {cta && <FinalCta steps={ctaSteps} />}
      </main>
      <Footer />
      <ScrollUi />
    </>
  );
}

/**
 * Sub-page header. The eyebrow and the display line together are the page's
 * single h1, so the service and the town are real heading text.
 */
export function PageHeader({ eyebrow, title, children }: { eyebrow: ReactNode; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="pb-10 pt-10 lg:pb-14 lg:pt-20">
      <div className={container}>
        <h1>
          <span className="eyebrow block text-muted">{eyebrow}</span>
          <span className="display mt-4 block max-w-[52rem] text-[2.5rem] font-[800] leading-[0.98] text-ink xs:text-[2.875rem] sm:text-[4rem] lg:text-[4.5rem]">
            {title}
          </span>
        </h1>
        {children && <div className="mt-5 max-w-[38rem] text-lg leading-relaxed text-muted">{children}</div>}
      </div>
    </header>
  );
}
