export interface Song {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  difficulty: "Easy" | "Medium" | "Hard";
  image: string;
  highScore: number;
}

export const SONG_LIST: Song[] = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "Synthwave Boy",
    bpm: 120,
    difficulty: "Easy",
    image: "from-purple-500 to-indigo-500",
    highScore: 12500
  },
  {
    id: "2",
    title: "Midnight Drive",
    artist: "Nightcall",
    bpm: 145,
    difficulty: "Medium",
    image: "from-red-500 to-orange-500",
    highScore: 0
  },
  {
    id: "3",
    title: "Cyberpunk City",
    artist: "Glitch Mob",
    bpm: 160,
    difficulty: "Hard",
    image: "from-green-400 to-emerald-600",
    highScore: 4500
  },
  {
    id: "4",
    title: "Lo-Fi Study Beats",
    artist: "Chill Hopper",
    bpm: 90,
    difficulty: "Easy",
    image: "from-yellow-400 to-amber-600",
    highScore: 8900
  }
];