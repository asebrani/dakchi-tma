import { motion } from "framer-motion";
import { Camera, Pencil } from "lucide-react";
import { mockUser } from "@/data/mockUser";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  onEditClick: () => void;
  isEditing: boolean;
}

const ProfileHeader = ({ onEditClick, isEditing }: ProfileHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-primary/20">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">{mockUser.name}</h1>
          <p className="text-sm text-muted-foreground mb-1">{mockUser.email}</p>
          <p className="text-xs text-muted-foreground/70">Member since {mockUser.joinDate}</p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-foreground">{mockUser.stats.totalPlaylists}</p>
              <p className="text-xs text-muted-foreground">Playlists</p>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-foreground">{mockUser.stats.hoursListened}h</p>
              <p className="text-xs text-muted-foreground">Listened</p>
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-foreground">{mockUser.stats.aiGenerations}</p>
              <p className="text-xs text-muted-foreground">AI Playlists</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          onClick={onEditClick}
          variant="outline"
          className="shrink-0 border-white/10 hover:bg-white/5 gap-2"
          disabled={isEditing}
        >
          <Pencil className="w-4 h-4" />
          <span className="hidden sm:inline">Edit Profile</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
