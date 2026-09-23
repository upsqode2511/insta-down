import fs from 'fs';
import translate from 'google-translate-api-x';

const dictPath = 'src/dictionaries.ts';
let content = fs.readFileSync(dictPath, 'utf8');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function run() {
  console.log("Extracting base English informationalContent...");
  const startIndex = content.indexOf('informationalContent: {', content.indexOf('en: {'));
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
  
  const infoContentStr = content.substring(startIndex, endIndex + 1).replace('informationalContent: ', '');
  let baseInfoObj;
  eval('baseInfoObj = ' + infoContentStr + ';');
  
  // Extract all strings
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
  
  traverse(baseInfoObj);
  console.log(`Found ${stringValues.length} strings to translate.`);

  const targetLangs = ['de', 'id'];
  
  for (const lang of targetLangs) {
    console.log(`Translating to ${lang}...`);
    
    // google-translate-api-x can translate arrays directly without delimiters!
    // But let's batch it to be safe.
    const batchSize = 25;
    const translatedStrings = [];
    
    for (let i = 0; i < stringValues.length; i += batchSize) {
      const batch = stringValues.slice(i, i + batchSize);
      console.log(`Translating batch ${i} to ${i + batch.length}...`);
      
      try {
        const res = await translate(batch, { to: lang });
        // res is an array of objects
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
            translatedStrings.push(str); // Fallback to English
          }
        }
      }
      await delay(1000);
    }
    
    // Reconstruct object
    const newObj = JSON.parse(JSON.stringify(baseInfoObj));
    for (let i = 0; i < stringPaths.length; i++) {
      const path = stringPaths[i];
      let current = newObj;
      for (let j = 0; j < path.length - 1; j++) {
        current = current[path[j]];
      }
      current[path[path.length - 1]] = translatedStrings[i];
    }
    
    // Replace in file
    const langStartIndex = content.indexOf('informationalContent: {', content.indexOf(`${lang}: {`));
    let langBraceCount = 0;
    let langEndIndex = langStartIndex;
    
    for (let i = langStartIndex; i < content.length; i++) {
      if (content[i] === '{') langBraceCount++;
      if (content[i] === '}') {
        langBraceCount--;
        if (langBraceCount === 0) {
          langEndIndex = i;
          break;
        }
      }
    }
    
    const translatedStr = 'informationalContent: ' + JSON.stringify(newObj, null, 6);
    content = content.substring(0, langStartIndex) + translatedStr + content.substring(langEndIndex + 1);
    
    fs.writeFileSync(dictPath, content, 'utf8');
    console.log(`Successfully fully translated ${lang} section!`);
  }
}

run();
