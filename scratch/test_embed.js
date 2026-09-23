const fs = require('fs');

async function testEmbed(shortcode) {
  const url = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
  console.log('Fetching:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    const html = await res.text();
    fs.writeFileSync('embed_output.html', html);
    console.log('Saved embed_output.html, len:', html.length);
    
    // Look for video or photo URL in embed HTML
    let videoUrl = null;
    let photoUrl = null;
    let caption = null;

    const videoMatch = html.match(/video_url["']:\s*["']([^"']+)["']/i) || html.match(/<video[^>]*src=["']([^"']+)["']/i);
    if (videoMatch) {
      videoUrl = videoMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
    }

    const photoMatch = html.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/i) || html.match(/<img[^>]*class="EmbeddedMediaImage"[^>]*src="([^"]+)"/i);
    if (photoMatch) {
      photoUrl = photoMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
    }

    const captionMatch = html.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/i);
    if (captionMatch) {
      caption = captionMatch[1].replace(/<[^>]+>/g, '').trim();
    }

    console.log('FOUND VIDEO:', videoUrl);
    console.log('FOUND PHOTO:', photoUrl);
    console.log('FOUND CAPTION:', caption);
  } catch (err) {
    console.error('Embed test error:', err);
  }
}

testEmbed('Ddk_BphSqJL');
