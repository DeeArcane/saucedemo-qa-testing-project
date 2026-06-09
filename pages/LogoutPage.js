class LogoutPage {
    constructor(page) {
        this.page = page;
    }

    async logout() {
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.locator('#logout_sidebar_link').click();
    }
}

module.exports = { LogoutPage };
