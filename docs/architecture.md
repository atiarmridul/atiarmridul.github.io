# Architecture

The repository has two primary layers:

1. A React portfolio application in `src/`.
2. An AI-assisted Playwright QA automation framework in `qa-engine/`.

The portfolio presents senior QA engineering expertise. The QA framework validates and generates automation
against the same portfolio UI.

## Portfolio Application

The app is a Vite + React + TypeScript single-page portfolio. `App.tsx` composes the page sections in a
fixed order and each section exposes stable IDs for smooth scrolling and automation.

```text
App
  -> Header
  -> Hero
  -> About
  -> Skills
  -> Projects
  -> Achievements
  -> Domains
  -> Experience
  -> Education
  -> Contact
  -> Footer
```

### UI Design System

Global styling lives in `src/index.css`:

- `section-shell`: consistent section width and responsive horizontal padding.
- `section-kicker`, `section-title`, `section-copy`: shared section heading system.
- `premium-card`, `premium-card-hover`: card surfaces, borders, shadows, and hover behavior.
- `dark-band`: dark engineering-focused background used for hero and footer areas.

The design direction is a modern SaaS/QA dashboard aesthetic with Inter typography, cyan/blue/emerald accents,
subtle glass surfaces, restrained shadows, and responsive card layouts.

### Navigation Behavior

`Header.tsx` owns:

- fixed sticky navigation
- smooth section scrolling
- resume link opening in a new tab
- mobile menu state
- active section tracking via `IntersectionObserver`
- theme-aware header contrast

The header keeps a dark glass appearance on the hero section and switches to a light frosted surface with
dark text over light sections.

### Business Logic Boundaries

The redesign keeps existing behavior in place:

- section IDs and `data-testid` attributes remain stable for automation
- project architecture preview modal still opens from project cards
- certification filters still run client-side
- the contact form remains a controlled EmailJS form with honeypot, sanitization, validation, success reset,
  and failure alerts

## QA Framework

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

- Portfolio sections must remain responsive and keyboard-accessible.
- Stable `data-testid` contracts should not be renamed without updating generated tests and locator catalogs.
- Visual redesign work should not change form submission behavior, external links, modal behavior, or navigation
  semantics unless explicitly intended.
- Generated tests must stay human-readable.
- Generated tests must compile with `tsconfig.qa.json`.
- Self-healing must log annotations when recovery happens.
- DOM similarity checks must be scoped to likely interactive candidates.
- The framework must run without an LLM by default.
