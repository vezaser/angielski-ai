
import React, { useMemo } from 'react';
import { CATEGORIES, FALLBACK_WORDS } from '../constants';

export const ProgressView: React.FC = () => {
  const stats = useMemo(() => {
    const rawData = localStorage.getItem('english_progress');
    const data = rawData ? JSON.parse(rawData) : { learnedCategories: [], testScores: {} };
    
    // Calculate total learned words based on FALLBACK_WORDS count for finished categories
    const learnedCount = data.learnedCategories.reduce((acc: number, catId: string) => {
      return acc + (FALLBACK_WORDS[catId]?.length || 0);
    }, 0);

    const totalPossibleWords = Object.values(FALLBACK_WORDS).flat().length;

    // Calculate average scores per category
    const categoryPerformance = CATEGORIES.map(cat => {
      const scores = data.testScores[cat.id] || [];
      const avg = scores.length > 0 
        ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) 
        : 0;
      return { ...cat, avgScore: avg };
    });

    return {
      learnedCount,
      totalPossibleWords,
      data,
      categoryPerformance
    };
  }, []);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      {/* Global Progress Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[3rem] p-8 text-white shadow-xl flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 border-4 border-white/30">
          <span className="text-4xl font-bold">{Math.round((stats.learnedCount / stats.totalPossibleWords) * 100)}%</span>
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight">Twoja Wiedza</h2>
        <p className="mt-2 text-white/80 font-medium text-lg">
          Opanowałeś już <span className="font-black text-white">{stats.learnedCount}</span> z {stats.totalPossibleWords} słówek!
        </p>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 px-2 flex items-center gap-2">
          <span>🏅</span> Ukończone działy
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => {
            const isLearned = stats.data.learnedCategories.includes(cat.id);
            return (
              <div 
                key={cat.id} 
                className={`p-4 rounded-3xl border-2 transition-all flex items-center gap-3 ${
                  isLearned ? 'bg-white border-blue-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm truncate text-gray-700">{cat.name}</span>
                  {isLearned && <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Zaliczone!</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test Performance Chart */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-blue-50 space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span>📊</span> Wyniki testów (%)
        </h3>
        <div className="flex items-end justify-between h-40 px-2 gap-2 overflow-x-auto">
          {stats.categoryPerformance.map(cat => (
            <div key={cat.id} className="flex flex-col items-center flex-1 min-w-[30px] group relative">
              <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {cat.avgScore}%
              </div>
              <div 
                className={`w-full rounded-t-lg transition-all duration-1000 ${cat.color} ${cat.avgScore > 0 ? 'opacity-100 shadow-lg' : 'opacity-20 h-2'}`}
                style={{ height: cat.avgScore > 0 ? `${cat.avgScore}%` : '8px' }}
              />
              <span className="mt-2 text-[10px] font-black text-gray-400 truncate w-full text-center">{cat.icon}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 font-medium">Przeciętny wynik z Twoich ostatnich testów w każdej kategorii.</p>
      </div>
      
      {/* Clear Progress Button */}
      <button 
        onClick={() => { if(confirm('Czy na pewno chcesz wyczyścić wszystkie postępy?')) { localStorage.removeItem('english_progress'); window.location.reload(); } }}
        className="text-gray-300 text-[10px] font-bold uppercase tracking-widest text-center pt-4"
      >
        Wyczyść dane postępu
      </button>
    </div>
  );
};
