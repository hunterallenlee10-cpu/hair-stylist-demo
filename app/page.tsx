import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
