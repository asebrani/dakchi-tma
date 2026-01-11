import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";

const SetSceneVisual = () => {
  const chips = [
    { label: "Energetic", className: "-top-4 -right-12 bg-muted/50 text-foreground rotate-12" },
    { label: "Melancholic", className: "top-8 -left-16 bg-primary/20 text-primary -rotate-6" },
    { label: "Late Night", className: "-bottom-8 -right-14 bg-muted/30 text-muted-foreground rotate-3" },
  ];

  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Upload Circle */}
        <motion.div
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center mb-6 bg-background/50"
          whileHover={{ scale: 1.05, borderColor: "rgba(33, 212, 105, 0.8)" }}
          transition={{ duration: 0.3 }}
        >
          <ImagePlus className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
        </motion.div>

        {/* Floating Chips */}
        {chips.map((chip, index) => (
          <motion.div
            key={chip.label}
            className={`absolute px-3 py-1 backdrop-blur-md rounded-full text-xs font-medium border border-border shadow-lg ${chip.className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.1 }}
          >
            {chip.label}
          </motion.div>
        ))}

        <p className="text-sm font-medium text-muted-foreground mt-2">
          Drop image or select mood
        </p>
      </div>
    </>
  );
};

export default SetSceneVisual;
