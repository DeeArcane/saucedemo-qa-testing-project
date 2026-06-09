const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { checkoutData } = require('../../test-data/checkoutData');

test.describe('Checkout flow', () => {
    test('adds items, removes one, and completes checkout', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Log in with valid credentials.
        await login.goto();
        await login.login(checkoutData.username, checkoutData.password);

        // Add three items to the cart.
        await inventory.addBackpackToCart();
        await inventory.addFleeceJacketToCart();
        await inventory.addRedTShirtToCart();

        // Verify the cart badge shows three items.
        await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('3');

        // Open the cart and remove one item.
        await inventory.openCart();
        await inventory.removeRedTShirtFromCart();

        // Verify that two items remain.
        await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

        // Continue to checkout.
        await cart.checkout();

        // Fill out the customer information and finish the order.
        await checkout.fillCustomerInfo(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );
        await checkout.finish();

        // Verify the confirmation message.
        await expect(checkout.getOrderConfirmation()).toHaveText(/thank you/i);
    });
});
