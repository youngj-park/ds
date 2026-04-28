"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/constants";

function useCountUp(target: string, started: boolean) {
  const numeric = parseInt(target.replace(/\D/g, ""), 10);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || isNaN(numeric)) return;
    setCount(0);
    const startTime = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(numeric * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [numeric, started]);
  return count;
}

function StatCard({
  stat,
  started,
}: {
  stat: (typeof STATS)[number];
  started: boolean;
}) {
  const count = useCountUp(stat.value, started);
  const numeric = parseInt(stat.value.replace(/\D/g, ""), 10);
  const display = isNaN(numeric) ? stat.value : String(count);

  return (
    <div className="rounded-2xl p-6 bg-white border border-surface-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="text-3xl sm:text-4xl font-bold text-navy-900 mb-1 tabular-nums">
        {display}
        <span className="text-accent text-2xl">{stat.unit}</span>
      </div>
      <div className="text-sm font-medium text-text-secondary leading-snug">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
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
            (node as HTMLElement).style.transitionDelay = `${i * 100}ms`;
            node.classList.add("section-visible");
            node.classList.remove("section-hidden");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4 reveal section-hidden">
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            About
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6 reveal section-hidden"
            >
              어드밴스드 반도체 시장을
              <br />
              혁신하는{" "}
              <span className="text-accent">차세대 AI</span>
              <br />
              머신비전 솔루션
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5 reveal section-hidden">
              디에스는 인공지능 기반 머신비전 기술로 반도체 패키징 후공정의
              품질 혁신을 이끄는 딥테크 스타트업입니다.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed reveal section-hidden">
              기존에 사람의 경험에 의존하던 불량 검출을 AI로 자동화하여,
              글로벌 반도체 기업이 요구하는{" "}
              <strong className="text-text-primary">
                '사람 개입 최소화'
              </strong>
              를 실현합니다.
            </p>
          </div>

          {/* Right — stat cards with count-up */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`reveal section-hidden ${i === STATS.length - 1 && STATS.length % 2 !== 0 ? "col-span-2" : ""}`}>
                <StatCard stat={stat} started={started} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
