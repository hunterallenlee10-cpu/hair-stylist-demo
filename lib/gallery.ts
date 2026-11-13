import type { PhotoKey } from "./photos";

export const galleryFilters = ["All", "Vivids", "Blondes", "Lived-in"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];

// Categories come from the photo map. Captions come from lib/photos.ts only:
// no invented client names, formulas or timings.
export const gallery: Array<{ photo: PhotoKey; category: Exclude<GalleryFilter, "All"> }> = [
  { photo: "melt", category: "Vivids" },
  { photo: "barbie", category: "Blondes" },
  { photo: "shego", category: "Vivids" },
  { photo: "vanilla", category: "Lived-in" },
  { photo: "gems", category: "Vivids" },
  { photo: "silver", category: "Blondes" },
  { photo: "colorBlock", category: "Vivids" },
  { photo: "dipped", category: "Vivids" },
];
