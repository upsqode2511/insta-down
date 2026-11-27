// @ts-nocheck
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Dictionary } from '@/dictionaries';
import ResultCard from './ResultCard';
import FAQ from './FAQ';

type DownloaderProps = {
  lang: string;
  activeTab: 'video' | 'photo' | 'story' | 'reel' | 'profile';
  title: string;
  subtitle: string;
  dict: Dictionary;
  metaTitle?: string;
  metaDescription?: string;
};

function renderWhyUseList(title?: string, reasons?: string[]) {
  if (!reasons || reasons.length === 0 || !title) return null;

  return (
    <div className="why-use-section">
      <h2 className="why-use-title">
        {title}
      </h2>
      <div className="why-use-list">
        {reasons.map((item, idx) => {
          if (!item) return null;
          // Strip leading numbering if already present (e.g. "1. " or "1 - ")
          const clean = item.replace(/^\d+[\.\-\)]\s*/, '').trim();
          // Extract title and description
          const match = clean.match(/^([^.:!?\u3002\uFF0E]+[.:!?\u3002\uFF0E])\s*(.*)$/);
          let itemTitle = clean;
          let itemDesc = '';
          if (match) {
            itemTitle = match[1].replace(/[.:!?\u3002\uFF0E]+$/, '').trim();
            itemDesc = match[2].trim();
          }

          return (
            <div key={idx} className="why-use-item">
              <h3 className="why-use-item-title">
                {`${idx + 1}. ${itemTitle}`}
              </h3>
              {itemDesc && (
                <p className="why-use-item-desc">
                  {itemDesc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Downloader({ lang, activeTab, title, subtitle, dict, metaTitle, metaDescription }: DownloaderProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);


  // If lang is 'en', we don't prefix the URL (except the root which is just '/')
  const prefix = lang === 'en' ? '' : `/${lang}`;

  const handleSubmit = async (overrideUrl?: string) => {
    if (loading) return;
    const currentUrl = overrideUrl || url || inputRef.current?.value || '';
    const trimmedUrl = currentUrl.trim();
    if (!trimmedUrl) {
      alert("Please paste a valid Instagram link first.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      console.error(error);
      setResult({ error: true, message: error.message || 'Failed to fetch Instagram user info.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      if (!navigator?.clipboard?.readText) {
        inputRef.current?.focus();
        alert("Clipboard access is restricted on this browser. Please tap and hold the input box to paste manually.");
        return;
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        handleSubmit(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      inputRef.current?.focus();
      alert("Could not paste automatically. Please tap and hold the input box to paste manually.");
    }
  };

  return (
    <main className="main-content">
      <meta itemProp="name" content={metaTitle || title} />
      <meta itemProp="description" content={metaDescription || subtitle} />
      <div className="hero-gradient-wrapper">
        <div className="container hero">
          <h1 className="hero-title">
            <span>{title}</span>
          </h1>
          <p className="hero-subtitle">{subtitle}</p>
      
      <div className="download-panel">
        <form 
          className="download-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <div className="input-wrapper">
            <svg className="input-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <input 
              ref={inputRef}
              type="text" 
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="url-input" 
              placeholder={dict?.downloader?.placeholder || "Search or paste Instagram link here"} 
              aria-label="Instagram URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.keyCode === 13) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.blur();
                  handleSubmit();
                }
              }}
            />
            <button type="button" className="desktop-paste-btn" onClick={handlePaste}>
              {dict?.downloader?.paste || 'Paste'}
            </button>
          </div>

          <div className="buttons-row">
            <button type="button" className="panel-paste-btn" onClick={handlePaste}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              {dict?.downloader?.paste || 'Paste'}
            </button>
            <button 
              type="submit" 
              className="panel-download-btn" 
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              )}
              {loading ? 'Processing...' : (dict?.downloader?.download || 'Download')}
            </button>
          </div>
        </form>

        {result && (
          <div ref={resultRef} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ResultCard 
              data={result} 
              onRetry={() => {
                setResult(null);
                inputRef.current?.focus();
              }} 
            />
          </div>
        )}
      </div>
      </div>
      </div>

      {(activeTab === 'video' || activeTab === 'reel') && (
        <>
          <section className="container info-section">
            <h1 className="info-section-title">
              {activeTab === 'video'
                ? (dict.informationalContent?.videoInfoTitle || 'Instagram Video Downloader')
                : activeTab === 'reel'
                ? (dict.informationalContent?.reelsInfoTitle || 'Instagram Reels Downloader HD')
                : title}
            </h1>
            <div className="info-section-content">
              {activeTab === 'reel' && (
                <>
                  {dict.informationalContent?.reels_p1 && (
                    <p>{dict.informationalContent?.reels_p1}</p>
                  )}
                  {dict.informationalContent?.reels_p2 && (
                    <p>{dict.informationalContent?.reels_p2}</p>
                  )}
                  {dict.informationalContent?.reels_p3 && (
                    <p>{dict.informationalContent?.reels_p3}</p>
                  )}
                </>
              )}
              {activeTab === 'video' && (
                <>
                  <p>{dict.informationalContent?.p1}</p>
                  <p>{dict.informationalContent?.p2}</p>
                  <p>{dict.informationalContent?.p3}</p>
                  <p>{dict.informationalContent?.p4}</p>
                </>
              )}
            </div>

            <div className="how-it-works-section">
              <div className="how-it-works-header">
                <h2 className="how-it-works-title">
                  {activeTab === 'reel' 
                    ? (dict.informationalContent?.reelsHowItWorksTitle || dict.informationalContent?.howItWorksTitle || 'How it works')
                    : (dict.informationalContent?.howItWorksTitle || 'How it works')}
                </h2>
                {activeTab === 'reel' && dict.informationalContent?.reelsHowItWorksSubtitle && (
                  <p className="how-it-works-subtitle">
                    {dict.informationalContent.reelsHowItWorksSubtitle}
                  </p>
                )}
              </div>
              
              <div className="how-it-works-container">
                {(activeTab === 'reel' 
                  ? (dict.informationalContent?.reelsHowItWorksSteps || dict.informationalContent?.howItWorksSteps) 
                  : dict.informationalContent?.howItWorksSteps)?.map((step, idx) => {
                  const c = { bg: '#eff6ff', stroke: '#3b82f6', grad: 'linear-gradient(135deg, #60a5fa, #2563eb)' };
                  
                  const icons = [
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="7" width="12" height="14" rx="3.5"></rect><path d="M16 7V5.5A2.5 2.5 0 0 0 13.5 3h-7A2.5 2.5 0 0 0 4 5.5v10A2.5 2.5 0 0 0 6.5 18H8"></path></svg>,
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  ];

                  return (
                    <article key={idx} className="how-it-works-item">
                      <div className="how-it-works-badge-wrap">
                        <div className="how-it-works-icon-circle">
                          {icons[idx]}
                        </div>
                        <div className="how-it-works-step-number">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="how-it-works-item-content">
                        <h3 className="how-it-works-item-title">{step.title}</h3>
                        <p className="how-it-works-item-desc">{step.desc}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {renderWhyUseList(
              activeTab === 'reel' 
                ? (dict.informationalContent?.reelsWhyUseTitle || dict.informationalContent?.whyUseTitle)
                : dict.informationalContent?.whyUseTitle,
              activeTab === 'reel'
                ? (dict.informationalContent?.reelsWhyUseReasons || dict.informationalContent?.whyUseReasons)
                : dict.informationalContent?.whyUseReasons
            )}

            <div className="features-section">
              <h2 className="features-section-title">
                {activeTab === 'reel' 
                  ? (dict.informationalContent?.reelsFeaturesTitle || "Features of InstaDown Instagram Reels Downloader")
                  : (dict.informationalContent?.featuresTitle || "Features of InstaDown")}
              </h2>
              <div className="features-grid">
                {(activeTab === 'reel' ? [
                  {
                    title: dict.informationalContent?.reelsFeaturesList?.[0]?.title || dict.tabs?.video || "Video",
                    desc: dict.informationalContent?.reelsFeaturesList?.[0]?.desc || "Our Instagram video downloader helps you save videos using their links (URLs). Simply copy the video link, paste it into InstaDown, and use the available download option to save the content to your device.",
                    image: "/features/feature-video.png",
                    color: "#7e22ce"
                  },
                  {
                    title: dict.informationalContent?.reelsFeaturesList?.[1]?.title || dict.tabs?.photo || "Photos",
                    desc: dict.informationalContent?.reelsFeaturesList?.[1]?.desc || "Save supported Instagram photos using their public post URLs. Instadown offers a simple way to process photo links and download available image content without the need for additional software or complex steps.",
                    image: "/features/feature-photo.png",
                    color: "#16a34a"
                  },
                  {
                    title: dict.informationalContent?.reelsFeaturesList?.[2]?.title || dict.tabs?.profile || "Profile",
                    desc: dict.informationalContent?.reelsFeaturesList?.[2]?.desc || "The Profile Downloader is designed to help you retrieve downloadable content associated with supported Instagram profiles. Enter the relevant profile URL and use the available options to find and save supported content.",
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
                    bg: "linear-gradient(135deg, #60a5fa, #2563eb)",
                    color: "#2563eb"
                  }
                ] : [
                  {
                    title: dict.informationalContent?.featuresList?.[0]?.title || dict.tabs?.reel || "Reels",
                    desc: dict.informationalContent?.featuresList?.[0]?.desc || "Instagram Reels downloader simplifies the process. This processes the reel URL and provides an available download option. Use this feature only in public and respect copyright and permissions.",
                    image: "/features/feature-reel.png",
                    color: "#db2777"
                  },
                  {
                    title: dict.informationalContent?.featuresList?.[1]?.title || dict.tabs?.photo || "Photos",
                    desc: dict.informationalContent?.featuresList?.[1]?.desc || "Instagram Photo Downloader helps you save photos from publicly accessible Instagram posts. Once the photo is available, you can save it directly to your device. This is useful for keeping images that you want to view later.",
                    image: "/features/feature-photo.png",
                    color: "#16a34a"
                  },
                  {
                    title: dict.informationalContent?.featuresList?.[2]?.title || dict.tabs?.profile || "Profile",
                    desc: dict.informationalContent?.featuresList?.[2]?.desc || "Instagram Profile Downloader provides a convenient way to access downloadable content associated with publicly accessible Instagram profiles. Use the profile URL with the tool and download the content where permitted.",
                    image: "/features/feature-profile.png",
                    color: "#2563eb"
                  }
                ]).map((card, idx) => (
                  <article key={idx} className="feature-card">
                    {card.image ? (
                      <div className="feature-icon-wrapper">
                        <Image 
                          src={card.image} 
                          alt={card.title} 
                          width={56} 
                          height={56} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <div className="feature-icon-circle" style={{ background: card.bg }}>
                        {card.icon}
                      </div>
                    )}
                    <div className="feature-card-content">
                      <h3 className="feature-card-title" style={{ color: card.color }}>{card.title}</h3>
                      <p className="feature-card-desc">{card.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <FAQ items={activeTab === 'profile' ? dict.informationalContent?.profileFaqs : activeTab === 'photo' ? dict.informationalContent?.photoFaqs : activeTab === 'reel' ? dict.informationalContent?.reelsFaqs : dict.informationalContent?.videoFaqs} />
          </section>
        </>
      )}

      {activeTab === 'photo' && dict.informationalContent?.photoInfoTitle && (
        <>
          <section className="container info-section">
            <h1 className="info-section-title">
              {dict.informationalContent.photoInfoTitle}
            </h1>
            <div className="info-section-content">
              {dict.informationalContent.photoInfoParagraphs?.map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {dict.informationalContent?.photoHowItWorksTitle && dict.informationalContent?.photoHowItWorksList && (
              <div className="how-it-works-section">
                <div className="how-it-works-header">
                  <h2 className="how-it-works-title">
                    {dict.informationalContent.photoHowItWorksTitle}
                  </h2>
                </div>
                
                <div className="how-it-works-container">
                  {dict.informationalContent.photoHowItWorksList.map((step: any, idx: number) => {
                    const c = { bg: '#eff6ff', stroke: '#3b82f6', grad: 'linear-gradient(135deg, #60a5fa, #2563eb)' };
                    
                    const icons = [
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="7" width="12" height="14" rx="3.5"></rect><path d="M16 7V5.5A2.5 2.5 0 0 0 13.5 3h-7A2.5 2.5 0 0 0 4 5.5v10A2.5 2.5 0 0 0 6.5 18H8"></path></svg>,
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    ];
        
                    return (
                      <article key={idx} className="how-it-works-item">
                        <div className="how-it-works-badge-wrap">
                          <div className="how-it-works-icon-circle">
                            {icons[idx]}
                          </div>
                          <div className="how-it-works-step-number">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="how-it-works-item-content">
                          <h3 className="how-it-works-item-title">{step.title}</h3>
                          <p className="how-it-works-item-desc">{step.desc}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {renderWhyUseList(
              dict.informationalContent?.photoWhyUseTitle,
              dict.informationalContent?.photoWhyUseReasons
            )}

            {dict.informationalContent?.photoFeaturesTitle && dict.informationalContent?.photoFeaturesList && (
              <div className="features-section">
                <h2 className="features-section-title">
                  {dict.informationalContent.photoFeaturesTitle}
                </h2>
                <div className="features-grid">
                  {[
                    {
                      title: dict.informationalContent.photoFeaturesList[0]?.title || dict.tabs?.video || "Video",
                      desc: dict.informationalContent.photoFeaturesList[0]?.desc,
                      image: "/features/feature-video.png",
                      color: "#7e22ce"
                    },
                    {
                      title: dict.informationalContent.photoFeaturesList[1]?.title || dict.tabs?.reel || "Reels",
                      desc: dict.informationalContent.photoFeaturesList[1]?.desc,
                      image: "/features/feature-reel.png",
                      color: "#db2777"
                    },
                    {
                      title: dict.informationalContent.photoFeaturesList[2]?.title || dict.tabs?.profile || "Profile",
                      desc: dict.informationalContent.photoFeaturesList[2]?.desc,
                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
                      bg: "linear-gradient(135deg, #60a5fa, #2563eb)",
                      color: "#2563eb"
                    }
                  ].map((card, idx) => (
                    <article key={idx} className="feature-card">
                      {card.image ? (
                        <div className="feature-icon-wrapper">
                          <Image 
                            src={card.image} 
                            alt={card.title} 
                            width={56} 
                            height={56} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                      ) : (
                        <div className="feature-icon-circle" style={{ background: card.bg }}>
                          {card.icon}
                        </div>
                      )}
                      <div className="feature-card-content">
                        <h3 className="feature-card-title" style={{ color: card.color }}>{card.title}</h3>
                        <p className="feature-card-desc">{card.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <FAQ items={activeTab === 'profile' ? dict.informationalContent?.profileFaqs : activeTab === 'photo' ? dict.informationalContent?.photoFaqs : activeTab === 'reel' ? dict.informationalContent?.reelsFaqs : dict.informationalContent?.videoFaqs} />
          </section>
        </>
      )}


      {activeTab === 'profile' && dict.informationalContent?.profileInfoTitle && (
        <>
          <section className="container info-section">
            <h1 className="info-section-title">
              {dict.informationalContent.profileInfoTitle}
            </h1>
            <div className="info-section-content">
              {dict.informationalContent.profileInfoParagraphs?.map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            {dict.informationalContent?.profileHowItWorksTitle && dict.informationalContent?.profileHowItWorksList && (
              <div className="how-it-works-section">
                <div className="how-it-works-header">
                  <h2 className="how-it-works-title">
                    {dict.informationalContent.profileHowItWorksTitle}
                  </h2>
                </div>
                
                <div className="how-it-works-container">
                  {dict.informationalContent.profileHowItWorksList.map((step: any, idx: number) => {
                    const c = { bg: '#eff6ff', stroke: '#3b82f6', grad: 'linear-gradient(135deg, #60a5fa, #2563eb)' };
                    
                    const icons = [
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="7" width="12" height="14" rx="3.5"></rect><path d="M16 7V5.5A2.5 2.5 0 0 0 13.5 3h-7A2.5 2.5 0 0 0 4 5.5v10A2.5 2.5 0 0 0 6.5 18H8"></path></svg>,
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={c.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    ];
        
                    return (
                      <article key={idx} className="how-it-works-item">
                        <div className="how-it-works-badge-wrap">
                          <div className="how-it-works-icon-circle">
                            {icons[idx]}
                          </div>
                          <div className="how-it-works-step-number">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="how-it-works-item-content">
                          <h3 className="how-it-works-item-title">{step.title}</h3>
                          <p className="how-it-works-item-desc">{step.desc}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {renderWhyUseList(
              dict.informationalContent?.profileWhyUseTitle,
              dict.informationalContent?.profileWhyUseReasons
            )}

            {dict.informationalContent?.profileFeaturesTitle && dict.informationalContent?.profileFeaturesList && (
              <div className="features-section">
                <h2 className="features-section-title">
                  {dict.informationalContent.profileFeaturesTitle}
                </h2>
                <div className="features-grid">
                  {[
                    {
                      title: dict.informationalContent.profileFeaturesList[0]?.title || dict.tabs?.video || "Video",
                      desc: dict.informationalContent.profileFeaturesList[0]?.desc,
                      image: "/features/feature-video.png",
                      color: "#7e22ce"
                    },
                    {
                      title: dict.informationalContent.profileFeaturesList[1]?.title || dict.tabs?.reel || "Reels",
                      desc: dict.informationalContent.profileFeaturesList[1]?.desc,
                      image: "/features/feature-reel.png",
                      color: "#db2777"
                    },
                    {
                      title: dict.informationalContent.profileFeaturesList[2]?.title || dict.tabs?.photo || "Photo",
                      desc: dict.informationalContent.profileFeaturesList[2]?.desc,
                      image: "/features/feature-photo.png",
                      color: "#16a34a"
                    }
                  ].map((card, idx) => (
                    <article key={idx} className="feature-card">
                      {card.image ? (
                        <div className="feature-icon-wrapper">
                          <Image 
                            src={card.image} 
                            alt={card.title} 
                            width={56} 
                            height={56} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                      ) : (
                        <div className="feature-icon-circle" style={{ background: card.bg }}>
                          {card.icon}
                        </div>
                      )}
                      <div className="feature-card-content">
                        <h3 className="feature-card-title" style={{ color: card.color }}>{card.title}</h3>
                        <p className="feature-card-desc">{card.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <FAQ items={activeTab === 'profile' ? dict.informationalContent?.profileFaqs : activeTab === 'photo' ? dict.informationalContent?.photoFaqs : activeTab === 'reel' ? dict.informationalContent?.reelsFaqs : dict.informationalContent?.videoFaqs} />
          </section>
        </>
      )}
    </main>
  );
}
