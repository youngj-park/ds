"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const bigTextRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const grainCanvas = grainCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const grainCtx = grainCanvas.getContext("2d")!;

    const density = " .:-=+*#%@";

    const params = {
      rotation: 0,
      atmosphereShift: 0,
      glitchIntensity: 0,
      glitchFrequency: 0,
    };

    gsap.to(params, { rotation: Math.PI * 2, duration: 20, repeat: -1, ease: "none" });
    gsap.to(params, { atmosphereShift: 1, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(params, {
      glitchIntensity: 1,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      repeatDelay: Math.random() * 3 + 1,
    });
    gsap.to(params, { glitchFrequency: 1, duration: 0.05, repeat: -1, yoyo: true, ease: "none" });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        if (bigTextRef.current) {
          bigTextRef.current.style.transform = `translateY(${p * 100}px)`;
          bigTextRef.current.style.opacity = String(Math.max(0, 1 - p * 1.5));
        }
        if (leftTextRef.current) {
          leftTextRef.current.style.transform = `translateX(${-p * 200}px)`;
          leftTextRef.current.style.opacity = String(Math.max(0, 1 - p * 2));
        }
        if (rightTextRef.current) {
          rightTextRef.current.style.transform = `translateX(${p * 200}px)`;
          rightTextRef.current.style.opacity = String(Math.max(0, 1 - p * 2));
        }
        if (bottomTextRef.current) {
          bottomTextRef.current.style.transform = `translateY(${p * 50}px)`;
          bottomTextRef.current.style.opacity = String(Math.max(0, 1 - p * 1.5));
        }
      },
    });

    const generateFilmGrain = (width: number, height: number, intensity = 0.15) => {
      const imageData = grainCtx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * intensity * 255;
        data[i] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 1] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 2] = Math.max(0, Math.min(255, 128 + grain));
        data[i + 3] = Math.abs(grain) * 3;
      }
      return imageData;
    };

    const drawGlitchedOrb = (
      centerX: number,
      centerY: number,
      radius: number,
      hue: number,
      glitchIntensity: number
    ) => {
      ctx.save();

      const shouldGlitch = Math.random() < 0.1 && glitchIntensity > 0.5;
      const glitchOffset = shouldGlitch ? (Math.random() - 0.5) * 20 * glitchIntensity : 0;
      const glitchScale = shouldGlitch ? 1 + (Math.random() - 0.5) * 0.3 * glitchIntensity : 1;

      if (shouldGlitch) {
        ctx.translate(glitchOffset, glitchOffset * 0.8);
        ctx.scale(glitchScale, 1 / glitchScale);
      }

      const orbGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
      orbGradient.addColorStop(0, `hsla(${hue + 10}, 100%, 95%, 0.9)`);
      orbGradient.addColorStop(0.2, `hsla(${hue + 20}, 90%, 80%, 0.7)`);
      orbGradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.4)`);
      orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orbGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerRadius = radius * 0.3;
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, 0.8)`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
      ctx.fill();

      if (shouldGlitch) {
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = `hsla(100, 100%, 50%, ${0.6 * glitchIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX + glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(240, 100%, 50%, ${0.5 * glitchIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX - glitchOffset * 0.5, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * glitchIntensity})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const y = centerY - radius + Math.random() * radius * 2;
          ctx.beginPath();
          ctx.moveTo(centerX - radius + Math.random() * 20, y);
          ctx.lineTo(centerX + radius - Math.random() * 20, y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(255, 0, 255, ${0.4 * glitchIntensity})`;
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            centerX - radius + Math.random() * radius * 2,
            centerY - radius + Math.random() * radius * 2,
            Math.random() * 10 + 2,
            Math.random() * 10 + 2
          );
        }
      }

      ctx.strokeStyle = `hsla(${hue + 20}, 80%, 70%, 0.6)`;
      ctx.lineWidth = 2;

      if (shouldGlitch) {
        for (let i = 0; i < 8; i++) {
          const ringRadius = radius * 1.2 + (Math.random() - 0.5) * 10 * glitchIntensity;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, (i / 8) * Math.PI * 2, ((i + 1) / 8) * Math.PI * 2);
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (shouldGlitch && Math.random() < 0.3) {
        ctx.globalCompositeOperation = "difference";
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * glitchIntensity})`;
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            centerX - radius,
            centerY - radius + Math.random() * radius * 2,
            radius * 2,
            Math.random() * 5 + 1
          );
        }
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.restore();
    };

    function render() {
      timeRef.current += 0.016;
      const time = timeRef.current;

      const width = (canvas.width = grainCanvas.width = window.innerWidth);
      const height = (canvas.height = grainCanvas.height = window.innerHeight);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.2;

      const bgGradient = ctx.createRadialGradient(
        centerX, centerY - 50, 0,
        centerX, centerY, Math.max(width, height) * 0.8
      );
      const hue = 180 + params.atmosphereShift * 60;
      bgGradient.addColorStop(0, `hsla(${hue + 40}, 80%, 60%, 0.4)`);
      bgGradient.addColorStop(0.3, `hsla(${hue}, 60%, 40%, 0.3)`);
      bgGradient.addColorStop(0.6, `hsla(${hue - 20}, 40%, 20%, 0.2)`);
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawGlitchedOrb(centerX, centerY, radius, hue, params.glitchIntensity);

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const spacing = 9;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      for (let i = 0; i < cols && i < 150; i++) {
        for (let j = 0; j < rows && j < 100; j++) {
          const x = (i - cols / 2) * spacing + centerX;
          const y = (j - rows / 2) * spacing + centerY;
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius && Math.random() > 0.4) {
            const z = Math.sqrt(Math.max(0, radius * radius - dx * dx - dy * dy));
            const rotZ = dx * Math.sin(params.rotation) + z * Math.cos(params.rotation);
            const brightness = (rotZ + radius) / (radius * 2);

            if (rotZ > -radius * 0.3) {
              let char = density[Math.floor(brightness * (density.length - 1))];
              if (dist < radius * 0.8 && params.glitchIntensity > 0.8 && Math.random() < 0.3) {
                const g = ["█", "▓", "▒", "░", "▄", "▀", "■", "□"];
                char = g[Math.floor(Math.random() * g.length)];
              }
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, brightness)})`;
              ctx.fillText(char, x, y);
            }
          }
        }
      }

      grainCtx.clearRect(0, 0, width, height);
      grainCtx.putImageData(generateFilmGrain(width, height, 0.22 + Math.sin(time * 10) * 0.03), 0, 0);

      if (params.glitchIntensity > 0.5) {
        grainCtx.globalCompositeOperation = "screen";
        for (let i = 0; i < 200; i++) {
          grainCtx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5 * params.glitchIntensity})`;
          grainCtx.beginPath();
          grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 0.5, 0, Math.PI * 2);
          grainCtx.fill();
        }
      }

      grainCtx.globalCompositeOperation = "screen";
      for (let i = 0; i < 100; i++) {
        grainCtx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`;
        grainCtx.beginPath();
        grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        grainCtx.fill();
      }

      grainCtx.globalCompositeOperation = "multiply";
      for (let i = 0; i < 50; i++) {
        grainCtx.fillStyle = `rgba(0,0,0,${Math.random() * 0.5 + 0.5})`;
        grainCtx.beginPath();
        grainCtx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
        grainCtx.fill();
      }

      frameRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(frameRef.current);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      aria-label="히어로 섹션"
      ref={containerRef}
      style={{ width: "100%", height: "200vh", background: "#000" }}
    >
      {/* Big headline */}
      <div
        ref={bigTextRef}
        style={{
          position: "fixed",
          bottom: "15%",
          left: 0,
          right: 0,
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: "clamp(4rem, 15vw, 12rem)",
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 0.8,
            letterSpacing: "-0.02em",
            textShadow: "0 0 50px rgba(255, 255, 255, 0.3)",
            filter: "contrast(1.2)",
          }}
        >
          DEEPSEERS
        </div>
      </div>

      {/* Left text */}
      <div
        ref={leftTextRef}
        style={{
          position: "fixed",
          left: "2rem",
          top: "40%",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "11px",
            color: "white",
            lineHeight: 1.4,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            opacity: 0.8,
            maxWidth: "150px",
          }}
        >
          AI 기반<br />
          반도체 패키지<br />
          불량검출 시스템
        </div>
      </div>

      {/* Right text */}
      <div
        ref={rightTextRef}
        style={{
          position: "fixed",
          right: "2rem",
          top: "40%",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "11px",
            color: "white",
            lineHeight: 1.4,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            opacity: 0.8,
            maxWidth: "150px",
            textAlign: "right",
          }}
        >
          Advanced<br />
          Semiconductor<br />
          AI Vision
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        ref={bottomTextRef}
        style={{
          position: "fixed",
          bottom: "8%",
          left: "2rem",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "10px",
            color: "white",
            letterSpacing: "1px",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          어드밴스드 패키징을 위한 더 빠르고, 더 정확한 솔루션
        </div>
      </div>

      {/* Canvas container — sticky so it stays in viewport while scrolling through 200vh */}
      <div style={{ position: "sticky", top: 0, width: "100%", height: "100vh" }}>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#000",
          }}
        />
        <canvas
          ref={grainCanvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            mixBlendMode: "overlay",
            opacity: 0.6,
          }}
        />
      </div>
    </section>
  );
}
