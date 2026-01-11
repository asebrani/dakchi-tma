import { motion } from "framer-motion";

interface FloatingArtistProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  blur?: boolean;
  grayscale?: boolean;
  animationDelay?: number;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16 lg:w-20 lg:h-20",
  lg: "w-20 h-20 lg:w-24 lg:h-24",
};

const FloatingArtist = ({
  src,
  alt,
  size = "md",
  label,
  className = "",
  blur = false,
  grayscale = false,
  animationDelay = 0,
}: FloatingArtistProps) => {
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: animationDelay,
      }}
    >
      <div className="relative group">
        <div
          className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-border shadow-lg bg-card ${
            blur ? "blur-[1px] opacity-70" : ""
          }`}
        >
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${
              grayscale ? "grayscale mix-blend-luminosity" : ""
            } opacity-90 hover:opacity-100 transition-opacity`}
          />
        </div>
        {label && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-popover/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-popover-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FloatingArtist;
