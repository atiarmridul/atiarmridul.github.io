# Coding Standards

This document defines the coding conventions, readability principles,
and quality standards followed in this project.

---

# 1. General Principles

- Prioritize readability over clever code
- Prefer maintainable architecture
- Keep components modular and reusable
- Avoid deeply nested logic
- Follow consistent naming conventions
- Write self-documenting code whenever possible

---

# 2. Commenting Standards

## Intent-Based Comments

Comments should explain:

- WHY something exists
- Architectural decisions
- Accessibility reasoning
- Performance considerations
- QA/testing intent

Avoid commenting obvious syntax.

### Good Example

```tsx
// Smooth scrolling improves navigation experience on long pages
scrollIntoView({ behavior: 'smooth' });
```

### Bad Example

```tsx
// Scroll to section
scrollIntoView();
```

---

# 3. React Component Standards

## Component Structure Order

1. Imports
2. Constants
3. State
4. Effects
5. Event Handlers
6. Helper Functions
7. JSX Return
8. Export

## Production Feature Definition

A feature is not complete until the implementation and the automated coverage are both present. This applies to
new pages, sections, components, modals, forms, cards, buttons, and API integrations.

Every feature must include:

- React component implementation.
- TypeScript types for props, data models, and API responses.
- Stable selectors for automation.
- Automated functional, negative, boundary, accessibility, responsive, performance, and security coverage where
  the behavior is relevant.
- Playwright E2E coverage using the QA engine structure.
- Business test cases in JSON format when the feature is part of generated QA coverage.
- A short QA checklist for manual review risks that are not fully automatable.

---

# 4. Naming Conventions

## Components

Use PascalCase.

```tsx
HeroSection.tsx;
ContactForm.tsx;
```

## Variables

Use camelCase.

```tsx
isMenuOpen;
filteredAchievements;
```

## Constants

Use descriptive naming.

```tsx
skillCategories;
combinedAchievements;
```

---

# 5. Accessibility Standards

Accessibility is treated as a core engineering requirement.

## Requirements

- Use semantic HTML
- Add aria-label where needed
- Maintain heading hierarchy
- Ensure keyboard accessibility
- Use sufficient color contrast
- Verify focus management for menus, modals, forms, and interactive cards
- Provide alt text or accessible names for meaningful images and icon-only controls
- Keep screen reader output understandable through labels, landmarks, and heading order

### Example

```tsx
<button aria-label="Open navigation menu">
```

---

# 6. Responsive Design Standards

- Follow mobile-first design
- Use responsive Tailwind breakpoints
- Avoid fixed-width layouts
- Test on mobile, tablet, and desktop:
  - mobile: 375x667
  - tablet: 768x1024
  - desktop: 1920x1080
- Verify sticky header contrast at the top of the page, after scroll, and in light/dark themes
- Validate layout, overflow, navigation, typography, and images at each breakpoint

---

# 7. Styling Standards

## Tailwind CSS

- Group related utility classes logically
- Avoid extremely long inline class chains
- Add intent comments above complex UI blocks
- Reuse shared utilities from `src/index.css` for repeated section and card patterns
- Use valid Tailwind opacity values so generated CSS is not silently missing
- Keep the visual language professional, minimal, and QA-engineering focused

## Portfolio Design System

- `wrap`: standard page width and responsive padding.
- `section`, `section-head`, `section-title`: shared section rhythm and heading scale.
- `eyebrow`: small uppercase section label with accent rule.
- `btn`, `btn-primary`, `btn-ghost`, `icon-btn`: consistent command surfaces.
- `work-item`, `stack-col`, `edu-card`: repeated portfolio content surfaces.
- `reveal`: scroll-reveal animation class initialized by `siteInteractions.ts`.
- `cursor-dot`, `cursor-ring`, `[data-mag]`: pointer-only cursor and magnetic feedback.

## Header Contrast

The sticky header must support the current token-driven visual states:

- default transparent/fixed state at the top of the page
- `nav.scrolled` frosted state after the page moves down
- light and dark theme variants through the `html[data-theme]` tokens

Text, active nav pills, borders, and menu buttons must remain readable in both states.

### Example

```tsx
{/* Responsive card layout with hover interaction */}
<div className="">
```

---

# 8. State Management Standards

- Keep state minimal
- Avoid unnecessary rerenders
- Use derived state when possible
- Separate UI state from business logic

---

# 9. Security Standards

## Input Validation

- Sanitize user input
- Validate emails
- Prevent spam submissions
- Avoid exposing secrets in frontend code

---

# 10. QA & Testing Mindset

This portfolio follows QA-oriented engineering practices.

## Practices

- Accessibility-first implementation
- Stable selectors for automation
- Predictable component structure
- Reusable UI patterns
- Maintainable architecture
- Automated tests for every new feature
- Page Object Model structure for Playwright coverage
- Reusable locators, helper methods, fixtures, and test data
- No hardcoded test data unless explicitly required by the scenario

## Stable Selector Rules

Every interactive element must expose a unique `data-testid`.

Examples:

```tsx
data-testid="nav-home"
data-testid="nav-projects"
data-testid="resume-download-btn"
data-testid="contact-submit-btn"
data-testid="github-link"
```

Do not use generated tests that depend on:

- `nth-child` or position-only selectors.
- Random CSS selectors.
- Text-only selectors when a stable test ID is available.

### Example

```tsx
data-testid="contact-form"
```

## Required Test Coverage

Every feature must include:

- Happy path test.
- Negative test.
- Edge or boundary test.
- Accessibility test.
- Responsive test.

Coverage targets:

- 90% functional coverage.
- 80% component coverage.

## Portfolio Coverage Matrix

- Navigation: menu items, active state, mobile menu, smooth scrolling.
- Hero: name, title, CTA buttons, social links.
- About: content rendering, resume download.
- Skills: skill cards, categories, animations.
- Projects: cards, GitHub links, live demo links, filtering, search.
- Experience: timeline rendering, expand/collapse behavior when present.
- Certifications: certificate links and external navigation.
- Contact form: valid submission, invalid email, empty fields, character limits, success state, failure handling.
- GitHub integration: API success, failure, loading state, empty state when present.
- Dark mode: toggle behavior, persistence after refresh, theme consistency.

## Test Categories

- Functional: visibility, rendering, interactions, navigation, business logic.
- Negative: empty states, invalid inputs, missing data, broken API responses, network failures.
- Boundary: minimum values, maximum values, character limits, edge conditions.
- Accessibility: keyboard navigation, focus management, alt text, ARIA labels, contrast, screen reader compatibility.
- Responsive: mobile 375x667, tablet 768x1024, desktop 1920x1080.
- Cross browser: Chrome, Firefox, Edge, Safari where the local or CI environment supports them.
- Performance: page load speed, lazy loading, image optimization, bundle size impact.
- Security: XSS protection, URL validation, form sanitization, secure external links.

---

# 11. Git Standards

## Commit Message Style

Use meaningful commit messages.

### Good

```bash
Add intent-based comments to Contact component
```

### Bad

```bash
fixed stuff
```

---

# 12. Performance Standards

- Use lazy loading where appropriate
- Minimize unnecessary renders
- Keep bundle size reasonable
- Avoid duplicate logic

---

# 13. Folder Structure

```txt
src/
 ├── components/
 ├── App.tsx
 ├── constants.ts
 ├── index.css
 └── main.tsx
```

The QA framework lives separately under `qa-engine/`, and documentation lives under `docs/`.

---

# 14. Engineering Philosophy

This project emphasizes:

- Maintainability
- Accessibility
- Scalability
- QA-oriented thinking
- Readable architecture
- User-focused experience
