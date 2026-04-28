"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS_ITEMS } from "@/lib/constants";
import { getStoredNews, type NewsItem } from "@/lib/news-store";
import { CATEGORY_STYLES, formatDate } from "@/components/IRNews";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const stored = getStoredNews();
    const staticItems: NewsItem[] = NEWS_ITEMS.map((n) => ({
      ...n,
      isCustom: false,
    }));
    const all = [...stored, ...staticItems];
    const found = all.find((n) => n.id === id);
    if (found) {
      setItem(found);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-surface-secondary pt-20">
          <div className="text-center">
            <p className="text-text-muted mb-4">존재하지 않는 뉴스입니다.</p>
            <button
              onClick={() => router.push("/news")}
              className="text-accent hover:underline text-sm"
            >
              목록으로 돌아가기
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-surface-secondary pt-20" />
        <Footer />
      </>
    );
  }

  const style = CATEGORY_STYLES[item.category] ?? {
    bg: "bg-slate-50",
    text: "text-slate-700",
    icon: Package,
  };
  const CatIcon = style.icon;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-secondary pt-24 pb-20">
        {/* Dark header strip */}
        <div className="bg-navy-900 pt-10 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/news")}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={15} />
              뉴스 목록
            </button>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${style.bg} ${style.text}`}
            >
              <CatIcon size={11} />
              {item.category}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              {item.title}
            </h1>

            <time
              dateTime={item.date}
              className="text-slate-400 text-sm"
            >
              {formatDate(item.date)}
            </time>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-2xl shadow-sm border border-surface-border overflow-hidden">
            {item.imageUrl && (
              <div className="w-full max-h-96 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8 sm:p-10">
              {/* Summary lead */}
              <p className="text-lg text-text-secondary leading-relaxed border-l-4 border-accent pl-4 mb-8 font-medium">
                {item.summary}
              </p>

              {/* Full content */}
              <div className="prose prose-slate max-w-none">
                {item.content.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-text-primary leading-relaxed mb-5 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push("/news")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-surface-border text-text-secondary hover:border-accent hover:text-accent text-sm font-medium transition-all"
            >
              <ArrowLeft size={14} />
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
