import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Quote, BookOpen, Share2, Heart } from "lucide-react";
import Chatbot from "@/components/chatbot/Chatbot";

interface Thought {
  hindi: string;
  english: string;
  author: string;
}

const thoughts: Thought[] = [
  {
    hindi: "सबसे बड़ी विजय अपने आप पर विजय है।",
    english: "The greatest victory is the victory over oneself.",
    author: "Mahatma Gandhi",
  },
  {
    hindi: "अभ्यास के बिना ज्ञान अधूरा है।",
    english: "Knowledge without practice is incomplete.",
    author: "Indian Proverb",
  },
  {
    hindi: "जब तक जीवन है, तब तक आशा है।",
    english: "Where there is life, there is hope.",
    author: "Hindi Saying",
  },
  {
    hindi: "हर दिन एक नई शुरुआत है।",
    english: "Every day is a new beginning.",
    author: "Sanskrit Wisdom",
  },
  {
    hindi: "धैर्य सबसे बड़ा गुण है।",
    english: "Patience is the greatest virtue.",
    author: "Ancient Indian Wisdom",
  },
];

const ThoughtOfTheDay: React.FC = () => {
  const [thought, setThought] = useState<Thought | null>(null);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * thoughts.length);
    setThought(thoughts[randomIndex]);
  }, []);

  if (!thought) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-hindi-purple/20 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-hindi-purple/20 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-hindi-purple/20 rounded"></div>
            <div className="h-4 bg-hindi-purple/20 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-hindi-purple"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-hindi-dark ml-4">Thought of the Day</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="bg-white p-8 md:p-10 shadow-xl rounded-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 text-hindi-purple">
                <Quote size={180} />
              </div>
              
              <div className="relative z-10">
                <div className="mb-10 text-center">
                  <motion.p 
                    className="text-4xl md:text-5xl font-bold mb-6 text-hindi-dark leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {thought.hindi}
                  </motion.p>
                  
                  <motion.p 
                    className="text-xl md:text-2xl italic text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {thought.english}
                  </motion.p>
                </div>

                <motion.div 
                  className="flex justify-center items-center pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="bg-hindi-purple/10 px-6 py-2 rounded-full">
                    <p className="text-hindi-purple font-medium">— {thought.author}</p>
                  </div>
                </motion.div>
                
                <div className="mt-8 flex justify-center space-x-4">
                  <motion.button 
                    className={`p-3 rounded-full ${liked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-500'} hover:shadow-md transition-all`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart className={`h-5 w-5 ${liked ? 'fill-pink-600' : ''}`} />
                  </motion.button>
                  
                  <motion.button 
                    className="p-3 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 h-full">
              <div className="flex items-center mb-4">
                <div className="bg-hindi-magenta/10 p-2 rounded-full mr-3">
                  <BookOpen className="h-5 w-5 text-hindi-magenta" />
                </div>
                <h3 className="font-bold text-hindi-dark text-lg">Learning Notes</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-hindi-purple/5 rounded-xl">
                  <h4 className="font-medium text-hindi-purple mb-2">Pronunciation Tip</h4>
                  <p className="text-gray-700">
                    Try reading the Hindi version aloud to practice your pronunciation. Pay attention to each syllable.
                  </p>
                </div>
                
                <div className="p-4 bg-hindi-magenta/5 rounded-xl">
                  <h4 className="font-medium text-hindi-magenta mb-2">Cultural Context</h4>
                  <p className="text-gray-700">
                    This saying reflects the importance of wisdom in Indian philosophy and daily life.
                  </p>
                </div>
                
                <div className="p-4 bg-hindi-pink/5 rounded-xl">
                  <h4 className="font-medium text-hindi-pink mb-2">Grammar Note</h4>
                  <p className="text-gray-700">
                    Notice the sentence structure and how it differs from English. This helps understand Hindi syntax.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
};

export default ThoughtOfTheDay;
