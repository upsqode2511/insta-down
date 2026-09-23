import fs from 'fs';

const path = 'src/components/Downloader.tsx';
let content = fs.readFileSync(path, 'utf8');

const originalTop = `// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Dictionary } from '@/dictionaries';
import { fetchInstagramData } from '@/actions/download';
import ResultCard from './ResultCard';
import FAQ from './FAQ';

type DownloaderProps = {
  lang: string;
  activeTab: 'video' | 'photo' | 'story' | 'reel' | 'profile';
  title: string;
  subtitle: string;
  dict: Dictionary;
};

export default function Downloader({ lang, activeTab, title, subtitle, dict }: DownloaderProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // If lang is 'en', we don't prefix the URL (except the root which is just '/')
  const prefix = lang === 'en' ? '' : \`/\${lang}\`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await fetchInstagramData(url);
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: true, message: 'Failed to fetch data' });
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <>
      <div className="hero-gradient-wrapper">
        <main className="container hero">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
      
      <div className="download-panel">
        <form className="download-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <input 
              type="url" 
              className="url-input" 
              placeholder={dict.downloader.placeholder} 
              required 
              aria-label="Instagram URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="button" className="paste-btn" onClick={handlePaste}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              {dict.downloader.paste}
            </button>
          </div>
          <button type="submit" className="download-btn" disabled={loading}>
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
            {loading ? 'Processing...' : dict.downloader.download}
          </button>
        </form>
        
        {result && (
          <div style={{ marginTop: '2rem' }}>
            <ResultCard data={result} onRetry={() => setResult(null)} />
          </div>
        )}

        </div>
      </main>
      </div>


      {(activeTab === 'video' || activeTab === 'reel') && (
        <>
          <section className="container" style={{ padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>`;

const splitMarker = "</h2>\n        <div style={{ color: '#555', lineHeight: '1.7', fontSize: '1.05rem'";
const idx = content.indexOf(splitMarker);
if (idx !== -1) {
    // we need to include the </h2> that was part of the original top. Wait, no, the original top ends right before <h2 ...
    // let me modify the original top to include everything up to <section ... >
    const bottomPart = content.substring(idx - 100).match(/<h2 style={{ fontSize: '2rem'[\s\S]*/);
    
    if (bottomPart) {
       const newContent = originalTop + "\n        " + bottomPart[0];
       fs.writeFileSync(path, newContent, 'utf8');
       console.log("Successfully fixed Downloader.tsx");
    } else {
        console.log("Could not find bottom part");
    }
} else {
    console.log("Could not find split marker");
}
