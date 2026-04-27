import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "디에스 주식회사 | AI 반도체 비전 검사 플랫폼",
  description:
    "디에스(DS Inc.)는 AI 기반 반도체 외관 검사 플랫폼을 개발하는 정밀 기술 기업입니다. DS Vision, DS Analytics, DS Edge를 통해 반도체 제조 공정의 품질 혁신을 이끕니다.",
  keywords: [
    "반도체 비전검사",
    "AI 검사",
    "결함 검출",
    "DS Vision",
    "디에스",
    "반도체 품질",
  ],
  authors: [{ name: "DS Inc." }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "디에스 주식회사",
    title: "디에스 주식회사 | AI 반도체 비전 검사 플랫폼",
    description:
      "AI 기반 반도체 외관 검사 플랫폼으로 제조 공정의 품질 혁신을 이끄는 디에스 주식회사입니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
