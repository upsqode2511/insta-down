import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us - InstaDown',
    description: 'Learn more about InstaDown, your trusted online Instagram downloader tool for videos, photos, reels, and profile pictures.',
  };
}

export default function AboutUsPage() {
  return (
    <main className="container" style={{ padding: '3.5rem 1rem 5rem', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
      <h1 style={{ fontWeight: '800', marginBottom: '1.5rem', textAlign: 'left', color: '#0f172a' }}>
        About Us
      </h1>
      
      <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '2rem' }}>
        Welcome to <strong>InstaDown</strong>, a high-performance web tool designed to help users quickly and easily download publicly available Instagram photos, videos, reels, stories, and profile pictures in high quality.
      </p>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          Who We Are
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown was built with simplicity, speed, and privacy at its core. We believe that downloading your favorite Instagram media for offline viewing or creative reference should be simple, fast, and completely free of complicated software installs.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          Why Choose InstaDown?
        </h2>
        <ul style={{ color: '#475569', lineHeight: '1.8', paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>High Definition Quality:</strong> Download original HD videos and full-resolution photos without quality compression.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Universal Compatibility:</strong> Works smoothly across all desktop browsers, Android devices, iPhones, and tablets.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>No Registration Required:</strong> Enjoy instant access without creating an account or providing sensitive personal information.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Privacy First:</strong> We do not log your download history or store personal data on our servers.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
          Disclaimer
        </h2>
        <p style={{ color: '#475569', lineHeight: '1.7' }}>
          InstaDown is an independent web application and is not affiliated with, endorsed by, or sponsored by Instagram, Meta Platforms, Inc. All Instagram logos, trademarks, and copyrights belong to Meta Platforms, Inc. Users are responsible for respecting the copyright and intellectual property rights of content owners.
        </p>
      </section>
    </main>
  );
}
