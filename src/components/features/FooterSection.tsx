import React from "react";
import { Link } from "react-router-dom";
import { Mail, PenLine } from "lucide-react";

export default function FooterSection() {
  const YEAR = new Date().getFullYear();

  return (
    <footer className="relative border-t border-teal-neural/12 py-14 overflow-hidden bg-void/90">
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/6">
          {/* Col 1: Brand & Founder */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 group" data-cursor="true">
              <img
                src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
                alt="NeurusAGi"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-teal-neural/30 group-hover:ring-teal-neural/60 transition-all"
              />
              <span className="font-grotesk font-bold text-base text-white tracking-tight">
                Neurus
                <span className="text-gradient-gold">AGi</span>
              </span>
            </Link>
            <p className="font-grotesk text-xs text-white/40 leading-relaxed max-w-xs">
              A quantum leap in intelligence. The world's first portable, sustainable digital brain engineered for true cognition.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="mailto:jt@neurusagi.com"
                aria-label="Email NeurusAGi"
                className="text-white/40 hover:text-teal-neural transition-colors"
                title="jt@neurusagi.com"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://medium.com/@NeurusAGi.JeremyTaylor"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Jeremy Taylor on Medium"
                className="text-white/40 hover:text-teal-neural transition-colors"
                title="Jeremy Taylor on Medium"
              >
                <PenLine size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-mono text-xs text-teal-neural/80 font-bold uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 font-grotesk text-xs">
              <li>
                <Link to="/" className="text-white/50 hover:text-teal-neural transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <a href="/#architecture" className="text-white/50 hover:text-teal-neural transition-colors">
                  3D Architecture
                </a>
              </li>
              <li>
                <a href="/#intelligence" className="text-white/50 hover:text-teal-neural transition-colors">
                  Living Neural Networks
                </a>
              </li>
              <li>
                <a href="/#safety" className="text-white/50 hover:text-teal-neural transition-colors">
                  Safety Containment
                </a>
              </li>
              <li>
                <Link to="/admin" className="text-teal-neural hover:text-teal-glow transition-colors font-medium">
                  Executive Admin →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="font-mono text-xs text-teal-neural/80 font-bold uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 font-grotesk text-xs">
              <li>
                <Link to="/about" className="text-white/50 hover:text-teal-neural transition-colors">
                  About & Manifesto
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-white/50 hover:text-teal-neural transition-colors">
                  News & Research
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-white/50 hover:text-teal-neural transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/50 hover:text-teal-neural transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-white/50 hover:text-teal-neural transition-colors">
                  Request Early Access
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Paradigm */}
          <div>
            <h3 className="font-mono text-xs text-gold-primary font-bold uppercase tracking-widest mb-4">
              The Human Age
            </h3>
            <p className="font-grotesk text-xs text-white/40 leading-relaxed mb-4">
              "This is the moment the trajectory of humanity changes. Every willing human on Earth now has access to the same intelligence."
            </p>
            <div className="font-mono text-[10px] text-teal-neural/60 tracking-widest uppercase">
              Founded by Jeremy Taylor
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-white/40 tracking-widest flex items-center gap-4">
            <span>© {YEAR} NeurusAGi. All rights reserved.</span>
            <a href="/sitemap.xml" className="hover:text-teal-neural transition-colors" data-agent-action="view-sitemap">
              XML Sitemap
            </a>
            <a href="/llms.txt" className="hover:text-teal-neural transition-colors" data-agent-action="view-llms-txt">
              llms.txt
            </a>
          </div>
          <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
            Post-Tokenization Intelligence · Living Neural Network · Quantum-Powered AGi
          </div>
        </div>
      </div>
    </footer>
  );
}
