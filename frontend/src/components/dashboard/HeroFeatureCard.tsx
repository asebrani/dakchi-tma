import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroFeatureCard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden soft-card p-8 h-full"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary">AI-Powered</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Generate Your Perfect Playlist
        </h2>

        <p className="text-muted-foreground text-sm md:text-base mb-8 flex-1">
          Create personalized playlists based on your mood or upload an image to let AI curate your perfect soundtrack.
        </p>

        <Button
          onClick={() => navigate("/generate")}
          className="group bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 rounded-xl text-sm font-semibold w-fit"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Playlist
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroFeatureCard;
