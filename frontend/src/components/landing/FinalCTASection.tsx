import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <motion.section 
      className="relative py-20 lg:py-32 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Top fade for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      
      {/* Abstract Background Visuals */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-[100px] opacity-60" />
        {/* Secondary Ambient Light */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto flex flex-col justify-center items-center px-6 md:px-10">
        <motion.div
          className="flex flex-col items-center max-w-[960px] text-center gap-8 md:gap-12 w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Headlines */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground max-w-4xl drop-shadow-sm">
              Turn your moments into <span className="text-primary">melodies.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-normal leading-relaxed max-w-2xl text-balance">
              Join thousands of creators using AI to soundtrack their lives. Upload an image, get a curated soundscape instantly.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-8 w-full">
            <motion.div
              className="flex justify-center w-full"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/auth"
                className="group relative flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg px-8 py-5 rounded-lg transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.4)] min-w-[280px]"
              >
                <Sparkles className="size-6" />
                <span>Let AI feel the music for you</span>
              </Link>
            </motion.div>

            {/* Footer / Secondary Links */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
              <a className="hover:text-primary transition-colors duration-200" href="#">
                Privacy Policy
              </a>
              <span className="w-1 h-1 rounded-full bg-border" />
              <a className="hover:text-primary transition-colors duration-200" href="#">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinalCTASection;
