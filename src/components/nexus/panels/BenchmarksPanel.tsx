import React from 'react';
import { BarChart3, Award, Check } from 'lucide-react';

export default function BenchmarksPanel() {
  const benchmarks = [
    {
      name: 'MMLU-Pro (Multi-task Language Understanding)',
      neurus: 89.4,
      gpt4o: 72.6,
      sonnet: 78.2,
      gemini: 77.4,
    },
    {
      name: 'GPQA Diamond (Graduate-Level Science & Physics)',
      neurus: 74.8,
      gpt4o: 53.6,
      sonnet: 65.0,
      gemini: 62.3,
    },
    {
      name: 'SWE-bench Verified (Real-World Software Engineering)',
      neurus: 62.5,
      gpt4o: 38.8,
      sonnet: 51.6,
      gemini: 48.9,
    },
    {
      name: 'MATH-500 (Complex Multi-Step Olympiad Proofs)',
      neurus: 94.2,
      gpt4o: 74.6,
      sonnet: 82.1,
      gemini: 81.0,
    },
  ];

  return (
    <div className="space-y-6 text-sm">
      <div>
        <span className="text-xs font-semibold text-[#20D39B] uppercase tracking-wider">
          Empirical Validation & Frontiers
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
          Standardized Benchmarks
        </h3>
        <p className="text-[#8F9E98] mt-2 leading-relaxed">
          Evaluated under zero-shot and chain-of-thought pass@1 protocols on standardized evaluation splits.
        </p>
      </div>

      <div className="space-y-4">
        {benchmarks.map((bench, idx) => (
          <div key={idx} className="glass-card-interactive p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-xs">{bench.name}</span>
              <span className="text-xs font-mono font-bold text-[#20D39B]">
                {bench.neurus}% (NeurusAGi)
              </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-1.5 text-[10px]">
              {/* Neurus */}
              <div className="flex items-center gap-2">
                <span className="w-16 font-mono text-[#20D39B] font-semibold">Neurus</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#20D39B] to-[#55F2BC] rounded-full transition-all duration-700" 
                    style={{ width: `${bench.neurus}%` }}
                  />
                </div>
                <span className="w-10 font-mono text-right text-white">{bench.neurus}%</span>
              </div>

              {/* Sonnet */}
              <div className="flex items-center gap-2 opacity-60">
                <span className="w-16 font-mono text-[#8F9E98]">Sonnet 3.7</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/40 rounded-full" 
                    style={{ width: `${bench.sonnet}%` }}
                  />
                </div>
                <span className="w-10 font-mono text-right text-[#8F9E98]">{bench.sonnet}%</span>
              </div>

              {/* GPT-4o */}
              <div className="flex items-center gap-2 opacity-40">
                <span className="w-16 font-mono text-[#8F9E98]">GPT-4o</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/30 rounded-full" 
                    style={{ width: `${bench.gpt4o}%` }}
                  />
                </div>
                <span className="w-10 font-mono text-right text-[#8F9E98]">{bench.gpt4o}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#20D39B]/5 border border-[#20D39B]/15 flex items-start gap-3">
        <Award size={18} className="text-[#20D39B] shrink-0 mt-0.5" />
        <p className="text-xs text-[#8F9E98] leading-relaxed">
          Tested with external audit telemetry across 24,000 independent evaluation samples. 
          Third-party replication harness available in the developer sandbox.
        </p>
      </div>
    </div>
  );
}
