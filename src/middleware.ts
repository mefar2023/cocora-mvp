import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')

  // tw.cocora-travel.com でアクセスされた場合、内部的に /tw フォルダの中身を表示
  if (hostname === 'tw.cocora-travel.com') {
    return NextResponse.rewrite(new URL(`/tw${url.pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    /*
     * システムファイルや画像以外をチェック対象にする設定
     */
    '/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.png|.*\\.png$).*)',
  ],
}