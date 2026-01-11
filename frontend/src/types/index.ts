/**
 * Centralized type definitions for the application.
 * All shared types should be defined here.
 */

// ============ User Types ============
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  username?: string;
  joinDate: string;
  favoriteGenres: string[];
  stats: UserStats;
}

export interface UserStats {
  totalPlaylists: number;
  hoursListened: number;
  aiGenerations: number;
  followers?: number;
}

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  preferences: UserPreferences;
}

export interface NotificationSettings {
  emailNewPlaylist: boolean;
  emailWeeklyDigest: boolean;
  emailArtistUpdates: boolean;
  pushNewFollower: boolean;
  pushPlaylistComplete: boolean;
  pushRecommendations: boolean;
}

export interface PrivacySettings {
  profilePublic: boolean;
  showListeningActivity: boolean;
  showPlaylists: boolean;
  allowDataCollection: boolean;
}

export interface UserPreferences {
  moods: string[];
  theme: "light" | "dark" | "system";
}

// ============ Artist Types ============
export interface Artist {
  id: string;
  name: string;
  avatar: string;
  listeners: string;
  genres?: string[];
}

// ============ Playlist Types ============
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
  createdAt?: string;
}

// ============ Track Types ============
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

// ============ Auth Types ============
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends AuthCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ============ API Response Types ============
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============ AI Generation Types ============
export interface GeneratePlaylistRequest {
  prompt?: string;
  imageUrl?: string;
  mood?: string;
  genres?: string[];
}

export interface GeneratePlaylistResponse {
  playlist: Playlist;
  tracks: Track[];
}
