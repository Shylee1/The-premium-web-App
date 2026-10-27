import React from 'react';
import { Check, ShieldCheck, Zap, Server } from 'lucide-react';
import { useNexusStore } from '../../../stores/nexusStore';

export default function PricingPanel() {
  const setActivePanel = useNexusStore((state) => state.setActivePanel);

  const tiers = [
    {
      name: 'Developer Sandbox',
      price: '$0',
      period: 'Prototyping & Research',
      description: 'Full access to cloud-hosted neuromorphic simulation endpoints with rate-limited quota.',
      features: [
        '50,000 synaptic inferences / month',
        'Shared GPU/NPU cluster runtime',
        'Standard TypeScript & Python SDKs',
        'Community discord support',
      ],
      cta: 'Explore SDK',
      highlight: false,
    },
    {
      name: 'Dedicated Enterprise Cluster',
      price: '$2,400',
      period: 'per month / per node',
      description: 'Dedicated isolated hardware with guaranteed 99.99% SLA and microsecond latency guarantees.',
      features: [
        'Unlimited real-time synaptic inference',
        'Dedicated multi-node neuromorphic VPC',
        'Custom domain model fine-tuning',
        '24/7 dedicated solutions engineering',
        '99.99% uptime SLA guarantee',
      ],
      cta: 'Provision Cluster',
      highlight: true,
    },
    {
      name: 'Sovereign Air-Gapped',
      price: 'Custom',
      period: 'On-premise / Defense',
      description: 'Full on-premise hardware deployment inside classified or sovereign air-gapped facilities.',
      features: [
        'Zero external telemetry or network egress',
        'Hardware Security Module (HSM) attestation',
        'Custom physical server appliances',
        'SCIF-compliant deployment support',
      ],
      cta: 'Contact Sovereign Desk',
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6 text-sm">
      <div>
        <span className="text-xs font-semibold text-[#20D39B] uppercase tracking-wider">
          Transparent Commercial Licensing
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
          Infrastructure Deployment Tiers
        </h3>
        <p className="text-[#8F9E98] mt-2 leading-relaxed">
          From developer sandbox experimentation to multi-datacenter air-gapped sovereign clusters.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl transition-all relative ${
              tier.highlight
                ? 'bg-[#0E2820]/80 border-2 border-[#20D39B] shadow-[0_0_30px_rgba(32,211,155,0.15)]'
                : 'glass-card-interactive'
            }`}
          >
            {tier.highlight && (
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#20D39B] text-[#030708] text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <h4 className="text-lg font-bold text-white">{tier.name}</h4>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white">{tier.price}</span>
              <span className="text-xs text-[#8F9E98]">{tier.period}</span>
            </div>
            <p className="text-xs text-[#8F9E98] mt-2 leading-relaxed">
              {tier.description}
            </p>

            <ul className="mt-4 space-y-2 text-xs">
              {tier.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2 text-[#D1D9D5]">
                  <Check size={14} className="text-[#20D39B] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setActivePanel('waitlist')}
              className={`w-full mt-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                tier.highlight
                  ? 'bg-[#20D39B] text-[#030708] hover:bg-[#55F2BC]'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
