import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <motion.div 
      className="text-center mt-6 text-gray-500 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center justify-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-hindi-purple" />
        <span>Powered by Gemini AI • Learn Hindi with ShabdGPT</span>
      </div>
    </motion.div>
  );
};

export default Footer;