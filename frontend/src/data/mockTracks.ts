export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  isPlaying?: boolean;
  isLiked?: boolean;
}

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=150&fit=crop",
    duration: "4:03",
    isPlaying: true,
    isLiked: true,
  },
  {
    id: "2",
    title: "Electric Feel",
    artist: "MGMT",
    album: "Oracular Spectacular",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop",
    duration: "3:49",
    isLiked: true,
  },
  {
    id: "3",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=150&fit=crop",
    duration: "3:20",
  },
  {
    id: "4",
    title: "Resonance",
    artist: "HOME",
    album: "Odyssey",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop",
    duration: "3:32",
    isLiked: true,
  },
];

export const currentTrack = mockTracks[0];
