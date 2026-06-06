import { expect, test } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';

/**
 * AI Metadata
 * id: AI_TC_SMOKE_001
 * module: Homepage
 * scenario: Portfolio landing page loads
 * priority: High
 * riskLevel: Medium
 * tags: @smoke @homepage
 * generatedAt: 2026-06-05T17:03:11.057Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "md-atiarrahman-chowdhury-13",
  "label": "Md. AtiarRahman Chowdhury",
  "tagName": "h1",
  "testId": null,
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "Md. AtiarRahman Chowdhury",
  "primary": {
    "strategy": "text",
    "selector": "Md. AtiarRahman Chowdhury",
    "score": 72,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "css",
      "selector": "div > div > main > header.hero.wrap > h1",
      "score": 50,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.297Z"
} as LocatorCatalogEntry;

const locatorEntry3 = {
  "key": "site-header-1",
  "label": "site-header",
  "tagName": "nav",
  "testId": "site-header",
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "AAtiar R. Chowdhury01Work02About03Skills04Experience05ContactResume",
  "component": "RESUME_URL",
  "sourceFile": "src/components/Header.tsx",
  "primary": {
    "strategy": "data-testid",
    "selector": "site-header",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "text",
      "selector": "AAtiar R. Chowdhury01Work02About03Skills04Experience05ContactResume",
      "score": 72,
      "source": "dom"
    },
    {
      "strategy": "css",
      "selector": "#nav",
      "score": 70,
      "source": "dom"
    },
    {
      "strategy": "xpath",
      "selector": "//*[@id=\"nav\"]",
      "score": 30,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.294Z"
} as LocatorCatalogEntry;

class HomepagePortfolioLandingPageLoadsPage {
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


test.describe('Homepage', () => {
  test('Portfolio landing page loads @smoke @homepage', async ({ page }) => {
    const app = new HomepagePortfolioLandingPageLoadsPage(page);


    // step-1: Open homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
    
    // step-2: Verify Md. Atiar Rahman Chowdhury is visible
    await app.locator(locatorEntry2).expectVisible();
    
    // step-3: Verify Work is visible
    await app.locator(locatorEntry3).expectVisible();
  });
});
