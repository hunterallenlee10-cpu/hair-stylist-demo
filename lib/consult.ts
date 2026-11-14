// Consult Builder options and the prefilled text message.
// No phone field: the plan is sent as a text from the client's own phone,
// so Mickayla already has the number.
export const lookOptions = [
  "Vanilla",
  "A pop",
  "Panels",
  "Color block",
  "Full rainbow",
  "Blonding or silver",
  "Correction or big change",
  "Cut",
  "Sparkly things",
  "Not sure yet",
] as const;

export const hairNowOptions = [
  { label: "Never colored (virgin)", short: "never colored (virgin)" },
  { label: "Colored at a salon", short: "colored at a salon" },
  { label: "Box dye at home", short: "box dye" },
  { label: "Already lightened or bleached", short: "already lightened or bleached" },
  { label: "Has vivid color in it now", short: "has vivid color in it now" },
] as const;

export const lengthOptions = ["Above shoulders", "Shoulder length", "Past shoulders", "Very long"] as const;
export const thicknessOptions = ["Fine", "Medium", "Thick"] as const;
export const dayOptions = ["Weekdays", "Weekends", "Either"] as const;

export type ConsultAnswers = {
  looks: string[];
  hairNow: string;
  length: string;
  thickness: string;
  longSession: boolean;
  model: boolean;
  dream: string;
  name: string;
  days: string;
};

export const emptyAnswers: ConsultAnswers = {
  looks: [],
  hairNow: "",
  length: "",
  thickness: "",
  longSession: false,
  model: false,
  dream: "",
  name: "",
  days: "",
};

const clean = (s: string) => s.trim().replace(/\s+/g, " ").replace(/\.$/, "");

/**
 * Starts with CONSULTATION, the way she already sorts new clients. Example:
 * "CONSULTATION. Hi Mickayla, I am Jess. Looking for: Full rainbow. My hair now:
 *  box dye, past shoulders, thick. Best days: weekends."
 */
export function buildSmsBody(a: ConsultAnswers) {
  const parts = ["CONSULTATION."];
  parts.push(a.name.trim() ? `Hi Mickayla, I am ${clean(a.name)}.` : "Hi Mickayla.");
  if (a.looks.length) parts.push(`Looking for: ${a.looks.join(", ")}.`);
  const hair = [
    hairNowOptions.find((h) => h.label === a.hairNow)?.short,
    a.length.toLowerCase(),
    a.thickness.toLowerCase(),
  ].filter(Boolean);
  if (hair.length) parts.push(`My hair now: ${hair.join(", ")}.`);
  if (a.dream.trim()) parts.push(`Dream hair: ${clean(a.dream)}.`);
  if (a.longSession) parts.push("Happy to sit for a long session.");
  if (a.model) parts.push("I would like to be a vivid model.");
  if (a.days) parts.push(`Best days: ${a.days === "Either" ? "either" : a.days.toLowerCase()}.`);
  return parts.join(" ");
}
