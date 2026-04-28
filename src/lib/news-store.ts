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

export async function getStoredNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("/api/news", { cache: "no-store" });
    return res.ok ? ((await res.json()) as NewsItem[]) : [];
  } catch {
    return [];
  }
}

export async function saveNewsItem(
  data: Omit<NewsItem, "id" | "isCustom">
): Promise<NewsItem> {
  const res = await fetch("/api/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<NewsItem>;
}

export async function deleteNewsItem(id: string): Promise<void> {
  await fetch(`/api/news/${id}`, { method: "DELETE" });
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
