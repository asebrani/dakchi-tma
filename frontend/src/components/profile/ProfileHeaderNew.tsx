import { motion } from "framer-motion";
import { Diamond, Sparkles } from "lucide-react";
import { useUser } from "@/hooks/useData";
import MasteryRing from "./MasteryRing";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileHeaderNew = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8">
        <Skeleton className="size-24 md:size-28 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="size-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden group/header"
    >
      {/* Background Gradient - Enhanced */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/5 opacity-0 group-hover/header:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover/header:opacity-60 transition-opacity duration-700 pointer-events-none" />

      {/* Avatar */}
      <div className="relative shrink-0 group">
        <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/30 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700" />
        <div className="relative size-24 md:size-28 rounded-full p-1 bg-card border border-border">
          <img
            alt={user.name}
            className="w-full h-full object-cover rounded-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            src={user.avatar}
          />
        </div>
        <div className="absolute bottom-1 right-1 size-5 bg-background rounded-full flex items-center justify-center border border-border z-10">
          <div className="size-2 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 z-10 w-full">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight mb-1">
            {user.name}
          </h1>
          <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
            {user.bio}
          </p>
        </div>

        {/* Mastery Rings */}
        <div className="w-full pt-2">
          <div className="flex items-center gap-3 mb-2 justify-center lg:justify-start">
            <Sparkles className="w-3 h-3 text-primary" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Mastery Level
            </h3>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide items-center justify-center lg:justify-start">
            <MasteryRing
              icon={<Diamond className="w-4 h-4 text-primary drop-shadow-[0_0_5px_hsl(var(--primary)/0.4)]" />}
              label="Playlist Pro III"
              sublabel="Level Maxed"
              progress={100}
              color="primary"
            />
            <MasteryRing
              level="II"
              label="Mood Maestro II"
              sublabel="75% to Level III"
              progress={75}
              color="emerald"
              showLevel
            />
            <MasteryRing
              icon={<Sparkles className="w-4 h-4 text-teal-400" />}
              label="Sound Explorer I"
              sublabel="45% to Level II"
              progress={45}
              color="teal"
            />
            <MasteryRing
              level="I"
              label="Genre Mixer I"
              sublabel="15% to Level II"
              progress={15}
              color="slate"
              showLevel
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 lg:border-l border-border lg:pl-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center lg:text-right cursor-default group/stat"
        >
          <span className="block text-2xl font-bold font-display text-foreground tracking-tight group-hover/stat:text-primary transition-colors duration-300">
            {user.stats.totalPlaylists}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Playlists
          </span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-center lg:text-right cursor-default group/stat"
        >
          <span className="block text-2xl font-bold font-display text-foreground tracking-tight group-hover/stat:text-primary transition-colors duration-300">
            {user.stats.followers ?? "12.5k"}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Followers
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProfileHeaderNew;
