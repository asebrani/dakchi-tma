import { Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import SettingsSection from "./SettingsSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

const PreferencesSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Appearance & Preferences"
        description="Customize your visual experience and language settings"
      >
        {/* Theme Selection */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">Theme</h4>
              <p className="text-sm text-muted-foreground">
                Choose your preferred appearance
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  theme === "light"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                )}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  theme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                )}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6" />

        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              Language
            </h4>
            <p className="text-sm text-muted-foreground">
              Select your preferred language
            </p>
          </div>
          <Select defaultValue="en">
            <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SettingsSection>
    </div>
  );
};

export default PreferencesSettings;
