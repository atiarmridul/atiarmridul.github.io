# CI

This project is ready for CI execution with Playwright.

## GitHub Actions

The repository includes `.github/workflows/qa.yml`.

It runs on pull requests and pushes to `main`.

## CI Commands

The workflow runs:

- `npm ci`
- `npx playwright install --with-deps`
- `npm run ci:verify`
- `npm run test:e2e`

`npm run ci:verify` expands to quality checks, production build, and root file policy validation.

For portfolio UI changes, the most important non-browser CI signal is `npm run ci:verify`. It verifies:

- app TypeScript
- QA engine TypeScript
- ESLint
- Prettier formatting
- production build
- root file policy

## Playwright CI Behavior

`playwright.config.ts` includes:

- full parallelism
- CI retry count of `2`
- CI worker cap of `2`
- screenshots on failure
- videos retained on failure
- traces retained on failure

## Testing The Deployed Site

```sh
PLAYWRIGHT_BASE_URL=https://atiarmridul.github.io PLAYWRIGHT_SKIP_WEBSERVER=true npm run test:e2e
```

On failure, the workflow uploads Playwright reports and test artifacts.

## UI Regression Notes

CI should protect behavior, but visual polish still requires browser review for major design changes. Prioritize:

- dark hero header state
- light section header state
- mobile menu
- project modal
- contact form
