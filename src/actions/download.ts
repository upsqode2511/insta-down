'use server';

export async function fetchInstagramData(url: string) {
  if (!url) {
    return { error: true, message: 'URL is required' };
  }

  try {
    const apiKey = process.env.API_KEY || '';
    const apiUrl = `https://saverapi.net/api/all-in-one-downloader-api?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
      // Cache settings if needed
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching Instagram data:', error);
    return { error: true, message: error.message || 'Failed to fetch data' };
  }
}
