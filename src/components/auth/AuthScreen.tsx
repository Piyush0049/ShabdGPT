import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { motion } from 'framer-motion';

interface AuthScreenProps {
  onAuthSuccess?: () => void;
  appName?: string;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess, appName = "Hindi Journey" }) => {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="absolute top-0 right-0 w-64 h-64 bg-hindi-purple opacity-10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-hindi-magenta opacity-10 rounded-tr-full"></div>
      
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <motion.div 
          className="flex-1 p-6 md:p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          key={showLogin ? "login-content" : "signup-content"}
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-hindi-dark">
              <span className="text-hindi-magenta">
                {showLogin ? "शब्दGPT" : "ShabdGPT"}
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
              {showLogin 
                ? "हिंदी भाषा की सुंदर दुनिया में अपनी यात्रा शुरू करें" 
                : "Begin your adventure into the beautiful world of Hindi language"}
            </p>
            <div className="space-y-6 mb-8">
              <motion.div 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="bg-hindi-purple rounded-full p-3 text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-7"/>
                    <path d="M9 21v-7H5v7"/>
                    <path d="M13 21v-4h-2v4"/>
                    <path d="M19 21v-7h-4v7"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-semibold">
                  {showLogin 
                    ? "छोटे-छोटे पाठों के साथ अपनी गति से सीखें" 
                    : "Learn at your own pace with bite-sized lessons"}
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="bg-hindi-magenta rounded-full p-3 text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-semibold">
                  {showLogin 
                    ? "हिंदी सीखने वालों के समुदाय से जुड़ें" 
                    : "Join our community of Hindi learners"}
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="bg-hindi-pink rounded-full p-3 text-hindi-dark shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20v-6"/>
                    <path d="M12 14V8"/>
                    <path d="M18 5.34c1.54.62 2 1.7 2 3.16 0 2.4-2.4 4.5-8 8.5-5.6-4-8-6.1-8-8.5 0-1.38.43-2.52 2-3.16"/>
                    <path d="M16 3c-2 0-4 2-4 2s-2-2-4-2C4.5 3 3 5.17 3 8.5c0 3.2 2 4.5 9 9.5 7-5 9-6.3 9-9.5C21 5.17 19.5 3 16 3z"/>
                  </svg>
                </div>
                <span className="text-gray-700 font-semibold">
                  {showLogin 
                    ? "हिंदी संस्कृति और भाषा से प्यार करें" 
                    : "Fall in love with Hindi culture and language"}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 p-8 rounded-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {showLogin ? (
            <LoginForm 
              onSuccess={onAuthSuccess} 
              onSwitchToRegister={() => setShowLogin(false)}
              useHindi={true}
            />
          ) : (
            <RegisterForm 
              onSuccess={onAuthSuccess} 
              onSwitchToLogin={() => setShowLogin(true)}
              useHindi={false}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;
