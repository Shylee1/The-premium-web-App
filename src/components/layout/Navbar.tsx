import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const BASE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Intelligence", href: "/#intelligence" },
  { label: "Safety", href: "/#safety" },
  { label: "About", href: "/about" },
  { label: "News & Intel (25)", href: "/news" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = localStorage.getItem("neurusagi_admin_auth") === "true";
    setIsAuthenticated(isAuthed);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.replace("/#", "");
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("neurusagi_admin_auth");
    setIsAuthenticated(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-void/90 backdrop-blur-2xl border-b border-teal-neural/15 shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            : "py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo ONLY — clearly visible, large size so emblem and lettering are distinct */}
          <Link
            to="/"
            className="flex items-center group"
            data-cursor="true"
            data-agent-action="navigate-home"
            aria-label="NeurusAGi Home"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg"
                alt="NeurusAGi Emblem"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-teal-neural/40 group-hover:ring-teal-neural transition-all duration-300 shadow-[0_0_20px_rgba(12,207,176,0.25)]"
              />
              <span
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "0 0 28px #0ccfb066" }}
              />
            </div>
          </Link>

          {/* Right Action + Persistent Hamburger on the side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/admin"
                data-cursor="true"
                data-agent-action="open-admin-dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase text-gold-primary border border-gold-primary/30 hover:border-gold-primary bg-gold-primary/10 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
                Admin Command
              </Link>
            ) : (
              <Link
                to="/login"
                data-cursor="true"
                data-agent-action="open-login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-teal-neural border border-teal-neural/20 hover:border-teal-neural/50 bg-teal-neural/5 transition-all duration-300"
              >
                Sign In
              </Link>
            )}

            <a
              href="/#contact"
              onClick={() => handleLinkClick("/#contact")}
              data-cursor="true"
              data-agent-action="request-access-cta"
              className="hidden md:inline-flex relative group overflow-hidden px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-teal-neural/30 hover:border-teal-neural text-teal-neural hover:text-white transition-all duration-300 rounded"
            >
              <span className="relative z-10">Request Access</span>
              <div className="absolute inset-0 bg-teal-neural/10 group-hover:bg-teal-neural transition-colors duration-300" />
            </a>

            {/* Persistent Hamburger Button across all pages & devices */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="side-navigation-drawer"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              data-agent-action="toggle-side-nav"
              className="relative z-50 flex items-center gap-2.5 px-3 py-2 rounded-lg bg-obsidian/80 hover:bg-obsidian border border-teal-neural/30 hover:border-teal-neural transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(12,207,176,0.15)]"
            >
              <span className="font-mono text-[10px] text-teal-neural tracking-widest uppercase font-semibold hidden xs:inline">
                {open ? "CLOSE" : "MENU"}
              </span>
              <div className="flex flex-col justify-center items-center w-5 h-4 gap-[4px]">
                <span
                  className={`block w-5 h-[1.5px] bg-teal-neural transition-all duration-300 origin-center ${
                    open ? "rotate-45 translate-y-[5.5px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-teal-neural transition-all duration-200 ${
                    open ? "w-0 opacity-0" : "w-3.5 self-end"
                  }`}
                />
                <span
                  className={`block w-5 h-[1.5px] bg-teal-neural transition-all duration-300 origin-center ${
                    open ? "-rotate-45 -translate-y-[5.5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer (Does not cover the whole screen; expands just enough for menu options) */}
      <div
        id="side-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Subtle backdrop overlay */}
        <div
          className={`absolute inset-0 bg-void/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Compact Right Drawer: max-w-[320px] / w-80 */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[300px] sm:w-[320px] max-w-[85vw] flex flex-col bg-obsidian/95 backdrop-blur-2xl border-l border-teal-neural/25 shadow-[-10px_0_40px_rgba(0,0,0,0.85)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top subtle glow bar */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-teal-neural to-gold-primary" />

          {/* Drawer Header (Removed POST-TOKEN AGI text as requested) */}
          <div className="px-6 pt-20 pb-4 border-b border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-neural animate-pulse" />
              <span className="font-mono text-[11px] text-teal-neural uppercase tracking-[0.25em] font-bold">
                Navigation
              </span>
            </div>
            {isAuthenticated && (
              <span className="font-mono text-[9px] text-gold-primary uppercase tracking-wider font-bold">
                JT AUTHENTICATED
              </span>
            )}
          </div>

          {/* Nav Links List */}
          <nav aria-label="Main menu" className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
            {BASE_LINKS.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href === "/" && location.pathname === "/");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  data-agent-action="nav-menu-item"
                  data-agent-target={link.href}
                  className={`group flex items-center justify-between py-2.5 px-3 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? "bg-teal-neural/10 border-teal-neural/40 text-teal-neural font-semibold"
                      : "border-transparent hover:border-teal-neural/20 hover:bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-xs tracking-[0.16em] uppercase">
                    {link.label}
                  </span>
                  <span className="text-[10px] text-teal-neural/40 group-hover:text-teal-neural group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </a>
              );
            })}

            {/* Authentication Link */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-2.5 px-3 rounded-lg border border-gold-primary/30 bg-gold-primary/10 text-gold-primary font-semibold transition-all mt-3"
                >
                  <span className="font-mono text-xs tracking-[0.16em] uppercase">
                    Executive Admin Dashboard
                  </span>
                  <span className="text-[10px]">★</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left py-2 px-3 text-white/40 hover:text-red-400 font-mono text-[10px] tracking-wider uppercase transition-colors"
                >
                  Sign Out of Command
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-2.5 px-3 rounded-lg border border-white/10 hover:border-teal-neural/30 hover:bg-white/5 text-white/70 hover:text-teal-neural transition-all mt-3"
              >
                <span className="font-mono text-xs tracking-[0.16em] uppercase">
                  Sign In
                </span>
                <span className="text-[10px] text-white/40">🔒</span>
              </Link>
            )}
          </nav>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-white/8 bg-void/50 space-y-3">
            <a
              href="/#contact"
              onClick={() => handleLinkClick("/#contact")}
              data-agent-action="drawer-request-access"
              className="w-full flex items-center justify-center py-2.5 px-4 rounded border border-teal-neural/50 bg-teal-neural/10 hover:bg-teal-neural hover:text-void text-teal-neural font-mono text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-200"
            >
              Request Access
            </a>

            <div className="flex items-center justify-between font-mono text-[9px] text-white/40 pt-1">
              <span>NeurusAGi</span>
              <a
                href="mailto:jt@neurusagi.com"
                className="hover:text-teal-neural transition-colors"
              >
                jt@neurusagi.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
