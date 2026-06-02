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
- Use dashboard-inspired QA visuals where they support the content.
- Keep section spacing consistent through shared utilities in `src/index.css`.
- Use restrained cyan, blue, emerald, slate, and white surfaces.
- Avoid cluttered cards, excessive animation, or generic template sections.
- Preserve mobile readability and avoid horizontal scrolling.

## Automation Contracts

- Preserve section IDs used by navigation and tests.
- Preserve existing `data-testid` attributes unless generated tests and locator catalogs are updated.
- Prefer semantic buttons and links over clickable generic elements.
- Keep contact form field names stable unless EmailJS template mapping is updated.
