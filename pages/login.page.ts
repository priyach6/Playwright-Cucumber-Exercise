import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        const pageTitle = await this.page.title();
        if (pageTitle !== expectedTitle) {
          throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill('Priyanka')
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    public async validateErrorMessage() {
        const errorMessage = this.page.locator('h3[data-test="error"]')
        await errorMessage.waitFor({ state: 'visible', timeout: 5000 })
        const errorText = await errorMessage.textContent()
        if (errorText?.trim() !== 'Epic sadface: Username and password do not match any user in this service') {
            throw new Error(`Expected error message to be 'Epic sadface: Sorry, this user has been locked out. '${errorText}'`);
        }
    }
}