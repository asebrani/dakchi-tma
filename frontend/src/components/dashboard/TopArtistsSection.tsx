import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ArtistAvatar from "@/components/shared/ArtistAvatar";
import { useTopArtists } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

const TopArtistsSection = () => {
  const { data: artists = [], isLoading } = useTopArtists(6);

  const leftColumn = artists.slice(0, 3);
  const rightColumn = artists.slice(3, 6);

  if (isLoading) {
    return (
      <div className="soft-card p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="soft-card p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Your Top Artists</h3>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          See all
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 flex-1">
        <div className="space-y-1">
          {leftColumn.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ArtistAvatar artist={artist} variant="list" />
            </motion.div>
          ))}
        </div>

        <div className="space-y-1">
          {rightColumn.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: (index + 3) * 0.05 }}
            >
              <ArtistAvatar artist={artist} variant="list" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TopArtistsSection;
