import { motion } from "framer-motion";
import { Play, Share2, Music } from "lucide-react";

const PlaylistReadyVisual = () => {
  return (
    <>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-0" />

      {/* Playlist Stack */}
      <div className="relative w-full max-w-[240px] flex flex-col items-center pt-8">
        {/* Card 3 (Bottom) */}
        <div className="absolute top-4 w-[90%] h-16 bg-muted/30 rounded-lg border border-border scale-90 opacity-40" />
        
        {/* Card 2 (Middle) */}
        <div className="absolute top-0 w-[95%] h-16 bg-muted/50 rounded-lg border border-border scale-95 opacity-70" />
        
        {/* Card 1 (Top - Main) */}
        <motion.div
          className="relative w-full bg-secondary rounded-xl border border-border p-3 shadow-2xl flex items-center gap-3 z-10"
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Album Art */}
          <div className="w-12 h-12 rounded bg-gradient-to-br from-muted to-card flex-shrink-0 flex items-center justify-center">
            <Music className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Text Lines */}
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-2.5 w-3/4 bg-foreground/20 rounded-full" />
            <div className="h-2 w-1/2 bg-foreground/10 rounded-full" />
          </div>

          {/* Play Button */}
          <motion.div
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4 fill-current" />
          </motion.div>
        </motion.div>

        {/* Export Button */}
        <motion.div
          className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(33, 212, 105, 0.2)" }}
        >
          <Share2 className="w-4 h-4" />
          Export to Spotify
        </motion.div>
      </div>
    </>
  );
};

export default PlaylistReadyVisual;
