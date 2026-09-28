import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/dictionaries";
import HeaderTabs from "@/components/HeaderTabs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Insta Download - Fast & Free Media Downloader",
    template: "%s | Insta Download"
  },
  description: "Download photos, videos, and reels quickly and safely with Insta Download.",
  keywords: ["instagram downloader", "insta download", "reels downloader", "instagram video download", "free downloader"],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Insta Download - Fast & Free Media Downloader",
    description: "Download photos, videos, and reels quickly and safely with Insta Download.",
    url: 'https://instadownload.example.com',
    siteName: 'Insta Download',
    images: [
      {
        url: 'https://instadownload.example.com/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Insta Download - Fast & Free Media Downloader",
    description: "Download photos, videos, and reels quickly and safely with Insta Download.",
    images: ['https://instadownload.example.com/og-image.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const prefix = resolvedParams.lang === 'en' ? '' : `/${resolvedParams.lang}`;
  const dict = getDictionary(resolvedParams.lang);

  return (
    <html
      lang={resolvedParams.lang || "en"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="full-width-header">
          <header className="container">
            <div className="header">
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

              <HeaderTabs dict={dict} prefix={prefix} />

              <div className="header-right">
                <LanguageSwitcher currentLang={resolvedParams.lang} />
              </div>
            </div>
          </header>
        </div>

        {children}



        <footer className="footer" style={{ backgroundColor: '#1a1a1a', color: '#f5f5f5', padding: '2.5rem 1rem 2rem', marginTop: 'auto' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '0.95rem', fontWeight: '500' }}>
            <a href={`${prefix}/about-us/`} className="footer-link">About Us</a>
            <a href={`${prefix}/contact-us/`} className="footer-link">Contact Us</a>
            <a href={`${prefix}/privacy-policy/`} className="footer-link">Privacy Policy</a>
            <a href={`${prefix}/terms-of-service/`} className="footer-link">Terms of Service</a>
          </div>
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
            <p>&copy; {new Date().getFullYear()} InstaDownload. This tool is not affiliated with Instagram.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
