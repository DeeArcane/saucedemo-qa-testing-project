class CartPage {
  constructor(page) {
    this.page = page;
  }

  async checkout() {
    await this.page.locator('#checkout').click();
  }
}

module.exports = { CartPage };
