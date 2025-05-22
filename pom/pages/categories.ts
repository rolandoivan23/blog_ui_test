import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CategoriesPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigateTo() {
        await this.page.getByRole('navigation').getByRole('link', { name: 'Categories' }).click();
        await expect(this.page.getByRole('article')).toContainText('Explore Categories'); 
        
    }
    
    async createCategory(name: string, description: string, tagsToSelect: string[] = []) {
        await this.submitForm(name, description, tagsToSelect);
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
        await this.page.waitForResponse(`${this.env['BASE_URL']}/categories?tag=${tagName}`);
        await expect(this.page.getByText(categoryName)).not.toBeVisible();
    }

    async validateCategoryInTag(categoryName: string, tagName: string = 'All') {
        let url = `${this.env['BASE_URL']}/categories`;
        if(tagName !== 'All') {
            await this.page.getByRole('button', { name: tagName }).click();
            url += `?tag=${tagName}`;
            await this.page.waitForResponse(url);
        }
        await expect(this.page.getByText(categoryName)).toBeVisible();
    }

    async fillNewCategoryForm(name: string, description: string, tagsToSelect: string[] = []) {
        await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Name' }).press('Tab');
        await this.page.getByRole('textbox', { name: 'Description' }).fill(description);
        for (const tag of tagsToSelect) 
            await this.page.getByRole('checkbox', { name: tag }).check();
        
    }

    async submitForm(name: string, email: string, tagsToSelect: string[] = []) {
        await this.fillNewCategoryForm(name, email, tagsToSelect);
        await this.page.getByRole('button', { name: 'Create Category' }).click();
    }
}
