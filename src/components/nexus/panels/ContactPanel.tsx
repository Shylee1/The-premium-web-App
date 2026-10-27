import React, { useState } from 'react';
import PageTemplate from '../../ui/PageTemplate';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Headphones } from 'lucide-react';

export default function ContactPanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', formData);
    alert('Signal broadcasted. Standard response window: 48-72h.');
  };

  return (
    <PageTemplate 
      title="TERMHiNAL_CONTACT" 
      subtitle="Encrypted Communication Channels"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-[#A2AFA4] leading-relaxed">
            Direct communication with the NeurusAGi core team is restricted to verified nodes. Use the forms below to initiate a handshake for technical support, partnership inquiries, or general terminal access.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-[#143D36]/20 border border-[#143D36] text-[#43a881] group-hover:bg-[#43a881] group-hover:text-black transition-all">
                <Headphones size={20} />
              </div>
              <div>
                <p className="text-[10px] text-[#A2AFA4] uppercase tracking-widest">Technical Support</p>
                <p className="text-sm font-bold font-mono">support@neurusagi.tech</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-[#143D36]/20 border border-[#143D36] text-[#43a881] group-hover:bg-[#43a881] group-hover:text-black transition-all">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="text-[10px] text-[#A2AFA4] uppercase tracking-widest">Media & Press</p>
                <p className="text-sm font-bold font-mono">media@neurusagi.tech</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-[#143D36]/20 border border-[#143D36] text-[#43a881] group-hover:bg-[#43a881] group-hover:text-black transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] text-[#A2AFA4] uppercase tracking-widest">General Inquiry</p>
                <p className="text-sm font-bold font-mono">core@neurusagi.tech</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="agi-glass p-8 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-[#43a881] uppercase">Full_Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-[#143D36]/10 border border-[#143D36] p-4 text-sm font-mono focus:border-[#43a881] outline-none transition-all"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-[#43a881] uppercase">Secure_Email</label>
            <input 
              required
              type="email" 
              className="w-full bg-[#143D36]/10 border border-[#143D36] p-4 text-sm font-mono focus:border-[#43a881] outline-none transition-all"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-[#43a881] uppercase">Dispatch_Subject</label>
            <select 
              className="w-full bg-[#143D36]/10 border border-[#143D36] p-4 text-sm font-mono focus:border-[#43a881] outline-none transition-all text-[#A2AFA4]"
              onChange={e => setFormData({...formData, subject: e.target.value})}
            >
              <option value="general">GENERAL_INQUIRY</option>
              <option value="support">TECHNICAL_SUPPORT</option>
              <option value="media">MEDIA_SIGNAL</option>
              <option value="partner">PARTNERSHIP_PROPOSAL</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-widest text-[#43a881] uppercase">Payload_Message</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-[#143D36]/10 border border-[#143D36] p-4 text-sm font-mono focus:border-[#43a881] outline-none transition-all resize-none"
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button className="w-full py-4 bg-[#143D36]/40 border border-[#43a881] text-[#43a881] font-bold uppercase tracking-[0.3em] hover:bg-[#43a881] hover:text-black transition-all flex items-center justify-center gap-3 group">
            BROADCAST_MESSAGE <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </PageTemplate>
  );
}
