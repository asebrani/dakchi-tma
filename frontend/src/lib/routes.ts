/**
 * Centralized route definitions for the application.
 * Use these constants instead of hardcoding paths.
 */

export const ROUTES = {
  // Public routes
  HOME: "/",
  AUTH: "/auth",
  
  // Protected routes (require authentication)
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  
  // Dynamic routes
  PLAYLIST: (id: string) => `/playlist/${id}`,
  ARTIST: (id: string) => `/artist/${id}`,
} as const;

/**
 * API endpoints for backend integration.
 * These will be used when connecting to the backend.
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    GOOGLE: "/auth/google",
    FORTYTWO: "/auth/42",
  },
  
  // User
  USER: {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    SETTINGS: "/user/settings",
    PREFERENCES: "/user/preferences",
  },
  
  // Playlists
  PLAYLISTS: {
    LIST: "/playlists",
    GET: (id: string) => `/playlists/${id}`,
    CREATE: "/playlists",
    UPDATE: (id: string) => `/playlists/${id}`,
    DELETE: (id: string) => `/playlists/${id}`,
    GENERATE: "/playlists/generate",
  },
  
  // Artists
  ARTISTS: {
    LIST: "/artists",
    TOP: "/artists/top",
    GET: (id: string) => `/artists/${id}`,
  },
  
  // Tracks
  TRACKS: {
    LIST: "/tracks",
    GET: (id: string) => `/tracks/${id}`,
    CURRENT: "/tracks/current",
  },
  
  // AI Generation
  AI: {
    GENERATE_PLAYLIST: "/ai/generate-playlist",
    ANALYZE_MOOD: "/ai/analyze-mood",
    ANALYZE_IMAGE: "/ai/analyze-image",
  },
} as const;
