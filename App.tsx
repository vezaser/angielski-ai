
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CATEGORIES, FALLBACK_WORDS } from './constants';
import { AppMode, Category, Word } from './types';
import { fetchCategoryWords } from './services/geminiService';
import { LearnModule } from './components/LearnModule';
import { TestModule } from './components/TestModule';
import { AllWordsList } from './components/AllWordsList';
import { ProgressView } from './components/ProgressView';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testScore, setTestScore] = useState<number | null>(null);
  const [learningFinished, setLearningFinished] = useState(false);
  const [showInstallTip, setShowInstallTip] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const saveProgress = (type: 'LEARN' | 'TEST', categoryId: string, score?: number, total?: number) => {
    const raw = localStorage.getItem('english_progress');
    const data = raw ? JSON.parse(raw) : { learnedCategories: [], testScores: {} };

    if (type === 'LEARN') {
      if (!data.learnedCategories.includes(categoryId)) {
        data.learnedCategories.push(categoryId);
      }
    } else if (type === 'TEST' && score !== undefined && total !== undefined) {
      const percentage = Math.round((score / total) * 100);
      if (!data.testScores[categoryId]) data.testScores[categoryId] = [];
      data.testScores[categoryId].push(percentage);
      if (data.testScores[categoryId].length > 5) data.testScores[categoryId].shift();
    }

    localStorage.setItem('english_progress', JSON.stringify(data));
  };

  const startCategory = async (cat: Category) => {
    setSelectedCategory(cat);
    setIsLoading(true);
    setLearningFinished(false);
    setTestScore(null);
    
    let fetched = await fetchCategoryWords(cat.name);
    
    if (fetched.length === 0) {
      fetched = FALLBACK_WORDS[cat.id] || FALLBACK_WORDS['animals'];
    }

    const mappedWords: Word[] = fetched.map((w, idx) => ({
      id: `${cat.id}-${idx}`,
      english: w.english,
      polish: w.polish,
      category: cat.id
    }));

    const shuffledWords = [...mappedWords].sort(() => Math.random() - 0.5);

    setWords(shuffledWords);
    setIsLoading(false);
    setMode('CATEGORY_SELECT');
  };

  const handleBack = () => {
    if (mode === 'CATEGORY_SELECT' || mode === 'DICTIONARY' || mode === 'PROGRESS') setMode('HOME');
    else if (mode === 'LEARN' || mode === 'TEST') setMode('CATEGORY_SELECT');
  };

  const currentUrl = window.location.href;
  const isBlobUrl = currentUrl.startsWith('blob:');

  const copyLink = () => {
    if (isBlobUrl) {
      alert('Ten link jest tymczasowy (blob). Kliknij ikonkę "strzałki w kwadracie" nad oknem aplikacji, aby otworzyć ją w nowym oknie i dostać prawdziwy link!');
      return;
    }
    navigator.clipboard.writeText(currentUrl);
    alert('Link skopiowany! Wyślij go teraz na swój telefon (np. mailem lub WhatsApp).');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium text-lg">Przygotowuję naukę...</p>
        </div>
      );
    }

    switch (mode) {
      case 'HOME':
        return (
          <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 py-4 relative">
              <h2 className="text-4xl font-bold text-gray-800 tracking-tight">Cześć! 👋</h2>
              <p className="text-gray-500 text-lg">Wybierz kategorię słówek:</p>
              
              <div className="absolute -top-2 -right-2 flex gap-2">
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-blue-500 text-sm"
                  title="Udostępnij"
                >
                  🔗
                </button>
                <button 
                  onClick={() => setShowInstallTip(true)}
                  className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-blue-500 font-bold"
                  title="Instrukcja"
                >
                  i
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 px-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => startCategory(cat)}
                  className={`flex flex-col items-center p-6 rounded-[2.5rem] ${cat.color} text-white shadow-xl transition-all hover:scale-105 active:scale-95`}
                >
                  <span className="text-5xl mb-3 drop-shadow-md">{cat.icon}</span>
                  <span className="font-bold text-xl">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Share Modal */}
            {showShareModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setShowShareModal(false)}>
                <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full space-y-6 animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                  <h3 className="text-2xl font-bold text-gray-800 text-center">🔗 Udostępnij</h3>
                  
                  {isBlobUrl ? (
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
                      <p className="text-sm text-amber-800 font-bold flex items-center gap-2">
                        <span>⚠️</span> Uwaga: Link tymczasowy
                      </p>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Widzę, że masz adres <b>blob:</b>. Aby dostać link na telefon, kliknij ikonkę <b>strzałki w kwadracie</b> w prawym górnym rogu (nad tym podglądem). Gdy otworzy się nowa karta, skopiuj adres z paska u góry!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500 text-center leading-relaxed">
                        Wyślij ten link na telefon, a potem otwórz go w <b>Safari</b>.
                      </p>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 break-all text-[10px] font-mono text-gray-400 max-h-24 overflow-y-auto">
                        {currentUrl}
                      </div>
                      <button 
                        onClick={copyLink}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                      >
                        <span>📋</span> Kopiuj Link
                      </button>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="w-full py-2 text-gray-400 font-bold text-sm"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            )}

            {/* Install Modal */}
            {showInstallTip && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={() => setShowInstallTip(false)}>
                <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full space-y-6 animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                  <h3 className="text-2xl font-bold text-gray-800 text-center">📱 Na iPhone</h3>
                  <div className="space-y-4 text-gray-600 text-sm">
                    <div className="flex gap-4 items-start">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs">1</span>
                      <p>Otwórz link w <b>Safari</b>.</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs">2</span>
                      <p>Kliknij ikonkę <b>Udostępnij</b> (kwadrat ze strzałką).</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs">3</span>
                      <p>Wybierz <b>"Do ekranu początkowego"</b>.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowInstallTip(false)}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold"
                  >
                    Rozumiem!
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'DICTIONARY':
        return <AllWordsList />;

      case 'PROGRESS':
        return <ProgressView />;

      case 'CATEGORY_SELECT':
        return (
          <div className="flex flex-col h-full justify-center space-y-8 min-h-[70vh] animate-in zoom-in duration-300">
            <div className="text-center p-10 bg-white border-2 border-gray-50 rounded-[3rem] shadow-sm">
              <span className="text-8xl mb-4 block drop-shadow-lg">{selectedCategory?.icon}</span>
              <h3 className="text-3xl font-bold text-gray-800">{selectedCategory?.name}</h3>
              <p className="text-gray-500 text-lg">{words.length} słówek do odkrycia</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setMode('LEARN')}
                className="w-full flex items-center justify-between p-7 bg-blue-500 text-white rounded-[2rem] shadow-lg active:scale-[0.98] transition-all"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">📖</span>
                  <div className="text-left">
                    <h4 className="font-bold text-xl">Zacznij Naukę</h4>
                    <p className="text-sm opacity-90">Słówka będą w losowej kolejności</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">→</span>
              </button>

              <button 
                onClick={() => setMode('TEST')}
                className="w-full flex items-center justify-between p-7 bg-green-500 text-white rounded-[2rem] shadow-lg active:scale-[0.98] transition-all"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🏆</span>
                  <div className="text-left">
                    <h4 className="font-bold text-xl">Rób Test</h4>
                    <p className="text-sm opacity-90">Sprawdź co już umiesz</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">→</span>
              </button>
            </div>
          </div>
        );

      case 'LEARN':
        if (learningFinished) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-10 min-h-[70vh]">
               <span className="text-9xl animate-bounce">🎉</span>
               <div>
                  <h3 className="text-4xl font-bold text-gray-800">Brawo!</h3>
                  <p className="text-gray-500 text-xl mt-2">Znasz już te słowa!</p>
               </div>
               <div className="w-full space-y-4 px-4">
                  <button 
                    onClick={() => setMode('TEST')}
                    className="w-full py-6 bg-green-500 text-white rounded-[2rem] font-bold text-2xl shadow-xl hover:bg-green-600 active:scale-95 transition-all"
                  >
                    Przejdź do Testu
                  </button>
                  <button 
                    onClick={() => setMode('CATEGORY_SELECT')}
                    className="w-full py-4 text-gray-400 font-bold text-lg"
                  >
                    Wróć do menu
                  </button>
               </div>
            </div>
          );
        }
        return (
          <LearnModule 
            words={words} 
            onFinish={() => {
              if (selectedCategory) saveProgress('LEARN', selectedCategory.id);
              setLearningFinished(true);
            }} 
          />
        );

      case 'TEST':
        if (testScore !== null) {
          const percentage = (testScore / words.length) * 100;
          let feedback = "Spróbuj jeszcze raz!";
          let emoji = "😕";
          if (percentage >= 100) { feedback = "Doskonale!"; emoji = "👑"; }
          else if (percentage >= 70) { feedback = "Świetnie!"; emoji = "🌟"; }
          else if (percentage >= 50) { feedback = "Dobrze!"; emoji = "👍"; }

          return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 min-h-[70vh]">
              <span className="text-9xl">{emoji}</span>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-gray-800">{feedback}</h3>
                <p className="text-gray-500 text-2xl">Wynik: <span className="text-blue-600 font-bold">{testScore}/{words.length}</span></p>
              </div>
              
              <div className="w-full max-w-[280px] h-6 bg-gray-100 rounded-full overflow-hidden mt-4 border-2 border-white shadow-inner">
                <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
              </div>

              <div className="w-full space-y-4 pt-8 px-4">
                <button 
                  onClick={() => { setTestScore(null); setMode('TEST'); }}
                  className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-bold text-2xl shadow-xl active:scale-95 transition-all"
                >
                  Jeszcze raz
                </button>
                <button 
                  onClick={() => setMode('HOME')}
                  className="w-full py-5 bg-gray-100 text-gray-600 rounded-[2rem] font-bold text-xl active:scale-95 transition-all"
                >
                  Inna kategoria
                </button>
              </div>
            </div>
          );
        }
        return (
          <TestModule 
            words={words} 
            onFinish={(score) => {
              if (selectedCategory) saveProgress('TEST', selectedCategory.id, score, words.length);
              setTestScore(score);
            }} 
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout 
      onBack={mode !== 'HOME' ? handleBack : undefined}
      title={
        mode === 'DICTIONARY' ? "Słownik A1" : 
        mode === 'PROGRESS' ? "Twoje Postępy" :
        (selectedCategory ? selectedCategory.name : "Angielski dla Dzieci")
      }
      onNavigateHome={() => setMode('HOME')}
      onNavigateDictionary={() => setMode('DICTIONARY')}
      onNavigateProgress={() => setMode('PROGRESS')}
      currentMode={mode}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
