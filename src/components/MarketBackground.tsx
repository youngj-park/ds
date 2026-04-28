"use client";

import { useEffect, useRef, useState } from "react";
import { MARKET_STATS } from "@/lib/constants";

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    setCount(0);
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, started]);
  return count;
}

function BigStat({
  value,
  unit,
  label,
  sublabel,
  color,
  started,
  delay,
}: (typeof MARKET_STATS)[number] & { started: boolean; delay: number }) {
  const count = useCountUp(value, 1800 + delay, started);
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`text-6xl sm:text-7xl lg:text-8xl font-bold tabular-nums leading-none mb-2 ${color}`}
        aria-label={`${value}${unit}`}
      >
        {count}
        <span className="text-4xl sm:text-5xl lg:text-6xl">{unit}</span>
      </div>
      <p className="text-white font-semibold text-lg mb-1">{label}</p>
      <p className="text-slate-400 text-sm">{sublabel}</p>
    </div>
  );
}

export default function MarketBackground() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          el.querySelectorAll(".reveal").forEach((node, i) => {
            (node as HTMLElement).style.transitionDelay = `${i * 120}ms`;
            node.classList.add("section-visible");
            node.classList.remove("section-hidden");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="market"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-navy-900 overflow-hidden relative"
      aria-labelledby="market-heading"
    >
      {/* Circuit grid bg */}
      <div className="absolute inset-0 circuit-bg-dark opacity-60" aria-hidden="true" />
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 -translate-y-1/2 rounded-full bg-blue-400/8 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-4 reveal section-hidden">
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Market Opportunity
          </span>
          <span className="w-8 h-px bg-accent" />
        </div>

        <h2
          id="market-heading"
          className="text-center text-3xl sm:text-4xl font-bold text-white mb-4 reveal section-hidden"
        >
          어드밴스드 패키징, 반도체의 새 전장
        </h2>
        <p className="text-center text-slate-300 text-lg max-w-2xl mx-auto mb-16 leading-relaxed reveal section-hidden">
          웨이퍼에서 실제 제품에 쓰이는 반도체 칩이 되는 후공정 —{" "}
          <strong className="text-white">패키징 장비 시장</strong>은 2029년까지
          급격한 성장이 예상됩니다.
        </p>

        {/* Big numbers */}
        <div className="grid sm:grid-cols-2 gap-12 lg:gap-24 mb-16">
          {MARKET_STATS.map((stat, i) => (
            <div key={stat.label} className="reveal section-hidden">
              <BigStat {...stat} started={started} delay={i * 200} />
            </div>
          ))}
        </div>

        {/* Divider + context */}
        <div className="border-t border-white/10 pt-10 grid sm:grid-cols-3 gap-6 text-center reveal section-hidden">
          {[
            { value: "HBM", label: "고대역폭 메모리 핵심 공정" },
            { value: "AI 반도체", label: "어드밴스드 패키징 수요 폭증" },
            { value: "후공정", label: "품질 검사 자동화 필수 시대" },
          ].map((item) => (
            <div key={item.value} className="flex flex-col items-center gap-1">
              <span className="text-accent font-bold text-lg">{item.value}</span>
              <span className="text-slate-400 text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
