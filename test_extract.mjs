import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictPath = path.join(__dirname, 'src', 'dictionaries.ts');
let content = fs.readFileSync(dictPath, 'utf8');

const enMatch = content.match(/en:\s*\{[\s\S]*?informationalContent:\s*(\{[\s\S]*?\})\n\s*\},?\n\s*[a-z]{2}:/);
if (!enMatch) {
  console.error("Could not extract EN informationalContent");
  process.exit(1);
}

let enInfoStr = enMatch[1];
fs.writeFileSync('scratch.json', enInfoStr);
console.log('wrote scratch.json');
