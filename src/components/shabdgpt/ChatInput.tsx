import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, MicOff, Loader2, BookOpen } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  gameMode: boolean;
  setShowLevels: (show: boolean) => void;
  currentLevel: any;
  currentChallengeIndex: number;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  isTyping,
  isRecording,
  startRecording,
  stopRecording,
  gameMode,
  setShowLevels,
  currentLevel,
  currentChallengeIndex
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-5 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-3.5 rounded-full ${
            isRecording 
              ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-200" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors shadow-sm`}
          title={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </motion.button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full p-3.5 pr-12 rounded-full border border-gray-200 focus:border-hindi-purple focus:ring-2 focus:ring-hindi-purple/20 outline-none transition-all shadow-sm"
            ref={inputRef}
            disabled={isTyping}
          />
          
          {!gameMode && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLevels(true)}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-hindi-purple transition-colors"
              title="Show learning levels"
            >
              <BookOpen className="h-5 w-5" />
            </motion.button>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          disabled={!input.trim() || isTyping}
          className={`p-3.5 rounded-full ${
            !input.trim() || isTyping
              ? "bg-gray-100 text-gray-400"
              : "bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white hover:shadow-md"
          } transition-all shadow-sm`}
          title="Send message"
        >
          {isTyping ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </motion.button>
      </div>
      
      {gameMode && currentLevel && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
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
      )}
    </div>
  );
};

export default ChatInput;