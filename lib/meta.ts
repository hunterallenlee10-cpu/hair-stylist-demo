import type { Metadata } from "next";
import { business } from "./business";
import { absoluteUrl, ogImage } from "./site";

type OgImage = { url: string; width: number; height: number; alt: string };

/** Full metadata for a sub-page. `title` is the complete title tag (60 characters or fewer). */
export function pageMeta({
  title,
  description,
  path,
  image = ogImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
}): Metadata {
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
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
