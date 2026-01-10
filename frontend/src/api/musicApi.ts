import { httpClient } from "./httpClient";

export type RecommendResponse = {
  analysis: {
    mood: string;
    genre: string;
    energy_level: string;
    keywords: string[];
    activity: string | null;
    language: string | null;
    era: string | null;
  };
  search_query: string;
  videos: {
    video_id: string;
    title: string;
    channel: string;
    thumbnail: string;
    embed_url: string;
    watch_url: string;
  }[];
  total_results: number;
};

export async function recommendMusic(query: string, count = 10) {
  const params = new URLSearchParams({ query, count: String(count) });
  return httpClient.get<RecommendResponse>(`/recommend/?${params.toString()}`);
}
