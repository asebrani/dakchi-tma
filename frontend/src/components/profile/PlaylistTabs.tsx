import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaylistCard from "@/components/shared/PlaylistCard";
import { mockPlaylists, aiPlaylists, likedPlaylists } from "@/data/mockPlaylists";

const PlaylistTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getPlaylists = () => {
    switch (activeTab) {
      case "ai":
        return aiPlaylists;
      case "liked":
        return likedPlaylists;
      default:
        return mockPlaylists;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-xl font-bold text-foreground mb-6">My Playlists</h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="all"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            AI Generated
          </TabsTrigger>
          <TabsTrigger
            value="liked"
            className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Liked
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {getPlaylists().map((playlist, index) => (
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
        </TabsContent>
      </Tabs>
    </motion.section>
  );
};

export default PlaylistTabs;
