import React, { useState } from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  User, 
  TrendingUp, 
  Lightbulb, 
  ShieldCheck, 
  Cpu, 
  ChevronRight,
  Stethoscope,
  Factory,
  Gavel,
  ShoppingCart
} from 'lucide-react';

const cases = {
  enterprise: [
    { title: 'Predictive Logistics', icon: Factory, desc: 'Heuristic optimization of global supply chains with zero-latency re-routing.' },
    { title: 'Autonomous Compliance', icon: Gavel, desc: 'Real-time auditing and regulation adherence for highly regulated sectors.' },
    { title: 'Quantum Synthesis', icon: Cpu, desc: 'Advanced material science simulation and molecular drug discovery.' },
    { title: 'Global Finance', icon: TrendingUp, desc: 'Fraud detection and market impact analysis across all 158 industries.' }
  ],
  individual: [
    { title: 'Bus Money Making', icon: ShoppingCart, desc: 'Automate side-hustles, dropshipping strategies, and localized delivery optimization.' },
    { title: 'Wealth Maximization', icon: TrendingUp, desc: 'Personal financial AGi to automate passive income and tax optimization.' },
    { title: 'Life Productivity', icon: Lightbulb, desc: 'Dynamic scheduling and cognitive load balancing for peak human performance.' },
    { title: 'Secure Health', icon: Stethoscope, desc: 'Personalized medical diagnostics and longevity protocol management.' }
  ]
};

export default function UseCasesPanel() {
  const [activeTab, setActiveTab] = useState<'enterprise' | 'individual'>('enterprise');

  return (
    <PageTemplate 
      title="USE_CASES" 
      subtitle="Universal Intelligence Implementation"
    >
      <div className="flex justify-center gap-8 mb-12 border-b border-[#143D36]">
        <button 
          onClick={() => setActiveTab('enterprise')}
          className={`pb-4 px-6 font-bold tracking-widest transition-all relative ${
            activeTab === 'enterprise' ? 'text-[#43a881]' : 'text-[#A2AFA4] hover:text-[#43a881]/70'
          }`}
        >
          ENTERPRISE
          {activeTab === 'enterprise' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#43a881]" />}
        </button>
        <button 
          onClick={() => setActiveTab('individual')}
          className={`pb-4 px-6 font-bold tracking-widest transition-all relative ${
            activeTab === 'individual' ? 'text-[#43a881]' : 'text-[#A2AFA4] hover:text-[#43a881]/70'
          }`}
        >
          INDIVIDUAL
          {activeTab === 'individual' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#43a881]" />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <AnimatePresence mode="wait">
          {cases[activeTab].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-[#143D36] bg-black/20 hover:border-[#43a881]/50 group cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-sm border border-[#143D36] flex items-center justify-center mb-6 group-hover:bg-[#43a881]/10 group-hover:border-[#43a881] transition-all">
                <c.icon size={24} className="text-[#43a881]" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-[0.1em]">{c.title}</h3>
              <p className="text-sm text-[#A2AFA4] leading-relaxed mb-6">{c.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#43a881] opacity-0 group-hover:opacity-100 transition-opacity">
                EXPLORE_DETAILS <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-16 text-center italic text-[#A2AFA4]/60 text-xs">
        * AGi models are platform-agnostic and adapt dynamically to your specific node requirements.
      </div>
    </PageTemplate>
  );
}
