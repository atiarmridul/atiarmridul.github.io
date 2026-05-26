# Architecture

The QA framework is split into generation-time code and runtime Playwright code.

## High-Level Flow

```text
Business JSON/XLSX
  -> test-case-parser
  -> structured AI definitions
  -> locator-extractor + source-code-mapper
  -> locator catalog
  -> generate-test
  -> Playwright generated specs
  -> self-healing runtime
```

## Generation Layer

The `qa-engine/core/` directory owns the implementation that transforms business intent into automation artifacts. The `qa-engine/ai/` directory stores definitions, generated AI-readable output, locator catalogs, prompts, and training data.

- `qa-engine/core/parser/test-case-parser.ts`: reads JSON and Excel business test cases.
- `qa-engine/core/locator-engine/source-code-mapper.ts`: inspects React files for components, props, text hints, and selector hints.
- `qa-engine/core/locator-engine/locator-extractor.ts`: scans the rendered website and captures locator candidates.
- `qa-engine/core/generator/generate-test.ts`: combines structured steps and locator catalog entries into Playwright specs.
- `qa-engine/core/self-healing/repair-selectors.ts`: persists locator repairs back into the catalog.
- `qa-engine/core/shared/types.ts`: shared contracts for definitions, locators, mappings, and repair results.

## Runtime Layer

The `qa-engine/playwright/` directory owns executable automation.

- `qa-engine/playwright/fixtures/self-healing.ts`: resolves primary and fallback locators, then performs bounded semantic recovery.
- `qa-engine/playwright/pages/BasePage.ts`: shared page-object helpers for navigation, readiness, waits, and overlay dismissal.
- `qa-engine/playwright/config/config.ts`: environment-aware runtime configuration.
- `qa-engine/playwright/utils/exceptions.ts`: domain-specific errors.
- `qa-engine/playwright/tests/generated/`: generated specs from business definitions.

## Locator Priority

Locator extraction and generated usage follow this priority:

1. `data-testid`
2. `aria-label`
3. role and accessible name
4. placeholder or visible text
5. stable CSS
6. XPath fallback

When an element has a `data-testid`, the extractor also stores that selector in the fallback list. This keeps
the stable test ID available after self-healing promotes another selector to primary.

## Design Constraints

- Generated tests must stay human-readable.
- Generated tests must compile with `tsconfig.qa.json`.
- Self-healing must log annotations when recovery happens.
- DOM similarity checks must be scoped to likely interactive candidates.
- The framework must run without an LLM by default.
