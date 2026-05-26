import { expect, type Page, type Response } from '@playwright/test';
import type { LocatorCatalogEntry } from '../../core/shared/types';
import { SelfHealingLocator } from '../fixtures/self-healing';
import { PageLoadError } from '../utils/exceptions';

export class BasePage {
  constructor(protected readonly page: Page) {}

  byCatalog(entry: LocatorCatalogEntry): SelfHealingLocator {
    return new SelfHealingLocator(this.page, entry);
  }

  async open(path = '/'): Promise<void> {
    const response = await this.page.goto(path, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) {
      throw new PageLoadError(`Failed to load ${path}`, this.page.url());
    }
  }

  async assertReady(selector = 'body'): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async waitForNetworkResponse(
    matcher: string | RegExp | ((response: Response) => boolean),
    action: () => Promise<unknown>,
  ): Promise<Response> {
    const responsePromise = this.page.waitForResponse(matcher);
    await action();
    return responsePromise;
  }

  async dismissBlockingOverlays(): Promise<void> {
    const dismissButtons = this.page.getByRole('button', {
      name: /^(close|dismiss|accept|got it|no thanks)$/i,
    });
    const count = Math.min(await dismissButtons.count(), 3);
    for (let index = 0; index < count; index += 1) {
      const button = dismissButtons.nth(index);
      if (await button.isVisible().catch(() => false)) {
        await button.click();
      }
    }
  }
}
