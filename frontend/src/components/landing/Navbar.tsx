import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { MusicIcon } from "@/components/icons/MusicIcon";
import { AuthButton } from "@/components/ui/auth-button";
import ThemeToggle from "@/components/ui/theme-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <a
    href={href}
    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
  >
    {children}
  </a>
);

interface LanguageSelectorProps {
  selectedLang: string;
  onSelectLang: (code: string) => void;
  compact?: boolean;
}

const LanguageSelector = ({ selectedLang, onSelectLang, compact }: LanguageSelectorProps) => {
  const currentLang = languages.find(l => l.code === selectedLang) || languages[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-secondary/80",
            compact ? "justify-center" : ""
          )}
        >
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-lg">{currentLang.flag}</span>
          {!compact && (
            <span className="text-muted-foreground font-medium hidden sm:inline">
              {currentLang.label}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-48 p-2 bg-card/95 backdrop-blur-xl border-border"
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

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const navLinks = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#ai-analysis", label: "AI Analysis" },
    { href: "#trusted-by", label: "Trusted by" },
  ];

  return (
    <header className="w-full z-50 fixed top-0 left-0 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
              <MusicIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              VibeTune AI
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector
              selectedLang={selectedLang}
              onSelectLang={setSelectedLang}
              compact
            />
            <ThemeToggle />
            <button
              onClick={() => navigate("/auth")}
              className="text-sm font-bold text-foreground hover:text-primary transition-colors px-3 py-2"
            >
              Log In
            </button>
            <AuthButton size="sm" onClick={() => navigate("/auth")}>
              Sign Up
            </AuthButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1 py-4 border-t border-border/50">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors py-3 px-3 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <div className="flex items-center gap-2 pt-4 mt-2 border-t border-border/50 px-3">
                  <LanguageSelector
                    selectedLang={selectedLang}
                    onSelectLang={setSelectedLang}
                  />
                  <ThemeToggle />
                </div>
                
                <div className="flex flex-col gap-2 pt-4 px-3">
                  <button
                    onClick={() => {
                      navigate("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-bold text-foreground hover:text-primary transition-colors py-2 text-left"
                  >
                    Log In
                  </button>
                  <AuthButton
                    size="sm"
                    onClick={() => {
                      navigate("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign Up
                  </AuthButton>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
