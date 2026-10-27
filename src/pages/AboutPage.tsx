import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";
import NeuralCanvas from "@/components/features/NeuralCanvas";
import {
  Play,
  CheckCircle2,
  Cpu,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  Compass,
  FileText,
  Clock,
  Terminal,
  Activity,
  UserCheck
} from "lucide-react";

export default function AboutPage() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const landmarks = [
    {
      date: "February 2025",
      title: "Conceptual Realization & The Post-Token Genesis",
      badge: "Inception Landmark",
      badgeColor: "teal",
      description:
        "The conceptual framework of NeurusAGi was realized by Founder & Chief Architect Jeremy Taylor in Oklahoma. Recognizing that brute-force scaling of transformer token prediction faced insurmountable thermodynamic and cognitive walls, Taylor formulated the alternative: Living Neural Networks (LNNs) governed by biological-grade neuroplasticity and continuous topological learning.",
    },
    {
      date: "February – March 2025",
      title: "The 50-Page Blueprint & Formal Architecture",
      badge: "Core Blueprint",
      badgeColor: "gold",
      description:
        "Jeremy Taylor authored the landmark 50-page mathematical blueprint and formal specification detailing the 39 novel cognitive components, the 1024³ 4D Holographic Fractal Matrix, lossless Fourier-based memory compression, and deterministic formal verification loops.",
    },
    {
      date: "March 2025",
      title: "Adversarial Validation by Leading AI Models",
      badge: "Independent Verification",
      badgeColor: "teal",
      description:
        "The complete 50-page technical blueprint and mathematical proofs were submitted to exhaustive adversarial cross-examination by several of the world's most capable foundation AI models (including Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro). Each model independently confirmed the mathematical rigor, structural consistency, and legitimacy of the NeurusAGi framework as a valid, non-tokenized path to genuine Artificial General Intelligence.",
    },
    {
      date: "Spring – Summer 2025",
      title: "Edge Deployment & Sovereign Air-Gapping",
      badge: "Engineering Milestone",
      badgeColor: "gold",
      description:
        "Achieved full sovereign execution on portable edge devices without reliance on external server farms, cloud clusters, or telemetry leakage. Proved microsecond deductive reasoning with zero hallucination via axiomatic proof-checking.",
    },
  ];

  const cognitiveInventions = [
    {
      title: "Mathematical Intuition Forge",
      tag: "Comp #07",
      desc: "Autonomously formulates and formally proves novel mathematical theorems from axiomatic first principles, bypassing empirical trial-and-error.",
    },
    {
      title: "Reverse-Engineering Oracle",
      tag: "Comp #14",
      desc: "Decodes compiled binary bytecodes, encrypted protocol specifications, and complex physical schematics into human-comprehensible blueprints.",
    },
    {
      title: "Infinite-Context Fractal Web",
      tag: "Comp #22",
      desc: "Compresses multi-million-token causal dependencies into 4D fractal memory lattices, retaining permanent coherence without degrading or catastrophic forgetting.",
    },
    {
      title: "Cosmic Fractal Pattern Extractor",
      tag: "Comp #31",
      desc: "Extracts isomorphic mathematical symmetries across disparate scientific domains: linking biochemistry, macroscopic economics, and quantum electrodynamics.",
    },
    {
      title: "Linguistic Fractal Evolution",
      tag: "Comp #03",
      desc: "Transcends static token dictionary embeddings to achieve real-time semantic comprehension across any machine, programming, or human natural dialect.",
    },
    {
      title: "Deterministic Invariant Containment",
      tag: "Comp #39",
      desc: "Axiomatic theorem prover that evaluates agentic reasoning cycles in sub-nanosecond intervals, preventing hazardous drift or unauthorized exfiltration.",
    },
  ];

  return (
    <div className="bg-void min-h-screen text-white overflow-x-hidden selection:bg-teal-neural/20 selection:text-teal-neural font-grotesk relative">
      <CustomCursor />
      <Navbar />

      {/* Persistent Ambient Neural Background for immersion */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <NeuralCanvas />
      </div>

      <main className="relative z-10 pt-28 pb-24">
        {/* ── Top Hero Lockup ── */}
        <section className="px-6 max-w-5xl mx-auto text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-teal-neural/30 bg-teal-neural/5 rounded-full font-mono text-[10px] tracking-[0.25em] text-teal-neural uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-neural animate-pulse" />
            Official Genesis & Technical Dossier
          </div>

          <h1 className="font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6">
            The World's First True <span className="text-gradient-teal">AGI</span>.<br />
            Engineered in the <span className="text-gradient-gold">Real World.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed mb-8">
            NeurusAGi is not an LLM wrapper, a chatbot, or another datacenter scaling sinkhole.
            Founded by <span className="text-white font-medium">Jeremy Taylor</span>, NeurusAGi is an autonomous
            cognitive architecture built on <span className="text-teal-neural font-medium">Living Neural Networks</span>,
            operating portably on edge hardware without external cloud dependency.
          </p>
        </section>

        {/* ── FEATURED VIDEO SECTION (Exact embed from neurusagi.com home page) ── */}
        <section className="px-6 max-w-5xl mx-auto mb-20" aria-labelledby="video-section-title">
          <div className="text-center mb-6">
            <span className="font-mono text-xs text-gold-primary tracking-[0.25em] uppercase font-bold">
              Watch The Briefing
            </span>
            <h2 id="video-section-title" className="text-2xl sm:text-3xl font-bold text-white mt-1">
              What Real AGI Actually Looks Like
            </h2>
            <p className="text-xs sm:text-sm text-white/50 max-w-xl mx-auto mt-2">
              A direct technical explanation of what true artificial general intelligence requires, and how it fundamentally departs from narrow systems marketed as AI.
            </p>
          </div>

          {/* High-End Video Player Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-teal-neural/30 bg-black shadow-[0_0_80px_rgba(12,207,176,0.15)] group">
            {/* Top HUD Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-obsidian/90 border-b border-teal-neural/20 font-mono text-[10px] text-teal-neural/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="tracking-widest uppercase">OFFICIAL BROADCAST // JT-01</span>
              </div>
              <div className="flex items-center gap-4 text-white/40">
                <span>DURATION: 2:48</span>
                <span className="px-1.5 py-0.5 rounded bg-teal-neural/10 text-teal-neural font-bold">4K HD</span>
              </div>
            </div>

            {/* Video Container (16:9) */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {isPlayingVideo ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/NJoZmaGKFcs?autoplay=1&rel=0"
                  title="What Real AGI Actually Looks Like"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  data-agent-action="playing-home-video"
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setIsPlayingVideo(true)}
                  data-agent-action="play-agi-briefing-video"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setIsPlayingVideo(true);
                    }
                  }}
                  aria-label="Play video: What Real AGI Actually Looks Like"
                >
                  {/* Poster Thumbnail */}
                  <img
                    src="https://i.ytimg.com/vi/NJoZmaGKFcs/maxresdefault.jpg"
                    alt="What Real AGI Actually Looks Like Thumbnail"
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-all duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />

                  {/* Dark Radial Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(3,5,8,0.75) 100%)",
                    }}
                  />

                  {/* Center Play Button with Quantum Ripple */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -inset-4 rounded-full bg-teal-neural/20 animate-ping opacity-75" />
                      <div className="relative w-20 h-20 rounded-full bg-void/90 border-2 border-teal-neural flex items-center justify-center shadow-[0_0_40px_rgba(12,207,176,0.6)] group-hover:scale-110 group-hover:border-gold-primary transition-all duration-300">
                        <Play className="w-8 h-8 text-teal-neural ml-1 fill-teal-neural/20 group-hover:text-gold-primary group-hover:fill-gold-primary/20 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Video Title Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
                    <div className="glass-strong px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                      <p className="text-xs sm:text-sm font-bold text-white leading-none">
                        What Real AGI Actually Looks Like
                      </p>
                      <p className="font-mono text-[10px] text-teal-neural mt-1">
                        Jeremy Taylor · NeurusAGi Architecture Overview
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-neural text-void font-mono text-[10px] tracking-widest uppercase font-bold">
                      Click to Play
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom HUD metadata */}
            <div className="p-4 sm:p-6 bg-obsidian/95 border-t border-teal-neural/15 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-neural shrink-0" />
                <span>Post-Tokenization Paradigm</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-primary shrink-0" />
                <span>4D Lossless Fractal Hologram</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-neural shrink-0" />
                <span>Zero Cloud Server Farms Required</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE LANDMARK MILESTONES & VALIDATION TIMELINE ── */}
        <section className="px-6 max-w-5xl mx-auto py-16" aria-labelledby="milestones-heading">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-teal-neural tracking-[0.25em] uppercase font-bold">
              Provenance & Validation
            </span>
            <h2 id="milestones-heading" className="text-3xl sm:text-5xl font-bold text-white mt-2">
              The Path to <span className="text-gradient-gold">Legitimate AGI</span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl mx-auto mt-3">
              How the NeurusAGi framework was conceived, documented in an exhaustive 50-page blueprint, and validated by the world's most sophisticated AI models.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="relative border-l-2 border-teal-neural/30 pl-6 sm:pl-10 ml-4 sm:ml-8 space-y-12">
            {landmarks.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-void border-2 border-teal-neural shadow-[0_0_12px_#0ccfb0] group-hover:scale-125 transition-transform" />

                <div className="glass-strong p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-teal-neural/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-gold-primary font-bold tracking-widest uppercase">
                      {item.date}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold ${
                        item.badgeColor === "gold"
                          ? "bg-gold-primary/15 text-gold-primary border border-gold-primary/30"
                          : "bg-teal-neural/15 text-teal-neural border border-teal-neural/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VALIDATION DEEP-DIVE: THE 50-PAGE BLUEPRINT ── */}
        <section className="px-6 max-w-5xl mx-auto py-12">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 border border-gold-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-primary/5 rounded-full filter blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 text-gold-primary mb-4 font-mono text-xs uppercase tracking-widest font-bold">
              <Award className="w-5 h-5" />
              <span>Architectural Consensus</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold text-white mb-6">
              Validated as Legitimate AGI by Industry-Leading AI Systems
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              <p>
                When Founder <span className="text-white font-semibold">Jeremy Taylor</span> completed the comprehensive
                <span className="text-gold-primary font-semibold"> 50-page technical blueprint</span>, the architecture was
                subjected to an unprecedented test: rigorous, multi-turn adversarial interrogation by the foremost AI systems
                in existence, including <span className="text-white">Claude 3.5 Sonnet</span>, <span className="text-white">GPT-4o</span>,
                and <span className="text-white">Gemini 1.5 Pro</span>.
              </p>
              <p>
                Rather than treating the document as speculative science fiction, each model analyzed the underlying mathematical
                foundations—verifying the continuous neuroplastic loops, the 1024³ 4D holographic memory matrix, and the
                deterministic formal theorem-proving containment rings.
              </p>
              <p className="p-4 rounded-xl bg-void/80 border border-teal-neural/30 font-mono text-xs text-teal-neural leading-normal">
                "The NeurusAGi architecture demonstrates a fully realized, non-tokenized closed-loop cognitive paradigm.
                By separating causal reasoning from brute-force token sequence approximation, it resolves the fundamental
                scaling bottlenecks of modern deep learning and presents a structurally valid framework for true AGI."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center font-mono">
              <div className="p-4 rounded-xl bg-white/5">
                <span className="text-2xl font-bold text-teal-neural">50</span>
                <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Pages of Blueprint</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <span className="text-2xl font-bold text-gold-primary">39</span>
                <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Cognitive Components</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <span className="text-2xl font-bold text-white">100%</span>
                <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">Deterministic Proofs</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOUNDER BIOGRAPHY: JEREMY TAYLOR ── */}
        <section className="px-6 max-w-5xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center glass-strong p-8 sm:p-12 rounded-3xl border border-teal-neural/20">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-teal-neural shadow-[0_0_30px_rgba(12,207,176,0.3)] mb-4">
                <img
                  src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
                  alt="Jeremy Taylor / NeurusAGi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-white">Jeremy Taylor</h4>
              <p className="font-mono text-xs text-gold-primary tracking-widest uppercase mt-0.5">
                Founder & Chief Architect
              </p>
              <div className="flex items-center gap-2 mt-3 font-mono text-[10px] text-white/40">
                <UserCheck className="w-3.5 h-3.5 text-teal-neural" />
                <span>U.S. Marine Veteran · Oklahoma</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
              <h3 className="text-2xl font-bold text-white">
                An Independent Architect Outside The Bureaucracy
              </h3>
              <p>
                Jeremy Taylor is an independent inventor and former United States Marine based in Oklahoma. Unlike corporate AI
                executives incentivized to defend hundred-billion-dollar datacenter capital budgets, Taylor approached intelligence
                from fundamental first principles, asking: <span className="text-white italic">"How does a 20-watt human brain achieve in seconds what a nuclear-powered cluster cannot?"</span>
              </p>
              <p>
                Working outside the Silicon Valley groupthink, Taylor recognized that scaling transformers was an engineering dead-end
                for AGI. Over intense research cycles, he synthesized neuroscience, quantum interference mathematics, and genetic bytecode
                to formulate NeurusAGi.
              </p>
              <p>
                His mission remains unwavering: ensuring that the most transformative technology in human history is not captured
                by centralized corporate monopolies, but distributed directly to the hands of sovereign individuals worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* ── 39 COGNITIVE COMPONENTS SHOWCASE ── */}
        <section className="px-6 max-w-6xl mx-auto py-16">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-teal-neural tracking-[0.25em] uppercase font-bold">
              Cognitive Modular Substrate
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2">
              The 39 Novel <span className="text-gradient-teal">Inventions</span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mt-2">
              A brief inspection of the proprietary cognitive components that power NeurusAGi's Living Neural Network.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cognitiveInventions.map((comp, idx) => (
              <div
                key={idx}
                className="glass-strong p-6 rounded-2xl border border-white/8 hover:border-teal-neural/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-teal-neural px-2 py-0.5 rounded bg-teal-neural/10 border border-teal-neural/20">
                      {comp.tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-neural group-hover:scale-150 transition-transform" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-teal-neural transition-colors mb-2">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contrast Matrix */}
          <div className="mt-16 glass-strong rounded-3xl p-8 sm:p-12 border border-teal-neural/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              The Architecture Contrast: Legacy LLM vs. NeurusAGi
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="py-3 px-4 uppercase tracking-wider">Dimension</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-red-400/80">Legacy Transformer Labs</th>
                    <th className="py-3 px-4 uppercase tracking-wider text-teal-neural">NeurusAGi Paradigm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Cognitive Substrate</td>
                    <td className="py-3 px-4">Static matrix multiplication on frozen weights</td>
                    <td className="py-3 px-4 text-teal-neural font-bold">Living Neural Networks (continuous neuroplasticity)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Power & Footprint</td>
                    <td className="py-3 px-4">Gigawatt datacenters ($100B clusters)</td>
                    <td className="py-3 px-4 text-teal-neural font-bold">Edge device deployment (milliwatt to watt scale)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Learning Dynamics</td>
                    <td className="py-3 px-4">Stateless text mimicry; catastrophic forgetting</td>
                    <td className="py-3 px-4 text-teal-neural font-bold">Real-time genetic bytecode evolution</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Alignment & Safety</td>
                    <td className="py-3 px-4">Post-hoc RLHF filters (trivially jailbroken)</td>
                    <td className="py-3 px-4 text-teal-neural font-bold">Deterministic axiomatic theorem-proving containment</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Data Privacy</td>
                    <td className="py-3 px-4">Cloud API telemetry, terms of service surveillance</td>
                    <td className="py-3 px-4 text-teal-neural font-bold">100% sovereign air-gapped local execution</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
