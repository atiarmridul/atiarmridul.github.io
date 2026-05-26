import { expect, type Page, type Response } from '@playwright/test';
import type { StructuredTestStep } from '../shared/types';

export async function runSmartAssertion(page: Page, step: StructuredTestStep): Promise<void> {
  const target = step.targetHint || step.expectedResult || step.businessText;

  if (step.action === 'assertUrl') {
    await expect(page).toHaveURL(new RegExp(escapeRegex(target), 'i'));
    return;
  }

  if (step.action === 'assertText' || step.action === 'assertVisible') {
    await expect(page.getByText(target, { exact: false }).first()).toBeVisible();
    return;
  }

  await expect(page.locator('body')).toBeVisible();
}

export async function expectSuccessfulResponse(response: Response): Promise<void> {
  expect(response.ok(), `${response.status()} ${response.url()}`).toBe(true);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
