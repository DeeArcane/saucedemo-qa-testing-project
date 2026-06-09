class CartPage {
  constructor(page) {
    this.page = page;
  }
  // This method navigates to the checkout page from the shopping cart.

  async removeRedTShirtFromCart() {
    await this.page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
  }

  async checkout() {
    await this.page.locator('#checkout').click();
  }
}

module.exports = { CartPage };
