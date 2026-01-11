import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import PlaylistCard from "@/components/shared/PlaylistCard";
import { aiPlaylists } from "@/data/mockPlaylists";

const AIPlaylistsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Your AI Playlists</h3>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          See all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {aiPlaylists.slice(0, 4).map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <PlaylistCard playlist={playlist} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AIPlaylistsSection;
