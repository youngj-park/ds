import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEEPSEERS | AI 반도체 머신비전 솔루션",
  description:
    "어드밴스드 반도체 시장을 혁신하는 차세대 AI 머신비전 솔루션. 사람의 개입을 최소화하는 AI 기반 반도체 패키지 불량검출 토탈 시스템.",
  keywords: [
    "머신비전",
    "반도체 검사",
    "AI 비전",
    "어드밴스드 패키징",
    "DEEPSEERS",
    "딥시어스",
    "패키지 불량검출",
  ],
  authors: [{ name: "DeepSeers Inc." }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "DEEPSEERS",
    title: "DEEPSEERS | AI 반도체 머신비전 솔루션",
    description:
      "사람의 개입을 최소화하는 AI 기반 반도체 패키지 불량검출 토탈 시스템. 어드밴스드 패키징을 위한 더 빠르고 더 정확한 머신비전 솔루션.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
