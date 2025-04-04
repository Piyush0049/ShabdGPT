import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';

interface Exercise {
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

interface ExerciseViewProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean) => void;
  currentIndex: number;
  totalExercises: number;
}

const ExerciseView: React.FC<ExerciseViewProps> = ({ 
  exercise, 
  onComplete, 
  currentIndex, 
  totalExercises 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleOptionSelect = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };
  
  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    const correct = selectedOption === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    
    setTimeout(() => {
      onComplete(correct);
      setIsAnswered(false);
      setSelectedOption(null);
      setShowHint(false);
    }, 1500);
  };
  
  const progressPercentage = ((currentIndex + 1) / totalExercises) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Exercise {currentIndex + 1} of {totalExercises}</span>
          {exercise.hint && (
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <HelpCircle size={18} /> Hint
            </button>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      
      <AnimatePresence>
        {showHint && exercise.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-100 p-3 rounded-md mb-4 text-sm text-blue-800"
          >
            <div className="flex items-start gap-2">
              <HelpCircle size={16} className="text-blue-600" />
              <span>{exercise.hint}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{exercise.question}</h3>
      
      <div className="space-y-3">
        {exercise.options.map((option, idx) => (
          <div
            key={idx}
            className={`p-3 border rounded-lg flex justify-between items-center cursor-pointer transition-all duration-200 ${
              selectedOption === option ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-500'
            } ${
              isAnswered && option === exercise.correctAnswer ? 'border-green-600 bg-green-50' : ''
            } ${
              isAnswered && selectedOption === option && option !== exercise.correctAnswer ? 'border-red-600 bg-red-50' : ''
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <div>{option}</div>
            {isAnswered && option === exercise.correctAnswer && (
              <Check size={16} className="text-green-600" />
            )}
            {isAnswered && selectedOption === option && option !== exercise.correctAnswer && (
              <X size={16} className="text-red-600" />
            )}
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {isAnswered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 p-4 rounded-md text-white flex items-center gap-3 ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {isCorrect ? <Check size={20} /> : <X size={20} />}
            <span>{isCorrect ? 'Correct! Well done!' : `Incorrect. The correct answer is "${exercise.correctAnswer}"`}</span>
          </motion.div>
        ) : (
          <button
            className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleCheckAnswer}
            disabled={!selectedOption}
          >
            Check Answer
          </button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExerciseView;
