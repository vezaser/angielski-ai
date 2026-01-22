
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  title?: string;
  onNavigateHome?: () => void;
  onNavigateDictionary?: () => void;
  onNavigateProgress?: () => void;
  currentMode?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onBack, 
  title, 
  onNavigateHome, 
  onNavigateDictionary,
  onNavigateProgress,
  currentMode 
}) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-blue-50/30 overflow-hidden relative selection:bg-blue-200">
      {/* Header - z uwzględnieniem notch-a (safe area top) */}
      <header className="pt-[calc(env(safe-area-inset-top)+1rem)] pb-6 px-6 flex items-center justify-between bg-transparent z-10">
        {onBack ? (
          <button 
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-gray-600 shadow-md hover:bg-gray-50 active:scale-90 transition-all"
            aria-label="Cofnij"
          >
            <span className="text-2xl font-bold">←</span>
          </button>
        ) : (
          <div className="w-12" />
        )}
        <h1 className="text-xl font-black text-gray-800 tracking-tight bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
          {title || "Angielski A1"}
        </h1>
        <div className="w-12" />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation - z uwzględnieniem Safe Area (Home Bar) */}
      {(onNavigateHome && onNavigateDictionary && onNavigateProgress) && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-gray-100 px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] flex justify-around items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <button 
            onClick={onNavigateHome}
            className={`flex flex-col items-center space-y-1 transition-all ${currentMode !== 'DICTIONARY' && currentMode !== 'PROGRESS' ? 'text-blue-500 scale-110' : 'text-gray-400 opacity-60'}`}
          >
            <span className="text-2xl">🏠</span>
            <span className="text-[10px] font-bold uppercase">Nauka</span>
          </button>
          
          <button 
            onClick={onNavigateDictionary}
            className={`flex flex-col items-center space-y-1 transition-all ${currentMode === 'DICTIONARY' ? 'text-blue-500 scale-110' : 'text-gray-400 opacity-60'}`}
          >
            <span className="text-2xl">📚</span>
            <span className="text-[10px] font-bold uppercase">Słownik</span>
          </button>

          <button 
            onClick={onNavigateProgress}
            className={`flex flex-col items-center space-y-1 transition-all ${currentMode === 'PROGRESS' ? 'text-blue-500 scale-110' : 'text-gray-400 opacity-60'}`}
          >
            <span className="text-2xl">📈</span>
            <span className="text-[10px] font-bold uppercase">Postępy</span>
          </button>
        </nav>
      )}

      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-20%] w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-20%] w-80 h-80 bg-blue-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[40%] right-[-10%] w-40 h-40 bg-pink-100/40 rounded-full blur-2xl -z-10" />
    </div>
  );
};
