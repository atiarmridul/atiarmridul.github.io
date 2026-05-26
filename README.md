# Personal Portfolio Website

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-black)
![License](https://img.shields.io/badge/License-MIT-green)

A modern portfolio and QA engineering showcase website built with React, Vite, TypeScript, and Tailwind CSS.

## Live Demo

https://atiarmridul.github.io/

## About This Project

This repository showcases:

- Professional portfolio presentation
- QA automation engineering background
- Frontend engineering practices
- Responsive UI development
- Modern deployment workflows

## Tech Stack

- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- Framer Motion
- Lucide React
- EmailJS
- GitHub Pages

## Features

- Responsive design
- Modern animated UI
- Modular component structure
- Contact form integration
- Mobile-first experience
- TypeScript-based architecture

## Engineering Goals

- Clean and maintainable architecture
- Automation-ready frontend
- CI/CD integration
- Accessibility improvements
- Performance optimization
- Scalable component structure

## Documentation

Project documentation is available inside the `docs/` folder.

- architecture decisions
- testing strategy
- deployment process
- coding guidelines
- folder structure

## Project Structure

```txt
atiarmridul.github.io/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Images, icons, and static resources
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Navigation and responsive menu
│   │   ├── Hero.tsx            # Landing section
│   │   ├── About.tsx           # Professional summary
│   │   ├── Skills.tsx          # Technical expertise section
│   │   ├── Domains.tsx         # QA specialization domains
│   │   ├── Experience.tsx      # Work experience timeline
│   │   ├── Education.tsx       # Academic background
│   │   ├── Contact.tsx         # Contact form and communication links
│   │   └── Footer.tsx          # Footer section
│   │
│   ├── constants/              # Centralized reusable constants/data
│   ├── hooks/                  # Custom React hooks (future scalability)
│   ├── utils/                  # Helper and utility functions
│   ├── App.tsx                 # Main application structure
│   ├── main.tsx                # React application entry point
│   └── index.css               # Global styling
│
├── CODING_STANDARDS.md         # Engineering and coding conventions
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project documentation
```

## Getting Started

### Install

```bash
git clone https://github.com/atiarmridul/atiarmridul.github.io.git
cd atiarmridul.github.io
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Run Lint

```bash
npm run lint
```

## AI QA Automation Framework

This repository includes a modular AI-assisted QA layer that converts business test cases into executable Playwright + TypeScript specs.

### QA Structure

```ini
qa-engine/
├── ai/                       # Definitions, generated definitions, locator catalog, prompts
├── core/                     # Parser, generator, locator engine, assertions, reporting
├── playwright/               # Fixtures, page objects, generated specs, runtime config
├── input/                    # Raw JSON/XLSX imports
├── output/                   # Reports, screenshots, traces, generated artifacts
├── generate-test.ts
├── repair-selectors.ts
└── test-case-parser.ts
```

### Workflow

1. Add business cases to `qa-engine/ai/definitions/business-test-cases.json` or an `.xlsx` file with these columns:

```text
Module | Scenario | Step | Expected Result | Priority | Tags
```

2. Generate the sample Excel input when needed:

```sh
npm run qa:sample-excel
```

3. Start or reuse the Vite app:

```sh
npm run dev
```

4. Scan the live website and build the locator catalog:

```sh
npm run qa:scan
```

5. Generate Playwright specs from business cases:

```sh
npm run qa:generate
```

6. Run the generated tests:

```sh
npm run test:e2e
```

### Output

- Structured AI-readable definitions in `qa-engine/ai/generated-tests/structured-test-definitions.json`
- Centralized locators in `qa-engine/ai/locator-catalog/locators.json`
- Human-readable Playwright specs in `qa-engine/playwright/tests/generated/`
- Test metadata comments including priority, module, tags, risk level, timestamp, and confidence score
- Runtime self-healing selectors with fallback order: `data-testid`, `aria-label`, role, placeholder/text, CSS, XPath
- `data-testid` is also retained as a fallback candidate so repaired locators can still recover through the stable test ID.

### Extending With An LLM

The implementation uses deterministic heuristics so it can run locally and in CI. To add an LLM, plug it into `qa-engine/core/generator/generate-test.ts` after `parseBusinessTestCases()` and before `renderSpec()` to enrich actions, assertions, tags, or locator matching. Keep generated JSON and specs reviewable before execution.

### CI Notes

`playwright.config.ts` enables retries in CI, screenshots, videos, and trace retention on failure. Set `PLAYWRIGHT_BASE_URL` to test a deployed environment, or keep the default web server to test the local Vite app.

## Deployment (GitHub Pages)

Hosted using GitHub Pages.

```bash
npm run deploy
```

## Planned Improvements

- Playwright E2E automation
- GitHub Actions CI/CD
- Accessibility testing
- Lighthouse optimization
- Automated deployment validation
- Advanced frontend optimization

## QA Automation Vision

This repository will gradually evolve into a professional QA engineering showcase featuring:

- UI automation
- Cross-browser validation
- Responsive testing
- Accessibility validation
- CI pipeline integration
- Automated deployment workflows

## Author

Md. Atiar Rahman Chowdhury

- Software QA Engineer
- ISTQB Certified

## Links

- LinkedIn: https://www.linkedin.com/in/atiarmridul/
- GitHub: https://github.com/atiarmridul
