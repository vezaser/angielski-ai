
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
    <div className="flex flex-col h-full space-y-6 min-h-[70vh]">
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
        <div 
          className="bg-blue-500 h-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Card - Refined for No-Image focus */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="w-full py-16 px-8 bg-white border-4 border-blue-100 rounded-[3rem] shadow-xl flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h2 className="text-6xl font-black text-blue-600 tracking-tight mb-2 uppercase">{word.english}</h2>
            <div className="h-1 w-24 bg-blue-100 mx-auto rounded-full mb-4"></div>
            <p className="text-3xl text-gray-400 font-medium italic">{word.polish}</p>
          </div>
        </div>

        {/* Pronunciation Controls */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => playPronunciation(word.english)}
            className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border-8 border-blue-50"
            title="Słuchaj"
          >
            <span className="text-5xl">🔊</span>
          </button>
          
          <button 
            onClick={() => playPronunciation(word.english)}
            className="w-16 h-16 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg hover:rotate-180 active:scale-90 transition-all border-4 border-blue-100"
            title="Powtórz"
          >
            <span className="text-3xl">↺</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons - Larger for mobile */}
      <div className="flex justify-between items-center py-6 gap-4">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex-1 py-5 rounded-[2rem] font-bold text-lg transition-all ${
            currentIndex === 0 ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-700 active:scale-95'
          }`}
        >
          Wróć
        </button>
        <button 
          onClick={handleNext}
          className="flex-[2] py-5 bg-blue-600 text-white rounded-[2rem] font-bold text-xl shadow-lg active:scale-95 transition-all"
        >
          {currentIndex === words.length - 1 ? 'Koniec!' : 'Następny'}
        </button>
      </div>
    </div>
  );
};
