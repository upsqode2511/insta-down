'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'es', label: 'Español' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'fr', label: 'Français' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'pt', label: 'Português' },
  { code: 'pl', label: 'Polski' },
  { code: 'ar', label: 'عربي' },
  { code: 'th', label: 'ไทย' },
  { code: 'hu', label: 'Magyar' },
  { code: 'ms', label: 'Melayu' },
  { code: 'zh', label: '中文' },
  { code: 'ro', label: 'Română' },
  { code: 'ru', label: 'Русский' },
  { code: 'vi', label: 'Tiếng Việt' }
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();
  
  // Clean the current pathname by removing the current language prefix if it exists
  const getPathWithoutLang = () => {
    if (!pathname) return '/';
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && languages.some(l => l.code === segments[0])) {
      return '/' + segments.slice(1).join('/');
    }
    return pathname;
  };

  const basePath = getPathWithoutLang();
  
  const currentLangLabel = languages.find(l => l.code === currentLang)?.label || 'English';

  return (
    <div className="lang-dropdown">
      <button className="lang-selector">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span>{currentLangLabel}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className="lang-menu">
        {languages.map((lang) => {
          // English goes to root paths without /en
          let href = lang.code === 'en' 
            ? basePath === '' ? '/' : basePath
            : `/${lang.code}${basePath === '/' ? '' : basePath}`;
            
          if (!href.endsWith('/')) {
            href += '/';
          }
            
          return (
            <a 
              key={lang.code} 
              href={href}
              className={lang.code === currentLang ? 'active' : ''}
            >
              {lang.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
