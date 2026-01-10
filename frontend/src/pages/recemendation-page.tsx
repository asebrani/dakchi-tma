import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Brain, 
  Headphones,
  Moon,
  Dumbbell,
  BookOpen,
  Palette,
  Coffee
} from "lucide-react";
import { MoodCard, MoodType } from "@/components/ui/MoodCard";
import { ActivityCard } from "@/components/ui/ActivityCard";
import { JourneyCard } from "@/components/ui/JourneyCard";
import { PromptChip } from "@/components/ui/PromptChip";
import { LikedTrackCard } from "@/components/ui/LikedTrackCard";
import { MoodSlider } from "@/components/ui/MoodSlider";
import { SectionHeader } from "@/components/ui/SectionHeader";

const moodRecommendations = [
  { mood: "calm" as MoodType, title: "If you're feeling overwhelmed", description: "Let the tension dissolve", duration: "10 min", tags: ["Ambient", "Piano"] },
  { mood: "focus" as MoodType, title: "For quiet focus", description: "Clear the mental clutter", duration: "25 min", tags: ["Lo-fi", "Minimal"] },
  { mood: "energized" as MoodType, title: "When you need energy", description: "Rise and accelerate", duration: "8 min", tags: ["Upbeat", "Electronic"] },
  { mood: "reflective" as MoodType, title: "For deep thinking", description: "Explore inner landscapes", duration: "15 min", tags: ["Cinematic", "Layered"] },
  { mood: "melancholy" as MoodType, title: "Embrace the stillness", description: "Beauty in quiet moments", duration: "12 min", tags: ["Atmospheric", "Gentle"] },
];

const activities = [
  { icon: BookOpen, title: "Studying", description: "Deep concentration without distraction" },
  { icon: Dumbbell, title: "Working Out", description: "Energy that matches your intensity" },
  { icon: Moon, title: "Sleeping", description: "Drift off peacefully" },
  { icon: Brain, title: "Meditating", description: "Mindful presence and calm" },
  { icon: Palette, title: "Creating", description: "Unlock creative flow states" },
  { icon: Coffee, title: "Morning Routine", description: "Start the day with intention" },
];

const emotionalJourneys = [
  { fromMood: "Anxious", toMood: "Calm", fromMoodType: "energized" as MoodType, toMoodType: "calm" as MoodType, duration: "10 min" },
  { fromMood: "Low energy", toMood: "Motivated", fromMoodType: "melancholy" as MoodType, toMoodType: "energized" as MoodType, duration: "8 min" },
  { fromMood: "Scattered", toMood: "Focused", fromMoodType: "reflective" as MoodType, toMoodType: "focus" as MoodType, duration: "12 min" },
];

const likedTracks = [
  { title: "Midnight Reflections", mood: "reflective" as MoodType, duration: "8:42", similarity: "Similar emotional tone" },
  { title: "Ocean Breathing", mood: "calm" as MoodType, duration: "12:15", similarity: "Matching tempo" },
  { title: "Dawn Awakening", mood: "energized" as MoodType, duration: "5:30", similarity: "Same energy level" },
];

const promptSuggestions = [
  "Rainy night, soft piano, slow tempo",
  "Hopeful cinematic build",
  "Forest morning, birdsong, peaceful",
  "Late night coding, lo-fi beats",
];

const Index = () => {
  const [moodIntensity, setMoodIntensity] = useState(2);
  const [currentMood] = useState<MoodType>("calm");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header with Animated Gradient */}
      <header className="relative overflow-hidden">
        <div className="animated-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-6 pt-16 pb-8 md:px-8 lg:px-12"
        >
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">AI-Powered</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Recommended for You
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-md">
            Music generated to match your mood and moment
          </p>
        </motion.div>
      </header>

      <main className="px-6 pb-12 md:px-8 lg:px-12 space-y-10">
        {/* Current Mood Spotlight */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Headphones className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Generated for how you're feeling right now
            </span>
          </div>
          
          <MoodCard
            mood={currentMood}
            title="Current Mood: Calm"
            description="Let tranquility wash over you with sounds designed to quiet the mind"
            isLarge
            className="w-full max-w-2xl"
          />
          
          <div className="mt-4 max-w-sm">
            <MoodSlider value={moodIntensity} onChange={setMoodIntensity} />
          </div>
        </motion.section>

        {/* Mood-Based Recommendations Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <SectionHeader 
            title="Based on Your Mood" 
            subtitle="Quick access to emotional soundscapes"
          />
          
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
            {moodRecommendations.map((rec, index) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + 0.1 * index, duration: 0.4 }}
                className="flex-shrink-0 w-64"
              >
                <MoodCard
                  mood={rec.mood}
                  title={rec.title}
                  description={rec.description}
                  duration={rec.duration}
                  tags={rec.tags}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Activity-Focused Suggestions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SectionHeader 
            title="Music for What You're Doing" 
            subtitle="Optimized soundtracks for every activity"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + 0.05 * index, duration: 0.4 }}
              >
                <ActivityCard
                  icon={activity.icon}
                  title={activity.title}
                  description={activity.description}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Emotional Journey Sets */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <SectionHeader 
            title="Emotional Journeys" 
            subtitle="Guided transitions between emotional states"
          />
          
          <div className="space-y-3">
            {emotionalJourneys.map((journey, index) => (
              <motion.div
                key={`${journey.fromMood}-${journey.toMood}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + 0.1 * index, duration: 0.4 }}
              >
                <JourneyCard
                  fromMood={journey.fromMood}
                  toMood={journey.toMood}
                  fromMoodType={journey.fromMoodType}
                  toMoodType={journey.toMoodType}
                  duration={journey.duration}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Because You Liked */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <SectionHeader 
            title="Because You Liked..." 
            subtitle="Similar emotional tone and tempo to your favorites"
          />
          
          <div className="space-y-3">
            {likedTracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + 0.1 * index, duration: 0.4 }}
              >
                <LikedTrackCard
                  title={track.title}
                  mood={track.mood}
                  duration={track.duration}
                  similarity={track.similarity}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Prompt Inspiration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <SectionHeader 
            title="Quick Prompts" 
            subtitle="One-tap creative inspiration"
          />
          
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((prompt, index) => (
              <motion.div
                key={prompt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + 0.05 * index, duration: 0.3 }}
              >
                <PromptChip prompt={prompt} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer Attribution */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="pt-8 border-t border-border/50"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Personalized by AI based on your listening patterns</span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
