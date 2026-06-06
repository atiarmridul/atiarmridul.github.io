# Engineering Standards & Automation Roadmap

This document outlines the architectural standards and engineering rigor expected in this portfolio and its
AI-assisted QA automation framework. Follow this guide when extending the app UI, generated tests, or future
automation projects.

## 1. Core Infrastructure & Quality Gates

Standardizing the environment ensures that all team members and AI agents produce consistent, high-quality code.

### Configuration Files

- **TypeScript (Strict Mode):** Use a `tsconfig.json` that enables `strict: true`. This prevents common runtime errors like `null` or `undefined` access.
- **Linting (ESLint):** Use `typescript-eslint` with recommended rules. It catches dead code, unused imports, and non-idiomatic patterns.
- **Formatting (Prettier):** Enforce a consistent code style across the entire repository to reduce noise in PR reviews.
- **Git Hooks (Husky + lint-staged):** Prevent poor-quality code from being committed by running `lint` and `format` automatically on staged files.

### Critical Scripts

This repository has a `quality` command that combines app typechecking, QA engine typechecking, QA rule validation,
unit/component tests, linting, and format verification:

```json
"quality": "npm run typecheck && npm run typecheck:qa && npm run qa:rules && npm run test:unit && npm run lint && npm run format:check"
```

---

## 2. Architectural Patterns (POM+)

Move beyond simple Page Object Models to a more resilient architecture.

### The BasePage Foundation

Your `BasePage.ts` should contain universal helpers:

- **Self-Healing Locators:** Implementation of primary, fallback, and DOM-similarity recovery logic.
- **Observability:** Integrated reporting that logs an annotation whenever a locator recovers via self-healing.
- **Smart Waits:** Helpers like `waitForNetworkResponse` to avoid flaky `page.waitForTimeout` calls.
- **Modal Handling:** Centralized logic to dismiss promotional popups or overlays that block interaction.

### Page Object Interaction Rules

Page objects should model real user behavior. Use normal Playwright actions such as `fill`, `click`, `press`, and
`locator.waitFor()` before considering lower-level DOM workarounds.

- Avoid removing attributes, setting DOM values directly, or manually dispatching browser events for standard user flows.
- Use forced interaction or DOM mutation only for known test-harness limitations, such as hidden file inputs.
- If a user cannot interact with the UI, the test should normally fail because it may be exposing a real product bug.

### Environment-Aware Configuration

Use `qa-engine/playwright/config/config.ts` to resolve settings from:

1. `.env` default local settings
2. `qa-engine/environments/*.env` stage/prod profiles
3. Process variables for CI/CD overrides

---

## 3. Data Strategy & API Integration

Decouple test data from UI interactions for faster, more reliable setup.

- **API Agents:** Create typed API clients using `CatalogApiAgent` as a template to fetch live data such as products, categories, and users instead of hardcoding values.
- **Data Factories:** Use a `dataFactory.ts` fixture to provide tests with dynamic, in-stock entities, for example `test('cart', async ({ liveProduct }) => ...)`.
- **Zod Validation:** Use Zod schemas to validate API responses at runtime, ensuring automation fails immediately with a clear error if the backend contract changes.

### Live Data Caching

Live API data should be fetched deliberately. Avoid making the same catalog request for every test when the data is
stable enough to share within a test run.

- Cache category and product lookups by environment, API base URL, category slug, page, and limit.
- Cache promises instead of only resolved values so parallel tests can share the same in-flight request.
- Return copied arrays or immutable objects from caches so tests cannot accidentally mutate shared data.
- Do not cache data that is expected to change during the test, such as cart contents, order state, or user session data.

---

## 4. Advanced Coverage Layers

Modern automation requires more than functional UI checks.

- **Visual Regression:** Use Playwright's `toHaveScreenshot` for critical components such as headers, footers, and hero sections to catch layout drift.
- **Accessibility (a11y):** Integrate `@axe-core/playwright` and Lighthouse audits to ensure compliance with WCAG standards.
- **API Baselines:** Run lightweight API tests to verify backend health before executing expensive UI journeys.
- **Responsive UI Checks:** Verify mobile menu behavior, project modal overflow, contact form layout, and theme-aware header contrast.

---

## 5. CI/CD & Performance Standards

Efficient test execution is as important as the tests themselves.

- **Parallelism:** Enable `fullyParallel: true` in `playwright.config.ts` to maximize throughput.
- **Worker Capping:** Cap workers in CI, for example `workers: process.env.CI ? 2 : undefined`, to prevent resource exhaustion and flakiness on shared runners.
- **Sharding:** For large suites, use Playwright sharding in GitHub Actions to run tests across multiple machines in parallel.
- **Traceability:** Configure `trace: 'retain-on-failure'` to ensure you have full DOM snapshots and action logs for every failure without bloating artifact storage.

