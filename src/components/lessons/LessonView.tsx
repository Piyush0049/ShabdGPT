import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, CheckCircle, Book } from 'lucide-react';

interface Exercise {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Lesson {
  id: string;
  title: string;
  introduction: string;
  exercises: Exercise[];
  level: string;
  xpReward: number;
}

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Basic Hindi Greetings",
    introduction: "Learn common Hindi greetings and how to use them in daily conversations.",
    exercises: [
      {
        question: "How do you say 'Hello' in Hindi?",
        options: ["Namaste", "Shukriya", "Alvida", "Kya Haal Hai"],
        correctAnswer: "Namaste",
      },
    ],
    level: "Beginner",
    xpReward: 50,
  },
];

const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showExercises, setShowExercises] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const foundLesson = lessons.find((l) => l.id === lessonId);
    if (foundLesson) setLesson(foundLesson);
    else navigate('/not-found');
  }, [lessonId, navigate]);

  if (!lesson) return <div className="text-center text-xl p-8">Loading lesson...</div>;

  const handleStartExercises = () => {
    setShowExercises(true);
    setCurrentExerciseIndex(0);
  };

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800">
          <ArrowLeft size={20} /> Back
        </button>
        <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <Home size={18} /> Dashboard
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-gray-700 mb-4">{lesson.introduction}</p>
      {!showExercises ? (
        <button
          onClick={handleStartExercises}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Exercises
        </button>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-3">{lesson.exercises[currentExerciseIndex].question}</h2>
          {lesson.exercises[currentExerciseIndex].options.map((option, idx) => (
            <button
              key={idx}
              className="block w-full p-3 border rounded-lg mb-2 hover:bg-gray-100"
              onClick={() => handleExerciseComplete(option === lesson.exercises[currentExerciseIndex].correctAnswer)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 rounded-md bg-green-100 text-green-800"
        >
          <CheckCircle size={20} className="inline-block mr-2" />
          Lesson Completed! You earned {lesson.xpReward} XP!
        </motion.div>
      )}
    </div>
  );
};

export default LessonView;
