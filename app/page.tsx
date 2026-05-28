import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { ResearchSection } from "@/components/research-section";
import { SponsorsSection } from "@/components/sponsors-section";
import { TeamSection } from "@/components/team-section";
import UploadSection from "@/components/upload-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <UploadSection />
        <TeamSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
}
