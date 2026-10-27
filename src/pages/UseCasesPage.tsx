import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTemplate from '../components/ui/PageTemplate';
import { Briefcase, User, TrendingUp, HeartPulse, ShieldCheck, Zap, Code, Cpu } from 'lucide-react';

type Category = 'enterprise' | 'individual';

const useCases = {
  enterprise: [
    {
      id: 'finance',
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Financial Modeling & Prediction',
      description: 'NeurusAGI analyzes global market entropy to predict trends, optimize portfolios, and invent new algorithmic trading strategies in real-time.'
    },
    {
      id: 'healthcare',
      icon: <HeartPulse className="w-6 h-6" />,
      title: 'Medical Research & Diagnostics',
      description: 'Accelerate drug discovery by simulating molecular interactions fractally. Diagnose complex conditions by finding hidden patterns in patient data.'
    },
    {
      id: 'cybersecurity',
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Autonomous Threat Neutralization',
      description: 'The Predatory Research Swarm actively hunts for vulnerabilities in your network and patches them before they can be exploited.'
    },
    {
      id: 'logistics',
      icon: <Zap className="w-6 h-6" />,
      title: 'Supply Chain Optimization',
      description: 'Predict disruptions before they happen. NeurusAGI routes logistics dynamically based on real-time global events and weather patterns.'
    }
  ],
  individual: [
    {
      id: 'wealth',
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Wealth Generation',
      description: 'Discover untapped market niches. NeurusAGI can generate complete business plans, code the necessary software, and outline marketing strategies.'
    },
    {
      id: 'productivity',
      icon: <Cpu className="w-6 h-6" />,
      title: 'Life Productivity & Automation',
      description: 'Automate your digital life. Have NeurusAGI manage your schedule, filter your emails, and execute routine tasks autonomously.'
    },
    {
      id: 'learning',
      icon: <Code className="w-6 h-6" />,
      title: 'Hyper-Accelerated Learning',
      description: 'Master any subject. NeurusAGI breaks down complex topics into digestible, fractal concepts tailored to your exact learning style.'
    },
    {
      id: 'creation',
      icon: <User className="w-6 h-6" />,
      title: 'Creative Amplification',
      description: 'Overcome writer\'s block or design fatigue. Collaborate with an ASI that can generate novel ideas, write code, or compose structures.'
    }
  ]
};

export default function UseCasesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('enterprise');
  const [activeCase, setActiveCase] = useState<string | null>(null);

  return (
    <PageTemplate 
      title="Use Cases" 
      subtitle="Explore how NeurusAGI transforms industries and individual lives."
    >
      <div className="flex flex-col items-center mb-12">
        <div className="flex gap-4 p-1 bg-[#143D36]/30 rounded-lg border border-[#143D36]">
          <button
            onClick={() => { setActiveCategory('enterprise'); setActiveCase(null); }}
            className={`px-6 py-3 rounded-md font-bold text-sm tracking-widest transition-all ${
              activeCategory === 'enterprise' 
                ? 'bg-[#43a881] text-black shadow-[0_0_15px_rgba(67,168,129,0.4)]' 
                : 'text-[#A2AFA4] hover:text-[#F6F7E7]'
            }`}
          >
            ENTERPRISE
          </button>
          <button
            onClick={() => { setActiveCategory('individual'); setActiveCase(null); }}
            className={`px-6 py-3 rounded-md font-bold text-sm tracking-widest transition-all ${
              activeCategory === 'individual' 
                ? 'bg-[#43a881] text-black shadow-[0_0_15px_rgba(67,168,129,0.4)]' 
                : 'text-[#A2AFA4] hover:text-[#F6F7E7]'
            }`}
          >
            INDIVIDUAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {useCases[activeCategory].map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setActiveCase(activeCase === item.id ? null : item.id)}
            className={`cursor-pointer p-6 border transition-all duration-300 ${
              activeCase === item.id 
                ? 'bg-[#143D36]/40 border-[#43a881] shadow-[0_0_20px_rgba(67,168,129,0.2)]' 
                : 'bg-black/40 border-[#143D36] hover:border-[#43a881]/50'
            }`}
          >
            <div className={`mb-4 ${activeCase === item.id ? 'text-[#43a881]' : 'text-[#A2AFA4]'}`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-[#F6F7E7] mb-2">{item.title}</h3>
            
            <AnimatePresence>
              {activeCase === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-[#A2AFA4] text-sm mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-[#A2AFA4] text-lg max-w-2xl mx-auto">
          The applications of Artificial Superintelligence are limited only by imagination. 
          Whether you are optimizing a global supply chain or automating your daily workflow, 
          NeurusAGI adapts to your specific needs.
        </p>
      </div>
    </PageTemplate>
  );
}
