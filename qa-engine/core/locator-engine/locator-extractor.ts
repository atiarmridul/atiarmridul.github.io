import { chromium, type Page } from '@playwright/test';
import { analyzeSourceCode } from './source-code-mapper';
import type {
  ComponentMapping,
  LocatorCandidate,
  LocatorCatalog,
  LocatorCatalogEntry,
} from '../shared/types';
import { slugify, writeJsonFile } from '../shared/utils';

interface DomElementSnapshot {
  tagName: string;
  id: string | null;
  name: string | null;
  className: string | null;
  testId: string | null;
  ariaLabel: string | null;
  role: string | null;
  placeholder: string | null;
  text: string | null;
  css: string;
  xpath: string;
}

export async function extractLocatorCatalog(options: {
  baseUrl: string;
  outputPath?: string;
  sourceRoot?: string;
}): Promise<LocatorCatalog> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(options.baseUrl, { waitUntil: 'networkidle' });
    const [domElements, components] = await Promise.all([
      collectDomElements(page),
      analyzeSourceCode(options.sourceRoot || 'src'),
    ]);
    const catalog = buildCatalog(options.baseUrl, domElements, components);

    if (options.outputPath) {
      await writeJsonFile(options.outputPath, catalog);
    }

    return catalog;
  } finally {
    await browser.close();
  }
}

async function collectDomElements(page: Page): Promise<DomElementSnapshot[]> {
  const browserScript = String.raw`
  (() => {
    const interactiveSelector = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      '[role]',
      '[aria-label]',
      '[data-testid]',
      '[placeholder]',
      'section',
      'h1',
      'h2',
      'h3',
    ].join(',');

    const getCssPath = (element) => {
      if (element.id) return '#' + CSS.escape(element.id);
      const parts = [];
      let current = element;

      while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body) {
        const tag = current.tagName.toLowerCase();
        const classSelector = Array.from(current.classList)
          .slice(0, 3)
          .map((className) => '.' + CSS.escape(className))
          .join('');
        const parent = current.parentElement;
        const sameTagIndex = parent
          ? Array.from(parent.children)
              .filter((child) => child.tagName === current?.tagName)
              .indexOf(current) + 1
          : 1;
        parts.unshift(tag + classSelector + (sameTagIndex > 1 ? ':nth-of-type(' + sameTagIndex + ')' : ''));
        current = parent;
      }

      return parts.join(' > ');
    };

    const getXPath = (element) => {
      if (element.id) return '//*[@id="' + element.id + '"]';
      const parts = [];
      let current = element;

      while (current && current.nodeType === Node.ELEMENT_NODE) {
        const tag = current.tagName.toLowerCase();
        const siblings = current.parentElement
          ? Array.from(current.parentElement.children).filter((child) => child.tagName === current?.tagName)
          : [];
        const index = siblings.indexOf(current) + 1;
        parts.unshift(tag + '[' + index + ']');
        current = current.parentElement;
      }

      return '/' + parts.join('/');
    };

    return Array.from(document.querySelectorAll(interactiveSelector)).map((element) => ({
      tagName: element.tagName.toLowerCase(),
      id: element.id || null,
      name: element.getAttribute('name'),
      className: element.getAttribute('class'),
      testId: element.getAttribute('data-testid'),
      ariaLabel: element.getAttribute('aria-label'),
      role: element.getAttribute('role'),
      placeholder: element.getAttribute('placeholder'),
      text: element.textContent?.replace(/\s+/g, ' ').trim().slice(0, 120) || null,
      css: getCssPath(element),
      xpath: getXPath(element),
    }));
  })()
  `;

  return page.evaluate(browserScript) as Promise<DomElementSnapshot[]>;
}

function buildCatalog(
  baseUrl: string,
  elements: DomElementSnapshot[],
  components: ComponentMapping[],
): LocatorCatalog {
  const entries = elements.map((element, index) => {
    const candidates = rankCandidates(element);
    const label =
      element.testId ||
      element.ariaLabel ||
      element.placeholder ||
      element.text ||
      element.id ||
      `${element.tagName}-${index}`;
    const sourceComponent = findSourceComponent(label, components);

    const primary = candidates[0];

    return {
      key: `${slugify(label)}-${index}`,
      label,
      tagName: element.tagName,
      testId: element.testId,
      name: element.name,
      role: element.role,
      ariaLabel: element.ariaLabel,
      placeholder: element.placeholder,
      text: element.text,
      component: sourceComponent?.componentName,
      sourceFile: sourceComponent?.filePath,
      primary,
      fallbacks: buildFallbackCandidates(element, candidates.slice(1)),
      lastSeenAt: new Date().toISOString(),
    } satisfies LocatorCatalogEntry;
  });

  return {
    baseUrl,
    generatedAt: new Date().toISOString(),
    entries,
    components,
  };
}

function rankCandidates(element: DomElementSnapshot): LocatorCandidate[] {
  const candidates: LocatorCandidate[] = [];

  if (element.testId)
    candidates.push({ strategy: 'data-testid', selector: element.testId, score: 100, source: 'dom' });
  if (element.ariaLabel)
    candidates.push({ strategy: 'aria-label', selector: element.ariaLabel, score: 92, source: 'dom' });
  if (element.role && element.text)
    candidates.push({
      strategy: 'role',
      selector: `${element.role}::${element.text}`,
      score: 88,
      source: 'dom',
    });
  if (element.name) candidates.push({ strategy: 'name', selector: element.name, score: 84, source: 'dom' });
  if (element.placeholder)
    candidates.push({ strategy: 'placeholder', selector: element.placeholder, score: 82, source: 'dom' });
  if (element.text && element.text.length < 80)
    candidates.push({ strategy: 'text', selector: element.text, score: 72, source: 'dom' });
  if (element.id) candidates.push({ strategy: 'css', selector: `#${element.id}`, score: 70, source: 'dom' });
  if (element.css) candidates.push({ strategy: 'css', selector: element.css, score: 50, source: 'dom' });
  if (element.xpath)
    candidates.push({ strategy: 'xpath', selector: element.xpath, score: 30, source: 'dom' });

  return candidates.sort((a, b) => b.score - a.score);
}

function buildFallbackCandidates(
  element: DomElementSnapshot,
  rankedFallbacks: LocatorCandidate[],
): LocatorCandidate[] {
  const fallbacks = [...rankedFallbacks];

  if (element.testId) {
    fallbacks.push({
      strategy: 'data-testid',
      selector: element.testId,
      score: 98,
      source: 'dom',
    });
  }

  return dedupeCandidates(fallbacks);
}

function dedupeCandidates(candidates: LocatorCandidate[]): LocatorCandidate[] {
  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    const key = `${candidate.strategy}:${candidate.selector}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function findSourceComponent(label: string, components: ComponentMapping[]): ComponentMapping | undefined {
  const normalizedLabel = label.toLowerCase();
  return components.find((component) => {
    const selectorMatch = component.selectors.some((selector) =>
      selector.selector.toLowerCase().includes(normalizedLabel),
    );
    const textMatch = component.textHints.some((text) => text.toLowerCase().includes(normalizedLabel));
    return selectorMatch || textMatch;
  });
}

if (process.argv[1]?.endsWith('locator-extractor.ts')) {
  const baseUrl = process.argv[2] || 'http://localhost:5173';
  const outputPath = process.argv[3] || 'qa-engine/ai/locator-catalog/locators.json';
  await extractLocatorCatalog({ baseUrl, outputPath });
  console.log(`Locator catalog written to ${outputPath}`);
}
