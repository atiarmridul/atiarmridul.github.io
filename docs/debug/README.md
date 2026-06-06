# Debug Notes

Use this folder for temporary or historical debugging notes that should remain separate from primary framework documentation.

## Common Debug Targets

- Playwright trace analysis.
- Locator repair investigation.
- DOM scan evidence.
- CI-only failures.
- Browser-specific rendering issues.
- Header contrast at the top of the page, after scroll, and in light/dark themes.
- Responsive card and modal overflow.
- Contact form validation or EmailJS configuration issues.

## EmailJS Debug Checklist

When the contact form shows `Failed to send message. Please try again later.`:

1. Open the browser console and find the `EmailJS error:` log.
2. Inspect the `https://api.emailjs.com/api/v1.0/email/send` response body.
3. If the response says `Account not found`, verify `VITE_EMAILJS_PUBLIC_KEY` and re-copy it directly from
   EmailJS. The key is case-sensitive.
4. If the response mentions service or template lookup, verify `VITE_EMAILJS_SERVICE_ID` and
   `VITE_EMAILJS_TEMPLATE_ID`.
5. Confirm the EmailJS template variables are `name`, `email`, `subject`, `message`, and `time`.
6. Restart `npm run dev` after editing `.env.local`.
7. Never use the EmailJS private key in the frontend.

## Artifact Locations

```text
qa-engine/output/reports/html/
qa-engine/output/test-artifacts/
```

These folders are ignored by Git and should not be committed.

Temporary browser screenshots created during local verification should also be removed after inspection unless
they are intentionally added as documentation evidence.
