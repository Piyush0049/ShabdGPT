import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Mic, Sparkles, Globe, Award, Zap, ChevronRight, Heart, Star, Users } from "lucide-react";
import { Helmet } from "react-helmet";
import ShabdGPTSummary from "../components/shabdgpt/ShabdGPTSummary";

const Home: React.FC = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-hindi-purple/5 via-white to-hindi-magenta/5 overflow-hidden">
      <Helmet>
        <title>ShabdGPT - Learn Hindi with AI</title>
        <meta name="description" content="ShabdGPT is an AI-powered platform for learning Hindi through interactive conversations and challenges" />
      </Helmet>

      {/* Floating elements */}
      <div className="fixed w-full h-full pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-hindi-purple/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-hindi-magenta/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-hindi-purple to-hindi-magenta flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-hindi-purple to-hindi-magenta text-transparent bg-clip-text">
            शब्द शिक्षा
          </h2>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/shabdgpt" 
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <span>Start Learning</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-4 py-1 mb-6 rounded-full bg-hindi-purple/10 text-hindi-purple font-medium text-sm"
              >
                AI-Powered Hindi Learning
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-hindi-purple to-hindi-magenta text-transparent bg-clip-text leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                शब्द GPT
              </motion.h1>
              <motion.p 
                className="text-3xl font-light text-gray-700 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Your AI-powered Hindi learning companion
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Master Hindi through interactive conversations, voice recognition, and personalized challenges - all powered by advanced AI.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/shabdgpt"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <span>Start Learning Now</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-hindi-purple to-hindi-magenta rounded-2xl blur opacity-30"
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 p-2 rounded-full">
                      <BookOpen className="h-6 w-6 text-hindi-purple" />
                    </div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      Hindi Learning Assistant
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 flex items-center justify-center shrink-0">
                        <Sparkles className="h-5 w-5 text-hindi-purple" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none flex-1 shadow-sm">
                        <p className="text-gray-700">नमस्ते! (Hello!) I'm your Hindi learning assistant. Would you like to practice with our learning levels or ask me a question about Hindi language?</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex gap-3 justify-end"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="bg-gradient-to-r from-hindi-purple to-hindi-magenta p-4 rounded-2xl rounded-tr-none shadow-md">
                        <p className="text-white">I'd like to learn some basic Hindi greetings.</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple to-hindi-magenta flex items-center justify-center shrink-0 shadow-md">
                        <Mic className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 flex items-center justify-center shrink-0">
                        <Sparkles className="h-5 w-5 text-hindi-purple" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none flex-1 shadow-sm">
                        <p className="text-gray-700">
                          Great choice! Here are some common Hindi greetings:<br/>
                          <span className="font-medium">नमस्ते (Namaste)</span> - Hello/Greetings<br/>
                          <span className="font-medium">शुभ प्रभात (Shubh Prabhat)</span> - Good morning<br/>
                          <span className="font-medium">आप कैसे हैं? (Aap kaise hain?)</span> - How are you?
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Typing indicator */}
                  <motion.div 
                    className="mt-4 flex gap-1.5 ml-14"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      times: [0, 0.5, 1]
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-hindi-purple/60"></div>
                    <div className="w-2 h-2 rounded-full bg-hindi-purple/60"></div>
                    <div className="w-2 h-2 rounded-full bg-hindi-purple/60"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-24 bg-white relative"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-20"
            variants={fadeInUp}
          >
            <motion.div
              className="inline-block px-4 py-1 mb-4 rounded-full bg-hindi-purple/10 text-hindi-purple font-medium text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Features
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Why Learn with ShabdGPT?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes learning Hindi engaging, interactive, and personalized to your needs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all group"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="h-8 w-8 text-hindi-purple" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Voice Recognition</h3>
              <p className="text-gray-600 mb-6">
                Practice your pronunciation with our advanced voice recognition technology that provides instant feedback on your Hindi speaking skills.
              </p>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-hindi-purple to-hindi-magenta rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all group"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-hindi-purple" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">AI-Powered Learning</h3>
              <p className="text-gray-600 mb-6">
                Powered by Gemini AI, our assistant understands context, provides culturally relevant examples, and adapts to your learning style.
              </p>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-hindi-purple to-hindi-magenta rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all group"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-hindi-purple/20 to-hindi-magenta/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-hindi-purple" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Progressive Learning</h3>
              <p className="text-gray-600 mb-6">
                Start with basic words and gradually advance to complex sentences and paragraphs with our structured learning levels.
              </p>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-hindi-purple to-hindi-magenta rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-hindi-purple/5 to-hindi-magenta/5 relative overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-hindi-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-hindi-magenta/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block px-4 py-1 mb-6 rounded-full bg-hindi-purple/10 text-hindi-purple font-medium text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get Started Today
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Ready to Start Your Hindi Learning Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of learners who are mastering Hindi with ShabdGPT's interactive approach.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/shabdgpt"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-hindi-purple to-hindi-magenta text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
              >
                <span>Try ShabdGPT Now</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
            
            {/* Testimonial */}
            <motion.div 
              className="mt-16 bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-hindi-purple to-hindi-magenta flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Anika Sharma</h4>
                  <p className="text-gray-500 text-sm">Hindi Learner from USA</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "ShabdGPT has transformed my Hindi learning experience. The voice recognition feature helps me perfect my pronunciation, and the AI provides personalized feedback that keeps me motivated. Highly recommended!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-hindi-purple to-hindi-magenta flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-hindi-purple to-hindi-magenta text-transparent bg-clip-text">
                  शब्द शिक्षा
                </h2>
              </div>
              <p className="text-gray-600 text-sm">Learn Hindi with AI - Powered by Gemini</p>
            </div>
            <div className="flex gap-8 mb-8 md:mb-0">
              <Link to="#" className="text-gray-600 hover:text-hindi-purple transition-colors">About</Link>
              <Link to="#" className="text-gray-600 hover:text-hindi-purple transition-colors">Features</Link>
              <Link to="#" className="text-gray-600 hover:text-hindi-purple transition-colors">Pricing</Link>
              <Link to="#" className="text-gray-600 hover:text-hindi-purple transition-colors">Contact</Link>
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <Heart className="h-4 w-4 text-hindi-magenta" />
              <span>© {new Date().getFullYear()} ShabdGPT. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;