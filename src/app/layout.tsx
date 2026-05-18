
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "cocora | Your Passion Changes the Journey",
  description: "一般の日本人と外国人旅行者をマッチング。共通の趣味を持つガイドと特別な体験を。",
  
  // Google Search Console の所有権確認用設定
  verification: {
    google: "GVCotjER-FXwj1MOwURdMS5HvUJk2NhGfobFlnZY6ps",
  },

  // 👇 すべてのURLに www. を追加して厳密に一致させました！
  openGraph: {
    title: "cocora | Your Passion Changes the Journey",
    description: "一般の日本人と外国人旅行者をマッチング。共通の趣味を持つガイドと特別な体験を。",
    url: "https://www.cocora-travel.com", // 👈 www. を追加！
    siteName: "cocora",
    images: [
      {
        url: "https://www.cocora-travel.com/opengraph-image.png", // 👈 ここもフルURLで www. を追加！
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
    images: ["https://www.cocora-travel.com/opengraph-image.png"], // 👈 www. を追加！
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}