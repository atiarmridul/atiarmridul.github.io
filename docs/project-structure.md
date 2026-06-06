# Project Structure

```ini
.
├── public/
│   ├── assets/
│   │   └── readme-infographic.png
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── Contact.tsx
│   │   ├── Domains.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── utils/
│   │   ├── scrollToSection.ts
│   │   ├── siteInteractions.ts
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── constants.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── qa-engine/
│   ├── ai/
│   │   ├── definitions/
│   │   ├── generated-tests/
│   │   ├── locator-catalog/
│   │   ├── prompts/
│   │   └── training-data/
│   ├── core/
│   │   ├── parser/
│   │   ├── generator/
│   │   ├── locator-engine/
│   │   ├── self-healing/
│   │   ├── assertions/
│   │   ├── reporting/
│   │   └── shared/
│   ├── playwright/
│   │   ├── config/
│   │   ├── fixtures/
│   │   ├── pages/
│   │   ├── test-data/
│   │   ├── tests/
│   │   └── utils/
│   ├── input/
│   │   ├── json/
│   │   └── excel/
│   ├── output/
│   │   ├── reports/
│   │   ├── screenshots/
│   │   ├── test-artifacts/
│   │   └── traces/
│   └── bin/
│       ├── create-sample-excel.ts
│       ├── generate-test.ts
│       ├── repair-selectors.ts
│       ├── test-case-parser.ts
│       └── validate-rules.ts
├── docs/
│   ├── AGENT_PROGRESS.md
│   ├── agent.md
│   ├── ai-assisted-workflow.md
│   ├── architecture.md
│   ├── ci.md
│   ├── coding-guidelines.md
│   ├── commands.md
│   ├── deployment-process.md
│   ├── environments.md
│   ├── folder-structure.md
│   ├── mcp.md
│   ├── project-structure.md
│   ├── reports.md
│   ├── standards.md
│   ├── test-cases.md
│   ├── testing-strategy.md
│   └── walkthrough.md
├── index.html
├── playwright.config.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.qa.json
├── vite.config.ts
└── package.json
```

## Ownership Boundaries

- `src/`: portfolio website application code and UI components.
- `src/index.css`: global Tailwind layers, design tokens, editorial-tech utilities, reveal/cursor styles, and responsive section styling.
- `src/constants.ts`: section navigation metadata used by the header.
- `src/utils/scrollToSection.ts`: shared offset-aware section scrolling with reduced-motion support.
- `src/utils/siteInteractions.ts`: scroll reveal, nav scrolled state, custom cursor, and magnetic pointer behavior.
- `src/utils/useTheme.ts`: persisted light/dark theme state applied through `html[data-theme]`.
- `qa-engine/`: isolated QA automation ecosystem.
- `qa-engine/bin/`: command entry points invoked by npm scripts.
- `qa-engine/core/`: reusable QA engine implementation.
- `qa-engine/playwright/`: executable browser automation.
- `docs/`: portfolio, workflow, and framework documentation.
- `public/`: static browser assets, including the README infographic.

## Component Responsibilities

- `Header.tsx`: fixed navigation, theme toggle, resume CTA, and mobile menu.
- `Hero.tsx`: first-viewport QA positioning, large editorial headline, primary CTAs, and scroll-down control.
- `Marquee.tsx`: horizontal focus strip for QA disciplines.
- `About.tsx`: QA journey, ISTQB highlight, values, and portfolio metrics.
- `Skills.tsx`: categorized capability matrix with applied proficiency indicators.
- `Projects.tsx`: automation showcase cards, GitHub links, and architecture preview modal.
- `Achievements.tsx`: filterable certification and training cards.
- `Domains.tsx`: industry expertise cards.
- `Experience.tsx`: professional timeline and achievement-focused responsibilities.
- `Education.tsx`: academic background cards.
- `Contact.tsx`: controlled EmailJS contact form, honeypot spam field, validation, and social links.
- `Footer.tsx`: compact copyright and build-credit footer.
