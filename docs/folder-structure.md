# Folder Structure

## Current Structure

```text
src/
├── components/      # Portfolio UI sections and reusable section-level components
├── App.tsx          # Page composition and section order
├── constants.ts     # Navigation metadata
├── index.css        # Tailwind layers, design utilities, typography, and global styles
└── main.tsx         # React entry point

qa-engine/
├── ai/              # Business definitions, generated definitions, locator catalog, prompts
├── core/            # Parser, generator, locator extraction, self-healing, shared types
├── playwright/      # Playwright config, fixtures, page objects, generated specs
├── input/           # JSON/XLSX source inputs
└── output/          # Reports, screenshots, traces, and local artifacts

docs/                # Portfolio, QA framework, workflow, and standards documentation
public/              # Static public assets
```

## Organization Goals

- Keep portfolio UI code in `src/components/` and avoid mixing QA engine implementation into the app.
- Keep generated QA artifacts under `qa-engine/ai/` or `qa-engine/playwright/tests/generated/`.
- Keep reports and traces under `qa-engine/output/`; they are diagnostics, not source files.
- Keep documentation in `docs/`, with the root `README.md` as the public project overview.
- Preserve stable section IDs and `data-testid` attributes because the QA automation layer depends on them.
