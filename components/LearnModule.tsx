
import React, { useState } from 'react';
import { Word } from '../types';
import { playPronunciation } from '../services/geminiService';

interface LearnModuleProps {
  words: Word[];
  onFinish: () => void;
}

export const LearnModule: React.FC<LearnModuleProps> = ({ words, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const word = words[currentIndex];

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 pt-4 animate-in fade-in duration-500">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 px-2">
        <div className="flex-1 bg-white h-4 rounded-full p-1 shadow-inner border border-blue-50">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-blue-400">{currentIndex + 1}/{words.length}</span>
      </div>

      {/* Main Card */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        <div className="w-full bg-white border-b-8 border-blue-100 rounded-[3.5rem] p-10 shadow-2xl flex flex-col items-center text-center space-y-6 transform transition-all">
          <h2 className="text-6xl font-black text-gray-800 break-words w-full tracking-tight">
            {word.english}
          </h2>
          <div className="h-1.5 w-16 bg-blue-500/20 rounded-full" />
          <p className="text-3xl text-blue-400 font-medium">{word.polish}</p>
        </div>

        {/* Pronunciation Circle */}
        <button 
          onClick={() => playPronunciation(word.english)}
          className="group relative w-28 h-28 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(59,130,246,0.4)] active:scale-90 active:shadow-inner transition-all border-8 border-white"
        >
          <span className="text-5xl group-hover:scale-110 transition-transform">🔊</span>
          <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/20 -z-10" />
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="flex gap-4 pb-4">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex-1 py-5 rounded-3xl font-bold text-lg transition-all border-b-4 ${
            currentIndex === 0 
              ? 'bg-gray-100 text-gray-300 border-gray-200' 
              : 'bg-white text-gray-600 border-gray-200 active:translate-y-1 active:border-b-0'
          }`}
        >
          Poprzedni
        </button>
        <button 
          onClick={handleNext}
          className="flex-[2] py-5 bg-blue-600 text-white rounded-3xl font-bold text-xl shadow-lg border-b-4 border-blue-800 active:translate-y-1 active:border-b-0 transition-all"
        >
          {currentIndex === words.length - 1 ? 'Rozumiem! 🚀' : 'Następny →'}
        </button>
      </div>
    </div>
  );
};
