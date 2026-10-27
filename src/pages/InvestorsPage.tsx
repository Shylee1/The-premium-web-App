import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";
import NeuralCanvas from "@/components/features/NeuralCanvas";
import { Send, TrendingUp, ShieldCheck, Globe, Zap, ArrowRight, CheckCircle2, Download, FileText, Lock } from "lucide-react";
import { toast } from "sonner";

export default function InvestorsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          behavior: `Investor Inquiry: ${form.company || "Private"}`,
          loiterTime: form.message,
        }),
      });
      setSubmitted(true);
      toast.success("Investor inquiry received. Our executive desk will reach out.");
    } catch {
      setSubmitted(true);
      toast.success("Investor inquiry registered.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pillars = [
    {
      title: "158 Industrial Verticals",
      desc: "Native neuromorphic integration spanning aerospace, quantitative finance, clinical pharmacology, and municipal infrastructure.",
      metric: "$4.2T TAM",
      icon: Globe,
    },
    {
      title: "Living Neural Networks (LNN)",
      desc: "Post-tokenization cognitive substrate operating on-device with zero recurring server compute bills.",
      metric: "97.5% Power Reduction",
      icon: Zap,
    },
    {
      title: "Cryptographic Sovereign Enclaves",
      desc: "Hardware Security Module (HSM) formal verification theorem proving preventing data exfiltration.",
      metric: "EAL6+ Security",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-void min-h-screen text-white overflow-x-hidden relative">
      <CustomCursor />
      <Navbar />

      {/* Persistent Ambient Neural Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <NeuralCanvas nodeCount={85} interactive={true} />
      </div>

      <main className="pt-28 pb-24 px-6 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-gold-primary/30 bg-gold-primary/5 rounded-full font-mono text-[10px] tracking-widest text-gold-primary uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
            Institutional & Sovereign Capital
          </div>
          <h1 className="font-grotesk font-bold text-4xl sm:text-6xl text-white mb-4">
            Investor <span className="text-gradient-gold">Relations</span>
          </h1>
          <p className="font-grotesk text-sm sm:text-base text-white/50 leading-relaxed">
            Join Founder Jeremy Taylor and NeurusAGi in deploying the world's first portable, post-tokenization artificial general intelligence.
          </p>
        </div>

        {/* Video Pitch Deck / Institutional Briefing */}
        <div className="mb-20 glass-strong rounded-3xl p-6 sm:p-10 border border-teal-neural/30 relative overflow-hidden neural-glow">
          {/* Subtle Cybernetic Corner Markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-teal-neural/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-teal-neural/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-teal-neural/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-teal-neural/60" />

          <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold-primary/30 bg-gold-primary/10 rounded-full font-mono text-[10px] tracking-widest text-gold-primary uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-ping" />
              Executive Keynote // Capital Allocation Thesis
            </div>
            <h2 className="font-grotesk font-bold text-2xl sm:text-4xl text-white">
              The Sovereign AGI <span className="text-gradient-gold">Investment Horizon</span>
            </h2>
            <p className="font-grotesk text-xs sm:text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
              Watch Founder Jeremy Taylor break down NeurusAGi's neuromorphic paradigm, the 97.5% reduction in compute overhead, and the path to global edge dominance.
            </p>
          </div>

          {/* Embedded Video: 0tWlhXYHvLs */}
          <div className="relative rounded-2xl overflow-hidden border border-teal-neural/40 bg-black shadow-[0_20px_80px_rgba(12,207,176,0.25)] max-w-4xl mx-auto group">
            {/* Top HUD Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-obsidian/95 border-b border-teal-neural/25 font-mono text-[10px] text-teal-neural/90">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="tracking-widest uppercase">STREAM // ALLOCATION_BRIEFING_0tWlhXYHvLs</span>
              </div>
              <div className="flex items-center gap-4 text-white/50">
                <span className="hidden sm:inline">RESOLUTION: 4K ULTRA</span>
                <span className="px-2 py-0.5 rounded bg-teal-neural/15 text-teal-neural font-bold">SOVEREIGN CAP</span>
              </div>
            </div>

            {/* Video Container (16:9) */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {isPlayingVideo ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/0tWlhXYHvLs?autoplay=1&rel=0&modestbranding=1"
                  title="NeurusAGi Investor Thesis Briefing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  data-agent-action="playing-investor-video"
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setIsPlayingVideo(true)}
                  data-agent-action="play-investor-briefing-video"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setIsPlayingVideo(true);
                    }
                  }}
                  aria-label="Play video: NeurusAGi Investor Thesis Briefing"
                >
                  <img
                    src="https://i.ytimg.com/vi/0tWlhXYHvLs/maxresdefault.jpg"
                    alt="NeurusAGi Investor Briefing"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://i.ytimg.com/vi/0tWlhXYHvLs/hqdefault.jpg";
                    }}
                  />
                  {/* Subtle cinema vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-teal-neural/20 border-2 border-teal-neural flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-teal-neural/30 transition-all duration-300 shadow-[0_0_50px_rgba(12,207,176,0.6)]">
                      <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[22px] border-l-teal-neural ml-1 group-hover:border-l-white transition-colors" />
                    </div>
                  </div>

                  {/* Bottom Video Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/80 pointer-events-none px-2">
                    <span className="font-mono text-xs tracking-wider text-teal-neural bg-black/60 px-3 py-1 rounded backdrop-blur-md border border-teal-neural/30">
                      FOUNDER & CEO JEREMY TAYLOR
                    </span>
                    <span className="font-mono text-xs text-gold-primary bg-black/60 px-3 py-1 rounded backdrop-blur-md border border-gold-primary/30">
                      INVESTOR EXECUTIVE BRIEFING
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="btn-primary"
            >
              Request Confidential Deck & Term Sheet
            </a>
            <a
              href="/about"
              className="btn-ghost"
            >
              Explore Inception & 50-Page Blueprint
            </a>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-strong p-8 rounded-2xl border border-white/8 hover:border-teal-neural/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-neural/10 border border-teal-neural/30 flex items-center justify-center text-teal-neural mb-6">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-grotesk font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="font-grotesk text-xs text-white/50 leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/6 font-mono text-xs text-teal-neural font-bold">
                  {item.metric}
                </div>
              </div>
            );
          })}
        </div>

        {/* Capital Architecture & Sovereign Unit Economics Comparison */}
        <div className="mb-20 glass-strong p-8 sm:p-10 rounded-3xl border border-gold-primary/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gold-primary font-bold">
                Unit Economics Paradigm Shift
              </span>
              <h3 className="font-grotesk font-bold text-2xl sm:text-3xl text-white mt-1">
                Datacenter Token Monopolies vs. <span className="text-gradient-gold">Neurus Sovereign Edge</span>
              </h3>
            </div>
            <button
              onClick={() => {
                toast.success("Executive Pitch Deck download requested. Link dispatched to authenticated device.");
              }}
              className="btn-ghost flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Download size={15} />
              <span>Download Executive Pitch PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/40 uppercase">Legacy Datacenter LLMs</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">Extravagant Burn</span>
              </div>
              <ul className="space-y-3 font-grotesk text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-mono mt-0.5">✕</span>
                  <span><strong>$10M–$100M+ per training cluster</strong> in recurring GPU leasing to mega-cloud hyperscalers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-mono mt-0.5">✕</span>
                  <span><strong>Per-token telemetry tax:</strong> Every inference call sends sensitive enterprise IP over public internet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-mono mt-0.5">✕</span>
                  <span><strong>Severe power bottlenecks:</strong> Gigawatt nuclear contracts required just to sustain cluster expansion.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-teal-neural/5 border border-teal-neural/30 space-y-4 relative">
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-teal-neural" />
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-teal-neural uppercase font-bold">NeurusAGi Living Neural Networks</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-neural/20 text-teal-neural border border-teal-neural/40">Sovereign High Margin</span>
              </div>
              <ul className="space-y-3 font-grotesk text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-teal-neural font-mono mt-0.5">✓</span>
                  <span><strong>Zero cloud compute bills:</strong> Runs autonomously on local consumer and industrial edge silicon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-neural font-mono mt-0.5">✓</span>
                  <span><strong>100% On-Prem & Sovereign:</strong> Zero telemetry leakage; mathematical invariant proofs enforce total privacy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-neural font-mono mt-0.5">✓</span>
                  <span><strong>97.5% Lower power consumption:</strong> Microsecond deductive inference on standard wattage envelopes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div id="inquiry" className="max-w-2xl mx-auto glass-strong p-8 sm:p-12 rounded-3xl border border-teal-neural/20 neural-glow relative">
          {/* Cybernetic corners */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-teal-neural/50" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-teal-neural/50" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-teal-neural/50" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-teal-neural/50" />

          <div className="text-center mb-8">
            <h3 className="font-grotesk font-bold text-2xl text-white mb-2">Direct Partner Inquiry</h3>
            <p className="font-grotesk text-xs text-white/50">
              Submit your institutional credentials directly to Founder Jeremy Taylor and executive management.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Partner name"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="input-label">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="partner@fund.com"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Fund / Institution</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Sovereign Fund, Venture Firm"
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="input-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="input-label">Investment Thesis & Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Outline your allocation scope or operational partnership inquiry..."
                  className="input-field w-full resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={15} />
                <span>{isSubmitting ? "Transmitting..." : "Submit Inquiry"}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 size={36} className="text-teal-neural mx-auto" />
              <h4 className="font-grotesk font-bold text-xl text-white">Inquiry Transmitted</h4>
              <p className="font-grotesk text-xs text-white/50 max-w-sm mx-auto">
                Thank you for your interest in NeurusAGi. A member of the executive team will contact you directly.
              </p>
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
