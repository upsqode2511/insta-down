'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ dict, prefix, currentLang }: { dict: any; prefix: string; currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine active tab based on pathname
  let activeTab = 'video';
  if (pathname.includes('photo')) activeTab = 'photo';
  if (pathname.includes('story')) activeTab = 'story';
  if (pathname.includes('reel')) activeTab = 'reel';
  if (pathname.includes('profile')) activeTab = 'profile';

  const navItems = [
    { key: 'video', label: dict.tabs?.video || 'Video', href: `${prefix}/` },
    { key: 'photo', label: dict.tabs?.photo || 'Photo', href: `${prefix}/instagram-photo-downloader/` },
    { key: 'reel', label: dict.tabs?.reel === 'Reel' ? 'Reels' : (dict.tabs?.reel || 'Reels'), href: `${prefix}/instagram-reels-downloader/` },
    { key: 'profile', label: dict.tabs?.profile || 'Profile', href: `${prefix}/instagram-profile-downloader/` },
  ];

  return (
    <div className="full-width-header">
      <header className="container">
        <div className="header">
          {/* Mobile Hamburger Menu Toggle Button */}
          <button 
            type="button"
            className="mobile-menu-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="15" y2="18"></line>
              </svg>
            )}
          </button>

          {/* Logo */}
          <a href={`${prefix}/`} className="logo-container" style={{ gap: '0.5rem' }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="instaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff9800" />
                  <stop offset="50%" stopColor="#e91e63" />
                  <stop offset="100%" stopColor="#9b27b0" />
                </linearGradient>
                <linearGradient id="circleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a00e0" />
                  <stop offset="100%" stopColor="#8e2de2" />
                </linearGradient>
              </defs>
              <rect x="5" y="5" width="90" height="90" rx="25" fill="url(#instaGrad)" />
              <rect x="22" y="22" width="56" height="56" rx="14" fill="none" stroke="white" strokeWidth="8" />
              <circle cx="65" cy="35" r="5" fill="white" />
              <circle cx="50" cy="50" r="18" fill="url(#circleGrad)" />
              <path d="M50 40 V50 M44 44 L50 50 L56 44 M40 54 V58 C40 59.1 40.9 60 42 60 H58 C59.1 60 60 59.1 60 58 V54" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="logo-text" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'initial', fontSize: '1.75rem' }}>
              <span style={{ color: '#0f1419' }}>Insta</span>
              <span style={{ background: 'linear-gradient(90deg, #9b27b0, #e91e63, #ff9800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Down</span>
            </span>
          </a>

          {/* Desktop Navigation Tabs */}
          <div className="type-tabs header-tabs header-tabs-desktop">
            {navItems.map((item, index) => (
              <React.Fragment key={item.key}>
                {index > 0 && <div className="tab-divider"></div>}
                <a href={item.href} className={`type-tab ${activeTab === item.key ? 'active' : ''}`}>
                  {item.key === 'video' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                  )}
                  {item.key === 'photo' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  )}
                  {item.key === 'reel' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                  )}
                  {item.key === 'profile' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  )}
                  <span>{item.label}</span>
                </a>
              </React.Fragment>
            ))}
          </div>

          {/* Right Section: Language Switcher */}
          <div className="header-right">
            <LanguageSwitcher currentLang={currentLang} />
          </div>
        </div>
      </header>

      {/* Mobile Dropdown / Sidebar Menu */}
      {isOpen && (
        <nav className="mobile-menu-dropdown" aria-label="Mobile navigation">
          <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 0' }}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`mobile-menu-item ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
