import { useState } from "react";
import { Eye, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SettingsSection from "./SettingsSection";
import { useUser, useUpdateProfile } from "@/hooks/useData";
import { Skeleton } from "@/components/ui/skeleton";

const allMoods = ["Melancholic", "Electronic", "Upbeat", "Acoustic", "Chill", "Energetic", "Focus", "Ambient"];

const ProfileSettings = () => {
  const { data: user, isLoading } = useUser();
  const updateProfile = useUpdateProfile();
  
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("arivera_music");
  const [bio, setBio] = useState("");
  const [selectedMoods, setSelectedMoods] = useState(["Melancholic", "Electronic"]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize form with user data
  if (user && !isInitialized) {
    setDisplayName(user.name);
    setBio(user.bio);
    setIsInitialized(true);
  }

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else if (selectedMoods.length < 5) {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleSave = () => {
    updateProfile.mutate({
      name: displayName,
      bio,
    });
  };

  if (isLoading) {
    return (
      <SettingsSection id="profile" title="Public Profile" description="Loading...">
        <div className="space-y-6">
          <div className="flex gap-8">
            <Skeleton className="size-24 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection
      id="profile"
      title="Public Profile"
      description="Manage how you appear to other music lovers."
      action={
        <Button variant="outline" size="sm" className="gap-2 border-primary/20 text-primary hover:bg-primary/10">
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">View Public Profile</span>
        </Button>
      }
    >
      {/* Avatar and Form */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-start border-b border-border pb-8 mb-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <div className="relative group">
            <div className="size-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src={user?.avatar}
              />
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-card border border-border rounded-full text-foreground hover:text-primary hover:border-primary transition-all shadow-lg">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-muted-foreground">JPG or PNG. Max 2MB.</p>
        </div>

        {/* Form Fields */}
        <div className="flex-1 w-full space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Display Name
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-muted/20 border-border"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-muted/20 border-border pl-8"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Bio
            </label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-muted/20 border-border min-h-[100px]"
              placeholder="Tell us about your musical taste..."
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Markdown supported</span>
              <span>{bio.length}/160</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Preferences */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Mood Preferences</h3>
        <p className="text-xs text-muted-foreground mb-3">
          These help our AI fine-tune your default generation settings.
        </p>
        <div className="flex flex-wrap gap-2">
          {allMoods.map((mood) => {
            const isSelected = selectedMoods.includes(mood);
            return (
              <Badge
                key={mood}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? "bg-primary/10 text-primary border-primary hover:bg-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
                onClick={() => toggleMood(mood)}
              >
                {mood}
              </Badge>
            );
          })}
          <Badge
            variant="outline"
            className="cursor-pointer border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
          >
            + Add preference
          </Badge>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          {updateProfile.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          Save Changes
        </Button>
      </div>
    </SettingsSection>
  );
};

export default ProfileSettings;
