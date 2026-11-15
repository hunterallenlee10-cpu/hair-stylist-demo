import { business, fullAddress } from "@/lib/business";
import { absoluteUrl, isLive } from "@/lib/site";

// A small courtesy file for AI assistants, served in live mode only.
// Demo mode: 404.
export function GET() {
  if (!isLive) return new Response("Not found", { status: 404 });
  const l = (label: string, path: string, note: string) => `- [${label}](${absoluteUrl(path)}): ${note}`;
  const body = `# ${business.name}

> Private, one-chair hair color studio in Leonardtown, Maryland (St. Mary's County, Southern Maryland), run by hairstylist ${business.owner}. Specializing in vivids and rainbows, and lived-in "vanilla" color too. Every new client starts with a free consultation by text.

## Book
- New clients: text the word CONSULTATION to ${business.phoneDisplay}
- Phone (text first, call second): ${business.phoneDisplay}
- Address: ${fullAddress}
- Hours: ${business.hours}
- [Instagram ${business.instagramHandle}](${business.instagramUrl}): her portfolio and DMs
- [Gift cards](${business.giftCardUrl}): sold online through Square

## Services
${l("Vivid hair color", "/services/vivid-hair-color", "rainbows, melts, panels and reds")}
${l("Balayage and lived-in color", "/services/lived-in-color-balayage", "brunette dimension, caramel balayage, soft grow-out")}
${l("Blonding and silver", "/services/blonding-and-silver", "bright Barbie blondes, icy silver, soft roots")}
${l("Color correction", "/services/color-correction", "box dye, old color, a whole new direction")}
${l("All services", "/services", "also shags and shullets, and hair gems")}

## Pages
${l("Home", "/", "the studio at a glance")}
${l("The work", "/work", "18 looks, every one her own work")}
${l("New here", "/new-here", "how booking works, FAQ, vivid care rules, model call")}
${l("The studio", "/studio", "the room, the address and the map")}
${l("Contact", "/contact", "text, call, Instagram and the consultation planner")}

## Good to know
- Pricing is quoted at the free consultation. No prices are published.
- ${business.sessionLine}
- Vivid care: cold water, wash less, heat protectant every time, turn the hot tools down.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
