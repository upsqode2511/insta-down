import fs from 'fs';

const dictPath = 'src/dictionaries.ts';
let dictContent = fs.readFileSync(dictPath, 'utf8');

// find where videoFaqs was inserted and fix the syntax
dictContent = dictContent.replace(
  /profileFeaturesList: \[\s*\{\s*title: "Video",[\s\S]*?\},?\s*videoFaqs: \[\s*\{/m,
  `profileFeaturesList: [
        { title: "Video", desc: "Save publicly available Instagram videos through a simple URL-based process. Copy the video link, paste it into the downloader, and use the download option to save the content to your device." },
        { title: "Reels", desc: "Download public Instagram Reels without navigating through complex options. Paste the Reel's URL into Instadown and use the available download option." },
        { title: "Photo", desc: "Save publicly available Instagram photos using their Instagram links. Paste the photo URL into Instadown and download the image in a suitable format." }
      ],
      videoFaqs: [
        {`
);

fs.writeFileSync(dictPath, dictContent, 'utf8');
console.log('Fixed dictionaries.ts syntax');
