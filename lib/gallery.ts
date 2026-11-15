import type { PhotoKey } from "./photos";

export const galleryFilters = ["All", "Vivids", "Reds", "Blondes and silver", "Lived-in", "In the chair"] as const;
export type GalleryFilter = (typeof galleryFilters)[number];
export type GalleryCategory = Exclude<GalleryFilter, "All">;

/** URL-safe slug for each filter, so service pages can link to /work?filter=reds. */
export const filterSlug: Record<GalleryFilter, string> = {
  All: "all",
  Vivids: "vivids",
  Reds: "reds",
  "Blondes and silver": "blondes-and-silver",
  "Lived-in": "lived-in",
  "In the chair": "in-the-chair",
};
export const filterFromSlug = (slug?: string): GalleryFilter =>
  (Object.entries(filterSlug).find(([, s]) => s === slug)?.[0] as GalleryFilter) ?? "All";

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

export type GalleryEntry = {
  photo: PhotoKey;
  categories: GalleryCategory[];
  /** Consult Builder look it pre-selects ("Plan this look"). */
  flavor: string;
  /** Her own Instagram post, where we have it. */
  permalink?: string;
};

// All 18 photos. Order mixes loud and quiet so every filter opens strong.
// Captions and alt text live in lib/photos.ts.
export const gallery: GalleryEntry[] = [
  { photo: "melt", categories: ["Vivids"], flavor: "Full rainbow" },
  { photo: "beforeAfter", categories: ["Reds"], flavor: "Correction or big change", permalink: ig("DOZJbinD9LV") },
  { photo: "fire", categories: ["Vivids"], flavor: "Panels", permalink: ig("DUytvusj5bm") },
  { photo: "firstColor", categories: ["Lived-in"], flavor: "Vanilla", permalink: ig("Dfugik6llk6") },
  { photo: "shego", categories: ["Vivids"], flavor: "Panels" },
  { photo: "ribbons", categories: ["Reds"], flavor: "Panels", permalink: ig("DY7jwQln6Af") },
  { photo: "barbie", categories: ["Blondes and silver"], flavor: "Blonding or silver" },
  { photo: "hiddenRainbow", categories: ["Vivids"], flavor: "A pop", permalink: ig("DPj9Z8xj63x") },
  { photo: "inProgress", categories: ["In the chair"], flavor: "Full rainbow", permalink: ig("DT6h5e4DHLc") },
  { photo: "closeup", categories: ["Vivids"], flavor: "Full rainbow", permalink: ig("DaqbWxiJOsN") },
  { photo: "vanilla", categories: ["Lived-in"], flavor: "Vanilla" },
  { photo: "gems", categories: ["Vivids"], flavor: "Sparkly things" },
  { photo: "nineHour", categories: ["Reds", "Vivids"], flavor: "Full rainbow", permalink: ig("DYz9zXNiZn2") },
  { photo: "silver", categories: ["Blondes and silver"], flavor: "Blonding or silver" },
  { photo: "colorBlock", categories: ["Vivids"], flavor: "Color block" },
  { photo: "softBrunette", categories: ["Lived-in"], flavor: "Vanilla", permalink: ig("DUVtu5rjm8D") },
  { photo: "dipped", categories: ["Blondes and silver", "Vivids"], flavor: "A pop" },
  { photo: "mural", categories: ["In the chair"], flavor: "Not sure yet", permalink: ig("DVZYwOcDyHv") },
];

export const entryFor = (photo: PhotoKey) => gallery.find((g) => g.photo === photo)!;
export const entriesFor = (keys: PhotoKey[]) => keys.map(entryFor);
