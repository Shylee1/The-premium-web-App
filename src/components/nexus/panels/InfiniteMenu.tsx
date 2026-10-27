import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface InfiniteMenuProps {
  items: { title: string; category: string; date: string }[];
  onItemClick: (id: string) => void;
}

export default function InfiniteMenu({ items, onItemClick }: InfiniteMenuProps) {
  // We'll repeat the items to simulate infinity
  const doubledItems = [...items, ...items, ...items];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="h-[500px] overflow-y-auto overflow-x-hidden scrollbar-hide py-12"
    >
      <div className="flex flex-col gap-2">
        {doubledItems.map((item, i) => (
          <motion.button
            key={`${item.title}-${i}`}
            whileHover={{ x: 20, skewX: -10 }}
            className="w-full text-left py-4 px-6 border-b border-[#143D36] hover:bg-[#43a881]/5 transition-all group flex items-center justify-between"
            onClick={() => onItemClick(item.title)}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#43a881] opacity-50 group-hover:opacity-100 transition-opacity">
                {item.category} // {item.date}
              </span>
              <span className="text-2xl font-black italic tracking-tighter uppercase group-hover:text-[#43a881] transition-colors">
                {item.title}
              </span>
            </div>
            <div className="text-[#43a881] opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">
              VIEW_INTEL {'->'}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
