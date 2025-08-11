import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2, Mic, MicOff, Volume2, Award, ChevronRight, Repeat, Check, Lock, ArrowLeft, BookOpen, Zap, VolumeX } from "lucide-react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { GoogleGenAI } from "@google/genai";

import { Message, LearningLevel, learningLevels, Challenge } from "./LearningLevels";

const ShabdGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "नमस्ते! (Hello!) I'm your Hindi learning assistant. Would you like to practice with our learning levels or ask me a question about Hindi language?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [showLevels, setShowLevels] = useState(false);
  const [levels, setLevels] = useState<LearningLevel[]>(learningLevels);
  const [currentLevel, setCurrentLevel] = useState<LearningLevel | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [gameMode, setGameMode] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState("");
  const audioChunksRef = useRef<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const API_KEY = import.meta.env.VITE_ASSEMBLYAI_API_KEY;

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'hi-IN';

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript;
        }
        if (finalTranscript) setTranscript(finalTranscript);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGameResponseWithTranscript = (challenge: Challenge, transcript: string) => {
    const similarity = calculateSimilarity(transcript.toLowerCase(), challenge.pronunciation?.toLowerCase() || '');
    const isCorrect = similarity > 0.6;

    if (isCorrect) {
      simulateAIResponse(`Great job! Your pronunciation was good. I heard: "${transcript}". The phrase "${challenge.hindi}" means "${challenge.english}".`);
    } else {
      simulateAIResponse(`Good try! I heard: "${transcript}". The correct pronunciation is "${challenge.pronunciation}". Let's try again.`);
      return;
    }

    if (currentLevel && currentChallengeIndex < currentLevel.challenges.length - 1) {
      setTimeout(() => {
        setCurrentChallengeIndex(prev => prev + 1);
        const nextChallenge = currentLevel.challenges[currentChallengeIndex + 1];
        simulateAIResponse(`Next, try to pronounce: "${nextChallenge.hindi}" (${nextChallenge.english})`);
      }, 2000);
    } else {
      setTimeout(() => {
        if (currentLevel) {
          setLevels(prev => prev.map(lvl =>
            lvl.id === currentLevel.id
              ? { ...lvl, isCompleted: true }
              : lvl
          ));

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

  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');

    let matches = 0;
    for (const word1 of words1) {
      if (words2.some(word2 => word2.includes(word1) || word1.includes(word2))) {
        matches++;
      }
    }

    return matches / Math.max(words1.length, words2.length);
  };

  async function uploadAudio(blob: Blob): Promise<string> {
    try {
      setTranscriptionProgress(20);
      const response = await axios({
        method: "post",
        url: "https://api.assemblyai.com/v2/upload",
        headers: {
          authorization: API_KEY,
          "content-type": "application/octet-stream",
        },
        data: blob,
      });
      setTranscriptionProgress(40);
      return response.data.upload_url;
    } catch (error) {
      console.error("Error uploading audio:", error);
      setTranscriptionError("Failed to upload audio");
      throw error;
    }
  }

  async function transcribeAudio(fileUrl: string): Promise<string> {
    try {
      setTranscriptionProgress(50);
      const transcriptResponse = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        {
          audio_url: fileUrl,
          language_code: "hi"
        },
        {
          headers: {
            authorization: API_KEY,
            "content-type": "application/json",
          },
        }
      );

      const transcriptId = transcriptResponse.data.id;
      let transcriptData: any = null;
      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        const pollingResponse = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: { authorization: API_KEY },
          }
        );

        transcriptData = pollingResponse.data;
        setTranscriptionProgress(50 + Math.min(40, attempts * 2));

        if (transcriptData.status === "completed") {
          break;
        } else if (transcriptData.status === "error") {
          throw new Error("Transcription error: " + transcriptData.error);
        }

        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setTranscriptionProgress(100);
      return transcriptData.text || "";
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscriptionError("Failed to transcribe audio");
      throw error;
    }
  }

  const startRecording = async () => {
    try {
      setTranscriptionError(null);
      setTranscriptionProgress(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      setMediaRecorder(recorder);

      // Reset audio chunks at the start of recording
      audioChunksRef.current = [];

      setIsRecording(true);

      if (recognition) {
        recognition.start();
      }

      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        // Create a local copy of the chunks to process
        const currentAudioChunks = [...audioChunksRef.current];

        // Clear the ref immediately to prevent reuse
        audioChunksRef.current = [];

        const audioBlob = new Blob(currentAudioChunks, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        try {
          setIsTranscribing(true);

          const userMessage: Message = {
            text: "🎤 Recording...",
            isUser: true,
            timestamp: new Date(),
            audioUrl: url,
            isLoading: true
          };
          setMessages(prev => [...prev, userMessage]);

          const uploadedUrl = await uploadAudio(audioBlob);
          const transcriptText = await transcribeAudio(uploadedUrl);

          setMessages(prev => prev.map(msg =>
            msg.isLoading ? {
              ...msg,
              text: `🎤 "${transcriptText}"`,
              isLoading: false
            } : msg
          ));

          if (gameMode && currentLevel) {
            const challenge = currentLevel.challenges[currentChallengeIndex];
            handleGameResponseWithTranscript(challenge, transcriptText);
          } else {
            processWithAI(transcriptText);
          }
        } catch (error) {
          setMessages(prev => prev.map(msg =>
            msg.isLoading ? {
              ...msg,
              text: "🎤 Voice message (transcription failed)",
              isLoading: false
            } : msg
          ));

          simulateAIResponse("I couldn't transcribe your voice message. Please try again or type your message instead.");
        } finally {
          setIsTranscribing(false);
          setTranscriptionProgress(0);
        }
      };

      recorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access your microphone. Please check permissions.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      if (recognition) recognition.stop();
      setIsRecording(false);

      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processWithAI = async (text: string) => {
    const loadingMessage: Message = {
      text: "...",
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await fetchAIResponse(text);
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        }];
      });
    } catch (error) {
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

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const fallbackResponses = [
    "नमस्ते! कैसे हो आप? (Hello! How are you?)",
    "शब्दशिक्षा में आपका स्वागत है! (Welcome to ShabdShiksha!)",
    "Hindi uses the Devanagari script.",
    "मैं आपकी मदद कर सकता हूँ। (I can help you.)",
    "Try practicing one phrase every day!"
  ];

  async function fetchAIResponse(userQuery: string): Promise<string> {
  try {
    const prompt = `You are a helpful Hindi language learning assistant. Provide concise responses (under 100 words) in plain text only — no markdown, no bullet points, no asterisks. Include both Hindi text and English translations where relevant.\n\n${userQuery}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, I couldn't generate a response.";

    text = text
      .replace(/\*\*(.*?)\*\*/g, "$1") 
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^\s*[\*\-]\s*/gm, "")
      .trim();

    return text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}



  const simulateAIResponse = (text: string) => {
    const loadingMessage: Message = {
      text: "...",
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);
    setIsTyping(true);

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

    if (input.toLowerCase().includes("practice") || input.toLowerCase().includes("level") || input.toLowerCase().includes("learn") || input.toLowerCase().includes("game")) {
      setShowLevels(true);
      simulateAIResponse("Great! Here are our learning levels. Choose one to start practicing your Hindi skills.");
      return;
    }

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

      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        }];
      });
    } catch (error) {
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

useEffect(() => {
  if ('speechSynthesis' in window) {
    // Load voices
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };

    // Stop speaking on refresh or tab close
    const handleBeforeUnload = () => {
      window.speechSynthesis.cancel();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup for component unmount
    return () => {
      window.speechSynthesis.cancel();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }
}, []);



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

  const exitGame = () => {
    setGameMode(false);
    setCurrentLevel(null);
    setShowLevels(false);
    simulateAIResponse("You've exited practice mode. Feel free to ask me any questions about Hindi or start practicing again!");
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hindi-purple/5 via-white to-hindi-magenta/5">
      <Helmet>
        <title>ShabdGPT - Interactive Hindi Learning Assistant</title>
        <meta name="description" content="Learn Hindi with our AI-powered assistant and interactive games" />
      </Helmet>

      <div className="container mx-auto px-0 sm:px-4 py-8 max-w-5xl">

        <motion.div
          className="mx-auto bg-white rounded-sm sm:rounded-xl shadow-sm overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-hindi-purple to-hindi-magenta p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-xl">
                {gameMode && currentLevel
                  ? `Level ${currentLevel.id}: ${currentLevel.name}`
                  : "ShabdGPT Assistant"}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {gameMode && (
                <button
                  onClick={exitGame}
                  className="bg-white/20 p-2 hidden sm:block rounded-full hover:bg-white/30 transition-colors"
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
              {!gameMode && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setGameMode(true); setShowLevels(true) }}
                  className="  text-white hover:text-purple-200 transition-colors"
                  title="Show learning levels"
                >
                  <BookOpen className="h-5 w-5" />
                </motion.button>
              )}
              <motion.div
                className="hidden sm:flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-4 w-4" />
                <span>{gameMode ? "Practice Mode" : "Gemini AI Powered"}</span>
              </motion.div>
            </div>
          </div>

          <div className="h-[65vh] overflow-y-auto p-6 flex flex-col gap-4 bg-gradient-to-b from-gray-50 to-white">
            <AnimatePresence mode="wait">
              {showLevels ? (
                <motion.div
                  key="levels"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-hindi-dark text-2xl">Learning Levels</h3>
                    <button
                      onClick={() => { setShowLevels(false); setGameMode(false) }}
                      className="flex items-center gap-1 text-hindi-purple hover:text-hindi-magenta transition-colors px-3 py-1.5 rounded-full border border-hindi-purple/30 hover:bg-hindi-purple/5"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to chat</span>
                    </button>
                  </div>

                  {levels.map((level) => (
                    <motion.div
                      key={level.id}
                      whileHover={level.isUnlocked ? { scale: 1.02, y: -2 } : {}}
                      className={`p-5 rounded-xl border ${level.isCompleted
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
                        : level.isUnlocked
                          ? 'bg-white border-hindi-purple/30 cursor-pointer hover:shadow-lg transition-all duration-300'
                          : 'bg-gray-100 border-gray-200 opacity-70'
                        }`}
                      onClick={() => level.isUnlocked && startLevel(level)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${level.isCompleted
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                            : level.isUnlocked
                              ? 'bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white'
                              : 'bg-gray-300 text-white'
                            }`}>
                            {level.isCompleted ? (
                              <Check className="h-7 w-7" />
                            ) : level.isUnlocked ? (
                              level.id === 1 ? <BookOpen className="h-6 w-6" /> :
                                level.id === 2 ? <Zap className="h-6 w-6" /> :
                                  <span className="text-xl font-bold">{level.id}</span>
                            ) : (
                              <Lock className="h-6 w-6" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg text-hindi-dark">{level.name}</h4>
                            <p className="text-sm text-gray-600">{level.description}</p>
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                              </svg>
                              <span>{level.challenges.length} challenges</span>
                            </div>
                          </div>
                        </div>

                        {level.isUnlocked && !level.isCompleted && (
                          <div className="bg-hindi-purple/10 p-2.5 rounded-full">
                            <ChevronRight className="h-5 w-5 text-hindi-purple" />
                          </div>
                        )}

                        {level.isCompleted && (
                          <div className="flex items-center gap-1 bg-green-100 px-4 py-2 rounded-full text-sm text-green-700 font-medium">
                            <Award className="h-4 w-4" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!message.isUser && !message.isLoading && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 hidden sm:flex items-center justify-center mr-3 mt-1 shadow-sm">
                          <Bot className="h-5 w-5 text-hindi-purple" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${message.isLoading
                          ? "bg-gray-100 text-gray-500 rounded-tl-none flex items-center space-x-1"
                          : message.isUser
                            ? "bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white rounded-tr-none"
                            : "bg-white border border-gray-100 rounded-tl-none"
                          }`}
                      >
                        {message.isLoading ? (
                          message.isUser && message.text.includes("Recording") ? (
                            <div className="flex flex-col w-full">
                              <div className="text-sm">{message.text}</div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div
                                  className="bg-hindi-purple h-1.5 rounded-full"
                                  style={{ width: `${transcriptionProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </>
                          )
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

                            {/* Add speak button for bot messages */}
                            {!message.isUser && (
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => speakText(message.text)}
                                  className="flex items-center gap-1 text-xs bg-hindi-purple/10 px-2.5 py-1.5 rounded-full hover:bg-hindi-purple/20 transition-colors text-hindi-purple"
                                  title="Listen to this message"
                                >
                                  <Volume2 className="h-3 w-3" />
                                  <span>Speak</span>
                                </button>
                                <button
                                  onClick={() => window.speechSynthesis.cancel()}
                                  className="flex items-center gap-1 text-xs bg-gray-100 px-2.5 py-1.5 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                                  title="Stop speaking"
                                >
                                  <VolumeX className="h-3 w-3" />
                                  <span>Stop</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {message.isUser && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple to-hindi-magenta hidden sm:flex items-center justify-center ml-3 mt-1 shadow-sm">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!showLevels && (
            <div className="p-5 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-3">


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


                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isTranscribing}
                  className={`p-3.5 rounded-full ${isRecording
                    ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-200"
                    : isTranscribing
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } transition-colors shadow-sm`}
                  title={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> :
                    isTranscribing ? <Loader2 className="h-5 w-5 animate-spin" /> :
                      <Mic className="h-5 w-5" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className={`p-3.5 rounded-full ${!input.trim() || isTyping
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
          )}
        </motion.div>

        <motion.div
          className="text-center mt-6 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-hindi-purple" />
            <span>Powered by Gemini AI • Learn Hindi with ShabdShiksha</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShabdGPT;


const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const containsHindi = /[\u0900-\u097F]/.test(text);
    utterance.lang = containsHindi ? 'hi-IN' : 'en-US';
    const voices = window.speechSynthesis.getVoices();

    if (containsHindi) {
      const hindiVoice = voices.find(voice =>
        voice.lang.includes('hi') || voice.name.includes('Hindi')
      );
      if (hindiVoice) utterance.voice = hindiVoice;
    }
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis not supported in this browser");
  }
};
