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
 * generatedAt: 2026-05-26T12:10:14.432Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
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

const locatorEntry3 = {
  "key": "hero-contact-button-19",
  "label": "hero-contact-button",
  "tagName": "button",
  "testId": "hero-contact-button",
  "name": null,
  "role": null,
  "ariaLabel": "Go to contact section",
  "placeholder": null,
  "text": "Get In Touch",
  "component": "Hero",
  "sourceFile": "src/components/Hero.tsx",
  "primary": {
    "strategy": "data-testid",
    "selector": "hero-contact-button",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "aria-label",
      "selector": "Go to contact section",
      "score": 92,
      "source": "dom"
    },
    {
      "strategy": "text",
      "selector": "Get In Touch",
      "score": 72,
      "source": "dom"
    },
    {
      "strategy": "css",
      "selector": "div > div.min-h-screen.bg-white > main > section.min-h-screen.bg-gradient-to-br.from-blue-50 > div.w-full.max-w-7xl.mx-auto > div.max-w-4xl.mx-auto > div.flex.flex-col.sm\\:flex-row:nth-of-type(2) > button.border-2.border-blue-800.text-blue-800:nth-of-type(2)",
      "score": 50,
      "source": "dom"
    },
    {
      "strategy": "xpath",
      "selector": "/html[0]/body[1]/div[1]/div[1]/main[1]/section[1]/div[1]/div[1]/div[2]/button[2]",
      "score": 30,
      "source": "dom"
    },
    {
      "strategy": "data-testid",
      "selector": "hero-contact-button",
      "score": 98,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-05-26T12:10:16.894Z"
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
    
    // step-2: Click Contact
    await app.locator(locatorEntry2).click();
    
    // step-3: Verify Get In Touch is visible
    await app.locator(locatorEntry3).expectVisible();
  });
});
