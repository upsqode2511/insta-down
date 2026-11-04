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
    <section className="container" style={{ padding: '2.5rem 1rem 0', maxWidth: '1000px', margin: '0 auto', marginBottom: '2.5rem' }}>
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
                border: '1.5px solid #e7daf2',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.05)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <summary 
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.1rem 1.5rem', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  outline: 'none',
                  listStyle: 'none',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  backgroundColor: isOpen ? '#f3e8fa' : '#f8f3fc',
                  color: '#3b1854',
                  userSelect: 'none',
                  transition: 'background-color 0.2s ease, color 0.2s ease'
                }}
              >
                <h3 style={{ margin: 0, display: 'block', paddingRight: '1rem', color: '#3b1854', fontSize: '1.05rem', fontWeight: '700' }}>
                  {faq.question}
                </h3>
                <span 
                  style={{ 
                    color: '#7c3aed', 
                    backgroundColor: isOpen ? 'rgba(124, 58, 237, 0.15)' : 'rgba(124, 58, 237, 0.08)',
                    borderRadius: '50%',
                    flexShrink: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    width: '30px', 
                    height: '30px', 
                    lineHeight: '1',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </summary>
              
              <div 
                style={{ 
                  padding: '1.25rem 1.5rem',
                  color: '#475569',
                  lineHeight: '1.65',
                  backgroundColor: '#ffffff',
                  borderTop: '1px solid #f0e4f7'
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
          border-color: #c9a9e3 !important;
          box-shadow: 0 6px 18px rgba(139, 92, 246, 0.08) !important;
        }
        details:hover {
          border-color: #d8bfe8;
        }
        summary:hover {
          background-color: #eee0f7 !important;
        }
      `}} />
    </section>
  );
}
