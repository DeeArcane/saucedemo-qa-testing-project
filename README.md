# QA Technical Assessment

This workspace contains an automated Playwright JavaScript test for the SauceDemo web application: https://www.saucedemo.com/

The automated test covers the main checkout flow based on the assessment requirements.

## Feature to Test

1. Add to Cart
2. Checkout

## User Story

As a user, I want to add a product to my cart and complete the checkout process so that I can successfully purchase the item.

## Acceptance Criteria

- The user can add products to the cart.
- The user can proceed to checkout and complete the purchase.

# Structure:

qa-technical-assessment/
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
├── test-data/
│   └── checkoutData.js
├── tests/
│   └── web/
│       └── checkout-flow.spec.js
├── playwright.config.js

# Folder Contents

- `pages/` - Contains Page Object Model classes for the SauceDemo web test flow.
- `test-data/` - Contains reusable test data for the checkout flow.
- `tests/` - Contains Playwright test specifications, including the checkout flow test.
- `playwright.config.js` - Contains the Playwright configuration for test execution, reporting, and browser settings.


How to run:

```bash
npm install
npx playwright test
```
