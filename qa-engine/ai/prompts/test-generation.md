# Test Generation Prompt Notes

Use these principles when adding an LLM enrichment layer:

- Preserve the business test case ID.
- Keep generated specs deterministic and reviewable.
- Prefer accessibility and semantic locators.
- Prefer `data-testid` locators whenever available.
- Never generate `nth-child`, random CSS, or text-only selectors when a test ID is available.
- Do not generate DOM mutation for normal user actions.
- Add comments only for business-readable test steps.
- Mark low-confidence actions for human review.

## Feature Coverage Requirements

For every new page, section, component, modal, form, card, button, or API integration, generate test coverage for:

- Functional behavior: visibility, correct rendering, user interactions, navigation, and business logic.
- Negative behavior: empty states, invalid inputs, missing data, broken API responses, and network failures.
- Boundary behavior: min values, max values, character limits, and edge conditions.
- Accessibility: keyboard navigation, focus management, alt text, ARIA labels, color contrast, and screen reader
  compatibility.
- Responsive layouts: mobile 375x667, tablet 768x1024, desktop 1920x1080.
- Cross-browser behavior: Chrome, Firefox, Edge, and Safari where supported.
- Performance: page load speed, lazy loading, image optimization, and bundle size impact.
- Security: XSS protection, URL parameter validation, form sanitization, and secure external links.

Every feature should have at least:

- Happy path test.
- Negative test.
- Edge or boundary test.
- Accessibility test.
- Responsive test.

## Portfolio-Specific Coverage

- Navigation: menu items, active state, mobile menu, smooth scrolling.
- Hero: name rendering, title rendering, CTA buttons, social links.
- About: content rendering, resume download.
- Skills: skill cards, categories, animations.
- Projects: project cards, GitHub links, live demo links, filtering, search.
- Experience: timeline rendering and expand/collapse behavior when present.
- Certifications: certificate links and external navigation.
- Contact form: valid submission, invalid email, empty fields, character limits, success message, failure handling.
- GitHub integration: API success, API failure, loading state, empty state when present.
- Dark mode: toggle behavior, persistence after refresh, theme consistency.

## Output Requirements

When generating a new feature, include:

- React component.
- TypeScript types.
- Unit tests.
- Playwright E2E tests.
- Accessibility tests.
- Test cases in JSON format.
- QA checklist.

Do not mark a generated feature complete unless the implementation and tests are both present.
