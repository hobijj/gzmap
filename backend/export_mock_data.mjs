import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '..', 'src', 'data');

// Generate temporary index files with .js extensions
const modules = ['life', 'memory', 'pulse'];
const tempFiles = [];

for (const mod of modules) {
  const indexPath = resolve(srcDir, mod, 'index.js');
  const content = readFileSync(indexPath, 'utf-8');
  // Add .js extension to bare imports: from './foo' -> from './foo.js'
  const fixed = content.replace(/from\s+'\.\/([^']+)'/g, "from './$1.js'");
  const tempPath = resolve(srcDir, mod, '_index_temp.js');
  writeFileSync(tempPath, fixed, 'utf-8');
  tempFiles.push(tempPath);
}

// Now import the temp files using file:// URLs
const lifeData = await import(pathToFileURL(resolve(srcDir, 'life', '_index_temp.js')).href);
const memoryData = await import(pathToFileURL(resolve(srcDir, 'memory', '_index_temp.js')).href);
const pulseData = await import(pathToFileURL(resolve(srcDir, 'pulse', '_index_temp.js')).href);

const allData = {
  life: lifeData.default,
  memory: memoryData.default,
  pulse: pulseData.default,
};

// Write JSON output
const outPath = resolve(__dirname, 'mock_data.json');
writeFileSync(outPath, JSON.stringify(allData, null, 2), 'utf-8');
console.log(`Exported ${JSON.stringify(Object.keys(allData))} to mock_data.json`);

// Cleanup temp files
for (const f of tempFiles) {
  try { unlinkSync(f); } catch {}
}
