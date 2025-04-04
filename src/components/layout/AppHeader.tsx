import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  name: string;
  progress: {
    streak: number;
  };
}

interface AppHeaderProps {
  user?: User;
  logout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ user, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2 text-white font-bold text-lg">
            श
          </div>
          <span className="font-bold text-xl text-gray-800">Shabd<span className="text-pink-500">Shiksha</span></span>
        </Link>

        {user ? (
          <>
            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-4"
                >
                  <button className="self-end p-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg">
                    <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Flame size={16} className="text-pink-500" />
                        <span>{user.progress.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                  <Link to="/dashboard" className="text-gray-800 hover:text-purple-500">Dashboard</Link>
                  <Link to="/thought-of-the-day" className="text-gray-800 hover:text-purple-500">Thought of the Day</Link>
                  <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg">
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Flame size={16} className="text-pink-500" />
                    <span>{user.progress.streak} day streak</span>
                  </div>
                </div>
              </div>
              <Link to="/dashboard" className="text-gray-800 hover:text-purple-500">Dashboard</Link>
              <Link to="/thought-of-the-day" className="text-gray-800 hover:text-purple-500">Thought of the Day</Link>
              <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-gray-800 hover:text-purple-500">Log In</Link>
            <Link to="/register" className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
