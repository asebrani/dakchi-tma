import { httpClient } from "./httpClient";

export type Artist = {
  id: number;
  name: string;
  genre?: string | null;
  image_url?: string | null;
  tags?: string[];
  popularity?: number;
};

export type ArtistsResponse = {
  artists: Artist[];
  total: number;
  page: number;
  page_size: number;
};

export async function fetchArtists(page: number, pageSize: number) {
  return httpClient.get<ArtistsResponse>(
    `/artists/?page=${page}&page_size=${pageSize}`
  );
}