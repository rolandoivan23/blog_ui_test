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

    async validateCommentsCreationAtHome(commentText: string) {
        const post = await this.findPost('The first post - I really love Ruby on Rails');
        await post.getByPlaceholder('Share your thoughts...').waitFor({state: 'attached'});
        await post.getByPlaceholder('Share your thoughts...').fill(commentText);
        await post.getByText('Post Comment').click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.getByText(commentText).first()).toBeVisible();
    }
    

    async findPost(name: string): Promise<Locator>{
        const post = this.page.locator('#posts .post-content').filter({ hasText: name });
        await expect(post).toBeVisible();
        return post;
    }
}
