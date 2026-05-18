import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'cocora(ココラ) | あなたの「好き」が、旅を変える。',
  description: '日本のローカルガイドと外国人旅行者をマッチング。同じ趣味を持つローカルガイドと、ロードバイク、アニメ聖地巡礼、ディープなグルメなど、特別な体験を。',
  // 🔽 ここにGoogle Search Consoleの認証コードを追加しました！
  verification: {
    google: 'GVCotjER-FXwj1MOwURdMS5HvUJk2NhGfobFlnZY6ps',
  },
  openGraph: {
    title: 'cocora(ココラ) | あなたの「好き」が、旅を変える。',
    description: '日本のローカルガイドと外国人旅行者をマッチング。特別なローカル体験を。',
    url: 'https://cocora-travel.com',
    siteName: 'cocora',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: 'cocora preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cocora(ココラ) | あなたの「好き」が、旅を変える。',
    description: '日本のローカルガイドと外国人旅行者をマッチング。',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}