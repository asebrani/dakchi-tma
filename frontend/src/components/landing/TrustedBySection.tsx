import { motion } from "framer-motion";
import { Music, Zap, ShieldCheck, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import MetricCard from "./metrics/MetricCard";

const metrics = [
  {
    icon: Music,
    value: "1.2M+",
    label: "Playlists Generated",
    showSeparator: true,
  },
  {
    icon: Zap,
    value: "< 2s",
    label: "Avg. Generation Time",
    showSeparator: true,
  },
  {
    icon: ShieldCheck,
    value: "98%",
    label: "Match Accuracy",
    showSeparator: true,
  },
  {
    icon: Users,
    value: "50k+",
    label: "Monthly Active Users",
    showSeparator: false,
  },
];

const TrustedBySection = () => {
  return (
    <motion.section 
      id="trusted-by"
      className="relative py-20 lg:py-32 overflow-hidden"
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 lg:px-20 relative z-10">
        <SectionHeader
          title="Trusted by Music Lovers"
          highlightedWord="Music"
          description="Our AI engine processes millions of signals to curate the perfect vibe instantly."
        />

        {/* Glass panel container */}
        <motion.div
          className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                showSeparator={metric.showSeparator}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrustedBySection;
