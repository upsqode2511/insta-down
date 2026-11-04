import type { Metadata } from "next";
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/dictionaries";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Insta Download - Fast & Free Media Downloader",
    template: "%s | Insta Download"
  },
  description: "Download photos, videos, and reels quickly and safely with Insta Download.",
  keywords: ["instagram downloader", "insta download", "reels downloader", "instagram video download", "free downloader"],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
  other: {
    'itemprop:name': "Insta Download - Fast & Free Media Downloader",
    'itemprop:description': "Download photos, videos, and reels quickly and safely with Insta Download.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
      className="h-full antialiased"
    >
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header dict={dict} prefix={prefix} currentLang={resolvedParams.lang} />

        {children}



        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href={`${prefix}/about-us/`} className="footer-link">About Us</a>
              <a href={`${prefix}/contact-us/`} className="footer-link">Contact Us</a>
              <a href={`${prefix}/privacy-policy/`} className="footer-link">Privacy Policy</a>
              <a href={`${prefix}/terms-of-service/`} className="footer-link">Terms of Service</a>
            </nav>
            <div className="footer-copyright">
              <p style={{ marginBottom: '0.35rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                We are not affiliated with Instagram or Meta.
              </p>
              <p style={{ margin: 0 }}>&copy; 2026 InstaDown to All rights Reserved</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
