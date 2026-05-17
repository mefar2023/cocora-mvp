import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 ここから下を丸ごと書き換えます！
export const metadata: Metadata = {
  title: "cocora（ココラ）| ニッチな体験、本物の出会い",
  description: "一般の日本人と外国人旅行者をマッチング。ロードバイク、聖地巡礼、街歩き——共通の趣味を持つガイドと、特別な体験を。2025年のサービス開始に向け、現在事前登録を受付中です。",
  openGraph: {
    title: "cocora（ココラ）| ニッチな体験、本物の出会い",
    description: "あなたの「好き」が旅を変える。外国人旅行者と趣味で繋がる新しい観光マッチングサービス、事前登録受付中！",
    url: "https://mefar.jp", // 💡 本番公開時のURLが決まっていれば書き換えてください
    siteName: "cocora",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cocora（ココラ）| 事前登録受付中",
    description: "あなたの「好き」が旅を変える。外国人旅行者と趣味で繋がる新しい観光マッチングサービス。",
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