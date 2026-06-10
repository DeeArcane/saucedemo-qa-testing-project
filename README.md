# SauceDemo QA Testing Project

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

## Automated Test Flow

1. Open the SauceDemo login page.
2. Log in using valid test credentials.
3. Add three products to the cart:
	- Sauce Labs Backpack
	- Sauce Labs Fleece Jacket
	- Test.allTheThings() T-Shirt (Red) 
    (Add three products from different positions in the inventory list: first, middle, and last. This verifies that products from different parts of the list can be added to the cart and that the cart icon displays the correct total number of added products.)
4. Verify the cart badge shows `3` items.
5. Open the cart and remove the red t-shirt.
6. Verify there are `2` items left in the cart.
7. Click checkout.
8. Fill customer information (first name, last name, postal code).
9. Verify the checkout overview contains:
	- Sauce Labs Backpack
	- Sauce Labs Fleece Jacket
10. Click Finish and verify the order confirmation message.
11. Log out from the application.

Note: I used `test.step` to break flows into  steps for easier debugging and bug/error isolation.

# Structure
```txt
saucedemo-qa-testing-project/
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   ├── LoginPage.js
│   └── LogoutPage.js
├── test-data/
│   └── checkoutData.js
├── tests/
│   └── web/
│       └── checkout-flow.spec.js
├── playwright.config.js
├── package.json
└── README.md
```
# Folder Contents

- `pages/` - Contains Page Object Model classes for the SauceDemo web test flow.
- `test-data/` - Contains reusable test data for the checkout flow.
- `tests/` - Contains Playwright test specifications, including the checkout flow test.
- `playwright.config.js` - Contains the Playwright configuration for test execution, reporting, and browser settings.

# Test Documentation

The test cases are documented in Excel format and can be found here:

- `docs/QA-Test-Cases.xlsx`

- Added a separate table for observations and improvement suggestions, as I assumed that https://www.saucedemo.com/ should be evaluated like a real e-commerce site in the Philippines.

- I also assumed that the JSONPlaceholder endpoints should behave like a real REST API. I validated the responses based on common API behavior, such as returning 400 for invalid request bodies, 404 for non-existing resources, and 200 or 201 for successful requests.

Note: The links in the Evidence column are Jam.dev links. Jam.dev is an online screen recording tool used to capture and share test execution recordings. I've included these links as evidence of the actual test steps and results during execution.

How to run:

```bash
npm install
npx playwright test
```
