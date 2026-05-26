import { defineConfig, devices } from '@playwright/test';
import { resolveQaConfig } from './qa-engine/playwright/config/config';

const qaConfig = resolveQaConfig();

export default defineConfig({
  testDir: './qa-engine/playwright/tests',
  outputDir: './qa-engine/output/test-artifacts',
  timeout: 30_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { outputFolder: 'qa-engine/output/reports/html' }], ['list']],
  use: {
    baseURL: qaConfig.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: qaConfig.skipWebServer
    ? undefined
    : {
        command: 'npm run dev -- --host 127.0.0.1 --strictPort',
        url: qaConfig.baseUrl,
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
