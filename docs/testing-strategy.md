# Testing Strategy

## Current Coverage

- TypeScript app typecheck with `npm run typecheck`.
- QA engine typecheck with `npm run typecheck:qa`.
- QA implementation rule validation with `npm run qa:rules`.
- Vitest component coverage with `npm run test:unit`.
- ESLint with `npm run lint`.
- Prettier verification with `npm run format:check`.
- Production bundle verification with `npm run build`.
- Playwright E2E tests through `npm run test:e2e`.
- Browser-based visual inspection for major responsive UI changes.

## Portfolio UI Test Focus

- Hero section renders with QA branding, editorial headline, CTA buttons, and scroll-down control.
- Header remains readable in top, scrolled, light-theme, dark-theme, and mobile-menu states.
- Navigation scrolls to the correct section and mobile menu closes after navigation.
- Project architecture preview modal opens, closes by button, and closes by `Escape`.
- Achievement filters show the intended certification/training cards.
- Contact form keeps validation, honeypot, sanitization, EmailJS submission, and reset behavior.
- Compact footer renders without duplicating navigation content.
- Custom cursor, reveal, and magnetic interactions do not block keyboard or touch workflows.

## QA Automation Focus

- Generated specs are based on business definitions in `qa-engine/ai/definitions/`.
- Locator extraction prefers `data-testid`, ARIA labels, roles, text, stable CSS, and XPath fallback.
- Every interactive element should expose a unique `data-testid`.
- Generated and handwritten tests must prefer test IDs over text-only, position-only, or random CSS selectors.
- New features require happy path, negative, edge/boundary, accessibility, and responsive tests.
- Playwright coverage should use page object classes, reusable locators, helper methods, fixtures, and test data.
- Self-healing selector recovery is bounded and logged.
- Reports, screenshots, videos, and traces are retained on failure.

## Coverage Targets

- Functional coverage target: 90%.
- Component coverage target: 80%.
- Cross-browser coverage: Chrome, Firefox, Edge, and Safari where supported by the local or CI environment.
- Responsive coverage: mobile 375x667, tablet 768x1024, desktop 1920x1080.

The Playwright project matrix includes `chromium`, `desktop-1920`, `tablet-768`, `mobile-375`, `firefox`,
`edge`, and `webkit`. `webkit` is the Playwright Safari engine. The `edge` project uses Playwright's Desktop Edge
profile without requiring a sudo-installed system Edge binary.

## Responsive Verification

Check at minimum:

- mobile: 375x667
- tablet: 768x1024
- desktop: 1920x1080

Important responsive risks:

- header contrast in top/scrolled and light/dark theme states
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

Expected test coverage:

- keyboard navigation
- focus management
- alt text or accessible names
- ARIA labels
- color contrast
- screen reader-compatible structure

## Recommended Command Sequence

```sh
npm run typecheck
npm run typecheck:qa
npm run qa:rules
npm run test:unit
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

## Contact Form Test Data

EmailJS-backed contact form tests require `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and
`VITE_EMAILJS_PUBLIC_KEY` at build/runtime. Negative validation tests can run without sending mail, but a real send
test should verify the EmailJS response and avoid committing private keys or real inbox secrets.
