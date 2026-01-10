import { useEffect, useState } from "react";
import { fetchArtists, Artist, ArtistsResponse } from "../api/artistApi";

export function useArtists(pageSize: number = 20) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      console.log(`[useArtists] Fetching page ${page}, pageSize ${pageSize}...`);
      try {
        const data: ArtistsResponse = await fetchArtists(page, pageSize);
        console.log("[useArtists] Response:", data);
        if (cancelled) return;
        setTotal(data.total);
        setArtists(prev =>
          page === 1 ? data.artists : [...prev, ...data.artists]
        );
        console.log("Loaded artists:", data.artists.length, data.artists);
      } catch (err) {
        console.error("[useArtists] Error:", err);
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize]);

  const loadMore = () => {
    if (total != null && artists.length >= total) return;
    setPage(p => p + 1);
  };

  const reset = () => {
    setArtists([]);
    setPage(1);
    setTotal(null);
  };

  return { artists, total, page, loading, error, loadMore, reset };
}