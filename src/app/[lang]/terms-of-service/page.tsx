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
    <>
      <meta itemProp="name" content="Terms of Service - InstaDown" />
      <meta itemProp="description" content="InstaDown Terms of Service and usage conditions." />
      <main className="container static-page">
        <h1 className="static-page-title">
          Terms of Service
        </h1>
        
        <p className="static-page-meta">
          Last updated: September 28, 2026
        </p>

        <p className="static-page-lead">
          By accessing or using the <strong>InstaDown</strong> website and service, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            1. Use of Service
          </h2>
          <p className="static-page-text">
            InstaDown provides an online media downloading utility for personal, non-commercial use only. Users agree not to misuse the service or use it for any illegal activities or copyright infringement.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            2. Intellectual Property Rights
          </h2>
          <p className="static-page-text">
            All media content downloaded using InstaDown belongs to its respective owners or creators. InstaDown does not claim ownership over any Instagram images, videos, or reels processed through the service. Users are responsible for obtaining permissions from content creators prior to republishing or redistributing downloaded content.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            3. Disclaimer of Warranties
          </h2>
          <p className="static-page-text">
            InstaDown is provided on an "as is" and "as available" basis without any warranties of any kind, express or implied. We do not guarantee uninterrupted or error-free operation.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            4. Limitation of Liability
          </h2>
          <p className="static-page-text">
            In no event shall InstaDown, its operators, or affiliates be liable for any damages arising out of the use or inability to use the service.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            5. Third-Party Disclaimer
          </h2>
          <p className="static-page-text">
            InstaDown is an independent web application and is not affiliated with, sponsored by, or associated with Instagram or Meta Platforms, Inc.
          </p>
        </section>
      </main>
    </>
  );
}
