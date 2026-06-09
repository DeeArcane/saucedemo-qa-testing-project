const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { LogoutPage } = require('../../pages/LogoutPage');
const { checkoutData } = require('../../test-data/checkoutData');

test.describe('Checkout flow', () => {
    test('adds items, removes one item, and completes checkout', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        const logout = new LogoutPage(page);

        await test.step('Login with valid credentials', async () => {
            await login.goto();
            await login.login(checkoutData.username, checkoutData.password);
        });

        await test.step('Add first, middle, and last products to the cart', async () => {
            await inventory.addBackpackToCart();
            await inventory.addFleeceJacketToCart();
            await inventory.addRedTShirtToCart();

            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
        });

        await test.step('Remove one product from the cart', async () => {
            await inventory.openCart();
            await cart.removeRedTShirtFromCart();

            await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
        });

        await test.step('Proceed to checkout', async () => {
            await cart.checkout();
        });

        await test.step('Enter customer checkout information', async () => {
            await checkout.fillCustomerInfo(
                checkoutData.firstName,
                checkoutData.lastName,
                checkoutData.postalCode
            );
        });

        await test.step('Verify checkout overview items', async () => {
            await checkout.verifyOverviewItems([
                'Sauce Labs Backpack',
                'Sauce Labs Fleece Jacket',
            ]);
        });

        await test.step('Complete the checkout', async () => {
            await checkout.finish();

            await expect(checkout.getOrderConfirmation()).toHaveText(/thank you/i);
        });

        await test.step('Logout from the application', async () => {
            await logout.logout();
        });
    });
});