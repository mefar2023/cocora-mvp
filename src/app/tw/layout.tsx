import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cocora | 你的「興趣」將改變旅程。',
  description: '媒合日本在地人與外國旅客。與擁有相同愛好的在地嚮導一起，體驗公路車、動漫聖地巡禮、在地美食等專屬行程。',
  openGraph: {
    title: 'cocora | 你的「興趣」將改變旅程。',
    description: '媒合日本在地人與外國旅客。與擁有相同愛好的在地嚮導一起，體驗專屬行程。',
    url: 'https://tw.cocora-travel.com',
    siteName: 'cocora',
    locale: 'zh_TW',
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
    title: 'cocora | 你的「興趣」將改變旅程。',
    description: '媒合日本在地人與外國旅客。',
  },
};

export default function TaiwanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}