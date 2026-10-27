import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import FooterSection from "@/components/features/FooterSection";
import CustomCursor from "@/components/features/CustomCursor";
import NewsSphere from "@/components/nexus/panels/NewsSphere";
import { NEWS_ARTICLES, Article } from "@/data/newsArticles";
import {
  Search,
  Calendar,
  Clock,
  User,
  Share2,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Megaphone,
  Radio,
  Grid,
  Globe2,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  tag?: string;
}

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "NeurusAGi Living Neural Network Core Finalized",
    content: "Architect Jeremy Taylor announced completion of the 1024³ 4D Holographic Fractal Matrix and lossless Fourier memory engine, executing on consumer edge silicon without server farms.",
    date: "July 25, 2025",
    tag: "Core Milestone"
  },
  {
    id: 2,
    title: "50-Page Architectural Blueprint Cross-Validated by Leading AI Models",
    content: "The complete mathematical blueprint and formal containment proofs were submitted to multi-turn adversarial review by top frontier models, confirming NeurusAGi as structurally legitimate AGI.",
    date: "March 18, 2025",
    tag: "Validation"
  },
  {
    id: 3,
    title: "Inception & First Principles Architecture Realized in Oklahoma",
    content: "Jeremy Taylor formulated the foundational framework for Post-Tokenization Intelligence, moving beyond transformer scaling traps to achieve true autonomous reasoning.",
    date: "February 7, 2025",
    tag: "Genesis"
  }
];

