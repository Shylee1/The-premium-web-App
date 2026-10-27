import React, { useState, useEffect } from 'react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export default function AdminDashboard() {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // News & Announcements state
  const [newsType, setNewsType] = useState('pdf');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsContent, setNewsContent] = useState('');
  
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementMedia, setAnnouncementMedia] = useState('');

  useEffect(() => {
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => setWaitlist(data));
  }, []);

  const sendBulkMessage = async () => {
    await fetch('/api/admin/bulk-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Update from NeurusAGI' })
    });
    alert('Bulk message deployed.');
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: newsType, title: newsTitle, url: newsUrl, content: newsContent })
    });
    alert('News item added.');
    setNewsTitle(''); setNewsUrl(''); setNewsContent('');
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: announcementTitle, content: announcementContent, mediaUrl: announcementMedia })
    });
    alert('Announcement deployed.');
    setAnnouncementTitle(''); setAnnouncementContent(''); setAnnouncementMedia('');
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', text: chatInput }];
    setChatHistory(newHistory);
    setChatInput('');
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: chatInput,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          systemInstruction: 'You are the NeurusAGI Executive Admin Assistant. You manage waitlists, analyze metrics, and assist the CEO Jeremy Taylor. You are a highly advanced AGI.'
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

  return (
    <div className="p-8 min-h-screen text-[#F6F7E7] pt-32">
      <header className="flex justify-between items-center border-b border-[#143D36] pb-6 mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold italic">EXECUTIVE ADMIN CORE</h1>
        <div className="flex gap-4">
          <button className="bg-[#143D36] px-4 py-2 text-xs font-bold hover:bg-[#43a881] transition">DEPLOY AGENT TRAVEL</button>
          <button onClick={sendBulkMessage} className="bg-[#43a881] px-4 py-2 text-xs font-bold text-black hover:bg-white transition">BULK NOTIFY</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
        {/* Left Column: Metrics & Content Management */}
        <div className="col-span-1 md:col-span-8 space-y-6">
          
          {/* Waitlist Metrics */}
          <div className="bg-[#020607] border border-[#143D36] p-6 shadow-[0_0_20px_rgba(20,61,54,0.3)]">
            <h2 className="text-xl mb-4 font-bold text-[#43a881]">Waitlist Metrics</h2>
            <div className="overflow-x-auto max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#143D36]">
              <table className="w-full text-left font-mono text-sm">
                <thead>
                  <tr className="text-[#A2AFA4] border-b border-[#143D36]">
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Behavioral Pattern</th>
                    <th className="pb-4">Loiter Time</th>
                    <th className="pb-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.length === 0 ? (
                    <tr><td colSpan={4} className="py-4 text-center text-[#A2AFA4]">No waitlist entries yet.</td></tr>
                  ) : (
                    waitlist.map(u => (
                      <tr key={u.id} className="border-t border-[#143D36]/30 hover:bg-[#143D36]/20 transition">
                        <td className="py-3">{u.email}</td>
                        <td className="py-3 text-[#43a881]">{u.behavior}</td>
                        <td className="py-3">{u.loiterTime}</td>
                        <td className="py-3">{new Date(u.timestamp).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Content Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News Manager */}
            <div className="bg-[#020607] border border-[#143D36] p-6 shadow-[0_0_20px_rgba(20,61,54,0.3)]">
              <h2 className="text-xl mb-4 font-bold text-[#43a881]">News Carousel Manager</h2>
              <form onSubmit={handleNewsSubmit} className="space-y-4 font-mono text-sm">
                <div>
                  <label className="block text-[#A2AFA4] mb-1">Type</label>
                  <select value={newsType} onChange={e => setNewsType(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none">
                    <option value="pdf">Internal Intel (PDF)</option>
                    <option value="url">Global Pulse (URL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A2AFA4] mb-1">Title</label>
                  <input type="text" value={newsTitle} onChange={e => setNewsTitle(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none" required />
                </div>
                <div>
                  <label className="block text-[#A2AFA4] mb-1">URL (Source or PDF Link)</label>
                  <input type="url" value={newsUrl} onChange={e => setNewsUrl(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none" />
                </div>
                {newsType === 'pdf' && (
                  <div>
                    <label className="block text-[#A2AFA4] mb-1">Content Snippet</label>
                    <textarea value={newsContent} onChange={e => setNewsContent(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none h-24" />
                  </div>
                )}
                <button type="submit" className="w-full bg-[#143D36] text-white py-2 font-bold hover:bg-[#43a881] transition">ADD NEWS ITEM</button>
              </form>
            </div>

            {/* Announcement Manager */}
            <div className="bg-[#020607] border border-[#143D36] p-6 shadow-[0_0_20px_rgba(20,61,54,0.3)]">
              <h2 className="text-xl mb-4 font-bold text-[#43a881]">Extravagant Announcement</h2>
              <form onSubmit={handleAnnouncementSubmit} className="space-y-4 font-mono text-sm">
                <div>
                  <label className="block text-[#A2AFA4] mb-1">Headline</label>
                  <input type="text" value={announcementTitle} onChange={e => setAnnouncementTitle(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none" required />
                </div>
                <div>
                  <label className="block text-[#A2AFA4] mb-1">Media URL (Image/Video)</label>
                  <input type="url" value={announcementMedia} onChange={e => setAnnouncementMedia(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none" />
                </div>
                <div>
                  <label className="block text-[#A2AFA4] mb-1">Announcement Body</label>
                  <textarea value={announcementContent} onChange={e => setAnnouncementContent(e.target.value)} className="w-full bg-black border border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none h-24" required />
                </div>
                <button type="submit" className="w-full bg-[#143D36] text-white py-2 font-bold hover:bg-[#43a881] transition">DEPLOY ANNOUNCEMENT</button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: AGI Direct Command Chat */}
        <div className="col-span-1 md:col-span-4 h-[800px] border border-[#143D36] bg-black flex flex-col shadow-[0_0_20px_rgba(20,61,54,0.3)]">
          <div className="p-4 border-b border-[#143D36] flex justify-between items-center bg-[#020607]">
            <span className="font-bold text-[#43a881]">AGI COMMAND CENTER</span>
            <span className="text-[10px] font-mono text-[#A2AFA4] animate-pulse">STATUS: ONLINE</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-4 scrollbar-thin scrollbar-thumb-[#143D36]">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className={`text-[10px] mb-1 ${msg.role === 'user' ? 'text-[#A2AFA4]' : 'text-[#43a881]'}`}>
                  {msg.role === 'user' ? 'EXEC_ADMIN' : 'NEURUS_AGI'}
                </span>
                <div className={`p-3 max-w-[85%] ${msg.role === 'user' ? 'bg-[#143D36] text-[#F6F7E7]' : 'bg-[#020607] border border-[#143D36] text-[#A2AFA4]'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] mb-1 text-[#43a881]">NEURUS_AGI</span>
                <div className="p-3 bg-[#020607] border border-[#143D36] text-[#43a881] animate-pulse">
                  [PROCESSING_QUANTUM_HEURISTICS...]
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t border-[#143D36] bg-[#020607]">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Enter command..."
              className="w-full bg-transparent border-b border-[#143D36] p-2 text-[#F6F7E7] focus:border-[#43a881] outline-none font-mono text-sm transition"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
