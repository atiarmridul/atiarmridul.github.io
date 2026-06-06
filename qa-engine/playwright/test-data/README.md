# Playwright Test Data

Reusable Playwright test data lives here so generated specs do not embed data values in generator source code.

`generated-test-data.json` provides safe defaults for generated QA specs. Feature-specific data should be added as
separate JSON files and referenced through generator options or explicit test definitions.

Comment: Keep this data non-sensitive. Do not add real passwords, private inboxes, API keys, customer details, or
production-only records to generated test-data files.
