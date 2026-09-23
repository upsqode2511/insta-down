import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('URL is required', { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Referer': 'https://www.instagram.com/',
      },
    });
    
    if (!response.ok) {
      return new NextResponse(`Failed to fetch media: ${response.statusText}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    let extension = 'bin';
    if (contentType.includes('video') || url.includes('.mp4')) {
      extension = 'mp4';
    } else if (contentType.includes('image') || url.includes('.jpg') || url.includes('.jpeg')) {
      extension = 'jpg';
    } else if (url.includes('.webp')) {
      extension = 'webp';
    }

    const filename = `instagram_media_${Date.now()}.${extension}`;

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Proxy download error:', error);
    return new NextResponse('Error downloading media', { status: 500 });
  }
}
