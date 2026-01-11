import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRecentPlaylists } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

const RecentPlaylistsSection = () => {
  const { data: playlists = [], isLoading } = useRecentPlaylists(4);

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="soft-card overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Listening Highlights</h3>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          See all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group cursor-pointer"
          >
            <div className="soft-card overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {playlist.name}
                </h4>
                <p className="text-sm text-muted-foreground truncate mt-1">
                  {playlist.trackCount} tracks
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RecentPlaylistsSection;
