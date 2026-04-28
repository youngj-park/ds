"use client";

import { useEffect, useRef } from "react";
import { Scissors, Shield, ScanLine, CheckCircle2 } from "lucide-react";
import { PROCESSES } from "@/lib/constants";

const ICON_MAP = { Scissors, Shield, ScanLine } as const;

export default function AppliedProcesses() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="processes"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface-secondary"
      aria-labelledby="processes-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal section-hidden">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Applied Processes
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2
            id="processes-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-5 reveal section-hidden"
          >
            적용 공정
          </h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed reveal section-hidden">
            현재 <strong className="text-text-primary">5종의 어드밴스드 패키지 장비</strong>에
            머신비전 솔루션을 공급하고 있으며,
            <br className="hidden sm:block" />
            2030년까지 약 <strong className="text-accent">200개 장비</strong>에 DEEPSEERS를
            공급할 계획입니다.
          </p>
        </div>

        {/* Process cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {PROCESSES.map((proc) => {
            const Icon = ICON_MAP[proc.icon as keyof typeof ICON_MAP];
            return (
              <article
                key={proc.id}
                className="reveal section-hidden group relative rounded-2xl bg-white border border-surface-border p-8 hover:shadow-xl hover:shadow-navy-900/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <Icon size={22} className="text-white" />
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {proc.name}
                </h3>

                {/* Market size */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 mb-5">
                  <span className="text-accent font-bold text-sm">{proc.market}</span>
                  <span className="text-accent/70 text-xs">시장규모 ({proc.marketYear})</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2">
                  {proc.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 size={14} className="text-accent shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
