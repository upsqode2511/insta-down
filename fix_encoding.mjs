import fs from 'fs';
const dictPath = 'src/dictionaries.ts';
let content = fs.readFileSync(dictPath, 'utf8');
const validEnd = content.indexOf('};\r\n');
let cutIndex = validEnd !== -1 ? validEnd : content.indexOf('};\n');
if (cutIndex !== -1) {
    content = content.substring(0, cutIndex + 2) + `\nexport const getDictionary = (lang: string) => {\n  return dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;\n};\n`;
    fs.writeFileSync(dictPath, content, 'utf8');
    console.log("Fixed.");
} else {
    console.log("Could not find end of object");
}
