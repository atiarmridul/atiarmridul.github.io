# Test Cases

Business test cases live in `qa-engine/ai/definitions/` and can be JSON or Excel.

The canonical JSON source is:

```text
qa-engine/ai/definitions/business-test-cases.json
```

Do not keep a second business-case JSON under `docs/`; documentation should link to the canonical definition file instead.

## JSON Format

```json
{
  "module": "Login",
  "scenario": "Valid login",
  "priority": "High",
  "tags": ["smoke", "login"],
  "steps": [
    "Open login page",
    "Enter valid email",
    "Enter valid password",
    "Click login button",
    "Verify dashboard is visible"
  ],
  "expectedResults": [
    "Login page loads",
    "Email is accepted",
    "Password is accepted",
    "Login action is submitted",
    "Dashboard is visible"
  ]
}
```

## Excel Format

Supported columns:

```text
Module | Scenario | Step | Expected Result | Priority | Tags
```

Each row represents one step. Rows with the same module and scenario are grouped into one test case.

## Structured Definition Output

Parsed output is written to:

```text
qa-engine/ai/generated-tests/structured-test-definitions.json
```

Each definition includes:

- stable generated ID
- module
- scenario
- priority
- risk level
- tags
- generated timestamp
- confidence score
- structured steps

## Generated Spec Output

Specs are written to:

```text
qa-engine/playwright/tests/generated/*.generated.spec.ts
```

Generated specs include metadata comments so humans can review business intent and automation risk.
