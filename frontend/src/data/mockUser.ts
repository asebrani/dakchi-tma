export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
  favoriteGenres: string[];
  stats: {
    totalPlaylists: number;
    hoursListened: number;
    aiGenerations: number;
  };
}

export const mockUser: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
  bio: "Music enthusiast who loves discovering new sounds through AI-generated playlists.",
  joinDate: "January 2024",
  favoriteGenres: ["Electronic", "Indie", "Lo-Fi", "Jazz"],
  stats: {
    totalPlaylists: 24,
    hoursListened: 342,
    aiGenerations: 18,
  },
};
