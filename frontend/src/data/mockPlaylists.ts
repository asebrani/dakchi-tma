export interface Playlist {
  id: string;
  name: string;
  cover: string;
  trackCount: number;
  duration: string;
  creator: string;
  generationType?: "mood" | "image" | "manual";
  generationTag?: string;
  isLiked?: boolean;
}

export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Chill Vibes",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    trackCount: 24,
    duration: "1h 32m",
    creator: "AI Generated",
    generationType: "mood",
    generationTag: "Relaxed",
    isLiked: true,
  },
  {
    id: "2",
    name: "Sunset Beach",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
    trackCount: 18,
    duration: "58m",
    creator: "AI Generated",
    generationType: "image",
    generationTag: "Beach Sunset",
    isLiked: true,
  },
  {
    id: "3",
    name: "Focus Flow",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop",
    trackCount: 32,
    duration: "2h 15m",
    creator: "AI Generated",
    generationType: "mood",
    generationTag: "Focused",
  },
  {
    id: "4",
    name: "Night Drive",
    cover: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&h=300&fit=crop",
    trackCount: 21,
    duration: "1h 18m",
    creator: "AI Generated",
    generationType: "mood",
    generationTag: "Energetic",
  },
  {
    id: "5",
    name: "Morning Coffee",
    cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
    trackCount: 15,
    duration: "45m",
    creator: "AI Generated",
    generationType: "image",
    generationTag: "Cozy Cafe",
  },
  {
    id: "6",
    name: "Workout Beats",
    cover: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop",
    trackCount: 28,
    duration: "1h 45m",
    creator: "AI Generated",
    generationType: "mood",
    generationTag: "Pumped",
  },
  {
    id: "7",
    name: "Rainy Day Jazz",
    cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=300&fit=crop",
    trackCount: 20,
    duration: "1h 10m",
    creator: "You",
    generationType: "manual",
    isLiked: true,
  },
  {
    id: "8",
    name: "Electronic Dreams",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    trackCount: 35,
    duration: "2h 30m",
    creator: "You",
    generationType: "manual",
  },
];

export const recentPlaylists = mockPlaylists.slice(0, 4);
export const aiPlaylists = mockPlaylists.filter(p => p.generationType !== "manual");
export const likedPlaylists = mockPlaylists.filter(p => p.isLiked);
