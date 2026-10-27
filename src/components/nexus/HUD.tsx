import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Activity, 
  ChevronRight,
  Cpu,
  Zap,
  Globe
} from 'lucide-react';
import { useNexusStore, PanelType, CoreMode } from '../../stores/nexusStore';

export default function HUD() {
  const activePanel = useNexusStore((state) => state.activePanel);
  const setActivePanel = useNexusStore((state) => state.setActivePanel);
  const coreMode = useNexusStore((state) => state.coreMode);
  const setCoreMode = useNexusStore((state) => state.setCoreMode);
  const isImmersive = useNexusStore((state) => state.isImmersive);
  const toggleImmersive = useNexusStore((state) => state.toggleImmersive);
  const telemetry = useNexusStore((state) => state.telemetry);

  const coreModes: { id: CoreMode; label: string; icon: any }[] = [
    { id: 'baseline', label: 'Baseline', icon: Activity },
    { id: 'inference', label: 'Inference', icon: Zap },
    { id: 'synthesis', label: 'Synthesis', icon: Cpu },
    { id: 'hyper', label: 'Hyper-Compute', icon: Sparkles },
  ];

  const dockItems: { id: PanelType; label: string; icon: any }[] = [
    { id: 'chat', label: 'Console', icon: Terminal },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'capabilities', label: 'Capabilities', icon: Globe },
    { id: 'benchmarks', label: 'Benchmarks', icon: BarChart3 },
    { id: 'pricing', label: 'Commercial', icon: ShieldCheck },
  ];

  return (
    <>
      {/* 1. TOP BAR — 3-Zone Contract */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: isImmersive ? -100 : 0, opacity: isImmersive ? 0 : 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none"
      >
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActivePanel('none')}
          className="pointer-events-auto cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0C2B22] border border-[#20D39B]/30 flex items-center justify-center transition-all group-hover:border-[#20D39B]/70 group-hover:shadow-[0_0_16px_rgba(32,211,155,0.25)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#20D39B] transition-transform group-hover:scale-125" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              Neurus<span className="text-[#20D39B] font-extrabold">AGi</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-8 text-sm font-medium text-[#8F9E98]">
          <button 
            onClick={() => setActivePanel('architecture')}
            className={`transition-colors hover:text-white cursor-pointer ${activePanel === 'architecture' ? 'text-white' : ''}`}
          >
            Architecture
          </button>
          <button 
            onClick={() => setActivePanel('capabilities')}
            className={`transition-colors hover:text-white cursor-pointer ${activePanel === 'capabilities' ? 'text-white' : ''}`}
          >
            Capabilities
          </button>
          <button 
            onClick={() => setActivePanel('benchmarks')}
            className={`transition-colors hover:text-white cursor-pointer ${activePanel === 'benchmarks' ? 'text-white' : ''}`}
          >
            Benchmarks
          </button>
          <button 
            onClick={() => setActivePanel('pricing')}
            className={`transition-colors hover:text-white cursor-pointer ${activePanel === 'pricing' ? 'text-white' : ''}`}
          >
            Commercial
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => setActivePanel('chat')}
            className="px-4 py-2 text-xs font-medium text-[#8F9E98] hover:text-white transition-colors cursor-pointer hidden sm:flex items-center gap-2"
          >
            <Terminal size={14} className="text-[#20D39B]" />
            Launch Console
          </button>
          <button
            onClick={() => setActivePanel('waitlist')}
            className="px-4 py-2 rounded-lg bg-[#20D39B] text-[#030708] text-xs font-semibold hover:bg-[#55F2BC] transition-all shadow-[0_0_20px_rgba(32,211,155,0.2)] hover:shadow-[0_0_24px_rgba(32,211,155,0.4)] cursor-pointer flex items-center gap-1.5"
          >
            Request Access
            <ChevronRight size={13} />
          </button>
        </div>
      </motion.header>

      {/* 2. FLOATING TELEMETRY CARD (Top-Left) */}
      <AnimatePresence>
        {!isImmersive && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-6 sm:left-10 z-30 pointer-events-none hidden lg:block"
          >
            <div className="glass-panel p-4 rounded-xl w-64 space-y-3 pointer-events-auto">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8F9E98]">
                  Neuromorphic Fabric
                </span>
                <span className="text-[10px] font-mono text-[#20D39B] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20D39B] animate-pulse" />
                  Synchronized
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#8F9E98] block">Latency</span>
                  <span className="font-mono font-medium text-white tabular-nums">{telemetry.inferenceLatency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8F9E98] block">Coherence</span>
                  <span className="font-mono font-medium text-[#20D39B] tabular-nums">{telemetry.coherence}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8F9E98] block">Active Pathways</span>
                  <span className="font-mono font-medium text-white tabular-nums">{telemetry.activePathways}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8F9E98] block">Global Mesh</span>
                  <span className="font-mono font-medium text-white tabular-nums">{telemetry.globalNodes}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. INTERACTIVE CORE STATE SWITCHER (Top-Right) */}
      <AnimatePresence>
        {!isImmersive && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 right-6 sm:right-10 z-30 pointer-events-none hidden md:block"
          >
            <div className="glass-panel p-2 rounded-xl pointer-events-auto flex flex-col gap-1 w-44">
              <div className="px-2 py-1 text-[10px] uppercase font-semibold text-[#8F9E98] tracking-wider">
                Excitation Level
              </div>
              {coreModes.map((mode) => {
                const Icon = mode.icon;
                const isCurrent = coreMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setCoreMode(mode.id)}
                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#20D39B]/15 text-[#55F2BC] border border-[#20D39B]/30'
                        : 'text-[#8F9E98] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={13} className={isCurrent ? 'text-[#20D39B]' : 'text-[#8F9E98]'} />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SLEEK COLLAPSIBLE BOTTOM DOCK */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
      >
        <div className="glass-pill px-3 py-2 rounded-2xl flex items-center gap-1 sm:gap-2 pointer-events-auto">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activePanel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePanel(isSelected ? 'none' : item.id)}
                className={`relative px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#20D39B] text-[#030708] font-semibold shadow-[0_0_16px_rgba(32,211,155,0.3)]'
                    : 'text-[#8F9E98] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}

          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Immersive View Toggle */}
          <button
            onClick={toggleImmersive}
            title={isImmersive ? 'Show Interface' : 'Immersive View (Inspect 3D Core)'}
            className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
              isImmersive 
                ? 'bg-[#20D39B] text-[#030708]' 
                : 'text-[#8F9E98] hover:text-white hover:bg-white/5'
            }`}
          >
            {isImmersive ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </motion.div>
    </>
  );
}
