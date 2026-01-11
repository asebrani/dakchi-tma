import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// Import local artist images
import artist1 from "@/assets/artists/artist-1.png";
import artist2 from "@/assets/artists/artist-2.png";
import artist3 from "@/assets/artists/artist-3.png";
import artist4 from "@/assets/artists/artist-4.png";
import artist5 from "@/assets/artists/artist-5.png";
import artist6 from "@/assets/artists/artist-6.png";
import artist7 from "@/assets/artists/artist-7.png";
import artist8 from "@/assets/artists/artist-8.png";

const HeroVisual = () => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  // Inner ring artists (larger, faster rotation)
  const innerRingArtists = useMemo(() => [
    { image: artist1, size: 80, angle: 0 },
    { image: artist2, size: 85, angle: 90 },
    { image: artist3, size: 78, angle: 180 },
    { image: artist4, size: 82, angle: 270 },
  ], []);

  // Outer ring artists (smaller, slower counter-rotation)
  const outerRingArtists = useMemo(() => [
    { image: artist5, size: 58, angle: 45 },
    { image: artist6, size: 62, angle: 135 },
    { image: artist7, size: 55, angle: 225 },
    { image: artist8, size: 60, angle: 315 },
  ], []);

  // Background particles for depth
  const particles = useMemo(() => 
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
    })), []
  );

  const innerRadius = { mobile: 120, desktop: 180 };
  const outerRadius = { mobile: 200, desktop: 280 };

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center">
      {/* Background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={shouldAnimate ? {
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [1, 1.5, 1],
          } : {}}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing center rings (sound wave effect) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          style={{
            width: 60 + i * 40,
            height: 60 + i * 40,
          }}
          animate={shouldAnimate ? {
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Visible orbit paths */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="innerOrbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="outerOrbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Inner orbit path */}
        <motion.circle
          cx="300"
          cy="300"
          r="180"
          fill="none"
          stroke="url(#innerOrbitGradient)"
          strokeWidth="1"
          strokeDasharray="8 6"
          animate={shouldAnimate ? { rotate: 360 } : {}}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
        {/* Outer orbit path */}
        <motion.circle
          cx="300"
          cy="300"
          r="280"
          fill="none"
          stroke="url(#outerOrbitGradient)"
          strokeWidth="1"
          strokeDasharray="12 8"
          animate={shouldAnimate ? { rotate: -360 } : {}}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
      </svg>

      {/* Central glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/25 rounded-full blur-2xl" />

      {/* Central pulsing orb */}
      <motion.div
        className="relative z-30 w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gradient-to-tr from-primary/80 to-primary flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: "0 0 60px hsl(var(--primary) / 0.4), 0 0 100px hsl(var(--primary) / 0.2)",
        }}
        animate={shouldAnimate ? {
          scale: [1, 1.08, 1],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner waveform bars */}
        <div className="flex items-end gap-1 h-8 lg:h-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 lg:w-2 bg-primary-foreground/90 rounded-full"
              animate={shouldAnimate ? {
                height: [8, 20 + i * 4, 8],
              } : { height: 12 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Inner ring - clockwise rotation */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        animate={shouldAnimate ? { rotate: 360 } : {}}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {innerRingArtists.map((artist, index) => (
          <OrbitingArtist
            key={index}
            image={artist.image}
            size={artist.size}
            angle={artist.angle}
            radius={innerRadius}
            index={index}
            shouldAnimate={shouldAnimate}
            ring="inner"
          />
        ))}
      </motion.div>

      {/* Outer ring - counter-clockwise rotation */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={shouldAnimate ? { rotate: -360 } : {}}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {outerRingArtists.map((artist, index) => (
          <OrbitingArtist
            key={index}
            image={artist.image}
            size={artist.size}
            angle={artist.angle}
            radius={outerRadius}
            index={index}
            shouldAnimate={shouldAnimate}
            ring="outer"
          />
        ))}
      </motion.div>
    </div>
  );
};

interface OrbitingArtistProps {
  image: string;
  size: number;
  angle: number;
  radius: { mobile: number; desktop: number };
  index: number;
  shouldAnimate: boolean;
  ring: "inner" | "outer";
}

const OrbitingArtist = ({
  image,
  size,
  angle,
  radius,
  index,
  shouldAnimate,
  ring,
}: OrbitingArtistProps) => {
  // Calculate position based on angle
  const radians = (angle * Math.PI) / 180;
  
  // Responsive sizing
  const mobileSize = size * 0.7;
  const desktopSize = size;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${Math.cos(radians) * radius.desktop}px - ${desktopSize / 2}px)`,
        top: `calc(50% + ${Math.sin(radians) * radius.desktop}px - ${desktopSize / 2}px)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        // Counter-rotate to keep artists upright
        rotate: ring === "inner" ? -360 : 360,
      }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.15 },
        scale: { duration: 0.6, delay: index * 0.15 },
        rotate: {
          duration: ring === "inner" ? 35 : 55,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-lg"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / ${ring === "inner" ? 0.4 : 0.25}) 0%, transparent 70%)`,
          transform: "scale(1.3)",
        }}
      />
      
      {/* Float animation wrapper */}
      <motion.div
        animate={shouldAnimate ? {
          y: [0, ring === "inner" ? -6 : -4, 0],
          scale: [1, ring === "inner" ? 1.05 : 1.03, 1],
        } : {}}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        {/* Artist image container */}
        <div
          className="relative rounded-full overflow-hidden border-2 border-border/50 shadow-xl"
          style={{
            width: desktopSize,
            height: desktopSize,
            boxShadow: ring === "inner" 
              ? "0 8px 32px rgba(0,0,0,0.3), 0 0 20px hsl(var(--primary) / 0.2)"
              : "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <img
            src={image}
            alt="Artist"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroVisual;
