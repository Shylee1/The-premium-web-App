import React from 'react';
import PageTemplate from '../components/ui/PageTemplate';

export default function PricingPage() {
  return (
    <PageTemplate 
      title="Pricing & Access" 
      subtitle="Secure your slot in the epoch."
    >
      <div className="space-y-12 text-[#A2AFA4] text-lg leading-relaxed">
        <div className="bg-[#143D36]/20 border-l-4 border-[#43a881] p-8">
          <h2 className="text-2xl font-bold text-[#F6F7E7] mb-4">Limited Access Phase</h2>
          <p className="mb-4">
            Access to NeurusAGI is currently strictly limited. We are prioritizing strategic defense partnerships, enterprise deployments, and select early-access research cohorts.
          </p>
          <p>
            To secure your slot for the first functional AGI rollout, you must join the waitlist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#143D36] bg-black/40 p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-[#F6F7E7] mb-2">Research</h3>
            <p className="text-[#43a881] font-mono mb-6">Waitlist Only</p>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Access to Lobe 1 (Logic & Frameworks)</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Standard Holographic Memory</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Community Support</li>
            </ul>
            <button className="w-full py-3 border border-[#43a881] text-[#43a881] hover:bg-[#43a881] hover:text-black transition font-bold">
              JOIN WAITLIST
            </button>
          </div>

          <div className="border border-[#43a881] bg-[#143D36]/10 p-8 flex flex-col relative shadow-[0_0_30px_rgba(67,168,129,0.15)]">
            <div className="absolute top-0 right-0 bg-[#43a881] text-black text-xs font-bold px-3 py-1 uppercase">
              Priority
            </div>
            <h3 className="text-2xl font-bold text-[#F6F7E7] mb-2">Enterprise</h3>
            <p className="text-[#43a881] font-mono mb-6">Custom Deployment</p>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Full 10-Lobe System Access</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Exabyte Paradigm Data Topology</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Dedicated Quantum-Classic Hybrid Core</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> 24/7 Executive Admin Support</li>
            </ul>
            <button className="w-full py-3 bg-[#43a881] text-black hover:bg-white transition font-bold">
              CONTACT SALES
            </button>
          </div>

          <div className="border border-[#143D36] bg-black/40 p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-[#F6F7E7] mb-2">Defense & Intel</h3>
            <p className="text-[#43a881] font-mono mb-6">Classified</p>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Dual-Use Technology Suite</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Dark Pool Sampling & OSINT</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> Reverse-Engineering Oracle</li>
              <li className="flex items-start"><span className="text-[#43a881] mr-2">✓</span> On-Premise Air-Gapped Deployment</li>
            </ul>
            <button className="w-full py-3 border border-[#43a881] text-[#43a881] hover:bg-[#43a881] hover:text-black transition font-bold">
              SECURE INQUIRY
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
