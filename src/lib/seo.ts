import { Metadata } from "next";
import { getDictionary } from "@/dictionaries";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://instadownload.example.com";
const locales = ['en', 'id', 'de', 'it', 'ja', 'es', 'hi', 'fr', 'tr', 'pt', 'pl', 'ar', 'th', 'hu', 'ms', 'zh', 'ro', 'ru', 'vi'];

export function getSEOMetadata(lang: string, pageType: 'video' | 'photo' | 'story' | 'reel' | 'profile'): Metadata {
  const dict = getDictionary(lang);
  
  // Define slug based on page type
  let slug = "";
  let title = "";
  let description = "";
  
  switch (pageType) {
    case 'video':
      slug = "";
      title = dict.pages.videoTitle;
      description = dict.pages.videoSubtitle;
      break;
    case 'photo':
      slug = "instagram-photo-downloader";
      title = lang === 'en' ? "Instagram Photo Downloader Save photos in HD Free - Instadown" : dict.pages.photoTitle;
      description = lang === 'en' ? "Download Instagram photos directly to your device fast, free and without watermarks in 100% original quality using our Instagram Photo Downloader tool at Instadown." : dict.pages.photoSubtitle;
      break;
    case 'story':
      slug = "instagram-story-downloader";
      title = dict.pages.storyTitle;
      description = dict.pages.storySubtitle;
      break;
    case 'reel':
      slug = "instagram-reels-downloader";
      title = lang === 'en' ? "Instagram Reels Downloader" : dict.pages.reelsTitle;
      description = lang === 'en' ? "InstaDown is the ultimate Instagram Reels Downloader allowing you to download Instagram Reels without a watermark quickly and easily." : dict.pages.reelsSubtitle;
      break;
    case 'profile':
      slug = "instagram-profile-downloader";
      title = lang === 'en' ? "Instagram Profile Picture Downloader in HD - Instadown" : dict.pages.profileTitle;
      description = lang === 'en' ? "Download Instagram profile pictures using a free and fast online web-based tool. 'Insta Profile Viewer' is a 100% free and the best Instagram profile downloader." : dict.pages.profileSubtitle;
      break;
  }
  
  const getUrl = (locale: string) => {
    const localePath = locale === 'en' ? '' : `/${locale}`;
    const slugPath = slug ? `/${slug}` : '';
    return `${baseUrl}${localePath}${slugPath}`;
  };

  // Build alternates for all locales
  const alternates: Record<string, string> = {};
  locales.forEach((l) => {
    alternates[l] = getUrl(l);
  });

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: getUrl(lang),
      languages: {
        ...alternates,
        'x-default': getUrl('en'),
      }
    }
  };
}
