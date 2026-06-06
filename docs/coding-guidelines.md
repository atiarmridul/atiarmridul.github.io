# Coding Guidelines

## Naming Conventions

- PascalCase for React components.
- camelCase for variables, functions, and state.
- descriptive constants for section data and repeated UI metadata.
- stable kebab-style values for `data-testid` generation.

## Principles

- Readability first
- Reusable structure
- DRY principle
- Preserve existing behavior when modernizing UI.
- Prefer established component patterns before adding new abstractions.
- Quality over speed: do not treat a new feature as complete until its test coverage and QA checklist are updated.

## Formatting

- Consistent indentation
- Clean code organization
- Run `npm run format:check` before committing.

## Accessibility

- Semantic HTML
- accessible names for icon-only buttons
- Keyboard-friendly navigation
- Correct heading order
- Sufficient contrast on dark and light backgrounds

## Portfolio UI Standards

- Keep the portfolio premium, minimal, and professional.
- Use editorial-tech QA visuals where they support the content.
- Keep section spacing consistent through shared utilities in `src/index.css`.
- Use the current token system: warm charcoal/cream surfaces, one vivid orange accent, serif display headings,
  mono labels, and restrained card surfaces.
- Avoid cluttered cards, excessive animation, or generic template sections.
- Preserve mobile readability and avoid horizontal scrolling.

## Automation Contracts

- Preserve section IDs used by navigation and tests.
- Preserve existing `data-testid` attributes unless generated tests and locator catalogs are updated.
- Add a unique `data-testid` to every new interactive element.
- Prefer test IDs over text-only, random CSS, or position-based selectors.
- Prefer semantic buttons and links over clickable generic elements.
- Keep contact form field names stable unless EmailJS template mapping is updated.

## Feature Test Requirements

For every new page, section, component, modal, form, card, button, or API integration, add or update:

- Functional tests for visibility, rendering, user interactions, navigation, and business logic.
- Negative tests for empty states, invalid inputs, missing data, broken API responses, and network failures.
- Boundary tests for min/max values, character limits, and edge conditions.
- Accessibility checks for keyboard navigation, focus management, ARIA labels, alt text, contrast, and screen reader
  semantics.
- Responsive checks at 375x667, 768x1024, and 1920x1080.
- Security checks for XSS protection, URL validation, form sanitization, and secure external links.
- Performance checks for page load speed, lazy loading, image optimization, and bundle impact when relevant.

Playwright coverage should use page objects, reusable locators, helpers, fixtures, and test data under the QA
engine structure. Avoid hardcoded test data unless the business case explicitly requires it.
