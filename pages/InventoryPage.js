class InventoryPage {
    constructor(page) {
        this.page = page;
    }

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
