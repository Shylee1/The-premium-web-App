import React from 'react';
import { Layers, Cpu, ShieldCheck, Network, Lock, GitBranch } from 'lucide-react';

export default function ArchitecturePanel() {
  const layers = [
    {
      title: 'Neuromorphic Routing Mesh',
      desc: 'Sub-millisecond packet routing across 158 industrial verticals using asynchronous spike-timing dependent plasticity (STDP).',
      metric: '0.42ms Latency',
      icon: Network,
    },
    {
      title: 'Air-Gapped Sovereign Enclaves',
      desc: 'Zero telemetry exfiltration. Cryptographic proof of execution running inside sovereign hardware security modules (HSMs).',
      metric: 'EAL6+ Certified',
      icon: Lock,
    },
    {
      title: 'Cross-Domain Reasoning Tensor',
      desc: 'Simultaneous constraint satisfaction synthesizing biochemistry, regulatory frameworks, and algorithmic market logistics.',
      metric: '10^18 Flops / Node',
      icon: Cpu,
    },
    {
      title: 'Self-Correcting Verification Loops',
      desc: 'Formal verification theorem-proving engine validating autonomous agent tool invocations before physical or financial execution.',
      metric: '99.999% Reliability',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-8 text-sm">
      <div>
        <span className="text-xs font-semibold text-[#20D39B] uppercase tracking-wider">
          System Whitepaper & Specification
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
          Cognitive Neuromorphic Fabric
        </h3>
        <p className="text-[#8F9E98] mt-2 leading-relaxed">
          NeurusAGi abandons monolithic transformer scaling in favor of a distributed neuromorphic substrate. 
          By unifying memory and arithmetic logic into localized synaptic clusters, model inference operates at 1/40th 
          the power budget of conventional tensor accelerators with zero cold-start latency.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {layers.map((layer, idx) => {
          const Icon = layer.icon;
          return (
            <div key={idx} className="glass-card-interactive p-5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0C2B22] border border-[#20D39B]/30 flex items-center justify-center text-[#20D39B]">
                    <Icon size={16} />
                  </div>
                  <h4 className="font-semibold text-white">{layer.title}</h4>
                </div>
                <span className="text-xs font-mono text-[#20D39B] px-2 py-0.5 rounded bg-[#20D39B]/10 border border-[#20D39B]/20">
                  {layer.metric}
                </span>
              </div>
              <p className="text-xs text-[#8F9E98] leading-relaxed pl-11">
                {layer.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <GitBranch size={14} className="text-[#20D39B]" />
          Deployment Topology
        </div>
        <p className="text-xs text-[#8F9E98] leading-relaxed">
          Available for on-premise sovereign clusters, multi-cloud VPC peering, or dedicated edge hardware appliance nodes.
        </p>
      </div>
    </div>
  );
}
