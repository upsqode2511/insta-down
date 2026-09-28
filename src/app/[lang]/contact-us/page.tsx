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
    <main className="container" style={{ padding: '3.5rem 1rem 5rem', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
      <h1 style={{ fontWeight: '800', marginBottom: '1.5rem', textAlign: 'left', color: '#0f172a' }}>
        Contact Us
      </h1>
      
      <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '2.5rem' }}>
        Have questions, suggestions, or experiencing an issue with our Instagram downloader? We'd love to hear from you! Please reach out to us using the contact form below or via direct email.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              Your Name
            </label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              Subject
            </label>
            <input 
              type="text" 
              placeholder="Subject of your message" 
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>
              Message
            </label>
            <textarea 
              rows={5} 
              placeholder="How can we help you?" 
              required
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit"
            style={{ 
              backgroundColor: '#a77bb8', 
              color: '#ffffff', 
              fontWeight: '700', 
              padding: '0.85rem 1.5rem', 
              borderRadius: '8px', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            Send Message
          </button>
        </form>

        <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
            Direct Support
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            If you prefer direct communication, feel free to email our team:
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#334155' }}>
              Email Support
            </h3>
            <p style={{ color: '#0f172a', fontWeight: '600', margin: 0 }}>
              support@instadown.example.com
            </p>
          </div>

          <div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#334155' }}>
              Response Time
            </h3>
            <p style={{ color: '#475569', margin: 0 }}>
              We typically respond within 24–48 hours on business days.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
