import { Page } from '@playwright/test'
let env = require('../resources/environments/data.json');

export class BasePage {
    readonly page: Page;
    readonly env: any;
  
    constructor(page: Page) {
        this.page = page;
        this.env = env['PRODUCTION'];
    }
  
    async navigateTo(menuItem: string) {
        const header = this.page.locator('header');
        await header.getByRole('link', { name: menuItem }).click();
    }
}