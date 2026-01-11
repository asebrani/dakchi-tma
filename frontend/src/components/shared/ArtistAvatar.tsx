import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { Artist } from "@/data/mockArtists";

interface ArtistAvatarProps {
  artist: Artist;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "circle" | "list";
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

const ArtistAvatar = ({ artist, className, size = "md", variant = "circle" }: ArtistAvatarProps) => {
  if (variant === "list") {
    return (
      <motion.div
        whileHover={{ backgroundColor: "hsla(0, 0%, 100%, 0.05)" }}
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors",
          className
        )}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">
            {artist.name}
          </p>
          <p className="text-xs text-muted-foreground">{artist.listeners} listeners</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col items-center gap-2 cursor-pointer group", className)}
    >
      <div
        className={cn(
          "rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-300",
          sizeClasses[size]
        )}
      >
        <img
          src={artist.avatar}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate max-w-[100px]">
          {artist.name}
        </p>
        <p className="text-xs text-muted-foreground">{artist.listeners} listeners</p>
      </div>
    </motion.div>
  );
};

export default ArtistAvatar;
