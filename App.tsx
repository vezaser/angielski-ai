
import React, { useState } from 'react';
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
    
    try {
      let fetched = await fetchCategoryWords(cat.name);
      
      if (!fetched || fetched.length === 0) {
        fetched = FALLBACK_WORDS[cat.id] || FALLBACK_WORDS['animals'];
      }

      const mappedWords: Word[] = fetched.map((w, idx) => ({
        id: `${cat.id}-${idx}`,
        english: w.english,
        polish: w.polish,
        category: cat.id
      }));

      setWords([...mappedWords].sort(() => Math.random() - 0.5));
      setMode('CATEGORY_SELECT');
    } catch (err) {
      const backup = FALLBACK_WORDS[cat.id] || FALLBACK_WORDS['animals'];
      setWords(backup.map((w, i) => ({ id: `${cat.id}-${i}`, ...w, category: cat.id })));
      setMode('CATEGORY_SELECT');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (mode === 'CATEGORY_SELECT' || mode === 'DICTIONARY' || mode === 'PROGRESS') setMode('HOME');
    else if (mode === 'LEARN' || mode === 'TEST') setMode('CATEGORY_SELECT');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] space-y-8 animate-in fade-in duration-700">
          <div className="relative w-32 h-32">
             <div className="absolute inset-0 border-[12px] border-blue-100 rounded-full"></div>
             <div className="absolute inset-0 border-[12px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center text-4xl">✨</div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-gray-800">Cierpliwości...</h3>
            <p className="text-blue-500 font-bold animate-pulse">Twoja przygoda się ładuje!</p>
          </div>
        </div>
      );
    }

    switch (mode) {
      case 'HOME':
        return (
          <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="text-center space-y-2 py-6">
              <h2 className="text-5xl font-black text-gray-800 tracking-tighter">Cześć! 👋</h2>
              <p className="text-gray-500 text-xl font-medium">Co dzisiaj odkrywamy?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => startCategory(cat)}
                  className={`group relative flex flex-col items-center p-7 rounded-[3rem] ${cat.color} text-white shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.03] active:scale-95 border-b-8 border-black/20`}
                >
                  <span className="text-6xl mb-4 transform group-hover:rotate-12 transition-transform drop-shadow-xl">{cat.icon}</span>
                  <span className="font-black text-xl tracking-tight uppercase">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'DICTIONARY':
        return <AllWordsList />;

      case 'PROGRESS':
        return <ProgressView />;

      case 'CATEGORY_SELECT':
        return (
          <div className="flex flex-col h-full justify-center space-y-10 min-h-[75vh] animate-in zoom-in-95 duration-300">
            <div className="text-center p-12 bg-white rounded-[4rem] shadow-2xl border-b-8 border-gray-100">
              <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
                <span className="text-8xl block animate-bounce-slow">{selectedCategory?.icon}</span>
              </div>
              <h3 className="text-4xl font-black text-gray-800 uppercase tracking-tight">{selectedCategory?.name}</h3>
              <p className="text-blue-400 font-bold text-xl mt-2">{words.length} nowych słówek</p>
            </div>

            <div className="grid gap-5">
              <button 
                onClick={() => setMode('LEARN')}
                className="group w-full flex items-center justify-between p-8 bg-blue-500 text-white rounded-[2.5rem] shadow-xl border-b-8 border-blue-700 active:translate-y-1 active:border-b-0 transition-all"
              >
                <div className="flex items-center space-x-5">
                  <span className="text-4xl">📖</span>
                  <div className="text-left">
                    <h4 className="font-black text-2xl uppercase tracking-tight">Nauka</h4>
                    <p className="text-sm font-bold opacity-80">Poznaj słówka</p>
                  </div>
                </div>
                <span className="text-3xl font-bold group-hover:translate-x-2 transition-transform">→</span>
              </button>

              <button 
                onClick={() => setMode('TEST')}
                className="group w-full flex items-center justify-between p-8 bg-green-500 text-white rounded-[2.5rem] shadow-xl border-b-8 border-green-700 active:translate-y-1 active:border-b-0 transition-all"
              >
                <div className="flex items-center space-x-5">
                  <span className="text-4xl">🏆</span>
                  <div className="text-left">
                    <h4 className="font-black text-2xl uppercase tracking-tight">Test</h4>
                    <p className="text-sm font-bold opacity-80">Zdobądź punkty</p>
                  </div>
                </div>
                <span className="text-3xl font-bold group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        );

      case 'LEARN':
        if (learningFinished) {
          return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-12 min-h-[70vh] animate-in zoom-in duration-500">
               <div className="relative">
                  <span className="text-9xl animate-bounce inline-block">🎉</span>
                  <div className="absolute -top-4 -right-4 animate-ping text-4xl">✨</div>
               </div>
               <div className="space-y-3">
                  <h3 className="text-5xl font-black text-gray-800 uppercase tracking-tighter">Super Robota!</h3>
                  <p className="text-gray-500 text-xl font-medium px-8">Wszystkie słówka z tego działu są już w Twojej głowie!</p>
               </div>
               <div className="w-full space-y-5 px-6">
                  <button 
                    onClick={() => setMode('TEST')}
                    className="w-full py-7 bg-green-500 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl border-b-8 border-green-700 active:translate-y-1 active:border-b-0 transition-all"
                  >
                    Rób Test! 🏆
                  </button>
                  <button 
                    onClick={() => setMode('HOME')}
                    className="w-full py-5 text-gray-400 font-black text-lg uppercase tracking-widest"
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
          let feedback = "Głowa do góry!";
          let emoji = "💪";
          let color = "text-orange-500";
          
          if (percentage >= 100) { feedback = "Król Angielskiego!"; emoji = "👑"; color = "text-yellow-500"; }
          else if (percentage >= 80) { feedback = "Wspaniale!"; emoji = "🌟"; color = "text-green-500"; }
          else if (percentage >= 50) { feedback = "Bardzo dobrze!"; emoji = "👍"; color = "text-blue-500"; }

          return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 min-h-[75vh] animate-in slide-in-from-bottom-10 duration-500">
              <span className="text-[120px] drop-shadow-2xl">{emoji}</span>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-gray-800 uppercase tracking-tight">{feedback}</h3>
                <p className={`text-3xl font-black ${color}`}>
                  {testScore} / {words.length}
                </p>
              </div>
              
              <div className="w-full max-w-[280px] h-8 bg-white rounded-full overflow-hidden p-1.5 border-2 border-gray-100 shadow-inner">
                <div className="bg-green-500 h-full rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ width: `${percentage}%` }} />
              </div>

              <div className="w-full space-y-5 pt-8 px-6">
                <button 
                  onClick={() => { setTestScore(null); setMode('TEST'); }}
                  className="w-full py-7 bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl shadow-xl border-b-8 border-blue-800 active:translate-y-1 active:border-b-0 transition-all"
                >
                  Spróbuj jeszcze raz
                </button>
                <button 
                  onClick={() => setMode('HOME')}
                  className="w-full py-5 bg-white text-gray-500 rounded-[2.5rem] font-black text-xl border-b-4 border-gray-200 active:translate-y-1 active:border-b-0 transition-all"
                >
                  Inny temat
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
        mode === 'DICTIONARY' ? "Słowniczek" : 
        mode === 'PROGRESS' ? "Moje Odznaki" :
        (selectedCategory ? selectedCategory.name : "Angielski A1")
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
