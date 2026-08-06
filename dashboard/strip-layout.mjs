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
    
    // Remove imports
    content = content.replace(/import { DashboardLayout } from '.*';\n?/g, '');
    content = content.replace(/import { Breadcrumb } from '.*';\n?/g, '');
    
    // Because JSX can have <DashboardLayout breadcrumb={<Breadcrumb />} >
    // the regex /<DashboardLayout[^>]*>/g will stop at the first > which is inside Breadcrumb!
    // So we need to match it properly.
    
    // A safer way: since we know we just want to remove the tag entirely:
    // we can use a regex that handles nested brackets, or just a simpler approach:
    // replacing `<DashboardLayout` and everything until the immediate next `>` that is on a new line or same line if no props.
    // Actually, all these DashboardLayouts look like:
    // <DashboardLayout
    //   breadcrumb={...}
    // >
    // or
    // <DashboardLayout>
    
    // Let's replace `<DashboardLayout` up to `>` manually.
    let index = content.indexOf('<DashboardLayout');
    while(index !== -1) {
      let openBrackets = 0;
      let endIndex = -1;
      for (let i = index; i < content.length; i++) {
        if (content[i] === '<') openBrackets++;
        if (content[i] === '>') openBrackets--;
        if (openBrackets === 0) {
          endIndex = i;
          break;
        }
      }
      
      if (endIndex !== -1) {
        content = content.substring(0, index) + '<>' + content.substring(endIndex + 1);
      }
      
      index = content.indexOf('<DashboardLayout', index + 1);
    }
    
    content = content.replace(/<\/DashboardLayout>/g, '</>');
    
    fs.writeFileSync(filePath, content);
    console.log(`Processed ${filePath}`);
  }
});
