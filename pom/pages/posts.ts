import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class PostsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async validatePostElements(name: string) {
        const post = await this.findPost(name);
    
        await expect(post.getByRole('link', {name: 'Show More'})).toBeVisible();
        const commentsTitle = post.locator('.comments-title');
        await expect(commentsTitle).toBeVisible();
        await expect(commentsTitle).toContainText('Comments');
        await expect(post.locator('.comments-count')).toBeVisible();
        await expect(post.getByPlaceholder('Share your thoughts...')).toBeVisible();
        await expect(post.getByText('Post Comment')).toBeVisible();
    }

    async findPost(name: string): Promise<Locator>{
        const post = this.page.locator('#posts .post-content').filter({ hasText: name });
        await expect(post).toBeVisible();
        return post;
    }
}
