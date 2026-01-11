import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  id?: string;
  title: string;
  description: string;
  children: ReactNode;
  variant?: "default" | "danger";
  action?: ReactNode;
}

const SettingsSection = ({
  id,
  title,
  description,
  children,
  variant = "default",
  action,
}: SettingsSectionProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl p-6 md:p-8",
        variant === "danger"
          ? "border border-red-900/30 bg-red-900/5"
          : "glass-card"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className={cn(
              "text-xl font-display font-semibold",
              variant === "danger" ? "text-red-500" : "text-foreground"
            )}
          >
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
};

export default SettingsSection;
