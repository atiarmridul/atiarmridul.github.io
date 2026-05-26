# Agent Guide

This guide explains how an AI coding agent should work in this repository.

## Mission

Maintain and extend an AI-assisted QA automation framework for the portfolio website. The framework converts business test cases into structured definitions, scans the live UI for locators, maps source-code context, and generates executable Playwright tests.

## Operating Rules

- Prefer existing framework patterns before adding new abstractions.
- Keep generated test output readable and reviewable.
- Update generator templates instead of hand-editing generated specs.
- Run quality gates after framework changes.
- Do not hide real UI failures with DOM mutation or forced clicks.
- Keep selector healing bounded and observable.

## Primary Workflow

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
- `docs/*.md`

## Files Agents Should Treat Carefully

- `qa-engine/ai/generated-tests/*`: generated output.
- `qa-engine/ai/locator-catalog/locators.json`: generated but reviewable selector intelligence.
- `qa-engine/playwright/tests/generated/*`: generated executable specs.
- `package-lock.json`: only changes when dependencies change.
