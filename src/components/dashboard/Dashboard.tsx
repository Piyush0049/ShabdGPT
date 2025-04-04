import React from 'react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const user = {
    name: "Aryan",
    progress: {
      streak: 5,
      xp: 250,
      level: 3,
    },
  };

  const randomPhrases = [
    { hindi: "नमस्ते", transliteration: "Namaste", english: "Hello" },
    { hindi: "धन्यवाद", transliteration: "Dhanyavaad", english: "Thank you" },
    { hindi: "कैसे हो?", transliteration: "Kaise ho?", english: "How are you?" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-hindi-dark">
                नमस्ते, <span className="text-hindi-magenta">{user.name}</span>!
              </h1>
              <p className="text-gray-600 mt-2">Ready to continue your Hindi learning journey today?</p>
            </div>
            <motion.div 
              className="mt-4 md:mt-0 bg-gradient-to-r from-hindi-purple to-hindi-magenta px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Today's Lesson
            </motion.div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-orange-100 p-3 rounded-full">
                  <span className="text-2xl">🔥</span>
                </div>
                <span className="text-3xl font-bold text-orange-500">{user.progress.streak}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">Day Streak</h3>
              <p className="text-gray-600 mt-1">Keep learning daily to maintain your streak!</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-r from-hindi-purple to-hindi-magenta h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-purple-100 p-3 rounded-full">
                  <span className="text-2xl">🏆</span>
                </div>
                <span className="text-3xl font-bold text-hindi-magenta">{user.progress.xp}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">XP Points</h3>
              <p className="text-gray-600 mt-1">You're making excellent progress!</p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 p-3 rounded-full">
                  <span className="text-2xl">📖</span>
                </div>
                <span className="text-3xl font-bold text-blue-500">{user.progress.level}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-4">Current Level</h3>
              <p className="text-gray-600 mt-1">Hindi Explorer</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-hindi-pink/10 p-3 rounded-full mr-4">
              <span className="text-2xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-hindi-dark">Hindi Phrases of the Day</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {randomPhrases.map((phrase, idx) => (
              <motion.div 
                key={idx} 
                className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-2xl font-bold text-hindi-dark mb-2">{phrase.hindi}</p>
                <p className="text-gray-500 italic mb-1">{phrase.transliteration}</p>
                <p className="text-gray-700 font-medium">{phrase.english}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
