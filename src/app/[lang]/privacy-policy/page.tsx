import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy - InstaDown',
    description: 'InstaDown Privacy Policy outlining data collection, security, and user rights.',
  };
}

export default function PrivacyPolicyPage() {
  return (
    <main className="container" style={{ padding: '3.5rem 1rem 5rem', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
      <h1 style={{ fontWeight: '800', marginBottom: '1.5rem', textAlign: 'left', color: '#0f172a' }}>
        Privacy Policy
      </h1>
      
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Last updated: September 28, 2026
      </p>

      <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '2rem' }}>
        At <strong>InstaDown</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by InstaDown and how we use it.
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          1. Information We Collect
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown does not require registration or account creation. We do not collect or store personal identification information such as names, email addresses, phone numbers, or Instagram passwords.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          2. Log Files & Analytics
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          Like most standard website servers, InstaDown follows a standard procedure of using log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          3. Cookies
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown uses 'cookies' to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          4. Media Storage & Downloads
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown does not host or store any downloaded Instagram content on its servers. All media files are streamed directly from Instagram CDN servers to the user's web browser.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          5. Contact Information
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>
      </section>
    </main>
  );
}
