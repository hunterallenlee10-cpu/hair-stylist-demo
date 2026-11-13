import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WaveDefs } from "@/components/WaveDefs";
import { ConsultProvider } from "@/components/ConsultBuilder/ConsultContext";
import { business } from "@/lib/business";
import { isLive, ogImage, siteUrl } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#120E10",
  width: "device-width",
  initialScale: 1,
};

const title = "Vivid Hair Color in Leonardtown, MD | Disco Lemonade Studio";
const description =
  "Mickayla Ramsey paints vivids, rainbows and lived-in color at Disco Lemonade Studio in Leonardtown, MD. Text CONSULTATION to (240) 561-8519 to start.";

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
        <Analytics />
      </body>
    </html>
  );
}
