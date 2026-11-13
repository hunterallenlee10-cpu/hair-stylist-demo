import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { WhyDisco } from "@/components/sections/WhyDisco";
import { FindYourFlavor } from "@/components/sections/FindYourFlavor";
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
      </main>
      <Footer />
    </>
  );
}
