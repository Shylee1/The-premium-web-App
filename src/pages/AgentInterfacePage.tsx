import React, { useState, useRef, useEffect } from 'react';
import PageTemplate from '../components/ui/PageTemplate';
import { motion } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export default function AgentInterfacePage() {
  const [activeTab, setActiveTab] = useState<'text' | 'call' | 'email' | 'ar'>('text');
  
  const [textInput, setTextInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([
    { role: 'agi', text: 'Secure channel established. How may I assist with your strategic objectives today?' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [emailSubject, setEmailSubject] = useState('');
  const [emailPayload, setEmailPayload] = useState('');

  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState('READY');

  const handleCallInitiate = () => {
    setIsCalling(true);
    setCallStatus('CONNECTING...');
    setTimeout(() => {
      setCallStatus('CONNECTED - SECURE CHANNEL');
    }, 2000);
  };

  const handleCallEnd = () => {
    setCallStatus('DISCONNECTING...');
    setTimeout(() => {
      setIsCalling(false);
      setCallStatus('READY');
    }, 1000);
  };

  const [arStatus, setArStatus] = useState('DISCONNECTED');
  const [activeDevice, setActiveDevice] = useState<string | null>(null);

  const handleArConnect = (device: string) => {
    setActiveDevice(device);
    setArStatus('INITIALIZING HANDSHAKE...');
    setTimeout(() => {
      setArStatus('CALIBRATING SPATIAL ANCHORS...');
      setTimeout(() => {
        setArStatus(`CONNECTED TO ${device}`);
      }, 1500);
    }, 1500);
  };

  const handleArDisconnect = () => {
    setArStatus('DISCONNECTING...');
    setTimeout(() => {
      setActiveDevice(null);
      setArStatus('DISCONNECTED');
    }, 1000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isThinking]);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    const sanitized = DOMPurify.sanitize(textInput);
    
    const newHistory = [...chatHistory, { role: 'user', text: sanitized }];
    setChatHistory(newHistory);
    setTextInput('');
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: sanitized,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          systemInstruction: 'You are NeurusAGI, an advanced Artificial General Intelligence developed by Jeremy Taylor. You are communicating with a user through a secure, encrypted terminal. You are highly intelligent, professional, and focused on strategic objectives, national security, and enterprise solutions.'
        }
      });

      setChatHistory([...newHistory, { role: 'agi', text: response.text || '' }]);
    } catch (error) {
      console.error('AGI Chat Error:', error);
      setChatHistory([...newHistory, { role: 'agi', text: 'ERROR: CONNECTION TO AGI CORE LOST.' }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleEmailSubmit = () => {
    const sanitizedSubject = DOMPurify.sanitize(emailSubject);
    const sanitizedPayload = DOMPurify.sanitize(emailPayload);
    console.log('Sending email:', { subject: sanitizedSubject, payload: sanitizedPayload });
    setEmailSubject('');
    setEmailPayload('');
  };

  return (
    <PageTemplate 
      title="AGI Interface" 
      subtitle="Multi-modal communication with the NeurusAGI Core."
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex border-b border-[#143D36] mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('text')}
            className={`px-8 py-4 font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'text' ? 'text-[#43a881] border-b-2 border-[#43a881]' : 'text-[#A2AFA4] hover:text-[#F6F7E7]'}`}
          >
            Secure Text
          </button>
          <button 
            onClick={() => setActiveTab('call')}
            className={`px-8 py-4 font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'call' ? 'text-[#43a881] border-b-2 border-[#43a881]' : 'text-[#A2AFA4] hover:text-[#F6F7E7]'}`}
          >
            Voice/Call
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`px-8 py-4 font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'email' ? 'text-[#43a881] border-b-2 border-[#43a881]' : 'text-[#A2AFA4] hover:text-[#F6F7E7]'}`}
          >
            Encrypted Email
          </button>
          <button 
            onClick={() => setActiveTab('ar')}
            className={`px-8 py-4 font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${activeTab === 'ar' ? 'text-[#43a881] border-b-2 border-[#43a881]' : 'text-[#A2AFA4] hover:text-[#F6F7E7]'}`}
          >
            AR Projection
          </button>
        </div>

        <div className="bg-black/40 border border-[#143D36] p-8 min-h-[500px] flex flex-col relative overflow-hidden backdrop-blur-md">
          {activeTab === 'text' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-[#143D36] pr-2">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className={`text-[10px] mb-1 font-mono ${msg.role === 'user' ? 'text-[#A2AFA4]' : 'text-[#43a881]'}`}>
                      {msg.role === 'user' ? 'USER_TERMINAL' : 'NEURUS_AGI'}
                    </span>
                    <div className={`p-4 max-w-[80%] ${msg.role === 'user' ? 'bg-[#143D36] text-[#F6F7E7] rounded-l-xl rounded-tr-xl' : 'bg-[#020607] border border-[#143D36] text-[#A2AFA4] rounded-r-xl rounded-bl-xl'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] mb-1 text-[#43a881] font-mono">NEURUS_AGI</span>
                    <div className="p-4 bg-[#020607] border border-[#143D36] text-[#43a881] rounded-r-xl rounded-bl-xl animate-pulse font-mono text-sm">
                      [PROCESSING_QUANTUM_HEURISTICS...]
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                  placeholder="Enter command or query..." 
                  className="w-full bg-[#020607] border border-[#143D36] p-4 text-[#F6F7E7] focus:border-[#43a881] outline-none font-mono transition pr-16"
                />
                <button 
                  onClick={handleTextSubmit}
                  className="absolute right-2 top-2 bottom-2 bg-[#143D36] px-4 text-[#43a881] hover:bg-[#43a881] hover:text-black transition font-bold"
                >
                  SEND
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'call' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
              <div className={`w-32 h-32 rounded-full border-2 ${isCalling ? 'border-red-500' : 'border-[#43a881]'} flex items-center justify-center mb-8 relative transition-colors`}>
                {isCalling && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-20"></div>
                    <div className="absolute inset-2 rounded-full border border-red-500 animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
                {!isCalling && (
                  <>
                    <div className="absolute inset-0 rounded-full border border-[#43a881] animate-ping opacity-20"></div>
                    <div className="absolute inset-2 rounded-full border border-[#43a881] animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
                <span className="text-4xl">🎙️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#F6F7E7] mb-2">Voice Interface</h3>
              <p className="text-[#43a881] font-mono text-sm mb-8 animate-pulse">
                STATUS: {callStatus}
              </p>
              <p className="text-[#A2AFA4] max-w-md mb-8">
                Initiate a secure VoIP call with the NeurusAGI core. The system processes natural language with zero latency and full contextual awareness.
              </p>
              {!isCalling ? (
                <button 
                  onClick={handleCallInitiate}
                  className="px-8 py-4 bg-[#43a881] text-black font-bold tracking-widest hover:bg-white transition"
                >
                  INITIATE CALL
                </button>
              ) : (
                <button 
                  onClick={handleCallEnd}
                  className="px-8 py-4 bg-red-600 text-white font-bold tracking-widest hover:bg-red-500 transition"
                >
                  TERMINATE CONNECTION
                </button>
              )}
            </motion.div>
          )}

          {activeTab === 'email' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-[#F6F7E7] mb-6">Encrypted Dispatch</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-mono text-[#A2AFA4] mb-1">TO:</label>
                  <input type="text" value="core@neurusagi.com" disabled className="w-full bg-[#020607] border border-[#143D36] p-3 text-[#43a881] font-mono opacity-70" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#A2AFA4] mb-1">SUBJECT:</label>
                  <input 
                    type="text" 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Strategic Analysis Request..." 
                    className="w-full bg-[#020607] border border-[#143D36] p-3 text-[#F6F7E7] focus:border-[#43a881] outline-none transition" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-mono text-[#A2AFA4] mb-1">PAYLOAD:</label>
                  <textarea 
                    value={emailPayload}
                    onChange={(e) => setEmailPayload(e.target.value)}
                    placeholder="Enter detailed parameters..." 
                    className="w-full h-48 bg-[#020607] border border-[#143D36] p-3 text-[#F6F7E7] focus:border-[#43a881] outline-none transition resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleEmailSubmit}
                  className="px-8 py-4 bg-[#143D36] text-[#43a881] font-bold tracking-widest hover:bg-[#43a881] hover:text-black transition"
                >
                  ENCRYPT & SEND
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'ar' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center relative">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ar/800/600')] opacity-20 bg-cover bg-center mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
              
              <div className="relative z-10 p-8 border border-[#43a881]/30 bg-black/60 backdrop-blur-sm w-full max-w-2xl">
                <h3 className="text-3xl font-bold text-[#F6F7E7] mb-2">Holographic Projection</h3>
                <p className="text-[#43a881] font-mono text-sm mb-6 animate-pulse">
                  STATUS: {arStatus}
                </p>
                <p className="text-[#A2AFA4] max-w-md mb-8 mx-auto">
                  Project NeurusAGI data visualizations, 3D models, and real-time analytics directly into your physical environment using compatible AR hardware.
                </p>
                
                {!activeDevice ? (
                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => handleArConnect('VISION PRO')}
                      className="px-6 py-3 border border-[#43a881] text-[#43a881] hover:bg-[#43a881]/10 transition font-mono text-sm"
                    >
                      CONNECT VISION PRO
                    </button>
                    <button 
                      onClick={() => handleArConnect('META QUEST')}
                      className="px-6 py-3 border border-[#43a881] text-[#43a881] hover:bg-[#43a881]/10 transition font-mono text-sm"
                    >
                      CONNECT META QUEST
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-full h-32 border border-[#43a881]/50 mb-6 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#43a881]/10 animate-pulse"></div>
                      <div className="w-full h-[1px] bg-[#43a881] absolute top-1/2 animate-[ping_2s_ease-in-out_infinite]"></div>
                      <span className="text-[#43a881] font-mono text-xs z-10">AWAITING SPATIAL DATA STREAM...</span>
                    </div>
                    <button 
                      onClick={handleArDisconnect}
                      className="px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500/10 transition font-mono text-sm"
                    >
                      DISCONNECT {activeDevice}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
}
