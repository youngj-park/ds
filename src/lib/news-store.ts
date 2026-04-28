export type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  isCustom: boolean;
};

const STORAGE_KEY = "ds_news_items";

export function getStoredNews(): NewsItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NewsItem[]) : [];
  } catch {
    return [];
  }
}

export function saveNewsItem(
  data: Omit<NewsItem, "id" | "isCustom">
): NewsItem {
  const items = getStoredNews();
  const item: NewsItem = {
    ...data,
    id: `custom_${Date.now()}`,
    isCustom: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...items]));
  return item;
}

export function updateNewsItem(
  id: string,
  data: Partial<Omit<NewsItem, "id" | "isCustom">>
): void {
  const items = getStoredNews().map((item) =>
    item.id === id ? { ...item, ...data } : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function deleteNewsItem(id: string): void {
  const items = getStoredNews().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const MAX_W = 1200;
        const ratio = Math.min(1, MAX_W / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export const ADMIN_PASSWORD = "ds2026!";
