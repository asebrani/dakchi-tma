import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Import artist images
import artist1 from "@/assets/artists/artist-1.png";
import artist2 from "@/assets/artists/artist-2.png";
import artist3 from "@/assets/artists/artist-3.png";
import artist4 from "@/assets/artists/artist-4.png";
import artist5 from "@/assets/artists/artist-5.png";
import artist6 from "@/assets/artists/artist-6.png";
import artist7 from "@/assets/artists/artist-7.png";
import artist8 from "@/assets/artists/artist-8.png";

const artistImages = [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8];

interface OrbitingArtistsProps {
  isCardHovered?: boolean;
}

const OrbitingArtists = ({ isCardHovered = false }: OrbitingArtistsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 100 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = ((clientX / innerWidth) - 0.5) * 15;
      const y = ((clientY / innerHeight) - 0.5) * 15;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion, isMobile]);

  const shouldAnimate = !prefersReducedMotion;

  // Inner ring artists (larger, faster)
  const innerRingArtists = useMemo(() => [
    { id: 0, image: artistImages[0], size: 110, angle: 0 },
    { id: 1, image: artistImages[1], size: 120, angle: 90 },
    { id: 2, image: artistImages[2], size: 105, angle: 180 },
    { id: 3, image: artistImages[3], size: 115, angle: 270 },
  ], []);

  // Outer ring artists (smaller, slower, counter-rotation)
  const outerRingArtists = useMemo(() => [
    { id: 4, image: artistImages[4], size: 85, angle: 45 },
    { id: 5, image: artistImages[5], size: 90, angle: 120 },
    { id: 6, image: artistImages[6], size: 80, angle: 200 },
    { id: 7, image: artistImages[7], size: 88, angle: 290 },
  ], []);

  // Particles for background depth
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 20 + 15,
    })), []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Animated star/particle field */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: 0,
            }}
            animate={shouldAnimate ? {
              opacity: [0, particle.opacity, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -30, -60],
            } : { opacity: particle.opacity * 0.5 }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.id * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Sound wave rings pulsing from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: 200,
              height: 200,
            }}
            animate={shouldAnimate ? {
              scale: [1, 3, 5],
              opacity: [0.4, 0.15, 0],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Glowing center orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={shouldAnimate ? {
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div 
          className="h-64 w-64 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(145 60% 40% / 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Outer orbit ring (visible path) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.svg
          width={isMobile ? 600 : 950}
          height={isMobile ? 600 : 950}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: isLoaded ? 0.3 : 0,
            rotate: shouldAnimate ? 360 : 0,
          }}
          transition={{
            opacity: { duration: 2, delay: 0.5 },
            rotate: { duration: 80, repeat: Infinity, ease: "linear" },
          }}
        >
          <defs>
            <linearGradient id="outerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(145 60% 50%)" stopOpacity="0.5" />
              <stop offset="50%" stopColor="hsl(145 60% 40%)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(145 60% 50%)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle
            cx="50%"
            cy="50%"
            r={isMobile ? 270 : 450}
            fill="none"
            stroke="url(#outerRingGradient)"
            strokeWidth="1"
            strokeDasharray="8 12"
          />
        </motion.svg>
      </div>

      {/* Inner orbit ring (visible path) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.svg
          width={isMobile ? 450 : 720}
          height={isMobile ? 450 : 720}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: isLoaded ? 0.4 : 0,
            rotate: shouldAnimate ? -360 : 0,
          }}
          transition={{
            opacity: { duration: 2, delay: 0.3 },
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          }}
        >
          <defs>
            <linearGradient id="innerRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(145 70% 55%)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(145 60% 45%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(145 70% 55%)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle
            cx="50%"
            cy="50%"
            r={isMobile ? 200 : 340}
            fill="none"
            stroke="url(#innerRingGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
        </motion.svg>
      </div>

      {/* Artist portraits with parallax container */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: shouldAnimate && !isMobile ? parallaxX : 0,
          y: shouldAnimate && !isMobile ? parallaxY : 0,
        }}
      >
        {/* Inner ring artists - orbit around center */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          animate={shouldAnimate ? { rotate: 360 } : {}}
          transition={{
            duration: isCardHovered ? 40 : 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {innerRingArtists.map((artist, index) => (
            <InnerRingArtist
              key={artist.id}
              artist={artist}
              isLoaded={isLoaded}
              shouldAnimate={shouldAnimate}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Outer ring artists - counter-rotate */}
        {!isMobile && (
          <motion.div
            className="absolute left-1/2 top-1/2"
            animate={shouldAnimate ? { rotate: -360 } : {}}
            transition={{
              duration: isCardHovered ? 70 : 45,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {outerRingArtists.map((artist, index) => (
              <OuterRingArtist
                key={artist.id}
                artist={artist}
                isLoaded={isLoaded}
                shouldAnimate={shouldAnimate}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Radial gradient overlay - spotlight effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 35% 30% at 50% 50%, 
              transparent 0%, 
              hsl(var(--background) / 0.3) 60%,
              hsl(var(--background) / 0.7) 80%,
              hsl(var(--background)) 100%
            )
          `,
        }}
      />

      {/* Dim overlay on card hover */}
      <motion.div
        className="absolute inset-0 bg-background/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCardHovered ? 0.4 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

// Inner ring artist component
interface InnerArtistProps {
  artist: { id: number; image: string; size: number; angle: number };
  isLoaded: boolean;
  shouldAnimate: boolean;
  index: number;
  isMobile: boolean;
}

const InnerRingArtist = ({ artist, isLoaded, shouldAnimate, index, isMobile }: InnerArtistProps) => {
  const orbitRadius = isMobile ? 200 : 340;
  const size = isMobile ? artist.size * 0.7 : artist.size;
  const angleRad = (artist.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * orbitRadius;
  const y = Math.sin(angleRad) * orbitRadius;

  return (
    <motion.div
      className="absolute"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.15 + 0.5,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Counter-rotate to keep artist upright */}
      <motion.div
        className="h-full w-full"
        animate={shouldAnimate ? { rotate: -360 } : {}}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Floating animation */}
        <motion.div
          className="h-full w-full"
          animate={shouldAnimate ? {
            y: [0, -8, 0],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(145 60% 50% / 0.4) 0%, transparent 60%)",
              transform: "scale(1.5)",
              filter: "blur(15px)",
            }}
          />
          
          {/* Artist image */}
          <div
            className="relative h-full w-full overflow-hidden rounded-full"
            style={{
              boxShadow: "0 0 30px hsl(145 60% 40% / 0.5), 0 10px 40px rgba(0, 0, 0, 0.5)",
              border: "2px solid hsl(145 60% 50% / 0.3)",
            }}
          >
            <img
              src={artist.image}
              alt=""
              className="h-full w-full object-cover"
              style={{
                filter: "saturate(1.1) brightness(0.9)",
              }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Outer ring artist component
interface OuterArtistProps {
  artist: { id: number; image: string; size: number; angle: number };
  isLoaded: boolean;
  shouldAnimate: boolean;
  index: number;
}

const OuterRingArtist = ({ artist, isLoaded, shouldAnimate, index }: OuterArtistProps) => {
  const orbitRadius = 450;
  const angleRad = (artist.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * orbitRadius;
  const y = Math.sin(angleRad) * orbitRadius;

  return (
    <motion.div
      className="absolute"
      style={{
        left: x - artist.size / 2,
        top: y - artist.size / 2,
        width: artist.size,
        height: artist.size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isLoaded ? 0.7 : 0,
        scale: isLoaded ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2 + 1,
        type: "spring",
        stiffness: 80,
      }}
    >
      {/* Counter-rotate to keep upright */}
      <motion.div
        className="h-full w-full"
        animate={shouldAnimate ? { rotate: 360 } : {}}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Floating animation */}
        <motion.div
          className="h-full w-full"
          animate={shouldAnimate ? {
            y: [0, -5, 0],
            scale: [1, 1.03, 1],
          } : {}}
          transition={{
            duration: 4 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Subtle glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(145 50% 45% / 0.25) 0%, transparent 60%)",
              transform: "scale(1.4)",
              filter: "blur(10px)",
            }}
          />
          
          {/* Artist image */}
          <div
            className="relative h-full w-full overflow-hidden rounded-full"
            style={{
              boxShadow: "0 0 20px hsl(145 50% 40% / 0.3), 0 8px 30px rgba(0, 0, 0, 0.4)",
              border: "1px solid hsl(145 50% 50% / 0.2)",
              filter: "blur(0.5px)",
            }}
          >
            <img
              src={artist.image}
              alt=""
              className="h-full w-full object-cover"
              style={{
                filter: "saturate(0.9) brightness(0.8)",
              }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OrbitingArtists;
