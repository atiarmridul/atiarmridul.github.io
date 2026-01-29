# Personal Portfolio Website

A React + Vite + Tailwind CSS portfolio site showcasing skills, experience, and projects for a Software QA Engineer.

## Live Demo

https://atiarmridul.github.io/

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

- Responsive layout optimized for mobile and desktop
- Animated, modern UI with smooth section transitions
- Contact form with validation and bot honeypot
- Dedicated sections for skills, experience, education, and projects

## Project Structure

```ini
.
├── .bolt/
│   ├── config.json
│   └── prompt
├── gh-pages/
│   ├── assets/
│   └── index.html
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Domains.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── constants.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```sh
git clone https://github.com/atiarmridul/atiarmridul.github.io.git
cd atiarmridul.github.io
npm install
```

### Dev

```sh
npm run dev
```

Open http://localhost:5173

### Build

```sh
npm run build
```

### Preview

```sh
npm run preview
```

### Lint

```sh
npm run lint
```

## Deployment (GitHub Pages)

```sh
npm run deploy
```

This runs `vite build` and publishes `dist/` to GitHub Pages.

## Contact Form (EmailJS)

EmailJS IDs are currently set directly in `src/components/Contact.tsx`. If you want to change them, update the `service`, `template`, and `public key` values in that file.

## Contact

- LinkedIn: https://www.linkedin.com/in/atiarmridul/
- GitHub: https://github.com/atiarmridul
