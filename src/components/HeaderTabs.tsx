'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function HeaderTabs({ dict, prefix }: { dict: any, prefix: string }) {
  const pathname = usePathname();
  
  // Determine active tab based on pathname
  let activeTab = 'video';
  if (pathname.includes('photo')) activeTab = 'photo';
  if (pathname.includes('story')) activeTab = 'story';
  if (pathname.includes('reel')) activeTab = 'reel';
  if (pathname.includes('profile')) activeTab = 'profile';

  return (
    <div className="type-tabs header-tabs">
      <a href={`${prefix}/`} className={`type-tab ${activeTab === 'video' ? 'active' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        {dict.tabs?.video || 'Video'}
      </a>
      <div className="tab-divider"></div>
      <a href={`${prefix}/instagram-photo-downloader/`} className={`type-tab ${activeTab === 'photo' ? 'active' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        {dict.tabs?.photo || 'Photo'}
      </a>

      <div className="tab-divider"></div>
      <a href={`${prefix}/instagram-reels-downloader/`} className={`type-tab ${activeTab === 'reel' ? 'active' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
        {dict.tabs?.reel || 'Reel'}
      </a>
      <div className="tab-divider"></div>
      <a href={`${prefix}/instagram-profile-downloader/`} className={`type-tab ${activeTab === 'profile' ? 'active' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        {dict.tabs?.profile || 'Profile'}
      </a>
    </div>
  );
}
