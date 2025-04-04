import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, BookOpen, Mic, Award } from "lucide-react";
import { Link } from "react-router-dom";

const ShabdGPTSummary: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="bg-gradient-to-r from-hindi-purple to-hindi-magenta p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-xl">शब्द GPT</h3>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Gemini AI Powered</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-bold text-hindi-dark text-lg mb-3">Interactive Hindi Learning Assistant</h4>
        <p className="text-gray-600 mb-4">
          Practice Hindi with our AI-powered assistant that helps you learn through conversation and structured lessons.
        </p>

        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-hindi-purple/10 flex items-center justify-center">
              <Mic className="h-4 w-4 text-hindi-purple" />
            </div>
            <span>Voice recognition for pronunciation practice</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-hindi-purple/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-hindi-purple" />
            </div>
            <span>Structured learning levels from basic to advanced</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-hindi-purple/10 flex items-center justify-center">
              <Award className="h-4 w-4 text-hindi-purple" />
            </div>
            <span>Track your progress and unlock new challenges</span>
          </div>
        </div>

        <Link to="/shabdgpt">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all"
          >
            Start Learning Hindi
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ShabdGPTSummary;