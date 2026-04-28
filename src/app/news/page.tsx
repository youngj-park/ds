"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, PlusCircle, TrendingUp, Handshake, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS_ITEMS } from "@/lib/constants";
import { getStoredNews, type NewsItem } from "@/lib/news-store";
import { CATEGORY_STYLES, formatDate } from "@/components/IRNews";

const CATEGORIES = ["전체", "투자", "파트너십", "제품", "수상", "기타"];

export default function NewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState("전체");

  useEffect(() => {
    getStoredNews().then((stored) => {
      const staticItems: NewsItem[] = NEWS_ITEMS.map((n) => ({
        ...n,
        isCustom: false,
      }));
      const merged = [...stored, ...staticItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setNews(merged);
    });
  }, []);

  const filtered =
    filter === "전체" ? news : news.filter((n) => n.category === filter);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-secondary pt-24 pb-20">
        {/* Page header */}
        <div className="bg-navy-900 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/#news")}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={15} />
              홈으로
            </button>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
                  IR &amp; News
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  최신 소식
                </h1>
              </div>
              <button
                onClick={() => router.push("/news/admin")}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-accent/60 text-slate-300 hover:text-white text-sm font-medium transition-all"
              >
                <PlusCircle size={15} />
                뉴스 등록
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? "bg-accent text-white shadow-md shadow-accent/30"
                    : "bg-white border border-surface-border text-text-secondary hover:border-accent/40 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-text-muted">
              해당 카테고리의 소식이 없습니다.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => {
                const style = CATEGORY_STYLES[item.category] ?? {
                  bg: "bg-slate-50",
                  text: "text-slate-700",
                  icon: Package,
                };
                const CatIcon = style.icon;
                return (
                  <article
                    key={item.id}
                    onClick={() => router.push(`/news/${item.id}`)}
                    className="group bg-white rounded-2xl border border-surface-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {item.imageUrl ? (
                      <div className="h-44 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-44 bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                          <CatIcon size={22} className="text-accent" />
                        </div>
                      </div>
                    )}

                    <div className={`px-5 py-2.5 flex items-center gap-2 ${style.bg}`}>
                      <CatIcon size={12} className={style.text} />
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
                      <h2 className="text-base font-bold text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
