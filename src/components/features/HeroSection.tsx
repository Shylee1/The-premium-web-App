import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Neural fiber particle canvas ───────────────────────────────────────────
function NeuralFiberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }

    const TEAL = "#0ccfb0";
    const GOLD = "#d4a853";
    const GLOW = "#1affd8";
    const COLORS = [TEAL, TEAL, TEAL, GOLD, GLOW, TEAL];

    let nodes: Node[] = [];

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;

      const COUNT = Math.min(Math.floor((w * h) / 9000), 140);
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.8 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.012,
      }));
    };

    const MAX_DIST = 160;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > MAX_DIST_SQ) continue;

          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / MAX_DIST) * 0.28;

          const isGold = a.color === GOLD || b.color === GOLD;
          const lineColor = isGold ? GOLD : TEAL;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);

          const mx = (a.x + b.x) / 2 + (Math.sin(a.pulse) * 8);
          const my = (a.y + b.y) / 2 + (Math.cos(b.pulse) * 8);
          ctx.quadraticCurveTo(mx, my, b.x, b.y);

          ctx.strokeStyle = lineColor + Math.floor(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 0.6 + alpha * 1.2;
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const glow = 0.6 + 0.4 * Math.sin(n.pulse);
        const radius = n.r * (0.9 + 0.2 * Math.sin(n.pulse * 1.3));

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(radius * 6, 1));
        grad.addColorStop(0, n.color + Math.floor(glow * 90).toString(16).padStart(2, "0"));
        grad.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(radius * 6, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(radius, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.floor(glow * 220).toString(16).padStart(2, "0");
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

// ─── Floating data fragments ─────────────────────────────────────────────────
const DATA_FRAGMENTS = [
  "LNN::INIT", "39 COMPONENTS", "PTI_v1.0", "EDGE::DEPLOY",
  "EB→MB", "QUANTUM//ON", "AGI_SAFE", "NO_SELF_AWARE",
  "CORRIGIBLE", "5/9 PILLARS", "COGNITIVE::LOOP", "THINK::TRUE",
];

function DataFragments() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 4 }}>
      {DATA_FRAGMENTS.map((frag, i) => {
        const top = 8 + (i * 7.2) % 84;
        const left = (i * 11 + 3) % 90;
        const delay = i * 0.4;
        const duration = 6 + (i % 4) * 2;
        return (
          <div
            key={i}
            className="absolute font-mono text-[9px] tracking-widest whitespace-nowrap"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              color: i % 3 === 0 ? "#d4a85333" : "#0ccfb022",
              animation: `dataFloat ${duration}s ease-in-out ${delay}s infinite`,
              opacity: 0,
            }}
          >
            {frag}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Hero with Cinematic Parallax ─────────────────────────────────────────
export default function HeroSection() {
  const [phase, setPhase] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Monumental title transforms: Starts massive, shrinks down as you scroll
  const titleScale = useTransform(smoothProgress, [0, 0.65], [1.32, 0.72]);
  const titleY = useTransform(smoothProgress, [0, 0.7], [0, -110]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0.25]);

  // Sub-text & divider transforms follow layered parallax velocity
  const subtextY = useTransform(smoothProgress, [0, 0.7], [0, -75]);
  const subtextOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.35]);

  // Video transforms: Rises into frame, expands and tilts with 3D perspective
  const videoY = useTransform(smoothProgress, [0, 0.7], [30, -85]);
  const videoScale = useTransform(smoothProgress, [0, 0.55], [0.96, 1.03]);
  const videoRotateX = useTransform(smoothProgress, [0, 0.5], [6, 0]);

  // Background ambiance parallax
  const bgHaloY = useTransform(smoothProgress, [0, 1], [0, 160]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 650);
    const t3 = setTimeout(() => setPhase(3), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden pt-48 sm:pt-56 md:pt-64 pb-40"
    >
      {/* ── Layer 0: Deep void base ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 25%, #071510 0%, #040a09 35%, #030508 70%, #020304 100%)",
        }}
      />

      {/* ── Layer 1: Neural fiber canvas ── */}
      <NeuralFiberCanvas />

      {/* ── Layer 2: Depth halos with Parallax ── */}
      <motion.div
        style={{ y: bgHaloY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Large teal corona */}
        <div
          className="absolute"
          style={{
            width: "80vw",
            height: "80vw",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(12,207,176,0.12) 0%, rgba(12,207,176,0.03) 35%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Gold accent halo */}
        <div
          className="absolute"
          style={{
            width: "50vw",
            height: "50vw",
            top: "60%",
            right: "8%",
            background:
              "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
      </motion.div>

      {/* ── Layer 3: Scanlines texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(12,207,176,0.006) 3px, rgba(12,207,176,0.006) 4px)",
          zIndex: 3,
        }}
      />

      {/* ── Layer 4: Grain noise ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          zIndex: 4,
        }}
      />

      {/* ── Layer 5: Floating data fragments ── */}
      <DataFragments />

      {/* ── Layer 6: Vignette frame ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, #030508 100%)",
          zIndex: 5,
        }}
      />

      {/* ── MAIN CONTENT WITH MULTI-LAYER PARALLAX ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-7xl mx-auto px-4 sm:px-6 select-none"
      >
        {/* Overline — Generously cleared away from top header */}
        <motion.div
          style={{ y: subtextY, opacity: subtextOpacity }}
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-void/80 border border-teal-neural/25 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-neural shadow-[0_0_8px_#0ccfb0]" />
            <span className="font-mono text-[11px] sm:text-xs text-teal-neural tracking-[0.25em] uppercase font-semibold">
              Post-Tokenization · Edge AGi · Living Neural Networks
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shadow-[0_0_8px_#d4a853]" />
          </div>
        </motion.div>

        {/* ── MONUMENTAL BRAND TYPOGRAPHY WITH SCROLL SHRINK PARALLAX ── */}
        <motion.div
          style={{
            scale: titleScale,
            y: titleY,
            opacity: titleOpacity,
            transformOrigin: "center top",
          }}
          className={`relative mb-6 will-change-transform transition-all duration-1000 ${
            phase >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Subtle underglow */}
          <div
            className="absolute inset-0 -z-10 m-auto pointer-events-none"
            style={{
              width: "70%",
              height: "120px",
              background: "radial-gradient(ellipse, rgba(12,207,176,0.2) 0%, rgba(212,168,83,0.1) 45%, transparent 75%)",
              filter: "blur(50px)",
            }}
          />

          <h1
            className="font-grotesk font-extrabold tracking-[-0.04em] leading-none whitespace-nowrap text-center select-none"
            style={{
              fontSize: "clamp(64px, 14vw, 210px)",
              textShadow: "0 0 80px rgba(12,207,176,0.25)",
            }}
          >
            <span className="text-white">Neurus</span>
            <span
              style={{
                background: "linear-gradient(135deg, #d4a853 0%, #f0c040 38%, #fff1b8 70%, #d4a853 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 35px rgba(212,168,83,0.65))",
              }}
            >
              AGi
            </span>
          </h1>
        </motion.div>

        {/* ── Subtitle & Architectural Thesis with Parallax ── */}
        <motion.div
          style={{ y: subtextY, opacity: subtextOpacity }}
          className={`flex flex-col items-center max-w-3xl mb-12 transition-all duration-700 delay-300 ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Subtle separator */}
          <div className="flex items-center gap-4 w-48 mb-6 opacity-60">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-teal-neural" />
            <div className="w-1.5 h-1.5 rotate-45 border border-teal-neural bg-teal-neural/30 shadow-[0_0_6px_#0ccfb0]" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-teal-neural" />
          </div>

          <p
            className="font-grotesk text-white/80 font-normal tracking-wide mb-3"
            style={{ fontSize: "clamp(18px, 2.6vw, 28px)" }}
          >
            A quantum leap in intelligence.
          </p>

          <p className="font-grotesk text-sm sm:text-base md:text-lg text-white/50 leading-relaxed max-w-2xl text-center">
            The world's first portable AGi — engineered to{" "}
            <span className="text-teal-neural font-semibold">truly think</span>, not calculate.{" "}
            Built on 39 novel cognitive components,{" "}
            <span className="text-gold-primary font-semibold">Living Neural Networks</span>, and
            revolutionary continuous 4D spatial cognition.
          </p>
        </motion.div>

        {/* ── CINEMA-GRADE BORDERLESS VIDEO WITH PARALLAX SCROLL ── */}
        <motion.div
          style={{
            y: videoY,
            scale: videoScale,
            rotateX: videoRotateX,
            transformPerspective: 1200,
          }}
          className={`w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto will-change-transform transition-all duration-1000 delay-500 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Borderless video canvas with ambient volumetric shadow */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_20px_90px_-15px_rgba(12,207,176,0.3),0_0_120px_rgba(0,0,0,0.95)]">
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {isPlayingVideo ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/NJoZmaGKFcs?autoplay=1&rel=0&modestbranding=1"
                  title="What Real AGI Actually Looks Like"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0 block"
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setIsPlayingVideo(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Play architectural video: What Real AGI Actually Looks Like"
                >
                  <img
                    src="https://i.ytimg.com/vi/NJoZmaGKFcs/maxresdefault.jpg"
                    alt="What Real AGI Actually Looks Like — NeurusAGi Architecture"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle contrast gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Play Button Focal Anchor */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-void/85 border border-teal-neural/50 flex items-center justify-center shadow-[0_0_50px_rgba(12,207,176,0.65)] group-hover:scale-115 group-hover:bg-teal-neural group-hover:shadow-[0_0_80px_rgba(12,207,176,0.9)] transition-all duration-300">
                      <div className="w-0 h-0 border-y-[12px] sm:border-y-[15px] border-y-transparent border-l-[20px] sm:border-l-[24px] border-l-teal-neural group-hover:border-l-void ml-1.5 transition-colors duration-200" />
                    </div>
                  </div>

                  {/* Live video title badge */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-left pointer-events-none">
                    <p className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                      What Real AGI Actually Looks Like
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-teal-neural/90 mt-1">
                      Jeremy Taylor · Chief Architect · NeurusAGi Living Neural Networks
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: subtextOpacity }}
          className={`mt-20 flex flex-col items-center gap-2 transition-all duration-700 delay-1000 ${
            phase >= 3 ? "opacity-40" : "opacity-0"
          }`}
        >
          <span className="font-mono text-[10px] text-white/50 tracking-[0.3em] uppercase font-medium">Scroll to explore</span>
          <div className="relative w-[1px] h-12 overflow-hidden bg-white/10">
            <div
              className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-transparent to-teal-neural"
              style={{ animation: "scrollDrop 2s ease-in-out infinite" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #030508 0%, transparent 100%)",
          zIndex: 8,
        }}
      />

      {/* Keyframe injector */}
      <style>{`
        @keyframes dataFloat {
          0%   { opacity: 0; transform: translateY(0px); }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-18px); }
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
