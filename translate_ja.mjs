import fs from 'fs';
import translate from 'google-translate-api-x';

const dictPath = 'src/dictionaries.ts';
let content = fs.readFileSync(dictPath, 'utf8');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function run() {
  console.log("Extracting base English dictionary...");
  const startIndex = content.indexOf('en: {');
  let braceCount = 0;
  let endIndex = startIndex;
  
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  const enStr = content.substring(startIndex, endIndex + 1).replace('en: ', '');
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

  const targetLangs = ['ja'];
  
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
    
    const langStartIndex = content.indexOf(`${lang}: {`, content.indexOf(`id: {`));
    let langBraceCount = 0;
    let langEndIndex = langStartIndex;
    
    for (let i = langStartIndex + lang.length + 1; i < content.length; i++) {
      if (content[i] === '{') langBraceCount++;
      if (content[i] === '}') {
        langBraceCount--;
        if (langBraceCount === 0) {
          langEndIndex = i;
          break;
        }
      }
    }
    
    const translatedStr = `${lang}: ` + JSON.stringify(newObj, null, 6);
    content = content.substring(0, langStartIndex) + translatedStr + content.substring(langEndIndex + 1);
    
    fs.writeFileSync(dictPath, content, 'utf8');
    console.log(`Successfully fully translated ${lang} section!`);
  }
}

run();
