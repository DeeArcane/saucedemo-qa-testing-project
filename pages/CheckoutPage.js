const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async fillCustomerInfo(firstName, lastName, postalCode) {
        await this.page.fill('#first-name', firstName);
        await this.page.fill('#last-name', lastName);
        await this.page.fill('#postal-code', postalCode);
        await this.page.click('#continue');
    }

    async verifyOverviewItems(expectedItems) {
        const itemNames = this.page.locator('.inventory_item_name');
        await expect(itemNames).toHaveCount(expectedItems.length);

        for (const item of expectedItems) {
            await expect(this.page.locator(`.inventory_item_name:has-text("${item}")`)).toBeVisible();
        }
    }

    async finish() {
        await this.page.click('#finish');
    }

    getOrderConfirmation() {
        return this.page.locator('.complete-header');
    }
}

module.exports = { CheckoutPage };
