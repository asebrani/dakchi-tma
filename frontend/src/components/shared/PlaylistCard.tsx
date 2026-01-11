import { motion } from "framer-motion";
import { Play, Heart, ImageIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Playlist } from "@/data/mockPlaylists";

interface PlaylistCardProps {
  playlist: Playlist;
  className?: string;
}

const PlaylistCard = ({ playlist, className }: PlaylistCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden glass-card cursor-pointer",
        className
      )}
    >
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
          >
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          </motion.button>
        </div>

        {/* Generation Type Badge */}
        {playlist.generationType && playlist.generationType !== "manual" && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium">
            {playlist.generationType === "mood" ? (
              <Sparkles className="w-3 h-3 text-primary" />
            ) : (
              <ImageIcon className="w-3 h-3 text-primary" />
            )}
            <span className="text-white/90">{playlist.generationTag}</span>
          </div>
        )}

        {/* Like Button */}
        {playlist.isLiked && (
          <div className="absolute top-3 right-3">
            <Heart className="w-5 h-5 text-primary fill-primary" />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">{playlist.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {playlist.trackCount} tracks • {playlist.duration}
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">{playlist.creator}</p>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;
