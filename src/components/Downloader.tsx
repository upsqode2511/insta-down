// @ts-nocheck
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Dictionary } from '@/dictionaries';
import ResultCard from './ResultCard';
import FAQ from './FAQ';

type DownloaderProps = {
  lang: string;
  activeTab: 'video' | 'photo' | 'story' | 'reel' | 'profile';
  title: string;
  subtitle: string;
  dict: Dictionary;
};

function renderReasonContent(text?: string) {
  if (!text) return null;
  const match = text.match(/^([^.!?\u3002\uFF0E]+[.!?\u3002\uFF0E])\s*(.*)$/);
  if (match) {
    const title = match[1].replace(/[.!?\u3002\uFF0E]+$/, '').trim();
    const description = match[2].trim();
    return (
      <div style={{ flex: 1 }}>
        <h3 style={{ fontWeight: '700', color: '#1a1a2e', margin: 0, marginBottom: description ? '0.4rem' : 0, lineHeight: '1.4' }}>
          {title}
        </h3>
        {description && (
          <p style={{ color: '#555', lineHeight: '1.6', margin: 0 }}>
            {description}
          </p>
        )}
      </div>
    );
  }
  return (
    <div style={{ flex: 1 }}>
      <h3 style={{ fontWeight: '700', color: '#1a1a2e', margin: 0, lineHeight: '1.4' }}>
        {text}
      </h3>
    </div>
  );
}

