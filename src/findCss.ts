import fs from 'fs';
import path from 'path';

export function getCssByFolder(folderPath: string, currentPath: string = '') {
  const files = fs.readdirSync(folderPath);
  let cssFiles: string[] = [];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      const newCurrentPath = path.join(currentPath, file);
      cssFiles = cssFiles.concat(getCssByFolder(filePath, newCurrentPath));
    } else {
      if (file.endsWith('.css')) {
        const relativePath = path.join(currentPath, file);
        cssFiles.push(`/${relativePath}`);
      }
    }
  });
  return cssFiles;
}
