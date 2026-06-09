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

    async finish() {
        await this.page.click('#finish');
    }

    getOrderConfirmation() {
        return this.page.locator('.complete-header');
    }
}

module.exports = { CheckoutPage };
