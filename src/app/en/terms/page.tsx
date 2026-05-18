"use client";

import React from 'react';
import Link from 'next/link';

export default function EnglishTermsOfService() {
  return (
    <>
      <style jsx global>{`
        body { font-family: 'Sora', sans-serif; background: #FAFAF9; color: #1A1A2E; line-height: 1.8; }
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
        <Link href="/en" className="back-link">
          <i className="fa fa-arrow-left"></i> Back to Home
        </Link>
        <h1 className="title">Pre-registration Terms of Service</h1>
        
        <div className="doc-section">
          <p>These Terms of Service ("Terms") govern the use of the cocora pre-registration service ("Service") provided by MEFAR Inc. ("Company"). Users ("Users") shall use the Service in accordance with these Terms.</p>

          <h2>Article 1 (Scope)</h2>
          <p>These Terms apply to all relationships between Users and the Company regarding the use of the Service.</p>

          <h2>Article 2 (Pre-registration)</h2>
          <ol>
            <li>Pre-registration is complete when the applicant applies via the method designated by the Company and the Company approves it.</li>
            <li>The Company may not approve the application if it determines any of the following apply, and is under no obligation to disclose the reason:
              <ul>
                <li>Providing false information</li>
                <li>Application from a person who has previously violated these Terms</li>
                <li>Other cases where the Company deems the pre-registration inappropriate</li>
              </ul>
            </li>
          </ol>

          <h2>Article 3 (Suspension of Service)</h2>
          <p>The Company may suspend or interrupt all or part of the Service without prior notice to the User if it determines any of the following apply:</p>
          <ol>
            <li>Maintenance, inspection, or updating of computer systems related to the Service</li>
            <li>When it becomes difficult to provide the Service due to force majeure such as earthquake, lightning strike, fire, power outage, or natural disaster</li>
            <li>Other cases where the Company determines it is difficult to provide the Service</li>
          </ol>
          <p>The Company shall not be liable for any disadvantage or damage suffered by Users or third parties due to the suspension or interruption of the provision of the Service.</p>

          <h2>Article 4 (Changes to Service / Cancellation of Development)</h2>
          <p>The Company may change the contents of the Service or postpone/cancel the official release of cocora without notifying the User, and shall not be liable for any damages caused to the User as a result.</p>

          <h2>Article 5 (Handling of Personal Information)</h2>
          <p>The Company will appropriately handle personal information acquired through the use of the Service in accordance with our "Privacy Policy".</p>

          <h2>Article 6 (Governing Law and Jurisdiction)</h2>
          <p>The interpretation of these Terms shall be governed by Japanese law. In the event of any dispute regarding the Service, the court having jurisdiction over the location of our head office shall have exclusive jurisdiction.</p>
        </div>
      </div>
    </>
  );
}