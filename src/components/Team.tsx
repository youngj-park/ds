"use client";

import { useEffect, useRef } from "react";
import { FlaskConical, Cpu, Building2 } from "lucide-react";
import { TEAM_MEMBERS, TEAM_STRUCTURE } from "@/lib/constants";

const STRUCT_ICONS = { FlaskConical, Cpu, Building2 } as const;

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
      className="py-24 lg:py-32 relative overflow-hidden"
      aria-labelledby="team-heading"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
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
            DEEPSEERS를 이끄는 사람들
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto reveal section-hidden">
            KAIST 박사 출신 AI·머신비전 전문가들이 반도체 후공정 혁신을 만들어갑니다.
          </p>
        </div>

        {/* Executive cards */}
        <div className="grid sm:grid-cols-3 gap-8 mb-14">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="reveal section-hidden bg-white rounded-2xl p-8 border border-surface-border shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-5">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-2 border-accent/20">
                  <img
                    src={member.image}
                    alt={`${member.name} 프로필`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-bold text-accent mb-3">{member.role}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
            </article>
          ))}
        </div>

        {/* Team structure */}
        <div className="reveal section-hidden">
          <p className="text-center text-xs font-semibold text-text-muted uppercase tracking-widest mb-5">
            팀 구성
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {TEAM_STRUCTURE.map((dept) => {
              const Icon = STRUCT_ICONS[dept.icon as keyof typeof STRUCT_ICONS];
              return (
                <div
                  key={dept.name}
                  className="bg-white rounded-xl border border-surface-border px-5 py-4 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-0.5">
                      {dept.name}
                    </p>
                    <p className="text-xs text-text-secondary">{dept.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
