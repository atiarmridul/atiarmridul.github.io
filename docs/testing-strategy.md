# Testing Strategy

## Current Coverage

- TypeScript app typecheck with `npm run typecheck`.
- QA engine typecheck with `npm run typecheck:qa`.
- ESLint with `npm run lint`.
- Prettier verification with `npm run format:check`.
- Production bundle verification with `npm run build`.
- Playwright E2E tests through `npm run test:e2e`.
- Browser-based visual inspection for major responsive UI changes.

## Portfolio UI Test Focus

- Hero section renders with QA branding, stack badges, CTA buttons, and dashboard panel.
- Header remains readable on dark and light backgrounds.
- Navigation scrolls to the correct section and mobile menu closes after navigation.
- Project architecture preview modal opens, closes by button, and closes by `Escape`.
- Achievement filters show the intended certification/training cards.
- Contact form keeps validation, honeypot, sanitization, EmailJS submission, and reset behavior.
- Footer links scroll to existing sections.

## QA Automation Focus

- Generated specs are based on business definitions in `qa-engine/ai/definitions/`.
- Locator extraction prefers `data-testid`, ARIA labels, roles, text, stable CSS, and XPath fallback.
- Self-healing selector recovery is bounded and logged.
- Reports, screenshots, videos, and traces are retained on failure.

## Responsive Verification

Check at minimum:

- mobile: 390px wide
- tablet: 768px wide
- desktop: 1200px wide and above

Important responsive risks:

- header contrast over light sections
- mobile menu tap targets
- long skill/project/certification labels wrapping cleanly
- contact form fields fitting without horizontal scroll
- project modal content remaining scrollable on small screens

## Accessibility Checks

Expected implementation practices:

- semantic section and heading structure
- accessible names for icon-only buttons
- keyboard-compatible buttons and links
- sufficient contrast in dark and light header states
- stable labels for form inputs
- no interaction that depends only on hover

## Recommended Command Sequence

```sh
npm run typecheck
npm run typecheck:qa
npm run lint
npm run format:check
npm run build
npm run test:e2e -- --project=chromium
```

## Future Enhancements

- Add `@axe-core/playwright` accessibility checks.
- Add visual snapshot coverage for hero, header, project modal, and contact form.
- Add deployed-site smoke tests in CI.
- Add Lighthouse performance and SEO validation.
