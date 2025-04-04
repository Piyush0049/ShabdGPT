import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface GameModeProps {
  currentLevel: any;
  currentChallengeIndex: number;
  exitGame: () => void;
}

const GameMode: React.FC<GameModeProps> = ({ 
  currentLevel, 
  currentChallengeIndex,
  exitGame
}) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-medium text-hindi-purple">{currentLevel.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Challenge <span className="font-medium">{currentChallengeIndex + 1}</span> of <span className="font-medium">{currentLevel.challenges.length}</span></span>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={exitGame}
        className="self-end text-xs text-gray-500 hover:text-hindi-purple flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
      >
        <Award className="h-3 w-3" />
        <span>Exit Practice</span>
      </motion.button>
    </div>
  );
};

export default GameMode;