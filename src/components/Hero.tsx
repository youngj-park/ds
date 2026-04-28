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
      >
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(26,35,50,0.65) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            DEEPSEERS · Advanced Semiconductor AI
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-6 max-w-4xl">
            사람의 개입을 최소화하는,
            <br />
            <span className="text-[#3b82f6]">AI 기반 반도체 패키지</span>
            <br />
            불량검출 토탈 시스템
          </h1>

          {/* Sub copy */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-10">
            어드밴스드 패키징을 위한 더 빠르고, 더 정확한 머신비전 솔루션
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("#services")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-[#3b82f6]/30 hover:shadow-[#3b82f6]/50 hover:-translate-y-0.5"
            >
              솔루션 알아보기
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
            onClick={() => scrollTo("#market")}
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
