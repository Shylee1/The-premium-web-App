import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexusStore, PanelType } from '../../stores/nexusStore';
import { X } from 'lucide-react';

import ChatPanel from './panels/ChatPanel';
import ArchitecturePanel from './panels/ArchitecturePanel';
import CapabilitiesPanel from './panels/CapabilitiesPanel';
import BenchmarksPanel from './panels/BenchmarksPanel';
import PricingPanel from './panels/PricingPanel';

export default function PanelSystem() {
  const activePanel = useNexusStore((state) => state.activePanel);
  const setActivePanel = useNexusStore((state) => state.setActivePanel);

  const isDrawerOpen = 
    activePanel !== 'none' && 
    activePanel !== 'waitlist';

  const getPanelContent = () => {
    switch (activePanel) {
      case 'chat':
        return <ChatPanel />;
      case 'architecture':
        return <ArchitecturePanel />;
      case 'capabilities':
        return <CapabilitiesPanel />;
      case 'benchmarks':
        return <BenchmarksPanel />;
      case 'pricing':
        return <PricingPanel />;
      default:
        return null;
    }
  };

  const getPanelTitle = () => {
    switch (activePanel) {
      case 'chat':
        return 'Intelligence Console';
      case 'architecture':
        return 'Neuromorphic Architecture';
      case 'capabilities':
        return 'Industrial Capabilities';
      case 'benchmarks':
        return 'Verified Benchmarks';
      case 'pricing':
        return 'Commercial Tiers';
      default:
        return 'System Module';
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Subtle backdrop overlay for mobile/narrow viewports */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePanel('none')}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          />

          {/* Slide-over Glass Sheet from Right */}
          <motion.aside
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[500px] lg:w-[560px] glass-panel border-l border-white/10 shadow-[-16px_0_40px_rgba(0,0,0,0.6)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#20D39B]" />
                <h2 className="text-sm font-bold tracking-tight text-white">
                  {getPanelTitle()}
                </h2>
              </div>
              <button
                onClick={() => setActivePanel('none')}
                className="p-1.5 rounded-lg text-[#8F9E98] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              {getPanelContent()}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
