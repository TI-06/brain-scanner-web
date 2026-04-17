import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "脳内2026 | あなたの頭の中をスキャン",
  description: "2026年のあなたの脳内を最新AI（？）がスキャン。名前を入れるだけで、今のあなたの興味・関心、欲望を映えデザインで可視化します。",
  openGraph: {
    title: "脳内2026 | あなたの頭の中をスキャン",
    description: "あなたの脳内を可視化してみませんか？",
    url: "https://nounai-2026.vercel.app", // 公開後のURLが決まったら書き換えてね！
    siteName: "脳内2026",
    images: [
      {
        url: "/ogp-image.png", // publicフォルダに置く画像名
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "脳内2026 | あなたの頭の中をスキャン",
    description: "2026年のあなたの脳内、覗いてみる？",
    images: ["/ogp-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}