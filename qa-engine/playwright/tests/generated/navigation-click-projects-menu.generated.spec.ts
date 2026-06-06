import { expect, test } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';

/**
 * AI Metadata
 * id: AI_TC_NAVIGATION_004
 * module: Navigation
 * scenario: click projects menu
 * priority: Medium
 * riskLevel: Low
 * tags: @navigation @expanded
 * generatedAt: 2026-06-05T17:03:11.057Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "nav-link-projects-3",
  "label": "nav-link-projects",
  "tagName": "button",
  "testId": "nav-link-projects",
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "01Work",
  "primary": {
    "strategy": "data-testid",
    "selector": "nav-link-projects",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "text",
      "selector": "01Work",
      "score": 72,
      "source": "dom"
    },
    {
      "strategy": "css",
      "selector": "div > div > nav.nav > div.nav-links > button.nav-page",
      "score": 50,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.294Z"
} as LocatorCatalogEntry;

class NavigationClickProjectsMenuPage {
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


test.describe('Navigation', () => {
  test('click projects menu @navigation @expanded', async ({ page }) => {
    const app = new NavigationClickProjectsMenuPage(page);


    // step-1: Open homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
    
    // step-2: Click 01Work
    await app.locator(locatorEntry2).click();
  });
});
