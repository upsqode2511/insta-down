import type { MetadataRoute } from 'next'
import { locales } from '@/proxy'

interface RouteConfig {
  slug: string
  priority: number
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

const routes: RouteConfig[] = [
  { slug: '', priority: 1.0, changeFrequency: 'daily' },
  { slug: 'instagram-reels-downloader', priority: 0.9, changeFrequency: 'daily' },
  { slug: 'instagram-photo-downloader', priority: 0.9, changeFrequency: 'daily' },
  { slug: 'instagram-story-downloader', priority: 0.9, changeFrequency: 'daily' },
  { slug: 'instagram-profile-downloader', priority: 0.9, changeFrequency: 'daily' },
  { slug: 'about-us', priority: 0.5, changeFrequency: 'monthly' },
  { slug: 'contact-us', priority: 0.5, changeFrequency: 'monthly' },
  { slug: 'privacy-policy', priority: 0.3, changeFrequency: 'monthly' },
  { slug: 'terms-of-service', priority: 0.3, changeFrequency: 'monthly' },
]

function getLocalizedUrl(baseUrl: string, locale: string, slug: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '')
  const localeSegment = locale === 'en' ? '' : `/${locale}`
  const slugSegment = slug ? `/${slug}` : ''
  return `${cleanBase}${localeSegment}${slugSegment}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://instadownload.example.com'
  const currentDate = new Date()

  const entries: MetadataRoute.Sitemap = []

  // Add all routes across all supported languages
  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: getLocalizedUrl(baseUrl, locale, route.slug),
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: locale === 'en' ? route.priority : Number((route.priority * 0.95).toFixed(2)),
      })
    }
  }

  return entries
}

