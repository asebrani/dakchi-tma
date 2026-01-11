import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { AuthButton } from "@/components/ui/auth-button";
import HeroVisual from "./HeroVisual";
import SocialProof from "./SocialProof";

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.main 
      className="flex-grow flex items-center relative pt-20 min-h-screen"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full bg-primary/5 blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[40%] -right-[10%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] rounded-full bg-primary/5 blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <motion.div
            className="flex flex-col gap-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-foreground">
                Turn images and moods into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                  playlists
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                Upload a photo or describe a vibe. Our AI instantly curates the
                perfect soundtrack for your moment, tailored just for you.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <AuthButton
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="gap-2 w-full sm:w-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Playlist
                </AuthButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <AuthButton
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("#how-it-works")}
                  className="gap-2 w-full sm:w-auto"
                >
                  <Play className="w-5 h-5" />
                  How it works
                </AuthButton>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialProof />
            </motion.div>
          </motion.div>

          {/* Right Column: Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default HeroSection;
