import React from "react";

type BottomBarProps = {
  selectedCount: number;
  canContinue: boolean;
  onContinue: () => void;
};

export const BottomBar: React.FC<BottomBarProps> = ({
  selectedCount,
  canContinue,
  onContinue,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* Gradient fade */}
      <div className="h-16 w-full bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />

      {/* Actual bar */}
      <div className="bg-background-dark/95 backdrop-blur-md border-t border-[#2c3928] px-6 md:px-10 py-4 flex items-center justify-center">
        <div className="w-full max-w-[960px] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold">
              {selectedCount} selected
            </span>
            <span className="text-[#a3b99d] text-xs">Pick at least 3</span>
          </div>
          <div className="flex gap-4">
            <button className="hidden sm:flex items-center justify-center h-12 px-6 rounded-full text-[#a3b99d] hover:text-white font-bold text-sm transition-colors">
              Skip for now
            </button>
            <button
              onClick={onContinue}
              disabled={!canContinue}
              className={`flex items-center justify-center h-12 px-8 rounded-full bg-primary text-[#131811] font-bold text-base shadow-[0_0_15px_rgba(70,236,19,0.4)] transition-all transform
                ${
                  canContinue
                    ? "hover:bg-[#3cd610] hover:shadow-[0_0_25px_rgba(70,236,19,0.6)] hover:scale-105"
                    : "opacity-60 cursor-not-allowed"
                }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};