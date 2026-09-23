'use client';
import React, { useState } from 'react';

interface FAQProps {
  items: { question: string, answer: string }[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // No items open by default
  
  // Use passed items or fallback to empty array
  const faqsToDisplay = items || [];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    <section className="container" style={{ padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto', marginBottom: '4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 3rem', textAlign: 'center', color: '#111' }}>
        Frequently Asked Questions (FAQs)
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                border: '2px solid #eaeaea',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}
            >
              <summary 
                style={{ 
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.25rem 1.5rem', 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  outline: 'none',
                  listStyle: 'none', // Hides default arrow in many browsers
                  fontWeight: 'bold',
                  fontSize: '1.15rem',
                  color: '#222'
                }}
              >
                <span style={{ margin: 0, display: 'block', paddingRight: '1rem' }}>
                  {faq.question}
                </span>
                <span style={{ color: '#555', flexShrink: 0, display: 'block' }}>
                  <svg 
                    className="faq-icon"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              
              <div 
                style={{ 
                  padding: '0 1.5rem 1.5rem',
                  color: '#555',
                  lineHeight: '1.7',
                  fontSize: '1.05rem',
                  borderTop: '1px solid #eaeaea'
                }}
              >
                <p style={{ margin: 0 }}>
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
        details[open] summary ~ div {
          animation: faq-slide-down 0.3s ease-in-out;
        }
        details[open] summary .faq-icon {
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }
        details:not([open]) summary .faq-icon {
          transform: rotate(0deg);
          transition: transform 0.3s ease;
        }
        @keyframes faq-slide-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        details[open] {
          border-color: #3b82f6 !important;
        }
      `}} />
    </section>
  );
}
