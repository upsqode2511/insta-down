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
    <div className="faq-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 className="faq-section-title">
        Frequently Asked Questions (FAQs)
      </h2>
      
      <div className="faq-list">
        {faqsToDisplay.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <details 
              key={index} 
              name="faq-accordion"
              className="faq-item"
              open={isOpen}
              onToggle={(e) => {
                if (e.currentTarget.open && openIndex !== index) {
                  setOpenIndex(index);
                } else if (!e.currentTarget.open && openIndex === index) {
                  setOpenIndex(null);
                }
              }}
            >
              <summary className="faq-summary">
                <h3 className="faq-question">
                  {faq.question}
                </h3>
                <span className="faq-icon">
                  {isOpen ? '−' : '+'}
                </span>
              </summary>
              
              <div className="faq-answer">
                <p>
                  {faq.answer}
                </p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
