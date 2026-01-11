import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  showSeparator?: boolean;
}

const MetricCard = ({ icon: Icon, value, label, showSeparator = false }: MetricCardProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center gap-3 relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="size-12 rounded-full bg-card border border-border flex items-center justify-center mb-2 group-hover:border-primary/50 transition-colors duration-300">
        <Icon className="text-primary size-6" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
          {value}
        </h3>
        <p className="text-primary text-xs font-medium tracking-[0.15em] uppercase mt-1">
          {label}
        </p>
      </div>
      {/* Vertical separator for larger screens */}
      {showSeparator && (
        <div className="hidden lg:block absolute right-[-1.5rem] top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      )}
    </motion.div>
  );
};

export default MetricCard;
