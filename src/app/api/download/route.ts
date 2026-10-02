import { NextResponse } from 'next/server';

function cleanInstagramUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const match = rawUrl.match(/https?:\/\/(?:www\.)?instagram\.com\/(?:share\/)?(p|reel|reels|tv|stories)\/([a-zA-Z0-9_\-]+)/i);
  if (match) {
    const mediaType = match[1].toLowerCase() === 'reels' ? 'reel' : match[1].toLowerCase();
    const mediaId = match[2];
    return `https://www.instagram.com/${mediaType}/${mediaId}/`;
  }
  return rawUrl.trim();
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: true, message: 'URL is required' }, { status: 400 });
    }

    const targetUrl = cleanInstagramUrl(url);

    const apiKey = process.env.API_KEY || '';
    const apiUrl = `https://saverapi.net/api/all-in-one-downloader-api?url=${encodeURIComponent(targetUrl)}`;

    let response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: true, message: `API responded with status: ${response.status}` }, { status: response.status });
    }

    let data = await response.json();

    // Auto-retry if hit SaverAPI 1-second rate limit
    if (data.message && typeof data.message === 'string' && data.message.toLowerCase().includes('rate limit')) {
      await new Promise((r) => setTimeout(r, 1100));
      response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'x-api-key': apiKey },
        cache: 'no-store'
      });
      if (response.ok) {
        data = await response.json();
      }
    }

    // Standardize error flag if media was not retrieved
    if (!data.type && !data.medias && !data.error) {
      data.error = true;
      if (!data.message) {
        data.message = 'Media not found or unable to download';
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching Instagram data:', error);
    return NextResponse.json({ error: true, message: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}

