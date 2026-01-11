import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIPromptBanner = () => {
  return (
    <div className="relative rounded-full p-[1px] bg-gradient-to-r from-primary/20 via-border to-transparent overflow-hidden group">
      <div className="bg-card/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4 relative">
        <div className="flex items-center justify-center size-7 rounded-full bg-primary/10 shrink-0">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>

        <div className="flex-1 overflow-hidden relative h-6">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent z-10" />

          {/* Marquee content */}
          <motion.div
            className="flex items-center whitespace-nowrap gap-16 text-xs text-muted-foreground h-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span>
              Try generating a <span className="text-foreground font-medium">'Nostalgic'</span> playlist based on your recent likes...
            </span>
            <span>
              Discover artists similar to <span className="text-foreground font-medium">'The Midnight'</span>...
            </span>
            <span>
              Your <span className="text-foreground font-medium">'Focus'</span> activity is up 20% this week...
            </span>
            <span>
              Try generating a <span className="text-foreground font-medium">'Nostalgic'</span> playlist based on your recent likes...
            </span>
            <span>
              Discover artists similar to <span className="text-foreground font-medium">'The Midnight'</span>...
            </span>
          </motion.div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-[10px] font-bold uppercase tracking-wider text-primary border-primary/20 hover:bg-primary/20 hover:text-primary whitespace-nowrap px-3 py-1 h-auto rounded-full"
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default AIPromptBanner;
