import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentTrack } from "@/data/mockTracks";
import { Slider } from "@/components/ui/slider";

const NowPlayingBar = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(currentTrack.isLiked);
  const [progress, setProgress] = useState([35]);
  const [volume, setVolume] = useState([75]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 h-24 glass-card border-t border-white/10 px-6 flex items-center justify-between z-50"
    >
      {/* Track Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">{currentTrack.title}</p>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="ml-2 hidden sm:block"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isLiked ? "text-primary fill-primary" : "text-muted-foreground"
            )}
          />
        </motion.button>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center gap-2 flex-1">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            <Shuffle className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            <Repeat className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full max-w-md">
          <span className="text-xs text-muted-foreground w-10 text-right">1:24</span>
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        <Volume2 className="w-5 h-5 text-muted-foreground hidden sm:block" />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="w-24 hidden sm:flex"
        />
      </div>
    </motion.div>
  );
};

export default NowPlayingBar;
