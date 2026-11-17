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
    <>
      <meta itemProp="name" content="About Us - InstaDown" />
      <meta itemProp="description" content="Learn more about InstaDown, your trusted online Instagram downloader tool for videos, photos, reels, and profile pictures." />
      <main className="container static-page">
        <h1 className="static-page-title">
          About Us
        </h1>
        
        <p className="static-page-lead">
          Welcome to <strong>InstaDown</strong>, a high-performance web tool designed to help users quickly and easily download publicly available Instagram photos, videos, reels, stories, and profile pictures in high quality.
        </p>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            Who We Are
          </h2>
          <p className="static-page-text">
            InstaDown was built with simplicity, speed, and privacy at its core. We believe that downloading your favorite Instagram media for offline viewing or creative reference should be simple, fast, and completely free of complicated software installs.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            Why Choose InstaDown?
          </h2>
          <ul className="static-page-list">
            <li><strong>High Definition Quality:</strong> Download original HD videos and full-resolution photos without quality compression.</li>
            <li><strong>Universal Compatibility:</strong> Works smoothly across all desktop browsers, Android devices, iPhones, and tablets.</li>
            <li><strong>No Registration Required:</strong> Enjoy instant access without creating an account or providing sensitive personal information.</li>
            <li><strong>Privacy First:</strong> We do not log your download history or store personal data on our servers.</li>
          </ul>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            Disclaimer
          </h2>
          <p className="static-page-text">
            InstaDown is an independent web application and is not affiliated with, endorsed by, or sponsored by Instagram, Meta Platforms, Inc. All Instagram logos, trademarks, and copyrights belong to Meta Platforms, Inc. Users are responsible for respecting the copyright and intellectual property rights of content owners.
          </p>
        </section>
      </main>
    </>
  );
}
