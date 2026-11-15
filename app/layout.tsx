import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WaveDefs } from "@/components/WaveDefs";
import { ConsultProvider } from "@/components/ConsultBuilder/ConsultContext";
import { business } from "@/lib/business";
import { isLive, ogImage, siteUrl } from "@/lib/site";

// Fraunces, trimmed to how the site uses it: weights 600 to 900, SOFT 100,
// WONK 1 (see app/fonts/README.md). About half the bytes of the full variable font.
const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-SoftWonk-600-900.woff2", weight: "600 900", style: "normal" },
    { path: "./fonts/Fraunces-SoftWonk-600-900-Italic.woff2", weight: "600 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// DM Sans, trimmed the same way: weights 400 to 700 stay variable, optical
// size pinned at 14 (the site's text runs 13 to 22px). 22 KB instead of 36 KB.
const dmSans = localFont({
  src: [{ path: "./fonts/DMSans-400-700.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-dmsans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#120E10",
  width: "device-width",
  initialScale: 1,
};

const title = "Hair Color Studio in Leonardtown, MD | Disco Lemonade Studio";
const description =
  "Mickayla Ramsey paints vivids, rainbows and lived-in color by hand at Disco Lemonade Studio in Leonardtown, MD. Text CONSULTATION to (240) 561-8519.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Disco Lemonade Studio" },
  description,
  applicationName: business.name,
  authors: [{ name: business.owner }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title,
    description,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  // Demo mode stays out of Google; live mode is indexable.
  robots: isLive ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <WaveDefs />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-bold focus:text-on-accent"
        >
          Skip to content
        </a>
        <ConsultProvider>{children}</ConsultProvider>
        {/* Vercel Analytics only on Vercel builds; its script 404s anywhere else. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
