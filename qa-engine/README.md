# QA Engine

`qa-engine/` is an isolated AI-assisted QA automation platform inside the portfolio website repository.

The portfolio application lives in `src/`. The QA engine owns parsing, locator intelligence, source-code mapping, Playwright execution, reporting, and generated automation.

## Structure

```ini
qa-engine/
├── ai/
│   ├── definitions/
│   ├── generated-tests/
│   ├── locator-catalog/
│   ├── training-data/
│   └── prompts/
├── bin/
│   ├── create-sample-excel.ts
│   ├── generate-test.ts
│   ├── repair-selectors.ts
│   ├── test-case-parser.ts
│   └── validate-rules.ts
├── core/
│   ├── parser/
│   ├── generator/
│   ├── locator-engine/
│   ├── self-healing/
│   ├── assertions/
│   ├── reporting/
│   └── shared/
├── playwright/
│   ├── pages/
│   ├── fixtures/
│   ├── test-data/
│   ├── tests/
│   ├── utils/
│   └── config/
├── input/
│   ├── json/
│   └── excel/
├── output/
│   ├── reports/
│   ├── screenshots/
│   ├── test-artifacts/
│   └── traces/
```

## Source Of Truth

Business test cases live in:

```text
qa-engine/ai/definitions/business-test-cases.json
```

Cases can be marked with:

- `automationMode: "automated"` for executable Playwright generation.
- `automationMode: "ai-assisted"` for AI/manual validation coverage kept in the catalog.
- `automationMode: "manual"` for documented manual coverage.

By default, the generator emits only `automated` cases.

## Generation Standards

Generated QA assets must follow the project-wide feature-completion and selector rules in
`CODING_STANDARDS.md`, `docs/coding-guidelines.md`, and `qa-engine/ai/prompts/test-generation.md`.

Core requirements:

- Every interactive element needs a unique `data-testid`.
- Tests prefer stable test IDs over text-only, random CSS, or position-based selectors.
- New features require happy path, negative, edge/boundary, accessibility, and responsive coverage.
- Playwright specs should use page objects, reusable locators, helpers, fixtures, and test data.
- Do not consider a feature complete until test cases, generated specs, accessibility checks, and a QA checklist
  are present.

## Commands

```sh
npm run qa:parse
npm run qa:sample-excel
npm run qa:scan
npm run qa:generate
npm run qa:rules
npm run mcp:playwright
npm run test:e2e -- --project=chromium
```

## Playwright MCP

Playwright MCP is installed through `@playwright/mcp`.

```sh
npm run mcp:playwright
```

See `qa-engine/playwright/config/playwright-mcp.md` for usage notes.

## End-To-End Flow

1. Edit `qa-engine/ai/definitions/business-test-cases.json`.
2. Run the portfolio app with `npm run dev`.
3. Run `npm run qa:generate`.
4. Review `qa-engine/ai/generated-tests/structured-test-definitions.json`.
5. Review `qa-engine/ai/locator-catalog/locators.json`.
6. Review generated data in `qa-engine/playwright/test-data/generated-test-data.json`.
7. Review generated specs in `qa-engine/playwright/tests/generated/`.
8. Run `npm run qa:rules`.
9. Execute with `npm run test:e2e`.

After React markup, section order, or `data-testid` changes, regenerate the locator catalog and specs before
using generated test failures as release evidence.
