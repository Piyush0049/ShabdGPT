import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock, BookOpen, Zap, Award, ChevronRight } from "lucide-react";
import { LearningLevel } from "../../types/shabdgpt";

interface LearningLevelsProps {
  levels: LearningLevel[];
  startLevel: (level: LearningLevel) => void;
  setShowLevels: (show: boolean) => void;
}

const LearningLevels: React.FC<LearningLevelsProps> = ({ levels, startLevel, setShowLevels }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-hindi-dark text-2xl">Learning Levels</h3>
        <button
          onClick={() => setShowLevels(false)}
          className="flex items-center gap-1 text-hindi-purple hover:text-hindi-magenta transition-colors px-3 py-1.5 rounded-full border border-hindi-purple/30 hover:bg-hindi-purple/5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to chat</span>
        </button>
      </div>
      
      {levels.map((level) => (
        <motion.div
          key={level.id}
          whileHover={level.isUnlocked ? { scale: 1.02, y: -2 } : {}}
          className={`p-5 rounded-xl border ${
            level.isCompleted 
              ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
              : level.isUnlocked 
                ? 'bg-white border-hindi-purple/30 cursor-pointer hover:shadow-lg transition-all duration-300' 
                : 'bg-gray-100 border-gray-200 opacity-70'
          }`}
          onClick={() => level.isUnlocked && startLevel(level)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                level.isCompleted 
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                  : level.isUnlocked 
                    ? 'bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white' 
                    : 'bg-gray-300 text-white'
              }`}>
                {level.isCompleted ? (
                  <Check className="h-7 w-7" />
                ) : level.isUnlocked ? (
                  level.id === 1 ? <BookOpen className="h-6 w-6" /> :
                  level.id === 2 ? <Zap className="h-6 w-6" /> :
                  <span className="text-xl font-bold">{level.id}</span>
                ) : (
                  <Lock className="h-6 w-6" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-lg text-hindi-dark">{level.name}</h4>
                <p className="text-sm text-gray-600">{level.description}</p>
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <span>{level.challenges.length} challenges</span>
                </div>
              </div>
            </div>
            
            {level.isUnlocked && !level.isCompleted && (
              <div className="bg-hindi-purple/10 p-2.5 rounded-full">
                <ChevronRight className="h-5 w-5 text-hindi-purple" />
              </div>
            )}
            
            {level.isCompleted && (
              <div className="flex items-center gap-1 bg-green-100 px-4 py-2 rounded-full text-sm text-green-700 font-medium">
                <Award className="h-4 w-4" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LearningLevels;