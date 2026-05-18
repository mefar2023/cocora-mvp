"use client";

import React from 'react';
import Link from 'next/link';

export default function EnglishPrivacyPolicy() {
  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', sans-serif; background: #FAFAF9; color: #1A1A2E; line-height: 1.8; }
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
        <Link href="/en" className="back-link">
          <i className="fa fa-arrow-left"></i> Back to Home
        </Link>
        <h1 className="title">Privacy Policy</h1>
        
        <div className="doc-section">
          <p>MEFAR Inc. ("Company") establishes the following privacy policy ("Policy") regarding the handling of users' personal information in the cocora pre-registration service ("Service").</p>

          <h2>Article 1 (Personal Information)</h2>
          <p>"Personal Information" refers to "personal information" as defined in the Personal Information Protection Act of Japan, which is information about a living individual that can identify a specific individual by name, date of birth, address, phone number, contact information, and other descriptions contained in the information, as well as data relating to appearance, fingerprints, voiceprints, and information that can identify a specific individual from that information alone, such as the insurer number of a health insurance card (personal identification information).</p>

          <h2>Article 2 (Method of Collecting Personal Information)</h2>
          <p>The Company may ask for personal information such as name and email address when a User pre-registers for the Service.</p>

          <h2>Article 3 (Purpose of Collecting and Using Personal Information)</h2>
          <p>The purposes for which the Company collects and uses personal information are as follows:</p>
          <ol>
            <li>To provide notifications and guidance regarding the launch of cocora services</li>
            <li>To respond to inquiries from Users (including identity verification)</li>
            <li>To conduct surveys, campaigns, etc., regarding cocora</li>
            <li>Purposes incidental to the above usage purposes</li>
          </ol>

          <h2>Article 4 (Change of Purpose of Use)</h2>
          <p>The Company shall change the purpose of use of personal information only when it is reasonably recognized that the purpose of use is relevant to that before the change. In the event of a change in the purpose of use, the changed purpose shall be notified to the User or announced on this website by the method prescribed by the Company.</p>

          <h2>Article 5 (Provision of Personal Information to Third Parties)</h2>
          <p>The Company will not provide personal information to third parties without the prior consent of the User, except as permitted by the Personal Information Protection Act or other laws and regulations.</p>

          <h2>Article 6 (Contact Information)</h2>
          <p>For inquiries regarding this Policy, please contact the following desk:</p>
          <p style={{ lineHeight: "2.0", fontWeight: "500" }}>
            Address: 11-9 Park Heights #202, Sezaki 1-chome, Soka-shi, Saitama, Japan<br />
            Company Name: MEFAR Inc.<br />
            Department: cocora Operations Team<br />
            Email Address: cocora@mefar.jp
          </p>
        </div>
      </div>
    </>
  );
}