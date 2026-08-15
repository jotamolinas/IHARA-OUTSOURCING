const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const itaipuMatch = /(title:\s*"(?:Itaip[uú][^"]*)",[\s\S]*?image:\s*")https:\/\/images\.unsplash\.com\/photo-[^"]+(")/g;
content = content.replace(itaipuMatch, '$1https://images.unsplash.com/photo-1466611653911-95281773ad90$2');

fs.writeFileSync('translations.ts', content);
