import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import type { ComponentMapping, LocatorCandidate } from '../shared/types';

const SELECTOR_PATTERNS: Array<{ strategy: LocatorCandidate['strategy']; regex: RegExp; score: number }> = [
  { strategy: 'data-testid', regex: /data-testid=["']([^"']+)["']/g, score: 100 },
  { strategy: 'aria-label', regex: /aria-label=["']([^"']+)["']/g, score: 92 },
  { strategy: 'name', regex: /name=["']([^"']+)["']/g, score: 84 },
  { strategy: 'placeholder', regex: /placeholder=["']([^"']+)["']/g, score: 82 },
  { strategy: 'css', regex: /id=["']([^"']+)["']/g, score: 75 },
  { strategy: 'css', regex: /className=["']([^"']+)["']/g, score: 55 },
];

export async function analyzeSourceCode(rootDir = 'src'): Promise<ComponentMapping[]> {
  const files = await glob(`${rootDir.replace(/\/$/, '')}/**/*.{tsx,jsx}`, {
    ignore: ['**/*.test.*', '**/*.spec.*'],
  });

  return Promise.all(files.map(analyzeComponentFile));
}

async function analyzeComponentFile(filePath: string): Promise<ComponentMapping> {
  const source = await readFile(filePath, 'utf8');
  const componentName = detectComponentName(source, filePath);
  const selectors = extractSelectors(source);
  const textHints = [...source.matchAll(/>([^<>{}\n][^<>{}]*)</g)]
    .map((match) => match[1].replace(/\s+/g, ' ').trim())
    .filter((text) => text.length > 2 && text.length < 80);

  return {
    componentName,
    filePath,
    exported: /export\s+default|export\s+(function|const)/.test(source),
    props: extractProps(source, componentName),
    selectors,
    textHints: [...new Set(textHints)],
  };
}

function detectComponentName(source: string, filePath: string): string {
  const functionMatch = source.match(/function\s+([A-Z][A-Za-z0-9_]*)\s*\(/);
  if (functionMatch) return functionMatch[1];

  const constMatch = source.match(/const\s+([A-Z][A-Za-z0-9_]*)\s*=/);
  if (constMatch) return constMatch[1];

  return path.basename(filePath).replace(/\.(tsx|jsx)$/i, '');
}

function extractSelectors(source: string): LocatorCandidate[] {
  const candidates: LocatorCandidate[] = [];

  for (const pattern of SELECTOR_PATTERNS) {
    for (const match of source.matchAll(pattern.regex)) {
      const raw = match[1].trim();
      if (!raw) continue;
      candidates.push({
        strategy: pattern.strategy,
        selector: toSelector(pattern.strategy, raw),
        score: pattern.score,
        source: 'source',
      });
    }
  }

  return dedupeCandidates(candidates);
}

function toSelector(strategy: LocatorCandidate['strategy'], raw: string): string {
  if (strategy === 'data-testid') return raw;
  if (strategy === 'aria-label') return raw;
  if (strategy === 'name') return raw;
  if (strategy === 'placeholder') return raw;
  if (strategy === 'css' && !raw.includes(' ')) return raw.startsWith('#') ? raw : `#${raw}`;
  if (strategy === 'css')
    return raw
      .split(/\s+/)
      .filter(Boolean)
      .map((className) => `.${className}`)
      .join('');
  return raw;
}

function extractProps(source: string, componentName: string): string[] {
  const inlineProps = source.match(new RegExp(`${componentName}\\s*\\((\\{[^)]*\\})\\)`));
  if (!inlineProps) return [];

  return inlineProps[1]
    .replace(/[{}]/g, '')
    .split(',')
    .map((prop) => prop.trim().split(/[:=]/)[0]?.trim())
    .filter(Boolean);
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

if (process.argv[1]?.endsWith('source-code-mapper.ts')) {
  console.log(JSON.stringify(await analyzeSourceCode(process.argv[2] || 'src'), null, 2));
}
