"use client";

import { ChevronDown } from "lucide-react";
import DataGridHero from "@/components/ui/data-grid-hero";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" aria-label="히어로 섹션">
      <DataGridHero
        rows={28}
        cols={48}
        spacing={5}
        duration={6}
        color="#3b82f6"
        animationType="pulse"
        pulseEffect={true}
        mouseGlow={true}
        opacityMin={0.04}
        opacityMax={0.55}
        background="#1a2332"
        className="min-h-screen"
      >
        {/* Gradient vignette — edges darker, center clear */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(26,35,50,0.65) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            AI Vision Inspection Platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl">
            보이지 않는 결함까지,
            <br />
            <span className="text-[#3b82f6]">AI가 봅니다</span>
          </h1>

          {/* Sub copy */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
            반도체 비전 검사의 새로운 기준을 디에스가 만듭니다.
            <br className="hidden sm:block" />
            정밀 AI로 공정 품질을 혁신하고, 수율을 높입니다.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("#services")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-[#3b82f6]/30 hover:shadow-[#3b82f6]/50 hover:-translate-y-0.5"
            >
              플랫폼 알아보기
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/30 hover:border-white/60 text-white font-semibold text-base transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
            >
              데모 요청하기
            </button>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo("#about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors animate-bounce"
            aria-label="아래로 스크롤"
          >
            <ChevronDown size={28} />
          </button>
        </div>
      </DataGridHero>
    </section>
  );
}
