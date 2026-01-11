import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AuthButton } from "@/components/ui/auth-button";
import SectionHeader from "./SectionHeader";
import StepCard from "./StepCard";
import SetSceneVisual from "./visuals/SetSceneVisual";
import AIAnalysisVisual from "./visuals/AIAnalysisVisual";
import PlaylistReadyVisual from "./visuals/PlaylistReadyVisual";
const steps = [{
  stepNumber: "01",
  title: "Set the Scene",
  description: "Upload a photo or select a mood tag. Whether it's a sunset view or a workout session, define the atmosphere you want.",
  Visual: SetSceneVisual
}, {
  stepNumber: "02",
  title: "AI Analysis",
  description: "Our engine scans for color, emotion, and context, translating visual data into complex sonic patterns and genres.",
  Visual: AIAnalysisVisual
}, {
  stepNumber: "03",
  title: "Your Mix is Ready",
  description: "Instantly receive a curated playlist perfectly matched to your vibe. Listen, tweak, and export directly to Spotify.",
  Visual: PlaylistReadyVisual
}];
const HowItWorksSection = () => {
  const navigate = useNavigate();
  return <motion.section id="how-it-works" className="relative w-full py-16 lg:py-24 bg-background" initial={{
    opacity: 0,
    y: 50
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    amount: 0.1
  }} transition={{
    duration: 0.7
  }}>
      {/* Top fade for smooth transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Turn Vibe into Sound" highlightedWord="Sound" description="Our AI analyzes your visual world to curate the perfect sonic backdrop in three simple steps." />

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[160px] left-0 w-full h-[2px] z-0 px-12">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent border-t border-dashed border-primary/30" />
          </div>

          {steps.map((step, index) => <StepCard key={step.stepNumber} stepNumber={step.stepNumber} title={step.title} description={step.description} index={index}>
              <step.Visual />
            </StepCard>)}
        </div>

        {/* CTA */}
        
      </div>
    </motion.section>;
};
export default HowItWorksSection;