export default function NewsPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [articlesList, setArticlesList] = useState<Article[]>(NEWS_ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"sphere" | "grid">("sphere");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(DEFAULT_ANNOUNCEMENTS);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  // Fetch announcements & dynamic articles from server
  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            date: item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "July 2025",
            tag: item.tag || "Update",
          }));
          setAnnouncements([...formatted, ...DEFAULT_ANNOUNCEMENTS]);
        }
      })
      .catch(() => {});

    fetch("/api/news")
      .then((res) => res.json())
      .then((dynamicNews) => {
        if (Array.isArray(dynamicNews) && dynamicNews.length > 0) {
          const formatted: Article[] = dynamicNews.map((item: any, idx: number) => ({
            id: `custom-${item.id || idx + 26}`,
            slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            title: item.title,
            category: item.category || "Architecture",
            date: item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "March 2025",
            readTime: item.readTime || "5 min read",
            author: "Jeremy Taylor",
            excerpt: item.excerpt || (typeof item.content === "string" ? item.content.slice(0, 160) : item.content?.[0]?.slice(0, 160) || ""),
            image: item.image || item.mediaUrl || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
            content: Array.isArray(item.content) ? item.content : [item.content || ""],
            keyTakeaways: item.keyTakeaways || [],
          }));
          setArticlesList([...formatted, ...NEWS_ARTICLES]);
        }
      })
      .catch(() => {});
  }, []);

  // Sync route /news/:slug or query param with active article reader
  useEffect(() => {
    if (slug) {
      const found = articlesList.find((a) => a.slug === slug);
      if (found) {
        setActiveArticle(found);
        return;
      }
    }

    const params = new URLSearchParams(location.search);
    const querySlug = params.get("article");
    if (querySlug) {
      const found = articlesList.find((a) => a.slug === querySlug);
      if (found) {
        setActiveArticle(found);
        return;
      }
    }

    setActiveArticle(null);
  }, [slug, location.search, articlesList]);

  const categories = ["All", "Foundations", "Architecture", "Safety", "Philosophy", "Industry"];

  // Filtered list
  const filteredArticles = useMemo(() => {
    return articlesList.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articlesList, searchQuery, selectedCategory]);

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    navigate(`/news/${article.slug}`);
  };

  const handleCloseReader = () => {
    setActiveArticle(null);
    navigate("/news");
  };

  const handleShare = (article: Article) => {
    const url = `${window.location.origin}/news/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success("Article link copied to clipboard");
    }
  };

  const prevAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev > 0 ? prev - 1 : announcements.length - 1));
  };

  const nextAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev < announcements.length - 1 ? prev + 1 : 0));
  };

  const currentAnnouncement = announcements[currentAnnouncementIndex] || DEFAULT_ANNOUNCEMENTS[0];

  return (
    <div className="bg-void min-h-screen text-white overflow-x-hidden selection:bg-teal-neural/20 selection:text-teal-neural font-grotesk relative">
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        {/* ── SECTION 1 (TOP): OFFICIAL ANNOUNCEMENTS & UPDATES SHOWCASE ── */}
        <section aria-labelledby="announcements-heading" className="w-full">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-teal-neural/20">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-teal-neural" />
              <h2 id="announcements-heading" className="font-mono text-xs text-teal-neural uppercase tracking-widest font-bold">
                Official Updates &amp; Announcements
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
              <span>{currentAnnouncementIndex + 1} / {announcements.length}</span>
              <button
                onClick={prevAnnouncement}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous announcement"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextAnnouncement}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Next announcement"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Featured Announcement */}
          <div className="glass-strong rounded-2xl p-6 sm:p-8 border border-teal-neural/30 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2 font-mono text-xs">
              <span className="text-gold-primary font-bold uppercase tracking-wider">
                {currentAnnouncement.tag || "Executive Update"}
              </span>
              <span className="text-white/40 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-neural" />
                {currentAnnouncement.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {currentAnnouncement.title}
            </h3>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-4xl font-light">
              {currentAnnouncement.content}
            </p>

            {/* Announcement Selector Indicator Dots */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/8">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider mr-2">Timeline:</span>
              {announcements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAnnouncementIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentAnnouncementIndex ? "w-8 bg-teal-neural" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to update ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2 (MIDDLE): 3D INTEL SPHERE & RESEARCH PAPERS ── */}
        <section aria-labelledby="research-heading" className="w-full text-center">
          <div className="mb-8 max-w-3xl mx-auto">
            <h1 id="research-heading" className="font-bold text-3xl sm:text-5xl text-white tracking-tight mb-2">
              Research Dispatches &amp; Papers
            </h1>
            <p className="font-mono text-xs text-gold-primary tracking-widest uppercase">
              All 25 Papers Authored by Jeremy Taylor · Published Weekly Since February 2025
            </p>
          </div>

          {/* Control Bar: Search + Category + View Mode Toggle */}
          <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 glass-strong p-3.5 rounded-2xl border border-white/10">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-neural/70" />
              <input
                type="text"
                placeholder="Search all 25 papers by Jeremy Taylor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-void/80 border border-teal-neural/20 focus:border-teal-neural text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
                aria-label="Search research papers"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-teal-neural text-void font-bold shadow-[0_0_12px_#0ccfb055]"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: 3D Sphere vs Grid */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-void/80 border border-white/10 shrink-0">
              <button
                onClick={() => setViewMode("sphere")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === "sphere" ? "bg-teal-neural text-void font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>3D Sphere</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-teal-neural text-void font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* 3D Sphere View (Unconstrained focal point) */}
          {viewMode === "sphere" && (
            <div className="w-full flex items-center justify-center my-4 overflow-hidden">
              <NewsSphere
                articles={filteredArticles}
                selectedSlug={activeArticle?.slug}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          )}

          {/* Grid View (Alternative toggle) */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left my-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelectArticle(article)}
                  className="glass-strong rounded-2xl p-5 border border-white/10 hover:border-teal-neural/50 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-white/6">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-void/90 font-mono text-[9px] text-teal-neural uppercase">
                        #{article.id} · {article.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[10px] text-white/40 mb-2">
                      <span className="text-gold-primary">{article.date}</span>
                      <span>By Jeremy Taylor</span>
                    </div>

                    <h3 className="font-bold text-base text-white group-hover:text-teal-neural transition-colors line-clamp-2 mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/6 flex items-center justify-between font-mono text-[11px] text-teal-neural mt-4">
                    <span>READ FULL PAPER</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── SECTION 3 (LOWER): 3RD PARTY MEDIA & INFLUENCER SHOWCASE ── */}
        <section aria-labelledby="media-heading" className="w-full pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-gold-primary" />
              <h2 id="media-heading" className="font-mono text-xs text-gold-primary uppercase tracking-widest font-bold">
                Third-Party Media &amp; Industry Commentary
              </h2>
            </div>
            <span className="font-mono text-[10px] text-white/40 uppercase">
              Independent Coverage Desk
            </span>
          </div>

          <div className="glass-strong rounded-2xl p-8 border border-white/8 text-center space-y-3">
            <p className="font-mono text-xs text-teal-neural uppercase tracking-wider">
              Coverage &amp; Press Embargo
            </p>
            <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed font-light">
              Independent editorial reviews, external technical analyses, and investigative coverage will appear here as ongoing research reviews conclude.
            </p>
            <div className="pt-2">
              <a
                href="mailto:jt@neurusagi.com"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 hover:text-teal-neural transition-colors"
              >
                <span>For media, podcast, and press inquiries: jt@neurusagi.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ── IMMERSIVE ARTICLE READER MODAL ── */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void/90 backdrop-blur-2xl animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reader-article-title"
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-obsidian/98 border border-teal-neural/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(12,207,176,0.25)]">
              {/* Close Button */}
              <button
                onClick={handleCloseReader}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-teal-neural text-white hover:text-void flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/50 mb-3 pr-10">
                <span className="px-2.5 py-0.5 rounded bg-teal-neural/15 text-teal-neural font-bold uppercase tracking-wider border border-teal-neural/30">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-primary" />
                  {activeArticle.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-neural" />
                  {activeArticle.readTime}
                </span>
                <span>·</span>
                <span className="text-white font-medium">By Jeremy Taylor</span>
              </div>

              {/* Title */}
              <h2 id="reader-article-title" className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-6">
                {activeArticle.title}
              </h2>

              {/* Cover Image */}
              <div className="relative w-full h-52 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-75" />
              </div>

              {/* Key Takeaways */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-xl bg-teal-neural/5 border border-teal-neural/25 mb-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-teal-neural flex items-center gap-2 mb-2.5">
                    <Sparkles className="w-4 h-4 text-gold-primary" />
                    Key Architectural Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {activeArticle.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                        <span className="text-teal-neural font-bold">✦</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Content */}
              <div className="space-y-4 text-sm sm:text-base text-white/85 leading-relaxed font-light mb-8">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Author Box */}
              <div className="p-4 rounded-xl bg-void/80 border border-white/10 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-teal-neural overflow-hidden">
                    <img
                      src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
                      alt="Jeremy Taylor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Jeremy Taylor</p>
                    <p className="font-mono text-[10px] text-teal-neural">Founder &amp; Chief Architect · NeurusAGi</p>
                  </div>
                </div>
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-neural/30 hover:border-teal-neural bg-teal-neural/10 text-teal-neural font-mono text-xs uppercase cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
