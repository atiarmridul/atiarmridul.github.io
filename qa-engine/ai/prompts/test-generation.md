# Test Generation Prompt Notes

Use these principles when adding an LLM enrichment layer:

- Preserve the business test case ID.
- Keep generated specs deterministic and reviewable.
- Prefer accessibility and semantic locators.
- Do not generate DOM mutation for normal user actions.
- Add comments only for business-readable test steps.
- Mark low-confidence actions for human review.
