import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AIAnalysisSection from "@/components/landing/AIAnalysisSection";
import TrustedBySection from "@/components/landing/TrustedBySection";
import FinalCTASection from "@/components/landing/FinalCTASection";

const Index = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background">
      <Navbar />
      <div className="pt-16" /> {/* Spacer for fixed navbar */}
      <HeroSection />
      <HowItWorksSection />
      <AIAnalysisSection />
      <TrustedBySection />
      <FinalCTASection />
    </div>
  );
};

export default Index;
