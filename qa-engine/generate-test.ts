import { generatePlaywrightSpecs } from './core/generator/generate-test';

interface CliOptions {
  inputPath: string;
  baseUrl: string;
  outputDir: string;
  catalogPath: string;
  scanLiveSite: boolean;
  automationMode: 'automated' | 'all';
}

function parseArgs(argv: string[]): CliOptions {
  const args = new Map<string, string | boolean>();
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const next = argv[index + 1];
    if (!key.startsWith('--')) continue;
    if (!next || next.startsWith('--')) {
      args.set(key, true);
    } else {
      args.set(key, next);
      index += 1;
    }
  }

  return {
    inputPath: String(args.get('--input') || 'qa-engine/ai/definitions/business-test-cases.json'),
    baseUrl: String(args.get('--base-url') || 'http://127.0.0.1:5173'),
    outputDir: String(args.get('--out-dir') || 'qa-engine/playwright/tests/generated'),
    catalogPath: String(args.get('--catalog') || 'qa-engine/ai/locator-catalog/locators.json'),
    scanLiveSite: args.get('--scan') !== false,
    automationMode: args.get('--mode') === 'all' ? 'all' : 'automated',
  };
}

await generatePlaywrightSpecs(parseArgs(process.argv.slice(2)));
console.log('Generated Playwright specs successfully.');
