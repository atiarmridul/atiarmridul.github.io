import { expect, type Locator, type Page } from '@playwright/test';
import type { LocatorCandidate, LocatorCatalogEntry, LocatorRepairResult } from '../../core/shared/types';
import { LocatorHealingError } from '../utils/exceptions';

const SEMANTIC_CANDIDATE_SELECTOR =
  'a,button,input,textarea,select,[role],[aria-label],[placeholder],[data-testid],[name]';
const MAX_SEMANTIC_CANDIDATES = 80;

export class SelfHealingLocator {
  constructor(
    private readonly page: Page,
    private readonly entry: LocatorCatalogEntry,
    private readonly onRepair?: (result: LocatorRepairResult) => Promise<void> | void,
  ) {}

  async locator(): Promise<Locator> {
    const candidates = dedupeCandidates([this.entry.primary, ...this.entry.fallbacks]);
    const matchedLocator = await this.findUsableLocator(candidates);

    if (matchedLocator) {
      return matchedLocator;
    }

    // Generated nav locators may target desktop links while the active viewport exposes only the mobile menu.
    if (await this.openMobileNavigationIfNeeded()) {
      const responsiveMatch = await this.findUsableLocator(candidates);
      if (responsiveMatch) {
        return responsiveMatch;
      }
    }

    // Semantic recovery is the last resort because it is broader and less deterministic than catalog selectors.
    const semanticLocator = await this.findBySemanticSimilarity();
    if (semanticLocator) {
      return semanticLocator;
    }

    throw new LocatorHealingError(
      `Unable to locate element "${this.entry.label}" with primary or fallback selectors.`,
      this.entry.key,
    );
  }

  async click(): Promise<void> {
    await (await this.locator()).first().click();
  }

  async fill(value: string): Promise<void> {
    await (await this.locator()).first().fill(value);
  }

  async expectVisible(): Promise<void> {
    await expect((await this.locator()).first()).toBeVisible();
  }

  private toPlaywrightLocator(candidate: LocatorCandidate): Locator {
    if (candidate.strategy === 'data-testid') return this.page.getByTestId(candidate.selector);
    if (candidate.strategy === 'aria-label') return this.page.getByLabel(candidate.selector);
    if (candidate.strategy === 'name') return this.page.locator(`[name="${cssEscape(candidate.selector)}"]`);
    if (candidate.strategy === 'placeholder') return this.page.getByPlaceholder(candidate.selector);
    if (candidate.strategy === 'text') return this.page.getByText(candidate.selector, { exact: false });
    if (candidate.strategy === 'role') {
      const [role, name] = candidate.selector.split('::');
      return this.page.getByRole(role as Parameters<Page['getByRole']>[0], name ? { name } : undefined);
    }
    if (candidate.strategy === 'xpath') return this.page.locator(`xpath=${candidate.selector}`);
    return this.page.locator(candidate.selector);
  }

  private async findUsableLocator(candidates: LocatorCandidate[]): Promise<Locator | undefined> {
    for (const candidate of candidates) {
      const locator = this.toPlaywrightLocator(candidate);
      const visibleLocator = locator.filter({ visible: true });
      if (await this.isUsable(visibleLocator)) {
        if (candidate !== this.entry.primary) {
          // Promote successful fallbacks so future generated runs start with the selector that actually worked.
          await this.onRepair?.({
            repaired: true,
            oldLocator: this.entry.primary,
            repairedLocator: { ...candidate, source: 'healed' },
            confidenceScore: Math.min(candidate.score / 100, 0.95),
            reason: `Primary locator failed; visible fallback ${candidate.strategy} matched.`,
            timestamp: new Date().toISOString(),
          });
        }
        return visibleLocator;
      }
    }

    return undefined;
  }

  private async isUsable(locator: Locator): Promise<boolean> {
    try {
      return (await locator.count()) > 0 && (await locator.first().isVisible({ timeout: 750 }));
    } catch {
      return false;
    }
  }

  private async openMobileNavigationIfNeeded(): Promise<boolean> {
    const targetsNavigationLink =
      this.entry.testId?.startsWith('nav-link-') ||
      this.entry.label.startsWith('nav-link-') ||
      this.entry.ariaLabel?.startsWith('Navigate to ');

    if (!targetsNavigationLink) return false;

    const toggle = this.page.getByTestId('mobile-menu-toggle');
    if (!(await this.isUsable(toggle))) return false;

    if ((await toggle.getAttribute('aria-expanded')) !== 'true') {
      await toggle.click();
    }

    return true;
  }

  private async findBySemanticSimilarity(): Promise<Locator | undefined> {
    const label = this.entry.label.toLowerCase();
    // Cap candidates to keep recovery predictable on content-heavy pages.
    const candidates = await this.page.locator(SEMANTIC_CANDIDATE_SELECTOR).evaluateAll(
      (elements, maxCandidates) =>
        elements.slice(0, Number(maxCandidates)).map((element, index) => ({
          index,
          text: [
            element.getAttribute('data-testid') || '',
            element.getAttribute('aria-label') || '',
            element.getAttribute('name') || '',
            element.getAttribute('placeholder') || '',
            element.textContent || '',
          ]
            .join(' ')
            .toLowerCase(),
        })),
      MAX_SEMANTIC_CANDIDATES,
    );
    const best = candidates
      .map((candidate) => ({ ...candidate, score: similarity(label, candidate.text) }))
      .sort((a, b) => b.score - a.score)[0];

    if (!best || best.score < 0.55) return undefined;

    await this.onRepair?.({
      repaired: true,
      oldLocator: this.entry.primary,
      repairedLocator: {
        strategy: 'css',
        selector: `:nth-match(${SEMANTIC_CANDIDATE_SELECTOR}, ${best.index + 1})`,
        score: 55,
        source: 'healed',
      },
      confidenceScore: best.score,
      reason: 'Recovered by semantic similarity against visible DOM text and labels.',
      timestamp: new Date().toISOString(),
    });

    return this.page.locator(SEMANTIC_CANDIDATE_SELECTOR).nth(best.index).filter({ visible: true });
  }
}

function cssEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function similarity(a: string, b: string): number {
  const left = new Set(a.split(/\W+/).filter(Boolean));
  const right = new Set(b.split(/\W+/).filter(Boolean));
  const overlap = [...left].filter((word) => right.has(word)).length;
  return overlap / Math.max(left.size, 1);
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
