
import React, { useState, useMemo } from 'react';
import { FALLBACK_WORDS } from '../constants';
import { playPronunciation } from '../services/geminiService';

export const AllWordsList: React.FC = () => {
  const [search, setSearch] = useState('');

  const allWords = useMemo(() => {
    return Object.values(FALLBACK_WORDS)
      .flat()
      .sort((a, b) => a.english.localeCompare(b.english));
  }, []);

  const filteredWords = allWords.filter(w => 
    w.english.toLowerCase().includes(search.toLowerCase()) || 
    w.polish.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in duration-500">
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-blue-50">
        <h3 className="text-center text-lg font-bold text-blue-600 mb-1">Twój Słownik A1</h3>
        <p className="text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
           Opanuj {allWords.length} kluczowych słów
        </p>
      </div>

      <div className="relative">
        <input 
          type="text"
          placeholder="Szukaj słówka..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 pl-12 bg-white border-2 border-gray-100 rounded-2xl shadow-sm focus:border-blue-300 focus:outline-none transition-all"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl opacity-50">🔍</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2 pb-2">
        {filteredWords.map((word, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 shadow-sm active:bg-blue-50 active:scale-[0.98] transition-all"
            onClick={() => playPronunciation(word.english)}
          >
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-600 uppercase tracking-tight">{word.english}</span>
              <span className="text-gray-400 text-sm font-medium">{word.polish}</span>
            </div>
            <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center">
               <span className="text-xl">🔊</span>
            </div>
          </div>
        ))}
        {filteredWords.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <span className="text-6xl block mb-4">🔍❓</span>
            Nie znaleźliśmy takiego słówka.
          </div>
        )}
      </div>
    </div>
  );
};
