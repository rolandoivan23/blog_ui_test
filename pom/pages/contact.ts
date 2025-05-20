import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ContactPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async validateElements() {
        await expect(this.page.getByRole('heading', { name: 'Rolando Vázquez' })).toBeVisible();
        await expect(this.page.getByText('Software Engineer')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: '📨 Send a Message' })).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'Your full name' })).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'you@example.com' })).toBeVisible();
        await expect(this.page.getByRole('textbox', { name: 'How can I help you?' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Send' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send' }).click();
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
