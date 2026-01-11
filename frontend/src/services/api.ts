/**
 * API Service Layer
 * 
 * This module provides a centralized API client for all backend communication.
 * Currently uses mock data but is structured for easy backend integration.
 */

import { API_ENDPOINTS } from "@/lib/routes";
import type {
  User,
  Artist,
  Playlist,
  Track,
  AuthCredentials,
  SignupCredentials,
  AuthResponse,
  ApiResponse,
  UserSettings,
  GeneratePlaylistRequest,
  GeneratePlaylistResponse,
} from "@/types";

// Mock data imports (will be removed when backend is connected)
import { mockUser } from "@/data/mockUser";
import { mockArtists } from "@/data/mockArtists";
import { mockPlaylists, recentPlaylists, aiPlaylists } from "@/data/mockPlaylists";
import { mockTracks, currentTrack } from "@/data/mockTracks";

/**
 * Base API configuration
 * Update BASE_URL when deploying to production
 */
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
}

// ============ Auth API ============
export const authApi = {
  /**
   * Login with email and password
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    // return apiRequest<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    // });
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: mockUser,
      token: "mock_token_12345",
      refreshToken: "mock_refresh_token_12345",
    };
  },

  /**
   * Signup with email and password
   */
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: { 
        ...mockUser, 
        email: credentials.email,
        name: `${credentials.firstName} ${credentials.lastName}`,
      },
      token: "mock_token_12345",
      refreshToken: "mock_refresh_token_12345",
    };
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  },

  /**
   * OAuth login with Google
   */
  async loginWithGoogle(): Promise<void> {
    // TODO: Implement OAuth flow
    console.log("Google OAuth - to be implemented");
  },

  /**
   * OAuth login with 42
   */
  async loginWith42(): Promise<void> {
    // TODO: Implement OAuth flow
    console.log("42 OAuth - to be implemented");
  },
};

// ============ User API ============
export const userApi = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    // TODO: Replace with actual API call
    // const response = await apiRequest<User>(API_ENDPOINTS.USER.PROFILE);
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockUser, ...data };
  },

  /**
   * Get user settings
   */
  async getSettings(): Promise<UserSettings> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      notifications: {
        emailNewPlaylist: true,
        emailWeeklyDigest: true,
        emailArtistUpdates: false,
        pushNewFollower: true,
        pushPlaylistComplete: true,
        pushRecommendations: false,
      },
      privacy: {
        profilePublic: true,
        showListeningActivity: true,
        showPlaylists: true,
        allowDataCollection: false,
      },
      preferences: {
        moods: ["Melancholic", "Electronic"],
        theme: "dark",
      },
    };
  },

  /**
   * Update user settings
   */
  async updateSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const current = await this.getSettings();
    return { ...current, ...settings };
  },
};

// ============ Artists API ============
export const artistsApi = {
  /**
   * Get all artists
   */
  async getAll(): Promise<Artist[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockArtists;
  },

  /**
   * Get top artists for current user
   */
  async getTopArtists(limit = 6): Promise<Artist[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockArtists.slice(0, limit);
  },

  /**
   * Get artist by ID
   */
  async getById(id: string): Promise<Artist | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockArtists.find(a => a.id === id);
  },
};

// ============ Playlists API ============
export const playlistsApi = {
  /**
   * Get all playlists
   */
  async getAll(): Promise<Playlist[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPlaylists;
  },

  /**
   * Get recent playlists
   */
  async getRecent(limit = 4): Promise<Playlist[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return recentPlaylists.slice(0, limit);
  },

  /**
   * Get AI-generated playlists
   */
  async getAIGenerated(): Promise<Playlist[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return aiPlaylists;
  },

  /**
   * Get playlist by ID
   */
  async getById(id: string): Promise<Playlist | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPlaylists.find(p => p.id === id);
  },

  /**
   * Create a new playlist
   */
  async create(playlist: Omit<Playlist, "id">): Promise<Playlist> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...playlist, id: Date.now().toString() };
  },

  /**
   * Generate AI playlist
   */
  async generate(request: GeneratePlaylistRequest): Promise<GeneratePlaylistResponse> {
    // TODO: Replace with actual AI generation API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      playlist: {
        id: Date.now().toString(),
        name: "AI Generated Playlist",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        trackCount: 15,
        duration: "52m",
        creator: "AI Generated",
        generationType: request.imageUrl ? "image" : "mood",
        generationTag: request.mood || "Custom",
      },
      tracks: mockTracks,
    };
  },

  /**
   * Toggle playlist like
   */
  async toggleLike(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const playlist = mockPlaylists.find(p => p.id === id);
    return !playlist?.isLiked;
  },
};

// ============ Tracks API ============
export const tracksApi = {
  /**
   * Get all tracks
   */
  async getAll(): Promise<Track[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTracks;
  },

  /**
   * Get currently playing track
   */
  async getCurrent(): Promise<Track> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return currentTrack;
  },

  /**
   * Get track by ID
   */
  async getById(id: string): Promise<Track | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTracks.find(t => t.id === id);
  },
};

// Export all APIs as a single object for convenience
export const api = {
  auth: authApi,
  user: userApi,
  artists: artistsApi,
  playlists: playlistsApi,
  tracks: tracksApi,
};

export default api;
