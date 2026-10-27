import React from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Image as ImageIcon } from 'lucide-react';

const mediaItems = [
  { id: '1', title: 'NeurusAGi vs OpenAI: The Architecture of Reasoning', source: 'The Verge', type: 'article', size: 'large' },
  { id: '2', title: 'Global Launch: Day One Analysis', source: 'Bloomberg', type: 'video', size: 'medium' },
  { id: '3', title: 'Universal Economy Penetration Report', source: 'Forbes', type: 'article', size: 'small' },
  { id: '4', title: 'Jeremy Taylor on the Future of Human Evolution', source: 'Wired', type: 'video', size: 'large' },
  { id: '5', title: 'How NeurusAGi Solved Data Storage', source: 'TechCrunch', type: 'article', size: 'medium' },
  { id: '6', title: 'AGi in Healthcare: Longevity Protocols', source: 'Nature', type: 'article', size: 'small' },
  { id: '7', title: 'The Quantum Computing Leap', source: 'MIT Tech Review', type: 'video', size: 'medium' },
  { id: '8', title: 'Enterprise Adoption Rates Skyrocket', source: 'Wall Street Journal', type: 'article', size: 'small' },
];

export default function MediaPanel() {
  return (
    <PageTemplate 
      title="MEDiA_SPoTLIGHT" 
      subtitle="Universal Press & Influencer Coverage"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
        {mediaItems.map((item, i) => {
          const isLarge = item.size === 'large';
          const isMedium = item.size === 'medium';
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden group cursor-pointer border border-[#143D36] bg-black/40 hover:border-[#43a881] transition-all ${
                isLarge ? 'md:col-span-2 md:row-span-2' : isMedium ? 'md:col-span-2' : ''
              }`}
            >
              {/* Filler Logo / Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="text-8xl font-black italic tracking-tighter uppercase whitespace-nowrap -rotate-12">
                  NEURUS<span className="text-[#43a881]">AGi</span>
                </div>
              </div>

              {/* Icon Overlay */}
              <div className="absolute top-4 left-4 z-10 p-2 bg-black/60 rounded-sm">
                {item.type === 'video' ? <Play size={16} className="text-[#43a881]" /> : <ImageIcon size={16} className="text-[#43a881]" />}
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                <p className="text-[10px] font-mono text-[#43a881] uppercase tracking-[0.3em] mb-2">{item.source}</p>
                <h3 className={`font-bold uppercase tracking-tight group-hover:text-[#43a881] transition-colors leading-tight ${
                  isLarge ? 'text-2xl' : 'text-sm'
                }`}>
                  {item.title}
                </h3>
              </div>
              
              {/* External Link Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={14} className="text-[#43a881]" />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-12 p-8 border-t border-[#143D36] flex flex-col items-center">
        <p className="text-[10px] font-mono text-[#A2AFA4] tracking-widest uppercase mb-6">Partner Registry Access</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
          {['BBC', 'CNN', 'REUTERS', 'CNBC', 'NYT', 'FT'].map(logo => (
            <span key={logo} className="text-xl font-black tracking-tighter">{logo}</span>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
