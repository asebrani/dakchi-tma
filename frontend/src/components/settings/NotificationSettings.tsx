import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SettingsSection from "./SettingsSection";

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const CheckboxItem = ({ id, label, checked, onCheckedChange }: CheckboxItemProps) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="border-border bg-muted/20"
    />
    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
      {label}
    </span>
  </label>
);

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    weeklyDigest: false,
    newFeatures: true,
    marketing: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    friendActivity: true,
    playlistShares: true,
    systemAlerts: true,
  });

  return (
    <SettingsSection
      id="notifications"
      title="Notifications"
      description="Manage system alerts and community interactions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Email Notifications
          </h3>
          <CheckboxItem
            id="weekly-digest"
            label="Weekly Digest"
            checked={emailNotifications.weeklyDigest}
            onCheckedChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, weeklyDigest: checked as boolean })
            }
          />
          <CheckboxItem
            id="new-features"
            label="New feature announcements"
            checked={emailNotifications.newFeatures}
            onCheckedChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, newFeatures: checked as boolean })
            }
          />
          <CheckboxItem
            id="marketing"
            label="Marketing & Tips"
            checked={emailNotifications.marketing}
            onCheckedChange={(checked) =>
              setEmailNotifications({ ...emailNotifications, marketing: checked as boolean })
            }
          />
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Push Notifications
          </h3>
          <CheckboxItem
            id="friend-activity"
            label="Friend Activity"
            checked={pushNotifications.friendActivity}
            onCheckedChange={(checked) =>
              setPushNotifications({ ...pushNotifications, friendActivity: checked as boolean })
            }
          />
          <CheckboxItem
            id="playlist-shares"
            label="Playlist Shares"
            checked={pushNotifications.playlistShares}
            onCheckedChange={(checked) =>
              setPushNotifications({ ...pushNotifications, playlistShares: checked as boolean })
            }
          />
          <CheckboxItem
            id="system-alerts"
            label="System Alerts"
            checked={pushNotifications.systemAlerts}
            onCheckedChange={(checked) =>
              setPushNotifications({ ...pushNotifications, systemAlerts: checked as boolean })
            }
          />
        </div>
      </div>
    </SettingsSection>
  );
};

export default NotificationSettings;
