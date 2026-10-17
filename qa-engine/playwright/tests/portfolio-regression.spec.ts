import { expect, test } from '@playwright/test';

test.describe('Portfolio regression', () => {
  test('keeps the homepage within a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByTestId('section-hero')).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('opens and closes a project preview', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByTestId('project-card-2').click();

    const dialog = page.getByTestId('project-preview-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Telco OTP Relay' })).toBeVisible();

    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.width).toBeLessThanOrEqual(375);

    await page.getByTestId('project-preview-close-button').click();
    await expect(dialog).toBeHidden();
  });

  test('does not expose a repository link for the private project', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByTestId('project-card-3').click();

    const dialog = page.getByTestId('project-preview-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'PortRobi-Work-Life' })).toBeVisible();
    await expect(page.getByTestId('project-preview-github-link')).toHaveCount(0);
    await expect(dialog.locator('p').filter({ hasText: 'Private repository' })).toBeVisible();
  });

  test('shows contact fields and valid external contact links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const name = page.getByTestId('contact-name-input');
    const email = page.getByTestId('contact-email-input');
    const subject = page.getByTestId('contact-subject-input');
    const message = page.getByTestId('contact-message-textarea');

    await expect(name).toBeVisible();
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute('type', 'email');
    await expect(subject).toBeVisible();
    await expect(message).toBeVisible();
    await expect(name).toHaveAttribute('required', '');
    await expect(email).toHaveAttribute('required', '');
    await expect(subject).toHaveAttribute('required', '');
    await expect(message).toHaveAttribute('required', '');

    await expect(page.getByTestId('contact-github-link')).toHaveAttribute(
      'href',
      'https://github.com/atiarmridul',
    );
    await expect(page.getByTestId('contact-linkedin-link')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/atiarmridul/',
    );
    await expect(page.getByTestId('contact-whatsapp-link')).toHaveAttribute(
      'href',
      'https://wa.me/8801916204614',
    );
  });
});
