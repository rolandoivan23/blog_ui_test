import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AboutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async validateElements() {
        await expect(this.page.getByRole('heading', { name: 'Rolando Vázquez' })).toBeVisible();
        await expect(this.page.getByText('Software Engineer')).toBeVisible();
        await expect(this.page.getByText('Email:')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'rolando.vazquez.23@gmail.com' })).toBeVisible();
        await expect(this.page.getByText('Company:')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'mexclouds.com', exact: true })).toBeVisible();
        await expect(this.page.getByText('Personal Site:')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'mrcode.mexclouds.com' })).toBeVisible();
        await expect(this.page.getByText('Main Projects:')).toBeVisible();
        const projectsContainer = this.page.locator('section');
        await expect(projectsContainer).toContainText('acts_as_realtime');
        await expect(projectsContainer).toContainText('tiempo.com.mx');
        await expect(projectsContainer).toContainText('MexWeather');
    }
}
