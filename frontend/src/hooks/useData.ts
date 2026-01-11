/**
 * React Query hooks for data fetching
 * 
 * These hooks provide a clean interface for components to fetch data
 * with automatic caching, loading states, and error handling.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { User, Playlist, Artist, Track, UserSettings, GeneratePlaylistRequest } from "@/types";

// ============ Query Keys ============
export const queryKeys = {
  user: {
    profile: ["user", "profile"] as const,
    settings: ["user", "settings"] as const,
  },
  artists: {
    all: ["artists"] as const,
    top: (limit?: number) => ["artists", "top", limit] as const,
    detail: (id: string) => ["artists", id] as const,
  },
  playlists: {
    all: ["playlists"] as const,
    recent: (limit?: number) => ["playlists", "recent", limit] as const,
    ai: ["playlists", "ai"] as const,
    detail: (id: string) => ["playlists", id] as const,
  },
  tracks: {
    all: ["tracks"] as const,
    current: ["tracks", "current"] as const,
    detail: (id: string) => ["tracks", id] as const,
  },
} as const;

// ============ User Hooks ============
export function useUser() {
  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => api.user.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUserSettings() {
  return useQuery({
    queryKey: queryKeys.user.settings,
    queryFn: () => api.user.getSettings(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<User>) => api.user.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user.profile, updatedUser);
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (settings: Partial<UserSettings>) => api.user.updateSettings(settings),
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(queryKeys.user.settings, updatedSettings);
    },
  });
}

// ============ Artists Hooks ============
export function useArtists() {
  return useQuery({
    queryKey: queryKeys.artists.all,
    queryFn: () => api.artists.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useTopArtists(limit = 6) {
  return useQuery({
    queryKey: queryKeys.artists.top(limit),
    queryFn: () => api.artists.getTopArtists(limit),
    staleTime: 10 * 60 * 1000,
  });
}

export function useArtist(id: string) {
  return useQuery({
    queryKey: queryKeys.artists.detail(id),
    queryFn: () => api.artists.getById(id),
    enabled: !!id,
  });
}

// ============ Playlists Hooks ============
export function usePlaylists() {
  return useQuery({
    queryKey: queryKeys.playlists.all,
    queryFn: () => api.playlists.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecentPlaylists(limit = 4) {
  return useQuery({
    queryKey: queryKeys.playlists.recent(limit),
    queryFn: () => api.playlists.getRecent(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAIPlaylists() {
  return useQuery({
    queryKey: queryKeys.playlists.ai,
    queryFn: () => api.playlists.getAIGenerated(),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlaylist(id: string) {
  return useQuery({
    queryKey: queryKeys.playlists.detail(id),
    queryFn: () => api.playlists.getById(id),
    enabled: !!id,
  });
}

export function useGeneratePlaylist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: GeneratePlaylistRequest) => api.playlists.generate(request),
    onSuccess: () => {
      // Invalidate playlists queries to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.ai });
    },
  });
}

export function useTogglePlaylistLike() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.playlists.toggleLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists.all });
    },
  });
}

// ============ Tracks Hooks ============
export function useTracks() {
  return useQuery({
    queryKey: queryKeys.tracks.all,
    queryFn: () => api.tracks.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCurrentTrack() {
  return useQuery({
    queryKey: queryKeys.tracks.current,
    queryFn: () => api.tracks.getCurrent(),
    staleTime: 30 * 1000, // 30 seconds - updates more frequently
  });
}

export function useTrack(id: string) {
  return useQuery({
    queryKey: queryKeys.tracks.detail(id),
    queryFn: () => api.tracks.getById(id),
    enabled: !!id,
  });
}
