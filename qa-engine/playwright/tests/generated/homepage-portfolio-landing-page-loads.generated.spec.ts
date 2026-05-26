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
 * generatedAt: 2026-05-26T12:10:14.432Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "site-brand-2",
  "label": "site-brand",
  "tagName": "div",
  "testId": "site-brand",
  "name": null,
  "role": null,
  "ariaLabel": null,
  "placeholder": null,
  "text": "Md. Atiar Rahman Chowdhury",
  "component": "Header",
  "sourceFile": "src/components/Header.tsx",
  "primary": {
    "strategy": "data-testid",
    "selector": "site-brand",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "text",
      "selector": "Md. Atiar Rahman Chowdhury",
      "score": 72,
      "source": "dom"
    },
    {
      "strategy": "css",
      "selector": "div > div.min-h-screen.bg-white > header.fixed.top-0.left-0 > div.max-w-7xl.mx-auto.px-6 > div.flex.items-center.justify-between > div.text-2xl.font-bold.text-blue-800",
      "score": 50,
      "source": "dom"
    },
    {
      "strategy": "xpath",
      "selector": "/html[0]/body[1]/div[1]/div[1]/header[1]/div[1]/div[1]/div[1]",
      "score": 30,
      "source": "dom"
    },
    {
      "strategy": "data-testid",
      "selector": "site-brand",
      "score": 98,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-05-26T12:10:16.891Z"
} as LocatorCatalogEntry;

const locatorEntry3 = {
  "key": "nav-link-contact-9",
  "label": "nav-link-contact",
  "tagName": "button",
  "testId": "nav-link-contact",
  "name": null,
  "role": null,
  "ariaLabel": "Navigate to Contact",
  "placeholder": null,
  "text": "Contact",
  "primary": {
    "strategy": "data-testid",
    "selector": "nav-link-contact",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "aria-label",
      "selector": "Navigate to Contact",
      "score": 92,
      "source": "dom"
    },
    {
      "strategy": "text",
      "selector": "Contact",
      "score": 72,
      "source": "dom"
    },
    {
      "strategy": "css",
      "selector": "div > div.min-h-screen.bg-white > header.fixed.top-0.left-0 > div.max-w-7xl.mx-auto.px-6 > div.flex.items-center.justify-between > nav.hidden.md\\:flex.items-center > button.text-gray-700.hover\\:text-blue-800.transition-colors:nth-of-type(6)",
      "score": 50,
      "source": "dom"
    },
    {
      "strategy": "xpath",
      "selector": "/html[0]/body[1]/div[1]/div[1]/header[1]/div[1]/div[1]/nav[1]/button[6]",
      "score": 30,
      "source": "dom"
    },
    {
      "strategy": "data-testid",
      "selector": "nav-link-contact",
      "score": 98,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-05-26T12:10:16.893Z"
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
    
    // step-3: Verify Contact is visible
    await app.locator(locatorEntry3).expectVisible();
  });
});
