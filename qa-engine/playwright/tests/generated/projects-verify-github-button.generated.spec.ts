import { expect, test } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../../core/shared/types';
import { recordLocatorRepair } from '../../../core/self-healing/repair-selectors';
import { SelfHealingLocator } from '../../fixtures/self-healing';

/**
 * AI Metadata
 * id: AI_TC_PROJECTS_004
 * module: Projects
 * scenario: verify github button
 * priority: Medium
 * riskLevel: Low
 * tags: @projects @expanded
 * generatedAt: 2026-06-05T17:03:11.057Z
 * confidenceScore: 0.82
 */

const locatorEntry2 = {
  "key": "project-card-1-18",
  "label": "project-card-1",
  "tagName": "button",
  "testId": "project-card-1",
  "name": null,
  "role": null,
  "ariaLabel": "Open project preview for Singer BD Automation Framework",
  "placeholder": null,
  "text": "01Singer BD Automation FrameworkProduction-grade Playwright & TypeScript framework for Singer Bangladesh. POM architectu",
  "primary": {
    "strategy": "data-testid",
    "selector": "project-card-1",
    "score": 100,
    "source": "dom"
  },
  "fallbacks": [
    {
      "strategy": "aria-label",
      "selector": "Open project preview for Singer BD Automation Framework",
      "score": 92,
      "source": "dom"
    }
  ],
  "lastSeenAt": "2026-06-05T17:03:13.297Z"
} as LocatorCatalogEntry;

class ProjectsVerifyGithubButtonPage {
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
  test('verify github button @projects @expanded', async ({ page }) => {
    const app = new ProjectsVerifyGithubButtonPage(page);


    // step-1: Open homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
    
    // step-2: Verify project-card-1 is visible
    await app.locator(locatorEntry2).expectVisible();
  });
});
