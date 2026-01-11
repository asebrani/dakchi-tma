import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthInput } from "@/components/ui/auth-input";
import { AuthButton } from "@/components/ui/auth-button";
import { MusicIcon } from "@/components/icons/MusicIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { FortyTwoIcon } from "@/components/icons/FortyTwoIcon";
import OrbitingArtists from "@/components/OrbitingArtists";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { useLogin, useSignup, useGoogleLogin, use42Login } from "@/hooks/useAuth";

type AuthMode = "login" | "signup";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const login = useLogin();
  const signup = useSignup();
  const googleLogin = useGoogleLogin();
  const fortyTwoLogin = use42Login();

  const isLoading = login.isPending || signup.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "login") {
      login.mutate({ email: formData.email, password: formData.password });
    } else {
      signup.mutate({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: mode === "login" ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      x: mode === "login" ? 20 : -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <OrbitingArtists isCardHovered={isCardHovered} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* Logo */}
        <motion.div className="mb-6 flex flex-col items-center" variants={itemVariants}>
          <motion.div
            className="mb-4 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
              <MusicIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">VibeTune AI</span>
          </motion.div>
        </motion.div>

        {/* Auth Card */}
        <motion.div className="auth-card rounded-xl p-8" variants={itemVariants}>
          {/* Title */}
          <motion.div className="mb-6 text-center" variants={itemVariants}>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login" 
                ? "Log in to continue your music journey."
                : "Join thousands of music lovers discovering new vibes."}
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div className="space-y-3 mb-6" variants={itemVariants}>
            <AuthButton
              variant="outline"
              className="w-full"
              onClick={() => googleLogin.mutate()}
              disabled={googleLogin.isPending}
            >
              <GoogleIcon className="h-5 w-5" />
              Continue with Google
            </AuthButton>
            <AuthButton
              variant="fortyTwo"
              className="w-full"
              onClick={() => fortyTwoLogin.mutate()}
              disabled={fortyTwoLogin.isPending}
            >
              <FortyTwoIcon className="h-5 w-5" />
              Continue with 42
            </AuthButton>
          </motion.div>

          {/* Divider */}
          <motion.div className="mb-6 flex items-center gap-4" variants={itemVariants}>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">Or</span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {mode === "signup" && (
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <AuthInput
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      icon={<User className="h-4 w-4" />}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <AuthInput
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      icon={<User className="h-4 w-4" />}
                      required
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <AuthInput
                  type="email"
                  name="email"
                  placeholder="@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <AuthInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock className="h-4 w-4" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-sm font-medium text-foreground">Confirm Password</label>
                  <AuthInput
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={<Lock className="h-4 w-4" />}
                    required
                  />
                </motion.div>
              )}

              <motion.div className="pt-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <AuthButton type="submit" className="w-full" isLoading={isLoading}>
                  {mode === "login" ? "Log In" : "Sign Up"}
                </AuthButton>
              </motion.div>
            </motion.form>
          </AnimatePresence>

          {/* Toggle Auth Mode */}
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <span className="text-muted-foreground text-sm">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={toggleMode}
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline underline-offset-4 text-sm"
            >
              {mode === "login" ? "Sign Up" : "Log In"}
              <ArrowRight className="h-3 w-3" />
            </button>
          </motion.div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-6 flex justify-center gap-4 text-xs text-muted-foreground"
          variants={itemVariants}
        >
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
