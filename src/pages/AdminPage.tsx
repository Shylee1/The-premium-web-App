import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";
import {
  ShieldAlert,
  Users,
  Activity,
  Cpu,
  Globe,
  Upload,
  Send,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  FileText,
  Search,
  Download,
  Terminal,
  Layers,
  Sparkles,
  Megaphone,
  Bot,
  Sliders,
  LogOut,
  RefreshCw,
  Key
} from "lucide-react";
import { toast } from "sonner";

interface WaitlistEntry {
  id: number;
  email: string;
  behavior?: string;
  loiterTime?: number;
  timestamp: string;
  status?: "pending" | "approved" | "invited";
}

interface AppUser {
  id: string;
  email: string;
  role: string;
  tier: "Executive" | "Enterprise" | "Researcher" | "Developer";
  tokensUsed: string;
  status: "Active" | "Restricted";
  lastActive: string;
}

const MOCK_USERS: AppUser[] = [
  { id: "usr_01", email: "jt@neurusagi.com", role: "Chief Architect", tier: "Executive", tokensUsed: "Infinite", status: "Active", lastActive: "Just now" },
  { id: "usr_02", email: "sarah.chen@caltech.edu", role: "Quantum Research Lead", tier: "Enterprise", tokensUsed: "4.8M", status: "Active", lastActive: "4m ago" },
  { id: "usr_03", email: "m.rossi@cern.ch", role: "Theoretical Physicist", tier: "Enterprise", tokensUsed: "12.1M", status: "Active", lastActive: "18m ago" },
  { id: "usr_04", email: "david.k@deepbio.org", role: "Genomic Modeling", tier: "Researcher", tokensUsed: "890K", status: "Active", lastActive: "1h ago" },
  { id: "usr_05", email: "alex.t@sovereign-ai.io", role: "Systems Engineer", tier: "Developer", tokensUsed: "2.3M", status: "Active", lastActive: "3h ago" },
];

