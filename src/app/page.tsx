import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AllProjects } from "@/components/sections/AllProjects";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { CVSection } from "@/components/sections/CVSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Manifesto />
      <FeaturedProjects />
      <AllProjects />
      <About />
      <Services />
      <Skills />
      <Process />
      <CVSection />
      <ContactCTA />
    </>
  );
}
