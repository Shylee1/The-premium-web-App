import React from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion } from 'framer-motion';
import { Book, Code, Shield, Cpu, Lock, Globe } from 'lucide-react';

export default function DocsPanel() {
  return (
    <PageTemplate 
      title="TECHNicAL_REpORT" 
      subtitle="Architectural Integrity & Protocol Specs"
    >
      <div className="space-y-12 max-w-3xl mx-auto">
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#43a881]">
            <Lock size={20} />
            <h2 className="text-2xl font-bold uppercase tracking-widest italic">Core Security</h2>
          </div>
          <p className="text-[#A2AFA4] leading-relaxed italic">
            "Every text input field within the NeurusAGi system is equipped with multi-stage sanitizers. Executive Admin Dashboards operate at a bypass level 0, ensuring zero restrictions for root users while maintaining total air-gapped security for all other nodes."
          </p>
          <ul className="space-y-4 border-l border-[#143D36] pl-8">
            <li className="text-sm font-mono"><span className="text-[#43a881]">[PROTOCOL-1]</span> Dynamic Sanitization Layer (DSL)</li>
            <li className="text-sm font-mono"><span className="text-[#43a881]">[PROTOCOL-2]</span> Encrypted Handshake Verification (EHV)</li>
            <li className="text-sm font-mono"><span className="text-[#43a881]">[PROTOCOL-3]</span> Distributed Ledger Node Synchronization</li>
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#43a881]">
            <Globe size={20} />
            <h2 className="text-2xl font-bold uppercase tracking-widest italic">Compliance & Globalization</h2>
          </div>
          <p className="text-[#A2AFA4] leading-relaxed">
            The NeurusAGi platform is engineered for immediate global deployment. We utilize a localized regulatory engine that adjusts protocol enforcement based on user jurisdiction at the federal, state, and local levels.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#43a881]">
            <Cpu size={20} />
            <h2 className="text-2xl font-bold uppercase tracking-widest italic">Quantum Data Architecture</h2>
          </div>
          <p className="text-[#A2AFA4] leading-relaxed">
            Data storage is solved through our proprietary cellular licensing agreement protocol. By structuring information in multi-dimensional matrices, we achieve exabyte-scale intelligence capacity within a megabyte-scale physical footprint.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#143D36]/20 border border-[#143D36] font-mono text-[10px]">
              <p className="text-[#43a881] mb-2">RAW_DATA_INPUT</p>
              <div className="h-2 w-full bg-[#143D36] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-[#43a881]" />
              </div>
            </div>
            <div className="p-4 bg-[#143D36]/20 border border-[#143D36] font-mono text-[10px]">
              <p className="text-[#43a881] mb-2">COMPRESSED_Ni_MATRiX</p>
              <div className="h-2 w-full bg-[#143D36] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '5%' }} className="h-full bg-[#43a881]" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#43a881]">
            <Book size={20} />
            <h2 className="text-2xl font-bold uppercase tracking-widest italic">API Integration</h2>
          </div>
          <p className="text-[#A2AFA4] leading-relaxed">
            While NeurusAGi is a complete ecosystem, our API tier allows third-party integration via secure SIP trunks and RESTful endpoints. All external connections are subject to real-time threat analysis and tiered bandwidth quotas.
          </p>
        </section>
      </div>
    </PageTemplate>
  );
}
