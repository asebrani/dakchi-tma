import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";

interface PlaylistGridCardProps {
  title: string;
  duration: string;
  genre: string;
  coverUrl: string;
  isAI?: boolean;
}

const PlaylistGridCard = ({
  title,
  duration,
  genre,
  coverUrl,
  isAI = false,
}: PlaylistGridCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-lg overflow-hidden group cursor-pointer relative"
    >
      {/* Gradient glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/30 via-transparent to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
      
      <div className="aspect-square relative overflow-hidden bg-muted/20">
        <img
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
          src={coverUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/50 group-hover:via-black/20 transition-all duration-500" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100">
          <button className="size-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* AI Badge */}
        {isAI && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold tracking-wide uppercase text-white/90 border border-white/10 shadow-lg">
            AI Gen
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border relative bg-gradient-to-b from-transparent to-primary/5 group-hover:to-primary/10 transition-colors duration-500">
        <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">
          {title}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
          <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
          <span className="group-hover:text-foreground transition-colors">{genre}</span>
        </p>
      </div>
    </motion.article>
  );
};

export default PlaylistGridCard;
