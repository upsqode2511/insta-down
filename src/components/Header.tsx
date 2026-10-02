'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

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
          <a href={`${prefix}/`} className="logo-container" aria-label="InstaDown">
            <Logo size={38} />
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
