import type { Metadata } from "next";
import { business } from "./business";
import { absoluteUrl, ogImage } from "./site";

/** Full metadata for a sub-page. `title` is the complete title tag (60 characters or fewer). */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: business.name,
      title,
      description,
      url: absoluteUrl(path),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
