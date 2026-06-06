# Environments

The Playwright runtime resolves configuration from local defaults, environment profile files, and process variables.

## Configuration Source Order

1. Built-in defaults.
2. `qa-engine/environments/<QA_ENV>.env`.
3. Process variables.

Process variables win over file values.

## Local Example

Use `qa-engine/environments/local.env.example` as the starting point:

```text
BASE_URL=http://127.0.0.1:5173
PLAYWRIGHT_SKIP_WEBSERVER=false
ROUTE_STATIC_ASSETS_TO_ORIGIN=false
```

## Variables

| Variable                        | Purpose                                                        | Default                 |
| ------------------------------- | -------------------------------------------------------------- | ----------------------- |
| `QA_ENV`                        | Selects an environment file.                                   | `local`                 |
| `BASE_URL`                      | Target app URL.                                                | `http://127.0.0.1:5173` |
| `PLAYWRIGHT_BASE_URL`           | CI override for the Playwright base URL.                       | `BASE_URL`              |
| `PLAYWRIGHT_SKIP_WEBSERVER`     | Skip local Vite web server startup.                            | `false`                 |
| `ROUTE_STATIC_ASSETS_TO_ORIGIN` | Reserved explicit toggle for static asset routing workarounds. | `false`                 |

## Deployed Site Testing

To test the GitHub Pages deployment:

```sh
PLAYWRIGHT_BASE_URL=https://atiarmridul.github.io PLAYWRIGHT_SKIP_WEBSERVER=true npm run test:e2e
```

## Contact Form Environment

The frontend contact form reads EmailJS settings from Vite environment variables:

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

For local development, copy the template file and fill in real values:

```sh
cp .env.example .env.local
```

```env
VITE_EMAILJS_SERVICE_ID=service_btdlks9
VITE_EMAILJS_TEMPLATE_ID=template_6g4f9jq
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

`.env.example` is documentation only; Vite does not load it. `.env.local` is ignored by Git and is the correct
place for real local credentials.

Only the EmailJS public key belongs in the frontend. Never add the private key to React/Vite code, `.env.local`,
or committed documentation. If a private key is exposed in a screenshot or chat, rotate it in EmailJS.

After editing `.env.local`, restart the Vite dev server because Vite reads env variables at startup.

If any value is missing, the form intentionally blocks submission and shows a configuration alert. If EmailJS
returns `Account not found`, re-copy the public key directly from EmailJS and check case-sensitive characters such
as uppercase `I` versus lowercase `l`.
