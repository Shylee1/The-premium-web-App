import React from 'react';
import { motion } from 'framer-motion';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function PageTemplate({ title, subtitle, children }: PageTemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <header className="mb-12 border-l-4 border-[#43a881] pl-8 py-4">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">
          {title.split('').map((char, i) => (
            <span key={i} className={char === 'i' ? 'lowercase text-[#43a881]' : ''}>
              {char === 'i' ? 'i' : char}
            </span>
          ))}
        </h1>
        {subtitle && (
          <p className="text-xl font-mono text-[#A2AFA4] tracking-widest uppercase">
            {subtitle}
          </p>
        )}
      </header>
      
      <div className="space-y-12">
        {children}
      </div>
    </motion.div>
  );
}
