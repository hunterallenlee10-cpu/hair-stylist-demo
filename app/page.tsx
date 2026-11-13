import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { WhyDisco } from "@/components/sections/WhyDisco";
import { FindYourFlavor } from "@/components/sections/FindYourFlavor";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Footer } from "@/components/sections/Footer";
import { WavyDivider } from "@/components/WavyDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WavyDivider />
        <WhyDisco />
        <FindYourFlavor />
        <Services />
        <Work />
      </main>
      <Footer />
    </>
  );
}
