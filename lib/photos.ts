// Photo registry. Alt text and captions come only from the photo map in the
// brief. Every photo is shot from behind or close up: no client faces anywhere.
// Crops (signs, a face in profile, a bystander) live in scripts/optimize-images.mjs.
import dims from "./image-dimensions.json";

export type PhotoKey =
  | "melt"
  | "shego"
  | "gems"
  | "colorBlock"
  | "dipped"
  | "silver"
  | "vanilla"
  | "barbie"
  | "mural"
  | "fire"
  | "ribbons"
  | "nineHour"
  | "closeup"
  | "firstColor"
  | "beforeAfter"
  | "inProgress"
  | "hiddenRainbow"
  | "softBrunette";

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
  mural: photo(
    "mural",
    "09-studio-swirl-mural-sequin-lemon",
    "Her studio wall: a hot pink, lemon yellow, lime and orange swirl mural with a round pink sequin lemon mirror.",
    "The studio wall: her swirl mural and the pink sequin lemon",
  ),
  fire: photo(
    "fire",
    "10-fire-panels-red-orange-on-black",
    "Back of a client's head: black hair with red, orange and yellow fire panels at the part.",
    "Fire panels: red, orange and yellow on black",
  ),
  ribbons: photo(
    "ribbons",
    "11-red-ribbons-through-dark-curls",
    "Back of a client's head: long dark curls with bright red ribbons all through.",
    "Bright red ribbons through long dark curls",
  ),
  nineHour: photo(
    "nineHour",
    "12-nine-hour-magenta-melt-straight",
    "Very long straight magenta hair melting to deep berry, held up by Mickayla's hand.",
    "Magenta melting to deep berry. A nine hour day.",
  ),
  closeup: photo(
    "closeup",
    "13-magenta-violet-closeup-pink-claw",
    "Close up of magenta melting into violet and blue, with Mickayla's pink and lilac nail.",
    "Magenta into violet into blue, up close",
  ),
  firstColor: photo(
    "firstColor",
    "14-first-color-rich-brunette-waves",
    "Long rich chocolate brunette waves with soft caramel dimension, lifted by Mickayla's hand.",
    "Rich brunette with soft caramel. A client's first ever color.",
  ),
  beforeAfter: photo(
    "beforeAfter",
    "15-before-after-red-inset",
    "Her before and after graphic: a dull dark before photo inset over the glossy red after.",
    "Before and after: dull dark to glossy red",
  ),
  inProgress: photo(
    "inProgress",
    "16-in-progress-pink-painting",
    "From behind: hot pink color painted on in sections over a cape, mid-appointment.",
    "Mid-paint. Pink goes on in sections.",
  ),
  hiddenRainbow: photo(
    "hiddenRainbow",
    "17-hidden-rainbow-under-brown-veil",
    "A rich brown bob lifted by hand to show a hidden magenta, violet and orange underlayer.",
    "A hidden rainbow under a brown veil",
  ),
  softBrunette: photo(
    "softBrunette",
    "18-soft-brunette-balayage-back",
    "Soft brunette balayage waves, seen from behind.",
    "Soft brunette balayage",
  ),
};
