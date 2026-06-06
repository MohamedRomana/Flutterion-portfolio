import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Specialization } from "@/components/sections/Specialization";
import { Stats } from "@/components/sections/Stats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AllProjects } from "@/components/sections/AllProjects";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Specialization />
      <Stats />
      <FeaturedProjects />
      <AllProjects />
      <Skills />
      <TechStack />
      <Process />
      <Experience />
      <Services />
      <ContactCTA />
    </>
  );
}
