import React, { useState, useRef, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { BottomBar } from "../components/layout/BottomBar";

interface AnalysisResult {
  primaryMood: string;
  confidence: number;
  detectedVibes: Array<{ name: string; score: number }>;
  suggestedGenres: string[];
  colors?: string;
}

export const ImageRecognitionPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Add Tailwind config for custom animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
      }
      .mood-happy { @apply bg-gradient-to-r from-amber-400 to-orange-500; }
      .mood-energetic { @apply bg-gradient-to-r from-red-500 to-pink-500; }
      .mood-calm { @apply bg-gradient-to-r from-blue-400 to-cyan-400; }
      .mood-sad { @apply bg-gradient-to-r from-blue-400 to-blue-700; }
      .mood-melancholic { @apply bg-gradient-to-r from-purple-500 to-indigo-500; }
      .mood-peaceful { @apply bg-gradient-to-r from-emerald-400 to-teal-500; }
      .mood-romantic { @apply bg-gradient-to-r from-pink-400 to-red-400; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setShowResults(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
      setTimeout(() => analyzeImage(file), 500);
    }
  };

  const analyzeImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);  // Backend expects "file", not "image"

      const response = await fetch("http://localhost:3000/api/analyze-image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to analyze image");
      }

      const data = await response.json();
      setResult(data);
      setShowResults(true);
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError(err instanceof Error ? err.message : "Failed to analyze image");
      // Fallback to mock results for demo if API fails
      const mockResults = generateMockResults();
      setResult(mockResults);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const generateMockResults = (): AnalysisResult => {
    const moods = ["Happy", "Energetic", "Calm", "Melancholic", "Peaceful"];
    const primaryMood = moods[Math.floor(Math.random() * moods.length)];

    const genreMap: Record<string, string[]> = {
      Happy: ["Pop", "Dance", "Funk", "Indie Pop"],
      Energetic: ["Rock", "EDM", "Hip Hop", "Punk"],
      Calm: ["Ambient", "Jazz", "Classical", "Lo-fi"],
      Melancholic: ["Indie", "Alternative", "Blues", "Singer-Songwriter"],
      Peaceful: ["Acoustic", "New Age", "Meditation", "Folk"],
    };

    return {
      primaryMood: primaryMood,
      confidence: 85 + Math.floor(Math.random() * 15),
      detectedVibes: [
        { name: "Happy", score: Math.floor(Math.random() * 100) },
        { name: "Energetic", score: Math.floor(Math.random() * 100) },
        { name: "Calm", score: Math.floor(Math.random() * 100) },
        { name: "Melancholic", score: Math.floor(Math.random() * 100) },
        { name: "Romantic", score: Math.floor(Math.random() * 100) },
      ].sort((a, b) => b.score - a.score),
      colors: ["Warm", "Cool", "Vibrant", "Muted"][Math.floor(Math.random() * 4)],
      suggestedGenres: genreMap[primaryMood] || genreMap["Happy"],
    };
  };

  const getMoodEmoji = (mood: string): string => {
    const emojis: Record<string, string> = {
      Happy: "😊",
      Energetic: "⚡",
      Calm: "😌",
      Melancholic: "🌧️",
      Peaceful: "🕊️",
      Romantic: "💕",
      Sad: "😢",
    };
    return emojis[mood] || "🎵";
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setShowResults(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const moodGradient = result
    ? `mood-${result.primaryMood.toLowerCase()}`
    : "bg-gradient-to-r from-blue-500 to-purple-600";

  return (
    <div className="bg-[#1c2b18] min-h-screen text-white flex flex-col">
      <style>{`
        .mood-happy { background: linear-gradient(to right, #fbbf24, #f97316); }
        .mood-energetic { background: linear-gradient(to right, #ef4444, #ec4899); }
        .mood-calm { background: linear-gradient(to right, #60a5fa, #06b6d4); }
        .mood-sad { background: linear-gradient(to right, #60a5fa, #1e3a8a); }
        .mood-melancholic { background: linear-gradient(to right, #a855f7, #6366f1); }
        .mood-peaceful { background: linear-gradient(to right, #4ade80, #14b8a6); }
        .mood-romantic { background: linear-gradient(to right, #f472b6, #f87171); }
      `}</style>

      <Header />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 flex items-center justify-center gap-3 text-[#46ec13]"
              style={{ textShadow: "0 0 10px rgba(70,236,19,0.7)" }}>
              <span>🎶</span>
              Vibe Detector
            </h1>
            <p className="text-xl text-gray-300">
              Upload a photo and discover its musical mood
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border-2 border-white/20 mb-8"
            style={{ boxShadow: "0 0 10px rgba(70,236,19,0.3)" }}>

            {!preview ? (
              <div
                className="border-4 border-dashed border-white/30 rounded-2xl p-12 text-center cursor-pointer transition-all hover:border-white/50 hover:bg-white/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-5xl mb-4">+</div>
                <h3 className="text-2xl mb-2">Upload Your Photo</h3>
                <p className="text-gray-300 mb-4">
                  Click to select a sunset, rain, party, or any photo
                </p>
                <button
                  className="bg-gradient-to-r from-neutral-950 to-lime-900 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                  style={{ boxShadow: "0 0 10px rgba(70,236,19,0.5)" }}
                >
                  Choose Image
                </button>
              </div>
            ) : (
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-80 object-cover"
                  />
                  {loading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <p
                          className="font-semibold text-white animate-pulse text-2xl"
                          style={{ textShadow: "0 0 5px rgba(70,236,19,0.7)" }}
                        >
                          Analyzing Vibe...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleReset}
                  className="w-full bg-white/20 text-white py-3 rounded-xl font-semibold transition-all hover:bg-white/30"
                >
                  Upload Different Image
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Results */}
          {showResults && result && (
            <div className="animate-fade-in space-y-6">
              {/* Primary Mood */}
              <div
                className={`rounded-3xl p-8 text-center ${moodGradient}`}
              >
                <div className="text-6xl mb-3">{getMoodEmoji(result.primaryMood)}</div>
                <h2 className="text-4xl font-bold mb-2">
                  {result.primaryMood} Vibes
                </h2>
                <p className="text-xl opacity-90">{result.confidence}% confidence</p>
              </div>

              {/* Detected Emotions */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>✨</span>
                  Detected Emotions
                </h3>
                <div className="space-y-4">
                  {result.detectedVibes.map((vibe, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">{vibe.name}</span>
                        <span>{vibe.score}%</span>
                      </div>
                      <div className="bg-white/20 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full mood-${vibe.name.toLowerCase()}`}
                          style={{
                            width: `${vibe.score}%`,
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Music Suggestions */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🎵</span>
                  Suggested Music Genres
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {result.suggestedGenres.map((genre, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-center font-semibold cursor-pointer hover:scale-105 transition-transform"
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full bg-gradient-to-r from-neutral-900 to-lime-900 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
                style={{ boxShadow: "0 0 10px rgba(70,236,19,0.5)" }}
              >
                Generate Playlist from This Vibe 🎵
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-500/20 border border-red-500 text-red-200 rounded-lg p-4">
              {error}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10"
            style={{ boxShadow: "0 0 5px rgba(70,236,19,0.3)" }}>
            <h4 className="font-semibold mb-2">💡 How it works:</h4>
            <ul className="list-none text-gray-300 text-sm space-y-1">
              <li>• AI analyzes colors, lighting, and composition</li>
              <li>• Detects emotional content and atmosphere</li>
              <li>• Maps visual vibes to musical moods</li>
              <li>• Suggests genres that match the photo&apos;s energy</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};
