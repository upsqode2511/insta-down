const fs = require('fs');

const html = fs.readFileSync('embed_output.html', 'utf8');

const matches = html.match(/https?:[^\s"'<>]+/g) || [];
const cleaned = matches.map(u => u.replace(/\\u0026/g, '&').replace(/\\/g, ''));
const scontent = cleaned.filter(u => u.includes('scontent'));

console.log('Total scontent links:', scontent.length);
scontent.forEach((u, i) => console.log(i, u.slice(0, 150)));
