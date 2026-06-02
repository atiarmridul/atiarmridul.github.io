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

If any value is missing, the form intentionally blocks submission and shows a configuration alert.
