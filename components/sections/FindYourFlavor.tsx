import { SectionHeading } from "@/components/SectionHeading";
import { FlavorDial } from "@/components/FlavorDial/FlavorDial";
import { container, sectionPad } from "@/lib/ui";

export function FindYourFlavor() {
  return (
    <section id="find-your-flavor" aria-labelledby="flavor-title" className={`${sectionPad} border-y border-line bg-[#160F12]`}>
      <div className={container}>
        <SectionHeading id="flavor-title" kicker="Find your flavor" title="How loud are we going?" className="mb-12 lg:mb-16">
          Slide from vanilla to full rainbow. Every stop is real work from her chair.
        </SectionHeading>
        <FlavorDial />
      </div>
    </section>
  );
}
