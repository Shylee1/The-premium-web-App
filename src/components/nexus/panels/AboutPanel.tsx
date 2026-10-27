import React from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion } from 'framer-motion';

export default function AboutPanel() {
  return (
    <PageTemplate 
      title="MANiFESTO" 
      subtitle="The Genesis of General Intelligence"
    >
      <div className="space-y-16 py-8">
        <section className="text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
            The era of <span className="text-[#43a881]">predictive boilerplate</span> is over.
          </h2>
          <p className="text-2xl font-mono text-[#A2AFA4] leading-relaxed italic border-y border-[#143D36] py-12">
            "NeurusAGi represents a fundamental shift in the architecture of existence. We do not build tools; we build the substrate for the next human epoch."
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#43a881]">Digital Sovereignty</h3>
            <p className="text-[#A2AFA4] leading-relaxed text-lg">
              Every individual is now a global institution. NeurusAGi provides the leverage necessary to manipulate the physical world with the same fluidity as software. By solving for general intelligence, we solve for the scarcity of human time.
            </p>
          </div>
          <div className="agi-glass p-8 border-l-4 border-[#43a881]">
            <p className="font-mono text-xs text-[#43a881] mb-4 tracking-widest">[SYSTeM_LoG_001]</p>
            <p className="text-sm font-mono leading-loose">
              If the machine can reason across domains—if it can synthesis molecular biology with global logistics and creative philosophy—then the boundaries between industry and individual vanish.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Universal Penetration", desc: "Native integration into all 158 global industrial sectors." },
            { title: "Quantum Synthesis", desc: "Reasoning matrices capable of 10^18 cross-domain deductions per cycle." },
            { title: "Neural Sovereignty", desc: "Your intelligence. Your data. Your destiny. Air-gapped by default." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-[#143D36] bg-[#020607]/40">
              <h4 className="text-lg font-bold uppercase tracking-widest mb-4 text-[#43a881]">{item.title}</h4>
              <p className="text-xs text-[#A2AFA4] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        <footer className="pt-12 border-t border-[#143D36] flex justify-between items-end">
          <div className="space-y-4">
            <p className="text-[10px] font-mono text-[#43a881] tracking-[0.5em] uppercase">EXECUTiVE_SiGNATUrE</p>
            <div className="text-3xl font-black italic tracking-tighter">JEREMY TAYLOR</div>
          </div>
          <div className="text-[8px] font-mono text-[#A2AFA4] text-right">
            NEURUS_AGi_CORE_v1.0.0<br />
            ESTABLISHED_2026
          </div>
        </footer>
      </div>
    </PageTemplate>
  );
}
