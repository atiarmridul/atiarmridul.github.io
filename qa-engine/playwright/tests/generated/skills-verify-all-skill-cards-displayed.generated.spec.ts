import { expect, test } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';

/**
 * AI Metadata
 * id: AI_TC_SKILLS_001
 * module: Skills
 * scenario: verify all skill cards displayed
 * priority: Medium
 * riskLevel: Low
 * tags: @skills @expanded
 * generatedAt: 2026-06-05T17:03:11.057Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "skills-eyebrow-31",
  "label": "skills-eyebrow",
  "tagName": "span",
  "testId": "skills-eyebrow",
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "Toolkit",
  "component": "Skills",
  "sourceFile": "src/components/Skills.tsx",
  "primary": {
    "strategy": "data-testid",
    "selector": "skills-eyebrow",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "text",
      "selector": "Toolkit",
      "score": 72,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.298Z"
} as LocatorCatalogEntry;

class SkillsVerifyAllSkillCardsDisplayedPage {
  constructor(private readonly page: import('@playwright/test').Page) {}

  locator(entry: LocatorCatalogEntry) {
    return new SelfHealingLocator(this.page, entry, async (repair) => {
      if (repair.repaired) {
        test.info().annotations.push({
          type: 'locator-repair',
          description: `${entry.key}: ${repair.reason} confidence=${repair.confidenceScore}`,
        });
      }
      await recordLocatorRepair('qa-engine/ai/locator-catalog/locators.json', entry.key, repair);
    });
  }
}


test.describe('Skills', () => {
  test('verify all skill cards displayed @skills @expanded', async ({ page }) => {
    const app = new SkillsVerifyAllSkillCardsDisplayedPage(page);


    // step-1: Open homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
    
    // step-2: Verify Toolkit is visible
    await app.locator(locatorEntry2).expectVisible();
  });
});
