"use client";

import { useEffect, useRef } from "react";
import { Eye, BarChart3, Cpu, ClipboardCheck } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICON_MAP = {
  Eye,
  BarChart3,
  Cpu,
  ClipboardCheck,
} as const;

export default function Services() {
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
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal section-hidden">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Services
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 reveal section-hidden"
          >
            반도체 품질을 혁신하는
            <br />
            디에스의 솔루션
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto reveal section-hidden">
            검사부터 분석, 현장 배포, 컨설팅까지 — 비전 AI의 전 과정을 지원합니다.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP];
            return (
              <article
                key={service.id}
                className="reveal section-hidden group relative rounded-2xl border border-surface-border bg-white p-7 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-accent group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {service.name}
                </h3>
                <p className="text-xs font-semibold text-accent mb-3">
                  {service.shortDesc}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
