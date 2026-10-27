import React from 'react';
import { motion } from 'framer-motion';

interface LivingPanelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function LivingPanel({ children, className = '', delay = 0 }: LivingPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden border border-[#143D36] bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(20,61,54,0.3)] ${className}`}
    >
      {/* Scanning Line Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#43a881] to-transparent opacity-50"
        animate={{ y: ['-100%', '1000%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#43a881]"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#43a881]"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#43a881]"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#43a881]"></div>

      <div className="relative z-10 p-6 h-full">
        {children}
      </div>
    </motion.div>
  );
}
