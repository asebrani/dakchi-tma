import { motion } from "framer-motion";
import { History, Trophy, Share2, BarChart3 } from "lucide-react";

interface JourneyEvent {
  id: string;
  type: "generation" | "badge" | "share" | "analysis";
  title: string;
  description: string;
  timestamp: string;
  imageUrl?: string;
}

const journeyEvents: JourneyEvent[] = [
  {
    id: "1",
    type: "generation",
    title: 'Generated "Neon Cyber-Rain"',
    description: "Cyberpunk Mood • Image Source",
    timestamp: "Just Now",
    imageUrl: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    type: "badge",
    title: "Badge: Night Owl",
    description: "Created 5 late-night vibes",
    timestamp: "2 Hours Ago",
  },
  {
    id: "3",
    type: "share",
    title: 'Shared "Sunday Coffee"',
    description: "Sent via direct link",
    timestamp: "Yesterday",
    imageUrl: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    type: "analysis",
    title: "Weekly Analysis",
    description: "Top genre shifted to Synthwave",
    timestamp: "3 Days Ago",
  },
];

const MusicJourney = () => {
  const getEventIcon = (type: JourneyEvent["type"]) => {
    switch (type) {
      case "badge":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "analysis":
        return <BarChart3 className="w-3 h-3 text-primary/80" />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full max-h-[600px]">
      <div className="p-5 border-b border-border bg-muted/10 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="font-display font-bold text-sm text-foreground uppercase tracking-wide flex items-center gap-2">
          <History className="w-4 h-4 text-muted-foreground" />
          Music Journey
        </h3>
      </div>

      <div className="overflow-y-auto custom-scrollbar p-5 relative">
        {/* Timeline Line */}
        <div className="absolute left-[24px] top-6 bottom-6 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />

        <div className="flex flex-col gap-6">
          {journeyEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative pl-8 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-0 top-1 size-2.5 rounded-full z-10 ring-4 ring-card/50 transition-all ${
                  index === 0
                    ? "bg-primary group-hover:ring-primary/20"
                    : "bg-muted/50 border border-muted-foreground group-hover:border-primary"
                }`}
              />

              <div className="flex flex-col gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    index === 0 ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {event.timestamp}
                </span>

                <div
                  className={`rounded-lg p-3 hover:bg-muted/20 transition-colors cursor-pointer flex gap-3 ${
                    index === 0 ? "bg-muted/20 border border-border" : "bg-muted/10 border border-border"
                  }`}
                >
                  {event.imageUrl ? (
                    <div className="size-10 rounded bg-muted overflow-hidden shrink-0 border border-border">
                      <img
                        alt={event.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        src={event.imageUrl}
                      />
                    </div>
                  ) : event.type === "badge" ? (
                    <div className="size-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
                      {getEventIcon(event.type)}
                    </div>
                  ) : null}

                  <div>
                    {event.type === "analysis" && (
                      <div className="flex items-center gap-2 mb-1">
                        {getEventIcon(event.type)}
                        <p className="text-xs text-foreground font-medium leading-tight">{event.title}</p>
                      </div>
                    )}
                    {event.type !== "analysis" && (
                      <p className="text-xs text-foreground font-medium leading-tight mb-1 group-hover:text-primary transition-colors">
                        {event.title}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground leading-tight">{event.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicJourney;
