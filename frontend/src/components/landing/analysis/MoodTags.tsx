import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MoodTagsProps {
  moods: { label: string; highlighted?: boolean }[];
}

const MoodTags = ({ moods }: MoodTagsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">◆</span>
        Detected Moods
      </h3>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood, index) => (
          <motion.span
            key={mood.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className={cn(
              "inline-flex cursor-default items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              mood.highlighted
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-card/50 text-foreground border border-border/50 hover:bg-card hover:border-primary/30"
            )}
          >
            {mood.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default MoodTags;
