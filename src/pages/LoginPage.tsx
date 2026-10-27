import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";
import { Shield, Lock, Mail, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("jt@neurusagi.com");
  const [password, setPassword] = useState("");
  const [isPromptingPasswordChange, setIsPromptingPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check if already authenticated
  useEffect(() => {
    const isAuthed = localStorage.getItem("neurusagi_admin_auth") === "true";
    if (isAuthed) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedPassword = localStorage.getItem("neurusagi_admin_pw") || "123";

    if (email.trim().toLowerCase() !== "jt@neurusagi.com") {
      toast.error("Unrecognized executive account email");
      return;
    }

    if (password === "123" && !localStorage.getItem("neurusagi_admin_pw")) {
      // First time login with temporary password "123"
      setIsPromptingPasswordChange(true);
      toast.info("Initial credentials accepted. Please configure your new permanent password.");
      return;
    }

    if (password === storedPassword) {
      localStorage.setItem("neurusagi_admin_auth", "true");
      toast.success("Executive session authorized. Welcome Jeremy Taylor.");
      navigate("/admin");
    } else {
      toast.error("Invalid password. Please check your credentials.");
    }
  };

  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 4) {
      toast.error("New password must be at least 4 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    localStorage.setItem("neurusagi_admin_pw", newPassword);
    localStorage.setItem("neurusagi_admin_auth", "true");
    toast.success("Permanent password configured! Welcome to Executive Command.");
    navigate("/admin");
  };

  return (
    <div className="bg-void min-h-screen text-white overflow-x-hidden selection:bg-teal-neural/20 selection:text-teal-neural font-grotesk relative flex flex-col justify-between">
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 pt-36 pb-24 px-4 sm:px-6 flex items-center justify-center flex-1">
        <div className="w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10 border border-teal-neural/30 shadow-[0_0_80px_rgba(12,207,176,0.15)] relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-teal-neural/10 border border-teal-neural/30 flex items-center justify-center mx-auto mb-4 text-teal-neural shadow-[0_0_20px_rgba(12,207,176,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Executive Authentication</h1>
            <p className="font-mono text-xs text-teal-neural tracking-widest uppercase mt-1">
              Founder &amp; Chief Architect Portal
            </p>
          </div>

          {!isPromptingPasswordChange ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                  Executive Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jt@neurusagi.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-void/90 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-void/90 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none transition-colors"
                  />
                </div>
                <p className="font-mono text-[10px] text-white/30 mt-1">
                  Default credentials: jt@neurusagi.com · pw: 123
                </p>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-teal-neural hover:bg-teal-glow text-void font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_20px_#0ccfb055] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Authorize Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSetNewPassword} className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-gold-primary/10 border border-gold-primary/30 font-mono text-xs text-gold-primary leading-normal mb-4">
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <KeyRound className="w-3.5 h-3.5" />
                  Change Initial Password
                </p>
                <p className="text-[11px] opacity-80">
                  Initial login with "123" confirmed. For security, please configure your new permanent password.
                </p>
              </div>

              <div>
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                  New Permanent Password *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full px-4 py-2.5 rounded-xl bg-void/90 border border-teal-neural/30 text-white text-sm focus:border-teal-neural focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm secure password"
                  className="w-full px-4 py-2.5 rounded-xl bg-void/90 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gold-primary hover:bg-gold-glow text-void font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_20px_rgba(212,168,83,0.5)] cursor-pointer"
              >
                Save New Password &amp; Open Dashboard →
              </button>
            </form>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
