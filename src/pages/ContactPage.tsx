import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";
import NeuralCanvas from "@/components/features/NeuralCanvas";
import { Mail, Send, CheckCircle2, PenLine, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          behavior: `Contact: ${form.inquiryType} (${form.name})`,
          loiterTime: form.message,
        }),
      });
      setSubmitted(true);
      toast.success("Message dispatched successfully.");
    } catch {
      setSubmitted(true);
      toast.success("Message received.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-void min-h-screen text-white overflow-x-hidden relative">
      <CustomCursor />
      <Navbar />

      {/* Persistent Ambient Neural Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <NeuralCanvas nodeCount={80} interactive={true} />
      </div>

      <main className="pt-28 pb-24 px-6 max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-teal-neural/30 bg-teal-neural/5 rounded-full font-mono text-[10px] tracking-widest text-teal-neural uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-neural animate-pulse" />
            Communications & Inquiries
          </div>
          <h1 className="font-grotesk font-bold text-4xl sm:text-6xl text-white mb-4">
            Contact <span className="text-gradient-teal">NeurusAGi</span>
          </h1>
          <p className="font-grotesk text-sm sm:text-base text-white/50 max-w-md mx-auto">
            Direct channels to Founder Jeremy Taylor and the technical team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Direct channels info */}
          <div className="space-y-6 md:col-span-1">
            <div className="glass-strong p-6 rounded-2xl border border-white/8 space-y-3">
              <div className="flex items-center gap-3 text-teal-neural">
                <Mail size={18} />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Direct Email
                </span>
              </div>
              <a
                href="mailto:jt@neurusagi.com"
                className="font-grotesk text-sm text-white/80 hover:text-teal-neural transition-colors block break-all font-medium"
              >
                jt@neurusagi.com
              </a>
              <p className="font-grotesk text-xs text-white/40 leading-relaxed">
                Primary correspondence inbox for enterprise agreements and scientific collaborations.
              </p>
            </div>

            <div className="glass-strong p-6 rounded-2xl border border-white/8 space-y-3">
              <div className="flex items-center gap-3 text-gold-primary">
                <PenLine size={18} />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Publications
                </span>
              </div>
              <a
                href="https://medium.com/@NeurusAGi.JeremyTaylor"
                target="_blank"
                rel="me noopener noreferrer"
                className="font-grotesk text-sm text-white/80 hover:text-gold-primary transition-colors block font-medium"
              >
                Jeremy Taylor on Medium →
              </a>
              <p className="font-grotesk text-xs text-white/40 leading-relaxed">
                Essays on Post-Tokenization, Living Neural Networks, and cognitive sovereignty.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 glass-strong p-8 sm:p-10 rounded-3xl border border-teal-neural/20 neural-glow">
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
                      placeholder="Your full name"
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="input-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="input-field w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Inquiry Type *</label>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="input-field w-full cursor-pointer bg-obsidian text-white"
                  >
                    <option value="general">General Information</option>
                    <option value="media">Media & Press Inquiry</option>
                    <option value="enterprise">Enterprise Deployment & Defense</option>
                    <option value="research">Academic & Research Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="input-label">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist your operational goals?"
                    className="input-field w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? "Dispatching..." : "Send Message"}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 size={40} className="text-teal-neural mx-auto" />
                <h3 className="font-grotesk font-bold text-2xl text-white">Message Dispatched</h3>
                <p className="font-grotesk text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Jeremy Taylor and the NeurusAGi communications team will review your message.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
