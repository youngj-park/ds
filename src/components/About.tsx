"use client";

import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      className="py-24 lg:py-32 bg-surface-secondary"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4 reveal section-hidden">
          <span className="w-8 h-px bg-accent" />
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            About
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — mission/vision */}
          <div>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6 reveal section-hidden"
            >
              반도체 제조 공정의
              <br />
              <span className="text-accent">품질 혁신</span>을 이끄는
              <br />
              비전 AI 기업
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6 reveal section-hidden">
              디에스는 딥러닝 기반 비전 AI로 반도체 웨이퍼와 패키지의 미세 결함을
              실시간 탐지·분류합니다. 사람의 눈으로는 놓칠 수 있는 나노미터 단위
              불량도 AI가 정확하게 잡아냅니다.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed reveal section-hidden">
              우리의 목표는 단순한 자동화가 아닙니다. 데이터에서 인사이트를 추출하고,
              공정 개선의 피드백 루프를 만들어 고객사의 수율을 지속적으로 높이는
              지능형 품질 파트너가 되는 것입니다.
            </p>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal section-hidden rounded-2xl p-6 bg-white border border-surface-border shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  i === STATS.length - 1 && STATS.length % 2 !== 0
                    ? "col-span-2"
                    : ""
                }`}
              >
                <div className="text-3xl sm:text-4xl font-bold text-navy-900 mb-1">
                  {stat.value}
                  <span className="text-accent text-2xl">{stat.unit}</span>
                </div>
                <div className="text-sm font-medium text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
