# Playwright MCP

The repository includes `@playwright/mcp` as a dev dependency.

Run the MCP server locally with:

```sh
npm run mcp:playwright
```

The QA engine still uses deterministic Playwright scanning by default through:

```sh
npm run qa:scan
```

MCP/browser inspection can be used to enrich or validate the generated locator catalog:

```text
qa-engine/ai/locator-catalog/locators.json
```

Locator priority:

1. `data-testid`
2. `aria-label`
3. role and accessible name
4. stable CSS
5. XPath fallback
