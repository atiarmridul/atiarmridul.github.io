import { expect, test } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';

/**
 * AI Metadata
 * id: AI_TC_SMOKE_002
 * module: Navigation
 * scenario: Navigate to contact section
 * priority: Medium
 * riskLevel: Low
 * tags: @navigation @contact
 * generatedAt: 2026-06-05T17:03:11.057Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "nav-link-contact-7",
  "label": "nav-link-contact",
  "tagName": "button",
  "testId": "nav-link-contact",
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "05Contact",
  "primary": {
    "strategy": "data-testid",
    "selector": "nav-link-contact",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "text",
      "selector": "05Contact",
      "score": 72,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.295Z"
} as LocatorCatalogEntry;

const locatorEntry3 = {
  "key": "let-s-shipquality-together-156",
  "label": "Let's shipquality together →",
  "tagName": "h2",
  "testId": null,
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "Let's shipquality together →",
  "primary": {
    "strategy": "text",
    "selector": "Let's shipquality together →",
    "score": 72,
    "source": "dom"
  },
  "fallbacks": [],
  "lastSeenAt": "2026-06-05T17:03:13.309Z"
} as LocatorCatalogEntry;

class NavigationNavigateToContactSectionPage {
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
  test('Navigate to contact section @navigation @contact', async ({ page }) => {
    const app = new NavigationNavigateToContactSectionPage(page);


    // step-1: Open homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
    
    // step-2: Click nav-link-contact
    await app.locator(locatorEntry2).click();
    
    // step-3: Verify Let's ship quality together is visible
    await app.locator(locatorEntry3).expectVisible();
  });
});
