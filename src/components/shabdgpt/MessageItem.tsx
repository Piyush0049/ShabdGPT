import React from "react";
import { motion } from "framer-motion";
import { Bot, User, Volume2, Loader2 } from "lucide-react";
import { Message } from "../../types/shabdgpt";

interface MessageItemProps {
  message: Message;
  playAudio: (url: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, playAudio }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
    >
      {!message.isUser && !message.isLoading && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 flex items-center justify-center mr-3 mt-1 shadow-sm">
          <Bot className="h-5 w-5 text-hindi-purple" />
        </div>
      )}
      
      <div
        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
          message.isLoading 
            ? "bg-gray-100 text-gray-500 rounded-tl-none flex items-center space-x-1" 
            : message.isUser 
              ? "bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white rounded-tr-none" 
              : "bg-white border border-gray-100 rounded-tl-none"
        }`}
      >
        {message.isLoading ? (
          <>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </>
        ) : (
          <div>
            <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
            
            {message.audioUrl && (
              <div className="mt-2">
                <button
                  onClick={() => message.audioUrl && playAudio(message.audioUrl)}
                  className="flex items-center gap-1 text-xs bg-white/20 px-2.5 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Play Audio</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {message.isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple to-hindi-magenta flex items-center justify-center ml-3 mt-1 shadow-sm">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageItem;