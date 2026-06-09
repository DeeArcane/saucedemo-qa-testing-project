const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { LogoutPage } = require('../../pages/LogoutPage');
const { checkoutData } = require('../../test-data/checkoutData');

test.describe('Checkout flow', () => {
    test('adds items, removes one, and completes checkout', async ({ page }) => {
        const login = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);
        const logout = new LogoutPage(page);

        await login.goto(); // Navigate to the login page
        await login.login(checkoutData.username, checkoutData.password); // Log in with valid credentials

        //adding three items. first, middle, and last items in the inventory list. 
        //this verifies that the cart count updates correctly, confirms that all selected items can be added, and checks that the remove function works as expected.
        await inventory.addBackpackToCart();
        await inventory.addFleeceJacketToCart();
        await inventory.addRedTShirtToCart();

        //verifies that the cart count updates correctly after adding three items to the cart.
        await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('3');

        //Verifies that the remove function works as expected by removing the red t-shirt from the cart and confirming that only two items remain.
        await inventory.openCart();
        await inventory.removeRedTShirtFromCart();

        // Verifies that the cart count updates correctly after removing an item.
        await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

        await cart.checkout();

        // This method fills in the customer information form during the checkout process. 
        // It takes three parameters: firstName, lastName, and postalCode.
        await checkout.fillCustomerInfo(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );

        await checkout.verifyOverviewItems([
            'Sauce Labs Backpack',
            'Sauce Labs Fleece Jacket',
        ]);

        await checkout.finish();

        // Verifies that the order is successfully completed by checking for the presence of a confirmation message or order summary on the final page.
        await expect(checkout.getOrderConfirmation()).toHaveText(/thank you/i);

        // Log out from the application.
        await logout.logout();
    });
});
