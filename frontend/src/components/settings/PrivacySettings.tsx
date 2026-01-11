import { useState } from "react";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";
import { Separator } from "@/components/ui/separator";

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [playlistDiscovery, setPlaylistDiscovery] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);

  return (
    <SettingsSection
      id="privacy"
      title="Privacy"
      description="Control who sees your activity and playlists."
    >
      <div className="space-y-2">
        <SettingsToggle
          id="profile-visibility"
          title="Profile Visibility"
          description="Allow others to find your profile by email or username."
          checked={profileVisibility}
          onCheckedChange={setProfileVisibility}
        />

        <Separator className="bg-border/30" />

        <SettingsToggle
          id="playlist-discovery"
          title="Playlist Discovery"
          description="Automatically make new generated playlists public."
          checked={playlistDiscovery}
          onCheckedChange={setPlaylistDiscovery}
        />

        <Separator className="bg-border/30" />

        <SettingsToggle
          id="activity-status"
          title="Activity Status"
          description="Show friends what you are currently generating or listening to."
          checked={activityStatus}
          onCheckedChange={setActivityStatus}
        />
      </div>
    </SettingsSection>
  );
};

export default PrivacySettings;
