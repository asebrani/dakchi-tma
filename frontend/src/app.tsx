import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChooseArtistPage } from "./pages/ChooseArtistPage";
import { RecommendationsPage } from "./pages/RecommendationsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import RhythmMenu from "./pages/RhythmMenu";
import { ImageRecognitionPage } from "./pages/ImageRecognitionPage";
import {re
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#131811] dark:text-white font-display">
      <Routes>
        <Route path="/gamemenu" element={<RhythmMenu />} />
        <Route path="/artist-page" element={<ChooseArtistPage />} />
        <Route path="/onboarding/artists" element={<ChooseArtistPage />} />
        <Route path="/recommend" element={<RecommendationsPage />} />
        <Route path="/image-recognition" element={<ImageRecognitionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;