import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

type BusinessCase = {
  module?: string;
  tags?: string[];
  automationMode?: string;
};

const failures: string[] = [];

function fail(message: string) {
  failures.push(message);
}

function walkFiles(rootDir: string, pattern: RegExp): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(rootDir)) {
    const filePath = path.join(rootDir, entry);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      files.push(...walkFiles(filePath, pattern));
    } else if (pattern.test(filePath)) {
      files.push(filePath);
    }
  }

  return files;
}

function checkInteractiveTestIds() {
  const files = walkFiles('src', /\.(tsx|jsx)$/);
  // Keep this intentionally simple: it catches missing selectors on direct interactive JSX tags.
  const interactiveTag = /<(button|a|input|textarea|select)\b[^>]*>/gs;

  for (const filePath of files) {
    const source = readFileSync(filePath, 'utf8');
    let match: RegExpExecArray | null;
    while ((match = interactiveTag.exec(source))) {
      const tag = match[0];
      if (!/data-testid\s*=/.test(tag)) {
        const line = source.slice(0, match.index).split('\n').length;
        fail(`${filePath}:${line} interactive <${match[1]}> is missing data-testid`);
      }
    }
  }
}

function checkGeneratedSpecs() {
  const specDir = 'qa-engine/playwright/tests/generated';
  const specs = existsSync(specDir) ? walkFiles(specDir, /\.generated\.spec\.ts$/) : [];

  if (specs.length === 0) {
    fail('No generated Playwright specs found.');
  }

  for (const specPath of specs) {
    const source = readFileSync(specPath, 'utf8');
    // Generated specs should rely on cataloged stable locators, not brittle DOM position.
    if (/nth-(child|of-type)|:nth-match|\/html\[/i.test(source)) {
      fail(`${specPath} contains a structural selector fallback.`);
    }
    if (/getByText\(/.test(source)) {
      fail(`${specPath} contains a text-only locator.`);
    }
  }
}

function checkQaStructure() {
  for (const dir of ['tests', 'pages', 'fixtures', 'utils', 'test-data']) {
    const fullPath = path.join('qa-engine/playwright', dir);
    if (!existsSync(fullPath)) {
      fail(`Missing Playwright QA directory: ${fullPath}`);
    }
  }

  if (!existsSync('qa-engine/playwright/test-data/generated-test-data.json')) {
    fail('Missing reusable generated test data file.');
  }
}

function checkCoverageDefinitions() {
  const raw = readFileSync('qa-engine/ai/definitions/business-test-cases.json', 'utf8');
  const cases = JSON.parse(raw) as BusinessCase[];
  const tags = new Set(cases.flatMap((testCase) => testCase.tags || []));
  const modules = new Set(cases.map((testCase) => testCase.module).filter(Boolean));
  const requiredTags = [
    'navigation',
    'homepage',
    'about',
    'skills',
    'projects',
    'contact',
    'responsive',
    'performance',
    'security',
    'cross-browser',
    'theme',
  ];

  // These tags represent the minimum portfolio-wide coverage categories from the project rules.
  for (const tag of requiredTags) {
    if (!tags.has(tag)) {
      fail(`Missing business test coverage tag: ${tag}`);
    }
  }

  for (const moduleName of ['Navigation', 'Homepage', 'About', 'Skills', 'Projects', 'Contact']) {
    if (!modules.has(moduleName)) {
      fail(`Missing business test coverage module: ${moduleName}`);
    }
  }
}

function checkGeneratorRules() {
  const source = readFileSync('qa-engine/core/generator/generate-test.ts', 'utf8');
  if (/DEFAULT_TEST_DATA/.test(source)) {
    fail('Generator still contains hardcoded DEFAULT_TEST_DATA.');
  }
  if (!/testDataPath/.test(source)) {
    fail('Generator does not expose a reusable test data path.');
  }
  if (!/removeStaleGeneratedSpecs/.test(source)) {
    fail('Generator does not remove stale generated specs.');
  }
}

function checkPlaywrightMatrix() {
  const source = readFileSync('playwright.config.ts', 'utf8');
  // The matrix names are validated as source text so config drift is caught before test execution.
  const requiredProjects = [
    'chromium',
    'desktop-1920',
    'tablet-768',
    'mobile-375',
    'firefox',
    'edge',
    'webkit',
  ];

  for (const project of requiredProjects) {
    if (!source.includes(`name: '${project}'`)) {
      fail(`Missing Playwright project: ${project}`);
    }
  }
}

checkInteractiveTestIds();
checkGeneratedSpecs();
checkQaStructure();
checkCoverageDefinitions();
checkGeneratorRules();
checkPlaywrightMatrix();

if (failures.length > 0) {
  console.error(`QA rule validation failed with ${failures.length} issue(s):`);
  for (const message of failures) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log('QA rule validation passed.');
