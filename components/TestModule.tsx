
import React, { useState, useEffect, useMemo } from 'react';
import { Word } from '../types';

interface TestModuleProps {
  words: Word[];
  onFinish: (score: number) => void;
}

export const TestModule: React.FC<TestModuleProps> = ({ words, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const word = words[currentQuestion];

  // Generate 4 options (1 correct, 3 random wrong)
  const options = useMemo(() => {
    const correct = word.polish;
    const others = words
      .filter(w => w.polish !== correct)
      .map(w => w.polish)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [correct, ...others].sort(() => 0.5 - Math.random());
  }, [word, words]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === word.polish) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < words.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
       <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / words.length) * 100}%` }}
        />
      </div>

      <div className="text-center py-4">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Pytanie {currentQuestion + 1} z {words.length}</span>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Co oznacza: <span className="text-blue-600">"{word.english}"</span>?</h2>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-4">
        {options.map((option, idx) => {
          let bgColor = "bg-white border-2 border-gray-100 hover:border-blue-200";
          if (isAnswered) {
            if (option === word.polish) bgColor = "bg-green-100 border-2 border-green-500 text-green-700";
            else if (option === selectedOption) bgColor = "bg-red-100 border-2 border-red-500 text-red-700";
            else bgColor = "bg-white border-2 border-gray-50 opacity-50";
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(option)}
              className={`p-6 rounded-3xl text-xl font-medium transition-all ${bgColor} shadow-sm active:scale-95`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-blue-600 text-white rounded-3xl font-bold text-xl shadow-lg hover:bg-blue-700 transition-colors animate-bounce mt-4"
        >
          {currentQuestion === words.length - 1 ? 'Pokaż wynik!' : 'Dalej! 🚀'}
        </button>
      )}
    </div>
  );
};
