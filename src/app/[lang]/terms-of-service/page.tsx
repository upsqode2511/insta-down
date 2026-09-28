import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Service - InstaDown',
    description: 'InstaDown Terms of Service and usage conditions.',
  };
}

export default function TermsOfServicePage() {
  return (
    <main className="container" style={{ padding: '3.5rem 1rem 5rem', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
      <h1 style={{ fontWeight: '800', marginBottom: '1.5rem', textAlign: 'left', color: '#0f172a' }}>
        Terms of Service
      </h1>
      
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Last updated: September 28, 2026
      </p>

      <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '2rem' }}>
        By accessing or using the <strong>InstaDown</strong> website and service, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          1. Use of Service
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown provides an online media downloading utility for personal, non-commercial use only. Users agree not to misuse the service or use it for any illegal activities or copyright infringement.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          2. Intellectual Property Rights
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          All media content downloaded using InstaDown belongs to its respective owners or creators. InstaDown does not claim ownership over any Instagram images, videos, or reels processed through the service. Users are responsible for obtaining permissions from content creators prior to republishing or redistributing downloaded content.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          3. Disclaimer of Warranties
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown is provided on an "as is" and "as available" basis without any warranties of any kind, express or implied. We do not guarantee uninterrupted or error-free operation.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          4. Limitation of Liability
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          In no event shall InstaDown, its operators, or affiliates be liable for any damages arising out of the use or inability to use the service.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          5. Third-Party Disclaimer
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown is an independent web application and is not affiliated with, sponsored by, or associated with Instagram or Meta Platforms, Inc.
        </p>
      </section>
    </main>
  );
}
