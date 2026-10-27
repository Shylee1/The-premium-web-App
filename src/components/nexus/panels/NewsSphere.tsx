import React, { useEffect, useRef, useState, useMemo } from "react";
import { Article } from "@/data/newsArticles";

interface NewsSphereProps {
  articles: Article[];
  selectedSlug?: string | null;
  onSelectArticle: (article: Article) => void;
}

interface SphereTileData {
  id: string;
  article?: Article;
  isEmpty: boolean;
  yaw: number;   // degrees
  pitch: number; // degrees
}

export default function NewsSphere({
  articles,
  selectedSlug,
  onSelectArticle,
}: NewsSphereProps) {
  // Continuous rotation angles (degrees) — never stops, never snaps back
  const rotYRef = useRef(0);
  const rotXRef = useRef(-10);
  const [, setTick] = useState(0);

  // Drag physics refs
  const isDragging = useRef(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocity = useRef<{ vx: number; vy: number }>({ vx: 0.16, vy: 0 });
  const hasMovedSignificantly = useRef(false);
  const animFrameId = useRef<number | null>(null);

  // Generous radius so tiles have breathing room and never overlap
  const radius = 310;
  const TOTAL_TILES = 72; // 72 total positions on the sphere

  // Compute spherical coordinates with active articles distributed in a CHECKERBOARD pattern across the entire sphere
  const tiles: SphereTileData[] = useMemo(() => {
    const list: SphereTileData[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad
    const numArticles = articles.length;

    // Build set of indices for active articles spread evenly throughout the 72 nodes
    const activeIndices = new Set<number>();
    if (numArticles > 0) {
      const step = TOTAL_TILES / numArticles;
      for (let a = 0; a < numArticles; a++) {
        // Distribute active articles evenly across the entire surface
        const idx = Math.min(TOTAL_TILES - 1, Math.round(a * step));
        activeIndices.add(idx);
      }
    }

    let articleCounter = 0;

    for (let i = 0; i < TOTAL_TILES; i++) {
      const y = 1 - (i / (TOTAL_TILES - 1)) * 2; // y from 1 (north pole) to -1 (south pole)
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const pitch = Math.asin(y) * (180 / Math.PI);
      const yaw = Math.atan2(x, z) * (180 / Math.PI);

      const isActive = activeIndices.has(i) && articleCounter < numArticles;
      const article = isActive ? articles[articleCounter++] : undefined;

      list.push({
        id: `tile-${i}`,
        article,
        isEmpty: !article,
        yaw,
        pitch,
      });
    }

    return list;
  }, [articles, TOTAL_TILES]);

  // Continuous infinite smooth rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (!isDragging.current) {
        // Continuous rotation around Y axis — never resets or snaps back
        rotYRef.current = (rotYRef.current + velocity.current.vx * (dt * 60)) % 360;
        rotXRef.current = Math.max(-50, Math.min(50, rotXRef.current + velocity.current.vy * (dt * 60)));

        // Gentle decay back to baseline ambient spin
        velocity.current.vx = velocity.current.vx * 0.96 + 0.14 * 0.04;
        velocity.current.vy = velocity.current.vy * 0.94;
      }

      setTick((t) => (t + 1) % 100000);
      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasMovedSignificantly.current = false;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointerPos.current.x;
    const dy = e.clientY - lastPointerPos.current.y;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedSignificantly.current = true;
    }

    lastPointerPos.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.35;
    rotYRef.current = (rotYRef.current + dx * sensitivity) % 360;
    rotXRef.current = Math.max(-55, Math.min(55, rotXRef.current - dy * sensitivity));

    velocity.current = {
      vx: dx * 0.35,
      vy: -dy * 0.35,
    };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative select-none cursor-grab active:cursor-grabbing mx-auto w-full max-w-[1050px] h-[680px] flex items-center justify-center"
      style={{
        perspective: "1250px",
        touchAction: "none",
      }}
      data-agent-action="3d-intel-sphere"
      aria-label="3D Interactive Intel Sphere - 25 Articles by Jeremy Taylor"
    >
      {/* 3D Transform Hub */}
      <div
        style={{
          position: "relative",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`,
        }}
      >
        {tiles.map((tile) => {
          if (tile.isEmpty) {
            // EMPTY PLACEHOLDER TILE: Displays logo at low opacity for future articles
            return (
              <div
                key={tile.id}
                style={{
                  position: "absolute",
                  width: "116px",
                  height: "74px",
                  marginLeft: "-58px",
                  marginTop: "-37px",
                  transform: `rotateY(${tile.yaw}deg) rotateX(${tile.pitch}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  cursor: "default",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(12,207,176,0.12)",
                  boxShadow: "none",
                  transition: "border 0.2s ease",
                }}
                title="Reserved slot for upcoming research dispatch by Jeremy Taylor"
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage:
                      "url('https://cdn-ai.onspace.ai/onspace/project/uploads/VTYhdTdtxks37QntytFFSG/logo1.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.12,
                    backgroundColor: "#030508",
                  }}
                />
              </div>
            );
          }

          // ACTIVE ARTICLE TILE: Written by Jeremy Taylor
          const article = tile.article!;
          const isSelected = selectedSlug === article.slug;

          return (
            <div
              key={tile.id}
              className="sphere-tile"
              data-agent-action="select-sphere-article"
              data-agent-slug={article.slug}
              onClick={(e) => {
                if (hasMovedSignificantly.current) {
                  e.preventDefault();
                  return;
                }
                onSelectArticle(article);
              }}
              style={{
                position: "absolute",
                width: "116px",
                height: "74px",
                marginLeft: "-58px",
                marginTop: "-37px",
                transform: `rotateY(${tile.yaw}deg) rotateX(${tile.pitch}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                cursor: "pointer",
                borderRadius: "8px",
                overflow: "hidden",
                border: isSelected
                  ? "1.5px solid #d4a853"
                  : "1px solid rgba(12,207,176,0.5)",
                boxShadow: isSelected
                  ? "0 0 24px rgba(212,168,83,0.7), inset 0 0 10px rgba(0,0,0,0.6)"
                  : "0 0 16px rgba(12,207,176,0.3), inset 0 0 8px rgba(0,0,0,0.6)",
                transition: "box-shadow 0.2s ease, border 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${article.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(3,7,12,0.9)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(3,5,8,0.95) 0%, rgba(3,5,8,0.4) 65%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "6px 7px",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "7.5px",
                      color: "#d4a853",
                      fontFamily: "'Space Mono', monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "2px",
                    }}
                  >
                    By Jeremy Taylor
                  </span>
                  <p
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.25,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                      margin: 0,
                    }}
                  >
                    {article.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Persistent floating prompt */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "11px",
          color: "rgba(12,207,176,0.85)",
          pointerEvents: "none",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        Drag to spin • Click to read dispatch
      </div>
    </div>
  );
}
