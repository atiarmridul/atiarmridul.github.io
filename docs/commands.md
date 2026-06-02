# Commands

Common commands for local development, QA generation, and verification.

## App Commands

```sh
npm run dev
npm run build
npm run preview
npm run deploy
```

## Quality Commands

```sh
npm run typecheck
npm run typecheck:qa
npm run lint
npm run format:check
npm run quality
npm run ci:verify
```

Use `npm run quality` before committing app or framework changes.
Use `npm run ci:verify` to match the non-browser verification run in GitHub Actions.

## QA Framework Commands

Create the sample Excel input:

```sh
npm run qa:sample-excel
```

Parse JSON business cases:

```sh
npm run qa:parse
```

Scan the local website and write the locator catalog:

```sh
npm run dev
npm run qa:scan
```

Generate Playwright specs:

```sh
npm run qa:generate
```

Run generated tests:

```sh
npm run test:e2e
npm run test:e2e -- --project=chromium
```

Run tests against the deployed site:

```sh
PLAYWRIGHT_BASE_URL=https://atiarmridul.github.io PLAYWRIGHT_SKIP_WEBSERVER=true npm run test:e2e
```

## UI Redesign Verification

After visual or layout changes, run:

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Then manually inspect:

- hero desktop and mobile views
- header on dark and light sections
- mobile navigation menu
- project architecture modal
- contact form on mobile

## Playwright Debug Commands

```sh
npx playwright test --debug
npx playwright test --ui
npx playwright show-report
```

Open a failure trace:

```sh
npx playwright show-trace test-results/<path-to-trace.zip>
```