### Performance Guardrails

Keep helper logic bounded so recovery mechanisms do not become the slowest part of the suite.

- Avoid full-page DOM scans such as `document.querySelectorAll("body *")` in retry loops.
- Scope self-healing or similarity checks to likely candidates such as links, buttons, inputs, landmarks, and elements with hinted attributes.
- Put a hard cap on candidate counts for expensive scoring logic.
- Prefer `expect.poll`, `locator.waitFor`, and Playwright assertions over manual loops with `page.waitForTimeout`.
- Keep fixture-level API calls minimal; repeated live data lookups should be cached or moved to setup when appropriate.

### Production Realism Toggles

Tests should exercise the real production configuration by default. Any bypasses should be explicit and opt-in.

- Do not mock or reroute CDN/static assets by default in production smoke and regression runs.
- If a local workaround is needed, expose it through a clearly named setting such as `ROUTE_STATIC_ASSETS_TO_ORIGIN`.
- Keep defaults production-like, and document when a toggle should be used.
- Avoid hiding environment issues that production users would experience.

---

## 6. Naming & Tagging Conventions

Consistency in naming makes the test suite searchable and maintainable.

- **Tags:** Use functional tags such as `@smoke`, `@cart`, and `@search`, plus layer tags such as `@visual`, `@a11y`, and `@api`, to allow targeted execution.
- **IDs:** Assign stable IDs to test cases, for example `SANITY_001`, and use them in spec titles for easy cross-referencing with test management tools.
- **Files:** Use `.spec.ts` for UI tests, `.visual.spec.ts` for visual regressions, and `.generated.spec.ts` for AI-generated code.

---

## 7. Error Handling Standards

Failures should be self-documenting.

- **Custom Exceptions:** Use domain-specific errors such as `PageLoadError` and `ApiResponseError` to distinguish between environment issues and application bugs.
- **Assertive Page Objects:** Page objects should assert their own state, for example `expect(this.header).toBeVisible()`, before performing actions, preventing cryptic element-not-found errors.

---

## 8. AI-Assisted Workflow

Standardize how AI contributes to the framework to maintain human readability and control.

- **JSON Definitions:** Define test cases in structured JSON under `qa-engine/ai/definitions/`. This makes test logic portable and easy for AI to parse.
- **Spec Generation:** Use a script such as `qa-engine/core/generator/generate-test.ts` to turn JSON definitions into standard Playwright `.spec.ts` files.
- **Selector Repair:** Maintain an AI-assisted repair script that can suggest updated locators based on DOM snapshots after a failure.

### Generated Test Hygiene

Generated code must meet the same quality bar as hand-written tests.

- Emit only the imports, helper functions, and fixtures that a generated spec actually uses.
- Keep generated output deterministic so diffs are reviewable.
- Run generated specs through `typecheck`, `lint`, and `format:check`.
- Fix generator templates instead of repeatedly hand-editing generated files.

---

## 9. Failure Triage Checklist

When many UI tests fail together, investigate shared causes before changing individual assertions.

1. Confirm `BASE_URL` and global setup reachability.
2. Check screenshots, videos, and traces for blank pages, hidden body content, blocked hydration, or modal overlays.
3. Compare API baseline results with browser UI results. Passing API tests plus failing UI tests usually points to rendering, assets, routing, or frontend hydration.
4. Inspect console and network errors for failed JavaScript bundles, blocked CDN assets, CORS failures, or 4xx/5xx responses.
5. Verify whether environment toggles, proxies, or CDN routing are changing production-like behavior.
6. Only update selectors after confirming the page is actually rendering the expected UI.

---

## Roadmap for New Project Setup

1. **Initialize:** Run `npm install`, `npx playwright install`, and verify TypeScript configs.
2. **Clone Infrastructure:** Reuse `tsconfig*.json`, `eslint.config.js`, Prettier, Husky, and lint-staged setup.
3. **Port Base Layers:** Reuse `qa-engine/playwright/config/config.ts`, `BasePage.ts`, exceptions, and fixtures.
4. **Define Inputs:** Add business cases under `qa-engine/ai/definitions/` and keep generated artifacts reviewable.
5. **Configure CI:** Keep `.github/workflows/` aligned with `npm run ci:verify` and Playwright artifact upload.

---

## Conclusion: The Quality Mindset

These standards are about a commitment to **stable, repeatable, and maintainable** automation. Always prioritize:

- **Reliability over Coverage:** A few stable tests are more valuable than many flaky ones.
- **Readability over Cleverness:** Tests are documentation. Write them so teammates can understand them at a glance.
- **Fast Feedback:** Keep the smoke suite under 5 minutes to ensure it is used during development.
