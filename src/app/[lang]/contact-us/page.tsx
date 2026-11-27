import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Us - InstaDown',
    description: 'Get in touch with the InstaDown team for support, inquiries, or feedback.',
  };
}

export default function ContactUsPage() {
  return (
    <>
      <meta itemProp="name" content="Contact Us - InstaDown" />
      <meta itemProp="description" content="Get in touch with the InstaDown team for support, inquiries, or feedback." />
      <main className="container static-page">
        <h1 className="static-page-title">
          Contact Us
        </h1>
        
        <p className="static-page-lead">
          Have questions, suggestions, or experiencing an issue with our Instagram downloader? We'd love to hear from you! Please reach out to us using the contact form below or via direct email.
        </p>

        <div className="contact-grid">
          <form className="contact-form">
            <div className="contact-field">
              <label>
                Your Name
              </label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                required
                className="contact-input"
              />
            </div>

            <div className="contact-field">
              <label>
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                required
                className="contact-input"
              />
            </div>

            <div className="contact-field">
              <label>
                Subject
              </label>
              <input 
                type="text" 
                placeholder="Subject of your message" 
                required
                className="contact-input"
              />
            </div>

            <div className="contact-field">
              <label>
                Message
              </label>
              <textarea 
                rows={5} 
                placeholder="How can we help you?" 
                required
                className="contact-textarea"
              />
            </div>

            <button 
              type="submit"
              className="contact-submit-btn"
            >
              Send Message
            </button>
          </form>

          <div className="contact-info-card">
            <h2 className="static-page-heading">
              Direct Support
            </h2>
            <p className="static-page-text">
              If you prefer direct communication, feel free to email our team:
            </p>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155' }}>
                Email Support
              </h3>
              <p style={{ color: '#0f172a', fontWeight: '600', margin: 0, fontSize: '15px' }}>
                support@instadown.example.com
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155' }}>
                Response Time
              </h3>
              <p style={{ color: '#475569', margin: 0, fontSize: '15px' }}>
                We typically respond within 24–48 hours on business days.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
