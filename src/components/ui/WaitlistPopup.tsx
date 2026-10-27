import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'isomorphic-dompurify';

export default function WaitlistPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('neurus_subscribed')) {
        setIsVisible(true);
      }
    }, 60000); // 1 minute loiter trigger

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = DOMPurify.sanitize(email);
    
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: sanitizedEmail,
          behavior: 'Technical/High', // Mocked behavior
          loiterTime: '1:00'
        })
      });
      setSubmitted(true);
      localStorage.setItem('neurus_subscribed', 'true');
      setTimeout(() => setIsVisible(false), 2000);
    } catch (err) {
      console.error('Failed to join waitlist', err);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020607]/90 backdrop-blur-xl"
      >
        <div className="bg-black border-2 border-[#143D36] p-12 max-w-lg relative text-center shadow-[0_0_50px_rgba(67,168,129,0.2)]">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-6 text-4xl text-[#A2AFA4] hover:text-[#F6F7E7] cursor-pointer"
            aria-label="Close popup"
          >
            ×
          </button>
          
          {submitted ? (
            <div className="text-[#43a881] text-2xl font-mono">WAiTLisT JOiNED SUCCESsFULLY.</div>
          ) : (
            <>
              <h2 className="text-[#F6F7E7] text-3xl font-bold mb-4 italic tracking-tighter uppercase">
                Join the Neurus<span className="text-[#43a881]">AGi</span> Waitlist
              </h2>
              <p className="text-[#A2AFA4] mb-8 text-xs font-mono tracking-widest uppercase">
                Sign up to get early access to our enterprise AGi platform — get updates on our global launch.
              </p>
              <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#143D36] p-3 text-[#F6F7E7] focus:border-[#43a881] outline-none font-mono transition text-center"
                  placeholder="ENTER_EMAIL_ADDrESS..."
                />
                <button 
                  type="submit"
                  className="w-full mt-8 bg-[#143D36] text-[#F6F7E7] py-4 font-bold hover:bg-[#43a881] transition tracking-widest cursor-pointer uppercase text-xs"
                >
                  JOIN_WAiTLisT
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
