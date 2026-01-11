import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsSection from "./SettingsSection";

const DangerZone = () => {
  return (
    <SettingsSection
      id="danger"
      title="Danger Zone"
      description="Irreversible actions for your account."
      variant="danger"
    >
      <div className="space-y-4">
        {/* Export Data */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/10 border border-border">
          <div>
            <h4 className="text-sm font-medium text-foreground">Export Data</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Download a copy of your playlists and preferences.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
            <Download className="w-4 h-4" />
            Start Export
          </Button>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/10 border border-red-900/30">
          <div>
            <h4 className="text-sm font-medium text-foreground">Delete Account</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Permanently remove your account and all data.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
};

export default DangerZone;
