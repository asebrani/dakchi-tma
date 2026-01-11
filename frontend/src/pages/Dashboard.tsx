import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HeroFeatureCard from "@/components/dashboard/HeroFeatureCard";
import TopArtistsSection from "@/components/dashboard/TopArtistsSection";
import RecentPlaylistsSection from "@/components/dashboard/RecentPlaylistsSection";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero + Top Artists Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Hero Feature - 60% */}
          <div className="lg:col-span-3">
            <HeroFeatureCard />
          </div>

          {/* Top Artists - 40% */}
          <div className="lg:col-span-2">
            <TopArtistsSection />
          </div>
        </motion.div>

        {/* Listening Highlights */}
        <RecentPlaylistsSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