export default function Downloader({ lang, activeTab, title, subtitle, dict }: DownloaderProps) {
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
      setResult({ error: true, message: error.message || 'Failed to fetch data' });
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
    <>
      <div className="hero-gradient-wrapper">
        <main className="container hero">
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
          <div ref={resultRef} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <ResultCard data={result} onRetry={() => setResult(null)} />
          </div>
        )}
      </div>
      </main>
      </div>

      {(activeTab === 'video' || activeTab === 'reel') && (
        <>
          <section className="container" style={{ padding: '3.5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
          {title}
        </h1>
        <div style={{ color: '#555', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'justify', maxWidth: '800px', margin: '0 auto' }}>
          {activeTab === 'reel' && (
            <>
              {dict.informationalContent?.reels_p1 && (
                <p style={{ margin: 0 }}>{dict.informationalContent?.reels_p1}</p>
              )}
              {dict.informationalContent?.reels_p2 && (
                <p style={{ margin: 0 }}>{dict.informationalContent?.reels_p2}</p>
              )}
              {dict.informationalContent?.reels_p3 && (
                <p style={{ margin: 0 }}>{dict.informationalContent?.reels_p3}</p>
              )}
            </>
          )}
          {activeTab === 'video' && (
            <>
              <p style={{ margin: 0 }}>{dict.informationalContent?.p1}</p>
              <p style={{ margin: 0 }}>{dict.informationalContent?.p2}</p>
              <p style={{ margin: 0 }}>{dict.informationalContent?.p3}</p>
              <p style={{ margin: 0 }}>{dict.informationalContent?.p4}</p>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '4rem 0 3rem' }}>
          <h2 style={{ fontWeight: 'bold', color: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
             
            {activeTab === 'reel' 
              ? (dict.informationalContent?.reelsHowItWorksTitle || dict.informationalContent?.howItWorksTitle || 'How it works')
              : (dict.informationalContent?.howItWorksTitle || 'How it works')}
            
          </h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem', maxWidth: '800px', margin: '0.5rem auto 0' }}>
            {activeTab === 'reel'
              ? (dict.informationalContent?.reelsHowItWorksSubtitle || dict.informationalContent?.howItWorksSubtitle || 'Download in just 3 simple steps')
              : (dict.informationalContent?.howItWorksSubtitle || 'Download in just 3 simple steps')}
          </p>
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
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '84px', height: '84px', borderRadius: '50%', backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icons[idx]}
                  </div>
                  <div style={{ position: 'absolute', top: '0', left: '0', width: '28px', height: '28px', borderRadius: '50%', background: c.grad, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', border: '3px solid white' }}>
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.4rem', color: '#1a1a2e' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{step.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

        <h2 style={{ fontWeight: 'bold', margin: '4rem 0 2rem', textAlign: 'center', color: '#333' }}>
          {activeTab === 'reel' 
            ? (dict.informationalContent?.reelsWhyUseTitle || dict.informationalContent?.whyUseTitle)
            : activeTab === 'photo'
            ? (dict.informationalContent?.photoWhyUseTitle || dict.informationalContent?.whyUseTitle)
            : activeTab === 'profile'
            ? (dict.informationalContent?.profileWhyUseTitle || dict.informationalContent?.whyUseTitle)
            : activeTab === 'story'
            ? (dict.informationalContent?.storyWhyUseTitle || dict.informationalContent?.whyUseTitle)
            : dict.informationalContent?.whyUseTitle}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {activeTab === 'reel' ? (
            [
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h5"/><path d="M1 13h5.5"/><path d="M2 17h5"/><circle cx="14.5" cy="13" r="7"/><path d="M13 3.5h3"/><path d="M14.5 3.5v2.5"/><path d="M9.8 7.2l-1.5-1.5"/><path d="M19.2 7.2l1.5-1.5"/><polyline points="14.5 9 14.5 13 17 15.5"/></svg>,
              <svg width="40" height="40" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 3v2.5"/><path d="M13 5l2 2"/><path d="M12 9h2.5"/><path d="M14.5 14L22.5 4.5c1-1.3 2.8 0 1.8 1.3L18.5 13.5"/><path d="M19.8 10.2c1.6 1 2 2.8.4 3.8"/><path d="M21.2 12.2c1.6 1 2 2.8.4 3.8"/><path d="M22.2 14.5c2 1.5 1.8 4.5-.2 6.5-2.5 2.5-8 2.5-11 0-2-1.7-2.5-5-1.5-8"/><path d="M9.5 13c-1.5-3-1-4.8.7-4.8s2.8 1.8 4.3 5.3"/><path d="M6 21H5c-1.7 0-3 1.3-3 3v4c0 1.7 1.3 3 3 3h19"/><path d="M28 31h3c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3h-5"/><text x="18" y="28.2" textAnchor="middle" fontSize="7.2" fontWeight="900" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">EASY</text></svg>,
              <svg width="40" height="40" viewBox="0 0 34 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 33h15c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7C5.3 2 4 3.3 4 5v23c0 1.7 1.3 3 3 3"/><path d="M7.5 27V7c0-.8.7-1.5 1.5-1.5h16"/><path d="M27.5 9.5v17.5c0 .8-.7 1.5-1.5 1.5H8"/><circle cx="17.5" cy="11.5" r="5.2" strokeWidth="2.4"/><path d="M15.7 9.8v1.4" strokeWidth="2.4"/><path d="M19.3 9.8v1.4" strokeWidth="2.4"/><path d="M15 13a2.5 2.5 0 0 0 5 0" strokeWidth="2.2"/><path d="M15.8 16.5v5.5" strokeWidth="2.4"/><path d="M15.8 16.5c0-1.2 1.8-1.2 1.8 0v3" strokeWidth="2.4"/><path d="M17.6 19.5c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M20.2 21.4c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M22.8 23.3c1.2-.8 2.6.2 2.6 1.7v9" strokeWidth="2.4"/><path d="M15.8 22c-1.5-1.5-3.5-1-4.2.8-.7 1.8 1 3.5 2.7 4.7l1.5 1V34" strokeWidth="2.4"/><path d="M15.8 34h9.6" strokeWidth="2.4"/></svg>,
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>,
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 8.5a10 10 0 0 1 12.3 2.1"/><path d="M5 12a10 10 0 0 1-1.3-1.6"/><path d="M12.5 12.5a5 5 0 0 1 5.3 1.1"/><path d="M9 16a5 5 0 0 1-1.3-1.3"/><circle cx="12" cy="20" r="1"/></svg>,
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8l-3 3 3 3"/><path d="M17 8l3 3-3 3"/><line x1="14" y1="7" x2="10" y2="15"/><circle cx="18" cy="18" r="3"/><path d="M18 14v1M18 21v1M14 18h1M21 18h1M15.5 15.5l.5.5M20 20l.5.5M20 15.5l-.5.5M15.5 20.5l.5-.5"/></svg>
            ].map((icon, idx) => (
              <article key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ flexShrink: 0, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc', borderRadius: '12px', color: '#222' }}>
                  {icon}
                </div>
                {renderReasonContent(dict.informationalContent?.reelsWhyUseReasons?.[idx])}
              </article>
            ))
          ) : (
            [
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h5"/><path d="M1 13h5.5"/><path d="M2 17h5"/><circle cx="14.5" cy="13" r="7"/><path d="M13 3.5h3"/><path d="M14.5 3.5v2.5"/><path d="M9.8 7.2l-1.5-1.5"/><path d="M19.2 7.2l1.5-1.5"/><polyline points="14.5 9 14.5 13 17 15.5"/></svg>,
              <svg width="40" height="40" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 3v2.5"/><path d="M13 5l2 2"/><path d="M12 9h2.5"/><path d="M14.5 14L22.5 4.5c1-1.3 2.8 0 1.8 1.3L18.5 13.5"/><path d="M19.8 10.2c1.6 1 2 2.8.4 3.8"/><path d="M21.2 12.2c1.6 1 2 2.8.4 3.8"/><path d="M22.2 14.5c2 1.5 1.8 4.5-.2 6.5-2.5 2.5-8 2.5-11 0-2-1.7-2.5-5-1.5-8"/><path d="M9.5 13c-1.5-3-1-4.8.7-4.8s2.8 1.8 4.3 5.3"/><path d="M6 21H5c-1.7 0-3 1.3-3 3v4c0 1.7 1.3 3 3 3h19"/><path d="M28 31h3c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3h-5"/><text x="18" y="28.2" textAnchor="middle" fontSize="7.2" fontWeight="900" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">EASY</text></svg>,
              <svg width="40" height="40" viewBox="0 0 34 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 33h15c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7C5.3 2 4 3.3 4 5v23c0 1.7 1.3 3 3 3"/><path d="M7.5 27V7c0-.8.7-1.5 1.5-1.5h16"/><path d="M27.5 9.5v17.5c0 .8-.7 1.5-1.5 1.5H8"/><circle cx="17.5" cy="11.5" r="5.2" strokeWidth="2.4"/><path d="M15.7 9.8v1.4" strokeWidth="2.4"/><path d="M19.3 9.8v1.4" strokeWidth="2.4"/><path d="M15 13a2.5 2.5 0 0 0 5 0" strokeWidth="2.2"/><path d="M15.8 16.5v5.5" strokeWidth="2.4"/><path d="M15.8 16.5c0-1.2 1.8-1.2 1.8 0v3" strokeWidth="2.4"/><path d="M17.6 19.5c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M20.2 21.4c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M22.8 23.3c1.2-.8 2.6.2 2.6 1.7v9" strokeWidth="2.4"/><path d="M15.8 22c-1.5-1.5-3.5-1-4.2.8-.7 1.8 1 3.5 2.7 4.7l1.5 1V34" strokeWidth="2.4"/><path d="M15.8 34h9.6" strokeWidth="2.4"/></svg>,
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 8.5a10 10 0 0 1 12.3 2.1"/><path d="M5 12a10 10 0 0 1-1.3-1.6"/><path d="M12.5 12.5a5 5 0 0 1 5.3 1.1"/><path d="M9 16a5 5 0 0 1-1.3-1.3"/><circle cx="12" cy="20" r="1"/></svg>,
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8l-3 3 3 3"/><path d="M17 8l3 3-3 3"/><line x1="14" y1="7" x2="10" y2="15"/><circle cx="18" cy="18" r="3"/><path d="M18 14v1M18 21v1M14 18h1M21 18h1M15.5 15.5l.5.5M20 20l.5.5M20 15.5l-.5.5M15.5 20.5l.5-.5"/></svg>
            ].map((icon, idx) => (
              <article key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ flexShrink: 0, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc', borderRadius: '12px', color: '#222' }}>
                  {icon}
                </div>
                {renderReasonContent(
                  activeTab === 'photo'
                    ? dict.informationalContent?.photoWhyUseReasons?.[idx]
                    : activeTab === 'profile'
                    ? dict.informationalContent?.profileWhyUseReasons?.[idx]
                    : activeTab === 'story'
                    ? dict.informationalContent?.storyWhyUseReasons?.[idx]
                    : dict.informationalContent?.whyUseReasons?.[idx]
                )}
              </article>
            ))
          )}
        </div>
      </section>


      <section className="container" style={{ padding: '3.5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: 'bold', margin: '0 0 2.5rem', textAlign: 'center', color: '#333' }}>
          {activeTab === 'reel' 
            ? (dict.informationalContent?.reelsFeaturesTitle || "Features of InstaDown Instagram Reels Downloader")
            : (dict.informationalContent?.featuresTitle || "Features of InstaDown")}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {(activeTab === 'reel' ? [
            {
              title: dict.informationalContent?.reelsFeaturesList?.[0]?.title || dict.tabs?.video || "Video",
              desc: dict.informationalContent?.reelsFeaturesList?.[0]?.desc || "Our Instagram video downloader helps you save videos using their links (URLs). Simply copy the video link, paste it into InstaDown, and use the available download option to save the content to your device.",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
              bg: "linear-gradient(135deg, #a855f7, #7e22ce)",
              color: "#7e22ce"
            },
            {
              title: dict.informationalContent?.reelsFeaturesList?.[1]?.title || dict.tabs?.photo || "Photos",
              desc: dict.informationalContent?.reelsFeaturesList?.[1]?.desc || "Save supported Instagram photos using their public post URLs. Instadown offers a simple way to process photo links and download available image content without the need for additional software or complex steps.",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
              bg: "linear-gradient(135deg, #4ade80, #16a34a)",
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
              title: dict.tabs?.reel || "Reels",
              desc: dict.informationalContent?.featuresList?.[0]?.desc || "Save Instagram reels in HD quality to your device.",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>,
              bg: "linear-gradient(135deg, #f472b6, #db2777)",
              color: "#db2777"
            },
            {
              title: dict.informationalContent?.featuresList?.[1]?.title || dict.tabs?.photo || "Photo",
              desc: dict.informationalContent?.featuresList?.[1]?.desc || "Download Instagram photos in original quality.",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
              bg: "linear-gradient(135deg, #4ade80, #16a34a)",
              color: "#16a34a"
            },
            {
              title: dict.informationalContent?.featuresList?.[2]?.title || dict.tabs?.profile || "Profile",
              desc: dict.informationalContent?.featuresList?.[2]?.desc || "Download profile pictures in full size instantly.",
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
              bg: "linear-gradient(135deg, #60a5fa, #2563eb)",
              color: "#2563eb"
            }
          ]).map((card, idx) => (
            <article key={idx} style={{ 
              backgroundColor: '#fff', 
              padding: '1.5rem', 
              borderRadius: '16px', 
              border: '1px solid #eaeaea', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              textAlign: 'center',
              gap: '1rem',
              height: '100%'
            }}>
              <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.icon}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: card.color, textAlign: 'center' }}>{card.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FAQ items={activeTab === 'profile' ? dict.informationalContent?.profileFaqs : activeTab === 'photo' ? dict.informationalContent?.photoFaqs : activeTab === 'reel' ? dict.informationalContent?.reelsFaqs : dict.informationalContent?.videoFaqs} />
        </>
      )}

      {activeTab === 'photo' && dict.informationalContent?.photoInfoTitle && (
        <section className="container" style={{ padding: '3.5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
            {dict.informationalContent.photoInfoTitle}
          </h1>
          <div style={{ color: '#555', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'justify', maxWidth: '800px', margin: '0 auto' }}>
            {dict.informationalContent.photoInfoParagraphs?.map((paragraph: string, index: number) => (
              <p key={index} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>
          
          {dict.informationalContent?.photoHowItWorksTitle && dict.informationalContent?.photoHowItWorksList && (
            <div style={{ marginTop: '4rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontWeight: 'bold', color: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                   
                  {dict.informationalContent.photoHowItWorksTitle}
                  
                </h2>
                <p style={{ color: '#64748b', marginTop: '0.5rem', maxWidth: '800px', margin: '0.5rem auto 0' }}>
                  Download in just 3 simple steps
                </p>
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
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '84px', height: '84px', borderRadius: '50%', backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {icons[idx]}
                        </div>
                        <div style={{ position: 'absolute', top: '0', left: '0', width: '28px', height: '28px', borderRadius: '50%', background: c.grad, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', border: '3px solid white' }}>
                          {idx + 1}
                        </div>
                      </div>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {dict.informationalContent?.photoWhyUseTitle && dict.informationalContent?.photoWhyUseReasons && (
            <div style={{ marginTop: '5rem' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
                {dict.informationalContent.photoWhyUseTitle}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                {[
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h5"/><path d="M1 13h5.5"/><path d="M2 17h5"/><circle cx="14.5" cy="13" r="7"/><path d="M13 3.5h3"/><path d="M14.5 3.5v2.5"/><path d="M9.8 7.2l-1.5-1.5"/><path d="M19.2 7.2l1.5-1.5"/><polyline points="14.5 9 14.5 13 17 15.5"/></svg>,
                  <svg width="40" height="40" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 3v2.5"/><path d="M13 5l2 2"/><path d="M12 9h2.5"/><path d="M14.5 14L22.5 4.5c1-1.3 2.8 0 1.8 1.3L18.5 13.5"/><path d="M19.8 10.2c1.6 1 2 2.8.4 3.8"/><path d="M21.2 12.2c1.6 1 2 2.8.4 3.8"/><path d="M22.2 14.5c2 1.5 1.8 4.5-.2 6.5-2.5 2.5-8 2.5-11 0-2-1.7-2.5-5-1.5-8"/><path d="M9.5 13c-1.5-3-1-4.8.7-4.8s2.8 1.8 4.3 5.3"/><path d="M6 21H5c-1.7 0-3 1.3-3 3v4c0 1.7 1.3 3 3 3h19"/><path d="M28 31h3c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3h-5"/><text x="18" y="28.2" textAnchor="middle" fontSize="7.2" fontWeight="900" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">EASY</text></svg>,
                  <svg width="40" height="40" viewBox="0 0 34 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 33h15c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7C5.3 2 4 3.3 4 5v23c0 1.7 1.3 3 3 3"/><path d="M7.5 27V7c0-.8.7-1.5 1.5-1.5h16"/><path d="M27.5 9.5v17.5c0 .8-.7 1.5-1.5 1.5H8"/><circle cx="17.5" cy="11.5" r="5.2" strokeWidth="2.4"/><path d="M15.7 9.8v1.4" strokeWidth="2.4"/><path d="M19.3 9.8v1.4" strokeWidth="2.4"/><path d="M15 13a2.5 2.5 0 0 0 5 0" strokeWidth="2.2"/><path d="M15.8 16.5v5.5" strokeWidth="2.4"/><path d="M15.8 16.5c0-1.2 1.8-1.2 1.8 0v3" strokeWidth="2.4"/><path d="M17.6 19.5c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M20.2 21.4c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M22.8 23.3c1.2-.8 2.6.2 2.6 1.7v9" strokeWidth="2.4"/><path d="M15.8 22c-1.5-1.5-3-1-4.2.8-.7 1.8 1 3.5 2.7 4.7l1.5 1V34" strokeWidth="2.4"/><path d="M15.8 34h9.6" strokeWidth="2.4"/></svg>,
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>,
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 8.5a10 10 0 0 1 12.3 2.1"/><path d="M5 12a10 10 0 0 1-1.3-1.6"/><path d="M12.5 12.5a5 5 0 0 1 5.3 1.1"/><path d="M9 16a5 5 0 0 1-1.3-1.3"/><circle cx="12" cy="20" r="1"/></svg>,
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8l-3 3 3 3"/><path d="M17 8l3 3-3 3"/><line x1="14" y1="7" x2="10" y2="15"/><circle cx="18" cy="18" r="3"/><path d="M18 14v1M18 21v1M14 18h1M21 18h1M15.5 15.5l.5.5M20 20l.5.5M20 15.5l-.5.5M15.5 20.5l.5-.5"/></svg>
                ].map((icon, idx) => (
                  <article key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ flexShrink: 0, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc', borderRadius: '12px', color: '#222' }}>
                      {icon}
                    </div>
                    {renderReasonContent(dict.informationalContent?.photoWhyUseReasons?.[idx])}


                  </article>
                ))}
              </div>
            </div>
          )}

          {dict.informationalContent?.photoFeaturesTitle && dict.informationalContent?.photoFeaturesList && (
            <div style={{ marginTop: '5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
                {dict.informationalContent.photoFeaturesTitle}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {[
                  {
                    title: dict.informationalContent.photoFeaturesList[0]?.title || dict.tabs?.video || "Video",
                    desc: dict.informationalContent.photoFeaturesList[0]?.desc,
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
                    bg: "linear-gradient(135deg, #a855f7, #7e22ce)",
                    color: "#7e22ce"
                  },
                  {
                    title: dict.informationalContent.photoFeaturesList[1]?.title || dict.tabs?.reel || "Reels",
                    desc: dict.informationalContent.photoFeaturesList[1]?.desc,
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>,
                    bg: "linear-gradient(135deg, #f472b6, #db2777)",
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
                  <article key={idx} style={{ 
                    backgroundColor: '#fff', 
                    padding: '1.5rem', 
                    borderRadius: '16px', 
                    border: '1px solid #eaeaea', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    textAlign: 'center',
                    gap: '1rem',
                    height: '100%'
                  }}>
                    <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {card.icon}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: card.color, textAlign: 'center' }}>{card.title}</h3>
                      <p style={{ color: '#64748b', lineHeight: '1.5', margin: 0, textAlign: 'center' }}>
                        {card.desc}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <FAQ items={activeTab === 'profile' ? dict.informationalContent?.profileFaqs : activeTab === 'photo' ? dict.informationalContent?.photoFaqs : activeTab === 'reel' ? dict.informationalContent?.reelsFaqs : dict.informationalContent?.videoFaqs} />
        </section>
      )}


      {activeTab === 'profile' && dict.informationalContent?.profileInfoTitle && (
        <section className="container" style={{ padding: '3.5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
            {dict.informationalContent.profileInfoTitle}
          </h1>
          <div style={{ color: '#555', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'justify', maxWidth: '800px', margin: '0 auto' }}>
            {dict.informationalContent.profileInfoParagraphs?.map((paragraph: string, index: number) => (
              <p key={index} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {dict.informationalContent?.profileHowItWorksTitle && dict.informationalContent?.profileHowItWorksList && (
            <div style={{ marginTop: '4rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontWeight: 'bold', color: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                   
                  {dict.informationalContent.profileHowItWorksTitle}
                  
                </h2>
                <p style={{ color: '#64748b', marginTop: '0.5rem', maxWidth: '800px', margin: '0.5rem auto 0' }}>
                  Download in just 3 simple steps
                </p>
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
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{ width: '84px', height: '84px', borderRadius: '50%', backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {icons[idx]}
                        </div>
                        <div style={{ position: 'absolute', top: '0', left: '0', width: '28px', height: '28px', borderRadius: '50%', background: c.grad, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', border: '3px solid white' }}>
                          {idx + 1}
                        </div>
                      </div>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {dict.informationalContent?.profileWhyUseTitle && dict.informationalContent?.profileWhyUseReasons && (
            <div style={{ marginTop: '5rem' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
                {dict.informationalContent.profileWhyUseTitle}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                {[
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9h5"/><path d="M1 13h5.5"/><path d="M2 17h5"/><circle cx="14.5" cy="13" r="7"/><path d="M13 3.5h3"/><path d="M14.5 3.5v2.5"/><path d="M9.8 7.2l-1.5-1.5"/><path d="M19.2 7.2l1.5-1.5"/><polyline points="14.5 9 14.5 13 17 15.5"/></svg>,
                  <svg width="40" height="40" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 3v2.5"/><path d="M13 5l2 2"/><path d="M12 9h2.5"/><path d="M14.5 14L22.5 4.5c1-1.3 2.8 0 1.8 1.3L18.5 13.5"/><path d="M19.8 10.2c1.6 1 2 2.8.4 3.8"/><path d="M21.2 12.2c1.6 1 2 2.8.4 3.8"/><path d="M22.2 14.5c2 1.5 1.8 4.5-.2 6.5-2.5 2.5-8 2.5-11 0-2-1.7-2.5-5-1.5-8"/><path d="M9.5 13c-1.5-3-1-4.8.7-4.8s2.8 1.8 4.3 5.3"/><path d="M6 21H5c-1.7 0-3 1.3-3 3v4c0 1.7 1.3 3 3 3h19"/><path d="M28 31h3c1.7 0 3-1.3 3-3v-4c0-1.7-1.3-3-3-3h-5"/><text x="18" y="28.2" textAnchor="middle" fontSize="7.2" fontWeight="900" fill="currentColor" stroke="none" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">EASY</text></svg>,
                  <svg width="40" height="40" viewBox="0 0 34 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 33h15c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7C5.3 2 4 3.3 4 5v23c0 1.7 1.3 3 3 3"/><path d="M7.5 27V7c0-.8.7-1.5 1.5-1.5h16"/><path d="M27.5 9.5v17.5c0 .8-.7 1.5-1.5 1.5H8"/><circle cx="17.5" cy="11.5" r="5.2" strokeWidth="2.4"/><path d="M15.7 9.8v1.4" strokeWidth="2.4"/><path d="M19.3 9.8v1.4" strokeWidth="2.4"/><path d="M15 13a2.5 2.5 0 0 0 5 0" strokeWidth="2.2"/><path d="M15.8 16.5v5.5" strokeWidth="2.4"/><path d="M15.8 16.5c0-1.2 1.8-1.2 1.8 0v3" strokeWidth="2.4"/><path d="M17.6 19.5c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M20.2 21.4c1.2-.8 2.6 0 2.6 1.4v.5" strokeWidth="2.4"/><path d="M22.8 23.3c1.2-.8 2.6.2 2.6 1.7v9" strokeWidth="2.4"/><path d="M15.8 22c-1.5-1.5-3-1-4.2.8-.7 1.8 1 3.5 2.7 4.7l1.5 1V34" strokeWidth="2.4"/><path d="M15.8 34h9.6" strokeWidth="2.4"/></svg>,
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 8.5a10 10 0 0 1 12.3 2.1"/><path d="M5 12a10 10 0 0 1-1.3-1.6"/><path d="M12.5 12.5a5 5 0 0 1 5.3 1.1"/><path d="M9 16a5 5 0 0 1-1.3-1.3"/><circle cx="12" cy="20" r="1"/></svg>,
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8l-3 3 3 3"/><path d="M17 8l3 3-3 3"/><line x1="14" y1="7" x2="10" y2="15"/><circle cx="18" cy="18" r="3"/><path d="M18 14v1M18 21v1M14 18h1M21 18h1M15.5 15.5l.5.5M20 20l.5.5M20 15.5l-.5.5M15.5 20.5l.5-.5"/></svg>
                ].map((icon, idx) => (
                  <article key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ flexShrink: 0, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fcfcfc', borderRadius: '12px', color: '#222' }}>
                      {icon}
                    </div>
                    {renderReasonContent(dict.informationalContent?.profileWhyUseReasons?.[idx])}


                  </article>
                ))}
              </div>
            </div>
          )}

          {dict.informationalContent?.profileFeaturesTitle && dict.informationalContent?.profileFeaturesList && (
            <div style={{ marginTop: '5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#333' }}>
                {dict.informationalContent.profileFeaturesTitle}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {[
                  {
                    title: dict.informationalContent.profileFeaturesList[0]?.title || dict.tabs?.video || "Video",
                    desc: dict.informationalContent.profileFeaturesList[0]?.desc,
                    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
                    bg: "linear-gradient(135deg, #a855f7, #7e22ce)",
                    color: "#7e22ce"
                  },
                  {
                    title: dict.informationalContent.profileFeaturesList[1]?.title || dict.tabs?.reel || "Reels",
                    desc: dict.informationalContent.profileFeaturesList[1]?.desc,
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>,
                    bg: "linear-gradient(135deg, #f472b6, #db2777)",
                    color: "#db2777"
                  },
                  {
                    title: dict.informationalContent.profileFeaturesList[2]?.title || dict.tabs?.photo || "Photo",
                    desc: dict.informationalContent.profileFeaturesList[2]?.desc,
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
                    bg: "linear-gradient(135deg, #4ade80, #16a34a)",
                    color: "#16a34a"
                  }
                ].map((card, idx) => (
                  <article key={idx} style={{ 
                    backgroundColor: '#fff', 
                    padding: '1.5rem', 
                    borderRadius: '16px', 
                    border: '1px solid #eaeaea', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    textAlign: 'center',
                    gap: '1rem',
                    height: '100%'
                  }}>
                    <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {card.icon}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: card.color, textAlign: 'center' }}>{card.title}</h3>
                      <p style={{ color: '#64748b', lineHeight: '1.5', margin: 0, textAlign: 'center' }}>
                        {card.desc}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <FAQ items={activeTab === 'profile' ? dict.informationalContent?.profileFaqs : activeTab === 'photo' ? dict.informationalContent?.photoFaqs : activeTab === 'reel' ? dict.informationalContent?.reelsFaqs : dict.informationalContent?.videoFaqs} />
        </section>
      )}

      {result && (
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <div className="result-section" style={{ marginTop: '10px' }}>
            <ResultCard data={result} onRetry={() => setResult(null)} />
          </div>
        </div>
      )}
    </>
  );
}
