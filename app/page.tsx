import Header from "@/components/Header";
import HeroSection from "@/components/HeroSecion";
import { ValuePropositionSection } from "@/components/ValuePropositinSecio";
import { PlansSection } from "@/components/PlanSection";
import { TestimonialsSection } from "@/components/TestimonialSection";
import { FaqSection } from "@/components/FraqSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow">
        <HeroSection />
        <ValuePropositionSection />
        <PlansSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
    </div>
  );
}
