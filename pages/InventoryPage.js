class InventoryPage {
    constructor(page) {
        this.page = page;
    }
    // Adds three items to the cart: the first, middle, and last items in the inventory list.
    // This verifies that the cart count updates correctly, confirms that all selected items can be added,
    // and checks that the remove function works as expected.
    async addBackpackToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async addFleeceJacketToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    }

    async addRedTShirtToCart() {
        await this.page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async removeRedTShirtFromCart() {
        await this.page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
    }
}

module.exports = { InventoryPage };
