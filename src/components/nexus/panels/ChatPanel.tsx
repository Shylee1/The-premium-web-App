import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { Send, Sparkles, User, Bot, Loader2, ArrowUpRight } from 'lucide-react';
import { useNexusStore } from '../../../stores/nexusStore';
import { sanitize } from '../../../lib/sanitize';

const metaEnv = (import.meta as any).env;
const API_KEY = metaEnv?.VITE_GEMINI_API_KEY || '';

let genAIClient: GoogleGenAI | null = null;
if (API_KEY) {
  try {
    genAIClient = new GoogleGenAI({ apiKey: API_KEY });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to the NeurusAGi intelligence console. I can break down our neuromorphic architecture, provide technical benchmark verifications, or outline enterprise deployment models. What would you like to explore?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const setAGiState = useNexusStore((state) => state.setAGiState);

  const suggestedPrompts = [
    'How does neuromorphic routing differ from standard transformers?',
    'What are the verified benchmarks on SWE-bench and MMLU-Pro?',
    'Explain the air-gapped sovereign deployment model',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const rawText = textToSend || input;
    const cleanInput = rawText.trim();
    if (!cleanInput || isLoading) return;

    const userMessage = sanitize(cleanInput);
    if (!userMessage) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setAGiState('thinking');

    try {
      if (genAIClient && API_KEY) {
        const response = await genAIClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userMessage,
          config: {
            systemInstruction: 'You are NeurusAGi, an authoritative, sophisticated artificial general intelligence platform built on neuromorphic synaptic routing, formal verification theorem-proving, and sovereign air-gapped clusters. Respond concisely, authoritatively, and eloquently with deep technical precision. Avoid sci-fi clichés, robotic tags, or emojis.'
          }
        });
        const text = response.text || 'Inference completed with null token payload.';
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      } else {
        // High-fidelity domain-aware simulated response
        await new Promise(resolve => setTimeout(resolve, 750));
        let responseText = '';
        const lower = userMessage.toLowerCase();

        if (lower.includes('benchmark') || lower.includes('swe') || lower.includes('mmlu')) {
          responseText = 'NeurusAGi achieved 89.4% on MMLU-Pro and 62.5% on SWE-bench Verified pass@1. Unlike dense autoregressive decoders, our spike-timing-dependent architecture evaluates cross-domain deductions with deterministic theorem-proving passes, preventing hallucination in high-consequence reasoning.';
        } else if (lower.includes('air-gap') || lower.includes('security') || lower.includes('sovereign')) {
          responseText = 'The sovereign enclave architecture executes within dedicated Hardware Security Modules (HSMs) with EAL6+ certification. All synaptic weight updates and intermediate activations are calculated within zero-trust memory boundaries. No weights or runtime telemetry leave the physical perimeter.';
        } else if (lower.includes('transformer') || lower.includes('neuromorphic') || lower.includes('differ')) {
          responseText = 'Standard transformer architectures require O(N²) quadratic attention over static token vectors. NeurusAGi utilizes asynchronous event-driven synaptic routing. Computation occurs exclusively when state delta thresholds are crossed, reducing inference power by 97.5% and achieving sub-millisecond execution latencies.';
        } else {
          responseText = `Addressing query on: "${userMessage}". The Neurus neuromorphic core synthesizes empirical constraints across all 158 global industrial sectors. Every output undergoes formal constraint validation prior to dispatch.`;
        }

        setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      }
      setAGiState('speaking');
      setTimeout(() => setAGiState('idle'), 2200);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Neural connection experienced a transient timeout. Localized core remains intact.' }
      ]);
      setAGiState('error');
      setTimeout(() => setAGiState('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] text-sm">
      {/* Header Info */}
      <div className="pb-3 mb-2 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#20D39B] animate-pulse" />
          <span className="text-xs font-semibold text-white">Active Reasoning Channel</span>
        </div>
        <span className="text-[11px] font-mono text-[#8F9E98]">Gemini 2.5 Flash Engine</span>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-[#20D39B] text-[#030708]' 
                : 'bg-[#0C2B22] border border-[#20D39B]/30 text-[#20D39B]'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
            </div>
            <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#20D39B]/15 text-white border border-[#20D39B]/30'
                : 'bg-white/[0.04] text-[#D1D9D5] border border-white/5'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#0C2B22] border border-[#20D39B]/30 text-[#20D39B] flex items-center justify-center">
              <Sparkles size={14} className="animate-spin" />
            </div>
            <div className="bg-white/[0.04] border border-white/5 p-3 rounded-2xl flex items-center gap-2 text-xs text-[#8F9E98]">
              <Loader2 size={13} className="animate-spin text-[#20D39B]" />
              <span>Synthesizing neural deduction...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested chips (when only 1 assistant message) */}
      {messages.length === 1 && (
        <div className="py-2 flex flex-col gap-1.5">
          <span className="text-[10px] text-[#8F9E98] uppercase font-semibold tracking-wider">
            Suggested Prompts
          </span>
          <div className="flex flex-col gap-1">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-left text-xs p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-[#8F9E98] hover:text-white border border-white/5 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>{prompt}</span>
                <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 text-[#20D39B] transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="mt-3 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about architecture, benchmarks, or deployments..."
          className="flex-1 bg-transparent border-none outline-none text-white px-3 py-2 text-xs placeholder:text-[#8F9E98]/60"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          aria-label="Send query"
          className="p-2 rounded-lg bg-[#20D39B] text-[#030708] hover:bg-[#55F2BC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
