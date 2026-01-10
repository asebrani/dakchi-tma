import { Header } from "../components/layout/Header";
import { useState } from 'react';
import { Play, Music, Trophy, Activity, ArrowLeft } from 'lucide-react';
import { SONG_LIST, Song } from '../config/songs';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function RhythmMenu() {
  const [selectedSong, setSelectedSong] = useState<Song>(SONG_LIST[0]);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const { t } = useTranslation();


  return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-sans">
        <Header />

      <header className="p-2 border border-neutral-800 flex items-center gap-4 bg-black/40 backdrop-blur-md sticky top-0 z-10">
        <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition">
           <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          {t('return')}
        </h1>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        <div className="w-1/2 overflow-y-auto border-r border-neutral-800 p-6 space-y-4">

          <Link 
            to="/game" 
            className="group relative px-12 py-4 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center gap-2 overflow-hidden"
          >
             <span className="relative z-10 flex items-center gap-2">
               {t('start_game')} <Play className="w-5 h-5 fill-current" />
             </span>
             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>

        </div>
      </div>
    </div>
  );
}



{/* {SONG_LIST.map((song) => (
            <div 
              key={song.id}
              onClick={() => setSelectedSong(song)}
              className={`
                group cursor-pointer p-4 rounded-xl border transition-all duration-300 transform hover:scale-[1.02]
                flex items-center gap-4
                ${selectedSong.id === song.id 
                  ? "bg-white/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                  : "bg-neutral-800/50 border-transparent hover:bg-neutral-800 hover:border-neutral-600"}
              `}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${song.image} flex items-center justify-center`}>
                <Music className="text-white w-6 h-6" />
              </div>

              <div className="flex-1">
                <h3 className={`font-bold text-lg ${selectedSong.id === song.id ? "text-blue-400" : "text-white"}`}>
                  {song.title}
                </h3>
                <p className="text-neutral-400 text-sm">{song.artist}</p>
              </div>

              <div className="text-neutral-500 text-xs font-mono bg-black/30 px-2 py-1 rounded">
                {song.bpm} BPM
              </div>
            </div>
          ))}
        </div>

        <div className="w-1/2 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedSong.image} opacity-10 blur-3xl`} />

          <div className={`
            w-64 h-64 rounded-2xl shadow-2xl mb-8 transform transition-all duration-500
            bg-gradient-to-br ${selectedSong.image}
            flex items-center justify-center
          `}>
             <Music className="w-24 h-24 text-white opacity-80" />
          </div>

          <h2 className="text-4xl font-black mb-2 text-center">{selectedSong.title}</h2>
          <p className="text-xl text-neutral-400 mb-8">{selectedSong.artist}</p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
             <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700 flex flex-col items-center">
                <Trophy className="text-yellow-400 mb-2 w-5 h-5" />
                <span className="text-xs text-neutral-400 uppercase">High Score</span>
                <span className="font-mono text-xl">{selectedSong.highScore.toLocaleString()}</span>
             </div>
             <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700 flex flex-col items-center">
                <Activity className="text-green-400 mb-2 w-5 h-5" />
                <span className="text-xs text-neutral-400 uppercase">Speed</span>
                <span className="font-mono text-xl">{selectedSong.bpm} BPM</span>
             </div>
          </div>

          <div className="flex gap-2 mb-8 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            {["Easy", "Medium", "Hard"].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level as any)}
                className={`
                  px-6 py-2 rounded-md text-sm font-bold transition-all
                  ${difficulty === level 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"}
                `}
              >
                {level}
              </button>
            ))}
          </div> */}