import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 🇹🇼 台湾版サブドメイン（tw.〜）のアクセスの場合
  if (hostname.startsWith('tw.')) {
    // パスがすでに /tw で始まっていない場合、内部的に /tw のページを表示する
    if (!url.pathname.startsWith('/tw')) {
      url.pathname = `/tw${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 🇺🇸 英語版サブドメイン（en.〜）のアクセスの場合 💡ここを追加！
  if (hostname.startsWith('en.')) {
    // パスがすでに /en で始まっていない場合、内部的に /en のページを表示する
    if (!url.pathname.startsWith('/en')) {
      url.pathname = `/en${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // それ以外（通常のドメインなど）はそのまま日本語版を表示
  return NextResponse.next();
}

// ミドルウェアを適用しないファイル（画像やAPIなど）を指定
export const config = {
  matcher: [
    /*
     * api、_next/static、_next/image、favicon.ico、ogp.png などの
     * 静的ファイルやシステム用のパス「以外」すべてにミドルウェアを適用
     */
    '/((?!api|_next/static|_next/image|favicon.ico|ogp.png).*)',
  ],
};