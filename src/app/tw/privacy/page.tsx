"use client";

import React from 'react';
import Link from 'next/link';

export default function TaiwanPrivacyPolicy() {
  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', 'Noto Sans TC', sans-serif; background: #FAFAF9; color: #1A1A2E; line-height: 1.8; }
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
        <Link href="/tw" className="back-link">
          <i className="fa fa-arrow-left"></i> 返回首頁
        </Link>
        <h1 className="title">隱私權保護政策</h1>
        
        <div className="doc-section">
          <p>MEFAR 株式會社（以下簡稱「本公司」）針對 cocora 事前登記服務（以下簡稱「本服務」）中關於用戶個人資料之處理，特訂定本隱私權保護政策（以下簡稱「本政策」）如下。</p>

          <h2>第一條（個人資料之定義）</h2>
          <p>「個人資料」係指個人資料保護法所定義之「個人資料」，包含生存之個人相關資訊。透過該資訊所包含之姓名、出生年月日、地址、電話號碼、聯絡方式或其他記述等，得以識別特定個人之資訊；亦包含容貌、指紋、聲紋等生物特徵資料，以及健康保險證號碼等僅憑該單一資訊即得以識別特定個人之資訊（個人識別碼）。</p>

          <h2>第二條（個人資料之收集方式）</h2>
          <p>本公司於用戶利用本服務進行事前登記時，將會詢問姓名、電子郵件地址等必要之個人資料。</p>

          <h2>第三條（收集及利用個人資料之目的）</h2>
          <p>本公司收集與利用個人資料之目的如下：</p>
          <ol>
            <li>用於發送 cocora 正式啟動服務時之通知與導覽案内</li>
            <li>用於回信用戶之諮詢與提問（包含進行身分核實）</li>
            <li>用於實施與 cocora 相關之問卷調查、行銷促銷活動等</li>
            <li>與上述利用目的相關之附隨事項</li>
          </ol>

          <h2>第四條（利用目的之變更）</h2>
          <p>本公司僅在合理認定變更後之目的與變更前之目的具有關聯性之範圍內，始得變更個人資料之利用目的。若變更利用目的，本公司將依指定之方式通知用戶變更後之目的，或於本官方網站上進行公告。</p>

          <h2>第五條（向第三人提供個人資料）</h2>
          <p>除以下列舉之情形、個人資料保護法或其他法令另有規定外，本公司在未事先取得用戶同意之前，絕不向任何第三人提供或揭露個人資料。</p>

          <h2>第六條（諮詢聯絡窗口）</h2>
          <p>若對本政策有任何疑問或諮詢，請與以下窗口聯絡：</p>
          <p style={{ lineHeight: "2.0", fontWeight: "500" }}>
            地址：埼玉県草加市瀬崎１丁目11-9パークハイツ202号<br />
            公司名稱：MEFAR 株式會社<br />
            負責部門：cocora 營運團隊<br />
            電子郵件地址：cocora@mefar.jp
          </p>
        </div>
      </div>
    </>
  );
}