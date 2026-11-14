import { business, fullAddress } from "./business";

// The visible FAQ and the FAQPage JSON-LD both read from this list, so they
// always match word for word. `link.text` must be a substring of `a`.
export const faqs: Array<{ q: string; a: string; link?: { text: string; href: string } }> = [
  {
    q: "Do you only do vivid colors?",
    a: "No. Vivids and rainbows are the specialty, and Mickayla also does blondes, brunettes, silver and copper. In her words: vanilla or otherwise.",
  },
  {
    q: "How do I book?",
    a: `Text the word CONSULTATION to ${business.phoneDisplay}, or use the planner on this site. Every new client starts with a consultation.`,
  },
  { q: "Does the consultation cost anything?", a: "No. It is complimentary." },
  {
    q: "How much will my color cost?",
    a: "Pricing depends on your hair and the look, and is quoted at your consultation.",
  },
  {
    // DRAFT: confirm typical session lengths
    q: "How long will I be in the chair?",
    a: "It depends on the look. Big transformations have run 6 to 9 hours. You will get a real estimate at your consult.",
  },
  {
    q: "How do I make vivid color last?",
    a: "Cold water, fewer washes, heat protectant every time, and lower heat on your tools.",
  },
  // DRAFT: confirm working days and hours ("By appointment")
  { q: "Where is the studio?", a: `${fullAddress}. By appointment.` },
  {
    q: "Do you sell gift cards?",
    a: `Yes. ${business.name} gift cards are sold online through Square.`,
    link: { text: "gift cards are sold online through Square", href: business.giftCardUrl },
  },
];
