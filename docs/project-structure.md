# Project Structure

```ini
.
├── public/
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
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
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
│   │   ├── tests/
│   │   └── utils/
│   ├── input/
│   │   ├── json/
│   │   └── excel/
│   ├── output/
│   │   ├── reports/
│   │   ├── screenshots/
│   │   ├── traces/
│   │   └── generated-specs/
│   ├── generate-test.ts
│   ├── repair-selectors.ts
│   └── test-case-parser.ts
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
- `src/index.css`: global Tailwind layers, typography import, reusable section/card utilities, and dark-band styling.
- `src/constants.ts`: section navigation metadata used by the header and footer.
- `qa-engine/`: isolated QA automation ecosystem.
- `qa-engine/core/`: reusable QA engine implementation.
- `qa-engine/playwright/`: executable browser automation.
- `docs/`: portfolio, workflow, and framework documentation.
- `public/`: static browser assets.

## Component Responsibilities

- `Header.tsx`: sticky navigation, active section indicator, theme-aware light/dark header contrast, resume CTA, and mobile menu.
- `Hero.tsx`: first-viewport QA branding, dashboard-inspired release readiness panel, stack badges, and primary CTAs.
- `About.tsx`: QA journey, ISTQB highlight, values, and portfolio metrics.
- `Skills.tsx`: categorized capability matrix with applied proficiency indicators.
- `Projects.tsx`: automation showcase cards, GitHub links, and architecture preview modal.
- `Achievements.tsx`: filterable certification and training cards.
- `Domains.tsx`: industry expertise cards.
- `Experience.tsx`: professional timeline and achievement-focused responsibilities.
- `Education.tsx`: academic background cards.
- `Contact.tsx`: controlled EmailJS contact form, honeypot spam field, validation, and social links.
- `Footer.tsx`: footer navigation and specialization summary.
