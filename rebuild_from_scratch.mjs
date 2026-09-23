import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictPath = path.join(__dirname, 'src', 'dictionaries.ts');

const enInfo = fs.readFileSync('scratch.json', 'utf8');
// Clean up scratch.json syntax error at end
let cleanEnInfo = enInfo.replace(/},\s*{\s*title:\s*"Reels"[\s\S]*$/, '}');

const langs = ['en', 'id', 'de', 'it', 'ja', 'es', 'hi', 'fr', 'tr', 'pt', 'pl', 'ar', 'th', 'hu', 'ms', 'zh', 'ro', 'ru', 'vi'];

const baseDict = {
  nav: {
    home: "Home",
    features: "Features",
    howItWorks: "How it Works",
    faq: "FAQ",
    blog: "Blog",
  },
  features: {
    f1_title: "Super Fast",
    f1_desc: "Our optimized servers ensure your downloads finish in just a few seconds. No waiting around.",
    f2_title: "High Quality",
    f2_desc: "Download content in its original high-resolution format. No compression, no quality loss.",
    f3_title: "Safe & Secure",
    f3_desc: "We value your privacy. No login required, and we don't store any of your downloaded media.",
  },
  downloader: {
    paste: "Paste",
    download: "Download",
    placeholder: "Search or paste Instagram link here",
    check1: "100% Free",
    check2: "No Login Required",
    check3: "Works on All Devices",
  },
  tabs: {
    video: "Video",
    photo: "Photo",
    story: "Story",
    reel: "Reel",
    profile: "Profile"
  },
  pages: {
    videoTitle: "Instagram Video Downloader",
    videoSubtitle: "Download Instagram Videos, Photos, Reels, Stories online with ease",
    photoTitle: "Instagram Photo Downloader",
    photoSubtitle: "Easily obtain Instagram photos",
    reelsTitle: "Instagram Reels Downloader HD",
    reelsSubtitle: "Download Instagram Reels videos in high quality MP4 format",
    storyTitle: "Instagram Story Downloader",
    storySubtitle: "Download Instagram Stories and Highlights anonymously and for free",
    profileTitle: "Instagram Profile Downloader",
    profileSubtitle: "View and download Instagram profile pictures in full resolution"
  }
};

let content = `export interface Dictionary {
  nav: {
    home: string;
    features: string;
    howItWorks: string;
    faq: string;
    blog: string;
  };
  features: {
    f1_title: string;
    f1_desc: string;
    f2_title: string;
    f2_desc: string;
    f3_title: string;
    f3_desc: string;
  };
  downloader: {
    paste: string;
    download: string;
    placeholder: string;
    check1: string;
    check2: string;
    check3: string;
  };
  tabs: {
    video: string;
    photo: string;
    story: string;
    reel: string;
    profile: string;
  };
  pages: {
    videoTitle: string;
    videoSubtitle: string;
    photoTitle: string;
    photoSubtitle: string;
    reelsTitle: string;
    reelsSubtitle: string;
    storyTitle: string;
    storySubtitle: string;
    profileTitle: string;
    profileSubtitle: string;
  };
  informationalContent: any;
}\n\nconst dictionaries: Record<string, Dictionary> = {\n`;

for (let lang of langs) {
  content += `  ${lang}: {\n`;
  content += `    nav: ${JSON.stringify(baseDict.nav, null, 6)},\n`;
  content += `    features: ${JSON.stringify(baseDict.features, null, 6)},\n`;
  content += `    downloader: ${JSON.stringify(baseDict.downloader, null, 6)},\n`;
  content += `    tabs: ${JSON.stringify(baseDict.tabs, null, 6)},\n`;
  content += `    pages: ${JSON.stringify(baseDict.pages, null, 6)},\n`;
  content += `    informationalContent: ${cleanEnInfo}\n  },\n`;
}

content += `};\n\nexport const getDictionary = (lang: string) => {\n  return dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;\n};\n`;

fs.writeFileSync(dictPath, content, 'utf8');
console.log("Completely rebuilt dictionaries.ts!");
