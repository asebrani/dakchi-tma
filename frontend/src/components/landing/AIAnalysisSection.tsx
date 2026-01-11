import { motion } from "framer-motion";
import { Gauge, Music, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ColorPalette from "./analysis/ColorPalette";
import MoodTags from "./analysis/MoodTags";
import AnalysisMetric from "./analysis/AnalysisMetric";
import ImagePreview from "./analysis/ImagePreview";
const colors = ["#0f172a", "#3b82f6", "#818cf8", "#c084fc", "#f472b6"];
const moods = [{
  label: "Cyberpunk"
}, {
  label: "Melancholic"
}, {
  label: "Nocturnal"
}, {
  label: "Urban"
}, {
  label: "Futuristic",
  highlighted: true
}];
const AIAnalysisSection = () => {
  return <motion.section 
    id="ai-analysis"
    className="relative w-full py-20 lg:py-32 px-4 lg:px-10 overflow-hidden"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.7 }}
  >
      {/* Top fade for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
        {/* Left Column: Visual Input */}
        <ImagePreview imageUrl="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&auto=format&fit=crop" fileName="neon_city_night.jpg" fileSize="2.4 MB" />

        {/* Right Column: AI Analysis */}
        <div className="flex w-full flex-1 flex-col justify-center gap-8 lg:max-w-[540px]">
          {/* Header Text */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="flex flex-col gap-3">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground lg:text-5xl">
              See the <span className="text-primary">Music</span>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our AI has decoded the visual input. Below is the sonic DNA extracted from your image's mood, color, and context.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px w-full bg-border/50" />

          {/* Analysis Dashboard */}
          <div className="flex flex-col gap-6">
            <ColorPalette colors={colors} />
            <MoodTags moods={moods} />

            {/* Tempo & Genre Grid */}
            <div className="grid grid-cols-2 gap-4">
              <AnalysisMetric icon={Gauge} label="Tempo" value={92} subtitle="BPM" progress={45} />
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.1
            }} className="flex flex-col gap-2 rounded-xl bg-card/30 p-4 border border-border/50">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                  <Music className="size-4" />
                  Genre Match
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-foreground truncate">Synthwave</span>
                  <span className="text-xs text-muted-foreground">Electronic / Lo-Fi</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="mt-4 pt-4 border-t border-border/50">
            <Button size="lg" className="group relative w-full h-14 text-lg font-bold overflow-hidden">
              <span className="relative z-10">Generate Playlist from Vibe</span>
              <ArrowRight className="relative z-10 ml-2 size-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-pulse" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="size-3.5" />
              Powered by  1337





  
 

 




 
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>;
};
export default AIAnalysisSection;