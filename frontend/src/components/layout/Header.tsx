import React from "react";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <>

      <div className="flex justify-end gap-2 p-4">
      <button className="rounded-full bg-white/10 p-2 hover:scale-105 transition-transform flex items-center gap-2 overflow-hidden" onClick={() => i18n.changeLanguage('en')}>En</button>
      <button className="rounded-full bg-white/10 p-2 hover:scale-105 transition-transform flex items-center gap-2 overflow-hidden" onClick={() => i18n.changeLanguage('fr')}>Fr</button>
    </div>
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2c3928] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 md:px-10 py-3">
       
        <div className="flex items-center gap-4 text-[#131811] dark:text-white">
          <div className="size-8 text-primary">
            {/* Your SVG logo */}
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            MoodMusic
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#2c3928] hover:bg-[#3a4b35] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
            <span className="truncate"> { t('qwd') } </span>
          </button>
        </div>
      </header></>
  );
};