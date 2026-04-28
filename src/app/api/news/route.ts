import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { NewsItem } from "@/lib/news-store";

const DATA_PATH = path.join(process.cwd(), "data", "news.json");

async function readNews(): Promise<NewsItem[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as NewsItem[];
  } catch {
    return [];
  }
}

async function writeNews(items: NewsItem[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function GET() {
  const items = await readNews();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const items = await readNews();
  const newItem: NewsItem = {
    ...data,
    id: `custom_${Date.now()}`,
    isCustom: true,
  };
  await writeNews([newItem, ...items]);
  return NextResponse.json(newItem);
}
