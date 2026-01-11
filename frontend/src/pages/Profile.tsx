import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileHeaderNew from "@/components/profile/ProfileHeaderNew";
import AIPromptBanner from "@/components/profile/AIPromptBanner";
import PlaylistGridCard from "@/components/profile/PlaylistGridCard";
import MoodAffinity from "@/components/profile/MoodAffinity";
import MusicJourney from "@/components/profile/MusicJourney";
import { Button } from "@/components/ui/button";

const playlists = [
  {
    id: "1",
    title: "Neon Cyber-Rain",
    duration: "42m",
    genre: "Synthwave",
    coverUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop",
    isAI: true,
  },
  {
    id: "2",
    title: "Sunday Morning Coffee",
    duration: "1h 15m",
    genre: "Acoustic",
    coverUrl: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=400&h=400&fit=crop",
    isAI: false,
  },
  {
    id: "3",
    title: "Deep Work Flow",
    duration: "2h 05m",
    genre: "Ambient",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    isAI: true,
  },
  {
    id: "4",
    title: "Industrial Bass",
    duration: "38m",
    genre: "Techno",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    isAI: false,
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Profile Header */}
        <ProfileHeaderNew />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Playlists */}
          <section className="lg:col-span-8 flex flex-col gap-8">
            {/* AI Banner */}
            <AIPromptBanner />

            {/* Playlist Filters and Grid */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Tab Filters */}
                <div className="flex gap-0.5 p-1 bg-muted/30 rounded-xl border border-border">
                  {["All", "Favorites", "Generated"].map((tab) => (
                    <Button
                      key={tab}
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        activeTab === tab.toLowerCase()
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {tab}
                    </Button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                    Sort by
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-foreground text-xs font-medium bg-muted/30 border border-border rounded-lg px-3 hover:bg-muted"
                  >
                    Newest ↓
                  </Button>
                </div>
              </div>

              {/* Playlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {playlists.map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PlaylistGridCard {...playlist} />
                  </motion.div>
                ))}

                {/* Generate New Card */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-6 hover:border-primary/30 hover:bg-card/40 transition-all cursor-pointer group h-full min-h-[300px]"
                >
                  <div className="size-12 rounded-full bg-muted/30 border border-border flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-foreground">Generate New</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 max-w-[120px]">
                    Create a new vibe from text or image
                  </p>
                </motion.article>
              </div>
            </div>
          </section>

          {/* Right Column - Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <MoodAffinity />
            <MusicJourney />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
