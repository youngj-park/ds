import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { NewsItem } from "@/lib/news-store";

const DATA_PATH = path.join(process.cwd(), "data", "news.json");

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const items = (JSON.parse(raw) as NewsItem[]).filter((n) => n.id !== id);
    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
}
