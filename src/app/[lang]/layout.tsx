import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/dictionaries";
import HeaderTabs from "@/components/HeaderTabs";

import Header from "@/components/Header";

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
        <Header dict={dict} prefix={prefix} currentLang={resolvedParams.lang} />

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
