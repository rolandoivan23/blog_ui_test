import { Page } from '@playwright/test'

export class BasePage {
    readonly page: Page;
  
    constructor(page: Page) {
        this.page = page;
    }
  
    async navigateTo(menuItem: string) {
        const header = this.page.locator('header');
        await header.getByRole('link', { name: menuItem }).click();
    }
}