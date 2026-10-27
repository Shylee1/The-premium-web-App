import React, { useState } from 'react';
import { 
  Building2, 
  Dna, 
  LineChart, 
  Scale, 
  Workflow, 
  Truck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function CapabilitiesPanel() {
  const [activeCategory, setActiveCategory] = useState<'enterprise' | 'scientific'>('enterprise');

  const capabilities = {
    enterprise: [
      {
        title: 'Autonomous Supply Chain Orchestration',
        icon: Truck,
        description: 'Dynamically reroutes intercontinental freight based on maritime weather, geopolitical chokepoints, and raw material volatility in real-time.',
        impact: '41% reduction in idle warehouse overhead',
      },
      {
        title: 'Quantitative Arbitrage & Risk Synthesis',
        icon: LineChart,
        description: 'Microsecond cross-asset valuation combining order-book depth, macro rate shifts, and satellite trade monitoring.',
        impact: 'Zero-slippage risk hedging',
      },
      {
        title: 'Continuous Statutory Compliance',
        icon: Scale,
        description: 'Automatic legal audit and multi-jurisdictional filing synthesis across SEC, GDPR, HIPAA, and Basel III regulations.',
        impact: '100% automated audit readiness',
      },
      {
        title: 'Industrial Manufacturing Feedback',
        icon: Workflow,
        description: 'Closed-loop computer vision and edge robotics tuning to preempt equipment fatigue and eliminate semiconductor line defects.',
        impact: '99.98% zero-defect yield',
      },
    ],
    scientific: [
      {
        title: 'Biomolecular Protein & Ligand Design',
        icon: Dna,
        description: 'De novo macromolecule folding and target affinity optimization with quantum thermodynamic constraint validation.',
        impact: '8x faster clinical candidate selection',
      },
      {
        title: 'Energy Grid Phase Balancing',
        icon: Building2,
        description: 'Sub-cycle grid load balancing coordinating municipal microgrids, battery storage, and renewable peak shaving.',
        impact: '32% carbon intensity drop',
      },
    ],
  };

  return (
    <div className="space-y-6 text-sm">
      <div>
        <span className="text-xs font-semibold text-[#20D39B] uppercase tracking-wider">
          Industrial & Scientific Implementations
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
          High-Leverage Capabilities
        </h3>
        <p className="text-[#8F9E98] mt-2 leading-relaxed">
          Autonomous intelligence designed to execute complex, multi-agent workflows with deterministic reliability.
        </p>
      </div>

      {/* Segmented Category Control */}
      <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/5">
        <button
          onClick={() => setActiveCategory('enterprise')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeCategory === 'enterprise'
              ? 'bg-[#20D39B] text-[#030708] shadow-sm'
              : 'text-[#8F9E98] hover:text-white'
          }`}
        >
          Enterprise & Financial
        </button>
        <button
          onClick={() => setActiveCategory('scientific')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeCategory === 'scientific'
              ? 'bg-[#20D39B] text-[#030708] shadow-sm'
              : 'text-[#8F9E98] hover:text-white'
          }`}
        >
          Scientific & Physical Systems
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {capabilities[activeCategory].map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div key={idx} className="glass-card-interactive p-4 rounded-xl space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0C2B22] border border-[#20D39B]/30 flex items-center justify-center text-[#20D39B] shrink-0 mt-0.5">
                  <Icon size={16} />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-white">{cap.title}</h4>
                  <p className="text-xs text-[#8F9E98] leading-relaxed">
                    {cap.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-[#20D39B]">
                    <CheckCircle2 size={13} />
                    <span>{cap.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
