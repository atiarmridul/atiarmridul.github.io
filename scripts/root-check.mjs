import { readdir } from 'node:fs/promises';

const allowedRootFiles = new Set([
  '.env.example',
  '.gitignore',
  '.prettierignore',
  '.prettierrc.json',
  'README.md',
  'eslint.config.js',
  'index.html',
  'package-lock.json',
  'package.json',
  'playwright.config.ts',
  'postcss.config.js',
  'tailwind.config.js',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'tsconfig.qa.json',
  'vite.config.ts',
]);

const ignoredRootFiles = new Set(['.DS_Store']);

const entries = await readdir(process.cwd(), { withFileTypes: true });
const unexpectedFiles = entries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => !allowedRootFiles.has(name) && !ignoredRootFiles.has(name))
  .sort();

if (unexpectedFiles.length > 0) {
  console.error('Unexpected root files found:');
  for (const file of unexpectedFiles) {
    console.error(`- ${file}`);
  }
  console.error('\nMove new files into docs/, scripts/, public/, or src/.');
  process.exit(1);
}

console.log('Root file policy passed.');
