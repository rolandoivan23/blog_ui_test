import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { PagesManager } from "../PagesManager";

export class CategoriesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigateTo() {
        await this.page.getByRole('navigation').getByRole('link', { name: 'Categories' }).click();
        await expect(this.page.getByRole('article')).toContainText('Explore Categories'); 
        
    }
    
    async createCategory(name: string, description: string) {
        await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Name' }).press('Tab');
        await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
        await this.page.getByRole('checkbox', { name: 'Recent' }).check();
        await this.page.getByRole('button', { name: 'Create Category' }).click();
        await expect(this.page.getByRole('article')).toContainText('Category was successfully created.');
    }

    async validateElements() {
        await expect(this.page.getByRole('button', { name: '+' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'All' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Popular' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Recent' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Trending' })).toBeVisible();
        
        await expect(this.page.getByText('Ruby on Rails')).toBeVisible();//Default category
    }

    async validateNoCreationWithoutSession() {
        await this.page.getByRole('button', { name: '+' }).click();
        await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    }

    async validateNoCreationWithoutName() {
        await this.page.getByRole('textbox', { name: 'Name' }).waitFor({ state: 'attached' });
        await this.page.getByRole('textbox', { name: 'Description' }).fill('Esta es una categoria creada por la automatizacion');
        await this.page.getByRole('button', { name: 'Create Category' }).click();
        await expect(this.page.getByText("Name can't be blank")).toBeVisible(); 
    }

    async validateCategoryNotInTag(categoryName: string, tagName: string = 'All') {
        await this.page.getByRole('button', { name: tagName }).click();
        await this.page.waitForResponse(`http://localhost:3000/categories?tag=${tagName}`);
        await expect(this.page.getByText(categoryName)).not.toBeVisible();
    }

    async validateCategoryInTag(categoryName: string, tagName: string = 'All') {
        let url = `http://localhost:3000/categories`;
        if(tagName !== 'All') {
            await this.page.getByRole('button', { name: tagName }).click();
            url += `?tag=${tagName}`;
            await this.page.waitForResponse(url);
        }
        await expect(this.page.getByText(categoryName)).toBeVisible();
    }

    async submitForm(name: string, email: string, message: string) {
        const nameField = this.page.getByRole('textbox', { name: 'Your full name' });
        const emailField = this.page.getByRole('textbox',{ name: 'you@example.com' });

        await nameField.fill(name);
        await nameField.press('Tab');
        await emailField.fill(email);
        await emailField.press('Tab');
        await this.page.getByRole('textbox', { name: 'How can I help you?' }).fill(message);
        await this.page.getByRole('button', { name: 'Send' }).click();
    }
}
