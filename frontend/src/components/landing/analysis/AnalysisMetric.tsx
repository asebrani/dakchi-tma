import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnalysisMetricProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
}

const AnalysisMetric = ({ icon: Icon, label, value, subtitle, progress }: AnalysisMetricProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-2 rounded-xl bg-card/30 p-4 border border-border/50"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {subtitle && <span className="text-sm font-medium text-muted-foreground">{subtitle}</span>}
      </div>
      {progress !== undefined && (
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      )}
    </motion.div>
  );
};

export default AnalysisMetric;
