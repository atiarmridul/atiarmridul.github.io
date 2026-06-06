import path from 'node:path';
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import { parseBusinessTestCases } from '../parser/test-case-parser';
import { extractLocatorCatalog } from '../locator-engine/locator-extractor';
import type {
  AiTestDefinition,
  LocatorCatalog,
  LocatorCatalogEntry,
  StructuredTestStep,
} from '../shared/types';
import {
  escapeForSingleQuotedString,
  readJsonFile,
  slugify,
  toPascalCase,
  writeJsonFile,
} from '../shared/utils';

interface GenerateOptions {
  inputPath: string;
  baseUrl: string;
  outputDir: string;
  catalogPath: string;
  testDataPath: string;
  scanLiveSite: boolean;
  automationMode: 'automated' | 'all';
}

export async function generatePlaywrightSpecs(options: GenerateOptions): Promise<void> {
  const parsedDefinitions = await parseBusinessTestCases(options.inputPath);
  // Shared test data keeps generated specs deterministic without embedding values in generator code.
  const sharedTestData = await readJsonFile<Record<string, string>>(options.testDataPath);
  const definitions =
    options.automationMode === 'all'
      ? parsedDefinitions
      : parsedDefinitions.filter((definition) => definition.automationMode === 'automated');
  await mkdir(options.outputDir, { recursive: true });
  await removeStaleGeneratedSpecs(options.outputDir);
  await writeJsonFile('qa-engine/ai/generated-tests/structured-test-definitions.json', definitions);

  const catalog = options.scanLiveSite
    ? await extractLocatorCatalog({ baseUrl: options.baseUrl, outputPath: options.catalogPath })
    : await readJsonFile<LocatorCatalog>(options.catalogPath);

  for (const definition of definitions) {
    const fileName = `${slugify(definition.module)}-${slugify(definition.scenario)}.generated.spec.ts`;
    await writeFile(
      path.join(options.outputDir, fileName),
      renderSpec(definition, catalog, sharedTestData),
      'utf8',
    );
  }
}

async function removeStaleGeneratedSpecs(outputDir: string): Promise<void> {
  const files = await readdir(outputDir);
  // Regeneration must reflect the current automated set; stale specs can hide removed coverage.
  await Promise.all(
    files
      .filter((fileName) => fileName.endsWith('.generated.spec.ts'))
      .map((fileName) => unlink(path.join(outputDir, fileName))),
  );
}

function renderSpec(
  definition: AiTestDefinition,
  catalog: LocatorCatalog,
  sharedTestData: Record<string, string>,
): string {
  // Resolve locator entries during generation so emitted specs stay readable and deterministic.
  const matchedEntries = definition.steps.map((step) =>
    shouldUseLocator(step) ? matchCatalogEntry(step, catalog) : undefined,
  );
  const entryConstants = matchedEntries
    .map((entry, index) =>
      entry
        ? `const locatorEntry${index + 1} = ${JSON.stringify(toGeneratedLocatorEntry(entry), null, 2)} as LocatorCatalogEntry;`
        : undefined,
    )
    .filter(Boolean)
    .join('\n\n');
  const className = `${toPascalCase(definition.module)}${toPascalCase(definition.scenario)}Page`;
  const renderedSteps = definition.steps
    .map((step, index) => renderStep(step, index, matchedEntries[index], sharedTestData))
    .join('\n\n');
  const tags = definition.tags.map((tag) => `@${tag}`).join(' ');
  const hasLocatorEntries = matchedEntries.some(Boolean);
  const imports = `import { ${renderedSteps.includes('expect(') ? 'expect, ' : ''}test } from '@playwright/test';`;
  const locatorImports = hasLocatorEntries
    ? `import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';`
    : '';
  const pageObject = hasLocatorEntries
    ? `
class ${className} {
  constructor(private readonly page: import('@playwright/test').Page) {}

  locator(entry: LocatorCatalogEntry) {
    return new SelfHealingLocator(this.page, entry, async (repair) => {
      if (repair.repaired) {
        test.info().annotations.push({
          type: 'locator-repair',
          description: \`\${entry.key}: \${repair.reason} confidence=\${repair.confidenceScore}\`,
        });
      }
      await recordLocatorRepair('qa-engine/ai/locator-catalog/locators.json', entry.key, repair);
    });
  }
}
`
    : '';
  const appSetup = hasLocatorEntries ? `    const app = new ${className}(page);\n\n` : '';

  return `${imports}
${locatorImports}

/**
 * AI Metadata
 * id: ${definition.id}
 * module: ${definition.module}
 * scenario: ${definition.scenario}
 * priority: ${definition.priority}
 * riskLevel: ${definition.riskLevel}
 * tags: ${tags}
 * generatedAt: ${definition.generatedAt}
 * confidenceScore: ${definition.confidenceScore}
 */

${entryConstants}
${pageObject}

test.describe('${escapeForSingleQuotedString(definition.module)}', () => {
  test('${escapeForSingleQuotedString(definition.scenario)} ${tags}', async ({ page }) => {
${appSetup}
${indent(renderedSteps, 4)}
  });
});
`;
}

