import React, { useEffect, useRef } from 'react';

interface GhostCursorProps {
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  brightness?: number;
  color?: string;
  edgeIntensity?: number;
}

export default function GhostCursor({
  trailLength = 50,
  inertia = 0.1,
  grainIntensity = 0,
  bloomStrength = 0.3,
  bloomRadius = 2.8,
  brightness = 2.1,
  color = '#43a881',
  edgeIntensity = 0.4,
}: GhostCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentMouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trail = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Apply inertia to mouse movement
      currentMouse.current.x += (mouse.current.x - currentMouse.current.x) * inertia;
      currentMouse.current.y += (mouse.current.y - currentMouse.current.y) * inertia;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add current mouse position to trail
      trail.current.push({ x: currentMouse.current.x, y: currentMouse.current.y, age: 0 });
      
      // Update ages and remove old points
      trail.current.forEach(p => p.age += 1);
      if (trail.current.length > trailLength) {
        trail.current.shift();
      }

      // Draw trail
      if (trail.current.length > 1) {
        // We are intentionally skipping drawing the trail line based on user request.
        // The trail array is still maintained for inertia calculations if needed.
      }

      // Draw cursor head
      ctx.beginPath();
      ctx.arc(currentMouse.current.x, currentMouse.current.y, 4 * edgeIntensity, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = bloomRadius * 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Optional grain effect
      if (grainIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i+3] > 0) { // Only apply grain to drawn pixels
            const noise = (Math.random() - 0.5) * 50 * grainIntensity;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
            data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [trailLength, inertia, color, bloomStrength, bloomRadius, brightness, edgeIntensity, grainIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
