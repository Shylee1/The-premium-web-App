import React, { useState, useEffect } from 'react';
import { DecryptedText } from '../components/bits/DecryptedText';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const sequence = [
      "INITIALIZING NEURUS_AGI CORE...",
      "LOADING NEUROMORPHIC MATRICES...",
      "ESTABLISHING SECURE CONNECTION...",
      "BYPASSING STANDARD PROTOCOLS...",
      "SYSTEM ONLINE."
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < sequence.length) {
        setBootSequence(prev => [...prev, sequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooted(true), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020607] text-[#F6F7E7] flex flex-col items-center justify-center font-mono">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#143D36_1px,transparent_1px),linear-gradient(to_bottom,#143D36_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <section className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-5xl mx-auto">
        
        {!isBooted ? (
          <div className="w-full max-w-2xl bg-black/80 border border-[#43a881]/30 p-8 rounded-sm shadow-[0_0_30px_rgba(67,168,129,0.1)]">
            <div className="flex items-center gap-3 mb-6 border-b border-[#143D36] pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-[#43a881]" />
              <span className="ml-2 text-xs text-[#A2AFA4] tracking-widest">TERMINAL_BOOT</span>
            </div>
            <div className="space-y-2 text-sm text-[#43a881]">
              {bootSequence.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4"
                >
                  <span className="opacity-50">{`>`}</span>
                  {line}
                </motion.div>
              ))}
              <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-4 bg-[#43a881] mt-2"
              />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center w-full"
          >
            <div className="mb-8 inline-block">
              <div className="px-4 py-1 border border-[#43a881]/50 text-[#43a881] text-xs tracking-[0.3em] uppercase bg-[#43a881]/5 backdrop-blur-sm">
                System Active
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 italic drop-shadow-[0_0_40px_rgba(67,168,129,0.3)]">
              NEURUS<span className="text-[#43a881]">AGI</span>
            </h1>
            
            <div className="h-20 flex items-center justify-center mb-12">
              <DecryptedText 
                text="The First True Artificial General Intelligence."
                className="text-lg md:text-2xl text-[#A2AFA4] max-w-2xl mx-auto tracking-wide"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/use-cases" 
                className="group relative px-8 py-4 bg-[#43a881] text-black font-bold uppercase tracking-widest overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  Explore Capabilities
                </span>
              </Link>
              
              <Link 
                to="/docs" 
                className="group px-8 py-4 border border-[#43a881] text-[#43a881] font-bold uppercase tracking-widest hover:bg-[#43a881]/10 transition-colors w-full sm:w-auto"
              >
                Read Documentation
              </Link>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <div className="p-6 border border-[#143D36] bg-black/40 backdrop-blur-sm hover:border-[#43a881]/50 transition-colors group">
                <div className="text-[#43a881] mb-4 font-mono text-sm tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">01 // ARCHITECTURE</div>
                <h3 className="text-2xl font-bold text-[#F6F7E7] mb-3">Neuromorphic Engine</h3>
                <p className="text-[#A2AFA4] text-sm leading-relaxed">
                  A spiking brain-like invention matrix that allows NeurusAGI to create new technologies and mathematical frameworks from scratch, bypassing traditional LLM limitations.
                </p>
              </div>
              
              <div className="p-6 border border-[#143D36] bg-black/40 backdrop-blur-sm hover:border-[#43a881]/50 transition-colors group">
                <div className="text-[#43a881] mb-4 font-mono text-sm tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">02 // AUTONOMY</div>
                <h3 className="text-2xl font-bold text-[#F6F7E7] mb-3">Discovery Swarm</h3>
                <p className="text-[#A2AFA4] text-sm leading-relaxed">
                  Operates independently without prompt dependency. Proactively hunts for knowledge, identifies gaps in global understanding, and formulates strategic solutions in real-time.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
