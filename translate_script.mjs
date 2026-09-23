import fs from 'fs';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictPath = path.join(__dirname, 'src', 'dictionaries.ts');
let content = fs.readFileSync(dictPath, 'utf8');

const languages = ['id', 'de', 'it', 'ja', 'es', 'hi', 'fr', 'tr', 'pt', 'pl', 'ar', 'th', 'hu', 'ms', 'zh', 'ro', 'ru', 'vi'];

const infoType = `  informationalContent: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    howItWorksTitle: string;
    howItWorksSteps: { title: string; desc: string; }[];
    whyUseTitle: string;
    whyUseReasons: string[];
    featuresTitle: string;
    featuresList: { title: string; desc: string; }[];
  };
`;

const enData = {
  p1: "InstaDown is a simple and free Instagram video downloader designed to help you save Instagram videos quickly and easily. Whether you want to download Instagram video for offline viewing or save a video you like, Insta Downloader makes the process easy.",
  p2: "With our Instagram downloader, you can download Instagram videos directly from your browser without complicated steps. There is no need to install additional software or do any login or signup. Simply copy the link of the Instagram video you want to save, paste the URL into InstaDown's search box, and download your video.",
  p3: "Our service is designed to work on a variety of devices, including smartphones, tablets, laptops, and desktop computers. This makes it easy for you to download Instagram video content whenever you need it.",
  p4: "Insta Video Download focuses on providing a clean and user-friendly experience. If you are looking for an Instagram downloader that makes downloading video content fast and easy, InstaDown offers you a simple solution.",
  howItWorksTitle: "How does it work on InstaDown?",
  whyUseTitle: "Why Use Instadown for Instagram Video Downloader?",
  featuresTitle: "Features of InstaDown",
  step1Title: "Copy Link",
  step1Desc: 'Open the video on Instagram, tap the share button, and select "Copy Link" to get its URL.',
  step2Title: "Paste URL",
  step2Desc: "Open InstaDown, paste the copied Instagram video URL into the search box.",
  step3Title: "Download",
  step3Desc: "Click the download button, wait a moment, and save the Instagram video directly to your device.",
  reason1: "InstaDown keeps the Instagram video download process simple. Copy the video link, paste it into the downloader, and download the available video without navigating through complicated menus or unnecessary steps.",
  reason2: "Insta Down offers a simple way to try downloading Insta videos through your browser. You can use the downloader without having to deal with complicated installation processes or technical settings.",
  reason3: "Instagram Downloader offers a clean interface. Whether you use Instagram regularly or are trying out the Instagram video downloader tool for the first time, the process is designed to be easy.",
  reason4: "Insta video download can be accessed through a web browser. Which makes it convenient to use on different devices. Whether you are browsing Instagram on your smartphone or computer, you can use to save the right video content without installing software.",
  reason5: "Downloading videos can make it easier to access them when you don't want to search for them again. InstaDown provides an easy way to save eligible Instagram videos so you can keep them available for personal use on your device.",
  reason6: "Instadown works directly through your browser. There is no need to install a separate app just to download Instagram videos. Open the website, enter the Instagram video link and follow the easy download process.",
  feat1Title: "Reels",
  feat1Desc: "Instagram Reels downloader simplifies the process. This processes the reel URL and provides an available download option. Use this feature only in public and respect copyright and permissions.",
  feat2Title: "Photos",
  feat2Desc: "Instagram Photo Downloader helps you save photos from publicly accessible Instagram posts. Once the photo is available, you can save it directly to your device. This is useful for keeping images that you want to view later.",
  feat3Title: "Profile",
  feat3Desc: "Instagram Profile Downloader provides a convenient way to access downloadable content associated with publicly accessible Instagram profiles. Use the profile URL with the tool and download the content where permitted."
};

function formatObj(data) {
  return `    informationalContent: {
      p1: ` + JSON.stringify(data.p1) + `,
      p2: ` + JSON.stringify(data.p2) + `,
      p3: ` + JSON.stringify(data.p3) + `,
      p4: ` + JSON.stringify(data.p4) + `,
      howItWorksTitle: ` + JSON.stringify(data.howItWorksTitle) + `,
      howItWorksSteps: [
        { title: ` + JSON.stringify(data.step1Title) + `, desc: ` + JSON.stringify(data.step1Desc) + ` },
        { title: ` + JSON.stringify(data.step2Title) + `, desc: ` + JSON.stringify(data.step2Desc) + ` },
        { title: ` + JSON.stringify(data.step3Title) + `, desc: ` + JSON.stringify(data.step3Desc) + ` }
      ],
      whyUseTitle: ` + JSON.stringify(data.whyUseTitle) + `,
      whyUseReasons: [
        ` + JSON.stringify(data.reason1) + `,
        ` + JSON.stringify(data.reason2) + `,
        ` + JSON.stringify(data.reason3) + `,
        ` + JSON.stringify(data.reason4) + `,
        ` + JSON.stringify(data.reason5) + `,
        ` + JSON.stringify(data.reason6) + `
      ],
      featuresTitle: ` + JSON.stringify(data.featuresTitle) + `,
      featuresList: [
        { title: ` + JSON.stringify(data.feat1Title) + `, desc: ` + JSON.stringify(data.feat1Desc) + ` },
        { title: ` + JSON.stringify(data.feat2Title) + `, desc: ` + JSON.stringify(data.feat2Desc) + ` },
        { title: ` + JSON.stringify(data.feat3Title) + `, desc: ` + JSON.stringify(data.feat3Desc) + ` }
      ]
    }`;
}

async function run() {
  console.log("Updating type...");
  if (!content.includes('informationalContent: {')) {
    content = content.replace('  }\\n};', '  }\\n' + infoType + '};\n');
    content = content.replace('  }\r\n};', '  }\r\n' + infoType + '};\r\n');
  }

  console.log("Injecting english...");
  const enMatch = /(en:\s*\{[\s\S]*?pages:\s*\{[^}]+\})(\n\s*\})/;
  content = content.replace(enMatch, (match, p1, p2) => {
    if (p1.includes('informationalContent:')) return match;
    return p1 + ',\n' + formatObj(enData) + p2;
  });

  const keys = Object.keys(enData);
  const textArray = keys.map(k => enData[k]);

  for (const lang of languages) {
    console.log(`Translating to ${lang}...`);
    const translatedData = {};
    let toLang = lang;
    if (lang === 'zh') toLang = 'zh-CN';
    
    try {
      // batch translating array of strings isn't natively supported easily without arrays, let's use a delimiter
      const textStr = textArray.join(' ||| ');
      const res = await translate(textStr, { to: toLang });
      const transParts = res.text.split(' ||| ');
      
      if (transParts.length === keys.length) {
        keys.forEach((k, i) => {
           translatedData[k] = transParts[i].trim();
        });
      } else {
         console.warn(`Mismatch length for ${lang}. Falling back to english stubs for this one...`);
         Object.assign(translatedData, enData);
      }
    } catch (err) {
      console.error(`Failed ${lang}`, err.message);
      Object.assign(translatedData, enData); // fallback to English
    }

    const langRegex = new RegExp(`(\\b${lang}:\\s*\\{[\\s\\S]*?pages:\\s*\\{[^}]+\\})(\\n\\s*\\})`);
    content = content.replace(langRegex, (match, p1, p2) => {
      if (p1.includes('informationalContent:')) return match;
      return p1 + ',\n' + formatObj(translatedData) + p2;
    });
  }

  fs.writeFileSync(dictPath, content, 'utf8');
  console.log("Done updating dictionaries.ts");
}

run();
