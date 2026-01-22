
import React, { useState, useMemo } from 'react';
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
    <div className="flex flex-col h-full space-y-6 pt-4 animate-in slide-in-from-right duration-300">
      <div className="bg-white h-4 rounded-full p-1 shadow-inner border border-gray-100 overflow-hidden">
        <div 
          className="bg-green-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / words.length) * 100}%` }}
        />
      </div>

      <div className="text-center space-y-4 py-6">
        <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Zadanie {currentQuestion + 1} / {words.length}
        </span>
        <div className="space-y-2">
          <p className="text-gray-400 font-medium">Jak po polsku powiesz:</p>
          <h2 className="text-5xl font-black text-gray-800 tracking-tight uppercase">
            {word.english}
          </h2>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-3">
        {options.map((option, idx) => {
          let stateStyles = "bg-white border-2 border-gray-100 text-gray-700 shadow-sm";
          
          if (isAnswered) {
            if (option === word.polish) {
              stateStyles = "bg-green-500 border-green-600 text-white shadow-green-200 scale-[1.02]";
            } else if (option === selectedOption) {
              stateStyles = "bg-red-500 border-red-600 text-white opacity-90";
            } else {
              stateStyles = "bg-white border-gray-50 text-gray-300 opacity-40 scale-95";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionClick(option)}
              className={`p-6 rounded-[2rem] text-xl font-bold transition-all duration-300 ${stateStyles} active:scale-95`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="h-20 flex items-center">
        {isAnswered && (
          <button 
            onClick={handleNext}
            className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-xl hover:bg-blue-700 transition-all animate-in fade-in slide-in-from-bottom-4"
          >
            {currentQuestion === words.length - 1 ? 'Sprawdź wynik! 📊' : 'Super! Dalej 🚀'}
          </button>
        )}
      </div>
    </div>
  );
};
