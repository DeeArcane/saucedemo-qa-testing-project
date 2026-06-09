class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.page.locator('#username').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login-button').click();
    }
}

module.exports = { LoginPage };
