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
    const errorMessage = data.message || 'Failed to fetch Instagram user info.';

    return (
      <div 
        className="error-card-wrapper"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem 1.25rem 0.75rem 1.25rem',
          width: '100%',
          maxWidth: '820px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="error-box"
          style={{
            backgroundColor: '#fff5f5',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            padding: '3.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <div 
            style={{ 
              fontWeight: '700', 
              fontSize: '1.05rem', 
              color: '#b91c1c', 
              margin: '0 0 1.25rem 0',
              lineHeight: 1.4
            }}
          >
            {errorMessage}
          </div>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="try-again-btn"
              style={{ 
                backgroundColor: '#ffffff', 
                color: '#b91c1c', 
                padding: '0.45rem 1.4rem', 
                borderRadius: '4px', 
                fontWeight: '500', 
                fontSize: '0.9rem',
                border: '1px solid #fca5a5', 
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#fff0f0';
                e.currentTarget.style.borderColor = '#f87171';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#fca5a5';
              }}
            >
              Try again
            </button>
          )}
        </div>
        {onRetry && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '0.4rem' }}>
            <button
              onClick={onRetry}
              className="error-close-btn"
              style={{
                background: 'none',
                border: 'none',
                color: '#8c9bb0',
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0.2rem 0.25rem',
                fontFamily: 'inherit',
                transition: 'color 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#475569';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#8c9bb0';
              }}
            >
              Close
            </button>
          </div>
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

