// Photo registry. Alt text and captions come only from the photo map in the
// brief. Every photo is shot from behind: no client faces anywhere.
import dims from "./image-dimensions.json";

export type PhotoKey =
  | "melt"
  | "shego"
  | "gems"
  | "colorBlock"
  | "dipped"
  | "silver"
  | "vanilla"
  | "barbie";

export type Photo = {
  key: PhotoKey;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

function photo(key: PhotoKey, file: keyof typeof dims, alt: string, caption: string): Photo {
  const d = dims[file];
  return { key, src: `/images/${file}.webp`, width: d.width, height: d.height, alt, caption };
}

export const photos: Record<PhotoKey, Photo> = {
  melt: photo(
    "melt",
    "01-hot-pink-violet-blue-melt-back-BEST",
    "Back of a client's head: a hot pink crown melting into violet and electric blue waves.",
    "Hot pink crown melting into violet and electric blue",
  ),
  shego: photo(
    "shego",
    "02-shego-neon-lime-panels-on-dark-brown",
    "Back of a client's head: chunky neon lime panels through dark brown waves.",
    "Neon lime panels on dark brown. She calls this one SHEGO.",
  ),
  gems: photo(
    "gems",
    "03-emerald-green-with-hair-gems",
    "Emerald green waves covered in stick-on gems, stars and flowers, held up by Mickayla's hand.",
    "All over emerald green with hair gems",
  ),
  colorBlock: photo(
    "colorBlock",
    "04-magenta-black-blonde-color-block",
    "A blonde and magenta top layer lifted by hand to show a black underlayer.",
    "Magenta, black and blonde color block",
  ),
  dipped: photo(
    "dipped",
    "05-dimensional-blonde-with-pink-dipped-ends",
    "Bright dimensional blonde with a soft root and ends dipped in magenta and pink.",
    "Dimensional blonde with pink dipped ends",
  ),
  silver: photo(
    "silver",
    "06-silver-gray-waves-closeup",
    "Close up of silver gray waves, with Mickayla's pink nail holding a section.",
    "Silver gray waves",
  ),
  vanilla: photo(
    "vanilla",
    "07-vanilla-brunette-caramel-balayage",
    "Back of a client's head: brunette with caramel and honey balayage waves.",
    "Brunette with caramel and honey balayage",
  ),
  barbie: photo(
    "barbie",
    "08-long-bright-barbie-blonde-waves",
    "Very long bright blonde waves on a red tee, lifted by Mickayla's tattooed arm.",
    "Long bright Barbie blonde waves",
  ),
};
