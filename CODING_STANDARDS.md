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

### Example

```tsx
<button aria-label="Open navigation menu">
```

---

# 6. Responsive Design Standards

- Follow mobile-first design
- Use responsive Tailwind breakpoints
- Avoid fixed-width layouts
- Test on mobile, tablet, and desktop
- Verify sticky header contrast on dark and light sections

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

- `section-shell`: standard page width and responsive padding.
- `section-kicker`: small uppercase section label.
- `section-title`: high-contrast section heading.
- `section-copy`: readable section intro text.
- `premium-card`: default card surface.
- `premium-card-hover`: card hover elevation and border behavior.
- `dark-band`: dark engineering background for high-impact sections.

## Header Contrast

The sticky header must support two visual states:

- dark glass state over the hero and dark sections
- light frosted state over white/light sections

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

### Example

```tsx
data-testid="contact-form"
```

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
