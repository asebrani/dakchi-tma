import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MasteryRingProps {
  icon?: React.ReactNode;
  label?: string;
  level?: string;
  progress: number;
  color?: string;
  showLevel?: boolean;
  sublabel?: string;
}

const MasteryRing = ({
  icon,
  label,
  level,
  progress,
  color = "primary",
  showLevel = false,
  sublabel,
}: MasteryRingProps) => {
  const colorClasses: Record<string, string> = {
    primary: "text-primary",
    emerald: "text-emerald-400",
    teal: "text-teal-400",
    slate: "text-slate-400",
  };

  return (
    <div className="group/ring relative cursor-pointer shrink-0">
      <div className="relative size-10">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="stroke-current text-muted/30"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="3"
          />
          <motion.path
            className={cn("stroke-current", colorClasses[color])}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeDasharray={`${progress}, 100`}
            strokeLinecap="round"
            strokeWidth="3"
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${progress}, 100` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {showLevel ? (
            <span className={cn("text-[10px] font-bold font-display", colorClasses[color])}>
              {level}
            </span>
          ) : (
            icon
          )}
        </div>
      </div>

      {/* Achievement Label */}
      {label && (
        <motion.div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/ring:opacity-100 transition-opacity duration-300"
          initial={{ y: -4 }}
          whileHover={{ y: 0 }}
        >
          <span className={cn("text-[9px] font-semibold uppercase tracking-wide", colorClasses[color])}>
            {label}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default MasteryRing;
