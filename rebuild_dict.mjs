import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictPath = path.join(__dirname, 'src', 'dictionaries.ts');
let content = fs.readFileSync(dictPath, 'utf8');

const langs = ["id", "de", "it", "ja", "es", "hi", "fr", "tr", "pt", "pl", "ar", "th", "hu", "ms", "zh", "ro", "ru", "vi"];

// Extract EN informationalContent
const enMatch = content.match(/en:\s*\{[\s\S]*?informationalContent:\s*(\{[\s\S]*?\})\n\s*\},?\n\s*id:/);
if (!enMatch) {
  console.error("Could not extract EN informationalContent");
  process.exit(1);
}
let enInfoStr = enMatch[1];
console.log("Extracted enInfoStr, length:", enInfoStr.length);

let newContent = content.substring(0, enMatch.index + enMatch[0].length - 4); // Keep up to `\n  id:` (wait, let's just do sequential replacements)

// Let's do this by splitting the file by language keys!
// Actually, since the file is messy, regex might fail. 
// A better way: replace everything from `informationalContent: {` to the end of the language block for each language.

for (let i = 0; i < langs.length; i++) {
  const lang = langs[i];
  const nextLang = i < langs.length - 1 ? langs[i+1] : null;
  
  // Find where this lang starts
  const langRegex = new RegExp(`\\n\\s*${lang}:\\s*\\{`);
  const match = content.match(langRegex);
  if (!match) continue;
  
  // Find where the NEXT lang starts
  let nextMatchIndex = content.length;
  if (nextLang) {
    const nextMatch = content.match(new RegExp(`\\n\\s*${nextLang}:\\s*\\{`));
    if (nextMatch) nextMatchIndex = nextMatch.index;
  } else {
    // For 'vi' (last lang), it ends with `\n};` at the end of the file
    const endMatch = content.lastIndexOf('\n};');
    if (endMatch !== -1) nextMatchIndex = endMatch;
  }
  
  let langBlock = content.substring(match.index, nextMatchIndex);
  
  // Inside langBlock, we want to keep everything BEFORE `informationalContent: {`
  const infoIndex = langBlock.indexOf('informationalContent:');
  if (infoIndex !== -1) {
    let cleanLangBlock = langBlock.substring(0, infoIndex) + 'informationalContent: ' + enInfoStr + '\n  },';
    content = content.substring(0, match.index) + cleanLangBlock + content.substring(nextMatchIndex);
  }
}

fs.writeFileSync(dictPath, content, 'utf8');
console.log("Rebuilt dictionaries.ts!");
