export interface Artist {
  id: string;
  name: string;
  avatar: string;
  listeners: string;
}

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Luna Nova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    listeners: "2.4M",
  },
  {
    id: "2",
    name: "The Midnight",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    listeners: "1.8M",
  },
  {
    id: "3",
    name: "Synthwave Kid",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
    listeners: "956K",
  },
  {
    id: "4",
    name: "Echo Valley",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    listeners: "1.2M",
  },
  {
    id: "5",
    name: "Neon Dreams",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
    listeners: "780K",
  },
  {
    id: "6",
    name: "Cosmic Drift",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    listeners: "654K",
  },
];
