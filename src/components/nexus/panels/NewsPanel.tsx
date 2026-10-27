import React, { useState } from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, ChevronLeft, ArrowRight } from 'lucide-react';
import InfiniteMenu from './InfiniteMenu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
  featured?: boolean;
}

const newsData: NewsItem[] = [
  { id: '1', title: 'Neurus_AGi Achieves Universal Penetration', excerpt: 'The latest compute benchmarks confirm...', date: '2026-05-08', category: 'GLOBAL_NEWS', content: 'Detailed report on NeurusAGi penetration across 11 sectors. The architecture allows for seamless integration into existing legacy systems while maintaining air-gapped security protocols.', featured: true },
  { id: '2', title: 'The Future of Quantum Data Storage', excerpt: 'Solving the data storage Crisis with...', date: '2026-05-07', category: 'TECH', content: 'Technical breakdown of the cellular licensing protocol. Exabytes of data can now be housed in megabytes of physical space.', featured: true },
  { id: '3', title: 'Why LLMs Are Not AGi', excerpt: 'Jeremy Taylor explains the fundamental...', date: '2026-05-05', category: 'RESEARCH', content: 'Comprehensive analysis on why token prediction models fail at generalization, and how NeurusAGi solves for the reasoning gap.' },
];

export default function NewsPanel() {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const featuredItems = newsData.filter(item => item.featured);

  return (
    <PageTemplate 
      title="SYSTeM_iNTEL" 
      subtitle={selectedArticle ? selectedArticle.title : "Universal Intelligence Stream"}
    >
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Featured Carousel */}
            <div className="relative h-[300px] border border-[#43a881]/20 overflow-hidden rounded-sm">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-full"
              >
                {featuredItems.map(item => (
                  <SwiperSlide key={item.id}>
                    <div className="relative h-full w-full p-12 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                      <div className="absolute top-8 right-8 px-3 py-1 border border-[#43a881] text-[#43a881] text-[8px] font-mono tracking-widest uppercase">
                        FEATURED_REPORT
                      </div>
                      <p className="text-[10px] font-mono text-[#43a881] tracking-[0.3em] uppercase mb-4">{item.category}</p>
                      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4 max-w-2xl">{item.title}</h2>
                      <button 
                        onClick={() => setSelectedArticle(item)}
                        className="w-fit flex items-center gap-3 text-[#43a881] text-[10px] font-bold tracking-[0.4em] uppercase hover:gap-6 transition-all"
                      >
                        initialize_read <ArrowRight size={14} />
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="space-y-8">
              <div className="p-4 border border-[#143D36] bg-[#143D36]/10 flex items-center gap-4">
                <Search size={18} className="text-[#43a881]" />
                <input type="text" placeholder="QUERY_INTEL_DB..." className="bg-transparent border-none outline-none font-mono text-xs text-[#F6F7E7] w-full" />
              </div>
              
              <InfiniteMenu 
                items={newsData} 
                onItemClick={(title) => setSelectedArticle(newsData.find(n => n.title === title) || null)} 
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="article"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-[#43a881] text-[10px] font-bold tracking-widest hover:translate-x-[-4px] transition-transform"
            >
              <ChevronLeft size={14} /> BACK_TO_STREAM
            </button>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-[#43a881]/10 text-[#43a881] text-[10px] font-mono tracking-widest border border-[#43a881]/20">
                  {selectedArticle.category} // {selectedArticle.date}
                </span>
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">{selectedArticle.title}</h2>
              <div className="pt-8 text-[#A2AFA4] leading-relaxed space-y-6 max-w-3xl">
                 <p className="text-xl font-mono opacity-80 border-l-2 border-[#43a881] pl-6 mb-8 italic">
                  {selectedArticle.excerpt}
                </p>
                {selectedArticle.content.split('. ').map((p, i) => (
                  <p key={i} className="text-lg">{p}.</p>
                ))}
              </div>
              
              <div className="mt-12 p-8 border border-[#143D36] bg-[#143D36]/10">
                <p className="text-[10px] font-mono text-[#43a881] tracking-widest uppercase mb-4">Verification Signature</p>
                <div className="h-px w-full bg-[#143D36] mb-4" />
                <p className="text-[8px] font-mono text-[#A2AFA4] break-all opacity-40">
                  SHA256: 4e6f64655f49443a204147695f434f52455f3031202f2f2053595354454d5f4c4f475f32303236
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTemplate>
  );
}
