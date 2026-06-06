# Commands

Common commands for local development, QA generation, and verification.

## App Commands

```sh
npm run dev
npm run build
npm run preview
npm run deploy
```

After changing `.env.local`, restart the dev server so Vite reloads `VITE_*` values.

## Quality Commands

Comment: `npm run quality` is the default pre-commit gate for code, generated QA rules, unit tests, linting, and
formatting. Run browser-specific E2E commands separately when UI behavior changes.

```sh
npm run typecheck
npm run typecheck:qa
npm run qa:rules
npm run test:unit
npm run lint
npm run format:check
npm run quality
npm run ci:verify
```

Use `npm run quality` before committing app or framework changes.
Use `npm run ci:verify` to match the non-browser verification run in GitHub Actions.

## QA Framework Commands

Comment: Regenerate QA artifacts after changing markup, selectors, section order, business test cases, or generator
logic. The generated specs are intentionally derived artifacts.

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

Validate QA implementation rules:

```sh
npm run qa:rules
```

Comment: `qa:rules` checks selector contracts, generated-spec selector safety, required QA folders, coverage tags,
generator safeguards, and the Playwright project matrix.

Run generated tests:

```sh
npm run test:e2e
npm run test:e2e -- --project=chromium
```

Comment: Use the named projects in `playwright.config.ts` for responsive and cross-browser coverage, for example
`desktop-1920`, `tablet-768`, `mobile-375`, `firefox`, `edge`, and `webkit`.

Run tests against the deployed site:

```sh
PLAYWRIGHT_BASE_URL=https://atiarmridul.github.io PLAYWRIGHT_SKIP_WEBSERVER=true npm run test:e2e
```

If deployed contact-form tests are expected to send mail, make sure the deployed build was produced with:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
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
- header at top and scrolled positions in light and dark themes
- mobile navigation menu
- project architecture modal
- contact form on mobile
- custom cursor, reveal, and magnetic pointer behavior on desktop

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
