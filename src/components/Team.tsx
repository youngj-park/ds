"use client";

import { useEffect, useRef } from "react";
import { TEAM_MEMBERS } from "@/lib/constants";

const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-cyan-600",
  "bg-teal-600",
  "bg-sky-600",
] as const;

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((node, i) => {
            (node as HTMLElement).style.transitionDelay = `${i * 80}ms`;
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
      id="team"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface-secondary circuit-bg"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4 reveal section-hidden">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">
              Team
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 reveal section-hidden"
          >
            디에스를 이끄는 사람들
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto reveal section-hidden">
            반도체 엔지니어링, AI 연구, 사업 개발의 최정예 전문가들이 함께합니다.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <article
              key={member.id}
              className="reveal section-hidden bg-white rounded-2xl p-8 border border-surface-border shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-5">
                <div
                  className={`w-20 h-20 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                  aria-label={`${member.name} 프로필 이미지`}
                >
                  {member.initial}
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-accent mb-3">
                {member.role}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
