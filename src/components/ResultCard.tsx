'use client';
import React, { useState } from 'react';

type MediaItem = {
  type: string;
  download_url: string;
  thumb?: string;
};

type ResultCardProps = {
  data: {
    error: boolean;
    hosting?: string;
    shortcode?: string | null;
    caption?: string;
    audio?: string | null;
    type?: string;
    download_url?: string;
    thumb?: string;
    medias?: MediaItem[];
    message?: string;
  };
  onRetry?: () => void;
};

export default function ResultCard({ data, onRetry }: ResultCardProps) {
  if (data.error || (!data.type && !data.medias)) {
    return (
      <div className="error-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ backgroundColor: '#fee2e2', borderRadius: '50%', padding: '1rem', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600, fontSize: '1.2rem', color: '#1f2937', margin: 0 }}>Failed to fetch details</p>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: '0.4rem 0 0 0' }}>{data.message || 'Please check the URL and try again.'}</p>
        </div>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn-primary"
            style={{ width: 'auto', padding: '0.6rem 2rem', marginTop: '0.5rem' }}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  // Handle album type (multiple medias)
  if (data.type === 'album' && data.medias && data.medias.length > 0) {
    return (
      <div className="result-container">
        <AlbumCard medias={data.medias} caption={data.caption} />
      </div>
    );
  }

  // Handle single media type
  return (
    <div className="result-container">
      <MediaCard 
        type={data.type || 'image'}
        downloadUrl={data.download_url!}
        thumbUrl={data.thumb}
        caption={data.caption}
      />
    </div>
  );
}

function DownloadButton({ downloadUrl, type }: { downloadUrl: string; type: string }) {
  const [loading, setLoading] = useState(false);

  const ext = type === 'video' ? 'mp4' : 'jpg';
  const filename = `instagram_${type}_${Date.now()}.${ext}`;
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(downloadUrl)}`;

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(proxyUrl);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      console.warn('Blob fetch failed, falling back to direct location:', err);
      // Fallback: Trigger direct navigation to proxy URL which serves Content-Disposition attachment
      window.location.href = proxyUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <a
      href={proxyUrl}
      target="_blank"
      rel="noopener noreferrer"
      download={filename}
      onClick={handleDownload}
      className="btn-primary"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.8 : 1,
      }}
    >
      {loading ? (
        <>
          <svg style={{ animation: 'spin 1s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75" />
          </svg>
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download</span>
        </>
      )}
    </a>
  );
}

function AlbumCard({ medias, caption }: { medias: MediaItem[], caption?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? medias.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === medias.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = medias[currentIndex];

  return (
    <div className="result-card">
      <div className="media-container album-container" style={{ position: 'relative' }}>
        {currentMedia.type === 'video' ? (
          <video 
            key={currentMedia.download_url} 
            src={currentMedia.download_url} 
            poster={currentMedia.thumb}
            controls 
            className="media-preview"
          />
        ) : (
          <img 
            key={currentMedia.download_url} 
            src={currentMedia.thumb || currentMedia.download_url} 
            alt={`Instagram Media ${currentIndex + 1}`} 
            className="media-preview"
          />
        )}
        
        {/* Navigation Arrows */}
        {medias.length > 1 && (
          <>
            <button className="nav-arrow prev-arrow" onClick={handlePrev} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="nav-arrow next-arrow" onClick={handleNext} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            
            {/* Counter */}
            <div className="album-counter">
              {currentIndex + 1} / {medias.length}
            </div>
          </>
        )}
      </div>
      
      {caption && (
        <div className="caption-container">
          <p className="caption-text">{caption}</p>
        </div>
      )}
      
      <div className="download-action">
        <DownloadButton downloadUrl={currentMedia.download_url} type={currentMedia.type || 'image'} />
      </div>
    </div>
  );
}

function MediaCard({ type, downloadUrl, thumbUrl, caption }: { type: string, downloadUrl: string, thumbUrl?: string, caption?: string }) {
  return (
    <div className="result-card">
      <div className="media-container">
        {type === 'video' ? (
          <video 
            src={downloadUrl} 
            poster={thumbUrl}
            controls 
            className="media-preview"
          />
        ) : (
          <img 
            src={thumbUrl || downloadUrl} 
            alt="Instagram Media" 
            className="media-preview"
          />
        )}
      </div>
      
      {caption && (
        <div className="caption-container">
          <p className="caption-text">{caption}</p>
        </div>
      )}
      
      <div className="download-action">
        <DownloadButton downloadUrl={downloadUrl} type={type} />
      </div>
    </div>
  );
}

