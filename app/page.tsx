import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Layers from "@/components/Layers";
import AIDemo from "@/components/AIDemo";
import ExtraFeatures from "@/components/ExtraFeatures";
import Architecture from "@/components/Architecture";
import Roadmap from "@/components/Roadmap";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Layers />
        <AIDemo />
        <ExtraFeatures />
        <Architecture />
        <Roadmap />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
