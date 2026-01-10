// src/components/artists/ArtistCard.tsx
import React from "react";
import type { Artist } from "../../api/artistApi";

type ArtistCardProps = {
  artist: Artist;
  selected: boolean;
  onToggle: () => void;
};

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  selected,
  onToggle,
}) => {
  const imageUrl =
    artist.image_url ||
    "https://via.placeholder.com/300x300?text=Artist";

  const selectedBorder =
    "border-4 border-primary shadow-[0_0_20px_rgba(70,236,19,0.3)]";
  const defaultImg =
    "grayscale-[50%] group-hover:grayscale-0";

  return (
    <div
      className="group relative flex flex-col items-center gap-3 pb-3 cursor-pointer artist-card-hover"
      onClick={onToggle}
    >
      <div className="relative w-full aspect-square">
        <div
          className={`w-full h-full bg-center bg-no-repeat bg-cover rounded-full transition-all duration-300 ${
            selected ? selectedBorder : defaultImg
          }`}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        {selected ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full group-hover:bg-black/10 transition-colors">
            <div className="bg-primary text-background-dark rounded-full p-2 flex items-center justify-center">
              <span className="material-symbols-outlined !text-xl font-bold">
                check
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="material-symbols-outlined text-white !text-3xl">
              favorite
            </span>
          </div>
        )}
      </div>
      <p
        className={`text-base font-medium leading-normal text-center ${
          selected
            ? "text-white"
            : "text-[#a3b99d] group-hover:text-white transition-colors"
        }`}
      >
        {artist.name}
      </p>
    </div>
  );
};