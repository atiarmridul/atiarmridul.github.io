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
│   ├── tests/
│   ├── utils/
│   └── config/
├── input/
│   ├── json/
│   └── excel/
├── output/
│   ├── reports/
│   ├── screenshots/
│   ├── traces/
│   └── generated-specs/
├── generate-test.ts
├── repair-selectors.ts
└── test-case-parser.ts
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

## Commands

```sh
npm run qa:parse
npm run qa:sample-excel
npm run qa:scan
npm run qa:generate
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
5. Review generated specs in `qa-engine/playwright/tests/generated/`.
6. Execute with `npm run test:e2e`.
