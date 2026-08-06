import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/app/(dashboard)', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The broken snippet looks like:
    // <>
    //   }
    // >
    // Or <>}
    // Or <> } >
    // We can use a regex to replace this specific broken pattern with just <>
    // Specifically: `<>` followed by optional whitespace, `}`, optional whitespace, `>`
    content = content.replace(/<>\s*\}\s*>/g, '<>');
    
    // Also fixing <>}
    content = content.replace(/<>}/g, '<>');
    
    fs.writeFileSync(filePath, content);
  }
});
