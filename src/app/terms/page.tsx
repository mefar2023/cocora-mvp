"use client";

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', 'Noto Sans JP', sans-serif; background: #FAFAF9; color: #1A1A2E; line-height: 1.8; }
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
        <Link href="/" className="back-link">
          <i className="fa fa-arrow-left"></i> トップページに戻る
        </Link>
        <h1 className="title">事前登録 利用規約</h1>
        
        <div className="doc-section">
          <p>この利用規約（以下、「本規約」といいます。）は、株式会社MEFAR（以下、「当社」といいます。）が提供するココラ（cocora）の事前登録サービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。</p>

          <h2>第1条（適用）</h2>
          <p>本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

          <h2>第2条（事前登録）</h2>
          <ol>
            <li>登録希望者が当社の定める方法によって事前登録を申請し、当社がこれを承認することによって、事前登録が完了するものとします。</li>
            <li>当社は、事前登録の申請者に以下の事由があると判断した場合、事前登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
              <ul>
                <li>虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当社が事前登録を相当でないと判断した場合</li>
              </ul>
            </li>
          </ol>

          <h2>第3条（本サービスの提供の停止等）</h2>
          <p>当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
          <ol>
            <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
            <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
            <li>その他、当社が本サービスの提供が困難と判断した場合</li>
          </ol>
          <p>当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。</p>

          <h2>第4条（サービス内容の変更・開発の中止）</h2>
          <p>当社は、ユーザーに通知することなく、本サービスの内容を変更、またはcocoraの正式リリースを延期・中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。</p>

          <h2>第5条（個人情報の取扱い）</h2>
          <p>当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。</p>

          <h2>第6条（準拠法・裁判管轄）</h2>
          <p>本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</p>
        </div>
      </div>
    </>
  );
}