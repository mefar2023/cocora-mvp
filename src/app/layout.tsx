import type { Metadata } from 'next';
import './globals.css'; // Next.jsの標準的なスタイルシートの読み込み

// 🇯🇵 日本語版（大元）のタイトル・OGP設定
export const metadata: Metadata = {
  title: 'cocora(ココラ) | あなたの「好き」が、旅を変える。',
  description: '日本のローカルガイドと外国人旅行者をマッチング。同じ趣味を持つローカルガイドと、ロードバイク、アニメ聖地巡礼、ディープなグルメなど、特別な体験を。',
  openGraph: {
    title: 'cocora(ココラ) | あなたの「好き」が、旅を変える。',
    description: '日本のローカルガイドと外国人旅行者をマッチング。特別なローカル体験を。',
    url: 'https://cocora-travel.com',
    siteName: 'cocora',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp.png', // ※ /public/ogp.png が存在する場合に有効になります
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

// 大元のレイアウト関数（1つだけに統一してエラーを解消）
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