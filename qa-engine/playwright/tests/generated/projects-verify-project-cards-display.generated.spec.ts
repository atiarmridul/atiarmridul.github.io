import { expect, test } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';

/**
 * AI Metadata
 * id: AI_TC_PROJECTS_001
 * module: Projects
 * scenario: verify project cards display
 * priority: Medium
 * riskLevel: Low
 * tags: @projects @expanded
 * generatedAt: 2026-06-05T17:03:11.057Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "frameworks-toolsi-ve-built-recently-17",
  "label": "Frameworks & toolsI've built recently.",
  "tagName": "h2",
  "testId": null,
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "Frameworks & toolsI've built recently.",
  "primary": {
    "strategy": "text",
    "selector": "Frameworks & toolsI've built recently.",
    "score": 72,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "css",
      "selector": "div > div > main > section.section.wrap > div.section-head > h2.section-title.reveal",
      "score": 50,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.297Z"
} as LocatorCatalogEntry;

class ProjectsVerifyProjectCardsDisplayPage {
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


test.describe('Projects', () => {
  test('verify project cards display @projects @expanded', async ({ page }) => {
    const app = new ProjectsVerifyProjectCardsDisplayPage(page);


    // step-1: Open homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
    
    // step-2: Verify Frameworks & tools is visible
    await app.locator(locatorEntry2).expectVisible();
  });
});