function renderStep(
  step: StructuredTestStep,
  index: number,
  entry: LocatorCatalogEntry | undefined,
  sharedTestData: Record<string, string>,
): string {
  const comment = `// ${step.id}: ${step.businessText}`;
  const locatorRef = `locatorEntry${index + 1}`;
  const fallbackTarget = escapeForSingleQuotedString(step.targetHint || step.businessText);

  if (step.action === 'navigate') {
    return `${comment}
await page.goto('/', { waitUntil: 'networkidle' });
await expect(page).toHaveURL(/\\/$/);`;
  }

  if (step.action === 'fill') {
    const valueKey = step.valueHint || 'value';
    const value = getTestDataValue(sharedTestData, valueKey);
    if (entry) {
      return `${comment}
await app.locator(${locatorRef}).fill('${escapeForSingleQuotedString(value)}');`;
    }
    return `${comment}
await page.getByLabel('${fallbackTarget}').or(page.getByPlaceholder('${fallbackTarget}')).fill('${escapeForSingleQuotedString(value)}');`;
  }

  if (step.action === 'click') {
    if (entry) {
      return `${comment}
await app.locator(${locatorRef}).click();`;
    }
    return `${comment}
await page.getByRole('button', { name: /${escapeRegex(fallbackTarget)}/i }).or(page.getByText('${fallbackTarget}')).click();`;
  }

  if (step.action === 'assertVisible') {
    if (entry) {
      return `${comment}
await app.locator(${locatorRef}).expectVisible();`;
    }
    return `${comment}
await expect(page.getByText('${fallbackTarget}', { exact: false })).toBeVisible();`;
  }

  return `${comment}
await test.step('${escapeForSingleQuotedString(step.businessText)}', async () => {
  // Manual review recommended: the parser could not infer a deterministic Playwright action.
});`;
}

function getTestDataValue(sharedTestData: Record<string, string>, key: string): string {
  const value = sharedTestData[key] ?? sharedTestData.value;
  if (value === undefined) {
    throw new Error(`Missing generated test data value for key "${key}" and fallback key "value".`);
  }
  return value;
}

function toGeneratedLocatorEntry(entry: LocatorCatalogEntry): LocatorCatalogEntry {
  // Prefer stable test IDs in emitted specs even when the catalog kept extra recovery candidates.
  const stableTestIdCandidate = entry.testId
    ? { strategy: 'data-testid' as const, selector: entry.testId, score: 100, source: 'dom' as const }
    : undefined;
  const primary = stableTestIdCandidate || entry.primary;
  const fallbacks = [entry.primary, ...entry.fallbacks]
    .filter((candidate) => !isStructuralSelector(candidate.selector))
    .filter(
      (candidate) =>
        `${candidate.strategy}:${candidate.selector}` !== `${primary.strategy}:${primary.selector}`,
    )
    .filter((candidate, index, candidates) => {
      const key = `${candidate.strategy}:${candidate.selector}`;
      return candidates.findIndex((item) => `${item.strategy}:${item.selector}` === key) === index;
    });

  return {
    ...entry,
    primary,
    fallbacks,
  };
}

function isStructuralSelector(selector: string): boolean {
  // Structural selectors are kept out of generated specs because UI order changes often during redesigns.
  return /nth-(child|of-type)|:nth-match|\/html\[/i.test(selector);
}

function shouldUseLocator(step: StructuredTestStep): boolean {
  return step.action === 'fill' || step.action === 'click' || step.action === 'assertVisible';
}

function matchCatalogEntry(
  step: StructuredTestStep,
  catalog: LocatorCatalog,
): LocatorCatalogEntry | undefined {
  const hint = (step.targetHint || step.businessText).toLowerCase();
  // Favor exact semantic matches, but allow partial matches for business-language test steps.
  const scored = catalog.entries
    .map((entry) => {
      return { entry, score: scoreCatalogEntry(hint, entry) };
    })
    .filter((candidate) => candidate.score >= 0.35)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.entry;
}

function scoreCatalogEntry(hint: string, entry: LocatorCatalogEntry): number {
  const shortText = entry.text && entry.text.length <= 80 ? entry.text : undefined;
  const exactFields = [entry.label, entry.testId, entry.ariaLabel, entry.placeholder, entry.name, shortText]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  if (exactFields.some((value) => value === hint)) return 1;
  if (exactFields.some((value) => value.includes(hint) || hint.includes(value))) return 0.9;

  const semanticFields = [
    entry.label,
    entry.testId,
    entry.ariaLabel,
    entry.placeholder,
    entry.name,
    shortText,
    entry.component,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return scoreText(hint, semanticFields);
}

function scoreText(hint: string, candidate: string): number {
  const hintWords = hint.split(/\W+/).filter((word) => word.length > 2);
  if (hintWords.length === 0) return 0;
  const matches = hintWords.filter((word) => candidate.includes(word)).length;
  return matches / hintWords.length;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function indent(value: string, spaces: number): string {
  return value
    .split('\n')
    .map((line) => `${' '.repeat(spaces)}${line}`)
    .join('\n');
}
