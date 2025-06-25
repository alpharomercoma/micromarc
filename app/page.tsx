import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { ResearchSection } from "@/components/research-section";
import { SponsorsSection } from "@/components/sponsors-section";
import { TargetAudienceSection } from "@/components/target-audience-section";
import { TeamSection } from "@/components/team-section";
import { TimelineSection } from "@/components/timeline-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <TimelineSection />
        <TeamSection />
        <TargetAudienceSection />
        <SponsorsSection />
        {/* <ContributeSection /> */}
      </main>
      <Footer />
    </div>
  );
}
