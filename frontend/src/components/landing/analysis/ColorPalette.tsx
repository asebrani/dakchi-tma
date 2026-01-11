import { motion } from "framer-motion";

interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette = ({ colors }: ColorPaletteProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">●</span>
          Extracted Palette
        </h3>
        <span className="text-xs text-muted-foreground/60">{colors.length} Dominant Tones</span>
      </div>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, index) => (
          <motion.div
            key={color}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.15 }}
            className="size-12 cursor-pointer rounded-full border-2 border-white/10 shadow-lg ring-2 ring-transparent transition-all hover:border-white hover:ring-white/20"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
