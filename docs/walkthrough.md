# End-To-End Walkthrough

This walkthrough starts from business cases and ends with executable Playwright tests.

## 1. Install Dependencies

```sh
npm install
npx playwright install
```

## 2. Start The App

```sh
npm run dev
```

Default URL:

```text
http://127.0.0.1:5173
```

## 3. Create Or Edit Business Cases

Edit:

```text
qa-engine/ai/definitions/business-test-cases.json
```

Or create Excel input:

```sh
npm run qa:sample-excel
```

## 4. Generate Tests

```sh
npm run qa:generate
```

This writes:

```text
qa-engine/ai/generated-tests/structured-test-definitions.json
qa-engine/ai/locator-catalog/locators.json
qa-engine/playwright/tests/generated/*.generated.spec.ts
```

## 5. Run Tests

```sh
npm run test:e2e -- --project=chromium
```

## 6. Review Failures

If a test fails:

```sh
npx playwright show-report
```

Then inspect traces under:

```text
qa-engine/output/test-artifacts/
```

## 7. Regenerate After UI Changes

When the website structure changes:

```sh
npm run qa:scan
npm run qa:generate
npm run test:e2e -- --project=chromium
```

Review catalog and generated spec diffs before committing.

## 8. Verify Portfolio Redesign Changes

When visual design changes are made, also verify:

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Then browser-check the hero, light-section header, mobile menu, project modal, and contact form. Preserve
section IDs and `data-testid` values unless the locator catalog and generated tests are updated in the same
change.
