# QA Technical Assessment

This workspace contains a Playwright TypeScript test scaffold for a checkout flow.

Structure:

- tests/web/checkout-flow.spec.ts — end-to-end checkout test
- pages/*.ts — Page Object Model classes
- test-data/checkoutData.ts — test data
- playwright.config.ts — Playwright config

How to run:

```bash
npm install
npx playwright test
```
