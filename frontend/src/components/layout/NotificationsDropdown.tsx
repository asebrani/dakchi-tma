import { Bell, Music, Heart, Sparkles, UserPlus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "playlist" | "like" | "ai" | "follow";
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "ai",
    title: "AI Playlist Ready",
    message: "Your 'Late Night Vibes' playlist is ready to listen",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "like",
    title: "New Like",
    message: "Sarah liked your 'Summer Chill' playlist",
    time: "15 min ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: "3",
    type: "follow",
    title: "New Follower",
    message: "Alex started following you",
    time: "1 hour ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    id: "4",
    type: "playlist",
    title: "Playlist Updated",
    message: "5 new tracks added to 'Workout Mix'",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "ai",
    title: "Weekly Insights",
    message: "Your listening report for this week is ready",
    time: "1 day ago",
    read: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "playlist":
      return <Music className="w-4 h-4" />;
    case "like":
      return <Heart className="w-4 h-4" />;
    case "ai":
      return <Sparkles className="w-4 h-4" />;
    case "follow":
      return <UserPlus className="w-4 h-4" />;
  }
};

const getIconBackground = (type: Notification["type"]) => {
  switch (type) {
    case "playlist":
      return "bg-blue-500/20 text-blue-500";
    case "like":
      return "bg-pink-500/20 text-pink-500";
    case "ai":
      return "bg-primary/20 text-primary";
    case "follow":
      return "bg-purple-500/20 text-purple-500";
  }
};

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 sm:w-96 p-0 bg-card border-border rounded-2xl shadow-2xl overflow-hidden z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-border/50 last:border-b-0",
                  notification.read
                    ? "bg-transparent hover:bg-muted/30"
                    : "bg-primary/5 hover:bg-primary/10"
                )}
              >
                {/* Icon or Avatar */}
                {notification.avatar ? (
                  <img
                    src={notification.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      getIconBackground(notification.type)
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-foreground truncate">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {notification.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors text-center">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;