import { User, Shield, Bell, Link2, AlertTriangle, Settings, Palette, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
}

const navItems: NavItem[] = [
  { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  { id: "preferences", label: "Preferences", icon: <Palette className="w-5 h-5" /> },
  { id: "account", label: "Account", icon: <Settings className="w-5 h-5" /> },
  { id: "security", label: "Security", icon: <KeyRound className="w-5 h-5" /> },
  { id: "privacy", label: "Privacy", icon: <Shield className="w-5 h-5" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
  { id: "integrations", label: "Integrations", icon: <Link2 className="w-5 h-5" /> },
];

const dangerItem: NavItem = { 
  id: "danger", 
  label: "Danger Zone", 
  icon: <AlertTriangle className="w-5 h-5" />, 
  danger: true 
};

interface SettingsNavProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const SettingsNav = ({ activeSection, onSectionChange }: SettingsNavProps) => {
  return (
    <>
      {/* Mobile: Horizontal scrollable nav */}
      <nav className="lg:hidden sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 px-4 py-3 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[...navItems, dangerItem].map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 shrink-0",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : item.danger
                  ? "bg-card text-muted-foreground hover:text-red-400"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop: Sidebar nav */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24">
          <h3 className="px-4 pb-4 text-sm font-display font-semibold text-foreground">
            Settings
          </h3>
          
          {/* Main nav items */}
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 w-full text-left",
                  activeSection === item.id
                    ? "text-foreground font-medium bg-primary/10 border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20 border-l-2 border-transparent"
                )}
              >
                <span className={cn(
                  activeSection === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Danger Zone - separated at bottom */}
          <div className="mt-8 pt-4 border-t border-border">
            <button
              onClick={() => onSectionChange(dangerItem.id)}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 w-full text-left",
                activeSection === dangerItem.id
                  ? "text-red-400 font-medium bg-red-500/10 border-l-2 border-red-500"
                  : "text-muted-foreground hover:text-red-400 hover:bg-red-500/5 border-l-2 border-transparent"
              )}
            >
              <span className={cn(
                "text-amber-500",
                activeSection === dangerItem.id && "text-red-400"
              )}>
                {dangerItem.icon}
              </span>
              {dangerItem.label}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SettingsNav;
