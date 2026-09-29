'use client';
import React, { useState } from 'react';

interface FAQProps {
  items: { question: string, answer: string }[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  
  // Use passed items or fallback to empty array
  const faqsToDisplay = items || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsToDisplay.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="container" style={{ padding: '3.5rem 1rem', maxWidth: '1000px', margin: '0 auto', marginBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 style={{ fontWeight: 'bold', margin: '0 0 2.5rem', textAlign: 'center', color: '#111' }}>
        Frequently Asked Questions (FAQs)
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqsToDisplay.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <details 
              key={index} 
              name="faq-accordion"
              open={isOpen}
              onToggle={(e) => {
                if (e.currentTarget.open && openIndex !== index) {
                  setOpenIndex(index);
                } else if (!e.currentTarget.open && openIndex === index) {
                  setOpenIndex(null);
                }
              }}
              style={{ 
                backgroundColor: '#fff', 
                border: '1.5px solid #ba9bd1',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(167, 123, 184, 0.08)'
              }}
            >
              <summary 
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '1rem 1.5rem', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  outline: 'none',
                  listStyle: 'none',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  backgroundColor: '#a77bb8',
                  color: '#ffffff',
                  userSelect: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                <h3 style={{ margin: 0, display: 'block', paddingRight: '1rem', color: '#ffffff', fontSize: '1.05rem', fontWeight: '700' }}>
                  {faq.question}
                </h3>
                <span style={{ color: '#ffffff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '400', width: '24px', height: '24px', lineHeight: '1' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </summary>
              
              <div 
                style={{ 
                  padding: '1.25rem 1.5rem',
                  color: '#475569',
                  lineHeight: '1.6',
                  backgroundColor: '#ffffff'
                }}
              >
                <p style={{ margin: 0, color: '#475569' }}>
                  {faq.answer}
                </p>
              </div>
            </details>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        details > summary::-webkit-details-marker {
          display: none;
        }
        details summary::-webkit-details-marker {
          display: none;
        }
        details[open] summary ~ div {
          animation: faq-slide-down 0.25s ease-in-out;
        }
        @keyframes faq-slide-down {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        details[open] {
          border-color: #a77bb8 !important;
        }
        summary:hover {
          background-color: #996cb0 !important;
        }
      `}} />
    </section>
  );
}
