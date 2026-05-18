"use client";

import React from 'react';
import Link from 'next/link';

export default function TaiwanTermsOfService() {
  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', 'Noto Sans TC', sans-serif; background: #FAFAF9; color: #1A1A2E; line-height: 1.8; }
        .container { max-width: 800px; margin: 0 auto; padding: 60px 20px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #5A5A7A; text-decoration: none; font-size: 14px; margin-bottom: 40px; transition: color 0.2s; }
        .back-link:hover { color: #1A1A2E; }
        .title { font-size: 28px; font-weight: 800; margin-bottom: 40px; letter-spacing: -0.5px; }
        .doc-section { background: #FFFFFF; border: 1px solid #EAEAF0; border-radius: 16px; padding: 40px; }
        .doc-section h2 { font-size: 18px; font-weight: 700; margin: 32px 0 16px; border-bottom: 2px solid #EBF4FF; padding-bottom: 8px; color: #4B9EFF; }
        .doc-section h2:first-child { margin-top: 0; }
        .doc-section p, .doc-section li { font-size: 14px; color: #5A5A7A; margin-bottom: 12px; }
        .doc-section ul, .doc-section ol { padding-left: 24px; margin-bottom: 24px; }
      `}</style>

      <div className="container">
        <Link href="/tw" className="back-link">
          <i className="fa fa-arrow-left"></i> 返回首頁
        </Link>
        <h1 className="title">事前登記 使用條款</h1>
        
        <div className="doc-section">
          <p>本使用條款（以下簡稱「本條款」）旨在訂定由 MEFAR 株式會社（以下簡稱「本公司」）所提供之 cocora 事前登記服務（以下簡稱「本服務」）的利用條件。所有完成登記之用戶（以下簡稱「用戶」）皆應遵守本條款之規定引申利用本服務。</p>

          <h2>第一條（適用範圍）</h2>
          <p>本條款適用於用戶與本公司之間關於利用本服務所涉之一切法律關係。</p>

          <h2>第二條（事前登記）</h2>
          <ol>
            <li>當登記申請人依本公司指定之方式提出事前登記申請，並經本公司審核同意後，即視為完成事前登記。</li>
            <li>若本公司判斷事前登記申請人存在以下任一事由，得不予批准其事前登記申請，且本公司不負擔揭露其理由之義務：
              <ul>
                <li>申報資料含有虛假不實之情事者</li>
                <li>申請人過去曾有違反本條款之紀錄者</li>
                <li>其他經本公司合理認定不適合進行事前登記者</li>
              </ul>
            </li>
          </ol>

          <h2>第三條（停止或中斷提供本服務）</h2>
          <p>本公司如判斷具有以下任一事由，得無庸事先通知用戶，逕行停止或中斷本服務之全部或部分內容：</p>
          <ol>
            <li>進行本服務相關電腦系統之維護、檢查或更新時</li>
            <li>因地震、雷擊、火災、停電或天災等不可抗力因素，導致本服務難以繼續提供時</li>
            <li>其他經本公司合理認定難以繼續提供本服務之情形</li>
          </ol>
          <p>因本服務停止或中斷提供，致使用戶或第三人遭受任何不利益或損害時，本公司概不負擔任何賠償責任。</p>

          <h2>第四條（服務內容變更與終止開發）</h2>
          <p>本公司得無庸事先通知用戶，逕行變更本服務之內容，或延期、取消 cocora 的正式發布。用戶不得因上述變更或取消向本公司主張任何損害賠償責任。</p>

          <h2>第五條（個人資料處理）</h2>
          <p>本公司因用戶利用本服務所取得之個人資料，皆將依據本公司之「隱私權保護政策」進行妥善且合法的管理與保護。</p>

          <h2>第六條（準據法與管轄法院）</h2>
          <p>本條款之解釋與適用皆以日本法為準據法。若因本服務引發任何爭議或訴訟，雙方合意以本公司總社所在地之管轄法院為第一審專屬合意管轄法院。</p>
        </div>
      </div>
    </>
  );
}