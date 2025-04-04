import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface HeaderProps {
  gameMode: boolean;
  currentLevel: any;
  exitGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ gameMode, currentLevel, exitGame }) => {
  return (
    <div className="bg-gradient-to-r from-hindi-purple to-hindi-magenta p-5 text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Bot className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-xl">
          {gameMode && currentLevel 
            ? `Level ${currentLevel.id}: ${currentLevel.name}` 
            : "Hindi Learning Assistant"}
        </h3>
      </div>
      <div className="flex items-center gap-3">
        {gameMode && (
          <button 
            onClick={exitGame}
            className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
            title="Exit practice"
          >
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.div>
          </button>
        )}
        <motion.div 
          className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="h-4 w-4" />
          <span>{gameMode ? "Practice Mode" : "Gemini AI Powered"}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;