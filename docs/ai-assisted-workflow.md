# AI-Assisted Workflow

This framework supports an AI-assisted workflow while keeping all automation reviewable by humans.

## Step 1: Write Business Tests

Add JSON or Excel test cases under:

```text
qa-engine/ai/definitions/
```

Use business language. The parser converts common verbs such as open, enter, click, and verify into structured actions.

## Step 2: Parse Definitions

```sh
npm run qa:parse
```

This validates that business cases can become AI-readable test definitions.

## Step 3: Scan The Site

```sh
npm run dev
npm run qa:scan
```

The scanner uses the live rendered page to collect semantic and fallback locator candidates.
After portfolio UI changes, regenerate or review the locator catalog because section surfaces, card structure,
or modal markup may have changed even when `data-testid` values are preserved.

## Step 4: Generate Specs

```sh
npm run qa:generate
```

The generator combines:

- structured test definitions
- locator catalog entries
- React source-code hints
- metadata and tags

## Step 5: Review Generated Code

Review:

- `qa-engine/ai/generated-tests/structured-test-definitions.json`
- `qa-engine/ai/locator-catalog/locators.json`
- `qa-engine/playwright/tests/generated/*.generated.spec.ts`

Generated tests should be treated like normal code.

When the portfolio design changes, specifically review generated selectors for:

- header navigation buttons
- hero CTA buttons
- project architecture modal controls
- achievement filter buttons
- contact form inputs and submit button
- compact footer rendering

## Step 6: Execute Tests

```sh
npm run test:e2e -- --project=chromium
```

## Optional LLM Integration

The current generator is deterministic. An LLM can be added in `qa-engine/core/generator/generate-test.ts` after parsing and before rendering specs to enrich:

- action inference
- negative cases
- edge cases
- assertion strategy
- semantic locator matching

Keep LLM output stored as JSON or generated specs so changes remain reviewable.
