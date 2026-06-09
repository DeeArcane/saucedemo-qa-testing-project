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

        await login.goto();
        await login.login(checkoutData.username, checkoutData.password);

        await inventory.addBackpackToCart();
        await inventory.addFleeceJacketToCart();
        await inventory.addRedTShirtToCart();

        await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('3');

        await inventory.openCart();
        await inventory.removeRedTShirtFromCart();

        await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

        await cart.checkout();

        await checkout.fillCustomerInfo(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );
        await checkout.finish();

        await expect(checkout.getOrderConfirmation()).toHaveText(/thank you/i);
    });
});
