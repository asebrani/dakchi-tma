import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { BottomBar } from "../components/layout/BottomBar";
import { ArtistCard } from "../components/artists/ArtistCard";
import { useArtists } from "../hooks/userArtists";

export const ChooseArtistPage: React.FC = () => {
  const { artists, total, loading, error, loadMore } = useArtists(20);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    if (selectedIds.size < 3) return;
    const selectedArray = Array.from(selectedIds);
    console.log("Selected artists:", selectedArray);
    // TODO: POST to /api/user/preferences/ then navigate to /recommend
  };

  const selectedCount = selectedIds.size;
  const canContinue = selectedCount >= 3;

  return (
	<div className="bg-background-light dark:bg-background-dark text-[#131811] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
	  <Header />

		<main className="flex-1 flex flex-col items-center w-full px-4 md:px-10 pb-32">
		<div className="w-full max-w-[960px] flex flex-col gap-6 pt-8">
	      {/* Progress bar, heading, search bar using same Tailwind from HTML */}

          {/* Error state */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">
              <p className="font-bold">Error loading artists:</p>
              <p>{error.message}</p>
            </div>
          )}

          {/* Loading state for initial load */}
          {loading && artists.length === 0 && (
            <div className="flex justify-center py-12">
              <p className="text-[#a3b99d]">Loading artists...</p>
            </div>
          )}

		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-4">
			{artists.map(artist => (
			  <ArtistCard
				key={artist.id}
				artist={artist}
				selected={selectedIds.has(artist.id)}
				onToggle={() => toggleSelect(artist.id)}
			/>				
			))}
	      </div>

          {total == null || artists.length < total ? (
            <div className="flex justify-center mt-4 mb-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="text-[#a3b99d] hover:text-white font-semibold text-sm flex items-center gap-2 px-6 py-3 rounded-full hover:bg-[#2c3928] transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                {loading ? "Loading..." : "Load more artists"}
              </button>
            </div>
          ) : null}
	</div>
      </main>

	  <BottomBar
	    selectedCount={selectedCount}
	    canContinue={canContinue}
	    onContinue={handleContinue}
	  />
	</div>
	);
};