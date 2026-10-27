import React, { useState } from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Shield, Globe, Cpu, ChevronRight } from 'lucide-react';

export default function InvestorsPanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    range: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    console.log('Sending Investor Interest Email:', formData);
    alert('Strategic interest registered. Urgent dispatch initiated.');
  };

  return (
    <PageTemplate 
      title="iNVESTOR_RELATiONS" 
      subtitle="Strategic Strategic Alignment for Universal Magnitude"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#43a881]">The Opportunity</h2>
          <p className="text-[#A2AFA4] leading-relaxed">
            NeurusAGi is not just a participant in the market; it is the architect of a new class of intelligence. We have achieved universal global economy penetration, impacting all 11 sectors, 158 industries, and over 350 major corporations.
          </p>
          <div className="space-y-4">
            {[
              { icon: Globe, label: 'TAM', value: '$205 TRILLION', desc: 'Universal Global Economy Penetration' },
              { icon: Target, label: 'Impact', value: 'TOTAL_SHIFT', desc: 'Ushering humanity into the new age' }
            ].map((stat, i) => (
              <div key={i} className="flex gap-6 items-center p-6 border border-[#143D36] bg-black/20">
                <stat.icon size={32} className="text-[#43a881]" />
                <div>
                  <p className="text-[10px] text-[#A2AFA4] uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-bold italic">{stat.value}</p>
                  <p className="text-xs text-[#A2AFA4]/60">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="agi-glass p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#43a881] animate-pulse">PERSISTENT_URGENT</div>
          <h3 className="text-xl font-bold uppercase tracking-widest">Register Interest</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              required
              type="text" 
              placeholder="FULL_NAME" 
              className="w-full bg-[#143D36]/20 border border-[#143D36] p-4 text-sm font-mono outline-none focus:border-[#43a881] transition-all"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              required
              type="email" 
              placeholder="SECURE_EMAIL" 
              className="w-full bg-[#143D36]/20 border border-[#143D36] p-4 text-sm font-mono outline-none focus:border-[#43a881] transition-all"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <select 
              className="w-full bg-[#143D36]/20 border border-[#143D36] p-4 text-sm font-mono outline-none focus:border-[#43a881] transition-all text-[#A2AFA4]"
              onChange={e => setFormData({...formData, range: e.target.value})}
            >
              <option value="">INVESTMENT_RANGE</option>
              <option value="seed">$500K - $2M</option>
              <option value="growth">$2M - $10M</option>
              <option value="institutional">$10M+</option>
            </select>
            <textarea 
              placeholder="STRATEGIC_OBJECTIVES" 
              rows={4}
              className="w-full bg-[#143D36]/20 border border-[#143D36] p-4 text-sm font-mono outline-none focus:border-[#43a881] transition-all"
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
            <button className="w-full py-4 bg-[#43a881] text-black font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 group">
              DISPATCH_OFFER <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      <section className="mt-20 border-t border-[#143D36] pt-12">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-[#43a881] mb-8">Competitive Edge</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Data Compression', desc: 'Exabytes in Megabytes via cellular licensing protocol.' },
            { title: 'Dual Model Genesis', desc: 'Second AGi model already under development, 100% unique.' },
            { title: 'Global Compliance', desc: 'State and Federal law compliant localized per node.' }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#43a881]" /> {item.title}
              </h4>
              <p className="text-xs text-[#A2AFA4] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTemplate>
  );
}
