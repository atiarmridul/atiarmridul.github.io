# Agent Guide

This guide explains how an AI coding agent should work in this repository.

## Mission

Maintain and extend both the senior QA engineer portfolio website and the AI-assisted QA automation framework.
The website must remain polished, responsive, accessible, and recruiter-friendly. The framework converts
business test cases into structured definitions, scans the live UI for locators, maps source-code context, and
generates executable Playwright tests.

## Operating Rules

- Prefer existing framework patterns before adding new abstractions.
- Preserve portfolio business logic, external links, section IDs, and `data-testid` contracts during UI changes.
- Keep the header readable on both dark and light sections.
- Keep the contact form controlled, validated, sanitized, spam-protected, and EmailJS-backed.
- Keep generated test output readable and reviewable.
- Update generator templates instead of hand-editing generated specs.
- Run quality gates after framework changes.
- Do not hide real UI failures with DOM mutation or forced clicks.
- Keep selector healing bounded and observable.

## Primary Workflow

### Portfolio UI Changes

1. Inspect existing component behavior and stable selectors.
2. Make scoped component and styling changes.
3. Preserve scroll navigation, modal behavior, filters, links, and contact form logic.
4. Run `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`.
5. Browser-check desktop and mobile views when layout changes are significant.

### QA Framework Changes

1. Read business cases from `qa-engine/ai/definitions/`.
2. Parse JSON or Excel into structured AI definitions.
3. Scan the live website with Playwright.
4. Analyze React source files for component and semantic context.
5. Build or update `qa-engine/ai/locator-catalog/locators.json`.
6. Generate Playwright specs in `qa-engine/playwright/tests/generated/`.
7. Run quality and generated tests.

## Required Checks

```sh
npm run quality
npm run build
npm run test:e2e -- --project=chromium
```

## Files Agents Commonly Edit

- `qa-engine/core/parser/test-case-parser.ts`
- `qa-engine/core/locator-engine/locator-extractor.ts`
- `qa-engine/core/locator-engine/source-code-mapper.ts`
- `qa-engine/core/generator/generate-test.ts`
- `qa-engine/playwright/fixtures/self-healing.ts`
- `qa-engine/playwright/pages/BasePage.ts`
- `playwright.config.ts`
- `src/components/*.tsx`
- `src/index.css`
- `docs/*.md`

## Files Agents Should Treat Carefully

- `qa-engine/ai/generated-tests/*`: generated output.
- `qa-engine/ai/locator-catalog/locators.json`: generated but reviewable selector intelligence.
- `qa-engine/playwright/tests/generated/*`: generated executable specs.
- `package-lock.json`: only changes when dependencies change.
