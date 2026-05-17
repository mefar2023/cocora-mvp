"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', 'Noto Sans JP', sans-serif; background: #FAFAF9; color: #1A1A2E; line-height: 1.8; }
        .container { max-width: 800px; margin: 0 auto; padding: 60px 20px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #5A5A7A; text-decoration: none; font-size: 14px; margin-bottom: 40px; transition: color 0.2s; }
        .back-link:hover { color: #1A1A2E; }
        .title { font-size: 28px; font-weight: 800; margin-bottom: 40px; letter-spacing: -0.5px; }
        .doc-section { background: #FFFFFF; border: 1px solid #EAEAF0; border-radius: 16px; padding: 40px; }
        .doc-section h2 { font-size: 18px; font-weight: 700; margin: 32px 0 16px; border-bottom: 2px solid #FFF0EC; padding-bottom: 8px; color: #F97B5A; }
        .doc-section h2:first-child { margin-top: 0; }
        .doc-section p, .doc-section li { font-size: 14px; color: #5A5A7A; margin-bottom: 12px; }
        .doc-section ul, .doc-section ol { padding-left: 24px; margin-bottom: 24px; }
      `}</style>

      <div className="container">
        <Link href="/" className="back-link">
          <i className="fa fa-arrow-left"></i> トップページに戻る
        </Link>
        <h1 className="title">プライバシーポリシー</h1>
        
        <div className="doc-section">
          <p>株式会社MEFAR（以下「当社」といいます。）は、ココラ（cocora）事前登録サービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。</p>

          <h2>第1条（個人情報）</h2>
          <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報、及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>

          <h2>第2条（個人情報の収集方法）</h2>
          <p>当社は、ユーザーが本サービスにおいて事前登録をする際に氏名、メールアドレスなどの個人情報をお尋ねすることがあります。</p>

          <h2>第3条（個人情報を収集・利用する目的）</h2>
          <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
          <ol>
            <li>cocoraのサービス提供開始に関する通知・案内のため</li>
            <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
            <li>cocoraに関するアンケート、キャンペーン等を実施するため</li>
            <li>上記の利用目的に付随する目的</li>
          </ol>

          <h2>第4条（利用目的の変更）</h2>
          <p>当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。</p>

          <h2>第5条（個人情報の第三者提供）</h2>
          <p>当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ことなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>

          <h2>第6条（お問い合わせ窓口）</h2>
          <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
          <p style={{ lineHeight: "2.0", fontWeight: "500" }}>
            住所：住所：埼玉県草加市瀬崎１丁目11-9パークハイツ202号<br />
            社名：株式会社MEFAR<br />
            担当部署：cocora運営チーム<br />
            Eメールアドレス：cocora@mefar.jp
          </p>
        </div>
      </div>
    </>
  );
}