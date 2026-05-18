import type { Metadata } from 'next';

// 🇺🇸 英語版のタイトル・OGP設定（日本語版の設定を自動で上書きします）
export const metadata: Metadata = {
  title: 'cocora | Transform your travel with local passions',
  description: 'Connects local Japanese guides with global travelers. Experience road cycling, anime pilgrimages, and local hidden food tours with a guide who shares your exact hobbies.',
  openGraph: {
    title: 'cocora | Transform your travel with local passions',
    description: 'Connects local Japanese guides with global travelers. Experience road cycling, anime pilgrimages, and local hidden food tours with a guide who shares your exact hobbies.',
    url: 'https://en.cocora-travel.com',
    siteName: 'cocora',
    locale: 'en_US',
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
    title: 'cocora | Transform your travel with local passions',
    description: 'Connects local Japanese guides with global travelers. Experience real Japan with locals.',
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}