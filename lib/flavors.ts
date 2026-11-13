import type { PhotoKey } from "./photos";

// The five Flavor Dial stops. `builder` is the Consult Builder option it pre-selects.
export const flavors = [
  {
    name: "Vanilla",
    photo: "vanilla",
    readout: "Lived-in color that looks like you, on a very good day. Caramel, honey, soft grow-out.",
    builder: "Vanilla",
  },
  {
    name: "A pop",
    photo: "dipped",
    readout: "Mostly natural, with one loud secret. Dipped ends or a hidden flash of color.",
    builder: "A pop",
  },
  {
    name: "Panels",
    photo: "shego",
    readout: "High contrast on purpose. Bold panels through your natural shade.",
    builder: "Panels",
    note: "She calls this one SHEGO.",
  },
  {
    name: "Color block",
    photo: "colorBlock",
    readout: "Two or three colors in clean sections. Flip your hair, change the look.",
    builder: "Color block",
  },
  {
    name: "Full rainbow",
    photo: "melt",
    readout: "All in. A full melt of color from root to ends.",
    builder: "Full rainbow",
  },
] as const satisfies ReadonlyArray<{
  name: string;
  photo: PhotoKey;
  readout: string;
  builder: string;
  note?: string;
}>;
