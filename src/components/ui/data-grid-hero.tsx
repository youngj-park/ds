"use client";

import { useRef, useEffect, useCallback, ReactNode } from "react";

export interface DataGridHeroProps {
  rows?: number;
  cols?: number;
  spacing?: number;
  duration?: number;
  color?: string;
  animationType?: "pulse" | "wave" | "random";
  pulseEffect?: boolean;
  mouseGlow?: boolean;
  opacityMin?: number;
  opacityMax?: number;
  background?: string;
  children?: ReactNode;
  className?: string;
}

export default function DataGridHero({
  rows = 25,
  cols = 35,
  spacing = 4,
  duration = 5,
  color = "#3b82f6",
  animationType = "pulse",
  pulseEffect = true,
  mouseGlow = true,
  opacityMin = 0.05,
  opacityMax = 0.6,
  background = "#1a2332",
  children,
  className = "",
}: DataGridHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouse: { x: -9999, y: -9999 },
    width: 0,
    height: 0,
    start: 0,
    raf: 0,
    randomOffsets: [] as number[],
  });

  // Parse any CSS color string to [r, g, b] via a temporary canvas
  const parseColor = useCallback((colorStr: string): [number, number, number] => {
    try {
      const tmp = document.createElement("canvas");
      tmp.width = tmp.height = 1;
      const c = tmp.getContext("2d")!;
      c.fillStyle = colorStr;
      c.fillRect(0, 0, 1, 1);
      const d = c.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2]];
    } catch {
      return [59, 130, 246];
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    state.randomOffsets = Array.from(
      { length: rows * cols },
      () => Math.random() * Math.PI * 2
    );

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      state.width = container.offsetWidth;
      state.height = container.offsetHeight;
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.scale(dpr, dpr);
    };

    const [r, g, b] = parseColor(color);
    const cx = cols / 2;
    const cy = rows / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);

    const getOpacity = (row: number, col: number, t: number): number => {
      if (!pulseEffect) return opacityMin;
      let phase = 0;

      if (animationType === "pulse") {
        const dx = col - cx;
        const dy = row - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        phase = (t / duration) * Math.PI * 2 - (dist / maxDist) * Math.PI * 4;
      } else if (animationType === "wave") {
        phase = (t / duration) * Math.PI * 2 - (col / cols) * Math.PI * 4;
      } else {
        phase =
          (t / duration) * Math.PI * 2 +
          state.randomOffsets[row * cols + col];
      }

      return opacityMin + ((Math.sin(phase) + 1) / 2) * (opacityMax - opacityMin);
    };

    const draw = (timestamp: number) => {
      if (!state.start) state.start = timestamp;
      const t = (timestamp - state.start) / 1000;
      const { width, height, mouse } = state;

      const cellW = width / cols;
      const cellH = height / rows;
      const effective = Math.max(3, Math.min(cellW, cellH) - spacing);
      const dotR = Math.max(1.5, effective * 0.18);
      const glowRadius = Math.max(cellW, cellH) * 5;

      ctx.clearRect(0, 0, width, height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = (col + 0.5) * cellW;
          const y = (row + 0.5) * cellH;

          let opacity = getOpacity(row, col, t);

          if (mouseGlow && mouse.x > -1000) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < glowRadius) {
              const boost = (1 - dist / glowRadius) ** 2 * opacityMax * 1.2;
              opacity = Math.min(1, opacity + boost);
            }
          }

          ctx.fillStyle = `rgba(${r},${g},${b},${opacity.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      state.raf = requestAnimationFrame(draw);
    };

    resize();
    state.raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      state.mouse = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      state.start = 0;
    };
  }, [
    rows, cols, spacing, duration, color, animationType,
    pulseEffect, mouseGlow, opacityMin, opacityMax, parseColor,
  ]);

  return (
    <div
      ref={containerRef}
      style={{ background }}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
