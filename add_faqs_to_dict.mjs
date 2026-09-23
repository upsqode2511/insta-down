import fs from 'fs';

const dictPath = 'src/dictionaries.ts';
let dictContent = fs.readFileSync(dictPath, 'utf8');

// The FAQs
const videoFaqs = [
  {
    question: "What is InstaDown?",
    answer: "InstaDown is an online Instagram downloader that allows users to download Instagram videos and other supported Instagram content using its URL."
  },
  {
    question: "What is Instagram Video Downloader?",
    answer: "Instagram Video Downloader is an online tool that allows users to save eligible Instagram videos to their device using the video's URL. InstaDown provides a simple process to save videos available on your device."
  },
  {
    question: "Is Instadown an Instagram downloader?",
    answer: "Yes. Instadown is an online Instagram downloader designed to help users download publicly accessible Instagram content via supported URLs."
  },
  {
    question: "How do I download Instagram videos?",
    answer: "To download Instagram video content, copy the video link from Instagram, paste the URL into Insta Down, and click the download button. This process only requires a few simple steps."
  },
  {
    question: "Can I download Instagram videos to my phone?",
    answer: "Yes. Insta downloader can be accessed through a web browser, allowing you to use the Instagram video downloader on compatible smartphones and other devices."
  },
  {
    question: "Do I need to install an app to use Instadown?",
    answer: "No. Instadown is browser-based, so you can use the Instagram video download tool without installing a dedicated downloader app."
  },
  {
    question: "Can I download Instagram Reels and Photos too?",
    answer: "Yes. In addition to video downloading, InstaDown provides dedicated tools for Reels, Photos, and Profiles, making it a convenient platform for downloading a variety of Instagram content."
  },
  {
    question: "Can I download Instagram videos for free?",
    answer: "Insta down is designed to provide an accessible way to download publicly available Instagram videos. Availability and download options depend on content and current service functionality."
  },
  {
    question: "Can I download an Instagram video?",
    answer: "You should only download and use Instagram content that you have permission to save and use. Please respect the creator's copyright, privacy, and applicable Instagram terms when downloading content."
  },
  {
    question: "Where are downloaded Instagram videos saved?",
    answer: "Downloaded videos are usually saved according to your browser or device's download settings. On many devices, you can find them in the Downloads folder or through your browser's download history."
  },
  {
    question: "Why isn't my Instagram video downloading?",
    answer: "Make sure you've copied the correct Instagram post URL and that the content is publicly accessible. If the link is unavailable, private, deleted, or unsupported, the downloader won't be able to process it."
  },
  {
    question: "Is it legal to download Instagram videos?",
    answer: "Downloading and reusing content may be subject to copyright, privacy, and Instagram terms. Always respect the rights of content creators and only use downloaded videos if you have the appropriate permission or legal basis."
  }
];

const reelsFaqs = [
  {
    question: "What is an Instagram Reels downloader?",
    answer: "An Instagram Reels downloader is an online tool that allows you to download public Instagram Reel content using its URL. Instadown breaks this process down into three simple steps: copying the Reel's link, pasting the URL, and downloading."
  },
  {
    question: "How can I download Instagram Reels?",
    answer: "Copy the link of the Instagram Reel you want to save, open Instadown, paste the URL into the downloader, and click the download button. Your Reel will then be saved to your device."
  },
  {
    question: "Is Instadown free to use?",
    answer: "Instadown provides a convenient way to process supported Instagram Reel URLs. Check the current options on the website to learn about any applicable limitations or terms of service."
  },
  {
    question: "Can I download Instagram Reels to my phone?",
    answer: "Yes. Instadown can be used via a mobile browser, making it easy to download publicly available Instagram Reels on compatible smartphones and tablets."
  },
  {
    question: "Can I download Instagram Reels in high quality?",
    answer: "The available quality depends on the original content and the technical specifications of the uploaded Reel. Instadown provides a downloadable version for supported content."
  },
  {
    question: "Can I download private Instagram Reels?",
    answer: "No. Downloaders generally work with publicly available content. Private Instagram Reels and content restricted by Instagram's privacy settings cannot be downloaded using Instadown."
  },
  {
    question: "Do I need an Instagram account to download a Reel?",
    answer: "You do not need to provide your Instagram password for Instadown. The availability of downloadable content may depend on the Instagram URL and whether the content is publicly available."
  },
  {
    question: "Do I need to install an app?",
    answer: "No. Instadown is an online Insta Reel downloader, so you can use it directly through your web browser without installing any additional software."
  },
  {
    question: "Can Instagram Reels be downloaded in HD?",
    answer: "The quality available for download depends on the original Reel and the media file provided by Instagram. When high-quality media is available, the downloader can provide the corresponding supported quality."
  },
  {
    question: "Is it legal to download Instagram Reels?",
    answer: "Downloading content may involve copyright, privacy, and platform rules. Only download content for which you have permission."
  }
];