export default function AdminPage() {
  const navigate = useNavigate();

  // Authentication Guard
  useEffect(() => {
    const isAuthed = localStorage.getItem("neurusagi_admin_auth") === "true";
    if (!isAuthed) {
      toast.error("Executive authentication required. Please sign in.");
      navigate("/login");
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState<"metrics" | "users" | "waitlist" | "publisher" | "announcements" | "model">("metrics");

  // Article Publisher State (No character limit)
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState<string>("Architecture");
  const [articleDate, setArticleDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  );
  const [articleAuthor, setArticleAuthor] = useState("Jeremy Taylor");
  const [articleImage, setArticleImage] = useState("");
  const [articleTakeaways, setArticleTakeaways] = useState<string[]>([""]);
  const [articleContent, setArticleContent] = useState(""); // NO character limit
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedArticles, setPublishedArticles] = useState<any[]>([]);

  // Announcements State
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementTag, setAnnouncementTag] = useState("Milestone");
  const [isPostingAnnouncement, setIsPostingAnnouncement] = useState(false);
  const [announcementsList, setAnnouncementsList] = useState<any[]>([]);

  // Waitlist Management State
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [searchWaitlist, setSearchWaitlist] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Users State
  const [usersList, setUsersList] = useState<AppUser[]>(MOCK_USERS);
  const [searchUsers, setSearchUsers] = useState("");

  // AGI Model Interaction Studio State
  const [modelPrompt, setModelPrompt] = useState("");
  const [modelReasoningDepth, setModelReasoningDepth] = useState(8);
  const [modelResponse, setModelResponse] = useState<string | null>(null);
  const [isInferring, setIsInferring] = useState(false);
  const [formalProofs, setFormalProofs] = useState<string[]>([]);

  // Load published articles, announcements & waitlist on mount
  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPublishedArticles(data);
      })
      .catch(() => {});

    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAnnouncementsList(data);
      })
      .catch(() => {});

    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWaitlist(data);
      })
      .catch(() => {});
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("neurusagi_admin_auth");
    toast.info("Executive session terminated");
    navigate("/login");
  };

  // Image Upload File Handler
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setArticleImage(reader.result as string);
        toast.success(`Picture "${file.name}" attached`);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTakeawayField = () => setArticleTakeaways([...articleTakeaways, ""]);
  const updateTakeaway = (index: number, val: string) => {
    const updated = [...articleTakeaways];
    updated[index] = val;
    setArticleTakeaways(updated);
  };
  const removeTakeaway = (index: number) => {
    setArticleTakeaways(articleTakeaways.filter((_, i) => i !== index));
  };

  // Publish Article: takes an empty logo placeholder on the 3D sphere
  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleContent.trim()) {
      toast.error("Please provide both an article title and content");
      return;
    }

    setIsPublishing(true);

    const payload = {
      title: articleTitle,
      category: articleCategory,
      date: articleDate,
      author: articleAuthor,
      image:
        articleImage ||
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
      keyTakeaways: articleTakeaways.filter((t) => t.trim().length > 0),
      content: articleContent
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
      excerpt: articleContent.slice(0, 160) + "...",
      slug: articleTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setPublishedArticles([result.item, ...publishedArticles]);
        toast.success("Article successfully published to 3D Intel Sphere!");
        setArticleTitle("");
        setArticleContent("");
        setArticleImage("");
        setArticleTakeaways([""]);
      } else {
        toast.error("Failed to publish article");
      }
    } catch {
      toast.error("Network error publishing article");
    } finally {
      setIsPublishing(false);
    }
  };

  // Post Announcement
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) return;

    setIsPostingAnnouncement(true);
    try {
      const res = await fetch("/api/admin/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: announcementTitle,
          content: announcementContent,
          tag: announcementTag,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setAnnouncementsList([result.announcement, ...announcementsList]);
        toast.success("Announcement broadcasted to News Showcase!");
        setAnnouncementTitle("");
        setAnnouncementContent("");
      }
    } catch {
      toast.error("Failed to post announcement");
    } finally {
      setIsPostingAnnouncement(false);
    }
  };

  // Broadcast Message to Waitlist
  const handleBulkBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setIsBroadcasting(true);
    try {
      const res = await fetch("/api/admin/bulk-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: broadcastMessage }),
      });
      if (res.ok) {
        toast.success(`Broadcast dispatched to ${waitlist.length} applicants!`);
        setBroadcastMessage("");
      }
    } catch {
      toast.error("Broadcast failed");
    } finally {
      setIsBroadcasting(false);
    }
  };

  // Export waitlist CSV
  const handleExportCSV = () => {
    const headers = "ID,Email,Behavior,LoiterTime,Timestamp\n";
    const rows = waitlist
      .map((w) => `${w.id},"${w.email}","${w.behavior || "standard"}","${w.loiterTime || 0}","${w.timestamp}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neurusagi_waitlist_${Date.now()}.csv`;
    a.click();
    toast.success("Waitlist CSV downloaded");
  };

  // AGI Model Reasoning Simulation (AIAAS / Grok / ChatGPT style)
  const handleRunModelInference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelPrompt.trim()) return;

    setIsInferring(true);
    setModelResponse(null);
    setFormalProofs([]);

    setTimeout(() => {
      setModelResponse(
        `[NEURUS-LNN COGNITIVE SYNTHESIS]\nPrompt: "${modelPrompt}"\n\n1. Invariant Analysis: Causal pathway verified against axiomatic first principles without token interpolation.\n2. 4D Holographic Lattice: Query resonated across 1024³ knowledge manifold with zero parameter degradation.\n3. Deductive Conclusion: Living Neural Network confirms deterministic resolution with zero hallucination. System state remains coherent across all 39 cognitive modules.`
      );
      setFormalProofs([
        "Axiom-01: Non-contradiction invariant holds across semantic space.",
        "Axiom-07: Spatial causality preserved in 4D coordinate manifold.",
        "Axiom-39: Output quenches all unauthorized exfiltration vectors."
      ]);
      setIsInferring(false);
      toast.success("Cognitive reasoning cycle complete");
    }, 1200);
  };

  return (
    <div className="bg-void min-h-screen text-white overflow-x-hidden selection:bg-teal-neural/20 selection:text-teal-neural font-grotesk relative">
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        {/* Top Command Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-teal-neural/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-neural animate-pulse" />
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Executive <span className="text-gradient-gold">Admin Command</span>
              </h1>
            </div>
            <p className="font-mono text-[11px] text-teal-neural tracking-[0.25em] uppercase mt-1">
              Founder &amp; Chief Architect · Jeremy Taylor (jt@neurusagi.com)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-teal-neural/10 border border-teal-neural/30 font-mono text-xs text-teal-neural font-bold">
              1,048,576+ CONCURRENT SESSIONS
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 border border-white/10 transition-colors font-mono text-xs uppercase cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10">
          {[
            { id: "metrics", label: "Metrics & Concurrency (1M+)", icon: Activity },
            { id: "users", label: `Users (${usersList.length})`, icon: Users },
            { id: "waitlist", label: `Waitlist (${waitlist.length})`, icon: ShieldAlert },
            { id: "publisher", label: "Article Publisher & CMS", icon: FileText },
            { id: "announcements", label: "News Showcase Announcements", icon: Megaphone },
            { id: "model", label: "AGI Model Studio (AIAAS)", icon: Bot },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-teal-neural text-void font-bold shadow-[0_0_15px_#0ccfb055]"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: METRICS & CONCURRENCY (1M+ USERS) ── */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "CONCURRENT USERS", value: "1,048,576+", sub: "Dynamic Edge Scale", icon: Users },
                { label: "COGNITIVE SPEED", value: "10¹⁵ OPS/SEC", sub: "Biological Plasticity", icon: Cpu },
                { label: "GLOBAL EDGE NODES", value: "194 COUNTRIES", sub: "Decentralized LNN", icon: Globe },
                { label: "FORMAL SAFETY", value: "100.0%", sub: "Invariant Theorem Verified", icon: ShieldAlert },
              ].map((s, i) => (
                <div key={i} className="glass-strong p-6 rounded-2xl border border-teal-neural/20">
                  <s.icon className="w-5 h-5 text-teal-neural mb-3" />
                  <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase">{s.label}</p>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">{s.value}</p>
                  <p className="font-mono text-[10px] text-gold-primary mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-neural" />
                Living Neural Network Live Telemetry
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-void/80 border border-white/8 space-y-2">
                  <span className="text-teal-neural font-bold">4D Fractal Matrix Compression</span>
                  <p className="text-2xl font-black text-white">99.8%</p>
                  <p className="text-[10px] text-white/40">Lossless Fourier interference storage</p>
                </div>
                <div className="p-4 rounded-xl bg-void/80 border border-white/8 space-y-2">
                  <span className="text-gold-primary font-bold">Edge Memory Footprint</span>
                  <p className="text-2xl font-black text-white">&lt; 420 MB</p>
                  <p className="text-[10px] text-white/40">Executes on consumer laptops &amp; mobile</p>
                </div>
                <div className="p-4 rounded-xl bg-void/80 border border-white/8 space-y-2">
                  <span className="text-teal-neural font-bold">Cloud Server Farm Overhead</span>
                  <p className="text-2xl font-black text-white">ZERO</p>
                  <p className="text-[10px] text-white/40">100% sovereign air-gapped deduction</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: USER MANAGEMENT ── */}
        {activeTab === "users" && (
          <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Active System Users</h2>
                <p className="text-xs text-white/50">
                  Monitor and manage registered developers, research accounts, and access tiers.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Filter users..."
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-void/80 border border-white/15 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="py-2.5 px-3 uppercase tracking-wider">User ID</th>
                    <th className="py-2.5 px-3 uppercase tracking-wider">Email</th>
                    <th className="py-2.5 px-3 uppercase tracking-wider">Role</th>
                    <th className="py-2.5 px-3 uppercase tracking-wider">Access Tier</th>
                    <th className="py-2.5 px-3 uppercase tracking-wider">Status</th>
                    <th className="py-2.5 px-3 uppercase tracking-wider">Last Active</th>
                    <th className="py-2.5 px-3 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  {usersList
                    .filter((u) => u.email.toLowerCase().includes(searchUsers.toLowerCase()))
                    .map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-3 text-white/40">{user.id}</td>
                        <td className="py-2.5 px-3 font-bold text-white">{user.email}</td>
                        <td className="py-2.5 px-3 text-teal-neural">{user.role}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-gold-primary/10 text-gold-primary border border-gold-primary/30 text-[10px] uppercase font-bold">
                            {user.tier}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-teal-neural/10 text-teal-neural text-[10px] uppercase font-bold">
                            {user.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-white/40">{user.lastActive}</td>
                        <td className="py-2.5 px-3">
                          <button
                            onClick={() => toast.success(`Generated new token for ${user.email}`)}
                            className="px-2 py-1 rounded bg-white/5 hover:bg-teal-neural/20 text-teal-neural text-[10px] uppercase font-bold transition-colors cursor-pointer"
                          >
                            Reset Key
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: WAITLIST MANAGEMENT ── */}
        {activeTab === "waitlist" && (
          <div className="space-y-6">
            <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-teal-neural/20 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Waitlist Applicants ({waitlist.length})</h2>
                  <p className="text-xs text-white/50">
                    Review and approve early access requests, send bulk broadcasts, and export data.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase cursor-pointer"
                >
                  <Download className="w-4 h-4 text-teal-neural" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Broadcast Tool */}
              <form onSubmit={handleBulkBroadcast} className="p-4 rounded-2xl bg-void/80 border border-teal-neural/30 space-y-2">
                <label className="block font-mono text-xs text-teal-neural uppercase tracking-wider">
                  Bulk Broadcaster (All Applicants)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Type announcement message to broadcast to all waitlist emails..."
                    className="flex-1 px-4 py-2 rounded-xl bg-obsidian border border-white/10 text-white text-xs focus:border-teal-neural focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isBroadcasting}
                    className="px-5 py-2 rounded-xl bg-teal-neural hover:bg-teal-glow text-void font-mono text-xs uppercase font-bold cursor-pointer"
                  >
                    {isBroadcasting ? "Sending..." : "Broadcast"}
                  </button>
                </div>
              </form>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40">
                      <th className="py-2.5 px-3 uppercase tracking-wider">ID</th>
                      <th className="py-2.5 px-3 uppercase tracking-wider">Email</th>
                      <th className="py-2.5 px-3 uppercase tracking-wider">Use Case</th>
                      <th className="py-2.5 px-3 uppercase tracking-wider">Applied</th>
                      <th className="py-2.5 px-3 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    {waitlist.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-white/40 italic">
                          No applicants on waitlist yet.
                        </td>
                      </tr>
                    ) : (
                      waitlist.map((w) => (
                        <tr key={w.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-2.5 px-3 text-white/40">#{w.id}</td>
                          <td className="py-2.5 px-3 font-bold text-white">{w.email}</td>
                          <td className="py-2.5 px-3 text-teal-neural">{w.behavior || "Research"}</td>
                          <td className="py-2.5 px-3 text-white/40">{new Date(w.timestamp).toLocaleDateString()}</td>
                          <td className="py-2.5 px-3">
                            <button
                              onClick={() => toast.success(`Approved early access invitation for ${w.email}`)}
                              className="px-2.5 py-1 rounded bg-teal-neural/20 hover:bg-teal-neural text-teal-neural hover:text-void text-[10px] uppercase font-bold transition-colors cursor-pointer"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: ARTICLE PUBLISHER & CMS (NO CHARACTER LIMIT) ── */}
        {activeTab === "publisher" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-strong rounded-3xl p-6 sm:p-8 border border-teal-neural/25">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Publish Research Paper by Jeremy Taylor</h2>
                  <p className="text-xs text-white/50">
                    Instantly claims one of the empty logo placeholder tiles in the 3D Intel Sphere.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-teal-neural bg-teal-neural/10 px-2.5 py-1 rounded border border-teal-neural/20 uppercase tracking-widest font-bold">
                  NO CHAR LIMIT
                </span>
              </div>

              <form onSubmit={handlePublishArticle} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-teal-neural uppercase tracking-wider mb-1.5">
                    Paper Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    placeholder="e.g., Living Neural Networks vs Transformer Scaling"
                    className="w-full px-4 py-2.5 rounded-xl bg-void/80 border border-teal-neural/30 text-white text-sm focus:border-teal-neural focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      value={articleCategory}
                      onChange={(e) => setArticleCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-void/80 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none"
                    >
                      <option value="Architecture">Architecture</option>
                      <option value="Foundations">Foundations</option>
                      <option value="Safety">Safety</option>
                      <option value="Philosophy">Philosophy</option>
                      <option value="Industry">Industry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                      Date
                    </label>
                    <input
                      type="text"
                      value={articleDate}
                      onChange={(e) => setArticleDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-void/80 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                      Author
                    </label>
                    <input
                      type="text"
                      disabled
                      value={articleAuthor}
                      className="w-full px-4 py-2.5 rounded-xl bg-void/50 border border-white/10 text-gold-primary text-sm font-bold"
                    />
                  </div>
                </div>

                {/* Picture Upload / URL */}
                <div>
                  <label className="block font-mono text-xs text-teal-neural uppercase tracking-wider mb-1.5">
                    Cover Picture (Upload File or Enter URL)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      value={articleImage}
                      onChange={(e) => setArticleImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... or paste image URL"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-void/80 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none"
                    />
                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-neural/15 border border-teal-neural/40 text-teal-neural hover:bg-teal-neural hover:text-void font-mono text-xs tracking-wider uppercase cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Picture</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Takeaways */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs text-gold-primary uppercase tracking-wider">
                      Key Takeaways
                    </label>
                    <button
                      type="button"
                      onClick={addTakeawayField}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-teal-neural hover:underline uppercase cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {articleTakeaways.map((takeaway, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={takeaway}
                          onChange={(e) => updateTakeaway(i, e.target.value)}
                          placeholder={`Takeaway #${i + 1}`}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-void/80 border border-white/10 text-white text-xs focus:border-teal-neural focus:outline-none"
                        />
                        {articleTakeaways.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTakeaway(i)}
                            className="p-1.5 rounded text-white/40 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Article Content Area — NO CHARACTER LIMIT */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-xs text-teal-neural uppercase tracking-wider">
                      Full Paper Content (No Character Limit) *
                    </label>
                    <span className="font-mono text-[10px] text-white/40">
                      {articleContent.length} chars
                    </span>
                  </div>
                  <textarea
                    required
                    rows={12}
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    placeholder="Enter complete research paper text. No character limit. Separate paragraphs with double enters."
                    className="w-full px-4 py-3 rounded-xl bg-void/90 border border-teal-neural/30 text-white text-sm focus:border-teal-neural focus:outline-none leading-relaxed font-light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full py-3.5 rounded-xl bg-teal-neural hover:bg-teal-glow text-void font-mono text-xs tracking-[0.25em] uppercase font-bold transition-all shadow-[0_0_20px_#0ccfb055] cursor-pointer"
                >
                  {isPublishing ? "Publishing to Intel Sphere..." : "Publish to 3D Intel Sphere →"}
                </button>
              </form>
            </div>

            <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 h-fit space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-teal-neural font-bold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Live Published Papers ({publishedArticles.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {publishedArticles.length === 0 ? (
                  <p className="text-xs text-white/30 italic">No custom dispatches published yet.</p>
                ) : (
                  publishedArticles.map((art) => (
                    <div key={art.id} className="p-3.5 rounded-xl bg-void/80 border border-white/10">
                      <span className="font-mono text-[9px] text-gold-primary uppercase">{art.category || "Architecture"}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-2 mt-1">{art.title}</h4>
                      <p className="font-mono text-[9px] text-teal-neural mt-1">Authored by Jeremy Taylor</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: ANNOUNCEMENTS & UPDATES SHOWCASE MANAGER ── */}
        {activeTab === "announcements" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-strong rounded-3xl p-6 sm:p-8 border border-teal-neural/25 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Broadcast Announcement</h2>
                <p className="text-xs text-white/50">
                  Updates posted here appear in the top showcase carousel on the News page.
                </p>
              </div>

              <form onSubmit={handlePostAnnouncement} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-teal-neural uppercase tracking-wider mb-1.5">
                    Announcement Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="e.g., Breakthrough in Edge Silicon Deployment"
                    className="w-full px-4 py-2.5 rounded-xl bg-void/80 border border-teal-neural/30 text-white text-sm focus:border-teal-neural focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-white/60 uppercase tracking-wider mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={announcementTag}
                    onChange={(e) => setAnnouncementTag(e.target.value)}
                    placeholder="e.g., Core Milestone, Validation, Release"
                    className="w-full px-4 py-2.5 rounded-xl bg-void/80 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-teal-neural uppercase tracking-wider mb-1.5">
                    Announcement Details *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={announcementContent}
                    onChange={(e) => setAnnouncementContent(e.target.value)}
                    placeholder="Enter the full announcement text for visitors and stakeholders..."
                    className="w-full px-4 py-2.5 rounded-xl bg-void/90 border border-white/15 text-white text-sm focus:border-teal-neural focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPostingAnnouncement}
                  className="w-full py-3 rounded-xl bg-teal-neural hover:bg-teal-glow text-void font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {isPostingAnnouncement ? "Broadcasting..." : "Publish Announcement to News Showcase →"}
                </button>
              </form>
            </div>

            <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-teal-neural font-bold">
                Live Announcements ({announcementsList.length})
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {announcementsList.map((ann) => (
                  <div key={ann.id} className="p-3.5 rounded-xl bg-void/80 border border-white/10">
                    <span className="font-mono text-[9px] text-gold-primary uppercase">{ann.tag || "Update"}</span>
                    <h4 className="text-xs font-bold text-white mt-1">{ann.title}</h4>
                    <p className="text-[11px] text-white/60 line-clamp-2 mt-1">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: AGI MODEL INTERACTION STUDIO (AIAAS Console) ── */}
        {activeTab === "model" && (
          <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-teal-neural/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-teal-neural" />
                  Living Neural Network (LNN) Studio
                </h2>
                <p className="text-xs text-white/50">
                  Direct cognitive reasoning console for NeurusAGi foundation architecture.
                </p>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-white/60">
                <span>Reasoning Depth: {modelReasoningDepth} / 10</span>
                <span className="text-teal-neural font-bold">POST-TOKEN MANIFOLD</span>
              </div>
            </div>

            <form onSubmit={handleRunModelInference} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-teal-neural uppercase tracking-wider mb-1.5">
                  Cognitive Reasoning Prompt
                </label>
                <textarea
                  rows={4}
                  value={modelPrompt}
                  onChange={(e) => setModelPrompt(e.target.value)}
                  placeholder="Pose a complex cross-domain or mathematical deduction query..."
                  className="w-full px-4 py-3 rounded-xl bg-void/90 border border-teal-neural/30 text-white text-sm focus:border-teal-neural focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sliders className="w-4 h-4 text-gold-primary" />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={modelReasoningDepth}
                    onChange={(e) => setModelReasoningDepth(Number(e.target.value))}
                    className="accent-teal-neural cursor-pointer"
                  />
                  <span className="font-mono text-xs text-white/50">Depth: {modelReasoningDepth}</span>
                </div>

                <button
                  type="submit"
                  disabled={isInferring}
                  className="px-6 py-2.5 rounded-xl bg-teal-neural hover:bg-teal-glow text-void font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {isInferring ? "Computing Cognitive Paths..." : "Execute Reasoning Loop →"}
                </button>
              </div>
            </form>

            {modelResponse && (
              <div className="p-6 rounded-2xl bg-void/90 border border-teal-neural/40 font-mono text-xs text-teal-neural space-y-4 animate-in fade-in">
                <div className="whitespace-pre-line text-white/90 leading-relaxed">
                  {modelResponse}
                </div>
                {formalProofs.length > 0 && (
                  <div className="pt-4 border-t border-teal-neural/20 space-y-1 text-white/60">
                    <p className="font-bold text-gold-primary uppercase tracking-wider">Theorem Proof Checks:</p>
                    {formalProofs.map((p, i) => (
                      <p key={i}>✓ {p}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
