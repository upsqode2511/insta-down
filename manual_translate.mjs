import fs from 'fs';

const dictPath = 'src/dictionaries.ts';
let content = fs.readFileSync(dictPath, 'utf8');

const replacements = {
  id: {
    // Shared Steps
    '"Copy Link"': '"Salin Tautan"',
    '"Paste URL"': '"Tempel URL"',
    '"Download"': '"Unduh"',
    // Shared Subtitles in components fallback
    '"Download in just 3 simple steps"': '"Unduh hanya dalam 3 langkah sederhana"',
    // How It Works Titles
    '"How does it work on InstaDown?"': '"Bagaimana cara kerjanya di InstaDown?"',
    '"How to Download Instagram Reels?"': '"Bagaimana Cara Mengunduh Reel Instagram?"',
    '"How to download an Instagram profile?"': '"Bagaimana cara mengunduh profil Instagram?"',
    '"How to download Instagram Photos?"': '"Bagaimana cara mengunduh Foto Instagram?"',
    '"How to download Instagram Stories?"': '"Bagaimana cara mengunduh Cerita Instagram?"',
    // Why Use Titles
    '"Why Use Instadown for Instagram Video Downloader?"': '"Mengapa Menggunakan Instadown untuk Pengunduh Video Instagram?"',
    '"Why Use Instadown Instagram Photo Downloader?"': '"Mengapa Menggunakan Instadown Pengunduh Foto Instagram?"',
    '"Why Use Instadown Instagram Profile Downloader?"': '"Mengapa Menggunakan Instadown Pengunduh Profil Instagram?"',
    '"Why Use Instadown Instagram Reels Downloader?"': '"Mengapa Menggunakan Instadown Pengunduh Reel Instagram?"',
    '"Why Use Instadown Instagram Story Downloader?"': '"Mengapa Menggunakan Instadown Pengunduh Cerita Instagram?"'
  },
  de: {
    // Shared Steps
    '"Copy Link"': '"Link kopieren"',
    '"Paste URL"': '"URL einfügen"',
    '"Download"': '"Herunterladen"',
    // Shared Subtitles in components fallback
    '"Download in just 3 simple steps"': '"In nur 3 einfachen Schritten herunterladen"',
    // How It Works Titles
    '"How does it work on InstaDown?"': '"Wie funktioniert es auf InstaDown?"',
    '"How to Download Instagram Reels?"': '"Wie lädt man Instagram Reels herunter?"',
    '"How to download an Instagram profile?"': '"Wie lade ich ein Instagram-Profil herunter?"',
    '"How to download Instagram Photos?"': '"Wie lädt man Instagram-Fotos herunter?"',
    '"How to download Instagram Stories?"': '"Wie lädt man Instagram-Storys herunter?"',
    // Why Use Titles
    '"Why Use Instadown for Instagram Video Downloader?"': '"Warum Instadown für Instagram-Video-Downloads verwenden?"',
    '"Why Use Instadown Instagram Photo Downloader?"': '"Warum den Instagram Foto Downloader von Instadown verwenden?"',
    '"Why Use Instadown Instagram Profile Downloader?"': '"Warum den Instagram Profil Downloader von Instadown verwenden?"',
    '"Why Use Instadown Instagram Reels Downloader?"': '"Warum den Instagram Reels Downloader von Instadown verwenden?"',
    '"Why Use Instadown Instagram Story Downloader?"': '"Warum den Instagram Story Downloader von Instadown verwenden?"'
  }
};

const languages = ['id', 'de'];

languages.forEach((lang) => {
  // Find boundaries for lang object
  const startIdx = content.indexOf(`${lang}: {`);
  const endIdx = content.indexOf(`  },\n  ${languages.indexOf(lang) === 0 ? 'de' : 'it'}: {`);
  
  if (startIdx !== -1 && endIdx !== -1) {
    let section = content.substring(startIdx, endIdx);
    
    // Apply translations
    for (const [en, tr] of Object.entries(replacements[lang])) {
      // Basic replace all for exact strings in quotes
      section = section.split(en).join(tr);
    }
    
    content = content.substring(0, startIdx) + section + content.substring(endIdx);
    console.log(`Translated titles and steps for ${lang}.`);
  }
});

fs.writeFileSync(dictPath, content, 'utf8');
console.log('Done!');
