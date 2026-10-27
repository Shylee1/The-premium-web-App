import React, { useEffect, useRef } from 'react';

interface HyperspeedProps {
  effectOptions?: {
    onColor?: string;
    offColor?: string;
    speed?: number;
  };
}

export function Hyperspeed({ effectOptions }: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onColor = '#143D36', offColor = '#020607', speed = 2 } = effectOptions || {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; z: number; o: number }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        o: Math.random(),
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = offColor;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed * 5;

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / width) * 3;
          const shade = Math.floor((1 - star.z / width) * 255);
          
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = onColor;
          ctx.globalAlpha = star.o * (1 - star.z / width);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onColor, offColor, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
