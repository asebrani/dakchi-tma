import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Heart, Sparkles, Image, User, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MusicIcon } from "@/components/icons/MusicIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Sparkles, label: "AI Generate", path: "/generate" },
  { icon: Image, label: "Image to Playlist", path: "/generate/image" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

interface LanguageSelectorProps {
  isCollapsed: boolean;
  selectedLang: string;
  onSelectLang: (code: string) => void;
}

const LanguageSelector = ({ isCollapsed, selectedLang, onSelectLang }: LanguageSelectorProps) => {
  const currentLang = languages.find(l => l.code === selectedLang) || languages[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 hover:bg-secondary",
            isCollapsed ? "justify-center w-full" : "w-full"
          )}
        >
          <span className="text-lg flex-shrink-0">{currentLang.flag}</span>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.15 }}
                className="text-muted-foreground font-medium whitespace-nowrap overflow-hidden"
              >
                {currentLang.label}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        className="w-48 p-2 bg-card border-border"
      >
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLang(lang.code)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                selectedLang === lang.code
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SidebarContent = ({
  isCollapsed,
  onNavClick,
  selectedLang,
  onSelectLang,
}: {
  isCollapsed: boolean;
  onNavClick?: () => void;
  selectedLang: string;
  onSelectLang: (code: string) => void;
}) => {
  const location = useLocation();

  return (
    <>
      {/* Logo */}
      <div className="p-6 gap-3 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <MusicIcon className="w-5 h-5 text-primary" />
        </div>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.15 }}
              className="text-xl font-bold tracking-tight text-foreground whitespace-nowrap overflow-hidden"
            >
              VibeTune AI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onNavClick}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: isCollapsed ? 0 : 0.15 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Language Selector (for mobile) */}
      {onNavClick && (
        <div className="px-3 pb-4">
          <LanguageSelector
            isCollapsed={false}
            selectedLang={selectedLang}
            onSelectLang={onSelectLang}
          />
        </div>
      )}
    </>
  );
};

const AppSidebar = ({ mobileOpen, onMobileOpenChange }: AppSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });
  const [selectedLang, setSelectedLang] = useState("en");

  // Persist collapsed state
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 240 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex h-screen sticky top-0 glass-card border-r border-border flex-col z-40 overflow-hidden"
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          selectedLang={selectedLang}
          onSelectLang={setSelectedLang}
        />

        {/* Language Selector & Collapse Toggle */}
        <div className="p-3 border-t border-border space-y-2">
          {/* Language Selector */}
          <LanguageSelector
            isCollapsed={isCollapsed}
            selectedLang={selectedLang}
            onSelectLang={setSelectedLang}
          />

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-[280px] p-0 glass-card border-r border-border">
          <div className="flex flex-col h-full">
            <SidebarContent
              isCollapsed={false}
              onNavClick={() => onMobileOpenChange?.(false)}
              selectedLang={selectedLang}
              onSelectLang={setSelectedLang}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AppSidebar;