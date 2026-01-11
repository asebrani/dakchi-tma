import { Search, ChevronDown, Menu, User, Settings, LogOut, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { mockUser } from "@/data/mockUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ui/theme-toggle";
import NotificationsDropdown from "./NotificationsDropdown";

interface TopHeaderProps {
  onMenuClick?: () => void;
}

const TopHeader = ({ onMenuClick }: TopHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 md:h-20 px-4 md:px-6 flex items-center justify-between border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-30">
      {/* Left Section - Menu + Greeting + Search */}
      <div className="flex items-center gap-4 md:gap-6 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Greeting */}
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-foreground">
            Hello, <span className="text-primary">{mockUser.name.split(" ")[0]}</span>!
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2.5 md:py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-foreground hidden sm:block">{mockUser.name}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            sideOffset={8}
            className="w-56 bg-card backdrop-blur-xl border-border rounded-2xl p-2 shadow-2xl"
          >
            {/* User Info Header */}
            <DropdownMenuLabel className="px-3 py-3 mb-1">
              <div className="flex items-center gap-3">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{mockUser.name}</span>
                  <span className="text-xs text-muted-foreground">{mockUser.email || "Premium Member"}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="bg-border mx-2" />
            
            {/* Menu Items */}
            <div className="py-1">
              <DropdownMenuItem 
                onClick={() => navigate("/profile")}
                className="px-3 py-2.5 rounded-xl cursor-pointer hover:bg-muted focus:bg-muted gap-3 mx-1"
              >
                <User className="w-4 h-4 text-primary" />
                <span>My Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="px-3 py-2.5 rounded-xl cursor-pointer hover:bg-muted focus:bg-muted gap-3 mx-1"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => navigate("/dashboard")}
                className="px-3 py-2.5 rounded-xl cursor-pointer hover:bg-muted focus:bg-muted gap-3 mx-1"
              >
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span>AI Playlists</span>
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator className="bg-border mx-2" />
            
            {/* Logout */}
            <DropdownMenuItem 
              onClick={() => navigate("/auth")} 
              className="px-3 py-2.5 rounded-xl cursor-pointer hover:bg-destructive/20 focus:bg-destructive/20 gap-3 mx-1 mt-1 text-destructive"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
