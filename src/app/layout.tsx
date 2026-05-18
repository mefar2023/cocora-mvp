import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 ここから下を丸ごと書き換えます！
export const metadata: Metadata = {
  title: "cocora | Your Passion Changes the Journey",
  description: "一般の日本人と外国人旅行者をマッチング。共通の趣味を持つガイドと特別な体験を。",
  openGraph: {
    title: "cocora | Your Passion Changes the Journey",
    description: "一般の日本人と外国人旅行者をマッチング。共通の趣味を持つガイドと特別な体験を。",
    url: "https://cocora-travel.com",
    siteName: "cocora",
    images: [
      {
        url: "/opengraph-image.png", // 👈 ここで確実に画像を指名します！
        width: 1200,
        height: 630,
        alt: "cocora OGP Image",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cocora | Your Passion Changes the Journey",
    description: "一般の日本人と外国人旅行者をマッチング。共通の趣味を持つガイドと特別な体験を。",
    images: ["/opengraph-image.png"],
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