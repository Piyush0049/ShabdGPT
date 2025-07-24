import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Mic, MicOff, Volume2, Award, ChevronRight, Repeat, Check, Lock } from "lucide-react";
import axios from "axios";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  audioUrl?: string;
}

interface LearningLevel {
  id: number;
  name: string;
  description: string;
  challenges: Challenge[];
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface Challenge {
  id: number;
  type: 'word' | 'sentence' | 'paragraph';
  hindi: string;
  english: string;
  pronunciation?: string;
}

const fallbackResponses = [
  "नमस्ते! कैसे हो आप? (Hello! How are you?)",
  "शब्दशिक्षा में आपका स्वागत है! (Welcome to ShabdShiksha!)",
  "Hindi uses the Devanagari script.",
  "मैं आपकी मदद कर सकता हूँ। (I can help you.)",
  "Try practicing one phrase every day!",
  "The word 'नमस्ते' (namaste) means 'hello' in Hindi.",
  "Hindi is the 4th most spoken language in the world."
];

const learningLevels: LearningLevel[] = [
  {
    id: 1,
    name: "Basic Words",
    description: "Learn essential Hindi words",
    isUnlocked: true,
    isCompleted: false,
    challenges: [
      { id: 1, type: 'word', hindi: "नमस्ते", english: "Hello", pronunciation: "Namaste" },
      { id: 2, type: 'word', hindi: "धन्यवाद", english: "Thank you", pronunciation: "Dhanyavaad" },
      { id: 3, type: 'word', hindi: "हाँ", english: "Yes", pronunciation: "Haan" },
      { id: 4, type: 'word', hindi: "नहीं", english: "No", pronunciation: "Nahi" },
      { id: 5, type: 'word', hindi: "माफ़ कीजिए", english: "Sorry", pronunciation: "Maaf kijiye" },
    ]
  },
  {
    id: 2,
    name: "Simple Sentences",
    description: "Practice basic Hindi sentences",
    isUnlocked: false,
    isCompleted: false,
    challenges: [
      { id: 1, type: 'sentence', hindi: "आप कैसे हैं?", english: "How are you?", pronunciation: "Aap kaise hain?" },
      { id: 2, type: 'sentence', hindi: "मेरा नाम राहुल है।", english: "My name is Rahul.", pronunciation: "Mera naam Rahul hai." },
      { id: 3, type: 'sentence', hindi: "मुझे हिंदी सीखना है।", english: "I want to learn Hindi.", pronunciation: "Mujhe Hindi seekhna hai." },
    ]
  },
  {
    id: 3,
    name: "Paragraphs",
    description: "Master longer Hindi passages",
    isUnlocked: false,
    isCompleted: false,
    challenges: [
      { 
        id: 1, 
        type: 'paragraph', 
        hindi: "नमस्ते! मेरा नाम अमित है। मैं भारत से हूँ। मुझे हिंदी बोलना पसंद है। मैं एक छात्र हूँ और मैं विज्ञान पढ़ता हूँ।", 
        english: "Hello! My name is Amit. I am from India. I like speaking Hindi. I am a student and I study science.", 
        pronunciation: "Namaste! Mera naam Amit hai. Main Bharat se hoon. Mujhe Hindi bolna pasand hai. Main ek chhatra hoon aur main vigyan padhta hoon." 
      },
    ]
  }
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "नमस्ते! (Hello!) I'm your Hindi learning assistant. Would you like to practice with our learning levels or ask me a question?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [showLevels, setShowLevels] = useState(false);
  const [levels, setLevels] = useState<LearningLevel[]>(learningLevels);
  const [currentLevel, setCurrentLevel] = useState<LearningLevel | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [gameMode, setGameMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (e) => {
        setAudioChunks((chunks) => [...chunks, e.data]);
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        
        if (gameMode && currentLevel) {
          const challenge = currentLevel.challenges[currentChallengeIndex];
          handleGameResponse(challenge);
        } else {
          // Regular chat mode
          const userMessage: Message = {
            text: "🎤 Voice message",
            isUser: true,
            timestamp: new Date(),
            audioUrl: url
          };
          
          setMessages(prev => [...prev, userMessage]);
          
          // Simulate AI response to voice
          simulateAIResponse("I heard your voice message! In a real app, I would transcribe and respond to what you said.");
        }
      };
      
      recorder.start();
      setIsRecording(true);
      setAudioChunks([]);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access your microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const fetchAIResponse = async (userQuery: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful Hindi language learning assistant. Provide concise responses (under 100 words). When appropriate, include both Hindi text and English translations. Focus on helping users learn Hindi vocabulary, grammar, and cultural aspects."
            },
            {
              role: "user",
              content: userQuery
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.REACT_APP_OPENAI_API_KEY}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  };

  const simulateAIResponse = (text: string) => {
    // Add loading message
    const loadingMessage: Message = {
      text: "...",
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setIsTyping(true);
    
    // Simulate delay for typing
    setTimeout(() => {
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text,
          isUser: false,
          timestamp: new Date()
        }];
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Check for game commands
    if (input.toLowerCase().includes("practice") || input.toLowerCase().includes("level") || input.toLowerCase().includes("learn")) {
      setShowLevels(true);
      simulateAIResponse("Great! Here are our learning levels. Choose one to start practicing your Hindi skills.");
      return;
    }
    
    // Add loading message
    const loadingMessage: Message = {
      text: "...",
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await fetchAIResponse(input);
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        }];
      });
    } catch (error) {
      // If API fails, use fallback
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text: fallbackResponse,
          isUser: false,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const startLevel = (level: LearningLevel) => {
    if (!level.isUnlocked) {
      simulateAIResponse("You need to complete the previous level first!");
      return;
    }
    
    setCurrentLevel(level);
    setCurrentChallengeIndex(0);
    setGameMode(true);
    setShowLevels(false);
    
    const challenge = level.challenges[0];
    simulateAIResponse(`Let's practice ${level.name}! Try to pronounce: "${challenge.hindi}" (${challenge.english}). Click the microphone button and say it out loud.`);
  };

  const handleGameResponse = (challenge: Challenge) => {
    // In a real app, you would compare the speech recognition result with the expected phrase
    // For now, we'll simulate success with occasional "corrections"
    
    const isCorrect = Math.random() > 0.3; // 70% chance of being "correct"
    
    if (isCorrect) {
      simulateAIResponse(`Great job! Your pronunciation was good. "${challenge.hindi}" means "${challenge.english}".`);
    } else {
      simulateAIResponse(`Good try! The correct pronunciation is "${challenge.pronunciation}". Let's try again.`);
      return; // Don't advance to next challenge
    }
    
    // Move to next challenge or complete level
    if (currentLevel && currentChallengeIndex < currentLevel.challenges.length - 1) {
      setTimeout(() => {
        setCurrentChallengeIndex(prev => prev + 1);
        const nextChallenge = currentLevel.challenges[currentChallengeIndex + 1];
        simulateAIResponse(`Next, try to pronounce: "${nextChallenge.hindi}" (${nextChallenge.english})`);
      }, 2000);
    } else {
      // Level completed
      setTimeout(() => {
        if (currentLevel) {
          // Mark current level as completed
          setLevels(prev => prev.map(lvl => 
            lvl.id === currentLevel.id 
              ? { ...lvl, isCompleted: true } 
              : lvl
          ));
          
          // Unlock next level if exists
          if (currentLevel.id < levels.length) {
            setLevels(prev => prev.map(lvl => 
              lvl.id === currentLevel.id + 1 
                ? { ...lvl, isUnlocked: true } 
                : lvl
            ));
          }
          
          simulateAIResponse(`🎉 Congratulations! You've completed the "${currentLevel.name}" level! You can now move to the next level or practice more.`);
          setGameMode(false);
          setCurrentLevel(null);
          setShowLevels(true);
        }
      }, 2000);
    }
  };

  const exitGame = () => {
    setGameMode(false);
    setCurrentLevel(null);
    setShowLevels(false);
    simulateAIResponse("You've exited practice mode. Feel free to ask me any questions about Hindi or start practicing again!");
  };

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-hindi-purple to-hindi-magenta shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? 
            <X className="h-6 w-6 text-white" /> : 
            <MessageSquare className="h-6 w-6 text-white" />
          }
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-hindi-purple to-hindi-magenta p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-semibold text-lg">
                  {gameMode && currentLevel 
                    ? `Level ${currentLevel.id}: ${currentLevel.name}` 
                    : "Hindi Assistant"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {gameMode && (
                  <button 
                    onClick={exitGame}
                    className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors"
                    title="Exit practice"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                  <Sparkles className="h-3 w-3" />
                  <span>{gameMode ? "Practice Mode" : "AI Powered"}</span>
                </div>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
              {showLevels ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <h3 className="font-bold text-hindi-dark text-center mb-2">Learning Levels</h3>
                  
                  {levels.map((level) => (
                    <motion.div
                      key={level.id}
                      whileHover={level.isUnlocked ? { scale: 1.02 } : {}}
                      className={`p-4 rounded-lg border ${
                        level.isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : level.isUnlocked 
                            ? 'bg-white border-hindi-purple/30 cursor-pointer hover:shadow-md' 
                            : 'bg-gray-100 border-gray-200 opacity-70'
                      }`}
                      onClick={() => level.isUnlocked && startLevel(level)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            level.isCompleted 
                              ? 'bg-green-500 text-white' 
                              : level.isUnlocked 
                                ? 'bg-hindi-purple text-white' 
                                : 'bg-gray-300 text-white'
                          }`}>
                            {level.isCompleted ? (
                              <Check className="h-4 w-4" />
                            ) : level.isUnlocked ? (
                              <span>{level.id}</span>
                            ) : (
                              <Lock className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-hindi-dark">{level.name}</h4>
                            <p className="text-xs text-gray-600">{level.description}</p>
                          </div>
                        </div>
                        
                        {level.isUnlocked && !level.isCompleted && (
                          <ChevronRight className="h-5 w-5 text-hindi-purple" />
                        )}
                        
                        {level.isCompleted && (
                          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-xs text-green-700">
                            <Award className="h-3 w-3" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowLevels(false)}
                      className="text-hindi-purple text-sm hover:underline"
                    >
                      Back to chat
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!message.isUser && !message.isLoading && (
                        <div className="w-8 h-8 rounded-full bg-hindi-purple/10 flex items-center justify-center mr-2 mt-1">
                          <Bot className="h-4 w-4 text-hindi-purple" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                          message.isLoading 
                            ? "bg-gray-100 text-gray-500 rounded-tl-none flex items-center space-x-1" 
                            : message.isUser 
                              ? "bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white rounded-tr-none" 
                              : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            
                            {message.audioUrl && (
                              <div className="mt-2">
                                <button
                                  onClick={() => message.audioUrl && playAudio(message.audioUrl)}
                                  className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full hover:bg-white/30 transition-colors"
                                >
                                  <Volume2 className="h-3 w-3" />
                                  <span>Play recording</span>
                                </button>
                              </div>
                            )}
                            
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </>
                        )}
                      </div>
                      
                      {message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-hindi-magenta/10 flex items-center justify-center ml-2 mt-1">
                          <User className="h-4 w-4 text-hindi-magenta" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {gameMode && currentLevel && (
              <div className="bg-hindi-purple/5 p-3 border-t border-hindi-purple/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-hindi-dark">
                      Challenge {currentChallengeIndex + 1}/{currentLevel.challenges.length}
                    </p>
                    <p className="text-xs text-gray-600">
                      Say this phrase in Hindi
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-hindi-purple/10 text-hindi-purple"
                      onClick={() => {
                        const challenge = currentLevel.challenges[currentChallengeIndex];
                        simulateAIResponse(`Try to pronounce: "${challenge.hindi}" (${challenge.english})`);
                      }}
                    >
                      <Repeat className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-full ${
                        isRecording 
                          ? "bg-red-500 text-white animate-pulse" 
                          : "bg-hindi-purple text-white"
                      }`}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
            
            {!gameMode && !showLevels && (
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex gap-2 items-center">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about Hindi or type 'practice'..."
                    disabled={isTyping}
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-hindi-purple focus:border-hindi-purple text-gray-700"
                  />
                  
                  <motion.button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={isTyping}
                    className={`p-3 rounded-lg text-white ${
                      isRecording 
                        ? "bg-red-500 animate-pulse" 
                        : isTyping 
                          ? "bg-gray-300 cursor-not-allowed" 
                          : "bg-hindi-purple hover:shadow-md"
                    }`}
                    whileHover={!isTyping ? { scale: 1.05 } : {}}
                    whileTap={!isTyping ? { scale: 0.95 } : {}}
                  >
                    {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={isTyping || !input.trim()}
                    className={`p-3 rounded-lg text-white ${
                      isTyping || !input.trim() 
                        ? "bg-gray-300 cursor-not-allowed" 
                        : "bg-gradient-to-r from-hindi-purple to-hindi-magenta hover:shadow-md"
                    }`}
                    whileHover={!isTyping && input.trim() ? { scale: 1.05 } : {}}
                    whileTap={!isTyping && input.trim() ? { scale: 0.95 } : {}}
                  >
                    {isTyping ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </motion.button>
                </div>
                
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-500">
                    Type "practice" to start learning levels or ask any Hindi question
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