const photoFaqs = [
  {
    question: "What is an Instagram photo downloader?",
    answer: "An Instagram photo downloader is an online web-based tool that allows users to download publicly available Instagram photos using their URLs."
  },
  {
    question: "How to download an Instagram photo using Instadown?",
    answer: "Copy the Instagram photo link, paste the URL into the Instadown downloader, and click the download button."
  },
  {
    question: "Is Instadown a tool for downloading Instagram photos?",
    answer: "Yes. Instadown is designed to simplify the process of downloading Instagram photos via a web browser. You only need the URL of the public Instagram photo you wish to download."
  },
  {
    question: "Do I need to install an app to use Instadown?",
    answer: "No. Instadown is a web-based Instagram photo downloader, so you can use it directly from your browser without installing any additional software."
  },
  {
    question: "Can I use the Insta photo downloader on my phone?",
    answer: "Yes. You can use Instadown via a mobile web browser. Copy the Instagram photo URL, open Instadown, paste the link, and follow the download instructions."
  },
  {
    question: "Can I download private Instagram photos?",
    answer: "The ability to download depends on the content and the technical capabilities of the tool. Instadown is designed for publicly available content. Do not attempt to bypass privacy controls or access content without permission."
  },
  {
    question: "Can I download any Instagram photo?",
    answer: "Instadown is intended for publicly available content that you have permission to download and use. Always respect the creator's copyright, privacy, and Instagram's terms when saving or using downloaded content."
  },
  {
    question: "Is Instadown free to use?",
    answer: "Instadown is designed to provide a simple, web-based experience for downloading Instagram photos. Any applicable limitations, availability, or terms of use are displayed on the platform."
  },
  {
    question: "Do I need an Instagram account to download photos?",
    answer: "This requirement may depend on the Instagram content and its accessibility. Instadown works with publicly available content supported by the service. Private or restricted content may not be available for download."
  },
  {
    question: "Is it legal to download Instagram photos?",
    answer: "Downloading or reusing Instagram photos may involve copyright, privacy, or other rights. Always respect Instagram's terms and the original creator's rights, and obtain permission when necessary."
  }
];

const profileFaqs = [
  {
    question: "What is Instadown?",
    answer: "Instadown is an online Instagram downloader platform that provides specialized tools for Instagram profiles, videos, Reels, and photos."
  },
  {
    question: "What is an Instagram profile downloader?",
    answer: "An Instagram profile downloader is an online tool that processes an Instagram profile URL and provides access to publicly available profile content that can be downloaded from the platform."
  },
  {
    question: "How can I download an Instagram profile?",
    answer: "Copy the URL of the Instagram profile you want to view, paste it into the Instadown profile downloader, and follow the instructions to download it."
  },
  {
    question: "Is Instagram profile downloading free?",
    answer: "If Instadown offers the profile downloader as a free service, users can process supported public profile URLs without paying for basic download functionality. Service availability is subject to change."
  },
  {
    question: "Can I use the Instagram profile downloader on my phone?",
    answer: "Yes. Since Instadown works via a web browser, you can use the Instagram profile downloader on compatible smartphones, tablets, laptops, and desktop computers."
  },
  {
    question: "Does the Instagram Profile Downloader work on mobile?",
    answer: "Yes. The Instadown website can be accessed via a mobile browser, allowing users to use the Instagram Profile Downloader on smartphones and tablets."
  },
  {
    question: "Can I download private Instagram profiles?",
    answer: "No. InstaDown is designed for publicly available Instagram content. You should not download private profiles or content that you do not have permission to access."
  },
  {
    question: "What is the Insta Profile downloader used for?",
    answer: "The Insta Profile downloader can be used to access supported and publicly available Instagram profile content via the profile URL, subject to the platform's functionality and applicable rights."
  },
  {
    question: "Do I need to install an app?",
    answer: "Yes. Instadown is web-based, so you can use the Instagram profile downloading service directly from your browser without installing any additional software."
  },
  {
    question: "Where are downloaded files saved?",
    answer: "Downloaded files are generally saved according to your browser's and device's download settings. On many devices, they can be found in the default 'Downloads' folder."
  },
  {
    question: "Is it legal to download Instagram content?",
    answer: "The legality of downloading and reusing Instagram content depends on factors such as copyright, permission, privacy, and how the content is used. Download content responsibly and respect the rights of content creators as well as Instagram's applicable terms."
  },
  {
    question: "What does \"Instagram Profile down\" mean?",
    answer: "\"Instagram Profile down\" is a short search phrase used for Instagram profile downloading or downloaders. Instadown provides a URL-based method to access publicly available Instagram content."
  }
];

const faqObjStr = `
      videoFaqs: ${JSON.stringify(videoFaqs, null, 8).replace(/\n/g, '\n      ')},
      reelsFaqs: ${JSON.stringify(reelsFaqs, null, 8).replace(/\n/g, '\n      ')},
      photoFaqs: ${JSON.stringify(photoFaqs, null, 8).replace(/\n/g, '\n      ')},
      profileFaqs: ${JSON.stringify(profileFaqs, null, 8).replace(/\n/g, '\n      ')}
    }`;

// Insert into English dictionary
dictContent = dictContent.replace(
  /profileFeaturesList:\s*\[[\s\S]*?\]\s*\n\s*\}/, 
  (match) => match.replace('}', '},\n' + faqObjStr)
);

// Add types to Dictionary
const typesStr = `
    videoFaqs?: any[];
    reelsFaqs?: any[];
    photoFaqs?: any[];
    profileFaqs?: any[];
  };
`;

dictContent = dictContent.replace(
  /profileFeaturesList\?: any\[\];\n\s*\};\n\};/,
  (match) => match.replace('  };\n};', typesStr + '};')
);

fs.writeFileSync(dictPath, dictContent, 'utf8');
console.log('Dictionaries updated!');
