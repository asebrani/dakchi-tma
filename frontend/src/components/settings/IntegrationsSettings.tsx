import { Music, Link2, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsSection from "./SettingsSection";

const IntegrationsSettings = () => {
  return (
    <SettingsSection
      id="integrations"
      title="Integrations"
      description="Connect your favorite music services and platforms."
    >
      <div className="space-y-4">
        {/* Spotify */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/10 border border-border">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-[#1DB954]/10 flex items-center justify-center">
              <Music className="w-6 h-6 text-[#1DB954]" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                Spotify
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Connected
                </span>
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Stream and export playlists directly to Spotify
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap text-red-400 border-red-400/30 hover:bg-red-500/10 hover:text-red-400">
            Disconnect
          </Button>
        </div>

        {/* Apple Music */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/10 border border-border">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-gradient-to-br from-pink-500/10 to-red-500/10 flex items-center justify-center">
              <Music className="w-6 h-6 text-pink-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">Apple Music</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Export and sync playlists with Apple Music
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap border-primary/30 text-primary hover:bg-primary/10">
            <Link2 className="w-4 h-4" />
            Connect
          </Button>
        </div>

        {/* YouTube Music */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/10 border border-border">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Music className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">YouTube Music</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Import and export playlists with YouTube Music
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap border-primary/30 text-primary hover:bg-primary/10">
            <Link2 className="w-4 h-4" />
            Connect
          </Button>
        </div>

        {/* Last.fm */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-muted/10 border border-border">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-red-600/10 flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">Last.fm</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Scrobble your listening history for better recommendations
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap border-primary/30 text-primary hover:bg-primary/10">
            <Link2 className="w-4 h-4" />
            Connect
          </Button>
        </div>
      </div>
    </SettingsSection>
  );
};

export default IntegrationsSettings;
