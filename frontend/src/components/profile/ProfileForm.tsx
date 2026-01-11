import { useState } from "react";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { mockUser } from "@/data/mockUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const allGenres = [
  "Electronic",
  "Indie",
  "Lo-Fi",
  "Jazz",
  "Hip Hop",
  "Pop",
  "Rock",
  "R&B",
  "Classical",
  "Ambient",
];

interface ProfileFormProps {
  onClose: () => void;
}

const ProfileForm = ({ onClose }: ProfileFormProps) => {
  const [displayName, setDisplayName] = useState(mockUser.name);
  const [bio, setBio] = useState(mockUser.bio);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(mockUser.favoriteGenres);
  const [isSaving, setIsSaving] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="glass-card rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Edit Profile</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Display Name
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Bio
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="bg-white/5 border-white/10 focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Favorite Genres <span className="text-muted-foreground/50">(up to 5)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => {
                  const isSelected = selectedGenres.includes(genre);
                  return (
                    <Badge
                      key={genre}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border-white/10 text-muted-foreground hover:bg-white/5"
                      }`}
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                      {isSelected && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/10 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSaving ? "Saving..." : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileForm;
