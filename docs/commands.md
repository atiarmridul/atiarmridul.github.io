# Commands

Common commands for local development, QA generation, and verification.

## App Commands

```sh
npm run dev
npm run build
npm run preview
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

Use `npm run quality` before committing framework changes.
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
