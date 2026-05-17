// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { type, name, email, category } = await request.json();

    // ① Supabaseに保存
    const { error: dbError } = await supabase
      .from('cocora')
      .insert([{ type, name, email, category: category || '未選択' }]);

    if (dbError) throw dbError;

    // ② メール送信設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isGuide = type === 'ガイド登録';
    
    // 件名
    const mailSubject = isGuide 
      ? '【cocora】ガイド事前登録が完了しました🎉' 
      : '【cocora】Your Pre-registration is Confirmed! ✈️';

    // プレーンテキスト
    const mailText = isGuide
      ? `${name} 様\n\nこの度は、ココラ（cocora）のガイドへご登録いただき誠にありがとうございます。\nサービス開始時に、真っ先にご案内をお送りいたします。\n\n【ご登録内容】\n・お名前: ${name}\n・カテゴリ: ${category || '未選択'}\n\ncocora 運営チーム (株式会社MEFAR)`
      : `Hi ${name},\n\nThank you for joining the cocora waitlist!\nWe will notify you as soon as our service launches.\n\n[Your Registration]\n・Name: ${name}\n・Interest: ${category || 'Other'}\n\ncocora Team (MEFAR Co., Ltd.)`;

    // リッチHTML
    const mailHtml = isGuide
      ? `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAFAF9; padding: 40px 20px; color: #1A1A2E;">
        <div style="background-color: #FFFFFF; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAEAF0;">
          <h1 style="color: #F97B5A; font-size: 24px; font-weight: 800; text-align: center; margin-top: 0; letter-spacing: -0.5px;">cocora</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;"><strong>${name} 様</strong></p>
          <p style="font-size: 15px; line-height: 1.8; color: #5A5A7A; margin-bottom: 24px;">
            この度は、ココラ（cocora）のガイド事前登録にご参加いただき、誠にありがとうございます！<br><br>
            あなたの「好き」や「趣味」が、日本を訪れる旅行者にとってかけがえのない宝物になります。サービス開始に向けて現在全力で準備を進めておりますので、今しばらくお待ちください。
          </p>
          
          <div style="background-color: #FFF0EC; border-left: 4px solid #F97B5A; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #C04A2A;">🎁 先行登録の特別特典</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #C04A2A; line-height: 1.6;">
              <li>サービス開始時に最優先でご案内</li>
              <li>初月プラットフォーム手数料 <strong>0%</strong></li>
              <li>先行登録者限定の早期ランクアップ</li>
            </ul>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0; width: 30%;">お名前</th>
              <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0;">得意なカテゴリ</th>
              <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${category || '未選択'}</td>
            </tr>
          </table>

          <div style="text-align: center;">
            <a href="https://mefar.jp" style="display: inline-block; background-color: #1A1A2E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 100px; font-weight: bold; font-size: 15px;">公式サイトを確認する</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #9898B0; line-height: 1.6;">
          <p>本メールは送信専用アドレスから配信されています。</p>
          <p>© 2026 cocora Team / 株式会社MEFAR<br>埼玉県草加市瀬崎１丁目11-9パークハイツ202号</p>
        </div>
      </div>
      `
      : `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAFAF9; padding: 40px 20px; color: #1A1A2E;">
        <div style="background-color: #FFFFFF; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAEAF0;">
          <h1 style="color: #4B9EFF; font-size: 24px; font-weight: 800; text-align: center; margin-top: 0; letter-spacing: -0.5px;">cocora</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;"><strong>Hi ${name},</strong></p>
          <p style="font-size: 15px; line-height: 1.8; color: #5A5A7A; margin-bottom: 24px;">
            Thank you for joining the cocora waitlist!<br><br>
            Get ready to explore the real Japan with locals who share your passions. We are working hard to launch the platform and will notify you exactly when we go live.
          </p>
          
          <div style="background-color: #EBF4FF; border-left: 4px solid #4B9EFF; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1860A8;">🎁 Early Access Perks</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #1860A8; line-height: 1.6;">
              <li>Priority access upon launch</li>
              <li><strong>10% OFF</strong> coupon for your first booking</li>
            </ul>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0; width: 30%;">Name</th>
              <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0;">Interest</th>
              <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${category || 'Other'}</td>
            </tr>
          </table>

        </div>
        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #9898B0; line-height: 1.6;">
          <p>Please do not reply to this automated message.</p>
          <p>© 2026 cocora Team / MEFAR Co., Ltd.<br>11-9 Park Heights #202, Sezaki 1-chome, Soka-shi, Saitama, Japan</p>
        </div>
      </div>
      `;

    await transporter.sendMail({
      from: `"cocora" <${process.env.SMTP_USER}>`,
      to: email,
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}