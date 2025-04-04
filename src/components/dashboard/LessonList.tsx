import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock, BookOpen, Award } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  level: number;
}

interface LessonListProps {
  completedLessons: string[];
}

const hindiLessons: Lesson[] = [
  { id: '1', title: 'Basics of Hindi', description: 'Learn basic words and phrases.', xpReward: 10, level: 1 },
  { id: '2', title: 'Common Greetings', description: 'Learn how to greet people in Hindi.', xpReward: 15, level: 2 },
  { id: '3', title: 'Numbers in Hindi', description: 'Learn counting from 1 to 20.', xpReward: 20, level: 3 },
];

const LessonList: React.FC<LessonListProps> = ({ completedLessons }) => {
  const navigate = useNavigate();

  const handleLessonClick = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-hindi-dark mb-6 px-4">Your Learning Path</h2>
      
      <div className="relative">
        {/* Progress path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 z-0 md:left-[80px]"></div>
        
        {hindiLessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isLocked = index > 0 && !completedLessons.includes(hindiLessons[index - 1].id);
          const isActive = !isCompleted && !isLocked;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="mb-8 relative z-10"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 px-4">
                {/* Status circle */}
                <motion.div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md z-10 ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-green-400 to-green-600' 
                      : isLocked 
                        ? 'bg-gray-300' 
                        : 'bg-gradient-to-br from-hindi-purple to-hindi-magenta'
                  }`}
                  whileHover={!isLocked ? { scale: 1.1 } : {}}
                >
                  {isCompleted ? (
                    <Check size={28} className="text-white" />
                  ) : isLocked ? (
                    <Lock size={24} className="text-white" />
                  ) : (
                    <BookOpen size={24} className="text-white" />
                  )}
                </motion.div>

                {/* Lesson card */}
                <motion.div
                  className={`flex-1 rounded-xl shadow-md overflow-hidden transition-all ${
                    isLocked 
                      ? 'bg-gray-100 opacity-70' 
                      : 'bg-white hover:shadow-xl cursor-pointer'
                  }`}
                  whileHover={!isLocked ? { scale: 1.02, y: -5 } : {}}
                  onClick={() => !isLocked && handleLessonClick(lesson.id)}
                >
                  <div className={`h-2 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-400 to-green-600' 
                      : isActive 
                        ? 'bg-gradient-to-r from-hindi-purple to-hindi-magenta' 
                        : 'bg-gray-300'
                  }`}></div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-gray-500' : 'text-hindi-dark'}`}>
                          {lesson.title}
                        </h3>
                        <p className={`text-sm mb-4 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {lesson.description}
                        </p>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-hindi-purple rounded-full text-sm font-medium">
                            <Award size={16} />
                            <span>XP {lesson.xpReward}</span>
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1.5 bg-pink-50 text-hindi-magenta rounded-full text-sm font-medium">
                            <span>Level {lesson.level}</span>
                          </div>
                        </div>
                      </div>

                      {!isLocked && (
                        <motion.div
                          className={`rounded-full p-3 ${
                            isCompleted ? 'bg-green-100 text-green-600' : 'bg-hindi-purple/10 text-hindi-purple'
                          }`}
                          whileHover={{ rotate: isCompleted ? 0 : 15 }}
                        >
                          {isCompleted ? (
                            <Check size={20} />
                          ) : (
                            <ArrowRight size={20} />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonList;
