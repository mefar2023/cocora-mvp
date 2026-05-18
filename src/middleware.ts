import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 1. 画像ファイル（.png, .jpg, .jpeg, .gif, .svg, .ico）への直接アクセスは、
  // サブドメインのルーティングを完全に無視してそのままファイルを返す（最優先）
  if (/\.(png|jpg|jpeg|gif|svg|ico)$/i.test(url.pathname)) {
    return NextResponse.next();
  }

  // 🇹🇼 台湾版サブドメイン（tw.〜）のアクセスの場合
  if (hostname.startsWith('tw.')) {
    if (!url.pathname.startsWith('/tw')) {
      url.pathname = `/tw${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 🇺🇸 英語版サブドメイン（en.〜）のアクセスの場合
  if (hostname.startsWith('en.')) {
    if (!url.pathname.startsWith('/en')) {
      url.pathname = `/en${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // すべてのパスにミドルウェアを適用（内部でファイル判定を行うため、より安全です）
  matcher: '/((?!api|_next/static|_next/image).*)',
};