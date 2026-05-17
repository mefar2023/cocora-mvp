// src/app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 💡 Next.jsの強力なキャッシュを無効化し、毎回必ず最新の人数を取りに行く魔法の呪文
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { count: gCount, error: gError } = await supabaseAdmin
      .from('cocora')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'ガイド登録');

    const { count: tCount, error: tError } = await supabaseAdmin
      .from('cocora')
      .select('*', { count: 'exact', head: true })
      .eq('type', '旅行者登録');

    if (gError || tError) {
      console.error('Supabase count error:', gError || tError);
      return NextResponse.json({ success: false, error: '集計に失敗しました' }, { status: 500 });
    }

    // 💡 ダミーの足し算は一切せず、純粋なDBの件数だけを返す
    return NextResponse.json({
      success: true,
      guideCount: gCount || 0,
      travelerCount: tCount || 0,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ success: false, error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}