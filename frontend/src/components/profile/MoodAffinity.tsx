import { motion } from "framer-motion";
import { PieChart, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodItem {
  name: string;
  percentage: number;
  color: string;
}

const moodData: MoodItem[] = [
  { name: "Melancholic", percentage: 42, color: "bg-primary" },
  { name: "Euphoric", percentage: 28, color: "bg-emerald-500" },
  { name: "Serene", percentage: 15, color: "bg-teal-600" },
];

const MoodAffinity = () => {
  return (
    <motion.div 
      className="glass-card rounded-xl p-5 relative overflow-hidden group/mood"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/5 opacity-0 group-hover/mood:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover/mood:opacity-50 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-5 border-b border-border pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-muted-foreground group-hover/mood:text-primary transition-colors duration-300" />
          <h3 className="font-display font-bold text-sm text-foreground uppercase tracking-wide">
            Mood Affinity
          </h3>
        </div>
        <motion.button 
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings2 className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-4 relative z-10">
        {moodData.map((mood, index) => (
          <motion.div
            key={mood.name}
            className="group cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between text-[11px] font-medium mb-1.5">
              <span className="text-foreground group-hover:text-primary transition-colors">
                {mood.name}
              </span>
              <span className="text-muted-foreground font-mono group-hover:text-primary transition-colors">{mood.percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden group-hover:bg-muted/50 transition-colors">
              <motion.div
                className={cn("h-full rounded-full", mood.color, "group-hover:shadow-[0_0_12px_rgba(33,212,105,0.4)] transition-shadow duration-300")}
                initial={{ width: 0 }}
                animate={{ width: `${mood.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodAffinity;
