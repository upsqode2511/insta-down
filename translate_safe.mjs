import fs from 'fs';
import translate from 'google-translate-api-x';

const dictPath = 'src/dictionaries.ts';
let content = fs.readFileSync(dictPath, 'utf8');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function run() {
  console.log("Extracting base English dictionary...");
  const dictObjIndex = content.indexOf('const dictionaries: Record<string, Dictionary> = {');
  const enStartIndex = content.indexOf('\n  en: {', dictObjIndex);
  
  let braceCount = 0;
  let enEndIndex = enStartIndex + 3; // start checking from 'en: {'
  
  for (let i = enStartIndex + 3; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        enEndIndex = i;
        break;
      }
    }
  }
  
  const enStr = content.substring(enStartIndex, enEndIndex + 1).replace(/\n\s*en: /, '');
  let baseObj;
  eval('baseObj = ' + enStr + ';');
  
  const stringPaths = [];
  const stringValues = [];
  
  function traverse(obj, path = []) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        stringPaths.push([...path, key]);
        stringValues.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        traverse(obj[key], [...path, key]);
      }
    }
  }
  
  traverse(baseObj);
  console.log(`Found ${stringValues.length} strings to translate.`);

  // Let's re-translate id, and translate es to fix the corruption!
  const targetLangs = ['hi', 'fr', 'tr', 'pt', 'pl', 'ar', 'th', 'hu', 'ms', 'zh', 'ro', 'ru', 'vi'];
  
  for (const lang of targetLangs) {
    console.log(`Translating to ${lang}...`);
    
    const batchSize = 25;
    const translatedStrings = [];
    
    for (let i = 0; i < stringValues.length; i += batchSize) {
      const batch = stringValues.slice(i, i + batchSize);
      console.log(`Translating batch ${i} to ${i + batch.length}...`);
      
      try {
        const res = await translate(batch, { to: lang });
        if (Array.isArray(res)) {
           translatedStrings.push(...res.map(r => r.text.trim()));
        } else {
           translatedStrings.push(res.text.trim());
        }
      } catch (e) {
        console.error(`Batch failed: ${e.message}. Translating individually...`);
        for (const str of batch) {
          await delay(500);
          try {
            const r = await translate(str, { to: lang });
            translatedStrings.push(r.text.trim());
          } catch(err) {
            console.error(`Fallback failed: ${err.message}.`);
            translatedStrings.push(str);
          }
        }
      }
      await delay(1000);
    }
    
    const newObj = JSON.parse(JSON.stringify(baseObj));
    for (let i = 0; i < stringPaths.length; i++) {
      const path = stringPaths[i];
      let current = newObj;
      for (let j = 0; j < path.length - 1; j++) {
        current = current[path[j]];
      }
      current[path[path.length - 1]] = translatedStrings[i];
    }
    
    // SAFE FIND
    const langStartIndex = content.indexOf(`\n  ${lang}: {`, dictObjIndex);
    if (langStartIndex === -1) {
       console.error(`Could not find \\n  ${lang}: { in the file!`);
       continue;
    }
    
    let langBraceCount = 0;
    let langEndIndex = langStartIndex + 3;
    
    // Start parsing from `{` which is at `langStartIndex + lang.length + 5`
    for (let i = langStartIndex + 3; i < content.length; i++) {
      if (content[i] === '{') langBraceCount++;
      if (content[i] === '}') {
        langBraceCount--;
        if (langBraceCount === 0) {
          langEndIndex = i;
          break;
        }
      }
    }
    
    const translatedStr = `\n  ${lang}: ` + JSON.stringify(newObj, null, 4);
    content = content.substring(0, langStartIndex) + translatedStr + content.substring(langEndIndex + 1);
    
    fs.writeFileSync(dictPath, content, 'utf8');
    console.log(`Successfully safely fully translated ${lang} section!`);
  }
}

run();
