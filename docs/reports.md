# Reports And Artifacts

Playwright produces reports and artifacts for debugging failures.

## HTML Report

Generated after test runs:

```text
qa-engine/output/reports/html/
```

Open it with:

```sh
npx playwright show-report
```

## Failure Artifacts

Generated under:

```text
qa-engine/output/test-artifacts/
```

The framework retains on failure:

- screenshots
- videos
- traces
- Playwright error context

## Trace Usage

Open a trace file:

```sh
npx playwright show-trace qa-engine/output/test-artifacts/<trace.zip>
```

Use traces to inspect:

- DOM snapshots
- action timeline
- console messages
- network requests
- screenshots around the failure

## Git Ignore Policy

Reports are local diagnostics and are ignored by Git:

```text
qa-engine/output/reports/html/
qa-engine/output/test-artifacts/
```

## Triage Order

1. Confirm the target URL is reachable.
2. Review screenshot and video.
3. Open trace.
4. Check console and network errors.
5. Confirm the expected UI actually rendered.
6. Check whether recent UI redesign work changed section layout, modal structure, or header state.
7. Only then update selectors or regenerate tests.

## Portfolio-Specific Evidence To Capture

For visual or responsive failures, capture:

- desktop hero screenshot
- mobile hero screenshot
- header in top, scrolled, light-theme, and dark-theme states
- mobile menu open state
- project modal open state
- contact form viewport
