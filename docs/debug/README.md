# Debug Notes

Use this folder for temporary or historical debugging notes that should remain separate from primary framework documentation.

## Common Debug Targets

- Playwright trace analysis.
- Locator repair investigation.
- DOM scan evidence.
- CI-only failures.
- Browser-specific rendering issues.
- Header contrast over light and dark sections.
- Responsive card and modal overflow.
- Contact form validation or EmailJS configuration issues.

## Artifact Locations

```text
qa-engine/output/reports/html/
qa-engine/output/test-artifacts/
```

These folders are ignored by Git and should not be committed.

Temporary browser screenshots created during local verification should also be removed after inspection unless
they are intentionally added as documentation evidence.
