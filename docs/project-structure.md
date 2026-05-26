# Project Structure

```ini
.
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
│   ├── commands.md
│   ├── environments.md
│   ├── mcp.md
│   ├── project-structure.md
│   ├── reports.md
│   ├── standards.md
│   ├── test-cases.md
│   └── walkthrough.md
├── src/
│   └── portfolio React app
├── playwright.config.ts
├── tsconfig.qa.json
└── package.json
```

## Ownership Boundaries

- `src/`: website application code.
- `qa-engine/`: isolated QA automation ecosystem.
- `qa-engine/core/`: reusable QA engine implementation.
- `qa-engine/playwright/`: executable browser automation.
- `docs/`: framework documentation.
