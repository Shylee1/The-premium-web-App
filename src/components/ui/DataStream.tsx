import React, { useState, useEffect } from 'react';

export default function DataStream() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.random().toString(16).substr(2, 8).toUpperCase();
      const status = ['OK', 'SYNC', 'WARN', 'PROC'][Math.floor(Math.random() * 4)];
      const newLine = `[${new Date().toISOString().substr(11, 8)}] 0x${hex} :: ${status}`;
      
      setLines(prev => {
        const newLines = [...prev, newLine];
        if (newLines.length > 10) newLines.shift();
        return newLines;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] text-[#43a881] opacity-70 flex flex-col justify-end h-full overflow-hidden">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap animate-pulse">
          {line}
        </div>
      ))}
    </div>
  );
}
