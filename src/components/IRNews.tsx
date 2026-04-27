"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, Handshake, Package, Award } from "lucide-react";
import { NEWS_ITEMS } from "@/lib/constants";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  투자: { bg: "bg-emerald-50", text: "text-emerald-700", icon: TrendingUp },
  파트너십: { bg: "bg-blue-50", text: "text-blue-700", icon: Handshake },
  제품: { bg: "bg-violet-50", text: "text-violet-700", icon: Package },
  수상: { bg: "bg-amber-50", text: "text-amber-700", icon: Award },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function IRNews() {
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
      id="news"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4 reveal section-hidden">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                IR &amp; News
              </span>
            </div>
            <h2
              id="news-heading"
              className="text-3xl sm:text-4xl font-bold text-text-primary reveal section-hidden"
            >
              최신 소식
            </h2>
          </div>
          <button className="reveal section-hidden self-start sm:self-auto flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group">
            더보기
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* News cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_ITEMS.map((item) => {
            const style = CATEGORY_STYLES[item.category] ?? {
              bg: "bg-slate-50",
              text: "text-slate-700",
              icon: Package,
            };
            const CatIcon = style.icon;
            return (
              <article
                key={item.id}
                className="reveal section-hidden group rounded-2xl border border-surface-border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Category strip */}
                <div className={`px-5 py-3 flex items-center gap-2 ${style.bg}`}>
                  <CatIcon size={13} className={style.text} />
                  <span className={`text-xs font-semibold ${style.text}`}>
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <time
                    dateTime={item.date}
                    className="text-xs text-text-muted block mb-2"
                  >
                    {formatDate(item.date)}
                  </time>
                  <h3 className="text-sm font-bold text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
