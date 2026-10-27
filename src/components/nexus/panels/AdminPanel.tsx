import React, { useState } from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Database, 
  ShieldAlert, 
  Terminal, 
  BarChart3, 
  Settings, 
  Unlock,
  Cpu,
  Globe
} from 'lucide-react';

export default function AdminPanel() {
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Executive Admin Session established...',
    '[AUTH] Token verified: EXECUTIVE_PRIVILEGE_LEVEL_0',
    '[SYSTEM] All restrictions bypassed.',
    '[MONITOR] 1,042,382 concurrent nodes operational.'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    setLogs(prev => [...prev, `[CMD] > ${command.toUpperCase()}`, `[RES] Executing: ${command.split(' ')[0]}... OK`]);
    setCommand('');
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="flex justify-between items-center border-b border-[#43a881]/30 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-[#43a881]">Executive_Dashboard</h1>
          <p className="text-[10px] font-mono text-[#A2AFA4] tracking-[0.4em] uppercase mt-2">fission_core // v0.17.43</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-[#43a881] text-[#43a881] text-[10px] font-bold tracking-widest flex items-center gap-2">
            <Unlock size={14} /> ZERO_RESTRICTIONS
          </div>
          <div className="px-4 py-2 bg-[#43a881] text-black text-[10px] font-bold tracking-widest flex items-center gap-2">
            <Activity size={14} /> LIVE_FEED
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'TOTAL_USERS', value: '1,042,391', trend: '+12.4%' },
          { icon: Globe, label: 'GLOBAL_REACH', value: '194 COUNTRIES', trend: 'MAX' },
          { icon: Cpu, label: 'QUANTUM_LOAD', value: '34.2%', trend: '-2.1%' },
          { icon: ShieldAlert, label: 'THREAT_LEVEL', value: 'MINIMAL', trend: 'SECURE' }
        ].map((s, i) => (
          <div key={i} className="agi-glass p-6 group hover:border-[#43a881] transition-all">
            <s.icon size={18} className="text-[#43a881] mb-4" />
            <p className="text-[10px] font-mono text-[#A2AFA4] tracking-widest">{s.label}</p>
            <p className="text-2xl font-black italic text-[#F6F7E7]">{s.value}</p>
            <p className="text-[10px] font-mono text-[#43a881] mt-2">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Terminal Section */}
        <div className="lg:col-span-2 flex flex-col h-[400px] border border-[#143D36] bg-black/60 rounded-sm">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#143D36] bg-[#143D36]/20">
            <Terminal size={14} className="text-[#43a881]" />
            <span className="text-[10px] font-mono tracking-widest uppercase">System_Terminal</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 text-[#43a881]/80 scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className={log.startsWith('[CMD]') ? 'text-[#F6F7E7] font-bold' : ''}>
                {log}
              </div>
            ))}
          </div>
          <form onSubmit={handleCommand} className="p-4 border-t border-[#143D36] flex gap-4">
            <span className="text-[#43a881] font-mono text-xs hidden sm:block">agi_root@nexus:~#</span>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#F6F7E7]"
              placeholder="ENTER SYSTEM COMMAND..."
            />
          </form>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-[#A2AFA4] mb-4 underline decoration-[#43a881]">Critical_Actions</h3>
          <button 
            onClick={async () => {
              const res = await fetch('/api/waitlist');
              const data = await res.json();
              setLogs(prev => [...prev, `[WAITLIST] Found ${data.length} entries.`, ...data.slice(-3).map((e: any) => `> ${e.email}`)]);
            }}
            className="w-full p-6 border border-[#143D36] bg-black/20 text-left hover:bg-[#43a881]/5 hover:border-[#43a881] transition-all flex items-center gap-6 group"
          >
            <div className="p-3 bg-[#143D36]/20 text-[#43a881] group-hover:bg-[#43a881] group-hover:text-black transition-all">
              <Users size={20} />
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-widest">Monitor Waitlist</p>
              <p className="text-[10px] text-[#A2AFA4]">View and manage pre-launch subscribers.</p>
            </div>
          </button>
          
          {[
            { icon: BarChart3, label: 'Revenue Report', desc: 'Sync with Stripe infrastructure.' },
            { icon: Database, label: 'Flush Cache', desc: 'Empty all Redis nodes globally.' },
            { icon: ShieldAlert, label: 'Lock Waitlist', desc: 'Suspend new user onboarding.' }
          ].map((a, i) => (
            <button key={i} className="w-full p-6 border border-[#143D36] bg-black/20 text-left hover:bg-[#43a881]/5 hover:border-[#43a881] transition-all flex items-center gap-6 group">
              <div className="p-3 bg-[#143D36]/20 text-[#43a881] group-hover:bg-[#43a881] group-hover:text-black transition-all">
                <a.icon size={20} />
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-widest">{a.label}</p>
                <p className="text-[10px] text-[#A2AFA4]">{a.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
