# MCP And Browser Automation

This project is designed to work with browser automation tools and MCP-style inspection workflows.

## Current Implementation

The framework uses Playwright to scan the live website and extract locator candidates. This gives the AI generation layer access to rendered DOM state instead of relying only on source code.

## Browser Scan Responsibilities

`qa-engine/core/locator-engine/locator-extractor.ts` collects:

- `id`
- `class`
- `data-testid`
- `aria-label`
- role
- placeholder
- visible text
- CSS path
- XPath

The extractor scopes scans to useful elements such as links, buttons, inputs, landmarks, headings, and elements with semantic attributes.
For elements with `data-testid`, the scanner records the test ID as both the highest-priority candidate and a fallback candidate for future self-healing repairs.

Portfolio UI sections intentionally keep stable IDs and `data-testid` attributes so browser automation can
survive visual redesigns. The current high-value automation surfaces are:

- sticky header navigation
- hero CTA buttons
- project architecture preview modal
- achievement filters
- contact form fields and submit button
- footer navigation

## Source-Assisted Mapping

`qa-engine/core/locator-engine/source-code-mapper.ts` adds source context by detecting:

- React component names.
- exported components.
- prop names.
- `data-testid`, `aria-label`, `placeholder`, `id`, and class hints.
- static text hints.

## MCP Extension Points

Future MCP integrations can plug in at these points:

- Replace or enrich `collectDomElements()` in `qa-engine/core/locator-engine/locator-extractor.ts`.
- Add browser screenshots or accessibility snapshots to the locator catalog.
- Add failure DOM snapshots to selector repair suggestions.
- Add LLM mapping after `parseBusinessTestCases()` in `qa-engine/core/generator/generate-test.ts`.

## Guardrails

- Avoid full-page DOM scans in retry loops.
- Keep expensive semantic similarity bounded.
- Do not mutate the DOM to make normal user interactions pass.
- Treat MCP/browser findings as evidence, not as a reason to ignore product bugs.
- When a visual redesign changes markup, rescan before updating generated specs.
