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
    <>
      <meta itemProp="name" content="Privacy Policy - InstaDown" />
      <meta itemProp="description" content="InstaDown Privacy Policy outlining data collection, security, and user rights." />
      <main className="container static-page">
        <h1 className="static-page-title">
          Privacy Policy
        </h1>
        
        <p className="static-page-meta">
          Last updated: September 28, 2026
        </p>

        <p className="static-page-lead">
          At <strong>InstaDown</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by InstaDown and how we use it.
        </p>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            1. Information We Collect
          </h2>
          <p className="static-page-text">
            InstaDown does not require registration or account creation. We do not collect or store personal identification information such as names, email addresses, phone numbers, or Instagram passwords.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            2. Log Files & Analytics
          </h2>
          <p className="static-page-text">
            Like most standard website servers, InstaDown follows a standard procedure of using log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            3. Cookies
          </h2>
          <p className="static-page-text">
            InstaDown uses 'cookies' to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            4. Media Storage & Downloads
          </h2>
          <p className="static-page-text">
            InstaDown does not host or store any downloaded Instagram content on its servers. All media files are streamed directly from Instagram CDN servers to the user's web browser.
          </p>
        </section>

        <section className="static-page-section">
          <h2 className="static-page-heading">
            5. Contact Information
          </h2>
          <p className="static-page-text">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
        </section>
      </main>
    </>
  );
}
