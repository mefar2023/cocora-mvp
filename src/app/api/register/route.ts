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

    // 💡 1. 登録された「言語」の判定
    const isTaiwan = category && (
      category.includes('公路車') || category.includes('動漫') || category.includes('在地私房') || category.includes('選擇您') || category.includes('其他')
    );
    const isEnglish = category && (
      category.includes('Road') || category.includes('Anime') || category.includes('Local food') || category.includes('Photo') || category.includes('Hiking') || category.includes('Gaming') || category.includes('Traditional') || category.includes('Zen') || category.includes('Other')
    ) || type === '英ガイド登録';

    // 💡 2. 登録タイプ（ガイドか旅行者か）の判定
    const isGuide = type === 'ガイド登録' || type === '英ガイド登録';
    
    let mailSubject = '';
    let mailText = '';
    let mailHtml = '';

    if (isTaiwan) {
      // 🇹🇼 台湾版のメール
      mailSubject = '【cocora】感謝您的事前登記！領取您的優先體驗限定特典 🌸';
      mailText = `您好 ${name}：\n\n非常感謝您登記參加 cocora 的事前預約！\n我們已成功將您加入我們的優先體驗名單中。\n\n【您的登記內容】\n・姓名: ${name}\n・感興趣的領域: ${category || '其他'}\n\ncocora 營運團隊 (株式會社 MEFAR)`;
      mailHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, 'Noto Sans TC', sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAFAF9; padding: 40px 20px; color: #1A1A2E;">
        <div style="background-color: #FFFFFF; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAEAF0;">
          <h1 style="color: #F97B5A; font-size: 24px; font-weight: 800; text-align: center; margin-top: 0; letter-spacing: -0.5px;">cocora</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;"><strong>${name} 您好：</strong></p>
          <p style="font-size: 15px; line-height: 1.8; color: #5A5A7A; margin-bottom: 24px;">
            非常感謝您登記參加 cocora 的事前預約！我們已成功將您加入我們的優先體驗名單中。<br><br>
            cocora 是一個全新形態的旅遊媒合平台，讓旅客能與擁有相同「興趣與愛好」的日本在地人連結。我們正為 2026 年的正式上線全力籌備中，敬請期待！
          </p>
          <div style="background-color: #FFF0EC; border-left: 4px solid #F97B5A; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #C04A2A;">🎁 事前登記限定特典</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #C04A2A; line-height: 1.6;">
              <li>服務正式上線時獲得最優先通知</li>
              <li>直接獲贈首趟行程預約 <strong>10% OFF</strong> 優惠券</li>
              <li>獲得優先預約早期加入精選嚮導的權利</li>
              <li>享有 VIP 專屬客服優先支援</li>
            </ul>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0; width: 30%;">您的姓名</th>
              <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0;">感興趣的領域</th>
              <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${category || '其他'}</td>
            </tr>
          </table>
          <div style="text-align: center;">
            <a href="https://tw.cocora-travel.com" style="display: inline-block; background-color: #1A1A2E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 100px; font-weight: bold; font-size: 15px;">查看官方網站</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #9898B0; line-height: 1.6;">
          <p>本信件為系統自動發送，請勿直接回覆。</p>
          <p>© 2026 cocora Team / MEFAR 株式會社<br>埼玉県草加市瀬崎１丁目11-9パークハイツ202号</p>
        </div>
      </div>
      `;
    } else if (isEnglish) {
      // 🇺🇸 英語版のメール
      mailSubject = isGuide 
        ? '【cocora】Your Guide Pre-registration is Confirmed! 🎉' 
        : '【cocora】Your Traveler Pre-registration is Confirmed! ✈️';
        
      mailText = isGuide
        ? `Hi ${name},\n\nThank you for registering as a local guide on cocora!\nWe will notify you first when our service launches.\n\n[Your Registration]\n・Name: ${name}\n・Expertise: ${category || 'Not selected'}\n\ncocora Team (MEFAR Co., Ltd.)`
        : `Hi ${name},\n\nThank you for joining the cocora waitlist!\nWe will notify you as soon as our service launches.\n\n[Your Registration]\n・Name: ${name}\n・Interest: ${category || 'Other'}\n\ncocora Team (MEFAR Co., Ltd.)`;

      mailHtml = isGuide
        ? `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAFAF9; padding: 40px 20px; color: #1A1A2E;">
          <div style="background-color: #FFFFFF; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAEAF0;">
            <h1 style="color: #F97B5A; font-size: 24px; font-weight: 800; text-align: center; margin-top: 0; letter-spacing: -0.5px;">cocora</h1>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;"><strong>Hi ${name},</strong></p>
            <p style="font-size: 15px; line-height: 1.8; color: #5A5A7A; margin-bottom: 24px;">
              Thank you for registering as a local guide on cocora!<br><br>
              Your hobbies and passions will soon become an unforgettable experience for global travelers. We are currently preparing for the official launch, so please stay tuned!
            </p>
            
            <div style="background-color: #FFF0EC; border-left: 4px solid #F97B5A; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #C04A2A;">🎁 Early Access Perks</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #C04A2A; line-height: 1.6;">
                <li>Priority notification upon launch</li>
                <li><strong>0%</strong> platform fee for the first month</li>
                <li>Early-bird tier upgrades</li>
              </ul>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
              <tr>
                <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0; width: 30%;">Name</th>
                <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0;">Expertise</th>
                <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${category || 'Not selected'}</td>
              </tr>
            </table>

            <div style="text-align: center;">
              <a href="https://en.cocora-travel.com" style="display: inline-block; background-color: #1A1A2E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 100px; font-weight: bold; font-size: 15px;">Visit Website</a>
            </div>
          </div>
          <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #9898B0; line-height: 1.6;">
            <p>Please do not reply to this automated message.</p>
            <p>© 2026 cocora Team / MEFAR Co., Ltd.<br>11-9 Park Heights #202, Sezaki 1-chome, Soka-shi, Saitama, Japan</p>
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
    } else {
      // 🇯🇵 日本語版（デフォルト）のメール
      mailSubject = isGuide 
        ? '【cocora】ガイド事前登録が完了しました🎉' 
        : '【cocora】旅行者としての事前登録が完了しました✈️';
        
      mailText = isGuide
        ? `${name} 様\n\nこの度は、ココラ（cocora）のガイドへご登録いただき誠にありがとうございます。\nサービス開始時に、真っ先にご案内をお送りいたします。\n\n【ご登録内容】\n・お名前: ${name}\n・カテゴリ: ${category || '未選択'}\n\ncocora 運営チーム (株式会社MEFAR)`
        : `${name} 様\n\nこの度は、ココラ（cocora）の事前登録にご参加いただき誠にありがとうございます。\nサービス開始時に、真っ先にご案内をお送りいたします。\n\n【ご登録内容】\n・お名前: ${name}\n・興味のある分野: ${category || '未選択'}\n\ncocora 運営チーム (株式会社MEFAR)`;

      mailHtml = isGuide
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
              <a href="https://cocora-travel.com" style="display: inline-block; background-color: #1A1A2E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 100px; font-weight: bold; font-size: 15px;">公式サイトを確認する</a>
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
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;"><strong>${name} 様</strong></p>
            <p style="font-size: 15px; line-height: 1.8; color: #5A5A7A; margin-bottom: 24px;">
              この度は、ココラ（cocora）の事前登録にご参加いただき、誠にありがとうございます！<br><br>
              同じ趣味を持つローカルガイドと一緒に、ガイドブックには載っていないリアルな日本を体験する準備をしましょう。サービス開始時に真っ先にお知らせいたします。
            </p>
            
            <div style="background-color: #EBF4FF; border-left: 4px solid #4B9EFF; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
              <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold; color: #1860A8;">🎁 先行登録の特別特典</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #1860A8; line-height: 1.6;">
                <li>サービス開始時に最優先でご案内</li>
                <li>初回予約時に使える <strong>10% OFF</strong> クーポン</li>
              </ul>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; font-size: 14px;">
              <tr>
                <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0; width: 30%;">お名前</th>
                <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 12px; border-bottom: 1px solid #EAEAF0; color: #9898B0;">興味のある分野</th>
                <td style="padding: 12px; border-bottom: 1px solid #EAEAF0; font-weight: bold;">${category || '未選択'}</td>
              </tr>
            </table>

            <div style="text-align: center;">
              <a href="https://cocora-travel.com" style="display: inline-block; background-color: #1A1A2E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 100px; font-weight: bold; font-size: 15px;">公式サイトを確認する</a>
            </div>
          </div>
          <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #9898B0; line-height: 1.6;">
            <p>本メールは送信専用アドレスから配信されています。</p>
            <p>© 2026 cocora Team / 株式会社MEFAR<br>埼玉県草加市瀬崎１丁目11-9パークハイツ202号</p>
          </div>
        </div>
        `;
    }

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