"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  ImagePlus,
  Lock,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";
import {
  ADMIN_PASSWORD,
  compressImage,
  deleteNewsItem,
  getStoredNews,
  saveNewsItem,
  type NewsItem,
} from "@/lib/news-store";
import { formatDate } from "@/components/IRNews";

const CATEGORIES = ["투자", "파트너십", "제품", "수상", "기타"];

type FormData = {
  date: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
};

const EMPTY_FORM: FormData = {
  date: new Date().toISOString().slice(0, 10),
  category: "제품",
  title: "",
  summary: "",
  content: "",
  imageUrl: "",
};

// ── Auth gate ──────────────────────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("ds_admin_auth", "1");
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={26} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">관리자 로그인</h1>
          <p className="text-slate-400 text-sm">뉴스 관리 페이지입니다.</p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              비밀번호
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="관리자 비밀번호"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
              autoFocus
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-400">
                비밀번호가 올바르지 않습니다.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

// ── News form ──────────────────────────────────────────────────────────────

function NewsForm({
  onSave,
  onCancel,
}: {
  onSave: (item: NewsItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await compressImage(file);
      set("imageUrl", dataUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) return;
    const saved = saveNewsItem(form);
    onSave(saved);
  };

  const inputCls =
    "w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all";

  return (
    <div className="bg-white rounded-2xl border border-surface-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
        <h2 className="font-bold text-text-primary text-lg">새 뉴스 작성</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              preview
                ? "bg-accent text-white"
                : "bg-surface-secondary text-text-secondary hover:text-text-primary"
            }`}
          >
            <Eye size={13} />
            미리보기
          </button>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-secondary transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {preview ? (
        /* Preview */
        <div className="p-6 sm:p-8">
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="미리보기"
              className="w-full max-h-72 object-cover rounded-xl mb-6"
            />
          )}
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${
              form.category === "투자"
                ? "bg-emerald-50 text-emerald-700"
                : form.category === "파트너십"
                  ? "bg-blue-50 text-blue-700"
                  : form.category === "제품"
                    ? "bg-violet-50 text-violet-700"
                    : form.category === "수상"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-50 text-slate-700"
            }`}
          >
            {form.category}
          </span>
          <p className="text-xs text-text-muted mb-2">{form.date}</p>
          <h3 className="text-xl font-bold text-text-primary mb-3">
            {form.title || "(제목 없음)"}
          </h3>
          <p className="text-text-secondary border-l-4 border-accent pl-4 mb-5 leading-relaxed">
            {form.summary || "(요약 없음)"}
          </p>
          <div className="space-y-4">
            {form.content.split("\n\n").map((p, i) => (
              <p key={i} className="text-text-primary leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                날짜 <span className="text-accent">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={inputCls}
                required
              />
            </div>
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                카테고리 <span className="text-accent">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              제목 <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="뉴스 제목을 입력하세요"
              className={inputCls}
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              요약 <span className="text-accent">*</span>
              <span className="text-text-muted font-normal ml-1">
                (목록·카드에 표시됩니다)
              </span>
            </label>
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              placeholder="한두 문장으로 핵심 내용을 요약해주세요"
              className={`resize-none ${inputCls}`}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              본문 <span className="text-accent">*</span>
              <span className="text-text-muted font-normal ml-1">
                (빈 줄로 단락을 구분합니다)
              </span>
            </label>
            <textarea
              rows={10}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder={"뉴스 본문을 작성해주세요.\n\n단락을 구분하려면 빈 줄을 사용하세요."}
              className={`resize-y ${inputCls}`}
              required
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              대표 이미지
              <span className="text-text-muted font-normal ml-1">(선택)</span>
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {form.imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-surface-border">
                <img
                  src={form.imageUrl}
                  alt="업로드 이미지"
                  className="w-full max-h-56 object-cover"
                />
                <button
                  type="button"
                  onClick={() => set("imageUrl", "")}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full h-32 rounded-xl border-2 border-dashed border-surface-border hover:border-accent/50 bg-surface-secondary hover:bg-accent/5 flex flex-col items-center justify-center gap-2 text-text-muted hover:text-accent transition-all duration-200"
              >
                <ImagePlus size={24} />
                <span className="text-sm font-medium">
                  {uploading ? "압축 중..." : "이미지 클릭하여 업로드"}
                </span>
                <span className="text-xs">JPG, PNG, WebP · 자동 압축 적용</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl border border-surface-border text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors shadow-md shadow-accent/25"
            >
              <Save size={15} />
              저장하기
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ── Admin page ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [writing, setWriting] = useState(false);

  // Check session auth
  useEffect(() => {
    if (sessionStorage.getItem("ds_admin_auth") === "1") setAuthed(true);
  }, []);

  // Load news
  useEffect(() => {
    if (authed) setNews(getStoredNews());
  }, [authed]);

  const handleSave = (item: NewsItem) => {
    setNews((prev) => [item, ...prev]);
    setWriting(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("이 뉴스를 삭제하시겠습니까?")) return;
    deleteNewsItem(id);
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  if (!authed) {
    return <AuthGate onAuth={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Top bar */}
      <div className="bg-navy-900 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/news")}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-white font-semibold">뉴스 관리자</span>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("ds_admin_auth");
              router.push("/news");
            }}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">
        {/* Write form or button */}
        {writing ? (
          <NewsForm onSave={handleSave} onCancel={() => setWriting(false)} />
        ) : (
          <button
            onClick={() => setWriting(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-surface-border hover:border-accent/50 bg-white hover:bg-accent/5 flex items-center justify-center gap-2 text-text-muted hover:text-accent font-medium transition-all duration-200"
          >
            <Pencil size={18} />
            새 뉴스 작성하기
          </button>
        )}

        {/* Stored news list */}
        {news.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-text-secondary mb-3 px-1">
              등록된 뉴스 ({news.length}건)
            </h2>
            <div className="flex flex-col gap-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-surface-border px-5 py-4 flex items-start gap-4 group"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-accent">
                        {item.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary leading-snug line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => router.push(`/news/${item.id}`)}
                      className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                      title="보기"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {news.length === 0 && !writing && (
          <p className="text-center text-sm text-text-muted py-8">
            아직 등록된 뉴스가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
