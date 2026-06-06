# Deployment Process

## Hosting

The portfolio is hosted on GitHub Pages:

```text
https://atiarmridul.github.io/
```

## Deployment Flow

1. Run local quality checks.
2. Build the production bundle.
3. Deploy the `dist/` output to GitHub Pages.

```sh
npm run quality
npm run build
npm run deploy
```

`npm run deploy` runs the configured `gh-pages -d dist` deployment command.

## Pre-Deploy Checklist

- Header is readable at the top of the page, after scroll, and in light/dark themes.
- Hero, skills, projects, contact, and footer are responsive on mobile and desktop.
- Contact form configuration is present when form submission is expected:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
  - EmailJS template variables: `name`, `email`, `subject`, `message`, and `time`
  - no EmailJS private key is exposed in frontend files or repository history
- External links open correctly:
  - resume
  - LinkedIn
  - GitHub
  - project repositories
  - certificate links
- `npm run build` succeeds without TypeScript or bundling errors.

## Deployed Site Validation

Run Playwright against the deployed GitHub Pages site:

```sh
PLAYWRIGHT_BASE_URL=https://atiarmridul.github.io PLAYWRIGHT_SKIP_WEBSERVER=true npm run test:e2e
```

## CI Notes

The repo includes CI documentation in [CI](ci.md). Keep CI and deployment validation aligned so local checks
match the build that ships.

For GitHub Pages builds, EmailJS values must be available at build time. Local `npm run deploy` can read
`.env.local`; CI-based deploys should provide the `VITE_EMAILJS_*` values through GitHub secrets or variables.
