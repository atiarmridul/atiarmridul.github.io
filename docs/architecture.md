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
  -> Marquee
  -> Projects
  -> About
  -> Skills
  -> Domains
  -> Experience
  -> Education
  -> Achievements
  -> Contact
  -> Footer
```

### UI Design System

Global styling lives in `src/index.css`:

- `wrap`: constrained page width and responsive horizontal padding.
- `section`, `section-head`, `section-title`, `eyebrow`: shared section rhythm and headings.
- `btn`, `btn-primary`, `btn-ghost`, `icon-btn`: command and icon button styles.
- `work-*`, `stack-*`, `edu-card`, `contact-*`, `footer`: section-specific reusable surfaces.
- `reveal`, `cursor-dot`, `cursor-ring`: DOM-driven interaction classes initialized after React mount.

The design direction is editorial-tech: warm charcoal and cream tokens, one orange accent, display serif
headings, mono labels, restrained surfaces, large typography, custom cursor feedback, scroll reveal, and magnetic
buttons on pointer devices.

### Navigation Behavior

`Header.tsx` owns:

- fixed sticky navigation
- smooth section scrolling
- resume link opening in a new tab
- mobile menu state
- light/dark theme toggle persisted in `localStorage`
- compact desktop and mobile navigation controls

`siteInteractions.ts` adds a `scrolled` class to the fixed nav after the page moves down, while
`useTheme.ts` applies the `data-theme` attribute that powers the CSS token swap.

### Business Logic Boundaries

The redesign keeps existing behavior in place:

- section IDs and `data-testid` attributes remain stable for automation
- project architecture preview modal still opens from project cards
- certification filters still run client-side
- the contact form remains a controlled EmailJS form with honeypot, sanitization, validation, success reset,
  and failure alerts
- the footer remains a compact site credit surface
- reduced-motion preferences are respected by the shared scroll helper

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
  -> reusable test data
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
- `qa-engine/bin/validate-rules.ts`: verifies selector, generated spec, coverage, folder, and project-matrix rules.

## Runtime Layer

The `qa-engine/playwright/` directory owns executable automation.

- `qa-engine/playwright/fixtures/self-healing.ts`: resolves primary and fallback locators, then performs bounded semantic recovery.
- `qa-engine/playwright/pages/BasePage.ts`: shared page-object helpers for navigation, readiness, waits, and overlay dismissal.
- `qa-engine/playwright/config/config.ts`: environment-aware runtime configuration.
- `qa-engine/playwright/utils/exceptions.ts`: domain-specific errors.
- `qa-engine/playwright/test-data/generated-test-data.json`: reusable data values consumed by generated specs.
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
